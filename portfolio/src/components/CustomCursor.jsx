import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const VERT_SHADER = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const TRAIL_FRAG = `
  precision mediump float;
  uniform sampler2D uPrevTrail;
  uniform vec2 uMouse;
  uniform vec2 uMouseDir;
  uniform float uVelocity;
  uniform float uDecay;
  uniform float uBrushSize;
  uniform float uAspect;
  uniform float uReveal;
  varying vec2 vUv;

  void main() {
    float prev = texture2D(uPrevTrail, vUv).r * uDecay;
    vec2 delta = vUv - uMouse;
    delta.x *= uAspect;

    vec2 dir = length(uMouseDir) > 0.001 ? uMouseDir : vec2(0.0, 1.0);
    float along = dot(delta, dir);
    float perp = length(delta - along * dir);
    float elongation = 1.0 + uVelocity * 2.0;
    float blobDist = sqrt(along * along / elongation + perp * perp);

    float blob = exp(-blobDist * blobDist / (uBrushSize * uBrushSize)) * uReveal;
    gl_FragColor = vec4(min(prev + blob, 1.0), 0.0, 0.0, 1.0);
  }
`;

const HALFTONE_FRAG = `
  #extension GL_OES_standard_derivatives : enable
  precision highp float;
  uniform sampler2D uTrailTexture;
  uniform vec2 uResolution;
  uniform float uCellSize;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    vec2 pixel = vUv * uResolution;
    vec2 cellCoord = floor(pixel / uCellSize);
    vec2 cellCenter = (cellCoord + 0.5) * uCellSize;
    vec2 cellCenterUv = cellCenter / uResolution;

    float density = texture2D(uTrailTexture, cellCenterUv).r;
    float dist = length(fract(pixel / uCellSize) - 0.5);

    float radius = density * 0.47;
    float aa = fwidth(dist);
    float inDot = 1.0 - smoothstep(radius - aa, radius, dist);
    float alpha = inDot * smoothstep(0.05, 0.2, density);

    gl_FragColor = vec4(uColor, alpha * uOpacity);
  }
`;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function compileShader(gl, source, type) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function linkProgram(gl, vsSource, fsSource) {
  const vs = compileShader(gl, vsSource, gl.VERTEX_SHADER);
  const fs = compileShader(gl, fsSource, gl.FRAGMENT_SHADER);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(prog));
    gl.deleteProgram(prog);
    return null;
  }
  return prog;
}

function createFBO(gl, w, h) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const fb = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  return { fb, texture };
}

// Walks the actual visual stack (not the DOM tree) at a point to find what's
// on top, so a dark card floating over a light section is detected correctly.
function isDarkBackgroundAt(x, y) {
  const stack = document.elementsFromPoint(x, y);
  for (const el of stack) {
    const bg = getComputedStyle(el).backgroundColor;
    const nums = bg?.match(/[\d.]+/g)?.map(Number);
    if (!nums) continue;
    const [r, g, b, a = 1] = nums;
    if (a > 0.5) {
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance < 0.5;
    }
  }
  return false;
}

class HalftoneTrailEngine {
  constructor(canvas, config) {
    this.config = config;
    this.currentBrushSize = config.brushSize;
    this.currentOpacity = config.opacity;
    this.width = 0;
    this.height = 0;
    this.mouseX = 0.5;
    this.mouseY = 0.5;
    this.prevX = 0.5;
    this.prevY = 0.5;
    this.dirX = 0;
    this.dirY = 1;
    this.velocity = 0;
    this.hovering = false;
    this.reveal = 0;
    this.targetReveal = 1;
    this.colorRGB = [0, 0, 0];
    this.targetColorRGB = [0, 0, 0];

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) throw new Error("WebGL unavailable");
    this.gl = gl;

    gl.getExtension("OES_standard_derivatives");

    const trailProgram = linkProgram(gl, VERT_SHADER, TRAIL_FRAG);
    const halftoneProgram = linkProgram(gl, VERT_SHADER, HALFTONE_FRAG);
    if (!trailProgram || !halftoneProgram) throw new Error("Shader compilation failed");
    this.trailProgram = trailProgram;
    this.halftoneProgram = halftoneProgram;

    this.tPosLoc = gl.getAttribLocation(trailProgram, "position");
    this.tPrevLoc = gl.getUniformLocation(trailProgram, "uPrevTrail");
    this.tMouseLoc = gl.getUniformLocation(trailProgram, "uMouse");
    this.tMouseDirLoc = gl.getUniformLocation(trailProgram, "uMouseDir");
    this.tVelocityLoc = gl.getUniformLocation(trailProgram, "uVelocity");
    this.tDecayLoc = gl.getUniformLocation(trailProgram, "uDecay");
    this.tBrushLoc = gl.getUniformLocation(trailProgram, "uBrushSize");
    this.tAspectLoc = gl.getUniformLocation(trailProgram, "uAspect");
    this.tRevealLoc = gl.getUniformLocation(trailProgram, "uReveal");

    this.hPosLoc = gl.getAttribLocation(halftoneProgram, "position");
    this.hTrailLoc = gl.getUniformLocation(halftoneProgram, "uTrailTexture");
    this.hResLoc = gl.getUniformLocation(halftoneProgram, "uResolution");
    this.hCellLoc = gl.getUniformLocation(halftoneProgram, "uCellSize");
    this.hColorLoc = gl.getUniformLocation(halftoneProgram, "uColor");
    this.hOpacityLoc = gl.getUniformLocation(halftoneProgram, "uOpacity");

    this.fboA = createFBO(gl, 512, 512);
    this.fboB = createFBO(gl, 512, 512);

    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fboA.fb);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fboB.fb);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const buf = gl.createBuffer();
    if (!buf) throw new Error("Buffer creation failed");
    this.positionBuffer = buf;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    this.tick = this.tick.bind(this);
    this.rafId = requestAnimationFrame(this.tick);
  }

  updatePointer(clientX, clientY, containerRect) {
    this.prevX = this.mouseX;
    this.prevY = this.mouseY;
    this.mouseX = (clientX - containerRect.left) / this.width;
    this.mouseY = 1.0 - (clientY - containerRect.top) / this.height;

    const aspect = this.width / this.height || 1;
    const dx = (this.mouseX - this.prevX) * aspect;
    const dy = this.mouseY - this.prevY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    this.velocity = Math.min(this.config.speedScale * dist, 1.0);
    if (dist > 1e-4) {
      this.dirX = dx / dist;
      this.dirY = dy / dist;
    }

    const el = document.elementFromPoint(clientX, clientY);
    this.hovering = this.config.hoverSelector ? !!el?.closest(this.config.hoverSelector) : false;
  }

  resize(w, h) {
    this.width = w;
    this.height = h;
  }

  setColor(rgb) {
    this.colorRGB = rgb;
    this.targetColorRGB = rgb;
  }

  setTargetColor(rgb) {
    this.targetColorRGB = rgb;
  }

  tick() {
    const gl = this.gl;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // targetReveal drops to 0 when the pointer is idle or off-window, which
    // stops feeding the trail so decay can actually clear it — otherwise the
    // blob keeps re-injecting at the last position forever.
    const revealSpeed = this.targetReveal > this.reveal ? 0.05 : 0.2;
    this.reveal = lerp(this.reveal, this.targetReveal, revealSpeed);
    const targetBrush = this.hovering ? this.config.hoverBrushSize : this.config.brushSize;
    this.currentBrushSize = lerp(this.currentBrushSize, targetBrush, 0.08);
    const targetOpacity = this.hovering ? this.config.hoverOpacity : this.config.opacity;
    this.currentOpacity = lerp(this.currentOpacity, targetOpacity, 0.08);
    this.velocity *= 0.9;
    if (this.reveal < 0.05) {
      // trail is invisible — snap the color so re-entry over a different
      // background never paints the previous section's color
      this.colorRGB = [...this.targetColorRGB];
    } else {
      this.colorRGB = [
        lerp(this.colorRGB[0], this.targetColorRGB[0], 0.08),
        lerp(this.colorRGB[1], this.targetColorRGB[1], 0.08),
        lerp(this.colorRGB[2], this.targetColorRGB[2], 0.08),
      ];
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fboB.fb);
    gl.viewport(0, 0, 512, 512);
    gl.useProgram(this.trailProgram);
    gl.enableVertexAttribArray(this.tPosLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.vertexAttribPointer(this.tPosLoc, 2, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.fboA.texture);
    gl.uniform1i(this.tPrevLoc, 0);
    gl.uniform2f(this.tMouseLoc, this.mouseX, this.mouseY);
    gl.uniform2f(this.tMouseDirLoc, this.dirX, this.dirY);
    gl.uniform1f(this.tVelocityLoc, this.velocity);
    gl.uniform1f(this.tDecayLoc, this.config.decay);
    gl.uniform1f(this.tBrushLoc, this.currentBrushSize);
    gl.uniform1f(this.tAspectLoc, this.width / this.height || 1);
    gl.uniform1f(this.tRevealLoc, this.reveal);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    const tmp = this.fboA;
    this.fboA = this.fboB;
    this.fboB = tmp;

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, this.width * dpr, this.height * dpr);
    gl.useProgram(this.halftoneProgram);
    gl.enableVertexAttribArray(this.hPosLoc);
    gl.vertexAttribPointer(this.hPosLoc, 2, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.fboA.texture);
    gl.uniform1i(this.hTrailLoc, 0);
    gl.uniform2f(this.hResLoc, this.width * dpr, this.height * dpr);
    gl.uniform1f(this.hCellLoc, this.config.cellSize);
    gl.uniform3f(this.hColorLoc, this.colorRGB[0], this.colorRGB[1], this.colorRGB[2]);
    gl.uniform1f(this.hOpacityLoc, this.currentOpacity);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    this.rafId = requestAnimationFrame(this.tick);
  }

  destroy() {
    cancelAnimationFrame(this.rafId);
    const gl = this.gl;
    gl.deleteFramebuffer(this.fboA.fb);
    gl.deleteFramebuffer(this.fboB.fb);
    gl.deleteTexture(this.fboA.texture);
    gl.deleteTexture(this.fboB.texture);
    gl.deleteBuffer(this.positionBuffer);
    gl.deleteProgram(this.trailProgram);
    gl.deleteProgram(this.halftoneProgram);
  }
}

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, .cursor-hover, #project, .m-card';

const CustomCursor = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    let engine;
    try {
      engine = new HalftoneTrailEngine(canvas, {
        decay: 0.965,
        brushSize: 0.045,
        hoverBrushSize: 0.02,
        opacity: 0.9,
        hoverOpacity: 0.5,
        speedScale: 38,
        cellSize: 9,
        hoverSelector: INTERACTIVE_SELECTOR,
      });
    } catch {
      return;
    }
    engineRef.current = engine;
    document.documentElement.classList.add("custom-cursor-active");

    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let lastMoveAt = 0;
    let inside = false;

    const sampleColor = () => {
      const dark = isDarkBackgroundAt(lastX, lastY);
      engine.setTargetColor(dark ? [1, 1, 1] : [0, 0, 0]);
    };

    const onPointerMove = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      lastMoveAt = performance.now();
      inside = true;
      engine.targetReveal = 1;
      engine.updatePointer(e.clientX, e.clientY, container.getBoundingClientRect());
      sampleColor();
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Scrolling changes what's under a stationary cursor without firing any
    // pointer event — re-sample periodically, and cut trail input once the
    // pointer has been idle or has left the window.
    const watcher = setInterval(() => {
      if (!inside || performance.now() - lastMoveAt > 300) {
        engine.targetReveal = 0;
      } else {
        sampleColor();
      }
    }, 120);

    const onLeave = () => {
      inside = false;
      engine.targetReveal = 0;
    };
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      engine.resize(rect.width, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      engine.destroy();
      engineRef.current = null;
      clearInterval(watcher);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resize);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return createPortal(
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>,
    document.body
  );
};

export default CustomCursor;

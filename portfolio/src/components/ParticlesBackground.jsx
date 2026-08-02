import { useEffect, useRef } from "react";

const LINK_DISTANCE = 150;
const GRAB_DISTANCE = 220;
const SPEED_CAP = 2.0;
const LINK_SQ = LINK_DISTANCE * LINK_DISTANCE;
const GRAB_SQ = GRAB_DISTANCE * GRAB_DISTANCE;

// Note: deliberately does NOT honor prefers-reduced-motion — the rest of the
// site (GSAP scroll animations, marquees) doesn't either, and gating only this
// component made the particles freeze while everything else kept moving.
const ParticlesBackground = ({ color = "#161616", className = "" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let particles = [];
    let animationId;
    const mouse = { x: null, y: null };

    const targetCount = () => {
      const base = Math.round((width * height) / 4500);
      return Math.max(120, Math.min(base, width < 768 ? 180 : 500));
    };

    const makeParticle = (x, y) => ({
      x: x ?? Math.random() * width,
      y: y ?? Math.random() * height,
      vx: (Math.random() - 0.5) * 2.0,
      vy: (Math.random() - 0.5) * 2.0,
      r: Math.random() * 2.4 + 1.4,
    });

    function drawFrame() {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // gentle pull toward the cursor so hovering visibly disturbs the field
        if (mouse.x !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d = Math.hypot(dx, dy);
          if (d < GRAB_DISTANCE && d > 1) {
            p.vx += (dx / d) * 0.03;
            p.vy += (dy / d) * 0.03;
          }
        }
        const sp = Math.hypot(p.vx, p.vy);
        if (sp > SPEED_CAP) {
          p.vx = (p.vx / sp) * SPEED_CAP;
          p.vy = (p.vy / sp) * SPEED_CAP;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x <= 0) { p.x = 0; p.vx *= -1; }
        if (p.x >= width) { p.x = width; p.vx *= -1; }
        if (p.y <= 0) { p.y = 0; p.vy *= -1; }
        if (p.y >= height) { p.y = height; p.vy *= -1; }
      }

      ctx.lineWidth = 1;
      ctx.strokeStyle = color;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_SQ) {
            const dist = Math.sqrt(d2);
            ctx.globalAlpha = (1 - dist / LINK_DISTANCE) * 0.35;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // grab: strong lines from nearby particles to the cursor
        if (mouse.x !== null) {
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < GRAB_SQ) {
            const dist = Math.sqrt(d2);
            ctx.globalAlpha = (1 - dist / GRAB_DISTANCE) * 0.9;
            ctx.lineWidth = 1.3;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            ctx.lineWidth = 1;
          }
        }
      }

      ctx.globalAlpha = 0.85;
      ctx.fillStyle = color;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: targetCount() }, () => makeParticle());
      drawFrame();
    }

    function loop() {
      drawFrame();
      animationId = requestAnimationFrame(loop);
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > width || y > height) {
        mouse.x = null;
        mouse.y = null;
      } else {
        mouse.x = x;
        mouse.y = y;
      }
    }
    function onMouseLeave() {
      mouse.x = null;
      mouse.y = null;
    }
    function onClick(e) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > width || y > height) return;
      for (let i = 0; i < 4; i++) particles.push(makeParticle(x, y));
      while (particles.length > targetCount() + 40) particles.shift();
    }

    resize();
    animationId = requestAnimationFrame(loop);

    // The wrapper's height can change after mount (font swaps, late layout) —
    // observe it directly so the canvas always covers the full area instead
    // of freezing at the initially-measured size.
    const ro = new ResizeObserver(() => {
      const rect = canvas.parentElement.getBoundingClientRect();
      if (Math.abs(rect.width - width) > 1 || Math.abs(rect.height - height) > 1) {
        resize();
      }
    });
    ro.observe(canvas.parentElement);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: -20 }}
      aria-hidden="true"
    />
  );
};

export default ParticlesBackground;

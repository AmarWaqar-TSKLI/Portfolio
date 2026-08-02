import { Canvas } from "@react-three/fiber";
import { Planet } from "../components/Planet";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const text = `I build powerful digital products that turn
                ideas into unfair advantages crafted
                 through clean code & design.`;
  return (
    <section
      id="home"
      className="relative flex flex-col justify-end min-h-screen"
    >
      <AnimatedHeaderSection
        subTitle={"404 No Bugs Found"}
        title={"Amar Waqar"}
        text={text}
        textColor={"text-black"}
      />
      {/* Extends past the section's bottom edge so the planet's ring isn't
          clipped — it floats over the next section (which has no background)
          instead. The old overflow-x-hidden on this section forced vertical
          clipping too (overflow-x:hidden computes overflow-y to auto), which
          is what was cutting the ring off. */}
      <figure
        className="absolute top-0 left-0 w-full h-[130vh] pointer-events-none"
        style={{ zIndex: -10 }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
        >
          <ambientLight intensity={0.5} />
          <Float speed={0.5}>
            {/* The 130vh canvas renders everything ~1.3x bigger and lower than
                the original 100vh one — scale 0.77 (≈1/1.3) and the +y offset
                restore the original framing, leaving the extra canvas height
                purely as overflow room so the ring isn't clipped anymore. */}
            <Planet
              scale={isMobile ? 0.54 : 0.77}
              position={[0, -0.31, 0]}
            />
          </Float>
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 4, 1]}>
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 5, -9]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 3, 1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[-5, -1, -1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[10, 1, 0]}
                scale={16}
              />
            </group>
          </Environment>
        </Canvas>
      </figure>
    </section>
  );
};

export default Hero;

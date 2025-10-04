import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects } from "../constants";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProjectModal from "../components/ProjectModal";

const Works = () => {
  const overlayRefs = useRef([]);
  const previewRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const text = `Featured projects that have been meticulously
    crafted with passion to drive
    results and impact.`;

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef(null);
  const moveY = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });
    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 2,
      ease: "power3.out",
    });

    gsap.from("#project", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: "#project",
      },
    });

    // Mobile card reveal animation
    // Mobile-only alternating left/right scroll animations
    const mm = gsap.matchMedia();
    mm.add("(max-width: 767px)", () => {
      const cards = gsap.utils.toArray(".m-card");
      cards.forEach((card, i) => {
        const dir = i % 2 === 0 ? -1 : 1; // even: from left, odd: from right

        // Card translates in with scrub
        gsap.fromTo(
          card,
          { x: 60 * dir, autoAlpha: 0.6 },
          {
            x: 0,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              end: "top 40%",
              scrub: true,
            },
          }
        );

        // Scan sweep synced to scroll
        const scan = card.querySelector(".m-scan");
        if (scan) {
          gsap.fromTo(
            scan,
            { yPercent: -140 },
            {
              yPercent: 140,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 98%",
                end: "top 35%",
                scrub: true,
              },
            }
          );
        }

        // Stripes subtle parallax
        const stripes = card.querySelectorAll(".m-stripe");
        if (stripes?.length) {
          gsap.fromTo(
            stripes,
            { x: -20 * dir, autoAlpha: 0.5 },
            {
              x: 0,
              autoAlpha: 1,
              stagger: 0.06,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 95%",
                end: "top 45%",
                scrub: true,
              },
            }
          );
        }
      });
    });
  }, []);

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(index);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 0.15,
        ease: "power2.out",
      }
    );

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(null);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;
    moveX.current(mouse.current.x);
    moveY.current(mouse.current.y);
  };

  return (
    <section id="work" className="flex flex-col min-h-screen overflow-x-hidden">
      <AnimatedHeaderSection
        subTitle={"Logic meets Aesthetics, Seamlessly"}
        title={"Works"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />
      <div
        className="relative flex flex-col font-light overflow-x-hidden"
        onMouseMove={handleMouseMove}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            id="project"
            className="relative flex flex-col gap-1 py-5 cursor-pointer group md:gap-0"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            onClick={() => { setSelectedProject(project); setModalOpen(true); }}
          >
            {/* overlay */}
            <div
              ref={(el) => {
                overlayRefs.current[index] = el;
              }}
              className="absolute inset-0 hidden md:block duration-200 bg-black -z-10 clip-path"
            />

            {/* title (desktop only) */}
            <div className="hidden md:flex justify-between px-10 text-black transition-all duration-500 md:group-hover:px-12 md:group-hover:text-white">
              <h2 className="lg:text-[32px] text-[26px] leading-none">
                {project.name}
              </h2>
              <Icon icon="lucide:arrow-up-right" className="md:size-6 size-5" />
            </div>
            {/* divider (desktop only) */}
            <div className="hidden md:block w-full h-0.5 bg-black/80" />
            {/* framework (desktop only) */}
            <div className="hidden md:flex px-10 text-xs leading-loose uppercase transtion-all duration-500 md:text-sm gap-x-5 md:group-hover:px-12">
              {project.frameworks.map((framework) => (
                <p
                  key={framework.id}
                  className="text-black transition-colors duration-500 md:group-hover:text-white"
                >
                  {framework.name}
                </p>
              ))}
            </div>
            {/* Mobile card - sleek cyberpunk-inspired glass card */}
            <div className="relative md:hidden w-full px-6 overflow-x-hidden">
              <div
                className="m-card relative rounded-2xl border border-white/10 bg-[#070707]/90 backdrop-blur text-white overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-transform duration-300 active:scale-[0.985] h-[224px]"
                onClick={() => { setSelectedProject(project); setModalOpen(true); }}
              >
                {/* soft vignette + faint texture */}
                <div
                  className="absolute inset-0 opacity-25 pointer-events-none"
                  style={{
                    backgroundImage: [
                      "radial-gradient(120% 80% at 0% 0%, rgba(255,255,255,0.08), transparent 60%)",
                      "radial-gradient(120% 80% at 100% 0%, rgba(255,255,255,0.08), transparent 60%)",
                    ].join(",")
                  }}
                />
                {/* diagonal band */}
                <div className="pointer-events-none absolute -inset-x-24 top-1/3 h-24 -rotate-12">
                  <div
                    className="absolute inset-0 border-y border-white/15"
                    style={{
                      backgroundImage: [
                        "linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                        "repeating-linear-gradient(90deg, rgba(255,255,255,0.22) 0 1px, transparent 1px 12px)",
                      ].join(",")
                    }}
                  />
                </div>
                {/* scan sweep (animated via GSAP) */}
                <div className="m-scan absolute -top-full left-0 right-0 h-20 bg-gradient-to-b from-white/10 via-white/5 to-transparent pointer-events-none" />

                {/* corner accents */}
                <div className="pointer-events-none">
                  <div className="absolute left-3 top-3 w-7 h-px bg-white/30" />
                  <div className="absolute left-3 top-3 w-px h-7 bg-white/30" />
                  <div className="absolute right-3 bottom-3 w-7 h-px bg-white/30" />
                  <div className="absolute right-3 bottom-3 w-px h-7 bg-white/30" />
                </div>

                {/* content */}
                <div className="relative z-10 px-4 py-5 flex flex-col gap-3 h-full">
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-white/20 bg-white/[0.03] max-w-[70%]">
                      <span className="text-[11px] uppercase tracking-[0.22em] leading-none whitespace-nowrap overflow-hidden text-ellipsis">
                        {project.name}
                      </span>
                    </div>
                    <Icon icon="lucide:arrow-up-right" className="size-5 opacity-80" />
                  </div>
                  <p
                    className="text-[13px] text-white/75 leading-snug"
                    style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                  >
                    {project.description}
                  </p>
                  <div className="h-px w-full bg-white/10 my-1" />
                  <div className="flex flex-wrap gap-2">
                    {project.frameworks.slice(0,3).map((framework) => (
                      <span
                        key={framework.id}
                        className="text-[10px] tracking-wider uppercase px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/80"
                      >
                        {framework.name}
                      </span>
                    ))}
                    {project.frameworks.length > 3 && (
                      <span className="text-[10px] tracking-wider uppercase px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/80">+{project.frameworks.length - 3}</span>
                    )}
                  </div>
                  {/* push accents to bottom for consistent vertical rhythm */}
                  <div className="relative mt-auto h-5">
                    <div className="m-stripe absolute left-0 top-1 h-[2px] w-24 bg-white/15" />
                    <div className="m-stripe absolute left-10 top-3 h-[2px] w-16 bg-white/10" />
                    <div className="m-stripe absolute left-28 top-2 h-[2px] w-8 bg-white/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* desktop Floating preview image */}
        <div
          ref={previewRef}
          className="fixed -top-2/6 left-0 z-50 overflow-hidden border-8 border-black bg-black pointer-events-none w-[960px] h-[540px] hidden md:flex opacity-0 items-center justify-center"
        >
          {currentIndex !== null && (
            <img
              src={projects[currentIndex].image}
              alt="preview"
              className="object-contain w-full h-full"
            />
          )}
        </div>
      </div>
      <ProjectModal project={selectedProject} open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
};

export default Works;

import React, { useEffect, useRef, useState } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { coursesData } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Courses = () => {
  const text = `Curated learning paths and verified courses—
  crafted to sharpen skills across the stack.`;

  const specRefs = useRef([]);
  const [preview, setPreview] = useState({ open: false, src: "", title: "" });
  const [modalReady, setModalReady] = useState(false);

  useGSAP(() => {
    specRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.from(el, {
        y: 120,
        opacity: 0,
        duration: 1,
        ease: "circ.out",
        delay: i * 0.05,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      });
    });
  }, []);

  const openPreview = (src, title) => setPreview({ open: true, src, title });
  const closePreview = () => setPreview({ open: false, src: "", title: "" });

  useEffect(() => {
    if (preview.open) {
      const t = setTimeout(() => setModalReady(true), 0);
      return () => {
        clearTimeout(t);
        setModalReady(false);
      };
    }
  }, [preview.open]);

  return (
    <section id="courses" className="min-h-screen bg-black rounded-t-4xl overflow-x-clip">
      <AnimatedHeaderSection
        subTitle={"Learn. Build. Verify."}
        title={"Courses"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />

      <div className="flex flex-col gap-10 pb-20">
        {coursesData.map((spec, idx) => {
          const completed = spec.courses.filter((c) => c.completed).length;
          const total = spec.courses.length;
          const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
          return (
            <div
              key={spec.id}
              ref={(el) => (specRefs.current[idx] = el)}
              className="px-10"
            >
              {/* Specialization Card */}
              <div className="relative border border-white/20 bg-black text-white rounded-3xl overflow-hidden">
                {/* top stripes accent */}
                <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-white/10 via-white/30 to-white/10" />
                <div className="p-6 md:p-8 flex flex-col gap-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center">
                        <span className="text-lg">{String(idx + 1).padStart(2, "0")}</span>
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl tracking-wide leading-tight">
                          {spec.title}
                        </h3>
                        {spec.description && (
                          <p className="text-sm text-white/70 leading-snug mt-1">
                            {spec.description}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* progress */}
                    <div className="min-w-[220px]">
                      <div className="flex items-center justify-between text-xs tracking-widest uppercase text-white/60 mb-2">
                        <span>Progress</span>
                        <span>
                          {completed}/{total} • {pct}%
                        </span>
                      </div>
                      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="absolute left-0 top-0 h-full bg-white"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Courses Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 items-stretch">
                    {spec.courses.map((course) => {
                      const inProgress = !course.completed;
                      return (
                        <div
                          key={course.id}
                          className={`group relative rounded-2xl border overflow-hidden transition-all h-full min-h-[160px] md:min-h-[170px] lg:min-h-[180px] ${
                            inProgress
                              ? "border-white/10 bg-white/[0.03] opacity-75"
                              : "border-white/10 bg-[#070707]/90 hover:bg-[#0a0a0a]"
                          } ${(course.image && course.completed) ? "cursor-zoom-in hover:-translate-y-0.5" : ""}`}
                          role="article"
                          aria-label={`${course.title} ${inProgress ? "in progress" : "completed"}`}
                          onClick={() => course.completed && course.image && openPreview(course.image, course.title)}
                        >
                          {/* subtle grid/texture */}
                          <div
                            className="absolute inset-0 opacity-10 pointer-events-none"
                            style={{
                              backgroundImage: [
                                "repeating-linear-gradient(135deg, rgba(255,255,255,0.18) 0 1px, transparent 1px 14px)",
                              ].join(","),
                            }}
                          />
                          {/* left accent rail */}
                          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-white/40 via-white/10 to-transparent" />
                          {/* small diagonal badge in top-right (distinct from projects) */}
                          <div className="absolute -right-14 -top-6 w-40 h-16 -rotate-12 border-y border-white/15 bg-white/[0.03]" />

                          <div className="relative p-4 md:p-5 flex flex-col gap-2 h-full">
                            {/* header row */}
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                {/* provider chip */}
                                {course.provider && (
                                  <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md border border-white/15 bg-white/[0.03] mb-2">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/80">{course.provider}</span>
                                  </div>
                                )}
                                <h4
                                  className="text-[15px] md:text-base tracking-wide leading-snug"
                                  style={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                  }}
                                >
                                  {course.title}
                                </h4>
                              </div>
                              {/* status badge (squareer and crisp) */}
                              <span
                                title={inProgress ? "In Progress" : "Completed"}
                                className={`mt-1 inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] tracking-wider uppercase border ${
                                  inProgress
                                    ? "bg-white/5 text-white/70 border-white/10"
                                    : "bg-white text-black border-white"
                                }`}
                              >
                                {inProgress ? "In Progress" : "Done"}
                              </span>
                            </div>

                            <div className="h-px w-full bg-white/10" />

                            {/* actions: show only for completed */}
                            {!inProgress && (
                              <div className="flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity mt-auto">
                                {course.image && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openPreview(course.image, course.title);
                                    }}
                                    className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase px-3 py-1.5 rounded-md border border-white/15 bg-white/0 hover:bg-white/10 active:scale-[0.98] transition-all"
                                    title="Preview certificate"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-90">
                                      <path d="M12 5c-5 0-8.5 4.5-9.5 6 .9 1.5 4.5 6 9.5 6s8.6-4.5 9.5-6c-.9-1.5-4.5-6-9.5-6Z" stroke="currentColor" strokeWidth="2"/>
                                      <circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                    <span>Preview</span>
                                  </button>
                                )}
                                {course.verifyUrl && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      window.open(course.verifyUrl, "_blank", "noreferrer");
                                    }}
                                    className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase px-3 py-1.5 rounded-md border border-white/15 bg-white/0 hover:bg-white/10 active:scale-[0.98] transition-all"
                                    title="Open certificate"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-90">
                                      <path d="M14 3h7v7" stroke="currentColor" strokeWidth="2"/>
                                      <path d="M21 3l-9 9" stroke="currentColor" strokeWidth="2"/>
                                      <path d="M5 12v7h7" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                    <span>Verify</span>
                                  </button>
                                )}
                              </div>
                            )}
                            {inProgress && (
                              <div className="mt-auto h-[32px]" aria-hidden="true" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Image Preview Modal */}
      {preview.open && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={closePreview}
        >
          <div
            className={`relative max-w-4xl w-[92vw] md:w-[80vw] aspect-video bg-black border-8 border-black overflow-hidden transition-all duration-200 ${
              modalReady ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {preview.src && (
              <img
                src={preview.src}
                alt={preview.title}
                className="object-contain w-full h-full"
              />
            )}
            <button
              aria-label="Close"
              className="absolute top-2 right-2 w-9 h-9 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-transform duration-200 hover:rotate-90"
              onClick={closePreview}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Courses;

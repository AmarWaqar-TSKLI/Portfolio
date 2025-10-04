import React, { useRef, useState } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { coursesData } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Courses = () => {
  const text = `Curated learning paths and verified courses—
  crafted to sharpen skills across the stack.`;

  const specRefs = useRef([]);
  const [preview, setPreview] = useState({ open: false, src: "", title: "" });

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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                    {spec.courses.map((course) => (
                      <div
                        key={course.id}
                        className="group relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
                      >
                        {/* subtle pattern */}
                        <div
                          className="absolute inset-0 opacity-10 pointer-events-none"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(135deg, rgba(255,255,255,0.18) 0 1px, transparent 1px 14px)",
                          }}
                        />
                        <div className="relative p-5 flex flex-col gap-3">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h4 className="text-lg tracking-wide leading-tight">
                                {course.title}
                              </h4>
                              {course.provider && (
                                <p className="text-xs uppercase tracking-wider text-white/60 mt-1">
                                  {course.provider}
                                </p>
                              )}
                            </div>
                            {/* status dot */}
                            <span
                              title={course.completed ? "Completed" : "In Progress"}
                              className={`mt-1 inline-block w-2.5 h-2.5 rounded-full ${
                                course.completed ? "bg-white" : "bg-white/40"
                              }`}
                            />
                          </div>
                          {/* actions */}
                          <div className="flex items-center gap-3 mt-1">
                            {course.verifyUrl && (
                              <button
                                onClick={() => window.open(course.verifyUrl, "_blank", "noreferrer")}
                                className="text-xs tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/15 bg-white/0 hover:bg-white/10 transition-colors"
                              >
                                Verify
                              </button>
                            )}
                            {course.image && (
                              <button
                                onClick={() => openPreview(course.image, course.title)}
                                className="text-xs tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/15 bg-white/0 hover:bg-white/10 transition-colors"
                              >
                                Preview
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
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
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70"
          onClick={closePreview}
        >
          <div
            className="relative max-w-4xl w-[92vw] md:w-[80vw] aspect-video bg-black border-8 border-black overflow-hidden"
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
              className="absolute top-2 right-2 text-xs tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
              onClick={closePreview}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Courses;

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Pill = ({ children }) => (
  <span className="text-[10px] tracking-wider uppercase px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">
    {children}
  </span>
);

const PlaceholderBox = ({ label = "Coming soon" }) => (
  <div className="relative w-full bg-white/[0.04] border border-white/10 rounded-xl aspect-video flex items-center justify-center overflow-hidden">
    <div
      className="absolute inset-0 opacity-10 pointer-events-none"
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(255,255,255,0.18) 0 1px, transparent 1px 14px)",
      }}
    />
    <span className="text-xs uppercase tracking-widest text-white/60">{label}</span>
  </div>
);

const ActionButton = ({ icon, children, href, disabled, onClick }) => (
  <button
    onClick={(e) => {
      if (disabled) return;
      if (href) {
        e.stopPropagation();
        window.open(href, "_blank", "noreferrer");
      } else if (onClick) {
        onClick(e);
      }
    }}
    className={`inline-flex items-center gap-1.5 text-xs tracking-widest uppercase px-3 py-1.5 rounded-full border transition-all
      ${disabled ? "border-white/10 text-white/40 cursor-not-allowed" : "border-white/15 text-white hover:bg-white/10 active:scale-[0.98]"}`}
    aria-disabled={disabled}
    title={disabled ? "Unavailable" : undefined}
  >
    {icon && <Icon icon={icon} className="text-sm opacity-90" />}
    <span>{children}</span>
  </button>
);

const Carousel = ({ slides }) => {
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const count = slides.length;

  const goTo = (i) => setIndex(clamp(i, 0, count - 1));
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const onTouchMove = (e) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    const dx = touchDeltaX.current;
    if (Math.abs(dx) > 40) {
      dx < 0 ? next() : prev();
    }
    touchDeltaX.current = 0;
  };

  return (
    <div className="relative w-full select-none">
      <div
        ref={trackRef}
        className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]"
      >
        <div
          className="flex w-full will-change-transform"
          style={{ transform: `translateX(-${index * 100}%)`, transition: "transform 300ms ease" }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {slides.map((slide, i) => (
            <div key={i} className="min-w-full aspect-video flex items-center justify-center overflow-hidden">
              {slide.type === "image" && (slide.src ? (
                <img src={slide.src} alt={slide.alt || "slide"} className="object-cover w-full h-full" />
              ) : (
                <PlaceholderBox label={slide.label || "Image coming soon"} />
              ))}
              {slide.type === "video" && (slide.src ? (
                <video controls className="w-full h-full object-contain bg-black">
                  <source src={slide.src} />
                </video>
              ) : (
                <PlaceholderBox label={slide.label || "Video coming soon"} />
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* controls */}
      <button
        aria-label="Previous"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 border border-white/20 text-white hover:bg-black/60 backdrop-blur flex items-center justify-center"
      >
        <Icon icon="lucide:chevron-left" className="text-lg" />
      </button>
      <button
        aria-label="Next"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 border border-white/20 text-white hover:bg-black/60 backdrop-blur flex items-center justify-center"
      >
        <Icon icon="lucide:chevron-right" className="text-lg" />
      </button>
      {/* dots */}
      <div className="flex items-center justify-center gap-1.5 mt-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full ${i === index ? "bg-white" : "bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectModal = React.memo(({ project, open, onClose }) => {
  const [ready, setReady] = useState(false);
  const scrollRef = useRef(null);
  const [showBottomFade, setShowBottomFade] = useState(false);
  
  // Open animation readiness
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => setReady(true), 0);
    return () => { clearTimeout(t); setReady(false); };
  }, [open]);

  // Build media slides: first image + 3 images; always call hooks unconditionally
  const slides = useMemo(() => {
    const media = project?.media;
    if (Array.isArray(media) && media.length) return media;
    return [
      { type: "image", src: project?.image || "", label: "Primary image coming soon" },
      { type: "image", src: "", label: "Coming soon" },
      { type: "image", src: "", label: "Coming soon" },
      { type: "image", src: "", label: "Coming soon" },
    ];
  }, [project]);

  // Determine if content is scrollable (hook must always run; guard inside)
  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      setShowBottomFade(el.scrollHeight - el.scrollTop - el.clientHeight > 8);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    return () => el.removeEventListener("scroll", update);
  }, [open]);

  if (!open || !project) return null;

  const liveUrl = project.liveUrl || project.href || "";
  const repoUrl = project.repoUrl || "";

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className={`relative w-[96vw] md:w-[88vw] lg:w-[80vw] max-w-6xl bg-black text-white border border-white/15 rounded-2xl overflow-hidden
        transition-all duration-300 ${ready ? "opacity-100 translate-y-0 md:scale-100" : "opacity-0 translate-y-6 md:scale-95"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* top accent */}
        <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-white/10 via-white/30 to-white/10" />
        {/* content wrapper: mobile-only inner scroll, desktop uses page scroll */}
        <div
          ref={scrollRef}
          className="relative modal-scroll p-5 md:p-7 flex flex-col gap-5 max-h-[86vh] overflow-y-auto md:max-h-none md:overflow-visible"
        >
          {/* header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl md:text-3xl tracking-wide leading-tight">{project.name}</h3>
              <p className="text-[13px] md:text-sm text-white/75 leading-relaxed mt-2">
                {project.longDescription || project.description}
              </p>
            </div>
            <button
              aria-label="Close"
              className="w-9 h-9 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-transform duration-200 hover:rotate-90"
              onClick={onClose}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>

          {/* media carousel: first image + 3 images */}
          <Carousel slides={slides} />

          {/* details */}
          <div className="mt-2 space-y-2">
            <h4 className="text-sm uppercase tracking-widest text-white/60">Features</h4>
            {project.features?.length ? (
              <ul className="list-disc list-inside text-sm text-white/80 leading-relaxed">
                {project.features.map((ft, i) => (
                  <li key={i}>{ft}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-white/60">Feature details coming soon.</p>
            )}
          </div>

          {/* actions */}
          <div className="flex flex-wrap gap-2 pt-2">
            <ActionButton icon="mdi:github" href={repoUrl} disabled={!repoUrl}>GitHub</ActionButton>
            <ActionButton icon="lucide:external-link" href={liveUrl} disabled={!liveUrl}>Live Preview</ActionButton>
          </div>

          {/* bottom scroll indicator fade (mobile) */}
          {showBottomFade && (
            <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-10 bg-gradient-to-t from-black to-transparent md:hidden" />
          )}
        </div>
      </div>
    </div>
  );
});

export default ProjectModal;

import React, { useEffect, useRef, useState } from "react";

const links = [
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const firstMobileLinkRef = useRef(null);
  const isScrolling = useRef(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      firstMobileLinkRef.current?.focus();
    }, 50);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setActiveSection(href);
    isScrolling.current = true;
    
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    
    // Reset scroll locking after animation
    setTimeout(() => {
      isScrolling.current = false;
    }, 1000);
  };

  // Scroll spy using IntersectionObserver
  useEffect(() => {
    const sectionIds = links.map((l) => l.href.substring(1));
    const intersecting = {};

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling.current) return;

        entries.forEach((entry) => {
          intersecting[entry.target.id] = entry.isIntersecting;
        });

        const activeId = sectionIds.find((id) => intersecting[id]);
        if (activeId) {
          setActiveSection(`#${activeId}`);
        } else if (window.scrollY < 100) {
          setActiveSection("");
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md select-none">
      <div className="mx-auto max-w-6xl px-6 md:px-12 py-4 flex flex-row items-center justify-between">
        <div className="text-xl font-bold tracking-tight font-mono">
          <a href="/" className="flex items-center gap-1 group">
            <span className="text-cyan-400 group-hover:text-emerald-400 transition-colors">&lt;</span>
            <span className="text-zinc-100 font-semibold hidden sm:inline">Yeabsira Driba</span>
            <span className="text-zinc-105 font-semibold sm:hidden">YD</span>
            <span className="text-cyan-405 group-hover:text-emerald-400 transition-colors">/&gt;</span>
          </a>
        </div>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex flex-row flex-wrap items-center gap-x-8">
          {links.map((l) => {
            const isActive = activeSection === l.href;
            return (
              <a
                key={l.href}
                className={`font-sans text-sm font-medium transition-all relative py-1 ${
                  isActive 
                    ? "text-cyan-400" 
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
              >
                {l.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 rounded shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile Navigation Menu Button */}
        <button
          type="button"
          className="md:hidden rounded-xl border border-zinc-800 bg-zinc-950 w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-all"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <div className="relative w-4 h-4">
            <span
              className={[
                "absolute left-0 w-4 h-[2px] bg-zinc-300 rounded",
                "transition-all duration-350 ease-in-out",
                open ? "top-2 rotate-45" : "top-0.5",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 w-4 h-[2px] bg-zinc-300 rounded",
                "transition-all duration-350 ease-in-out",
                open ? "top-2 opacity-0 scale-0" : "top-2 opacity-100 scale-100",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 w-4 h-[2px] bg-zinc-300 rounded",
                "transition-all duration-350 ease-in-out",
                open ? "top-2 -rotate-45" : "top-[13px]",
              ].join(" ")}
            />
          </div>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={[
          "md:hidden fixed inset-0 z-50 transition-all duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
      >
        <button
          type="button"
          className="absolute inset-0 w-full h-full bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          aria-label="Close navigation overlay"
          onClick={() => setOpen(false)}
        />

        <div
          className={[
            "absolute left-0 right-0 top-16 mx-6 rounded-2xl border border-zinc-800",
            "bg-zinc-950/95 backdrop-blur-xl shadow-2xl",
            "transition-all duration-350 ease-in-out",
            open ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
        >
          <nav className="p-4 flex flex-col gap-1 font-sans">
            {links.map((l, idx) => {
              const isActive = activeSection === l.href;
              return (
                <a
                  key={l.href}
                  ref={idx === 0 ? firstMobileLinkRef : null}
                  className={`rounded-xl px-4 py-3 hover:bg-zinc-900/60 transition-all font-medium flex items-center justify-between ${
                    isActive ? "text-cyan-400 bg-zinc-900/30" : "text-zinc-300"
                  }`}
                  href={l.href}
                  onClick={(e) => {
                    handleNavClick(e, l.href);
                    setOpen(false);
                  }}
                >
                  <span>{l.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../theme/ThemeContext";

const links = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
];

/* ── Sun icon (light mode indicator) ── */
const SunIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

/* ── Moon icon (dark mode indicator) ── */
const MoonIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

/* ── Animated Toggle ── */
const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      onClick={toggle}
      className="theme-toggle-btn"
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
    >
      <span className="theme-toggle-thumb">
        {isLight ? (
          <span style={{ color: "#ffffff" }}><SunIcon /></span>
        ) : (
          <span style={{ color: "#c7d2fe" }}><MoonIcon /></span>
        )}
      </span>
    </button>
  );
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const firstMobileLinkRef = useRef(null);
  const isScrolling = useRef(false);
  const { theme } = useTheme();
  const isLight = theme === "light";

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
    <header
      className="fixed top-0 left-0 right-0 z-40 w-full border-b select-none"
      style={{
        background: "var(--bg-nav)",
        borderBottomColor: "var(--border-muted)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        transition: "var(--transition-theme)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12 py-4 flex flex-row items-center justify-between">
        <div className="text-xl font-bold tracking-tight font-mono">
          <a href="/" className="flex items-center group">
            <span
              className="font-semibold hidden sm:inline transition-colors"
              style={{ color: "var(--text-heading)" }}
            >
              Yeabsira Driba
            </span>
            <span
              className="font-semibold sm:hidden transition-colors"
              style={{ color: "var(--text-heading)" }}
            >
              YD
            </span>
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
                    : isLight
                      ? "hover:text-zinc-700"
                      : "hover:text-zinc-200"
                }`}
                style={
                  isActive
                    ? {}
                    : { color: "var(--text-secondary)" }
                }
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

          {/* Theme Toggle — desktop */}
          <ThemeToggle />
        </nav>

        {/* Mobile right side: toggle + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-xl border w-10 h-10 flex items-center justify-center transition-all"
            style={{
              borderColor: "var(--border-default)",
              background: "var(--bg-surface)",
              color: "var(--text-secondary)",
            }}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <div className="relative w-4 h-4">
              <span
                className={[
                  "absolute left-0 w-4 h-[2px] rounded",
                  "transition-all duration-350 ease-in-out",
                  open ? "top-2 rotate-45" : "top-0.5",
                ].join(" ")}
                style={{ background: "var(--text-primary)" }}
              />
              <span
                className={[
                  "absolute left-0 w-4 h-[2px] rounded",
                  "transition-all duration-350 ease-in-out",
                  open ? "top-2 opacity-0 scale-0" : "top-2 opacity-100 scale-100",
                ].join(" ")}
                style={{ background: "var(--text-primary)" }}
              />
              <span
                className={[
                  "absolute left-0 w-4 h-[2px] rounded",
                  "transition-all duration-350 ease-in-out",
                  open ? "top-2 -rotate-45" : "top-[13px]",
                ].join(" ")}
                style={{ background: "var(--text-primary)" }}
              />
            </div>
          </button>
        </div>
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
          className="absolute inset-0 w-full h-full backdrop-blur-sm transition-opacity duration-300"
          style={{ background: "rgba(0,0,0,0.5)" }}
          aria-label="Close navigation overlay"
          onClick={() => setOpen(false)}
        />

        <div
          className={[
            "absolute left-0 right-0 top-16 mx-6 rounded-2xl border shadow-2xl",
            "transition-all duration-350 ease-in-out",
            open ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95",
          ].join(" ")}
          style={{
            background: "var(--bg-nav)",
            borderColor: "var(--border-default)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
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
                  className={`rounded-xl px-4 py-3 transition-all font-medium flex items-center justify-between ${
                    isActive ? "text-cyan-400" : ""
                  }`}
                  style={{
                    background: isActive ? "rgba(6,182,212,0.08)" : "transparent",
                    color: isActive ? undefined : "var(--text-secondary)",
                  }}
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

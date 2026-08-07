import { useCallback, useEffect, useRef, useState } from "react";

import { useTheme } from "../theme/ThemeContext";

const LINKS = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
];

/** Smooth scrolling takes roughly this long; the scroll spy is muted until it settles. */
const SCROLL_SETTLE_MS = 1000;

const HAMBURGER_BARS = [
  { open: "top-2 rotate-45", closed: "top-0.5" },
  { open: "top-2 opacity-0 scale-0", closed: "top-2 opacity-100 scale-100" },
  { open: "top-2 -rotate-45", closed: "top-[13px]" },
];

const SunIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
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

const MoonIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";
  const label = isLight ? "Switch to dark mode" : "Switch to light mode";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={toggle}
      className="theme-toggle-btn"
    >
      <span className="theme-toggle-thumb">
        {isLight ? (
          <span style={{ color: "#ffffff" }}>
            <SunIcon />
          </span>
        ) : (
          <span style={{ color: "#c7d2fe" }}>
            <MoonIcon />
          </span>
        )}
      </span>
    </button>
  );
};

/**
 * One underline shared by every link, moved to the active one — a per-link
 * element would unmount and remount, which cannot be transitioned.
 */
const useNavIndicator = (linkRefs, activeSection) => {
  const [indicator, setIndicator] = useState({ left: 0, width: 0, top: 0, visible: false });

  useEffect(() => {
    let cancelled = false;

    const measure = () => {
      if (cancelled) return;
      const el = linkRefs.current[activeSection];
      if (!el) {
        setIndicator((prev) => ({ ...prev, visible: false }));
        return;
      }
      setIndicator({
        left: el.offsetLeft,
        width: el.offsetWidth,
        top: el.offsetTop + el.offsetHeight - 2,
        visible: true,
      });
    };

    measure();

    // Widths shift on resize, and again once the webfont swaps in
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => {});

    return () => {
      cancelled = true;
      window.removeEventListener("resize", measure);
    };
  }, [linkRefs, activeSection]);

  return indicator;
};

/** Tracks which nav section is in view, unless a click-triggered scroll is in flight. */
const useScrollSpy = (isScrolling) => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sectionIds = LINKS.map((l) => l.href.slice(1));
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
  }, [isScrolling]);

  return [activeSection, setActiveSection];
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const firstMobileLinkRef = useRef(null);
  const linkRefs = useRef({});
  const isScrolling = useRef(false);
  const scrollTimer = useRef(null);

  const [activeSection, setActiveSection] = useScrollSpy(isScrolling);
  const indicator = useNavIndicator(linkRefs, activeSection);

  const { theme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // While the mobile drawer is open: lock the page, close on Escape, and move
  // focus into the drawer once its entry transition has started.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    const focusTimer = window.setTimeout(() => firstMobileLinkRef.current?.focus(), 50);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(scrollTimer.current), []);

  const handleNavClick = useCallback(
    (e, href) => {
      e.preventDefault();
      setActiveSection(href);

      // Mute the scroll spy so it doesn't fight the smooth scroll it triggers.
      isScrolling.current = true;
      window.clearTimeout(scrollTimer.current);
      scrollTimer.current = window.setTimeout(() => {
        isScrolling.current = false;
      }, SCROLL_SETTLE_MS);

      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    },
    [setActiveSection]
  );

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

        <nav className="hidden md:flex flex-row items-center gap-x-8 relative">
          {LINKS.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                ref={(el) => {
                  linkRefs.current[link.href] = el;
                }}
                className={`font-sans text-sm font-medium transition-colors py-1 ${
                  isActive
                    ? "text-cyan-400"
                    : isLight
                      ? "hover:text-zinc-700"
                      : "hover:text-zinc-200"
                }`}
                style={isActive ? undefined : { color: "var(--text-secondary)" }}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            );
          })}

          <span
            className="nav-indicator absolute h-[2px] rounded bg-cyan-400 pointer-events-none shadow-[0_0_8px_rgba(6,182,212,0.6)]"
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: `${indicator.width}px`,
              top: `${indicator.top}px`,
              opacity: indicator.visible ? 1 : 0,
            }}
            aria-hidden="true"
          />

          <ThemeToggle />
        </nav>

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
            <div className="relative w-4 h-4">
              {HAMBURGER_BARS.map((bar, index) => (
                <span
                  key={index}
                  className={`absolute left-0 w-4 h-[2px] rounded transition-all ease-in-out ${
                    open ? bar.open : bar.closed
                  }`}
                  style={{ background: "var(--text-primary)" }}
                />
              ))}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer. Kept mounted so it can transition; links are pulled out
          of the tab order while it is hidden. */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className="absolute inset-0 w-full h-full backdrop-blur-sm transition-opacity duration-300"
          style={{ background: "rgba(0,0,0,0.5)" }}
          aria-label="Close navigation overlay"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
        />

        <div
          className={`absolute left-0 right-0 top-16 mx-6 rounded-2xl border shadow-2xl transition-all ease-in-out ${
            open ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
          }`}
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
            {LINKS.map((link, index) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  ref={index === 0 ? firstMobileLinkRef : null}
                  className={`rounded-xl px-4 py-3 transition-all font-medium flex items-center justify-between ${
                    isActive ? "text-cyan-400" : ""
                  }`}
                  style={{
                    background: isActive ? "rgba(6,182,212,0.08)" : "transparent",
                    color: isActive ? undefined : "var(--text-secondary)",
                  }}
                  href={link.href}
                  tabIndex={open ? 0 : -1}
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    setOpen(false);
                  }}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                  )}
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

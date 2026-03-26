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
  const firstMobileLinkRef = useRef(null);

  useEffect(() => {
    const onResize = () => {
      // Avoid keeping the mobile menu open when switching to desktop layout.
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

  return (
    <div className="border-b-[1px] py-5 px-6 md:px-12 mb-5">
      <div className="flex flex-row items-center gap-6 justify-between">
        <div className="text-2xl font-semibold tracking-tight">
          <a href="/" className="flex items-center">
            <span className="hidden sm:inline">Yeabsira Gurmu</span>
            <span className="sm:hidden">YD</span>
          </a>
        </div>

        <button
          type="button"
          className="md:hidden rounded-xl border border-neutral-200 w-11 h-11 flex items-center justify-center text-neutral-800 hover:bg-neutral-50 transition-colors"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <div className="relative w-5 h-5">
            <span
              className={[
                "absolute left-0 w-5 h-[2px] bg-neutral-800 rounded",
                "transition-all duration-300 ease-in-out",
                open ? "top-2.5 rotate-45" : "top-1",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 w-5 h-[2px] bg-neutral-800 rounded",
                "transition-all duration-300 ease-in-out",
                open ? "top-2.5 opacity-0 scale-0" : "top-2.5 opacity-100 scale-100",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 w-5 h-[2px] bg-neutral-800 rounded",
                "transition-all duration-300 ease-in-out",
                open ? "top-2.5 -rotate-45" : "top-[14px]",
              ].join(" ")}
            />
          </div>
        </button>

        <nav className="hidden md:flex flex-row flex-wrap justify-end gap-x-6 gap-y-2">
          {links.map((l) => (
            <a key={l.href} className="hover:opacity-80" href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      <div
        className={[
          "md:hidden fixed inset-0 z-50",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={[
            "absolute inset-0 w-full h-full bg-neutral-900/20 transition-opacity duration-300 ease-in-out",
            open ? "opacity-100" : "opacity-0",
          ].join(" ")}
          aria-label="Close navigation overlay"
          onClick={() => setOpen(false)}
        />

        <div
          className={[
            "absolute left-0 right-0 top-16 mx-6 rounded-2xl border border-neutral-200",
            "bg-white/85 backdrop-blur shadow-lg",
            "transition-all duration-300 ease-in-out",
            open ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
        >
          <nav className="p-4 flex flex-col gap-2">
            {links.map((l, idx) => (
              <a
                key={l.href}
                ref={idx === 0 ? firstMobileLinkRef : null}
                className="rounded-xl px-3 py-3 hover:bg-neutral-50 transition-colors text-neutral-900"
                href={l.href}
                onClick={() => setOpen(false)}
              >
                <span className="font-medium">{l.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;

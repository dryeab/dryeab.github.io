import React from "react";

const Footer = () => {
  return (
    <footer
      className="py-8 select-none"
      style={{
        borderTop: "1px solid var(--border-muted)",
        background: "transparent",
        transition: "var(--transition-theme)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
          &copy; {new Date().getFullYear()} Yeabsira Driba. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

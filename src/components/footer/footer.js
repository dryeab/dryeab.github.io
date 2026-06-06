import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950/20 py-8 select-none">
      <div className="mx-auto max-w-6xl px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs font-mono text-zinc-500">
          &copy; {new Date().getFullYear()} Yeabsira Driba. All rights reserved.
        </div>
        <div className="text-[10px] font-mono text-zinc-600">
          Built with React, TailwindCSS &amp; Obsidian UI
        </div>
      </div>
    </footer>
  );
};

export default Footer;

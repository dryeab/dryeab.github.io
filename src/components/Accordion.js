import React, { useState } from "react";
import { FiChevronDown, FiExternalLink } from "react-icons/fi";

/**
 * Two accent families keep Experience and Projects visually distinct:
 * cyan reads as the "professional record", emerald as the "build log".
 * Exposed to CSS as custom properties so :hover / :focus-visible can use them.
 */
const ACCENTS = {
  cyan: { hex: "#22d3ee", soft: "rgba(6, 182, 212, 0.07)", ring: "rgba(6, 182, 212, 0.45)", tag: "#67e8f9" },
  emerald: { hex: "#34d399", soft: "rgba(16, 185, 129, 0.07)", ring: "rgba(16, 185, 129, 0.45)", tag: "#6ee7b7" },
};

/**
 * Pull the quantitative results out of a bullet so they read at a glance:
 * "over 100", "25%", "3,000". Deliberately narrow — it only matches percentages,
 * N+ forms, "over N", and multi-digit numbers, so tokens like "A2SV", "C++"
 * and ".NET" are left alone.
 */
const METRIC = /(\d[\d,]*(?:\.\d+)?\s*%|\b\d[\d,]*\d\+|\bover \d(?:[\d,]*\d)?|\b\d{2,}(?:,\d{3})*\b)/gi;

const withMetrics = (text, color) =>
  String(text)
    .split(METRIC)
    .map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} style={{ color, fontWeight: 600 }}>
          {part}
        </strong>
      ) : (
        part
      )
    );

export function AccordionItem({
  title,
  subtitle,
  meta,
  tags,
  bullets,
  command,
  url,
  linkLabel,
  leading,
  watermark,
  monoTitle = false,
  defaultOpen = false,
  timeline = false,
  accent = "cyan",
  children,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const a = ACCENTS[accent] || ACCENTS.cyan;

  return (
    <div
      className={timeline ? "flex items-start gap-3 sm:gap-5" : "relative"}
      style={{ "--accent-soft": a.soft, "--accent-ring": a.ring }}
    >
      {/* In timeline mode the leading element IS the rail node, so it sits on
          the spine instead of inside the card. mt matches the card's padding +
          half the title's line-height, which is why it differs by breakpoint. */}
      {timeline && leading && (
        <div
          className="shrink-0 relative z-10 mt-3.5 sm:mt-4 rounded-xl transition-all duration-300"
          style={{
            transform: open ? "scale(1.06)" : "scale(1)",
            boxShadow: open ? `0 0 0 4px ${a.hex}1f` : "none",
          }}
        >
          {leading}
        </div>
      )}

      <div className="entry-card glass-card rounded-2xl overflow-hidden relative flex-1 min-w-0">
        {/* Accent wash while open */}
        <span
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
          style={{
            background: `linear-gradient(180deg, ${a.hex}12, transparent 55%)`,
            opacity: open ? 1 : 0,
          }}
        />

        {/* Oversized index used as texture behind the card content */}
        {watermark && (
          <span
            className="absolute right-4 bottom-0 pointer-events-none select-none font-mono font-bold leading-none z-0"
            style={{ fontSize: "5.5rem", color: a.hex, opacity: 0.06 }}
            aria-hidden="true"
          >
            {watermark}
          </span>
        )}

        {/* Accent edge — lights up while the entry is open */}
        <span
          className="absolute left-0 top-0 bottom-0 w-[3px] z-10 transition-opacity duration-300"
          style={{ background: a.hex, opacity: open ? 1 : 0 }}
        />

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="exp-toggle relative z-10 w-full text-left p-5 sm:p-6 flex items-start gap-4"
        >
          {!timeline && leading}

          <div className="flex-1 min-w-0">
            <h4
              className={`text-base sm:text-lg font-bold tracking-tight ${monoTitle ? "font-mono" : "font-sans"}`}
              style={{ color: "var(--text-heading)" }}
            >
              {title}
            </h4>

            {(subtitle || meta) && (
              <div className="mt-1 flex flex-wrap items-center gap-x-2 text-xs font-mono">
                {subtitle && <span className="font-semibold" style={{ color: a.hex }}>{subtitle}</span>}
                {subtitle && meta && <span className="opacity-40" style={{ color: "var(--text-muted)" }}>&middot;</span>}
                {meta && <span style={{ color: "var(--text-muted)" }}>{meta}</span>}
              </div>
            )}

            {tags && tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded"
                    style={{
                      background: "var(--bg-tag)",
                      border: "1px solid var(--border-default)",
                      color: a.tag,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <span
            className="shrink-0 mt-1 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              border: "1px solid var(--border-default)",
              color: open ? a.hex : "var(--text-muted)",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <FiChevronDown className="w-4 h-4" />
          </span>
        </button>

        {/* 0fr → 1fr animates to the content's natural height without measuring it */}
        <div
          className="exp-panel relative z-10"
          style={{
            display: "grid",
            gridTemplateRows: open ? "1fr" : "0fr",
            transition: "grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div className="overflow-hidden">
            <div className="px-5 sm:px-6 pb-5 sm:pb-6">
              <div className="pt-4" style={{ borderTop: "1px solid var(--border-muted)" }}>
                {children || (
                  <ul className="space-y-2.5 text-sm font-sans" style={{ color: "var(--text-secondary)" }}>
                    {(bullets || []).map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 leading-relaxed">
                        <span
                          className="mt-1 shrink-0 select-none"
                          style={{ color: a.hex, fontSize: "12px", lineHeight: "1.6" }}
                        >
                          &rsaquo;
                        </span>
                        <span>{withMetrics(b, a.hex)}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {command && (
                  <div
                    className="mt-4 flex items-center gap-2.5 rounded-lg px-3 py-2.5 font-mono text-xs overflow-x-auto"
                    style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)" }}
                  >
                    <span className="select-none shrink-0" style={{ color: a.hex }}>$</span>
                    <code style={{ color: "var(--text-secondary)" }}>{command}</code>
                  </div>
                )}

                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-mono transition-opacity hover:opacity-70"
                    style={{ color: a.hex }}
                  >
                    <span>{linkLabel || "Visit site"}</span>
                    <FiExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * `timeline` draws the chronological spine + nodes (Experience). Projects are
 * not chronological, so they render as a plain stack.
 */
export default function AccordionList({ items, timeline = false, accent = "cyan" }) {
  if (!timeline) {
    return (
      <div className="space-y-4">
        {items.map((item) => (
          <AccordionItem key={item.title} {...item} accent={accent} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative space-y-4">
      {/* Gradient spine, centred under the rail nodes (18px / 22px half-widths) */}
      <span className="absolute top-0 bottom-0 w-px timeline-line left-[18px] sm:left-[22px]" />
      {items.map((item) => (
        <AccordionItem key={item.title} {...item} timeline accent={accent} />
      ))}
    </div>
  );
}

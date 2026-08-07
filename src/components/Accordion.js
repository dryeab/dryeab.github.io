import { useState } from "react";
import { FiChevronDown, FiExternalLink } from "react-icons/fi";

/**
 * Two accent families keep Experience and Projects visually distinct:
 * cyan reads as the "professional record", emerald as the "build log".
 * Exposed to CSS as custom properties so :hover / :focus-visible can use them.
 */
const ACCENTS = {
  cyan: {
    hex: "#22d3ee",
    soft: "rgba(6, 182, 212, 0.07)",
    ring: "rgba(6, 182, 212, 0.45)",
    tag: "#67e8f9",
  },
  emerald: {
    hex: "#34d399",
    soft: "rgba(16, 185, 129, 0.07)",
    ring: "rgba(16, 185, 129, 0.45)",
    tag: "#6ee7b7",
  },
};

const PANEL_TRANSITION = "grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1)";

export function AccordionItem({
  title,
  subtitle,
  meta,
  tags,
  bullets,
  command,
  url,
  linkLabel,
  monoTitle = false,
  defaultOpen = false,
  timeline = false,
  accent = "cyan",
  children,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const tone = ACCENTS[accent] ?? ACCENTS.cyan;

  return (
    <div
      className={timeline ? "flex items-start gap-4 sm:gap-5" : "relative"}
      style={{ "--accent-soft": tone.soft, "--accent-ring": tone.ring }}
    >
      {/* Rail node. mt = card padding + half the title's line-height, so the dot
          centres on the title at every breakpoint (16+12=28 / 20+14=34, less the
          dot's 5px radius). */}
      {timeline && (
        <span
          className="shrink-0 w-2.5 h-2.5 rounded-full border-2 relative z-10 mt-[23px] sm:mt-[29px] transition-all duration-300"
          style={{
            backgroundColor: "var(--bg-base)",
            borderColor: tone.hex,
            transform: open ? "scale(1.25)" : "scale(1)",
            boxShadow: open ? `0 0 0 4px ${tone.hex}1f` : "none",
          }}
        />
      )}

      <div className="entry-card glass-card rounded-2xl overflow-hidden relative flex-1 min-w-0">
        {/* Accent wash while open */}
        <span
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
          style={{
            background: `linear-gradient(180deg, ${tone.hex}12, transparent 55%)`,
            opacity: open ? 1 : 0,
          }}
        />

        {/* Accent edge — lights up while the entry is open */}
        <span
          className="absolute left-0 top-0 bottom-0 w-[3px] z-10 transition-opacity duration-300"
          style={{ background: tone.hex, opacity: open ? 1 : 0 }}
        />

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="exp-toggle relative z-10 w-full text-left p-4 sm:p-5 flex items-start gap-3"
        >
          <div className="flex-1 min-w-0">
            <h4
              className={`text-base sm:text-lg font-bold tracking-tight ${
                monoTitle ? "font-mono" : "font-sans"
              }`}
              style={{ color: "var(--text-heading)" }}
            >
              {title}
            </h4>

            {(subtitle || meta) && (
              <div className="mt-1 flex flex-wrap items-center gap-x-2 text-xs font-mono">
                {subtitle && (
                  <span className="font-semibold" style={{ color: tone.hex }}>
                    {subtitle}
                  </span>
                )}
                {subtitle && meta && (
                  <span className="opacity-40" style={{ color: "var(--text-muted)" }}>
                    &middot;
                  </span>
                )}
                {meta && <span style={{ color: "var(--text-muted)" }}>{meta}</span>}
              </div>
            )}

            {tags?.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded"
                    style={{
                      background: "var(--bg-tag)",
                      border: "1px solid var(--border-default)",
                      color: tone.tag,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <span
            className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              border: "1px solid var(--border-default)",
              color: open ? tone.hex : "var(--text-muted)",
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
            transition: PANEL_TRANSITION,
          }}
        >
          <div className="overflow-hidden">
            <div className="px-4 sm:px-5 pb-4 sm:pb-5">
              <div className="pt-3.5" style={{ borderTop: "1px solid var(--border-muted)" }}>
                {children || (
                  <ul
                    className="space-y-2 text-sm font-sans"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {bullets?.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 leading-relaxed">
                        <span
                          className="mt-1 shrink-0 select-none"
                          style={{ color: tone.hex, fontSize: "12px", lineHeight: "1.6" }}
                        >
                          &rsaquo;
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {command && (
                  <div
                    className="mt-4 flex items-center gap-2.5 rounded-lg px-3 py-2.5 font-mono text-xs overflow-x-auto"
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border-default)",
                    }}
                  >
                    <span className="select-none shrink-0" style={{ color: tone.hex }}>
                      $
                    </span>
                    <code style={{ color: "var(--text-secondary)" }}>{command}</code>
                  </div>
                )}

                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-mono transition-opacity hover:opacity-70"
                    style={{ color: tone.hex }}
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
  return (
    <div className={timeline ? "relative space-y-3" : "space-y-3"}>
      {/* Gradient spine, centred on the 10px rail dots (radius 5px) */}
      {timeline && <span className="absolute top-0 bottom-0 w-px timeline-line left-[5px]" />}

      {items.map((item) => (
        <AccordionItem key={item.title} {...item} timeline={timeline} accent={accent} />
      ))}
    </div>
  );
}

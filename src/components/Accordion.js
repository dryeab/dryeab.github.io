import { useState } from "react";
import { FiChevronDown, FiExternalLink } from "react-icons/fi";

/**
 * One accent per section keeps Experience and Projects visually distinct: cyan
 * reads as the "professional record", emerald as the "build log". Also exposed
 * to CSS as --accent, so :hover / :focus-visible can use it.
 */
const ACCENTS = { cyan: "#22d3ee", emerald: "#34d399" };

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
  accent = "cyan",
  children,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const tone = ACCENTS[accent] ?? ACCENTS.cyan;

  return (
    <div className="entry-card relative" style={{ "--accent": tone }}>
      {/* Accent rail in the left margin — marks the open entry. Sits outside the
          text column so entries stay flush with the rest of the page. */}
      <span
        className="absolute -left-3 sm:-left-4 top-0 bottom-0 w-[2px] rounded-full transition-opacity duration-300"
        style={{ background: tone, opacity: open ? 1 : 0 }}
      />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="exp-toggle w-full text-left -mx-2 px-2 py-3.5 rounded-lg flex items-start gap-3"
      >
        {/* Title, subtitle and meta share one wrapping row: a single line on
              desktop (meta pushed right), stacked on narrow screens. */}
        <div className="flex-1 min-w-0 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <h4
            className={`text-sm font-medium tracking-tight ${
              monoTitle ? "font-mono" : "font-sans"
            }`}
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </h4>

          {subtitle && (
            <span className="text-xs font-mono" style={{ color: tone }}>
              <span className="opacity-40 mr-2" style={{ color: "var(--text-muted)" }}>
                &middot;
              </span>
              {subtitle}
            </span>
          )}

          {meta && (
            <span
              className="text-[11px] font-mono w-full sm:w-auto sm:ml-auto sm:pl-2"
              style={{ color: "var(--text-muted)" }}
            >
              {meta}
            </span>
          )}
        </div>

        <FiChevronDown
          className="shrink-0 w-4 h-4 mt-0.5 transition-transform duration-300"
          style={{
            color: open ? tone : "var(--text-muted)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {/* 0fr → 1fr animates to the content's natural height without measuring it */}
      <div
        className="exp-panel"
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: PANEL_TRANSITION,
        }}
      >
        <div className="overflow-hidden">
          <div className="pb-4">
            {children || (
              <ul
                className="space-y-2 text-sm font-sans"
                style={{ color: "var(--text-secondary)" }}
              >
                {bullets?.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 leading-relaxed">
                    <span
                      className="mt-[9px] shrink-0 w-1 h-1 rounded-full"
                      style={{ background: tone }}
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Tags live in the panel rather than the collapsed header — they
                    are supporting detail, not what identifies the entry. */}
            {tags?.length > 0 && (
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded"
                    style={{ background: "var(--bg-tag)", color: "var(--text-secondary)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {command && (
              <div
                className="mt-3.5 flex items-center gap-2.5 rounded-lg px-3 py-2 font-mono text-xs overflow-x-auto"
                style={{ background: "var(--bg-surface)" }}
              >
                <span className="select-none shrink-0" style={{ color: tone }}>
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
                className="mt-3.5 inline-flex items-center gap-1.5 text-[11px] font-mono transition-opacity hover:opacity-70"
                style={{ color: tone }}
              >
                <span>{linkLabel || "Visit site"}</span>
                <FiExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AccordionList({ items, accent = "cyan" }) {
  return (
    <div>
      {items.map((item) => (
        <AccordionItem key={item.title} {...item} accent={accent} />
      ))}
    </div>
  );
}

import React from "react";
import AccordionList from "./Accordion";

/**
 * cv.js stores roles as "Senior Python Engineer, Turing".
 * Split on the last comma so the company can be styled separately.
 */
const splitRole = (raw) => {
  const i = raw.lastIndexOf(", ");
  if (i === -1) return { role: raw, company: null };
  return { role: raw.slice(0, i), company: raw.slice(i + 2) };
};

/**
 * "06/2024 – 04/2026" → "1 yr 11 mo".
 * Inclusive of both end months, matching how tenure is conventionally counted.
 * Returns null if the period isn't in MM/YYYY – MM/YYYY form.
 */
const tenureOf = (period) => {
  const m = String(period).match(/(\d{1,2})\/(\d{4})\s*[–—-]\s*(\d{1,2})\/(\d{4})/);
  if (!m) return null;

  const months = (Number(m[4]) - Number(m[2])) * 12 + (Number(m[3]) - Number(m[1])) + 1;
  if (months <= 0) return null;

  const years = Math.floor(months / 12);
  const rest = months % 12;
  return [years ? `${years} yr` : null, rest ? `${rest} mo` : null].filter(Boolean).join(" ");
};

/**
 * Doubles as the timeline node, so it needs an opaque backdrop —
 * the gradient spine runs behind it and must not show through.
 */
const Monogram = ({ letter }) => (
  <span
    className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-sm sm:text-base font-mono font-bold text-cyan-400"
    style={{
      backgroundColor: "var(--bg-base)",
      backgroundImage: "linear-gradient(145deg, rgba(6,182,212,0.18), rgba(6,182,212,0.03))",
      border: "1px solid rgba(6,182,212,0.30)",
    }}
  >
    {letter}
  </span>
);

const Experience = ({ experience }) => {
  const items = experience.map((job) => {
    const { role, company } = splitRole(job.role);
    const tenure = tenureOf(job.period);

    return {
      title: role,
      subtitle: company,
      meta: tenure ? `${job.period} · ${tenure}` : job.period,
      bullets: job.bullets,
      url: job.url,
      linkLabel: `Visit ${company || "site"}`,
      leading: <Monogram letter={(company || role).charAt(0).toUpperCase()} />,
    };
  });

  return <AccordionList items={items} timeline accent="cyan" />;
};

export default Experience;

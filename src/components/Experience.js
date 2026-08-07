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
    };
  });

  return <AccordionList items={items} timeline accent="cyan" />;
};

export default Experience;

import React from "react";
import { FiMail } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import cv from "./data/cv";

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 py-10">
      <div className="mb-6 flex items-center gap-4">
        <h2 className="text-lg sm:text-xl font-semibold tracking-tight">{title}</h2>
        <div className="h-px flex-1 bg-neutral-200" />
      </div>
      {children}
    </section>
  );
}

function App() {
  const {
    name,
    contact,
    education,
    experience,
    projects,
    skills,
    awardsAndActivities,
  } = cv;

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-800 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(0,0,0,0.015) 0, rgba(0,0,0,0.015) 1px, transparent 1px, transparent 24px), repeating-linear-gradient(0deg, rgba(0,0,0,0.01) 0, rgba(0,0,0,0.01) 1px, transparent 1px, transparent 24px)",
        }}
      />

      <div className="relative flex flex-col min-h-screen">
      <Header />

        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-6 md:px-12 py-10">
            <section className="py-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-12">
                  <div className="rounded-3xl border border-neutral-200 bg-white/80 backdrop-blur p-6 md:p-8 shadow-sm">
                    <div className="min-w-0">
                        <div className="flex items-center gap-4 flex-nowrap">
                          <h1 className="flex-1 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight leading-none min-w-0 truncate">
                            {name}
                          </h1>

                          <span className="shrink-0 ml-auto whitespace-nowrap inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-800">
                            Open for work
                          </span>
                        </div>

                        <p className="mt-3 text-neutral-700 leading-relaxed text-base sm:text-lg">
                        Software Engineer &amp; Data Scientist. I build scalable full-stack
                          applications and AI/ML systems, improving reliability through advanced
                          debugging and optimization, delivering user-facing products like Impact AI and
                          Atrons.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
                          <a
                            className="group relative inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-2xl transition-transform hover:scale-[1.03]"
                            href={`mailto:${contact.email}`}
                            aria-label={`Email ${contact.email}`}
                          >
                            <span className="pointer-events-none absolute inset-0 rounded-2xl bg-neutral-200/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="pointer-events-none absolute left-1/2 -top-3 -translate-x-1/2 whitespace-nowrap rounded-lg bg-neutral-900 px-2 py-1 text-xs text-neutral-50 opacity-0 group-hover:opacity-100 transition-opacity z-[60]">
                              Email
                            </span>
                            <FiMail className="relative z-10 w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-neutral-900" />
                          </a>

                          <a
                            className="group relative inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-2xl transition-transform hover:scale-[1.03]"
                            href={`https://www.linkedin.com/in/${contact.linkedinUsername}`}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`LinkedIn ${contact.linkedinUsername}`}
                          >
                            <span className="pointer-events-none absolute inset-0 rounded-2xl bg-neutral-200/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="pointer-events-none absolute left-1/2 -top-3 -translate-x-1/2 whitespace-nowrap rounded-lg bg-neutral-900 px-2 py-1 text-xs text-neutral-50 opacity-0 group-hover:opacity-100 transition-opacity z-[60]">
                              LinkedIn
                            </span>
                          <FaLinkedinIn className="relative z-10 w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-neutral-900" />
                          </a>

                          <a
                            className="group relative inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-2xl transition-transform hover:scale-[1.03]"
                            href={`https://github.com/${contact.githubUsername}`}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`GitHub ${contact.githubUsername}`}
                          >
                            <span className="pointer-events-none absolute inset-0 rounded-2xl bg-neutral-200/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="pointer-events-none absolute left-1/2 -top-3 -translate-x-1/2 whitespace-nowrap rounded-lg bg-neutral-900 px-2 py-1 text-xs text-neutral-50 opacity-0 group-hover:opacity-100 transition-opacity z-[60]">
                              GitHub
                            </span>
                            <FaGithub className="relative z-10 w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-neutral-900" />
                          </a>

                          <a
                            className="group relative inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-2xl transition-transform hover:scale-[1.03]"
                            href={`https://leetcode.com/${contact.leetcodeUsername}`}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`LeetCode ${contact.leetcodeUsername}`}
                          >
                            <span className="pointer-events-none absolute inset-0 rounded-2xl bg-neutral-200/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="pointer-events-none absolute left-1/2 -top-3 -translate-x-1/2 whitespace-nowrap rounded-lg bg-neutral-900 px-2 py-1 text-xs text-neutral-50 opacity-0 group-hover:opacity-100 transition-opacity z-[60]">
                              LeetCode
                            </span>
                            <SiLeetcode className="relative z-10 w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-neutral-900" />
                          </a>
                        </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            <Section id="education" title="Education">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {education.map((edu, idx) => (
                  <div
                    key={edu.title}
                    className={[
                      "rounded-2xl border bg-white/70 p-5 transition-transform",
                      "hover:translate-y-[-2px]",
                      idx % 2 === 0
                        ? "border-neutral-200"
                        : "border-neutral-300",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="font-semibold tracking-tight text-neutral-900">
                        {edu.title}
                      </div>
                      <div className="text-sm text-neutral-600 whitespace-nowrap">
                        {edu.period}
                      </div>
                    </div>
                    <ul className="mt-3 space-y-2 text-neutral-700">
                      {edu.details.map((d) => (
                        <li key={d} className="flex gap-2">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-800 shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="experience" title="Experience">
              <div className="space-y-4">
                {experience.map((job, idx) => (
                  <div
                    key={job.role}
                    className={[
                      "rounded-2xl border bg-white/70 p-5",
                      idx % 2 === 0 ? "border-neutral-200" : "border-neutral-300",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="font-semibold tracking-tight text-neutral-900">
                        {job.role}
                      </div>
                      <div className="text-sm text-neutral-600 whitespace-nowrap">
                        {job.period}
                      </div>
                    </div>
                    <ul className="mt-3 space-y-2">
                      {job.bullets.map((b) => (
                        <li key={b} className="flex gap-2 text-neutral-700">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-800 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="projects" title="Projects">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((p, idx) => (
                  <div
                    key={p.name}
                    className="relative rounded-3xl border border-neutral-200 bg-white/80 p-5 md:p-6 shadow-sm hover:-translate-y-0.5 transition-transform"
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full border border-neutral-200 opacity-50"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -left-10 -bottom-10 h-28 w-28 rounded-full border border-neutral-200 opacity-30"
                    />

                    <div className="relative flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-xs uppercase tracking-wide text-neutral-500">
                          Project
                        </div>
                        <div className="font-semibold tracking-tight text-neutral-900 truncate">
                          {p.name}
                        </div>
                      </div>

                      {p.url ? (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white/70 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-white transition-colors whitespace-nowrap"
                        >
                          View
                          <FiExternalLink className="w-4 h-4" aria-hidden="true" />
                        </a>
                      ) : null}
                    </div>

                    <ul className="relative mt-4 space-y-2">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-neutral-700">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-800" />
                          <span className="leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="skills" title="Skills">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-neutral-200 bg-white/70 p-5">
                  <div className="text-sm font-semibold">Programming Languages</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {skills.programmingLanguages.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-full border border-neutral-200 bg-neutral-50 text-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-white/70 p-5">
                  <div className="text-sm font-semibold">Soft Skills</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {skills.softSkills.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-full border border-neutral-200 bg-neutral-50 text-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-white/70 p-5 md:col-span-1">
                  <div className="text-sm font-semibold">Frameworks / Technologies</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {skills.technologies.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-full border border-neutral-200 bg-neutral-50 text-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-neutral-200 bg-white/70 p-5">
                <div className="text-sm font-semibold tracking-tight">
                  Awards and Activities
                </div>
                <ul className="mt-3 space-y-2">
                  {awardsAndActivities.map((a) => (
                    <li key={a} className="flex gap-2 text-neutral-700">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-800 shrink-0" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Section>

            <Section id="contact" title="Contact">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-12">
                  <div className="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur p-6 md:p-7 shadow-sm">
                    <div className="text-xs uppercase tracking-wide text-neutral-500">
                      Contact
                    </div>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <a
                        href={`mailto:${contact.email}`}
                        className="group rounded-2xl border border-neutral-200 bg-white/60 hover:bg-white transition-colors px-5 py-4"
                        aria-label={`Email ${contact.email}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-neutral-900 text-neutral-50">
                            <FiMail className="w-5 h-5" />
                          </span>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-neutral-900">
                              Email
                            </div>
                            <div className="text-sm text-neutral-700 break-all">
                              {contact.email}
                            </div>
                          </div>
                        </div>
                      </a>

                      <a
                        href={`https://www.linkedin.com/in/${contact.linkedinUsername}`}
                        target="_blank"
                        rel="noreferrer"
                        className="group rounded-2xl border border-neutral-200 bg-white/60 hover:bg-white transition-colors px-5 py-4"
                        aria-label={`LinkedIn ${contact.linkedinUsername}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-neutral-900 text-neutral-50">
                            <FaLinkedinIn className="w-5 h-5" />
                          </span>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-neutral-900">
                              LinkedIn
                            </div>
                            <div className="text-sm text-neutral-700 break-all">
                              {contact.linkedinUsername}
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;

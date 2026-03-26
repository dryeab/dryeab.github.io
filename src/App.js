import React, { useState } from "react";
import { FiMail } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
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

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("");

  const submitMessage = (e) => {
    e.preventDefault();
    setFormStatus("Opening your email client...");

    const subject = `Message from ${form.name || "someone"}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}\n`;

    const mailtoUrl = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  };

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
                    className={[
                      "rounded-2xl border bg-white/70 p-5",
                      idx % 2 === 0 ? "border-neutral-200" : "border-neutral-300",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="font-semibold tracking-tight text-neutral-900">
                        {p.name}
                      </div>
                    </div>
                    <ul className="mt-3 space-y-2">
                      {p.bullets.map((b) => (
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
                <div className="lg:col-span-4">
                  <div className="rounded-2xl border border-neutral-200 bg-white/70 p-5">
                    <div className="text-xs uppercase tracking-wide text-neutral-500">
                      Contact
                    </div>

                    <div className="mt-4 space-y-3">
                      <a
                        className="group flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 hover:bg-neutral-50 transition-colors"
                        href={`mailto:${contact.email}`}
                      >
                        <span className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-xl bg-neutral-900 text-neutral-50">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 6.5C4 5.67157 4.67157 5 5.5 5H18.5C19.3284 5 20 5.67157 20 6.5V17.5C20 18.3284 19.3284 19 18.5 19H5.5C4.67157 19 4 18.3284 4 17.5V6.5Z"
                              stroke="currentColor"
                              strokeWidth="1.6"
                            />
                            <path
                              d="M6.5 7.5L12 12L17.5 7.5"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinejoin="round"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-neutral-900 group-hover:underline">
                            {contact.email}
                          </div>
                        </div>
                      </a>

                      <a
                        className="group flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 hover:bg-neutral-50 transition-colors"
                        href={`https://github.com/${contact.githubUsername}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-xl bg-neutral-900 text-neutral-50">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 19C9 19.9 8.3 21 7 21C4 21 4 18.5 4 18C4 17.4 3.6 16.5 3 16.2C3 16.2 4 16 4.6 16.8C5.1 17.5 5.7 18 7 18"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                            <path
                              d="M12 20C9.5 20 8 18.5 8 16C8 14.9 8.4 13.9 9.1 13.2C9 12.6 8.6 11.8 7.9 11.4C8.9 11 10.1 11.2 11 11.8C11.7 11.5 12.5 11.3 13.3 11.3C16.3 11.3 18.7 12.7 19.5 14.7C20.2 16.3 19.4 18.4 17.6 19.3C16.6 19.8 15.5 20 14.4 20"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M14 5C14 6.1 13.1 7 12 7C10.9 7 10 6.1 10 5C10 3.9 10.9 3 12 3C13.1 3 14 3.9 14 5Z"
                              stroke="currentColor"
                              strokeWidth="1.6"
                            />
                          </svg>
                        </span>
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-neutral-900 group-hover:underline">
                            GitHub: {contact.githubUsername}
                          </div>
                        </div>
                      </a>

                      <a
                        className="group flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 hover:bg-neutral-50 transition-colors"
                        href={`https://www.linkedin.com/in/${contact.linkedinUsername}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-xl bg-neutral-900 text-neutral-50">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 9V18"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                            <path
                              d="M6 6.5C6 7.05 5.55 7.5 5 7.5C4.45 7.5 4 7.05 4 6.5C4 5.95 4.45 5.5 5 5.5C5.55 5.5 6 5.95 6 6.5Z"
                              stroke="currentColor"
                              strokeWidth="1.6"
                            />
                            <path
                              d="M10 18V12.5C10 11.1193 11.1193 10 12.5 10C13.8807 10 15 11.1193 15 12.5V18"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10 12.5C10 11.1193 11.1193 10 12.5 10"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                            <path
                              d="M18 18V12"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-neutral-900 group-hover:underline">
                            LinkedIn: {contact.linkedinUsername}
                          </div>
                        </div>
                      </a>

                      <a
                        className="group flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 hover:bg-neutral-50 transition-colors"
                        href={`https://leetcode.com/${contact.leetcodeUsername}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-xl bg-neutral-900 text-neutral-50">
                          <SiLeetcode className="w-4 h-4" />
                        </span>
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-neutral-900 group-hover:underline">
                            LeetCode: {contact.leetcodeUsername}
                          </div>
                        </div>
                      </a>
                    </div>

                    <div className="mt-4 text-sm text-neutral-600 space-y-1">
                      <div>{contact.location}</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <div className="rounded-2xl border border-neutral-200 bg-white/70 p-5">
                    <form onSubmit={submitMessage} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label className="block">
                          <div className="text-sm font-medium text-neutral-800">
                            Name
                          </div>
                          <input
                            className="mt-2 w-full rounded-xl border border-neutral-200 bg-white/60 px-4 py-3 outline-none focus:ring-2 focus:ring-neutral-300"
                            type="text"
                            value={form.name}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            placeholder="Your name"
                            required
                          />
                        </label>

                        <label className="block">
                          <div className="text-sm font-medium text-neutral-800">
                            Email
                          </div>
                          <input
                            className="mt-2 w-full rounded-xl border border-neutral-200 bg-white/60 px-4 py-3 outline-none focus:ring-2 focus:ring-neutral-300"
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            placeholder="you@example.com"
                            required
                          />
                        </label>
                      </div>

                      <label className="block">
                        <div className="text-sm font-medium text-neutral-800">
                          Message
                        </div>
                        <textarea
                          className="mt-2 w-full rounded-xl border border-neutral-200 bg-white/60 px-4 py-3 outline-none focus:ring-2 focus:ring-neutral-300"
                          rows={6}
                          value={form.message}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              message: e.target.value,
                            }))
                          }
                          placeholder="Write your message..."
                          required
                        />
                      </label>

                      <button
                        type="submit"
                        className="w-full rounded-xl bg-neutral-900 text-neutral-50 px-5 py-3 font-medium hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-300"
                      >
                        Send Message
                      </button>

                      {formStatus ? (
                        <div className="text-xs text-neutral-600">
                          {formStatus}
                        </div>
                      ) : null}
                    </form>
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

import React from "react";
import { FiMail, FiExternalLink, FiAward, FiBookOpen, FiTerminal } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import cv from "./data/cv";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import AccordionList from "./components/Accordion";

function Section({ id, title, icon: Icon, children }) {
  return (
    <section id={id} className="scroll-mt-24 py-14" style={{ borderTop: "1px solid var(--border-muted)" }}>
      <div className="mb-8 flex items-center gap-4">
        {Icon && <Icon className="w-5 h-5 text-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.3)]" />}
        <h2
          className="text-lg md:text-xl font-bold tracking-widest uppercase font-mono"
          style={{ color: "var(--text-heading)" }}
        >
          {title}
        </h2>
        <div
          className="h-[1px] flex-1"
          style={{ backgroundImage: "linear-gradient(to right, var(--border-default), transparent)" }}
        />
      </div>
      {children}
    </section>
  );
}

/**
 * Quiet counterpart to <Section>: a small margin label with the entries
 * beside it. Used for credentials that should be on the page but shouldn't
 * compete with Experience / Projects / Skills for attention.
 */
function SideNote({ id, label, entries }) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-8">
        <h2
          className="text-[11px] font-bold tracking-widest uppercase font-mono shrink-0 sm:w-28"
          style={{ color: "var(--text-muted)" }}
        >
          {label}
        </h2>

        <div className="flex-1 min-w-0 space-y-5">
          {entries.map((entry) => (
            <div key={entry.title}>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                <h3 className="text-sm font-semibold font-sans" style={{ color: "var(--text-primary)" }}>
                  {entry.url ? (
                    <a
                      href={entry.url}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-cyan-400"
                    >
                      {entry.title}
                      <FiExternalLink className="inline-block w-3 h-3 ml-1.5 align-middle -translate-y-0.5 text-cyan-400" />
                    </a>
                  ) : (
                    entry.title
                  )}
                </h3>
                <span className="text-[11px] font-mono shrink-0" style={{ color: "var(--text-muted)" }}>
                  {entry.period}
                </span>
              </div>

              <p className="mt-1.5 text-xs leading-relaxed font-sans" style={{ color: "var(--text-muted)" }}>
                {entry.details.map((d, dIdx) => {
                  const isObj = typeof d === "object" && d !== null;
                  const text = isObj ? d.text : d;
                  const url = isObj ? d.url : null;
                  return (
                    <React.Fragment key={dIdx}>
                      {dIdx > 0 && <span className="mx-2 opacity-50">&middot;</span>}
                      {url ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="transition-colors hover:text-cyan-400"
                        >
                          {text}
                        </a>
                      ) : (
                        text
                      )}
                    </React.Fragment>
                  );
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function App() {
  const {
    name,
    contact,
    education,
    training,
    experience,
    projects,
    skills,
  } = cv;

  return (
    <div
      className="min-h-screen flex flex-col justify-between relative obsidian-grid radial-glow-cyan portfolio-root"
      style={{
        backgroundColor: "var(--bg-base)",
        color: "var(--text-primary)",
        transition: "var(--transition-theme)",
      }}
    >
      {/* Ambient glow blobs */}
      <div
        className="fixed top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full blur-[120px] pointer-events-none z-0 ambient-blob-top"
        style={{ background: "var(--ambient-top)" }}
      />
      <div
        className="fixed bottom-[-10%] left-[-5%] w-[45vw] h-[45vw] rounded-full blur-[120px] pointer-events-none z-0 ambient-blob-bottom"
        style={{ background: "var(--ambient-bottom)" }}
      />

      <Header />

      <main className="flex-1 relative z-10 radial-glow-bottom pt-20 md:pt-16">
        <div className="mx-auto max-w-6xl px-6 md:px-12 pb-10 md:pb-16">

          {/* HERO SECTION */}
          <section id="about" className="scroll-mt-28 pt-4 pb-10 md:pt-10 md:pb-16">
            <div className="max-w-3xl flex flex-col space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight font-sans" style={{ color: "var(--text-heading)" }}>
                I'm <span className="text-cyan-400">{name}</span>
              </h1>

              <p className="leading-relaxed text-sm sm:text-base md:text-lg max-w-2xl about-text" style={{ color: "var(--text-secondary)" }}>
                Software Engineer &amp; Data Scientist specializing in AI model alignment, system optimizations, and full-stack engineering. I solve algorithmic challenges and design scalable infrastructure.
              </p>

              {/* Social Icons */}
              <div className="flex flex-wrap items-center gap-2 pt-3 -ml-2">
                {[
                  { icon: FiMail, label: "Email", href: `mailto:${contact.email}` },
                  { icon: FaGithub, label: "GitHub", href: `https://github.com/${contact.githubUsername}` },
                  { icon: FaXTwitter, label: "X", href: `https://x.com/${contact.xUsername}` },
                  { icon: FaLinkedinIn, label: "LinkedIn", href: `https://www.linkedin.com/in/${contact.linkedinUsername}` },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    className="group relative p-2 flex items-center justify-center social-icon-link"
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon className="w-6 h-6" />
                    <span className="icon-tooltip pointer-events-none absolute bottom-full left-1/2 mb-3 px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider uppercase whitespace-nowrap z-20">
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* EXPERIENCE SECTION */}
          <Section id="experience" title="Experience" icon={FiTerminal}>
            <Experience experience={experience} />
          </Section>

          {/* PROJECTS SECTION */}
          <Section id="projects" title="Projects" icon={FiTerminal}>
            <AccordionList
              accent="emerald"
              items={projects.map((p, i) => ({
                title: p.name,
                subtitle: "Open Source",
                tags: p.tags,
                bullets: p.bullets,
                url: p.url,
                command: p.command,
                linkLabel: "View repository",
                monoTitle: true,
                watermark: String(i + 1).padStart(2, "0"),
                leading: (
                  <span className="shrink-0 w-10 mt-0.5 text-sm font-mono font-bold text-emerald-400/70 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                ),
              }))}
            />

          </Section>

          {/* SKILLS SECTION */}
          <Section id="skills" title="Skills" icon={FiTerminal}>
            <Skills groups={skills.groups} />

            {/* Awards and Activities Bento Cards */}
            <div className="mt-12">
              <div className="mb-8 flex items-center gap-4">
                <FiAward className="w-5 h-5 text-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.3)]" />
                <h2 className="text-lg md:text-xl font-bold tracking-widest uppercase font-mono" style={{ color: "var(--text-heading)" }}>
                  Awards &amp; Activities
                </h2>
                <div className="h-[1px] flex-1" style={{ backgroundImage: "linear-gradient(to right, var(--border-default), transparent)" }} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* LeetCode Guardian Card */}
                <a
                  href="https://leetcode.com/u/dryeab/"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card rounded-2xl p-6 flex flex-col justify-between hover:scale-[1.01] transition-all group"
                  style={{ borderColor: "var(--border-default)" }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="p-2.5 rounded-xl text-amber-400"
                        style={{ background: "var(--bg-tag)", border: "1px solid var(--border-default)" }}
                      >
                        <SiLeetcode className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-semibold">
                        0.5% Globally
                      </span>
                    </div>
                    <h3 className="text-lg font-bold tracking-tight font-sans flex items-center gap-1.5" style={{ color: "var(--text-heading)" }}>
                      LeetCode Guardian
                      <FiExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                    </h3>
                    <p className="text-xs mt-2 leading-relaxed font-sans" style={{ color: "var(--text-secondary)" }}>
                      Ranked in the <strong style={{ color: "var(--text-primary)" }}>Top 0.5% globally</strong> with a competitive coding rating of <strong style={{ color: "var(--text-primary)" }}>2290+</strong> and 800+ algorithms solved.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 flex items-center justify-between" style={{ borderTop: "1px solid var(--border-muted)" }}>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono uppercase" style={{ color: "var(--text-muted)" }}>Rating</span>
                      <span className="text-sm font-bold font-mono" style={{ color: "var(--text-heading)" }}>2290+</span>
                    </div>
                    <svg className="w-20 h-8 text-emerald-500" viewBox="0 0 100 40">
                      <path d="M0 35 Q 20 28, 40 30 T 80 12 T 100 5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="100" cy="5" r="3" fill="#10b981" className="animate-ping" />
                      <circle cx="100" cy="5" r="2" fill="#10b981" />
                    </svg>
                  </div>
                </a>

                {/* AddisCoder Volunteering Card */}
                <div
                  className="glass-card rounded-2xl p-6 flex flex-col justify-between transition-all group hover:scale-[1.01]"
                  style={{ borderColor: "var(--border-default)" }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="p-2.5 rounded-xl text-emerald-400"
                        style={{ background: "var(--bg-tag)", border: "1px solid var(--border-default)" }}
                      >
                        <FiBookOpen className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono bg-teal-500/10 border border-teal-500/20 text-teal-400 px-2 py-0.5 rounded-full font-semibold">
                        Teaching &amp; Algorithms
                      </span>
                    </div>
                    <h3 className="text-lg font-bold tracking-tight font-sans flex items-center gap-1.5" style={{ color: "var(--text-heading)" }}>
                      <a
                        href="https://www.addiscoder.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                      >
                        <span>AddisCoder Volunteering</span>
                        <FiExternalLink className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                      </a>
                    </h3>
                    <p className="text-xs mt-2 leading-relaxed font-sans" style={{ color: "var(--text-secondary)" }}>
                      Volunteered as a teaching assistant for the 2023 AddisCoder program, an intensive algorithms course for high schoolers, led by global industry and academic experts.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 flex items-center justify-between font-mono text-[10px]" style={{ borderTop: "1px solid var(--border-muted)", color: "var(--text-muted)" }}>
                    <span>AddisCoder 2023</span>
                    <a
                      href="https://drive.google.com/file/d/1-0WZPN4GzDiOn8Ucp209D0hIQGEYmyEs/view?usp=sharing"
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors"
                    >
                      Certificate <FiExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* ECPC 2nd Place Card */}
                <a
                  href="https://drive.google.com/file/d/1JxYQuRKIMc82NI7V_Vs6LjMhg59_eL0f/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card rounded-2xl p-6 flex flex-col justify-between hover:scale-[1.01] transition-all group"
                  style={{ borderColor: "var(--border-default)" }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="p-2.5 rounded-xl text-cyan-400"
                        style={{ background: "var(--bg-tag)", border: "1px solid var(--border-default)" }}
                      >
                        <FiAward className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full font-semibold">
                        Collegiate Coding
                      </span>
                    </div>
                    <h3 className="text-lg font-bold tracking-tight font-sans flex items-center gap-1.5" style={{ color: "var(--text-heading)" }}>
                      Collegiate Programming
                      <FiExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                    </h3>
                    <p className="text-xs mt-2 leading-relaxed font-sans" style={{ color: "var(--text-secondary)" }}>
                      Achieved <strong style={{ color: "var(--text-primary)" }}>Second Place</strong> in the 2023 Ethiopian Collegiate Programming Contest (ECPC), showcasing team troubleshooting and algorithm design.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 flex items-center justify-between font-mono text-[10px]" style={{ borderTop: "1px solid var(--border-muted)", color: "var(--text-muted)" }}>
                    <span>ECPC 2023</span>
                    <span className="text-cyan-400 font-semibold flex items-center gap-1">
                      Certificate <FiExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </a>

                {/* AAU Research Award Card */}
                <div
                  className="glass-card rounded-2xl p-6 flex flex-col justify-between transition-all group hover:scale-[1.01]"
                  style={{ borderColor: "var(--border-default)" }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="p-2.5 rounded-xl text-cyan-400"
                        style={{ background: "var(--bg-tag)", border: "1px solid var(--border-default)" }}
                      >
                        <FiAward className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full font-semibold">
                        Academic Honor
                      </span>
                    </div>
                    <h3 className="text-lg font-bold tracking-tight font-sans" style={{ color: "var(--text-heading)" }}>
                      Best Research Project
                    </h3>
                    <p className="text-xs mt-2 leading-relaxed font-sans" style={{ color: "var(--text-secondary)" }}>
                      Awarded <strong style={{ color: "var(--text-primary)" }}>Best Research Project</strong> among 2020 projects at Addis Ababa University for work in agricultural NLP model development.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 flex items-center justify-between font-mono text-[10px]" style={{ borderTop: "1px solid var(--border-muted)", color: "var(--text-muted)" }}>
                    <span>Addis Ababa University</span>
                    <span className="text-cyan-400 font-semibold">AAU 2020</span>
                  </div>
                </div>

              </div>
            </div>
          </Section>


          {/* CREDENTIALS — de-emphasized sidenotes, after the work sections */}
          <div className="pt-10 space-y-8" style={{ borderTop: "1px solid var(--border-muted)" }}>
            <SideNote id="education" label="Education" entries={education} />
            <SideNote id="training" label="Training" entries={training} />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;

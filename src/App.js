import React from "react";
import { FiMail, FiExternalLink, FiBriefcase, FiPackage, FiLayers } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import cv from "./data/cv";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import AccordionList from "./components/Accordion";

/**
 * Section heading: an accent icon tile, the title, then a rule that
 * bleeds out of the accent colour. The tile matches the icon treatment used by
 * the skill cards, award cards and experience monograms.
 */
function SectionHeading({ title, icon: Icon, accent = "#22d3ee" }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      {Icon && (
        <span
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: `${accent}1a`,
            border: `1px solid ${accent}40`,
            color: accent,
          }}
        >
          <Icon className="w-[18px] h-[18px]" />
        </span>
      )}

      <h2
        className="text-lg md:text-xl font-bold tracking-widest uppercase font-mono"
        style={{ color: "var(--text-heading)" }}
      >
        {title}
      </h2>

      <div
        className="h-px flex-1 min-w-[12px]"
        style={{
          backgroundImage: `linear-gradient(to right, ${accent}66, var(--border-default) 35%, transparent)`,
        }}
      />
    </div>
  );
}

function Section({ id, title, icon, accent, children }) {
  return (
    <section id={id} className="scroll-mt-24 py-14" style={{ borderTop: "1px solid var(--border-muted)" }}>
      <SectionHeading title={title} icon={icon} accent={accent} />
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
    awards,
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
          <Section id="experience" title="Experience" icon={FiBriefcase} accent="#22d3ee">
            <Experience experience={experience} />
          </Section>

          {/* PROJECTS SECTION */}
          <Section id="projects" title="Projects" icon={FiPackage} accent="#34d399">
            <AccordionList
              accent="emerald"
              items={projects.map((p) => ({
                title: p.name,
                subtitle: "Open Source",
                tags: p.tags,
                bullets: p.bullets,
                url: p.url,
                command: p.command,
                linkLabel: "View repository",
                monoTitle: true,
              }))}
            />

          </Section>

          {/* SKILLS SECTION */}
          <Section id="skills" title="Skills" icon={FiLayers} accent="#a78bfa">
            <Skills groups={skills.groups} />
          </Section>


          {/* CREDENTIALS — de-emphasized sidenotes, after the work sections */}
          <div className="pt-10 space-y-8" style={{ borderTop: "1px solid var(--border-muted)" }}>
            <SideNote id="education" label="Education" entries={education} />
            <SideNote id="training" label="Training" entries={training} />
            <SideNote id="awards" label="Awards & Activities" entries={awards} />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;

import React from "react";
import { FiMail, FiExternalLink, FiAward, FiBookOpen, FiTerminal } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import cv from "./data/cv";
import Console from "./components/Console";
import AlgoVisualizer from "./components/AlgoVisualizer";
import { useTheme } from "./components/theme/ThemeContext";

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

function App() {
  const {
    name,
    contact,
    education,
    experience,
    projects,
    skills,
  } = cv;

  const { theme } = useTheme();

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

      <main className="flex-1 relative z-10 radial-glow-bottom pt-16 md:pt-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12 pt-4 pb-10 md:pt-6 md:pb-16">
          
          {/* HERO SECTION */}
          <section id="about" className="scroll-mt-28 pt-2 pb-6 md:pt-4 md:pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Intro Card */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                <div className="inline-flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold font-mono tracking-widest uppercase text-emerald-400">
                    Open for opportunities
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight font-sans" style={{ color: "var(--text-heading)" }}>
                  I'm <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(to right, #22d3ee, #34d399)" }}>{name}</span>
                </h1>

                <p className="leading-relaxed text-sm sm:text-base md:text-lg max-w-xl font-sans" style={{ color: "var(--text-secondary)" }}>
                  Software Engineer &amp; Data Scientist specializing in AI model alignment, system optimizations, and full-stack engineering. I solve complex algorithmic challenges and design scalable infrastructure.
                </p>

                {/* Social Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {[
                    { icon: FiMail, label: "Email", href: `mailto:${contact.email}` },
                    { icon: FaLinkedinIn, label: "LinkedIn", href: `https://www.linkedin.com/in/${contact.linkedinUsername}`, external: true },
                    { icon: FaGithub, label: "GitHub", href: `https://github.com/${contact.githubUsername}`, external: true },
                    { icon: SiLeetcode, label: "LeetCode", href: `https://leetcode.com/${contact.leetcodeUsername}`, external: true },
                  ].map(({ icon: Icon, label, href, external }) => (
                    <a
                      key={label}
                      className="group flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border transition-all font-mono text-xs"
                      style={{
                        borderColor: "var(--border-default)",
                        background: theme === "light" ? "rgba(255,255,255,0.7)" : "rgba(24,24,27,0.6)",
                        color: "var(--text-secondary)",
                      }}
                      href={href}
                      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                    >
                      <Icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span>{label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Interactive Console Terminal */}
              <div className="lg:col-span-5 w-full">
                <Console />
              </div>

            </div>
          </section>

          {/* EDUCATION SECTION */}
          <Section id="education" title="Education" icon={FiBookOpen}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu) => (
                <div
                  key={edu.title}
                  className="glass-card rounded-2xl p-6 hover:scale-[1.01] transition-all relative overflow-hidden group"
                  style={{ borderColor: "var(--border-default)" }}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/5 to-transparent rounded-bl-full pointer-events-none" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
                    <h4 className="text-base font-bold font-sans max-w-xs" style={{ color: "var(--text-heading)" }}>
                      {edu.url ? (
                        <a
                          href={edu.url}
                          target="_blank"
                          rel="noreferrer"
                          className="transition-colors hover:text-cyan-500 dark:hover:text-cyan-400"
                        >
                          {edu.title}
                          <FiExternalLink className="inline-block w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 ml-1.5 align-middle -translate-y-0.5" />
                        </a>
                      ) : (
                        edu.title
                      )}
                    </h4>
                    <span className="text-xs font-mono text-cyan-400 font-semibold whitespace-nowrap px-2 py-0.5 rounded shrink-0 self-start"
                      style={{ background: theme === "light" ? "rgba(6,182,212,0.08)" : "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.25)" }}>
                      {edu.period}
                    </span>
                  </div>

                  <ul className="space-y-3 font-sans text-sm" style={{ color: "var(--text-secondary)" }}>
                    {edu.details.map((d, dIdx) => {
                      const isObj = typeof d === "object" && d !== null;
                      const text = isObj ? d.text : d;
                      const url = isObj ? d.url : null;
                      return (
                        <li key={dIdx} className="flex items-start gap-2.5 leading-relaxed">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
                          <span>
                            {url ? (
                              <a
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                className="transition-colors hover:text-cyan-500 dark:hover:text-cyan-400"
                              >
                                {text}
                                <FiExternalLink className="inline-block w-3 h-3 text-cyan-500 dark:text-cyan-400 ml-1.5 align-middle -translate-y-0.5" />
                              </a>
                            ) : (
                              text
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          {/* EXPERIENCE SECTION */}
          <Section id="experience" title="Experience" icon={FiTerminal}>
            <div
              className="relative pl-6 ml-2 space-y-10 py-2"
              style={{ borderLeft: "1px solid var(--border-default)" }}
            >
              {experience.map((job) => (
                <div key={job.role} className="relative group">
                  {/* Timeline Node */}
                  <span
                    className="absolute left-[-31px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-cyan-400 z-20 group-hover:scale-125 transition-transform"
                    style={{ backgroundColor: "var(--bg-base)" }}
                  />
                  <span className="absolute left-[-31px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-400/50 animate-ping z-10" />

                  <div
                    className="glass-card rounded-2xl p-6 hover:scale-[1.005] transition-all"
                    style={{ borderColor: "var(--border-default)" }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <h4 className="text-base sm:text-lg font-bold tracking-tight font-sans" style={{ color: "var(--text-heading)" }}>
                        {job.url ? (
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noreferrer"
                            className="transition-colors hover:text-cyan-500 dark:hover:text-cyan-400"
                          >
                            {job.role}
                            <FiExternalLink className="inline-block w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 ml-1.5 align-middle -translate-y-0.5" />
                          </a>
                        ) : (
                          job.role
                        )}
                      </h4>
                      <span className="text-xs font-mono text-emerald-400 font-semibold whitespace-nowrap px-2 py-0.5 rounded self-start sm:self-center"
                        style={{ background: theme === "light" ? "rgba(16,185,129,0.08)" : "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                        {job.period}
                      </span>
                    </div>

                    <ul className="space-y-2.5 text-sm font-sans" style={{ color: "var(--text-secondary)" }}>
                      {job.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3 leading-relaxed">
                          <span className="mt-1 text-cyan-400 shrink-0 select-none" style={{ fontSize: '12px', lineHeight: '1.6' }}>›</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* PROJECTS SECTION */}
          <Section id="projects" title="Projects" icon={FiTerminal}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((p) => (
                <div
                  key={p.name}
                  className="glass-card rounded-2xl p-6 transition-all flex flex-col justify-between group relative overflow-hidden hover:scale-[1.01]"
                  style={{ borderColor: "var(--border-default)" }}
                >
                  {/* Cyber Grid border element */}
                  <div
                    className="absolute top-[-50%] right-[-50%] w-48 h-48 rounded-full border pointer-events-none group-hover:border-cyan-500/20 transition-all"
                    style={{ background: "var(--bg-card)", borderColor: "var(--border-subtle)" }}
                  />
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                        Open Source
                      </span>
                      {p.url && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          <span>Repo</span>
                          <FiExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    
                    <h4 className="text-base sm:text-lg font-bold font-sans tracking-tight" style={{ color: "var(--text-heading)" }}>
                      {p.name}
                    </h4>

                    <ul className="mt-4 space-y-2.5 text-xs sm:text-sm font-sans" style={{ color: "var(--text-secondary)" }}>
                      {p.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 leading-relaxed">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className="mt-6 pt-4 flex flex-wrap gap-2"
                    style={{ borderTop: "1px solid var(--border-muted)" }}
                  >
                    {p.name.includes("VAIS") ? (
                      <>
                        {["LSTM", "Transformers", "NLP", "Python"].map((tag) => (
                          <span key={tag} className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded"
                            style={{ background: "var(--bg-tag)", border: "1px solid var(--border-default)" }}>
                            {tag}
                          </span>
                        ))}
                      </>
                    ) : (
                      <>
                        {["Model Context Protocol", "Telegram API", "Python", "uv"].map((tag) => (
                          <span key={tag} className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded"
                            style={{ background: "var(--bg-tag)", border: "1px solid var(--border-default)" }}>
                            {tag}
                          </span>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Algorithmic Visualizer */}
            <div className="mt-16 pt-12" style={{ borderTop: "1px solid var(--border-muted)" }}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
                  <div className="text-[10px] font-semibold font-mono tracking-widest uppercase text-cyan-400">
                    LeetCode Guardian Sandbox
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-sans tracking-tight" style={{ color: "var(--text-heading)" }}>
                    Algorithmic Visualizer
                  </h3>
                  <p className="text-sm leading-relaxed font-sans" style={{ color: "var(--text-secondary)" }}>
                    As an educator and competitive coder, I appreciate visual learning tools. This Binary Search simulation visually illustrates the logarithmic dividing process of search spaces:
                  </p>
                  <ul className="space-y-2 text-xs font-sans" style={{ color: "var(--text-secondary)" }}>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                      <span><strong>Left Boundary Pointer (L):</strong> Starts at index 0.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                      <span><strong>Right Boundary Pointer (R):</strong> Starts at index N-1.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span><strong>Mid Pivot Pointer (M):</strong> Evaluated boundary centers.</span>
                    </li>
                  </ul>
                  <p className="text-xs font-mono italic" style={{ color: "var(--text-muted)" }}>
                    Try choosing a target element and clicking 'Step' or 'Run' to observe the pointer calculations live.
                  </p>
                </div>
                <div className="lg:col-span-7 w-full">
                  <AlgoVisualizer />
                </div>
              </div>
            </div>
          </Section>

          {/* SKILLS SECTION */}
          <Section id="skills" title="Skills" icon={FiTerminal}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Languages Card */}
              <div className="glass-card rounded-2xl p-6 flex flex-col justify-between" style={{ borderColor: "var(--border-default)" }}>
                <div>
                  <h4 className="text-sm font-bold tracking-wider uppercase font-mono mb-4 text-cyan-400">
                    Languages
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.programmingLanguages.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono transition-all hover:text-white hover:border-cyan-500/30"
                        style={{
                          borderColor: "var(--border-default)",
                          border: "1px solid var(--border-default)",
                          background: "var(--bg-tag)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Frameworks & Tech Card */}
              <div className="glass-card rounded-2xl p-6 md:col-span-2 flex flex-col justify-between" style={{ borderColor: "var(--border-default)" }}>
                <div>
                  <h4 className="text-sm font-bold tracking-wider uppercase font-mono mb-4 text-cyan-400">
                    Technologies &amp; Frameworks
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.technologies.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono transition-all hover:text-white hover:border-emerald-500/30"
                        style={{
                          border: "1px solid var(--border-default)",
                          background: "var(--bg-tag)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Awards and Activities Bento Cards */}
            <div className="mt-12">
              <div className="mb-8 flex items-center gap-4">
                <FiAward className="w-5 h-5 text-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.3)]" />
                <h2 className="text-lg md:text-xl font-bold tracking-widest uppercase font-mono" style={{ color: "var(--text-heading)" }}>
                  Awards &amp; Key Activities
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

          {/* CONTACT SECTION */}
          <Section id="contact" title="Contact" icon={FiMail}>
            <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden" style={{ borderColor: "var(--border-default)" }}>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-cyan-500/5 to-transparent rounded-tl-full pointer-events-none" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <div className="text-[10px] font-semibold font-mono tracking-widest uppercase text-cyan-400 mb-1">
                    Let's collaborate
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight font-sans" style={{ color: "var(--text-heading)" }}>
                    Get In Touch
                  </h3>
                  <p className="text-sm mt-2 leading-relaxed font-sans max-w-sm" style={{ color: "var(--text-secondary)" }}>
                    Have an interesting project, alignment challenge, or engineering role? Drop me a message. Let's build something exceptional.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href={`mailto:${contact.email}`}
                    className="group p-4 rounded-xl transition-all flex flex-col justify-between"
                    style={{
                      border: "1px solid var(--border-default)",
                      background: "var(--bg-tag)",
                    }}
                  >
                    <div className="text-xs font-mono uppercase" style={{ color: "var(--text-muted)" }}>Email</div>
                    <div className="text-sm font-bold mt-2 font-sans break-all group-hover:text-cyan-400 transition-colors" style={{ color: "var(--text-heading)" }}>
                      {contact.email}
                    </div>
                  </a>

                  <a
                    href={`https://www.linkedin.com/in/${contact.linkedinUsername}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group p-4 rounded-xl transition-all flex flex-col justify-between"
                    style={{
                      border: "1px solid var(--border-default)",
                      background: "var(--bg-tag)",
                    }}
                  >
                    <div className="text-xs font-mono uppercase" style={{ color: "var(--text-muted)" }}>LinkedIn</div>
                    <div className="text-sm font-bold mt-2 font-sans break-all group-hover:text-cyan-400 transition-colors" style={{ color: "var(--text-heading)" }}>
                      {contact.linkedinUsername}
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </Section>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;

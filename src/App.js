import React from "react";
import { FiMail, FiExternalLink, FiAward, FiBookOpen, FiTerminal } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import cv from "./data/cv";
import Console from "./components/Console";
import AlgoVisualizer from "./components/AlgoVisualizer";

function Section({ id, title, icon: Icon, children }) {
  return (
    <section id={id} className="scroll-mt-24 py-14 border-t border-zinc-900/60 first:border-none">
      <div className="mb-8 flex items-center gap-4">
        {Icon && <Icon className="w-5 h-5 text-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.3)]" />}
        <h2 className="text-lg md:text-xl font-bold tracking-widest text-zinc-100 uppercase font-mono">{title}</h2>
        <div className="h-[1px] flex-1 bg-gradient-to-right from-zinc-800 to-transparent" style={{ backgroundImage: "linear-gradient(to right, #27272a, transparent)" }} />
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

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#030303] text-zinc-300 relative obsidian-grid radial-glow-cyan">
      {/* Glow ambient lights — fixed so they never contribute to document overflow */}
      <div className="fixed top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-cyan-950/10 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-emerald-950/10 blur-[120px] pointer-events-none z-0" />

      {/* Header rendered outside the scrollable/flex container to bypass browser fixed-position bugs */}
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

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
                    I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400" style={{ backgroundImage: "linear-gradient(to right, #22d3ee, #34d399)" }}>{name}</span>
                  </h1>

                  <p className="text-zinc-400 leading-relaxed text-sm sm:text-base md:text-lg max-w-xl font-sans">
                    Software Engineer &amp; Data Scientist specializing in AI model alignment, system optimizations, and full-stack engineering. I solve complex algorithmic challenges and design scalable infrastructure.
                  </p>

                  {/* Social Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      className="group flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-850 bg-zinc-900/60 hover:bg-zinc-900 hover:border-zinc-700 transition-all font-mono text-xs text-zinc-300 hover:text-white"
                      href={`mailto:${contact.email}`}
                    >
                      <FiMail className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span>Email</span>
                    </a>

                    <a
                      className="group flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-850 bg-zinc-900/60 hover:bg-zinc-900 hover:border-zinc-700 transition-all font-mono text-xs text-zinc-300 hover:text-white"
                      href={`https://www.linkedin.com/in/${contact.linkedinUsername}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaLinkedinIn className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span>LinkedIn</span>
                    </a>

                    <a
                      className="group flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-850 bg-zinc-900/60 hover:bg-zinc-900 hover:border-zinc-700 transition-all font-mono text-xs text-zinc-300 hover:text-white"
                      href={`https://github.com/${contact.githubUsername}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaGithub className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span>GitHub</span>
                    </a>

                    <a
                      className="group flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-850 bg-zinc-900/60 hover:bg-zinc-900 hover:border-zinc-700 transition-all font-mono text-xs text-zinc-300 hover:text-white"
                      href={`https://leetcode.com/${contact.leetcodeUsername}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <SiLeetcode className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span>LeetCode</span>
                    </a>
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
                {education.map((edu, idx) => (
                  <div
                    key={edu.title}
                    className="glass-card rounded-2xl p-6 border border-zinc-850 hover:border-zinc-800 transition-all relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/5 to-transparent rounded-bl-full pointer-events-none" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
                      <h4 className="text-base font-bold text-white font-sans max-w-xs">{edu.title}</h4>
                      <span className="text-xs font-mono text-cyan-400 font-semibold whitespace-nowrap bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-900/40 shrink-0 self-start">
                        {edu.period}
                      </span>
                    </div>

                    <ul className="space-y-3 font-sans text-sm text-zinc-400">
                      {edu.details.map((d, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5 leading-relaxed">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            {/* EXPERIENCE SECTION */}
            <Section id="experience" title="Experience" icon={FiTerminal}>
              <div className="relative border-l border-zinc-850 pl-6 ml-2 space-y-10 py-2">
                {experience.map((job, idx) => (
                  <div key={job.role} className="relative group">
                    {/* Timeline Node Point */}
                    <span className="absolute left-[-31px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#030303] border-2 border-cyan-400 z-20 group-hover:scale-125 transition-transform" />
                    <span className="absolute left-[-31px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-400/50 animate-ping z-10" />

                    <div className="glass-card rounded-2xl p-6 border border-zinc-850 hover:border-zinc-800 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <div>
                          <h4 className="text-base sm:text-lg font-bold text-white tracking-tight font-sans">
                            {job.role}
                          </h4>
                          <span className="text-xs font-mono text-zinc-500 font-medium">Professional Experience</span>
                        </div>
                        <span className="text-xs font-mono text-emerald-400 font-semibold whitespace-nowrap bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/40 self-start sm:self-center">
                          {job.period}
                        </span>
                      </div>

                      <ul className="space-y-2.5 text-sm font-sans text-zinc-400">
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
                {projects.map((p, idx) => (
                  <div
                    key={p.name}
                    className="glass-card rounded-2xl p-6 border border-zinc-850 hover:border-zinc-800 transition-all flex flex-col justify-between group relative overflow-hidden"
                  >
                    {/* Cyber Grid element border */}
                    <div className="absolute top-[-50%] right-[-50%] w-48 h-48 rounded-full bg-zinc-900/20 border border-zinc-850/50 pointer-events-none group-hover:border-cyan-500/20 transition-all" />
                    
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
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
                      
                      <h4 className="text-base sm:text-lg font-bold text-white font-sans tracking-tight">
                        {p.name}
                      </h4>

                      <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-zinc-400 font-sans">
                        {p.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5 leading-relaxed">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-900/60 flex flex-wrap gap-2">
                      {p.name.includes("VAIS") ? (
                        <>
                          <span className="text-[10px] font-mono bg-zinc-900 text-cyan-300 border border-zinc-800 px-2 py-0.5 rounded">LSTM</span>
                          <span className="text-[10px] font-mono bg-zinc-900 text-cyan-300 border border-zinc-800 px-2 py-0.5 rounded">Transformers</span>
                          <span className="text-[10px] font-mono bg-zinc-900 text-cyan-300 border border-zinc-800 px-2 py-0.5 rounded">NLP</span>
                          <span className="text-[10px] font-mono bg-zinc-900 text-cyan-300 border border-zinc-800 px-2 py-0.5 rounded">Python</span>
                        </>
                      ) : (
                        <>
                          <span className="text-[10px] font-mono bg-zinc-900 text-cyan-300 border border-zinc-800 px-2 py-0.5 rounded">Model Context Protocol</span>
                          <span className="text-[10px] font-mono bg-zinc-900 text-cyan-300 border border-zinc-800 px-2 py-0.5 rounded">Telegram API</span>
                          <span className="text-[10px] font-mono bg-zinc-900 text-cyan-300 border border-zinc-800 px-2 py-0.5 rounded">Python</span>
                          <span className="text-[10px] font-mono bg-zinc-900 text-cyan-300 border border-zinc-800 px-2 py-0.5 rounded">uv</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* ALGORITHMIC SANDBOX STANDALONE SECTION */}
            <Section id="visualizer" title="Algorithmic Visualizer" icon={FiTerminal}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
                  <div className="text-[10px] font-semibold font-mono tracking-widest uppercase text-cyan-400">
                    LeetCode Guardian Sandbox
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-sans tracking-tight">
                    Dynamic Search Simulations
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                    As an educator and competitive coder, I appreciate visual learning tools. This Binary Search simulation visually illustrates the logarithmic dividing process of search spaces:
                  </p>
                  <ul className="space-y-2 text-xs text-zinc-400 font-sans">
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
                  <p className="text-xs text-zinc-500 font-mono italic">
                    Try choosing a target element and clicking 'Step' or 'Run' to observe the pointer calculations live.
                  </p>
                </div>
                <div className="lg:col-span-7 w-full">
                  <AlgoVisualizer />
                </div>
              </div>
            </Section>

            {/* SKILLS SECTION */}
            <Section id="skills" title="Skills" icon={FiTerminal}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Languages Card */}
                <div className="glass-card rounded-2xl p-6 border border-zinc-850 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-wider uppercase font-mono mb-4 text-cyan-400">
                      Languages
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.programmingLanguages.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 rounded-lg border border-zinc-850 bg-zinc-900/50 text-xs text-zinc-300 hover:border-cyan-500/30 hover:text-white transition-all font-mono"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Frameworks & Tech Card */}
                <div className="glass-card rounded-2xl p-6 border border-zinc-850 md:col-span-2 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-wider uppercase font-mono mb-4 text-cyan-400">
                      Technologies &amp; Frameworks
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.technologies.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 rounded-lg border border-zinc-850 bg-zinc-900/50 text-xs text-zinc-300 hover:border-emerald-500/30 hover:text-white transition-all font-mono"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Awards and Activities Bento Cards Grid */}
              <div className="mt-12">
                <div className="mb-8 flex items-center gap-4">
                  <FiAward className="w-5 h-5 text-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.3)]" />
                  <h2 className="text-lg md:text-xl font-bold tracking-widest text-zinc-100 uppercase font-mono">Awards &amp; Key Activities</h2>
                  <div className="h-[1px] flex-1" style={{ backgroundImage: "linear-gradient(to right, #27272a, transparent)" }} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* LeetCode Guardian Card */}
                  <a
                    href="https://leetcode.com/u/dryeab/"
                    target="_blank"
                    rel="noreferrer"
                    className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-zinc-850 hover:border-zinc-700 hover:scale-[1.01] transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-amber-400">
                          <SiLeetcode className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-semibold">
                          0.5% Globally
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white tracking-tight font-sans flex items-center gap-1.5">
                        LeetCode Guardian
                        <FiExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                      </h3>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans">
                        Ranked in the <strong className="text-zinc-200">Top 0.5% globally</strong> with a competitive coding rating of <strong className="text-zinc-200">2290+</strong> and 800+ algorithms solved.
                      </p>
                    </div>
                    <div className="mt-6 border-t border-zinc-900 pt-4 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">Rating</span>
                        <span className="text-sm font-bold text-white font-mono">2290+</span>
                      </div>
                      {/* Tiny SVG chart line visual */}
                      <svg className="w-20 h-8 text-emerald-500" viewBox="0 0 100 40">
                        <path
                          d="M0 35 Q 20 28, 40 30 T 80 12 T 100 5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <circle cx="100" cy="5" r="3" fill="#10b981" className="animate-ping" />
                        <circle cx="100" cy="5" r="2" fill="#10b981" />
                      </svg>
                    </div>
                  </a>

                  {/* AddisCoder Volunteering Card */}
                  <a
                    href="https://drive.google.com/file/d/1-0WZPN4GzDiOn8Ucp209D0hIQGEYmyEs/view?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                    className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-zinc-850 hover:border-zinc-700 hover:scale-[1.01] transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-emerald-400">
                          <FiBookOpen className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono bg-teal-500/10 border border-teal-500/20 text-teal-400 px-2 py-0.5 rounded-full font-semibold">
                          Teaching &amp; Algorithms
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white tracking-tight font-sans flex items-center gap-1.5">
                        AddisCoder Volunteering
                        <FiExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                      </h3>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans">
                        Volunteered as a teaching assistant for the 2023 AddisCoder program, an intensive algorithms course for high schoolers, led by global industry and academic experts.
                      </p>
                    </div>
                    <div className="mt-6 border-t border-zinc-900 pt-4 flex items-center justify-between font-mono text-[10px] text-zinc-500">
                      <span>AddisCoder 2023</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        Certificate <FiExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </a>

                  {/* ECPC 2nd Place Card */}
                  <a
                    href="https://drive.google.com/file/d/1JxYQuRKIMc82NI7V_Vs6LjMhg59_eL0f/view?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                    className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-zinc-850 hover:border-zinc-700 hover:scale-[1.01] transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-cyan-400">
                          <FiAward className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full font-semibold">
                          Collegiate Coding
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white tracking-tight font-sans flex items-center gap-1.5">
                        Collegiate Programming
                        <FiExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                      </h3>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans">
                        Achieved <strong className="text-zinc-200">Second Place</strong> in the 2023 Ethiopian Collegiate Programming Contest (ECPC), showcasing team troubleshooting and algorithm design.
                      </p>
                    </div>
                    <div className="mt-6 border-t border-zinc-900 pt-4 flex items-center justify-between font-mono text-[10px] text-zinc-500">
                      <span>ECPC 2023</span>
                      <span className="text-cyan-400 font-semibold flex items-center gap-1">
                        Certificate <FiExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </a>

                  {/* AAU Research Award Card */}
                  <div
                    className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-zinc-850 hover:border-zinc-755 transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-cyan-400">
                          <FiAward className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full font-semibold">
                          Academic Honor
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white tracking-tight font-sans">
                        Best Research Project
                      </h3>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans">
                        Awarded <strong className="text-zinc-200">Best Research Project</strong> among 2021 projects at Addis Ababa University for work in agricultural NLP model development.
                      </p>
                    </div>
                    <div className="mt-6 border-t border-zinc-900 pt-4 flex items-center justify-between font-mono text-[10px] text-zinc-500">
                      <span>Addis Ababa University</span>
                      <span className="text-cyan-400 font-semibold">AAU 2021</span>
                    </div>
                  </div>

                </div>
              </div>
            </Section>

            {/* CONTACT SECTION */}
            <Section id="contact" title="Contact" icon={FiMail}>
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-zinc-850 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-cyan-500/5 to-transparent rounded-tl-full pointer-events-none" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <div className="text-[10px] font-semibold font-mono tracking-widest uppercase text-cyan-400 mb-1">
                      Let's collaborate
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">
                      Get In Touch
                    </h3>
                    <p className="text-sm text-zinc-400 mt-2 leading-relaxed font-sans max-w-sm">
                      Have an interesting project, alignment challenge, or engineering role? Drop me a message. Let's build something exceptional.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                      href={`mailto:${contact.email}`}
                      className="group p-4 rounded-xl border border-zinc-850 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all flex flex-col justify-between"
                    >
                      <div className="text-xs font-mono text-zinc-500 uppercase">Email</div>
                      <div className="text-sm font-bold text-white mt-2 font-sans break-all group-hover:text-cyan-400 transition-colors">
                        {contact.email}
                      </div>
                    </a>

                    <a
                      href={`https://www.linkedin.com/in/${contact.linkedinUsername}`}
                      target="_blank"
                      rel="noreferrer"
                      className="group p-4 rounded-xl border border-zinc-850 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all flex flex-col justify-between"
                    >
                      <div className="text-xs font-mono text-zinc-500 uppercase">LinkedIn</div>
                      <div className="text-sm font-bold text-white mt-2 font-sans break-all group-hover:text-cyan-400 transition-colors">
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

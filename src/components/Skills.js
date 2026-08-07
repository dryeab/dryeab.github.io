import React from "react";
import { FiCode, FiLayout, FiServer, FiCpu, FiTool, FiDatabase } from "react-icons/fi";
import {
  SiPython,
  SiJavascript,
  SiC,
  SiCplusplus,
  SiRust,
  SiDotnet,
  SiOpenjdk,
  SiGo,
  SiReact,
  SiVuedotjs,
  SiNuxt,
  SiTailwindcss,
  SiBootstrap,
  SiExpress,
  SiNestjs,
  SiDjango,
  SiFlask,
  SiFastapi,
  SiMongodb,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiSpacy,
  SiOpencv,
  SiDocker,
  SiLinux,
  SiGit,
  SiSelenium,
} from "react-icons/si";

/**
 * Keyed by the exact label in cv.js. Anything without a mark falls back to a
 * generic glyph rather than a wrong logo — note C# uses the .NET mark, since
 * simple-icons' `SiSharp` is Sharp the electronics company, not C#.
 */
const ICONS = {
  Python: SiPython,
  JavaScript: SiJavascript,
  C: SiC,
  "C++": SiCplusplus,
  "C#": SiDotnet,
  Java: SiOpenjdk,
  Go: SiGo,
  Rust: SiRust,

  "React/Next": SiReact,
  VueJS: SiVuedotjs,
  NuxtJS: SiNuxt,
  "Tailwind CSS": SiTailwindcss,
  Bootstrap: SiBootstrap,

  Express: SiExpress,
  NestJS: SiNestjs,
  Django: SiDjango,
  Flask: SiFlask,
  FastAPI: SiFastapi,
  "ASP.NET Core": SiDotnet,
  SQL: FiDatabase,
  MongoDB: SiMongodb,

  PyTorch: SiPytorch,
  TensorFlow: SiTensorflow,
  "Scikit-learn": SiScikitlearn,
  Pandas: SiPandas,
  NumPy: SiNumpy,
  spaCy: SiSpacy,
  OpenCV: SiOpencv,

  Docker: SiDocker,
  Linux: SiLinux,
  Git: SiGit,
  Selenium: SiSelenium,
};

/**
 * Presentation for each group lives here rather than in cv.js — the data file
 * stays content-only. Colour is used sparingly: just the icon tile at rest,
 * then the chip hover state inside that card.
 * Spans compose a 6-column bento: [2 + 2 + 2] over [4 + 2].
 */
const GROUPS = {
  Languages: { icon: FiCode, hex: "#22d3ee", span: "lg:col-span-2" },
  Frontend: { icon: FiLayout, hex: "#38bdf8", span: "lg:col-span-2" },
  Backend: { icon: FiServer, hex: "#a78bfa", span: "lg:col-span-2" },
  "AI / ML": { icon: FiCpu, hex: "#34d399", span: "lg:col-span-4" },
  Tools: { icon: FiTool, hex: "#fbbf24", span: "lg:col-span-2" },
};

const FALLBACK = { icon: FiCode, hex: "#22d3ee", span: "lg:col-span-2" };

const SkillChip = ({ name }) => {
  const Icon = ICONS[name] || FiCode;
  return (
    <span className="skill-chip inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono">
      <Icon className="w-3.5 h-3.5 shrink-0 skill-chip-icon" />
      <span>{name}</span>
    </span>
  );
};

const Skills = ({ groups }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
    {groups.map((group) => {
      const { icon: Icon, hex, span } = GROUPS[group.label] || FALLBACK;

      return (
        <div
          key={group.label}
          className={`entry-card glass-card rounded-2xl p-5 sm:p-6 flex flex-col gap-5 ${span}`}
          style={{
            "--chip-accent": hex,
            "--chip-soft": `${hex}14`,
            "--chip-ring": `${hex}73`,
            "--accent-ring": `${hex}59`,
            "--accent-soft": `${hex}12`,
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: `${hex}1a`,
                border: `1px solid ${hex}40`,
                color: hex,
              }}
            >
              <Icon className="w-4 h-4" />
            </span>
            <h3
              className="text-[11px] font-bold tracking-widest uppercase font-mono"
              style={{ color: "var(--text-secondary)" }}
            >
              {group.label}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {group.items.map((name) => (
              <SkillChip key={name} name={name} />
            ))}
          </div>
        </div>
      );
    })}
  </div>
);

export default Skills;

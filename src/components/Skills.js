import React from "react";
import { FiCode, FiDatabase } from "react-icons/fi";
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

const SkillChip = ({ name }) => {
  const Icon = ICONS[name] || FiCode;
  return (
    <span className="skill-chip inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono">
      <Icon className="w-3 h-3 shrink-0 skill-chip-icon" />
      <span>{name}</span>
    </span>
  );
};

/** Label in the margin, chips beside it — same layout as the SideNote credentials. */
const Skills = ({ groups }) => (
  <div className="space-y-6">
    {groups.map((group) => (
      <div
        key={group.label}
        className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8"
      >
        <h3
          className="shrink-0 sm:w-28 text-[11px] font-bold tracking-widest uppercase font-mono"
          style={{ color: "var(--text-muted)" }}
        >
          {group.label}
        </h3>

        <div className="flex-1 flex flex-wrap gap-2">
          {group.items.map((name) => (
            <SkillChip key={name} name={name} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default Skills;

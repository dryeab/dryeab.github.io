import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "./theme/ThemeContext";

const BOOT_LOGS = [
  { type: "sys", text: "Initializing Yeabsira's portfolio terminal v2.5.0..." },
  { type: "ok", text: "Connection established with secure-tunnel.dryeab.io" },
  { type: "ok", text: "Environment status: ACTIVE | Open for Work" },
  { type: "info", text: "Type 'help' to see a list of available commands." },
];

const COMMAND_RESPONSES = {
  help: [
    { type: "cmd-list", text: "Available commands:" },
    { type: "cmd-item", text: "  about       - Brief introduction about Yeabsira" },
    { type: "cmd-item", text: "  experience  - View professional work history" },
    { type: "cmd-item", text: "  projects    - Highlighted open-source and research projects" },
    { type: "cmd-item", text: "  skills      - Stack of languages and tools" },
    { type: "cmd-item", text: "  leetcode    - LeetCode Guardian rank & competitive coding status" },
    { type: "cmd-item", text: "  contact     - Display email & social handles" },
    { type: "cmd-item", text: "  clear       - Clear terminal buffer" },
  ],
  about: [
    { type: "sys", text: "ABOUT YEABSIRA DRIBA" },
    { type: "info", text: "Yeabsira is an elite Software Engineer & Data Scientist specializing in AI model alignment, system optimizations, and full-stack engineering." },
    { type: "info", text: "• Ex-Turing Python Engineer aligning and resolving critical bugs in state-of-the-art AI LLM models." },
    { type: "info", text: "• Ex-A2SV Head of Education & Tutor, mentoring 50+ students in advanced algorithms." },
    { type: "info", text: "• BSc Software Engineering from Addis Ababa University (GPA: 3.71)." },
  ],
  experience: [
    { type: "sys", text: "EXPERIENCE LOG" },
    { type: "ok", text: "[06/2024 - 04/2026] Python Engineer, Turing (AI Alignment & Reliability)" },
    { type: "ok", text: "[01/2023 - 05/2024] Frontend Developer, Stead Tech Inc (React/Tailwind)" },
    { type: "ok", text: "[08/2021 - 12/2022] Head of Education & Full Stack Developer, A2SV" },
    { type: "ok", text: "[08/2020 - 07/2021] Backend Developer, Eskalate LLC (ASP.NET/PostgreSQL)" },
    { type: "info", text: "Scrolling to Experience section..." },
  ],
  projects: [
    { type: "sys", text: "PROJECT ARCHIVE" },
    { type: "ok", text: "• VAIS (Voice-assisted Agricultural Info System) - LSTM & Transformer Amharic Chatbot" },
    { type: "ok", text: "• mcp-telegram - Model Context Protocol server connecting LLMs to Telegram" },
    { type: "info", text: "Scrolling to Projects section..." },
  ],
  skills: [
    { type: "sys", text: "SKILLS MATRIX" },
    { type: "info", text: "Languages: Python, JavaScript, C++, C#, Java, Go" },
    { type: "info", text: "Frameworks: React/Next, Express, Vue/Nuxt, Django, ASP.NET Core" },
    { type: "info", text: "AI/ML/Data: PyTorch, TensorFlow, Pandas, NumPy, Scikit-learn, Transformers" },
    { type: "info", text: "DevOps/Tools: Docker, Linux, Git, PostgreSQL, MongoDB" },
    { type: "info", text: "Scrolling to Skills section..." },
  ],
  leetcode: [
    { type: "sys", text: "LEETCODE STATUS" },
    { type: "ok", text: "Rank: Guardian (Top 1% globally)" },
    { type: "ok", text: "Rating: 2290+" },
    { type: "ok", text: "Problems Solved: 800+" },
    { type: "info", text: "Competitive Coding: AAU Collegiate Contest 2nd Place (2023)" },
    { type: "info", text: "Scrolling to Skills (Awards) section..." },
  ],
  contact: [
    { type: "sys", text: "COMMUNICATION HOOKS" },
    { type: "info", text: "Email: dryeab@gmail.com" },
    { type: "info", text: "GitHub: github.com/dryeab" },
    { type: "info", text: "LinkedIn: linkedin.com/in/dryeab" },
    { type: "info", text: "Scrolling to Contact section..." },
  ],
};

const Console = () => {
  const [history, setHistory] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [booting, setBooting] = useState(true);
  const [bootIndex, setBootIndex] = useState(0);
  const consoleEndRef = useRef(null);
  const scrollAreaRef = useRef(null);
  const inputRef = useRef(null);
  const { theme } = useTheme();
  const isLight = theme === "light";

  // Handle boot sequence
  useEffect(() => {
    if (bootIndex < BOOT_LOGS.length) {
      const timer = setTimeout(() => {
        setHistory((prev) => [...prev, BOOT_LOGS[bootIndex]]);
        setBootIndex((prev) => prev + 1);
      }, 350);
      return () => clearTimeout(timer);
    } else {
      setBooting(false);
    }
  }, [bootIndex]);

  // Scroll to bottom of terminal's own container (NOT the page)
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmdStr) => {
    const cleanCmd = cmdStr.trim().toLowerCase();
    const newLogs = [{ type: "input", text: `visitor@dryeab.io:~$ ${cmdStr}` }];

    if (cleanCmd === "") {
      setHistory((prev) => [...prev, ...newLogs]);
      return;
    }

    if (cleanCmd === "clear") {
      setHistory([]);
      return;
    }

    if (COMMAND_RESPONSES[cleanCmd]) {
      newLogs.push(...COMMAND_RESPONSES[cleanCmd]);
      
      // Auto-scroll logic for UI sections
      let sectionId = "";
      if (cleanCmd === "about") sectionId = "about";
      else if (cleanCmd === "experience") sectionId = "experience";
      else if (cleanCmd === "projects") sectionId = "projects";
      else if (cleanCmd === "skills" || cleanCmd === "leetcode") sectionId = "skills";
      else if (cleanCmd === "contact") sectionId = "contact";

      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 600);
      }
    } else {
      newLogs.push({
        type: "err",
        text: `Command not found: '${cleanCmd}'. Type 'help' to see list of valid commands.`,
      });
    }

    setHistory((prev) => [...prev, ...newLogs]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleCommand(inputVal);
    setInputVal("");
  };

  const focusInput = () => {
    if (!booting) {
      inputRef.current?.focus();
    }
  };

  // Theme-aware colours
  const colors = {
    wrap: isLight
      ? { background: "rgba(241,241,248,0.92)", border: "1px solid var(--border-default)" }
      : { background: "rgba(18,18,24,0.80)", border: "1px solid #27272a" },
    titleBar: isLight
      ? { background: "#e4e4f0", borderBottom: "1px solid var(--border-default)" }
      : { background: "#18181b", borderBottom: "1px solid #27272a" },
    titleLabel: isLight ? "#71717a" : "#71717a",
    scrollArea: isLight ? { background: "transparent" } : { background: "transparent" },
    inputBar: isLight
      ? { background: "rgba(228,228,244,0.85)", borderTop: "1px solid var(--border-muted)" }
      : { background: "rgba(9,9,11,0.7)", borderTop: "1px solid rgba(39,39,42,0.5)" },
    inputText: isLight ? "#18181b" : "#f4f4f5",
    promptText: isLight ? "#10b981" : "#34d399",
    logInput: isLight ? "#09090b" : "#f4f4f5",
    logSys: "#22d3ee",
    logOk: "#34d399",
    logInfo: isLight ? "#52525b" : "#a1a1aa",
    logCmdList: isLight ? "#3f3f46" : "#71717a",
    logCmdItem: "#67e8f9",
    logErr: "#f87171",
    spinnerBorder: isLight ? "#71717a" : "#a1a1aa",
    spinnerText: isLight ? "#71717a" : "#71717a",
  };

  const getLogStyle = (type) => {
    switch (type) {
      case "input":    return { color: colors.logInput, fontWeight: 500 };
      case "sys":      return { color: colors.logSys, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" };
      case "ok":       return { color: colors.logOk };
      case "info":     return { color: colors.logInfo };
      case "cmd-list": return { color: colors.logCmdList, fontWeight: 600 };
      case "cmd-item": return { color: colors.logCmdItem, whiteSpace: "pre" };
      case "err":      return { color: colors.logErr, fontWeight: 500 };
      default:         return { color: colors.logInfo };
    }
  };

  return (
    <div
      className="rounded-2xl w-full h-[320px] md:h-[380px] font-mono text-[11px] sm:text-xs md:text-sm shadow-2xl flex flex-col overflow-hidden neon-glow-cyan"
      style={{
        ...colors.wrap,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "var(--transition-theme)",
      }}
      onClick={focusInput}
    >
      {/* Terminal Title Bar */}
      <div className="px-4 py-2 flex items-center justify-between select-none" style={colors.titleBar}>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
        </div>
        <div className="font-semibold text-[10px] md:text-[11px] uppercase tracking-wider" style={{ color: colors.titleLabel }}>
          yeabsira_terminal_sh
        </div>
        <div className="w-12 text-right text-[10px] text-cyan-400 font-medium">
          {booting ? "BOOTING" : "ONLINE"}
        </div>
      </div>

      {/* Terminal Logs Area */}
      <div ref={scrollAreaRef} className="flex-1 p-4 overflow-y-auto space-y-2 select-text scrollbar-thin" style={colors.scrollArea}>
        {history.map((log, idx) => (
          <div key={idx} style={getLogStyle(log.type)}>
            {log.text}
          </div>
        ))}
        {booting && (
          <div className="inline-flex gap-2 items-center" style={{ color: colors.spinnerText }}>
            <span className="w-2.5 h-2.5 rounded-full border border-t-transparent animate-spin" style={{ borderColor: colors.spinnerBorder, borderTopColor: "transparent" }} />
            <span>Loading database...</span>
          </div>
        )}
        <div ref={consoleEndRef} />
      </div>

      {/* Terminal Input Line */}
      {!booting && (
        <form onSubmit={onSubmit} className="border-t p-3 flex items-center gap-1.5 select-none" style={colors.inputBar}>
          <span className="shrink-0 font-medium" style={{ color: colors.promptText }}>visitor@dryeab.io:~$</span>
          <div className="flex-1 relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              className="w-full bg-transparent border-none outline-none font-mono caret-transparent focus:ring-0 p-0 text-[11px] sm:text-xs md:text-sm"
              style={{ color: colors.inputText }}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              placeholder="type commands..."
            />
            <span
              className="absolute pointer-events-none font-mono text-[11px] sm:text-xs md:text-sm left-0 cursor-blink"
              style={{
                color: colors.inputText,
                transform: `translateX(${inputVal.length * 0.6}em)`,
                display: inputRef.current === document.activeElement ? "inline-block" : "none"
              }}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Console;

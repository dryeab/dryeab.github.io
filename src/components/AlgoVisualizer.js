import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "./theme/ThemeContext";

const ARRAY = [3, 8, 12, 17, 24, 35, 42, 58, 70, 85, 93];

const AlgoVisualizer = () => {
  const [target, setTarget] = useState(42);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(ARRAY.length - 1);
  const [mid, setMid] = useState(null);
  const [status, setStatus] = useState("idle"); // idle, searching, found, not_found
  const [logs, setLogs] = useState(["Ready. Select a target and click Step or Run."]);
  const [isPlaying, setIsPlaying] = useState(false);
  const playInterval = useRef(null);
  const { theme } = useTheme();
  const isLight = theme === "light";

  const resetSearch = useCallback((newTarget = target) => {
    setIsPlaying(false);
    if (playInterval.current) {
      clearInterval(playInterval.current);
    }
    setLeft(0);
    setRight(ARRAY.length - 1);
    setMid(null);
    setStatus("idle");
    setLogs([`Initialized search for target value: ${newTarget}`]);
  }, [target]);

  const handleTargetChange = (val) => {
    setTarget(val);
    resetSearch(val);
  };

  const stepSearch = useCallback(() => {
    if (status === "found" || status === "not_found") {
      resetSearch(target);
      return;
    }

    if (left > right) {
      setStatus("not_found");
      setLogs((prev) => [...prev, `[FAIL] left (${left}) > right (${right}). Target ${target} does NOT exist in the array.`]);
      setIsPlaying(false);
      return;
    }

    const currentMid = Math.floor((left + right) / 2);
    setMid(currentMid);
    setStatus("searching");

    const midValue = ARRAY[currentMid];
    const newLog = `Step: left=${left}, right=${right} | mid=${currentMid} (value=${midValue})`;

    if (midValue === target) {
      setStatus("found");
      setLogs((prev) => [
        ...prev,
        newLog,
        `[SUCCESS] array[mid] (${midValue}) matches target (${target})! Found at index ${currentMid}.`
      ]);
      setIsPlaying(false);
    } else if (midValue < target) {
      setLeft(currentMid + 1);
      setLogs((prev) => [
        ...prev,
        newLog,
        `-> value (${midValue}) < target (${target}). Search right half: setting left = mid + 1 (${currentMid + 1}).`
      ]);
    } else {
      setRight(currentMid - 1);
      setLogs((prev) => [
        ...prev,
        newLog,
        `-> value (${midValue}) > target (${target}). Search left half: setting right = mid - 1 (${currentMid - 1}).`
      ]);
    }
  }, [left, right, status, target, resetSearch]);

  // Autoplay handler
  useEffect(() => {
    if (isPlaying) {
      playInterval.current = setInterval(() => {
        stepSearch();
      }, 1000);
    } else {
      if (playInterval.current) {
        clearInterval(playInterval.current);
      }
    }
    return () => {
      if (playInterval.current) {
        clearInterval(playInterval.current);
      }
    };
  }, [isPlaying, stepSearch]);

  return (
    <div
      className="rounded-2xl p-5 md:p-6 shadow-2xl neon-glow-emerald flex flex-col justify-between h-full min-h-[380px]"
      style={{
        background: isLight ? "rgba(255,255,255,0.85)" : "rgba(18,18,24,0.80)",
        border: "1px solid var(--border-default)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "var(--transition-theme)",
      }}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-sm font-semibold tracking-wider uppercase font-mono" style={{ color: "var(--text-heading)" }}>
              Algo Sandbox: Binary Search
            </h3>
          </div>
          <span
            className="text-[10px] px-2 py-0.5 rounded font-mono"
            style={{
              background: "var(--bg-tag)",
              border: "1px solid var(--border-default)",
              color: "var(--text-secondary)",
            }}
          >
            O(log N)
          </span>
        </div>

        <p className="text-xs leading-relaxed mb-6 font-sans" style={{ color: "var(--text-secondary)" }}>
          Step through an algorithm live. Watch pointers shrink the boundaries in logarithmic time to locate the target.
        </p>

        {/* Array Visualization */}
        <div className="flex items-end justify-between h-24 mb-6 px-1 relative select-none">
          {ARRAY.map((val, idx) => {
            const isOutside = idx < left || idx > right;
            const isMid = idx === mid;
            const isLeft = idx === left;
            const isRight = idx === right;

            let cardStyle = {};
            let className = "w-full rounded-md border flex items-center justify-center font-mono text-[10px] sm:text-xs font-semibold transition-all duration-300";

            if (isOutside) {
              cardStyle = {
                border: `1px solid var(--border-muted)`,
                background: isLight ? "rgba(220,220,235,0.3)" : "rgba(9,9,11,0.2)",
                color: "var(--text-muted)",
                opacity: 0.35,
              };
            } else if (status === "found" && isMid) {
              cardStyle = {
                border: "1px solid #10b981",
                background: "rgba(16,185,129,0.15)",
                color: "#10b981",
                boxShadow: "0 0 15px rgba(16,185,129,0.35)",
                transform: "scale(1.10)",
                outline: "2px solid rgba(16,185,129,0.4)",
              };
            } else if (isMid) {
              cardStyle = {
                border: "1px solid #f59e0b",
                background: "rgba(245,158,11,0.10)",
                color: "#f59e0b",
                boxShadow: "0 0 10px rgba(245,158,11,0.2)",
                transform: "scale(1.05)",
                outline: "1px solid rgba(245,158,11,0.3)",
              };
            } else if (isLeft && isRight) {
              cardStyle = {
                border: "1px solid #06b6d4",
                background: "rgba(6,182,212,0.10)",
                color: "#06b6d4",
                boxShadow: "0 0 10px rgba(6,182,212,0.2)",
              };
            } else if (isLeft) {
              cardStyle = {
                border: "1px solid #14b8a6",
                background: "rgba(20,184,166,0.10)",
                color: "#14b8a6",
                boxShadow: "0 0 10px rgba(20,184,166,0.15)",
              };
            } else if (isRight) {
              cardStyle = {
                border: "1px solid #0ea5e9",
                background: "rgba(14,165,233,0.10)",
                color: "#0ea5e9",
                boxShadow: "0 0 10px rgba(14,165,233,0.15)",
              };
            } else {
              cardStyle = {
                border: `1px solid var(--border-default)`,
                background: "var(--bg-tag)",
                color: "var(--text-secondary)",
              };
            }

            const heightPercent = 35 + (val / 100) * 55;

            return (
              <div
                key={idx}
                className="flex flex-col items-center flex-1 mx-0.5 max-w-[32px] transition-all duration-300"
                style={{ height: "100%" }}
              >
                <div
                  className={className}
                  style={{ height: `${heightPercent}%`, ...cardStyle, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <span className="hidden sm:inline">{val}</span>
                  <span className="sm:hidden text-[9px]">{val}</span>
                </div>
                <div className="h-5 flex items-center justify-center font-mono text-[9px] font-bold mt-1 select-none">
                  {isMid && <span className={status === "found" ? "text-emerald-400 text-xs animate-bounce" : "text-amber-500"}>M</span>}
                  {!isMid && isLeft && isRight && <span className="text-cyan-400">L&R</span>}
                  {!isMid && isLeft && !isRight && <span className="text-teal-400">L</span>}
                  {!isMid && !isLeft && isRight && <span className="text-sky-400">R</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Target selector */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-[10px] font-mono uppercase" style={{ color: "var(--text-muted)" }}>Target:</span>
          {[...ARRAY, 99].map((val) => {
            const isTarget = target === val;
            const label = val === 99 ? "99 (Err)" : val;
            return (
              <button
                key={val}
                onClick={() => handleTargetChange(val)}
                className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-mono border transition-all"
                style={
                  isTarget
                    ? { background: "rgba(6,182,212,0.15)", borderColor: "#06b6d4", color: "#67e8f9" }
                    : {
                        background: "var(--bg-tag)",
                        borderColor: "var(--border-default)",
                        color: "var(--text-secondary)",
                      }
                }
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        {/* Log console */}
        <div
          className="rounded-lg p-3 h-28 overflow-y-auto mb-4 font-mono text-[10px] space-y-1.5 scrollbar-thin select-text"
          style={{
            background: isLight ? "rgba(228,228,244,0.7)" : "rgba(9,9,11,0.8)",
            border: "1px solid var(--border-default)",
          }}
        >
          {logs.map((log, idx) => (
            <div
              key={idx}
              style={{
                color: log.startsWith("[SUCCESS]")
                  ? "#34d399"
                  : log.startsWith("[FAIL]")
                    ? "#f87171"
                    : log.startsWith("Step:")
                      ? isLight ? "#18181b" : "#f4f4f5"
                      : "var(--text-muted)",
                fontWeight: (log.startsWith("[SUCCESS]") || log.startsWith("[FAIL]")) ? 500 : 400,
              }}
            >
              {log}
            </div>
          ))}
        </div>

        {/* Controller Actions */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={stepSearch}
            className="px-3 py-2 rounded-lg font-mono text-xs transition-all"
            style={{
              background: "var(--bg-tag)",
              border: "1px solid var(--border-default)",
              color: "var(--text-secondary)",
            }}
          >
            Step
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-2 rounded-lg font-mono text-xs font-semibold transition-all"
            style={
              isPlaying
                ? { background: "rgba(245,158,11,0.15)", border: "1px solid #f59e0b", color: "#fcd34d" }
                : { background: "rgba(16,185,129,0.15)", border: "1px solid #10b981", color: "#6ee7b7" }
            }
          >
            {isPlaying ? "Pause" : "Run"}
          </button>
          <button
            onClick={() => resetSearch()}
            className="px-3 py-2 rounded-lg font-mono text-xs transition-all"
            style={{
              background: "var(--bg-tag)",
              border: "1px solid var(--border-default)",
              color: "var(--text-muted)",
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlgoVisualizer;

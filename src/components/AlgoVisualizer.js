import React, { useState, useEffect, useRef, useCallback } from "react";

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
    <div className="glass-card rounded-2xl p-5 md:p-6 shadow-2xl border border-zinc-800 neon-glow-emerald flex flex-col justify-between h-full min-h-[380px]">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-sm font-semibold tracking-wider text-zinc-100 uppercase font-mono">
              Algo Sandbox: Binary Search
            </h3>
          </div>
          <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded font-mono">
            O(log N)
          </span>
        </div>

        <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-sans">
          Step through an algorithm live. Watch pointers shrink the boundaries in logarithmic time to locate the target.
        </p>

        {/* Array Visualization */}
        <div className="flex items-end justify-between h-24 mb-6 px-1 relative select-none">
          {ARRAY.map((val, idx) => {
            const isOutside = idx < left || idx > right;
            const isMid = idx === mid;
            const isLeft = idx === left;
            const isRight = idx === right;

            let cardStyle = "border-zinc-800 text-zinc-500 bg-zinc-950/20 opacity-30";
            if (!isOutside) {
              cardStyle = "border-zinc-700 bg-zinc-900 text-zinc-200";
              if (isMid) {
                cardStyle = "border-amber-500 bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/30 scale-105 shadow-[0_0_10px_rgba(245,158,11,0.2)]";
              } else if (isLeft && isRight) {
                cardStyle = "border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]";
              } else if (isLeft) {
                cardStyle = "border-teal-500 bg-teal-500/10 text-teal-400 shadow-[0_0_10px_rgba(20,184,166,0.15)]";
              } else if (isRight) {
                cardStyle = "border-sky-500 bg-sky-500/10 text-sky-400 shadow-[0_0_10px_rgba(14,165,233,0.15)]";
              }
            }
            if (status === "found" && isMid) {
              cardStyle = "border-emerald-500 bg-emerald-500/20 text-emerald-400 ring-2 ring-emerald-500/50 scale-110 shadow-[0_0_15px_rgba(16,185,129,0.4)]";
            }

            // Height scaling for aesthetic flow
            const heightPercent = 35 + (val / 100) * 55;

            return (
              <div
                key={idx}
                className="flex flex-col items-center flex-1 mx-0.5 max-w-[32px] transition-all duration-300"
                style={{ height: "100%" }}
              >
                <div 
                  className={`w-full rounded-md border flex items-center justify-center font-mono text-[10px] sm:text-xs font-semibold transition-all duration-300 ${cardStyle}`}
                  style={{ 
                    height: `${heightPercent}%`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <span className="hidden sm:inline">{val}</span>
                  <span className="sm:hidden text-[9px]">{val}</span>
                </div>
                {/* Pointer indicator labels */}
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

        {/* Targets selector */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-[10px] font-mono text-zinc-400 uppercase">Target:</span>
          {ARRAY.map((val) => (
            <button
              key={val}
              onClick={() => handleTargetChange(val)}
              className={`px-2 py-0.5 rounded text-[10px] sm:text-xs font-mono border transition-all ${
                target === val
                  ? "bg-cyan-500/20 border-cyan-500 text-cyan-300"
                  : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
              }`}
            >
              {val}
            </button>
          ))}
          <button
            onClick={() => handleTargetChange(99)} // out of bound target for test
            className={`px-2 py-0.5 rounded text-[10px] sm:text-xs font-mono border transition-all ${
              target === 99
                ? "bg-cyan-500/20 border-cyan-500 text-cyan-300"
                : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
            }`}
          >
            99 (Err)
          </button>
        </div>
      </div>

      <div>
        {/* Simulator Outputs Console */}
        <div className="bg-zinc-950/80 border border-zinc-850 rounded-lg p-3 h-28 overflow-y-auto mb-4 font-mono text-[10px] text-zinc-400 space-y-1.5 scrollbar-thin select-text">
          {logs.map((log, idx) => (
            <div key={idx} className={
              log.startsWith("[SUCCESS]") 
                ? "text-emerald-400 font-medium" 
                : log.startsWith("[FAIL]") 
                  ? "text-red-400 font-medium" 
                  : log.startsWith("Step:")
                    ? "text-zinc-200"
                    : "text-zinc-400"
            }>
              {log}
            </div>
          ))}
        </div>

        {/* Controller Actions */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={stepSearch}
            className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-mono text-xs hover:text-white transition-all"
          >
            Step
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-2 rounded-lg font-mono text-xs font-semibold transition-all ${
              isPlaying
                ? "bg-amber-600/20 border border-amber-500 text-amber-300 hover:bg-amber-600/30"
                : "bg-emerald-600/20 border border-emerald-500 text-emerald-300 hover:bg-emerald-600/30"
            }`}
          >
            {isPlaying ? "Pause" : "Run"}
          </button>
          <button
            onClick={() => resetSearch()}
            className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 font-mono text-xs hover:text-zinc-200 transition-all"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlgoVisualizer;

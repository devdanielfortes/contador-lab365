"use client";

import { useState, useCallback, useRef } from "react";
import Particles from "./Particles";
import MilestoneRing from "./MilestoneRing";
import ClickHistory from "./ClickHistory";

const MILESTONES = {
  10: { icon: "🔥", label: "10 cliques!", color: "hsl(30, 90%, 55%)" },
  25: { icon: "⚡", label: "25 cliques!", color: "hsl(48, 96%, 53%)" },
  50: { icon: "🚀", label: "50 cliques!", color: "hsl(173, 80%, 50%)" },
  100: { icon: "💎", label: "100 cliques!", color: "hsl(280, 65%, 60%)" },
  200: { icon: "👑", label: "200 cliques!", color: "hsl(340, 75%, 55%)" },
  500: { icon: "🏆", label: "500 cliques!", color: "hsl(48, 96%, 53%)" },
};

function getThemeColor(count) {
  if (count >= 500) return "hsl(48, 96%, 53%)";
  if (count >= 200) return "hsl(340, 75%, 55%)";
  if (count >= 100) return "hsl(280, 65%, 60%)";
  if (count >= 50) return "hsl(173, 80%, 50%)";
  if (count >= 25) return "hsl(48, 96%, 53%)";
  if (count >= 10) return "hsl(30, 90%, 55%)";
  return "hsl(173, 80%, 50%)";
}

function getProgressToNext(count) {
  const thresholds = [10, 25, 50, 100, 200, 500];
  for (const t of thresholds) {
    if (count < t) {
      const prev = thresholds[thresholds.indexOf(t) - 1] || 0;
      return {
        progress: ((count - prev) / (t - prev)) * 100,
        next: t,
      };
    }
  }
  return { progress: 100, next: null };
}

export default function Contador() {
  const [count, setCount] = useState(0);
  const [particleTrigger, setParticleTrigger] = useState(0);
  const [milestoneTrigger, setMilestoneTrigger] = useState(0);
  const [milestoneColor, setMilestoneColor] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [milestoneHistory, setMilestoneHistory] = useState([]);
  const [currentMilestone, setCurrentMilestone] = useState(null);
  const buttonRef = useRef(null);

  const incrementar = useCallback(() => {
    const newCount = count + 1;
    setCount(newCount);
    setParticleTrigger((p) => p + 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (MILESTONES[newCount]) {
      const m = MILESTONES[newCount];
      setMilestoneTrigger((p) => p + 1);
      setMilestoneColor(m.color);
      setCurrentMilestone(m);
      setMilestoneHistory((prev) => [
        ...prev,
        { value: newCount, icon: m.icon, color: m.color },
      ]);
      setTimeout(() => setCurrentMilestone(null), 2000);
    }
  }, [count]);

  const decrementar = useCallback(() => {
    if (count <= 0) return;
    setCount((c) => c - 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  }, [count]);

  const resetar = useCallback(() => {
    setCount(0);
    setMilestoneHistory([]);
    setCurrentMilestone(null);
  }, []);

  const themeColor = getThemeColor(count);
  const { progress, next } = getProgressToNext(count);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-12">
      {/* Title */}
      <div className="text-center">
        <h1
          className="text-balance text-4xl font-bold tracking-tight md:text-5xl"
          style={{ color: themeColor }}
        >
          Contador de Cliques
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Clique e veja a magia acontecer
        </p>
      </div>

      {/* Main counter area */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Milestone notification */}
        {currentMilestone && (
          <div
            className="animate-count-up absolute -top-16 z-10 rounded-full px-4 py-2 text-sm font-bold"
            style={{
              backgroundColor: `${currentMilestone.color}20`,
              color: currentMilestone.color,
              border: `1px solid ${currentMilestone.color}50`,
            }}
          >
            {currentMilestone.icon} {currentMilestone.label}
          </div>
        )}

        {/* Counter display */}
        <div className="relative">
          <Particles trigger={particleTrigger} />
          <MilestoneRing trigger={milestoneTrigger} color={milestoneColor} />

          <div
            className={`animate-pulse-glow flex h-44 w-44 items-center justify-center rounded-full border-2 md:h-56 md:w-56 ${isAnimating ? "animate-pop" : ""}`}
            style={{
              borderColor: `${themeColor}60`,
              backgroundColor: `${themeColor}10`,
            }}
          >
            <span
              className={`text-6xl font-black tabular-nums md:text-7xl ${isAnimating ? "animate-count-up" : ""}`}
              style={{ color: themeColor }}
              aria-live="polite"
              role="status"
            >
              {count}
            </span>
          </div>
        </div>

        {/* Progress bar to next milestone */}
        {next && (
          <div className="w-56 md:w-64">
            <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
              <span>Proximo marco</span>
              <span style={{ color: themeColor }}>{next}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${progress}%`,
                  backgroundColor: themeColor,
                }}
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={decrementar}
            disabled={count === 0}
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 text-lg font-bold transition-all hover:scale-110 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
            style={{
              borderColor: `${themeColor}40`,
              color: themeColor,
              backgroundColor: `${themeColor}10`,
            }}
            aria-label="Decrementar contador"
          >
            -
          </button>

          <button
            ref={buttonRef}
            onClick={incrementar}
            className="group relative flex h-16 items-center gap-2 rounded-full px-8 text-lg font-bold transition-all hover:scale-105 active:scale-95"
            style={{
              backgroundColor: themeColor,
              color: "hsl(220, 20%, 7%)",
              boxShadow: `0 0 30px ${themeColor}40`,
            }}
            aria-label="Incrementar contador"
          >
            <svg
              className="h-5 w-5 transition-transform group-hover:rotate-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Clique aqui
          </button>

          <button
            onClick={resetar}
            disabled={count === 0}
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-bold transition-all hover:scale-110 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
            style={{
              borderColor: "hsl(0, 72%, 51%, 0.4)",
              color: "hsl(0, 72%, 51%)",
              backgroundColor: "hsl(0, 72%, 51%, 0.1)",
            }}
            aria-label="Resetar contador"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div
          className="rounded-xl border px-5 py-3"
          style={{
            borderColor: `${themeColor}20`,
            backgroundColor: `${themeColor}08`,
          }}
        >
          <p className="text-2xl font-bold" style={{ color: themeColor }}>
            {count}
          </p>
          <p className="text-xs text-muted-foreground">Total</p>
        </div>
        <div
          className="rounded-xl border px-5 py-3"
          style={{
            borderColor: `${themeColor}20`,
            backgroundColor: `${themeColor}08`,
          }}
        >
          <p className="text-2xl font-bold" style={{ color: themeColor }}>
            {milestoneHistory.length}
          </p>
          <p className="text-xs text-muted-foreground">Marcos</p>
        </div>
        <div
          className="rounded-xl border px-5 py-3"
          style={{
            borderColor: `${themeColor}20`,
            backgroundColor: `${themeColor}08`,
          }}
        >
          <p className="text-2xl font-bold" style={{ color: themeColor }}>
            {next ? next - count : "MAX"}
          </p>
          <p className="text-xs text-muted-foreground">
            {next ? "Faltam" : "Completo"}
          </p>
        </div>
      </div>

      {/* Milestone history */}
      <ClickHistory history={milestoneHistory} />

      {/* Footer */}
      <p className="text-xs text-muted-foreground">
        Feito com React por Daniel Fortes
      </p>
    </div>
  );
}

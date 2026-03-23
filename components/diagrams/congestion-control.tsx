"use client";

import { useState, useCallback } from "react";

interface Point {
  rtt: number;
  cwnd: number;
  event: string;
}

export function CongestionControl() {
  const [ssthresh, setSsthresh] = useState(16);
  const [history, setHistory] = useState<Point[]>([
    { rtt: 0, cwnd: 1, event: "Inicio" },
  ]);
  const [phase, setPhase] = useState<"slow-start" | "congestion-avoidance">(
    "slow-start"
  );

  const currentCwnd = history[history.length - 1].cwnd;
  const currentRtt = history[history.length - 1].rtt;

  const advance = useCallback(() => {
    const newRtt = currentRtt + 1;
    let newCwnd: number;
    let newPhase = phase;

    if (phase === "slow-start") {
      newCwnd = currentCwnd * 2; // double each RTT
      if (newCwnd >= ssthresh) {
        newCwnd = ssthresh;
        newPhase = "congestion-avoidance";
      }
    } else {
      newCwnd = currentCwnd + 1; // linear increase
    }

    setHistory((prev) => [
      ...prev,
      {
        rtt: newRtt,
        cwnd: newCwnd,
        event:
          newPhase === "slow-start"
            ? "Slow Start (×2)"
            : "Congestion Avoidance (+1)",
      },
    ]);
    setPhase(newPhase);
  }, [currentCwnd, currentRtt, phase, ssthresh]);

  const triggerTimeout = useCallback(() => {
    const newSsthresh = Math.max(Math.floor(currentCwnd / 2), 1);
    setSsthresh(newSsthresh);
    setHistory((prev) => [
      ...prev,
      {
        rtt: currentRtt + 1,
        cwnd: 1,
        event: `TIMEOUT! ssthresh=${newSsthresh}, cwnd=1`,
      },
    ]);
    setPhase("slow-start");
  }, [currentCwnd, currentRtt]);

  const triggerDupAck = useCallback(() => {
    const newSsthresh = Math.max(Math.floor(currentCwnd / 2), 1);
    const newCwnd = newSsthresh;
    setSsthresh(newSsthresh);
    setHistory((prev) => [
      ...prev,
      {
        rtt: currentRtt + 1,
        cwnd: newCwnd,
        event: `3 DUP ACK! ssthresh=${newSsthresh}, cwnd=${newCwnd}`,
      },
    ]);
    setPhase("congestion-avoidance");
  }, [currentCwnd, currentRtt]);

  const reset = useCallback(() => {
    setSsthresh(16);
    setHistory([{ rtt: 0, cwnd: 1, event: "Inicio" }]);
    setPhase("slow-start");
  }, []);

  // Graph dimensions
  const graphW = 480;
  const graphH = 200;
  const padL = 50;
  const padB = 30;
  const padT = 10;
  const padR = 10;
  const plotW = graphW - padL - padR;
  const plotH = graphH - padT - padB;

  const maxRtt = Math.max(history[history.length - 1].rtt, 10);
  const maxCwnd = Math.max(...history.map((p) => p.cwnd), ssthresh + 4, 20);

  const toX = (rtt: number) => padL + (rtt / maxRtt) * plotW;
  const toY = (cwnd: number) => padT + plotH - (cwnd / maxCwnd) * plotH;

  const pathD = history
    .map((p, i) => `${i === 0 ? "M" : "L"} ${toX(p.rtt)} ${toY(p.cwnd)}`)
    .join(" ");

  return (
    <div className="space-y-4">
      <svg
        viewBox={`0 0 ${graphW} ${graphH}`}
        className="w-full max-w-2xl mx-auto bg-white rounded-xl border border-border"
      >
        {/* Axes */}
        <line x1={padL} y1={padT} x2={padL} y2={graphH - padB} stroke="#cbd5e1" strokeWidth={1} />
        <line x1={padL} y1={graphH - padB} x2={graphW - padR} y2={graphH - padB} stroke="#cbd5e1" strokeWidth={1} />

        {/* Axis labels */}
        <text x={graphW / 2} y={graphH - 5} textAnchor="middle" fill="#64748b" fontSize={10}>
          RTT (tiempo)
        </text>
        <text x={12} y={graphH / 2} textAnchor="middle" fill="#64748b" fontSize={10} transform={`rotate(-90, 12, ${graphH / 2})`}>
          cwnd (MSS)
        </text>

        {/* ssthresh line */}
        <line
          x1={padL}
          y1={toY(ssthresh)}
          x2={graphW - padR}
          y2={toY(ssthresh)}
          stroke="#f59e0b"
          strokeWidth={1.5}
          strokeDasharray="6,3"
        />
        <text x={padL + 5} y={toY(ssthresh) - 4} fill="#f59e0b" fontSize={9} fontWeight="bold">
          ssthresh = {ssthresh}
        </text>

        {/* cwnd line */}
        <path d={pathD} fill="none" stroke="#3b82f6" strokeWidth={2.5} />

        {/* Points */}
        {history.map((p, i) => (
          <circle
            key={i}
            cx={toX(p.rtt)}
            cy={toY(p.cwnd)}
            r={3}
            fill={p.event.includes("TIMEOUT") || p.event.includes("DUP") ? "#ef4444" : "#3b82f6"}
          />
        ))}

        {/* Current cwnd label */}
        <text
          x={toX(currentRtt) + 8}
          y={toY(currentCwnd) - 8}
          fill="#3b82f6"
          fontSize={9}
          fontWeight="bold"
        >
          cwnd={currentCwnd}
        </text>

        {/* Y-axis ticks */}
        {[0, Math.round(maxCwnd / 4), Math.round(maxCwnd / 2), Math.round((maxCwnd * 3) / 4), maxCwnd].map((v) => (
          <g key={v}>
            <text x={padL - 5} y={toY(v) + 3} textAnchor="end" fill="#94a3b8" fontSize={8}>
              {v}
            </text>
            <line x1={padL - 2} y1={toY(v)} x2={padL + 2} y2={toY(v)} stroke="#94a3b8" strokeWidth={1} />
          </g>
        ))}
      </svg>

      {/* Controls */}
      <div className="flex justify-center items-center gap-2 flex-wrap">
        <button
          onClick={advance}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Avanzar RTT
        </button>
        <button
          onClick={triggerTimeout}
          className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
        >
          Timeout
        </button>
        <button
          onClick={triggerDupAck}
          className="px-4 py-2 rounded-lg bg-orange-600 text-white text-sm font-medium hover:bg-orange-700 transition-colors"
        >
          3 Dup ACKs
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-slate-200 text-sm font-medium text-muted hover:bg-slate-300 transition-colors"
        >
          Reiniciar
        </button>
      </div>

      {/* Info panel */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-center">
          <p className="text-xs font-semibold text-blue-600 uppercase">Fase</p>
          <p className="text-sm font-bold text-blue-800">
            {phase === "slow-start" ? "Slow Start" : "Congestion Avoidance"}
          </p>
        </div>
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-center">
          <p className="text-xs font-semibold text-amber-600 uppercase">ssthresh</p>
          <p className="text-sm font-bold text-amber-800">{ssthresh} MSS</p>
        </div>
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-center">
          <p className="text-xs font-semibold text-emerald-600 uppercase">cwnd</p>
          <p className="text-sm font-bold text-emerald-800">{currentCwnd} MSS</p>
        </div>
      </div>

      {/* Event log */}
      <div className="rounded-lg bg-slate-50 border border-border p-3">
        <p className="text-xs font-semibold text-muted uppercase mb-1">Último evento</p>
        <p className="text-sm text-foreground">
          {history[history.length - 1].event}
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export function PacketSwitching() {
  const [mode, setMode] = useState<"packet" | "circuit">("packet");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const maxSteps = mode === "packet" ? 6 : 4;

  const reset = useCallback(() => {
    setStep(0);
    setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing) return;
    if (step >= maxSteps) {
      setPlaying(false);
      return;
    }
    const timer = setTimeout(() => setStep((s) => s + 1), 1200);
    return () => clearTimeout(timer);
  }, [playing, step, maxSteps]);

  useEffect(() => {
    reset();
  }, [mode, reset]);

  const packetDescriptions = [
    "El mensaje se divide en paquetes pequeños en el origen",
    "Paquete 1 llega al Router A y se almacena (store-and-forward)",
    "Paquete 1 se reenvía al Router B; Paquete 2 llega al Router A",
    "Paquete 1 llega al destino; Paquete 2 en Router B; Paquete 3 en Router A",
    "Los paquetes siguen avanzando por la red independientemente",
    "Todos los paquetes llegan al destino y se reensamblan",
  ];

  const circuitDescriptions = [
    "Se establece un circuito dedicado de extremo a extremo",
    "El circuito reserva recursos en cada enlace (ancho de banda fijo)",
    "Los datos fluyen continuamente por el circuito reservado",
    "Al terminar, se libera el circuito y los recursos reservados",
  ];

  return (
    <div className="space-y-4">
      {/* Mode toggle */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setMode("packet")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "packet"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-muted hover:bg-slate-200"
          }`}
        >
          Conmutación de Paquetes
        </button>
        <button
          onClick={() => setMode("circuit")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "circuit"
              ? "bg-purple-600 text-white"
              : "bg-slate-100 text-muted hover:bg-slate-200"
          }`}
        >
          Conmutación de Circuitos
        </button>
      </div>

      {/* SVG Diagram */}
      <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto">
        {/* Nodes */}
        {[
          { x: 50, y: 100, label: "Origen" },
          { x: 230, y: 70, label: "Router A" },
          { x: 370, y: 130, label: "Router B" },
          { x: 550, y: 100, label: "Destino" },
        ].map((node, i) => (
          <g key={node.label}>
            <circle
              cx={node.x}
              cy={node.y}
              r={25}
              fill={i === 0 || i === 3 ? "#3b82f6" : "#64748b"}
              opacity={0.9}
            />
            <text
              x={node.x}
              y={node.y + 4}
              textAnchor="middle"
              fill="white"
              fontSize={9}
              fontWeight="bold"
            >
              {i === 0 ? "SRC" : i === 3 ? "DST" : `R${i}`}
            </text>
            <text
              x={node.x}
              y={node.y + 42}
              textAnchor="middle"
              fill="#64748b"
              fontSize={10}
            >
              {node.label}
            </text>
          </g>
        ))}

        {/* Links */}
        <line x1={75} y1={100} x2={205} y2={70} stroke="#cbd5e1" strokeWidth={2} />
        <line x1={255} y1={70} x2={345} y2={130} stroke="#cbd5e1" strokeWidth={2} />
        <line x1={395} y1={130} x2={525} y2={100} stroke="#cbd5e1" strokeWidth={2} />

        {mode === "circuit" && step >= 1 && (
          <>
            <line x1={75} y1={100} x2={205} y2={70} stroke="#8b5cf6" strokeWidth={4} opacity={0.6} />
            <line x1={255} y1={70} x2={345} y2={130} stroke="#8b5cf6" strokeWidth={4} opacity={0.6} />
            <line x1={395} y1={130} x2={525} y2={100} stroke="#8b5cf6" strokeWidth={4} opacity={0.6} />
          </>
        )}

        {/* Packets for packet switching */}
        {mode === "packet" && (
          <>
            {/* Packet 1 */}
            {step >= 1 && step < 3 && (
              <rect
                x={step === 1 ? 218 : step === 2 ? 358 : 218}
                y={step === 1 ? 50 : step === 2 ? 110 : 50}
                width={24}
                height={16}
                rx={3}
                fill="#3b82f6"
                className="transition-all duration-700"
              />
            )}
            {step >= 3 && (
              <rect x={538} y={82} width={24} height={16} rx={3} fill="#3b82f6" />
            )}
            {/* Packet 2 */}
            {step >= 2 && step < 4 && (
              <rect
                x={step === 2 ? 218 : step === 3 ? 358 : 218}
                y={step === 2 ? 50 : step === 3 ? 110 : 50}
                width={24}
                height={16}
                rx={3}
                fill="#10b981"
                className="transition-all duration-700"
              />
            )}
            {step >= 4 && (
              <rect x={538} y={98} width={24} height={16} rx={3} fill="#10b981" />
            )}
            {/* Packet 3 */}
            {step >= 3 && step < 5 && (
              <rect
                x={step === 3 ? 218 : step === 4 ? 358 : 218}
                y={step === 3 ? 50 : step === 4 ? 110 : 50}
                width={24}
                height={16}
                rx={3}
                fill="#f59e0b"
                className="transition-all duration-700"
              />
            )}
            {step >= 5 && (
              <rect x={538} y={114} width={24} height={16} rx={3} fill="#f59e0b" />
            )}
            {/* Original packets at source */}
            {step === 0 && (
              <>
                <rect x={20} y={75} width={20} height={12} rx={2} fill="#3b82f6" />
                <rect x={42} y={75} width={20} height={12} rx={2} fill="#10b981" />
                <rect x={64} y={75} width={20} height={12} rx={2} fill="#f59e0b" />
              </>
            )}
          </>
        )}

        {/* Data flow for circuit switching */}
        {mode === "circuit" && step >= 2 && (
          <g>
            <line x1={75} y1={95} x2={525} y2={95} stroke="#8b5cf6" strokeWidth={2} strokeDasharray="6,3">
              <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
            </line>
          </g>
        )}
      </svg>

      {/* Description */}
      <div className="text-center">
        <p className="text-sm text-muted leading-relaxed min-h-[2.5rem]">
          {mode === "packet"
            ? packetDescriptions[step] || ""
            : circuitDescriptions[step] || ""}
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-3">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="px-3 py-1.5 rounded-lg bg-slate-100 text-sm text-muted hover:bg-slate-200 disabled:opacity-40 transition-colors"
        >
          Anterior
        </button>
        <button
          onClick={() => {
            if (step >= maxSteps) {
              reset();
            } else {
              setPlaying(!playing);
            }
          }}
          className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
        >
          {step >= maxSteps ? (
            <RotateCcw className="h-4 w-4" />
          ) : playing ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </button>
        <button
          onClick={() => setStep((s) => Math.min(maxSteps, s + 1))}
          disabled={step >= maxSteps}
          className="px-3 py-1.5 rounded-lg bg-slate-100 text-sm text-muted hover:bg-slate-200 disabled:opacity-40 transition-colors"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

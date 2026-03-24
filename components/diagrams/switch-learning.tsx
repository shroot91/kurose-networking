"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type LinkState = "idle" | "incoming" | "flood" | "forward";

interface MacEntry {
  mac: string;
  port: number;
  isNew: boolean;
}

interface Step {
  title: string;
  description: string;
  detail: string;
  srcPort: number; // 1-4
  dstPort: number; // 1-4 (0 = unknown)
  linkStates: [LinkState, LinkState, LinkState, LinkState]; // ports 1,2,3,4
  table: MacEntry[];
  action: "flood" | "forward";
}

// ─── Hosts config ─────────────────────────────────────────────────────────────

const HOSTS = [
  { id: "A", mac: "AA:AA", port: 1, x: 90,  y: 70  },
  { id: "B", mac: "BB:BB", port: 2, x: 510, y: 70  },
  { id: "C", mac: "CC:CC", port: 3, x: 90,  y: 280 },
  { id: "D", mac: "DD:DD", port: 4, x: 510, y: 280 },
];

// Switch center
const SW = { x: 300, y: 175, w: 100, h: 70 };

// Port connection points on switch edges
const PORT_POINTS = [
  { x: SW.x - SW.w / 2, y: SW.y - SW.h / 4 },  // port 1 (left-top  → A)
  { x: SW.x + SW.w / 2, y: SW.y - SW.h / 4 },  // port 2 (right-top → B)
  { x: SW.x - SW.w / 2, y: SW.y + SW.h / 4 },  // port 3 (left-bot  → C)
  { x: SW.x + SW.w / 2, y: SW.y + SW.h / 4 },  // port 4 (right-bot → D)
];

// ─── Steps ────────────────────────────────────────────────────────────────────

const STEPS: Step[] = [
  {
    title: "Estado inicial",
    description: "Tabla MAC vacía. El switch no sabe nada todavía.",
    detail: "Ningún host ha enviado tramas aún. El switch empieza completamente a ciegas — tabla vacía, plug-and-play.",
    srcPort: 0,
    dstPort: 0,
    linkStates: ["idle", "idle", "idle", "idle"],
    table: [],
    action: "flood",
  },
  {
    title: "Paso 1 — A envía a B",
    description: "A (AA:AA, puerto 1) → B (BB:BB). B no está en la tabla → FLOOD.",
    detail: "El switch aprende que A está en puerto 1. Como B es desconocido, inunda los puertos 2, 3 y 4. B recibirá la trama; C y D la descartarán (no son el destino).",
    srcPort: 1,
    dstPort: 2,
    linkStates: ["incoming", "flood", "flood", "flood"],
    table: [{ mac: "AA:AA", port: 1, isNew: true }],
    action: "flood",
  },
  {
    title: "Paso 2 — B responde a A",
    description: "B (BB:BB, puerto 2) → A (AA:AA). A ya está en la tabla → REENVÍO DIRECTO.",
    detail: "El switch aprende B en puerto 2. Como A ya está en la tabla (puerto 1), reenvía directamente. C y D no ven esta trama — comunicación privada.",
    srcPort: 2,
    dstPort: 1,
    linkStates: ["forward", "incoming", "idle", "idle"],
    table: [
      { mac: "AA:AA", port: 1, isNew: false },
      { mac: "BB:BB", port: 2, isNew: true },
    ],
    action: "forward",
  },
  {
    title: "Paso 3 — C envía a D",
    description: "C (CC:CC, puerto 3) → D (DD:DD). D no está en la tabla → FLOOD.",
    detail: "El switch aprende C en puerto 3. D es desconocido → inunda puertos 1, 2 y 4. Fijate: A y B siguen pudiendo comunicarse simultáneamente sin interferencia.",
    srcPort: 3,
    dstPort: 4,
    linkStates: ["flood", "flood", "incoming", "flood"],
    table: [
      { mac: "AA:AA", port: 1, isNew: false },
      { mac: "BB:BB", port: 2, isNew: false },
      { mac: "CC:CC", port: 3, isNew: true },
    ],
    action: "flood",
  },
  {
    title: "Paso 4 — D responde a C",
    description: "D (DD:DD, puerto 4) → C (CC:CC). C ya está en la tabla → REENVÍO DIRECTO.",
    detail: "El switch aprende D en puerto 4. Tabla completa. C conocido → reenvío directo a puerto 3 únicamente. A y B no ven nada.",
    srcPort: 4,
    dstPort: 3,
    linkStates: ["idle", "idle", "forward", "incoming"],
    table: [
      { mac: "AA:AA", port: 1, isNew: false },
      { mac: "BB:BB", port: 2, isNew: false },
      { mac: "CC:CC", port: 3, isNew: false },
      { mac: "DD:DD", port: 4, isNew: true },
    ],
    action: "forward",
  },
  {
    title: "Paso 5 — A envía a D (tabla completa)",
    description: "A (AA:AA, puerto 1) → D (DD:DD, puerto 4). Ambos conocidos → REENVÍO DIRECTO.",
    detail: "Tabla completamente aprendida. El switch reenvía directamente de puerto 1 a puerto 4. Sin flood. B y C están completamente aislados de esta conversación.",
    srcPort: 1,
    dstPort: 4,
    linkStates: ["incoming", "idle", "idle", "forward"],
    table: [
      { mac: "AA:AA", port: 1, isNew: false },
      { mac: "BB:BB", port: 2, isNew: false },
      { mac: "CC:CC", port: 3, isNew: false },
      { mac: "DD:DD", port: 4, isNew: false },
    ],
    action: "forward",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function linkColor(state: LinkState): string {
  switch (state) {
    case "incoming": return "#818cf8"; // indigo
    case "flood":    return "#f59e0b"; // amber
    case "forward":  return "#22c55e"; // green
    default:         return "#444c56"; // muted gray (dark-mode safe)
  }
}

function linkWidth(state: LinkState): number {
  return state === "idle" ? 1.5 : 3;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SwitchLearning() {
  const [stepIdx, setStepIdx] = useState(0);
  const step = STEPS[stepIdx];

  const prev = () => setStepIdx((i) => Math.max(0, i - 1));
  const next = () => setStepIdx((i) => Math.min(STEPS.length - 1, i + 1));
  const reset = () => setStepIdx(0);

  return (
    <div className="space-y-4">
      {/* ── SVG topology ─────────────────────────────────────────────────── */}
      <svg
        viewBox="0 0 600 360"
        className="w-full max-w-2xl mx-auto"
        aria-label="Diagrama interactivo de auto-aprendizaje del switch"
      >
        {/* Links: host ↔ switch */}
        {HOSTS.map((h, i) => {
          const pp = PORT_POINTS[i];
          const state = step.linkStates[i];
          return (
            <line
              key={h.id}
              x1={h.x} y1={h.y}
              x2={pp.x} y2={pp.y}
              stroke={linkColor(state)}
              strokeWidth={linkWidth(state)}
              strokeDasharray={state === "flood" ? "6 3" : undefined}
            />
          );
        })}

        {/* ── Switch body ───────────────────────────────────────────────── */}
        <rect
          x={SW.x - SW.w / 2}
          y={SW.y - SW.h / 2}
          width={SW.w}
          height={SW.h}
          rx={8}
          fill="#2d333b"
          stroke="#539bf5"
          strokeWidth={2}
        />
        <text x={SW.x} y={SW.y - 8} textAnchor="middle" fontSize={12} fontWeight="bold" fill="#adbac7">
          SWITCH
        </text>
        <text x={SW.x} y={SW.y + 10} textAnchor="middle" fontSize={10} fill="#768390">
          Capa 2
        </text>

        {/* Port labels on switch */}
        {PORT_POINTS.map((pp, i) => {
          const state = step.linkStates[i];
          const isRight = i % 2 === 1;
          return (
            <text
              key={i}
              x={isRight ? pp.x + 6 : pp.x - 6}
              y={pp.y + 4}
              textAnchor={isRight ? "start" : "end"}
              fontSize={9}
              fill={state === "idle" ? "#768390" : linkColor(state)}
              fontWeight={state !== "idle" ? "bold" : "normal"}
            >
              P{i + 1}
            </text>
          );
        })}

        {/* ── Hosts ─────────────────────────────────────────────────────── */}
        {HOSTS.map((h) => {
          const portIdx = h.port - 1;
          const state = step.linkStates[portIdx];
          const isActive = state !== "idle";
          const isSrc = h.port === step.srcPort;
          const isDst = h.port === step.dstPort;

          return (
            <g key={h.id}>
              {/* host circle */}
              <circle
                cx={h.x}
                cy={h.y}
                r={26}
                fill={isSrc ? "#1f3a5f" : isDst ? "#1a3a2e" : "#2d333b"}
                stroke={
                  isSrc ? "#539bf5"
                    : isDst ? "#22c55e"
                    : isActive ? linkColor(state)
                    : "#444c56"
                }
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              {/* host letter */}
              <text
                x={h.x}
                y={h.y - 2}
                textAnchor="middle"
                fontSize={16}
                fontWeight="bold"
                fill={isSrc ? "#93c5fd" : isDst ? "#86efac" : "#adbac7"}
              >
                {h.id}
              </text>
              {/* MAC */}
              <text
                x={h.x}
                y={h.y + 13}
                textAnchor="middle"
                fontSize={8}
                fill="#768390"
              >
                {h.mac}
              </text>
              {/* Port badge */}
              <text
                x={h.x}
                y={h.y + 46}
                textAnchor="middle"
                fontSize={9}
                fill="#768390"
              >
                Puerto {h.port}
              </text>
              {/* SRC / DST badge */}
              {isSrc && (
                <text x={h.x} y={h.y - 38} textAnchor="middle" fontSize={9} fill="#93c5fd" fontWeight="bold">
                  ORIGEN
                </text>
              )}
              {isDst && (
                <text x={h.x} y={h.y - 38} textAnchor="middle" fontSize={9} fill="#86efac" fontWeight="bold">
                  DESTINO
                </text>
              )}
            </g>
          );
        })}

        {/* ── Animated "packet" dot on active link ──────────────────────── */}
        {stepIdx > 0 && (() => {
          // show a dot on the incoming link (src → switch)
          const srcHost = HOSTS.find((h) => h.port === step.srcPort);
          if (!srcHost) return null;
          const pp = PORT_POINTS[step.srcPort - 1];
          const midX = (srcHost.x + pp.x) / 2;
          const midY = (srcHost.y + pp.y) / 2;
          return (
            <circle cx={midX} cy={midY} r={5} fill="#818cf8" opacity={0.9}>
              <animate attributeName="r" values="4;7;4" dur="1.2s" repeatCount="indefinite" />
            </circle>
          );
        })()}

        {/* Legend */}
        <g transform="translate(10, 320)">
          <circle cx={8} cy={8} r={5} fill="#818cf8" />
          <text x={16} y={12} fontSize={9} fill="#768390">Entrante</text>
          <line x1={60} y1={8} x2={80} y2={8} stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 2" />
          <text x={84} y={12} fontSize={9} fill="#768390">FLOOD</text>
          <line x1={130} y1={8} x2={150} y2={8} stroke="#22c55e" strokeWidth={2.5} />
          <text x={154} y={12} fontSize={9} fill="#768390">Reenvío directo</text>
          <line x1={240} y1={8} x2={260} y2={8} stroke="#444c56" strokeWidth={1.5} />
          <text x={264} y={12} fontSize={9} fill="#768390">Inactivo</text>
        </g>
      </svg>

      {/* ── MAC table ───────────────────────────────────────────────────────── */}
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">
          Tabla MAC (CAM table)
        </p>
        {step.table.length === 0 ? (
          <p className="text-sm text-muted italic text-center py-2">— Vacía —</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-mono">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-1 pr-6 text-muted font-medium">Dirección MAC</th>
                  <th className="text-left py-1 pr-6 text-muted font-medium">Puerto</th>
                  <th className="text-left py-1 text-muted font-medium">Host</th>
                </tr>
              </thead>
              <tbody>
                {step.table.map((entry) => {
                  const host = HOSTS.find((h) => h.mac === entry.mac);
                  return (
                    <tr
                      key={entry.mac}
                      className={`border-b border-border/40 transition-colors ${
                        entry.isNew
                          ? "bg-violet-500/10 text-violet-300"
                          : "text-foreground"
                      }`}
                    >
                      <td className="py-1.5 pr-6">{entry.mac}</td>
                      <td className="py-1.5 pr-6">{entry.port}</td>
                      <td className="py-1.5">
                        {host?.id}
                        {entry.isNew && (
                          <span className="ml-2 text-[10px] bg-violet-500/20 text-violet-300 px-1.5 py-0.5 rounded-full">
                            ← nuevo
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Step info ───────────────────────────────────────────────────────── */}
      <div
        className={`rounded-lg border p-4 ${
          step.action === "flood"
            ? "border-amber-500/40 bg-amber-500/5"
            : stepIdx === 0
            ? "border-border bg-card"
            : "border-green-500/40 bg-green-500/5"
        }`}
      >
        <div className="flex items-start gap-3">
          <span
            className={`mt-0.5 shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${
              stepIdx === 0
                ? "bg-border text-muted"
                : step.action === "flood"
                ? "bg-amber-500/20 text-amber-300"
                : "bg-green-500/20 text-green-300"
            }`}
          >
            {stepIdx === 0 ? "INICIO" : step.action === "flood" ? "FLOOD" : "DIRECTO"}
          </span>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">{step.description}</p>
            <p className="text-sm text-muted">{step.detail}</p>
          </div>
        </div>
      </div>

      {/* ── Controls ────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={prev}
            disabled={stepIdx === 0}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-card hover:bg-border text-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </button>
          <button
            onClick={next}
            disabled={stepIdx === STEPS.length - 1}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Step dots */}
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setStepIdx(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === stepIdx
                    ? "bg-blue-500 scale-125"
                    : i < stepIdx
                    ? "bg-blue-500/40"
                    : "bg-border"
                }`}
                aria-label={`Ir al paso ${i}`}
              />
            ))}
          </div>
          <button
            onClick={reset}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-card hover:bg-border text-muted transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Step counter */}
      <p className="text-center text-xs text-muted">
        Paso {stepIdx} de {STEPS.length - 1}
      </p>
    </div>
  );
}

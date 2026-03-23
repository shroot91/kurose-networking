"use client";

import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";

const NODES = [
  { id: "src", x: 80,  y: 175, label: "Origen",   type: "host" },
  { id: "r1",  x: 260, y: 90,  label: "Router A",  type: "router" },
  { id: "r2",  x: 440, y: 260, label: "Router B",  type: "router" },
  { id: "r3",  x: 620, y: 100, label: "Router C",  type: "router" },
  { id: "dst", x: 800, y: 200, label: "Destino",   type: "host" },
];

const LINKS = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 4 },
  { from: 3, to: 4 },
];

const PACKETS = [
  { id: 0, color: "#3b82f6", label: "P1" },
  { id: 1, color: "#10b981", label: "P2" },
  { id: 2, color: "#f59e0b", label: "P3" },
];

// Packet positions per step for packet switching: [nodeIndex, queueSlot]
// nodeIndex: which node, -1 = in transit on a link, -2 = arrived at dst
const PACKET_STEPS: Record<number, { node: number; link?: [number, number]; progress?: number }[][]> = {
  // step → [pkt0, pkt1, pkt2]
  0: [
    [{ node: 0 }],
    [{ node: 0 }],
    [{ node: 0 }],
  ],
  1: [
    [{ node: 1 }],          // P1 en R-A
    [{ node: 0 }],
    [{ node: 0 }],
  ],
  2: [
    [{ node: 3 }],          // P1 en R-C
    [{ node: 1 }],          // P2 en R-A
    [{ node: 0 }],
  ],
  3: [
    [{ node: 4 }],          // P1 en DST
    [{ node: 3 }],          // P2 en R-C
    [{ node: 1 }],          // P3 en R-A
  ],
  4: [
    [{ node: 4 }],
    [{ node: 4 }],          // P2 en DST
    [{ node: 3 }],          // P3 en R-C
  ],
  5: [
    [{ node: 4 }],
    [{ node: 4 }],
    [{ node: 4 }],          // P3 en DST ✓
  ],
};

const PACKET_DESCRIPTIONS = [
  "El mensaje original se fragmenta en 3 paquetes independientes en el nodo origen.",
  "P1 llega al Router A → se almacena en buffer (store-and-forward) y se analiza la cabecera.",
  "P1 avanza hacia Router C (ruta superior); P2 llega al Router A.",
  "P1 alcanza el destino; P2 sigue por Router C; P3 llega al Router A.",
  "P2 completa el viaje y llega al destino junto con P1.",
  "✓ Todos los paquetes llegaron. El destino reensambla el mensaje original.",
];

const CIRCUIT_STEPS = [
  "Estado inicial: no hay circuito establecido entre origen y destino.",
  "Fase de señalización: se reserva ancho de banda en cada enlace del camino.",
  "Circuito dedicado activo. Los datos fluyen continuamente sin interrupciones.",
  "Al finalizar, se libera el circuito y los recursos quedan disponibles nuevamente.",
];

function getNodePos(i: number) {
  return NODES[i];
}

function PacketCircle({ x, y, color, label, opacity = 1, size = 14 }: {
  x: number; y: number; color: string; label: string; opacity?: number; size?: number;
}) {
  return (
    <g opacity={opacity}>
      <circle cx={x} cy={y} r={size} fill={color} />
      <text x={x} y={y + 4} textAnchor="middle" fill="white" fontSize={9} fontWeight="bold">
        {label}
      </text>
    </g>
  );
}

export function PacketSwitching() {
  const [mode, setMode] = useState<"packet" | "circuit">("packet");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const maxSteps = mode === "packet" ? 5 : 3;

  const reset = useCallback(() => {
    setStep(0);
    setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing) return;
    if (step >= maxSteps) { setPlaying(false); return; }
    const t = setTimeout(() => setStep((s) => s + 1), 1400);
    return () => clearTimeout(t);
  }, [playing, step, maxSteps]);

  useEffect(() => { reset(); }, [mode, reset]);

  const packetPositions = PACKET_STEPS[step] ?? PACKET_STEPS[5];

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      {/* Header / mode toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-b border-border">
        <h3 className="font-semibold text-foreground text-sm">
          Simulador de Conmutación de Red
        </h3>
        <div className="flex rounded-lg border border-border overflow-hidden text-sm">
          <button
            onClick={() => setMode("packet")}
            className={`px-4 py-1.5 font-medium transition-colors ${
              mode === "packet"
                ? "bg-blue-600 text-white"
                : "text-muted hover:text-foreground"
            }`}
          >
            Paquetes
          </button>
          <button
            onClick={() => setMode("circuit")}
            className={`px-4 py-1.5 font-medium transition-colors ${
              mode === "circuit"
                ? "bg-purple-600 text-white"
                : "text-muted hover:text-foreground"
            }`}
          >
            Circuitos
          </button>
        </div>
      </div>

      {/* SVG Diagram */}
      <div className="p-4 bg-slate-50 dark:bg-white/[0.03] overflow-x-auto">
        <svg viewBox="0 0 900 350" className="w-full" style={{ minWidth: 560, minHeight: 200 }}>
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
            </marker>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Background grid subtle */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
          </pattern>
          <rect width="900" height="350" fill="url(#grid)" />

          {/* Links */}
          {LINKS.map(({ from, to }, i) => {
            const a = getNodePos(from);
            const b = getNodePos(to);
            const isCircuitActive = mode === "circuit" && step >= 1 &&
              ((from === 0 && to === 1) || (to === 3 || from === 3) || (to === 4 || from === 4));
            return (
              <g key={i}>
                {/* Base link */}
                <line
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke="#94a3b8"
                  strokeWidth={2}
                  opacity={0.4}
                />
                {/* Circuit highlight */}
                {isCircuitActive && mode === "circuit" && (
                  <line
                    x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                    stroke="#8b5cf6"
                    strokeWidth={5}
                    opacity={0.5}
                    strokeLinecap="round"
                  />
                )}
                {/* Link label (bandwidth) */}
                <text
                  x={(a.x + b.x) / 2 + 8}
                  y={(a.y + b.y) / 2 - 8}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize={9}
                >
                  10 Mbps
                </text>
              </g>
            );
          })}

          {/* Animated circuit data flow */}
          {mode === "circuit" && step >= 2 && (
            <>
              {/* Path: src → R1 → R3 → dst */}
              <polyline
                points={`${NODES[0].x},${NODES[0].y} ${NODES[1].x},${NODES[1].y} ${NODES[3].x},${NODES[3].y} ${NODES[4].x},${NODES[4].y}`}
                fill="none"
                stroke="#8b5cf6"
                strokeWidth={3}
                strokeDasharray="12,6"
                opacity={0.8}
              >
                <animate attributeName="stroke-dashoffset" from="60" to="0" dur="1.5s" repeatCount="indefinite" />
              </polyline>
            </>
          )}

          {/* Nodes */}
          {NODES.map((node, i) => {
            const isHost = node.type === "host";
            const r = isHost ? 28 : 22;
            const fill = isHost
              ? (i === 0 ? "#3b82f6" : "#10b981")
              : "#475569";
            const strokeColor = isHost ? "#fff" : "#94a3b8";

            return (
              <g key={node.id}>
                {/* Glow ring when active in packet mode */}
                {mode === "packet" && packetPositions.some(pos => pos[0]?.node === i) && (
                  <circle cx={node.x} cy={node.y} r={r + 8} fill={fill} opacity={0.2} />
                )}
                <circle
                  cx={node.x} cy={node.y} r={r}
                  fill={fill}
                  stroke={strokeColor}
                  strokeWidth={2}
                />
                {/* Icon text */}
                <text
                  x={node.x} y={node.y + 4}
                  textAnchor="middle"
                  fill="white"
                  fontSize={isHost ? 9 : 8}
                  fontWeight="bold"
                >
                  {node.id === "src" ? "SRC" : node.id === "dst" ? "DST" : node.id.toUpperCase()}
                </text>
                {/* Label below */}
                <text
                  x={node.x} y={node.y + r + 16}
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize={11}
                  fontWeight="500"
                >
                  {node.label}
                </text>

                {/* Queue visualization at routers */}
                {node.type === "router" && mode === "packet" && (
                  <g>
                    {packetPositions.map((pos, pi) =>
                      pos[0]?.node === i ? (
                        <rect
                          key={pi}
                          x={node.x + r + 4 + pi * 18}
                          y={node.y - 8}
                          width={14} height={16} rx={3}
                          fill={PACKETS[pi].color}
                          opacity={0.9}
                        />
                      ) : null
                    )}
                  </g>
                )}
              </g>
            );
          })}

          {/* Packet dots in transit — show at destination in a stack */}
          {mode === "packet" && (
            <>
              {packetPositions.map((pos, pi) => {
                const nodeIdx = pos[0]?.node;
                if (nodeIdx === undefined) return null;
                const node = NODES[nodeIdx];
                const isRouter = node.type === "router";
                // Don't draw dot at router (shown as queue rect above)
                if (isRouter) return null;

                // At source: spread packets left of center
                const offsetX = nodeIdx === 0 ? (pi - 1) * 22 : (pi - 1) * 18;
                const offsetY = nodeIdx === 4 ? (pi - 1) * 22 : 0;

                return (
                  <PacketCircle
                    key={pi}
                    x={node.x + offsetX}
                    y={node.y + offsetY}
                    color={PACKETS[pi].color}
                    label={PACKETS[pi].label}
                    size={step === 5 && nodeIdx === 4 ? 16 : 13}
                  />
                );
              })}
            </>
          )}

          {/* Step indicator */}
          <text x={445} y={340} textAnchor="middle" fill="#94a3b8" fontSize={11}>
            Paso {step} / {maxSteps}
          </text>

          {/* Legend */}
          <g transform="translate(20, 20)">
            {mode === "packet" ? (
              <>
                {PACKETS.map((p, i) => (
                  <g key={i} transform={`translate(${i * 70}, 0)`}>
                    <circle cx={8} cy={8} r={8} fill={p.color} />
                    <text x={20} y={12} fill="#64748b" fontSize={10}>{p.label}</text>
                  </g>
                ))}
              </>
            ) : (
              <>
                <line x1={0} y1={8} x2={20} y2={8} stroke="#8b5cf6" strokeWidth={3} strokeDasharray="6,3" />
                <text x={26} y={12} fill="#64748b" fontSize={10}>Circuito reservado</text>
              </>
            )}
          </g>
        </svg>
      </div>

      {/* Description box */}
      <div className="px-5 py-4 border-t border-border bg-blue-50 dark:bg-blue-950/20">
        <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed min-h-[2.5rem]">
          {mode === "packet"
            ? PACKET_DESCRIPTIONS[step] ?? ""
            : CIRCUIT_STEPS[step] ?? ""}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-border">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-muted hover:text-foreground disabled:opacity-30 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </button>

        <div className="flex items-center gap-2">
          {/* Step dots */}
          {Array.from({ length: maxSteps + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setPlaying(false); setStep(i); }}
              className={`h-2 rounded-full transition-all ${
                i === step ? "w-5 bg-blue-500" : "w-2 bg-border hover:bg-muted"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => {
            if (step >= maxSteps) { reset(); }
            else { setPlaying(!playing); }
          }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
        >
          {step >= maxSteps ? (
            <><RotateCcw className="h-4 w-4" /> Reiniciar</>
          ) : playing ? (
            <><Pause className="h-4 w-4" /> Pausar</>
          ) : (
            <><Play className="h-4 w-4" /> {step === 0 ? "Iniciar" : "Continuar"}</>
          )}
        </button>

        <button
          onClick={() => setStep((s) => Math.min(maxSteps, s + 1))}
          disabled={step >= maxSteps}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-muted hover:text-foreground disabled:opacity-30 transition-colors"
        >
          Siguiente
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

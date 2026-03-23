"use client";

import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";

// 3 source hosts + 3 routers + 1 destination
const NODES = [
  { id: "h1",  x: 75,  y: 190, label: "Host 1",   type: "host"   },
  { id: "h2",  x: 75,  y: 55,  label: "Host 2",   type: "host"   },
  { id: "h3",  x: 75,  y: 325, label: "Host 3",   type: "host"   },
  { id: "r1",  x: 260, y: 110, label: "Router A",  type: "router" },
  { id: "r2",  x: 450, y: 265, label: "Router B",  type: "router" },
  { id: "r3",  x: 645, y: 115, label: "Router C",  type: "router" },
  { id: "dst", x: 840, y: 200, label: "Destino",   type: "host"   },
];

const LINKS = [
  { from: 0, to: 3 }, // H1  → R1
  { from: 1, to: 3 }, // H2  → R1
  { from: 2, to: 4 }, // H3  → R2
  { from: 3, to: 4 }, // R1  → R2
  { from: 3, to: 5 }, // R1  → R3
  { from: 4, to: 6 }, // R2  → DST
  { from: 5, to: 6 }, // R3  → DST
];

const PACKETS = [
  { id: 0, color: "#3b82f6", label: "P1" },
  { id: 1, color: "#10b981", label: "P2" },
  { id: 2, color: "#f59e0b", label: "P3" },
];

// step → [pkt0, pkt1, pkt2]  node indices per packet
const PACKET_STEPS: Record<number, { node: number }[][]> = {
  0: [[{ node: 0 }], [{ node: 1 }], [{ node: 2 }]],   // packets at their hosts
  1: [[{ node: 3 }], [{ node: 3 }], [{ node: 4 }]],   // P1+P2 both at R1 (queue!), P3 at R2
  2: [[{ node: 5 }], [{ node: 3 }], [{ node: 6 }]],   // P1→R3, P2 still waiting at R1, P3 reaches DST
  3: [[{ node: 6 }], [{ node: 5 }], [{ node: 6 }]],   // P1 at DST, P2→R3, P3 at DST
  4: [[{ node: 6 }], [{ node: 6 }], [{ node: 6 }]],   // all at DST ✓
};

const PACKET_DESCRIPTIONS = [
  "Tres hosts tienen paquetes listos para enviar al mismo destino. En conmutación de paquetes no se reservan recursos: los paquetes compiten dinámicamente por los enlaces.",
  "H1 y H2 envían simultáneamente hacia Router A — P1 y P2 llegan a la vez → P2 se encola en el buffer (store-and-forward). H3 envía P3 directamente a Router B por un camino independiente.",
  "Router A reenvía P1 primero hacia Router C; P2 sigue esperando en la cola de R1. P3 completa su trayecto y alcanza el destino.",
  "P1 llega al destino. P2 es finalmente reenviado desde Router A hacia Router C. P3 ya descansa en el destino.",
  "✓ Los tres paquetes llegaron. La cola en Router A causó retardo extra a P2 — esto es multiplexación estadística en acción.",
];

const CIRCUIT_STEPS = [
  "Estado inicial: tres hosts desean comunicarse con el destino pero no hay circuitos establecidos.",
  "Fase de señalización: se reserva ancho de banda exclusivo en cada enlace para los tres circuitos (azul, verde, naranja).",
  "Tres circuitos dedicados activos. Cada flujo tiene ancho de banda garantizado — pero los recursos no utilizados permanecen ociosos.",
  "Al finalizar, los tres circuitos se liberan y el ancho de banda queda disponible para nuevas conexiones.",
];

function getNodePos(i: number) {
  return NODES[i];
}

function PacketCircle({
  x, y, color, label, size = 13,
}: {
  x: number; y: number; color: string; label: string; size?: number;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r={size} fill={color} stroke="white" strokeWidth={1.5} />
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
  const maxSteps = mode === "packet" ? 4 : 3;

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

  const packetPositions = PACKET_STEPS[step] ?? PACKET_STEPS[4];

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
        <svg viewBox="0 0 960 400" className="w-full" style={{ minWidth: 580, minHeight: 210 }}>
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
            </marker>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Background grid */}
          <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
          </pattern>
          <rect width="960" height="400" fill="url(#grid2)" />

          {/* Links */}
          {LINKS.map(({ from, to }, i) => {
            const a = getNodePos(from);
            const b = getNodePos(to);
            // Circuit 1: H1→R1→R3→DST  links: [0,3],[3,5],[5,6]
            const c1 = mode === "circuit" && step >= 1 && step < 3 &&
              ((from === 0 && to === 3) || (from === 3 && to === 5) || (from === 5 && to === 6));
            // Circuit 2: H2→R1→R2→DST  links: [1,3],[3,4],[4,6]
            const c2 = mode === "circuit" && step >= 1 && step < 3 &&
              ((from === 1 && to === 3) || (from === 3 && to === 4) || (from === 4 && to === 6));
            // Circuit 3: H3→R2→DST  links: [2,4],[4,6]
            const c3 = mode === "circuit" && step >= 1 && step < 3 &&
              ((from === 2 && to === 4));
            return (
              <g key={i}>
                <line
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke="#94a3b8" strokeWidth={2} opacity={0.4}
                />
                {c1 && (
                  <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                    stroke="#3b82f6" strokeWidth={5} opacity={0.5} strokeLinecap="round" />
                )}
                {c2 && (
                  <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                    stroke="#10b981" strokeWidth={5} opacity={0.5} strokeLinecap="round" />
                )}
                {c3 && (
                  <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                    stroke="#f59e0b" strokeWidth={5} opacity={0.5} strokeLinecap="round" />
                )}
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

          {/* Animated circuit data flows (step 2 only) */}
          {mode === "circuit" && step === 2 && (
            <>
              <polyline
                points={`${NODES[0].x},${NODES[0].y} ${NODES[3].x},${NODES[3].y} ${NODES[5].x},${NODES[5].y} ${NODES[6].x},${NODES[6].y}`}
                fill="none" stroke="#3b82f6" strokeWidth={3} strokeDasharray="12,6" opacity={0.9}
              >
                <animate attributeName="stroke-dashoffset" from="60" to="0" dur="1.5s" repeatCount="indefinite" />
              </polyline>
              <polyline
                points={`${NODES[1].x},${NODES[1].y} ${NODES[3].x},${NODES[3].y} ${NODES[4].x},${NODES[4].y} ${NODES[6].x},${NODES[6].y}`}
                fill="none" stroke="#10b981" strokeWidth={3} strokeDasharray="12,6" opacity={0.9}
              >
                <animate attributeName="stroke-dashoffset" from="60" to="0" dur="1.5s" repeatCount="indefinite" />
              </polyline>
              <polyline
                points={`${NODES[2].x},${NODES[2].y} ${NODES[4].x},${NODES[4].y} ${NODES[6].x},${NODES[6].y}`}
                fill="none" stroke="#f59e0b" strokeWidth={3} strokeDasharray="12,6" opacity={0.9}
              >
                <animate attributeName="stroke-dashoffset" from="60" to="0" dur="1.5s" repeatCount="indefinite" />
              </polyline>
            </>
          )}

          {/* Nodes */}
          {NODES.map((node, i) => {
            const isHost = node.type === "host";
            const r = isHost ? 24 : 22;
            const fill = isHost
              ? (i === 0 ? "#3b82f6" : i === 1 ? "#10b981" : i === 2 ? "#f59e0b" : "#10b981")
              : "#475569";
            const strokeColor = isHost ? "#fff" : "#94a3b8";
            const labelText = i === 0 ? "H1" : i === 1 ? "H2" : i === 2 ? "H3" : i === 6 ? "DST" : node.id.toUpperCase();

            return (
              <g key={node.id}>
                {/* Glow when a packet is at this node */}
                {mode === "packet" && packetPositions.some(pos => pos[0]?.node === i) && (
                  <circle cx={node.x} cy={node.y} r={r + 8} fill={fill} opacity={0.2} />
                )}
                <circle
                  cx={node.x} cy={node.y} r={r}
                  fill={fill} stroke={strokeColor} strokeWidth={2}
                />
                <text
                  x={node.x} y={node.y + 4}
                  textAnchor="middle" fill="white" fontSize={8} fontWeight="bold"
                >
                  {labelText}
                </text>
                <text
                  x={node.x} y={node.y + r + 15}
                  textAnchor="middle" fill="#64748b" fontSize={10} fontWeight="500"
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

          {/* Packet circles at hosts */}
          {mode === "packet" && packetPositions.map((pos, pi) => {
            const nodeIdx = pos[0]?.node;
            if (nodeIdx === undefined) return null;
            const node = NODES[nodeIdx];
            if (node.type === "router") return null;

            const isSource = nodeIdx < 3;
            // Sources: show packet beside host node; destination: stack vertically
            const offsetX = isSource ? 30 : (pi - 1) * 22;
            const offsetY = isSource ? 0 : 0;

            return (
              <PacketCircle
                key={pi}
                x={node.x + offsetX}
                y={node.y + offsetY}
                color={PACKETS[pi].color}
                label={PACKETS[pi].label}
                size={step === 4 && nodeIdx === 6 ? 15 : 12}
              />
            );
          })}

          {/* Step indicator */}
          <text x={480} y={392} textAnchor="middle" fill="#94a3b8" fontSize={11}>
            Paso {step} / {maxSteps}
          </text>

          {/* Legend */}
          <g transform="translate(20, 18)">
            {mode === "packet" ? (
              <>
                {PACKETS.map((p, i) => (
                  <g key={i} transform={`translate(${i * 68}, 0)`}>
                    <circle cx={8} cy={8} r={8} fill={p.color} />
                    <text x={20} y={12} fill="#64748b" fontSize={10}>{p.label}</text>
                  </g>
                ))}
              </>
            ) : (
              <>
                {[
                  { c: "#3b82f6", t: "Circuito H1" },
                  { c: "#10b981", t: "Circuito H2" },
                  { c: "#f59e0b", t: "Circuito H3" },
                ].map((item, i) => (
                  <g key={i} transform={`translate(${i * 105}, 0)`}>
                    <line x1={0} y1={8} x2={20} y2={8} stroke={item.c} strokeWidth={3} strokeDasharray="6,3" />
                    <text x={26} y={12} fill="#64748b" fontSize={10}>{item.t}</text>
                  </g>
                ))}
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

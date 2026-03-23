"use client";

import { useState } from "react";

const steps = [
  {
    title: "1. El host consulta al servidor DNS local",
    desc: "El navegador quiere resolver www.ejemplo.com.ar. Primero consulta al servidor DNS local (configurado por el ISP).",
    activeArrow: 0,
  },
  {
    title: "2. DNS local consulta al servidor raíz",
    desc: "El servidor DNS local no tiene la respuesta en caché. Envía consulta a un servidor raíz (hay 13 clusters de servidores raíz en el mundo).",
    activeArrow: 1,
  },
  {
    title: "3. Raíz responde con TLD .ar",
    desc: "El servidor raíz no conoce www.ejemplo.com.ar, pero sabe quién gestiona .ar. Responde con la dirección del servidor TLD de .ar.",
    activeArrow: 2,
  },
  {
    title: "4. DNS local consulta al servidor TLD .ar",
    desc: "El servidor DNS local ahora consulta al servidor TLD de .ar para encontrar el servidor autoritativo de ejemplo.com.ar.",
    activeArrow: 3,
  },
  {
    title: "5. TLD responde con servidor autoritativo",
    desc: "El servidor TLD conoce el servidor autoritativo de ejemplo.com.ar y devuelve su dirección IP.",
    activeArrow: 4,
  },
  {
    title: "6. DNS local consulta al servidor autoritativo",
    desc: "El servidor DNS local consulta directamente al servidor autoritativo de ejemplo.com.ar para obtener la IP de www.ejemplo.com.ar.",
    activeArrow: 5,
  },
  {
    title: "7. Servidor autoritativo responde con la IP",
    desc: "El servidor autoritativo tiene el registro A para www.ejemplo.com.ar → 200.42.130.100. Envía la respuesta.",
    activeArrow: 6,
  },
  {
    title: "8. DNS local devuelve la IP al host",
    desc: "El servidor DNS local almacena la respuesta en caché (con TTL) y la envía al host. El navegador puede ahora conectarse a 200.42.130.100.",
    activeArrow: 7,
  },
];

export function DnsResolution() {
  const [step, setStep] = useState(0);

  const nodes = [
    { x: 80, y: 220, label: "Host", sublabel: "Navegador", color: "#3b82f6" },
    { x: 220, y: 220, label: "DNS Local", sublabel: "ISP", color: "#8b5cf6" },
    { x: 380, y: 50, label: "Raíz", sublabel: "Root Server", color: "#ef4444" },
    { x: 380, y: 140, label: "TLD .ar", sublabel: "TLD Server", color: "#f59e0b" },
    { x: 380, y: 220, label: "Autoritativo", sublabel: "ejemplo.com.ar", color: "#10b981" },
  ];

  const arrows: [number, number, number, number, string][] = [
    [80, 210, 220, 210, "#3b82f6"],   // 0: host -> local
    [230, 210, 370, 50, "#8b5cf6"],    // 1: local -> root
    [370, 60, 230, 210, "#ef4444"],    // 2: root -> local
    [230, 210, 370, 140, "#8b5cf6"],   // 3: local -> TLD
    [370, 150, 230, 210, "#f59e0b"],   // 4: TLD -> local
    [230, 220, 370, 220, "#8b5cf6"],   // 5: local -> auth
    [370, 230, 230, 230, "#10b981"],   // 6: auth -> local
    [210, 230, 90, 230, "#8b5cf6"],    // 7: local -> host
  ];

  return (
    <div className="space-y-4">
      <svg viewBox="0 0 480 280" className="w-full max-w-lg mx-auto">
        {/* Draw all arrows dimmed */}
        {arrows.map(([x1, y1, x2, y2, color], i) => (
          <line
            key={`arrow-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={i <= steps[step].activeArrow ? color : "#e2e8f0"}
            strokeWidth={i === steps[step].activeArrow ? 3 : 1.5}
            strokeDasharray={i === steps[step].activeArrow ? "0" : "4,3"}
            className="transition-all duration-500"
            markerEnd={i <= steps[step].activeArrow ? undefined : undefined}
          />
        ))}

        {/* Step number on active arrow */}
        {step < arrows.length && (
          <circle
            cx={(arrows[steps[step].activeArrow][0] + arrows[steps[step].activeArrow][2]) / 2}
            cy={(arrows[steps[step].activeArrow][1] + arrows[steps[step].activeArrow][3]) / 2}
            r={10}
            fill={arrows[steps[step].activeArrow][4]}
          />
        )}
        {step < arrows.length && (
          <text
            x={(arrows[steps[step].activeArrow][0] + arrows[steps[step].activeArrow][2]) / 2}
            y={(arrows[steps[step].activeArrow][1] + arrows[steps[step].activeArrow][3]) / 2 + 4}
            textAnchor="middle"
            fill="white"
            fontSize={9}
            fontWeight="bold"
          >
            {step + 1}
          </text>
        )}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={i}>
            <rect
              x={node.x - 40}
              y={node.y - 20}
              width={80}
              height={40}
              rx={8}
              fill={node.color}
              opacity={0.9}
            />
            <text
              x={node.x}
              y={node.y - 2}
              textAnchor="middle"
              fill="white"
              fontSize={10}
              fontWeight="bold"
            >
              {node.label}
            </text>
            <text
              x={node.x}
              y={node.y + 12}
              textAnchor="middle"
              fill="white"
              fontSize={8}
              opacity={0.8}
            >
              {node.sublabel}
            </text>
          </g>
        ))}
      </svg>

      {/* Step info */}
      <div className="rounded-lg bg-slate-50 border border-border p-4">
        <h4 className="font-semibold text-sm text-foreground mb-1">
          {steps[step].title}
        </h4>
        <p className="text-sm text-muted leading-relaxed">{steps[step].desc}</p>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-3">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="px-3 py-1.5 rounded-lg bg-slate-100 text-sm text-muted hover:bg-slate-200 disabled:opacity-40 transition-colors"
        >
          Paso Anterior
        </button>
        <span className="text-sm text-muted font-medium">
          {step + 1} / {steps.length}
        </span>
        <button
          onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
          disabled={step >= steps.length - 1}
          className="px-3 py-1.5 rounded-lg bg-slate-100 text-sm text-muted hover:bg-slate-200 disabled:opacity-40 transition-colors"
        >
          Siguiente Paso
        </button>
      </div>
    </div>
  );
}

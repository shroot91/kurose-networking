"use client";

import { useState } from "react";

export function ClientServerDiagram() {
  const [mode, setMode] = useState<"cs" | "p2p">("cs");

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setMode("cs")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "cs"
              ? "bg-emerald-600 text-white"
              : "bg-slate-100 text-muted hover:bg-slate-200"
          }`}
        >
          Cliente-Servidor
        </button>
        <button
          onClick={() => setMode("p2p")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "p2p"
              ? "bg-orange-600 text-white"
              : "bg-slate-100 text-muted hover:bg-slate-200"
          }`}
        >
          Peer-to-Peer (P2P)
        </button>
      </div>

      <svg viewBox="0 0 500 280" className="w-full max-w-lg mx-auto">
        {mode === "cs" ? (
          <>
            {/* Server */}
            <rect x={210} y={20} width={80} height={50} rx={6} fill="#10b981" />
            <text x={250} y={42} textAnchor="middle" fill="white" fontSize={10} fontWeight="bold">
              Servidor
            </text>
            <text x={250} y={56} textAnchor="middle" fill="white" fontSize={8}>
              Siempre activo
            </text>

            {/* Clients */}
            {[
              { x: 60, y: 180 },
              { x: 180, y: 220 },
              { x: 320, y: 220 },
              { x: 440, y: 180 },
            ].map((pos, i) => (
              <g key={i}>
                <rect
                  x={pos.x - 30}
                  y={pos.y - 20}
                  width={60}
                  height={40}
                  rx={6}
                  fill="#3b82f6"
                />
                <text
                  x={pos.x}
                  y={pos.y + 4}
                  textAnchor="middle"
                  fill="white"
                  fontSize={9}
                  fontWeight="bold"
                >
                  Cliente {i + 1}
                </text>
                {/* Arrow to server */}
                <line
                  x1={pos.x}
                  y1={pos.y - 20}
                  x2={250}
                  y2={70}
                  stroke="#10b981"
                  strokeWidth={1.5}
                  strokeDasharray="4,3"
                  opacity={0.6}
                />
                <polygon
                  points={`${250 - 4},${75} ${250 + 4},${75} ${250},${70}`}
                  fill="#10b981"
                  opacity={0.6}
                />
              </g>
            ))}

            <text x={250} y={140} textAnchor="middle" fill="#64748b" fontSize={10}>
              Los clientes se comunican con el servidor,
            </text>
            <text x={250} y={155} textAnchor="middle" fill="#64748b" fontSize={10}>
              nunca directamente entre sí
            </text>
          </>
        ) : (
          <>
            {/* P2P Peers */}
            {[
              { x: 100, y: 60 },
              { x: 400, y: 60 },
              { x: 60, y: 200 },
              { x: 250, y: 240 },
              { x: 440, y: 200 },
            ].map((pos, i) => (
              <g key={i}>
                <rect
                  x={pos.x - 30}
                  y={pos.y - 20}
                  width={60}
                  height={40}
                  rx={6}
                  fill="#f59e0b"
                />
                <text
                  x={pos.x}
                  y={pos.y + 4}
                  textAnchor="middle"
                  fill="white"
                  fontSize={9}
                  fontWeight="bold"
                >
                  Peer {i + 1}
                </text>
              </g>
            ))}

            {/* Connections between peers */}
            {[
              [100, 60, 400, 60],
              [100, 60, 60, 200],
              [100, 60, 250, 240],
              [400, 60, 440, 200],
              [400, 60, 250, 240],
              [60, 200, 250, 240],
              [250, 240, 440, 200],
            ].map(([x1, y1, x2, y2], i) => (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#f59e0b"
                strokeWidth={1.5}
                strokeDasharray="4,3"
                opacity={0.4}
              />
            ))}

            <text x={250} y={150} textAnchor="middle" fill="#64748b" fontSize={10}>
              Todos los peers son clientes y servidores
            </text>
            <text x={250} y={165} textAnchor="middle" fill="#64748b" fontSize={10}>
              simultáneamente — no hay servidor central
            </text>
          </>
        )}
      </svg>

      <div className="text-center text-sm text-muted">
        {mode === "cs"
          ? "El servidor tiene IP fija y siempre está activo. Los clientes inician la comunicación."
          : "Altamente escalable: cada peer aporta capacidad. Ejemplo: BitTorrent, blockchain."}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

const TOTAL_PACKETS = 16;
const WINDOW_SIZE = 5;

type PacketState = "unsent" | "sent" | "acked" | "lost";

export function SlidingWindow() {
  const [base, setBase] = useState(0);
  const [nextSeq, setNextSeq] = useState(0);
  const [packets, setPackets] = useState<PacketState[]>(
    Array(TOTAL_PACKETS).fill("unsent")
  );
  const [log, setLog] = useState<string[]>(["Sistema listo. Haz clic en 'Enviar' para transmitir paquetes."]);

  const canSend = nextSeq < base + WINDOW_SIZE && nextSeq < TOTAL_PACKETS;

  const send = () => {
    if (!canSend) return;
    const idx = nextSeq;
    const isLost = Math.random() < 0.15; // 15% packet loss

    setPackets((prev) => {
      const next = [...prev];
      next[idx] = isLost ? "lost" : "sent";
      return next;
    });

    setLog((prev) => [
      `Paquete ${idx} enviado${isLost ? " (PERDIDO!)" : ""}`,
      ...prev.slice(0, 6),
    ]);

    if (!isLost) {
      // Simulate ACK after delay
      setTimeout(() => {
        setPackets((prev) => {
          const next = [...prev];
          if (next[idx] === "sent") next[idx] = "acked";
          return next;
        });

        // Advance base
        setBase((prevBase) => {
          let newBase = prevBase;
          // This is a simplification - advance base past consecutive acks
          setPackets((prevPkts) => {
            const nextPkts = [...prevPkts];
            if (nextPkts[idx] !== "lost") nextPkts[idx] = "acked";
            while (newBase < TOTAL_PACKETS && nextPkts[newBase] === "acked") {
              newBase++;
            }
            return nextPkts;
          });
          return newBase;
        });

        setLog((prev) => [`ACK ${idx} recibido ✓`, ...prev.slice(0, 6)]);
      }, 800);
    }

    setNextSeq(idx + 1);
  };

  const retransmit = () => {
    const lostIdx = packets.findIndex((p) => p === "lost");
    if (lostIdx === -1) return;

    setPackets((prev) => {
      const next = [...prev];
      next[lostIdx] = "sent";
      return next;
    });

    setLog((prev) => [`Retransmitiendo paquete ${lostIdx}...`, ...prev.slice(0, 6)]);

    setTimeout(() => {
      setPackets((prev) => {
        const next = [...prev];
        next[lostIdx] = "acked";
        return next;
      });

      setBase((prevBase) => {
        let newBase = prevBase;
        setPackets((prevPkts) => {
          const nextPkts = [...prevPkts];
          nextPkts[lostIdx] = "acked";
          while (newBase < TOTAL_PACKETS && nextPkts[newBase] === "acked") {
            newBase++;
          }
          return nextPkts;
        });
        return newBase;
      });

      setLog((prev) => [`ACK ${lostIdx} recibido ✓ (retransmisión)`, ...prev.slice(0, 6)]);
    }, 800);
  };

  const reset = () => {
    setBase(0);
    setNextSeq(0);
    setPackets(Array(TOTAL_PACKETS).fill("unsent"));
    setLog(["Sistema reiniciado."]);
  };

  const hasLost = packets.some((p) => p === "lost");

  const colors: Record<PacketState, string> = {
    unsent: "#e2e8f0",
    sent: "#3b82f6",
    acked: "#10b981",
    lost: "#ef4444",
  };

  return (
    <div className="space-y-4">
      {/* Packet strip */}
      <svg viewBox="0 0 560 100" className="w-full">
        {Array(TOTAL_PACKETS)
          .fill(0)
          .map((_, i) => {
            const x = i * 35 + 4;
            const inWindow = i >= base && i < base + WINDOW_SIZE;
            return (
              <g key={i}>
                <rect
                  x={x}
                  y={30}
                  width={30}
                  height={35}
                  rx={4}
                  fill={colors[packets[i]]}
                  stroke={inWindow ? "#f59e0b" : "#cbd5e1"}
                  strokeWidth={inWindow ? 2.5 : 1}
                  className="transition-all duration-300"
                />
                <text
                  x={x + 15}
                  y={52}
                  textAnchor="middle"
                  fill={packets[i] === "unsent" ? "#64748b" : "white"}
                  fontSize={11}
                  fontWeight="bold"
                >
                  {i}
                </text>
              </g>
            );
          })}

        {/* Window bracket */}
        <rect
          x={base * 35 + 2}
          y={22}
          width={Math.min(WINDOW_SIZE, TOTAL_PACKETS - base) * 35}
          height={50}
          rx={6}
          fill="none"
          stroke="#f59e0b"
          strokeWidth={2}
          strokeDasharray="6,3"
          className="transition-all duration-300"
        />
        <text
          x={base * 35 + (Math.min(WINDOW_SIZE, TOTAL_PACKETS - base) * 35) / 2 + 2}
          y={16}
          textAnchor="middle"
          fill="#f59e0b"
          fontSize={9}
          fontWeight="bold"
        >
          Ventana (tamaño={WINDOW_SIZE})
        </text>

        {/* Legend */}
        {[
          { label: "Sin enviar", color: "#e2e8f0", tx: "#64748b" },
          { label: "Enviado", color: "#3b82f6", tx: "white" },
          { label: "ACK recibido", color: "#10b981", tx: "white" },
          { label: "Perdido", color: "#ef4444", tx: "white" },
        ].map((item, i) => (
          <g key={item.label}>
            <rect x={i * 130 + 30} y={80} width={14} height={14} rx={3} fill={item.color} />
            <text x={i * 130 + 50} y={92} fill="#64748b" fontSize={9}>
              {item.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Controls */}
      <div className="flex justify-center items-center gap-3 flex-wrap">
        <button
          onClick={send}
          disabled={!canSend}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-40 transition-colors"
        >
          Enviar Paquete {nextSeq}
        </button>
        {hasLost && (
          <button
            onClick={retransmit}
            className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Retransmitir Perdido
          </button>
        )}
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-slate-200 text-sm font-medium text-muted hover:bg-slate-300 transition-colors"
        >
          Reiniciar
        </button>
      </div>

      {/* Info */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg bg-slate-50 border border-border p-3">
          <p className="text-xs font-semibold text-muted uppercase mb-1">Estado</p>
          <p className="text-sm">
            Base: <strong>{base}</strong> | Siguiente Seq: <strong>{nextSeq}</strong> |
            Ventana: [{base}, {Math.min(base + WINDOW_SIZE - 1, TOTAL_PACKETS - 1)}]
          </p>
        </div>
        <div className="rounded-lg bg-slate-50 border border-border p-3">
          <p className="text-xs font-semibold text-muted uppercase mb-1">Log</p>
          <div className="text-xs text-muted space-y-0.5 max-h-20 overflow-y-auto">
            {log.map((entry, i) => (
              <p key={i}>{entry}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

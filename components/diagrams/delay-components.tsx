"use client";

import { useState, useMemo } from "react";

export function DelayComponents() {
  const [packetSize, setPacketSize] = useState(1500); // bytes
  const [bandwidth, setBandwidth] = useState(100); // Mbps
  const [distance, setDistance] = useState(2500); // km
  const [processingDelay, setProcessingDelay] = useState(0.01); // ms

  const delays = useMemo(() => {
    const transmissionMs = (packetSize * 8) / (bandwidth * 1e6) * 1000;
    const propagationMs = (distance * 1000) / (2e8) * 1000; // 2×10^8 m/s in fiber
    const queuingMs = transmissionMs * 0.5; // simplified estimate
    const totalMs = processingDelay + queuingMs + transmissionMs + propagationMs;

    return {
      processing: processingDelay,
      queuing: queuingMs,
      transmission: transmissionMs,
      propagation: propagationMs,
      total: totalMs,
    };
  }, [packetSize, bandwidth, distance, processingDelay]);

  const maxDelay = Math.max(
    delays.processing,
    delays.queuing,
    delays.transmission,
    delays.propagation,
    0.001
  );

  const bars = [
    { label: "Procesamiento", value: delays.processing, color: "#3b82f6" },
    { label: "Cola", value: delays.queuing, color: "#8b5cf6" },
    { label: "Transmisión", value: delays.transmission, color: "#f59e0b" },
    { label: "Propagación", value: delays.propagation, color: "#10b981" },
  ];

  return (
    <div className="space-y-6">
      {/* Input controls */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold text-muted mb-1">
            Tamaño paquete
          </label>
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={packetSize}
              onChange={(e) => setPacketSize(Number(e.target.value) || 1)}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm"
              min={1}
            />
            <span className="text-xs text-muted">bytes</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted mb-1">
            Ancho de banda
          </label>
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={bandwidth}
              onChange={(e) => setBandwidth(Number(e.target.value) || 1)}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm"
              min={1}
            />
            <span className="text-xs text-muted">Mbps</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted mb-1">
            Distancia
          </label>
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value) || 1)}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm"
              min={1}
            />
            <span className="text-xs text-muted">km</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted mb-1">
            Proc. (ms)
          </label>
          <input
            type="number"
            value={processingDelay}
            onChange={(e) => setProcessingDelay(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
            min={0}
            step={0.01}
          />
        </div>
      </div>

      {/* Bar chart */}
      <div className="space-y-3">
        {bars.map((bar) => (
          <div key={bar.label} className="flex items-center gap-3">
            <span className="w-28 text-sm text-muted text-right shrink-0">
              {bar.label}
            </span>
            <div className="flex-1 bg-slate-100 rounded-full h-7 relative overflow-hidden">
              <div
                className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                style={{
                  width: `${Math.max((bar.value / maxDelay) * 100, 3)}%`,
                  backgroundColor: bar.color,
                }}
              >
                <span className="text-xs font-mono text-white font-semibold">
                  {bar.value < 0.001 ? bar.value.toExponential(2) : bar.value.toFixed(4)} ms
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-3 pt-2 border-t border-border">
          <span className="w-28 text-sm font-bold text-foreground text-right shrink-0">
            Total
          </span>
          <span className="text-lg font-bold font-mono text-primary">
            {delays.total.toFixed(4)} ms
          </span>
        </div>
      </div>

      {/* Formulas */}
      <div className="rounded-lg bg-slate-50 border border-border p-4 space-y-2">
        <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
          Fórmulas
        </p>
        <p className="text-xs font-mono text-muted">
          d<sub>trans</sub> = L / R = {packetSize * 8} bits / {bandwidth * 1e6} bps ={" "}
          {delays.transmission.toFixed(6)} ms
        </p>
        <p className="text-xs font-mono text-muted">
          d<sub>prop</sub> = d / s = {distance * 1000} m / 2×10⁸ m/s ={" "}
          {delays.propagation.toFixed(6)} ms
        </p>
        <p className="text-xs font-mono text-muted">
          d<sub>total</sub> = d<sub>proc</sub> + d<sub>cola</sub> + d<sub>trans</sub> +
          d<sub>prop</sub> = {delays.total.toFixed(6)} ms
        </p>
      </div>
    </div>
  );
}

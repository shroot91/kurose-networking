"use client";

import { useState, useEffect } from "react";
import { Play, RotateCcw } from "lucide-react";

export function TcpHandshake() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || step >= 5) {
      setPlaying(false);
      return;
    }
    const timer = setTimeout(() => setStep((s) => s + 1), 1500);
    return () => clearTimeout(timer);
  }, [playing, step]);

  const descriptions = [
    "Estado inicial: el cliente quiere establecer una conexión TCP con el servidor.",
    "SYN: El cliente envía un segmento SYN con un número de secuencia inicial aleatorio (client_isn = 100).",
    "SYN-ACK: El servidor responde con SYN-ACK, asigna su propio ISN (server_isn = 300) y confirma con ACK = client_isn + 1.",
    "ACK: El cliente confirma con ACK = server_isn + 1. La conexión está establecida (ESTABLISHED).",
    "Datos: Ambos lados pueden enviar datos. Los números de secuencia avanzan según los bytes enviados.",
    "FIN: Para cerrar, se usa un proceso de 4 pasos (FIN → ACK → FIN → ACK) o cierre simultáneo.",
  ];

  return (
    <div className="space-y-4">
      <svg viewBox="0 0 500 350" className="w-full max-w-lg mx-auto">
        {/* Client */}
        <rect x={40} y={10} width={90} height={40} rx={8} fill="#3b82f6" />
        <text x={85} y={28} textAnchor="middle" fill="white" fontSize={10} fontWeight="bold">
          Cliente
        </text>
        <text x={85} y={42} textAnchor="middle" fill="white" fontSize={8} opacity={0.8}>
          10.0.0.1:5000
        </text>

        {/* Server */}
        <rect x={370} y={10} width={90} height={40} rx={8} fill="#10b981" />
        <text x={415} y={28} textAnchor="middle" fill="white" fontSize={10} fontWeight="bold">
          Servidor
        </text>
        <text x={415} y={42} textAnchor="middle" fill="white" fontSize={8} opacity={0.8}>
          20.0.0.1:80
        </text>

        {/* Timelines */}
        <line x1={85} y1={50} x2={85} y2={340} stroke="#3b82f6" strokeWidth={2} strokeDasharray="4,3" />
        <line x1={415} y1={50} x2={415} y2={340} stroke="#10b981" strokeWidth={2} strokeDasharray="4,3" />

        {/* Step 1: SYN */}
        {step >= 1 && (
          <g className="animate-fade-in-up">
            <line x1={90} y1={90} x2={410} y2={120} stroke="#3b82f6" strokeWidth={2.5} />
            <polygon points="405,117 410,120 405,123" fill="#3b82f6" />
            <rect x={165} y={85} width={170} height={28} rx={4} fill="#3b82f622" stroke="#3b82f6" strokeWidth={1} />
            <text x={250} y={100} textAnchor="middle" fill="#3b82f6" fontSize={9} fontWeight="bold">
              SYN, Seq=100
            </text>
            <text x={250} y={110} textAnchor="middle" fill="#3b82f6" fontSize={7}>
              SYN_SENT
            </text>
          </g>
        )}

        {/* Step 2: SYN-ACK */}
        {step >= 2 && (
          <g className="animate-fade-in-up">
            <line x1={410} y1={150} x2={90} y2={180} stroke="#10b981" strokeWidth={2.5} />
            <polygon points="95,177 90,180 95,183" fill="#10b981" />
            <rect x={145} y={145} width={210} height={28} rx={4} fill="#10b98122" stroke="#10b981" strokeWidth={1} />
            <text x={250} y={160} textAnchor="middle" fill="#10b981" fontSize={9} fontWeight="bold">
              SYN-ACK, Seq=300, ACK=101
            </text>
            <text x={250} y={170} textAnchor="middle" fill="#10b981" fontSize={7}>
              SYN_RECEIVED
            </text>
          </g>
        )}

        {/* Step 3: ACK */}
        {step >= 3 && (
          <g className="animate-fade-in-up">
            <line x1={90} y1={210} x2={410} y2={230} stroke="#3b82f6" strokeWidth={2.5} />
            <polygon points="405,227 410,230 405,233" fill="#3b82f6" />
            <rect x={175} y={200} width={150} height={28} rx={4} fill="#f59e0b22" stroke="#f59e0b" strokeWidth={1} />
            <text x={250} y={215} textAnchor="middle" fill="#f59e0b" fontSize={9} fontWeight="bold">
              ACK, Seq=101, ACK=301
            </text>
            <text x={250} y={225} textAnchor="middle" fill="#f59e0b" fontSize={7}>
              ESTABLISHED
            </text>
          </g>
        )}

        {/* Step 4: Data */}
        {step >= 4 && (
          <g className="animate-fade-in-up">
            <line x1={90} y1={260} x2={410} y2={275} stroke="#8b5cf6" strokeWidth={2} />
            <polygon points="405,272 410,275 405,278" fill="#8b5cf6" />
            <text x={250} y={255} textAnchor="middle" fill="#8b5cf6" fontSize={9} fontWeight="bold">
              Datos del cliente
            </text>
            <line x1={410} y1={295} x2={90} y2={310} stroke="#8b5cf6" strokeWidth={2} />
            <polygon points="95,307 90,310 95,313" fill="#8b5cf6" />
            <text x={250} y={320} textAnchor="middle" fill="#8b5cf6" fontSize={9} fontWeight="bold">
              Respuesta del servidor
            </text>
          </g>
        )}

        {/* State labels */}
        {step >= 3 && (
          <>
            <text x={30} y={245} textAnchor="start" fill="#f59e0b" fontSize={8} fontWeight="bold">
              ESTABLISHED
            </text>
            <text x={470} y={245} textAnchor="end" fill="#f59e0b" fontSize={8} fontWeight="bold">
              ESTABLISHED
            </text>
          </>
        )}
      </svg>

      {/* Description */}
      <div className="rounded-lg bg-slate-50 border border-border p-4">
        <p className="text-sm text-muted leading-relaxed">{descriptions[step]}</p>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-3">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="px-3 py-1.5 rounded-lg bg-slate-100 text-sm text-muted hover:bg-slate-200 disabled:opacity-40"
        >
          Anterior
        </button>
        <button
          onClick={() => {
            if (step >= 5) {
              setStep(0);
              setPlaying(false);
            } else {
              setPlaying(!playing);
            }
          }}
          className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
        >
          {step >= 5 ? <RotateCcw className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <button
          onClick={() => setStep((s) => Math.min(5, s + 1))}
          disabled={step >= 5}
          className="px-3 py-1.5 rounded-lg bg-slate-100 text-sm text-muted hover:bg-slate-200 disabled:opacity-40"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

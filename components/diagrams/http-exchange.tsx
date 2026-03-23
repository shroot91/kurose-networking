"use client";

import { useState } from "react";

const httpSteps = [
  {
    title: "1. Establecimiento de conexión TCP",
    client: "SYN →",
    server: "",
    desc: "El cliente inicia una conexión TCP al servidor en el puerto 80 (HTTP) o 443 (HTTPS).",
  },
  {
    title: "2. TCP Handshake completado",
    client: "",
    server: "← SYN-ACK → ACK",
    desc: "El three-way handshake TCP se completa. Se ha establecido la conexión.",
  },
  {
    title: "3. Cliente envía HTTP Request",
    client: "GET /index.html HTTP/1.1\nHost: www.ejemplo.com\nUser-Agent: Mozilla/5.0\nAccept: text/html",
    server: "",
    desc: "El cliente envía una solicitud HTTP GET pidiendo la página principal. La solicitud incluye cabeceras (Host, User-Agent, Accept).",
  },
  {
    title: "4. Servidor procesa y responde",
    client: "",
    server: "HTTP/1.1 200 OK\nContent-Type: text/html\nContent-Length: 3456\n\n<html>...</html>",
    desc: "El servidor busca el recurso solicitado y envía una respuesta con código 200 OK, cabeceras y el cuerpo del documento HTML.",
  },
  {
    title: "5. Solicitudes de objetos embebidos",
    client: "GET /style.css HTTP/1.1\nGET /logo.png HTTP/1.1\nGET /app.js HTTP/1.1",
    server: "",
    desc: "El navegador analiza el HTML y descubre objetos embebidos (CSS, imágenes, JS). Envía solicitudes adicionales para cada uno.",
  },
];

export function HttpExchange() {
  const [step, setStep] = useState(0);

  return (
    <div className="space-y-4">
      <svg viewBox="0 0 500 320" className="w-full max-w-lg mx-auto">
        {/* Client */}
        <rect x={30} y={20} width={80} height={40} rx={8} fill="#3b82f6" />
        <text x={70} y={38} textAnchor="middle" fill="white" fontSize={10} fontWeight="bold">
          Cliente
        </text>
        <text x={70} y={50} textAnchor="middle" fill="white" fontSize={8}>
          Navegador
        </text>

        {/* Server */}
        <rect x={390} y={20} width={80} height={40} rx={8} fill="#10b981" />
        <text x={430} y={38} textAnchor="middle" fill="white" fontSize={10} fontWeight="bold">
          Servidor
        </text>
        <text x={430} y={50} textAnchor="middle" fill="white" fontSize={8}>
          Web
        </text>

        {/* Timeline lines */}
        <line x1={70} y1={60} x2={70} y2={300} stroke="#3b82f6" strokeWidth={2} strokeDasharray="4,3" />
        <line x1={430} y1={60} x2={430} y2={300} stroke="#10b981" strokeWidth={2} strokeDasharray="4,3" />

        {/* Messages based on step */}
        {step >= 0 && (
          <g className="animate-fade-in-up">
            <line x1={75} y1={90} x2={425} y2={105} stroke="#3b82f6" strokeWidth={2} />
            <polygon points="420,103 425,105 420,108" fill="#3b82f6" />
            <text x={250} y={85} textAnchor="middle" fill="#3b82f6" fontSize={9} fontWeight="bold">
              SYN
            </text>
          </g>
        )}
        {step >= 1 && (
          <g className="animate-fade-in-up">
            <line x1={425} y1={120} x2={75} y2={135} stroke="#10b981" strokeWidth={2} />
            <polygon points="80,133 75,135 80,138" fill="#10b981" />
            <text x={250} y={115} textAnchor="middle" fill="#10b981" fontSize={9} fontWeight="bold">
              SYN-ACK
            </text>
            <line x1={75} y1={140} x2={425} y2={150} stroke="#3b82f6" strokeWidth={1.5} />
            <text x={250} y={145} textAnchor="middle" fill="#64748b" fontSize={8}>
              ACK
            </text>
          </g>
        )}
        {step >= 2 && (
          <g className="animate-fade-in-up">
            <line x1={75} y1={170} x2={425} y2={185} stroke="#3b82f6" strokeWidth={2} />
            <polygon points="420,183 425,185 420,188" fill="#3b82f6" />
            <text x={250} y={165} textAnchor="middle" fill="#3b82f6" fontSize={9} fontWeight="bold">
              GET /index.html HTTP/1.1
            </text>
          </g>
        )}
        {step >= 3 && (
          <g className="animate-fade-in-up">
            <line x1={425} y1={210} x2={75} y2={235} stroke="#10b981" strokeWidth={2} />
            <polygon points="80,233 75,235 80,238" fill="#10b981" />
            <text x={250} y={205} textAnchor="middle" fill="#10b981" fontSize={9} fontWeight="bold">
              HTTP/1.1 200 OK
            </text>
            <text x={250} y={218} textAnchor="middle" fill="#64748b" fontSize={8}>
              + HTML document
            </text>
          </g>
        )}
        {step >= 4 && (
          <g className="animate-fade-in-up">
            <line x1={75} y1={255} x2={425} y2={265} stroke="#3b82f6" strokeWidth={1.5} />
            <text x={250} y={250} textAnchor="middle" fill="#3b82f6" fontSize={8}>
              GET /style.css, /logo.png, /app.js
            </text>
            <line x1={425} y1={275} x2={75} y2={290} stroke="#10b981" strokeWidth={1.5} />
            <text x={250} y={290} textAnchor="middle" fill="#10b981" fontSize={8}>
              200 OK + objetos
            </text>
          </g>
        )}
      </svg>

      {/* Step info */}
      <div className="rounded-lg bg-background border border-border p-4">
        <h4 className="font-semibold text-sm mb-1">{httpSteps[step].title}</h4>
        <p className="text-sm text-muted leading-relaxed">{httpSteps[step].desc}</p>
        {httpSteps[step].client && (
          <pre className="mt-2 text-xs bg-blue-50 border border-blue-200 rounded p-2 font-mono text-blue-800 whitespace-pre-wrap">
            {httpSteps[step].client}
          </pre>
        )}
        {httpSteps[step].server && (
          <pre className="mt-2 text-xs bg-emerald-50 border border-emerald-200 rounded p-2 font-mono text-emerald-800 whitespace-pre-wrap">
            {httpSteps[step].server}
          </pre>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-3">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="px-3 py-1.5 rounded-lg bg-card hover:bg-border text-sm text-muted disabled:opacity-40"
        >
          Anterior
        </button>
        <span className="text-sm text-muted font-medium">
          {step + 1} / {httpSteps.length}
        </span>
        <button
          onClick={() => setStep((s) => Math.min(httpSteps.length - 1, s + 1))}
          disabled={step >= httpSteps.length - 1}
          className="px-3 py-1.5 rounded-lg bg-card hover:bg-border text-sm text-muted disabled:opacity-40"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

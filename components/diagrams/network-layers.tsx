"use client";

import { useState } from "react";

const layers = [
  {
    name: "Aplicación",
    pdu: "Mensaje",
    protocols: "HTTP, SMTP, DNS, FTP",
    color: "#3b82f6",
    description:
      "Donde residen las aplicaciones de red y sus protocolos. Aquí se generan los mensajes que el usuario desea enviar.",
  },
  {
    name: "Transporte",
    pdu: "Segmento",
    protocols: "TCP, UDP",
    color: "#8b5cf6",
    description:
      "Transporta los mensajes de la capa de aplicación entre los extremos. TCP ofrece entrega confiable, UDP no.",
  },
  {
    name: "Red",
    pdu: "Datagrama",
    protocols: "IP, ICMP, OSPF",
    color: "#f59e0b",
    description:
      "Se encarga de mover los paquetes (datagramas) de un host a otro. El protocolo IP define los campos del datagrama.",
  },
  {
    name: "Enlace",
    pdu: "Trama",
    protocols: "Ethernet, WiFi, PPP",
    color: "#10b981",
    description:
      "Mueve las tramas de un nodo al siguiente nodo en la ruta. Cada enlace puede usar un protocolo diferente.",
  },
  {
    name: "Física",
    pdu: "Bits",
    protocols: "Cable, Fibra, Radio",
    color: "#ef4444",
    description:
      "Mueve los bits individuales dentro de la trama de un nodo al siguiente. Depende del medio de transmisión.",
  },
];

export function NetworkLayers() {
  const [active, setActive] = useState<number | null>(null);
  const [showEncapsulation, setShowEncapsulation] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Layer stack */}
        <div className="flex-1">
          <svg viewBox="0 0 400 320" className="w-full max-w-md mx-auto">
            {layers.map((layer, i) => {
              const y = i * 60 + 10;
              const isActive = active === i;
              return (
                <g
                  key={layer.name}
                  className="cursor-pointer"
                  onClick={() => setActive(isActive ? null : i)}
                >
                  <rect
                    x={40}
                    y={y}
                    width={320}
                    height={50}
                    rx={8}
                    fill={isActive ? layer.color : `${layer.color}22`}
                    stroke={layer.color}
                    strokeWidth={2}
                    className="transition-all duration-300"
                  />
                  <text
                    x={200}
                    y={y + 22}
                    textAnchor="middle"
                    fill={isActive ? "white" : layer.color}
                    fontSize={15}
                    fontWeight="bold"
                    className="transition-all duration-300"
                  >
                    {layer.name}
                  </text>
                  <text
                    x={200}
                    y={y + 40}
                    textAnchor="middle"
                    fill={isActive ? "white" : "#64748b"}
                    fontSize={11}
                  >
                    PDU: {layer.pdu} | {layer.protocols}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Detail panel */}
        <div className="sm:w-64 shrink-0">
          {active !== null ? (
            <div
              className="rounded-xl border-2 p-4 animate-fade-in-up"
              style={{ borderColor: layers[active].color }}
            >
              <h4
                className="font-bold text-lg mb-2"
                style={{ color: layers[active].color }}
              >
                Capa de {layers[active].name}
              </h4>
              <p className="text-sm text-muted leading-relaxed mb-3">
                {layers[active].description}
              </p>
              <div className="space-y-1">
                <p className="text-xs">
                  <span className="font-semibold">PDU:</span>{" "}
                  {layers[active].pdu}
                </p>
                <p className="text-xs">
                  <span className="font-semibold">Protocolos:</span>{" "}
                  {layers[active].protocols}
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-border p-4 text-center text-sm text-muted">
              Haz clic en una capa para ver sus detalles
            </div>
          )}
        </div>
      </div>

      {/* Encapsulation toggle */}
      <div className="text-center">
        <button
          onClick={() => setShowEncapsulation(!showEncapsulation)}
          className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          {showEncapsulation ? "Ocultar" : "Ver"} Encapsulamiento
        </button>
      </div>

      {showEncapsulation && (
        <div className="animate-fade-in-up">
          <svg viewBox="0 0 500 200" className="w-full max-w-lg mx-auto">
            {/* Application - just data */}
            <rect x={200} y={10} width={100} height={30} rx={4} fill="#3b82f6" />
            <text x={250} y={30} textAnchor="middle" fill="white" fontSize={11} fontWeight="bold">
              Datos
            </text>
            <text x={140} y={30} textAnchor="end" fill="#64748b" fontSize={10}>
              Aplicación →
            </text>

            {/* Transport - header + data */}
            <rect x={170} y={50} width={30} height={30} rx={4} fill="#8b5cf6" />
            <text x={185} y={70} textAnchor="middle" fill="white" fontSize={8} fontWeight="bold">
              Ht
            </text>
            <rect x={200} y={50} width={100} height={30} rx={4} fill="#3b82f622" stroke="#3b82f6" strokeWidth={1} />
            <text x={250} y={70} textAnchor="middle" fill="#3b82f6" fontSize={10}>
              Datos
            </text>
            <text x={140} y={70} textAnchor="end" fill="#64748b" fontSize={10}>
              Transporte →
            </text>

            {/* Network */}
            <rect x={140} y={90} width={30} height={30} rx={4} fill="#f59e0b" />
            <text x={155} y={110} textAnchor="middle" fill="white" fontSize={8} fontWeight="bold">
              Hn
            </text>
            <rect x={170} y={90} width={30} height={30} rx={4} fill="#8b5cf622" stroke="#8b5cf6" strokeWidth={1} />
            <rect x={200} y={90} width={100} height={30} rx={4} fill="#3b82f622" stroke="#3b82f6" strokeWidth={1} />
            <text x={220} y={110} textAnchor="middle" fill="#64748b" fontSize={9}>
              Segmento
            </text>
            <text x={110} y={110} textAnchor="end" fill="#64748b" fontSize={10}>
              Red →
            </text>

            {/* Link */}
            <rect x={110} y={130} width={30} height={30} rx={4} fill="#10b981" />
            <text x={125} y={150} textAnchor="middle" fill="white" fontSize={8} fontWeight="bold">
              He
            </text>
            <rect x={140} y={130} width={30} height={30} rx={4} fill="#f59e0b22" stroke="#f59e0b" strokeWidth={1} />
            <rect x={170} y={130} width={130} height={30} rx={4} fill="#8b5cf622" stroke="#8b5cf6" strokeWidth={1} />
            <text x={200} y={150} textAnchor="middle" fill="#64748b" fontSize={9}>
              Datagrama
            </text>
            <rect x={300} y={130} width={20} height={30} rx={4} fill="#10b981" />
            <text x={310} y={150} textAnchor="middle" fill="white" fontSize={7} fontWeight="bold">
              Tr
            </text>
            <text x={80} y={150} textAnchor="end" fill="#64748b" fontSize={10}>
              Enlace →
            </text>

            {/* Labels */}
            <text x={250} y={190} textAnchor="middle" fill="#64748b" fontSize={10}>
              Ht = Header Transporte | Hn = Header Red | He = Header Enlace | Tr = Trailer
            </text>
          </svg>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

const layers = [
  {
    name: "Aplicación",
    pdu: "Mensaje",
    protocols: "HTTP, HTTPS, SMTP, DNS, FTP, SSH",
    color: "#3b82f6",
    description:
      "Es la capa más cercana al usuario. Define los protocolos que utilizan las aplicaciones de red para comunicarse. Los procesos intercambian mensajes según reglas definidas por el protocolo.",
    functions: [
      "Transferencia de archivos e hipertexto (HTTP, FTP)",
      "Correo electrónico (SMTP, IMAP, POP3)",
      "Resolución de nombres de dominio (DNS)",
      "Acceso remoto seguro (SSH, Telnet)",
    ],
    examples: [
      { name: "HTTP/HTTPS", use: "Navegación web, REST APIs" },
      { name: "SMTP / IMAP", use: "Envío y recepción de email" },
      { name: "DNS", use: "Resolución nombre → IP" },
      { name: "SSH", use: "Acceso remoto seguro" },
    ],
    serviceTo: "Usuario / Proceso de aplicación",
    serviceFrom: "Capa de Transporte (TCP/UDP)",
  },
  {
    name: "Transporte",
    pdu: "Segmento (TCP) / Datagrama (UDP)",
    protocols: "TCP, UDP, QUIC",
    color: "#8b5cf6",
    description:
      "Provee comunicación lógica entre procesos en hosts distintos. TCP garantiza entrega ordenada y confiable con control de flujo y congestión. UDP ofrece entrega rápida sin garantías.",
    functions: [
      "Multiplexación/demultiplexación por puertos (0–65535)",
      "Detección de errores con checksum de 16 bits",
      "TCP: retransmisión, control de flujo (rwnd), congestión (cwnd)",
      "TCP: Three-way handshake para establecer conexión",
      "UDP: entrega sin conexión, mínima latencia",
    ],
    examples: [
      { name: "TCP", use: "HTTP, SSH, FTP — necesitan confiabilidad" },
      { name: "UDP", use: "DNS, streaming, gaming, VoIP" },
      { name: "QUIC", use: "HTTP/3 — confiabilidad sobre UDP" },
    ],
    serviceTo: "Capa de Aplicación",
    serviceFrom: "Capa de Red (IP)",
  },
  {
    name: "Red",
    pdu: "Datagrama IP",
    protocols: "IPv4, IPv6, ICMP, OSPF, BGP",
    color: "#f59e0b",
    description:
      "Mueve datagramas desde el host origen al destino atravesando múltiples redes. Define el esquema de direccionamiento global (IP) y los algoritmos de enrutamiento.",
    functions: [
      "Direccionamiento lógico: IPv4 (32 bits), IPv6 (128 bits)",
      "Enrutamiento: selección del mejor camino host-a-host",
      "Fragmentación y reensamblado de datagramas",
      "TTL (Time To Live) para evitar bucles infinitos",
      "Diagnóstico de red con ICMP (ping, traceroute)",
    ],
    examples: [
      { name: "IPv4", use: "Direccionamiento dominante hoy" },
      { name: "IPv6", use: "128 bits, sucesor de IPv4" },
      { name: "ICMP", use: "Errores y diagnóstico (ping)" },
      { name: "OSPF / BGP", use: "Enrutamiento intra/inter AS" },
    ],
    serviceTo: "Capa de Transporte",
    serviceFrom: "Capa de Enlace",
  },
  {
    name: "Enlace",
    pdu: "Trama",
    protocols: "Ethernet, Wi-Fi 802.11, PPP, ARP",
    color: "#10b981",
    description:
      "Transfiere tramas entre dos nodos directamente conectados (un salto). Gestiona el acceso al medio compartido, detecta errores con CRC y usa direcciones MAC para identificar nodos en la misma red.",
    functions: [
      "Encapsulamiento en tramas con cabecera y trailer",
      "Detección de errores con CRC / FCS",
      "Control de acceso al medio: CSMA/CD (Ethernet), CSMA/CA (WiFi)",
      "Direccionamiento físico: MAC address de 48 bits",
      "ARP: resolución de IP → MAC en la misma subred",
    ],
    examples: [
      { name: "Ethernet 802.3", use: "LAN cableada — hasta 400 Gbps" },
      { name: "Wi-Fi 802.11ax", use: "LAN inalámbrica (WiFi 6)" },
      { name: "ARP", use: "Descubrimiento de MAC a partir de IP" },
    ],
    serviceTo: "Capa de Red",
    serviceFrom: "Capa Física",
  },
  {
    name: "Física",
    pdu: "Bits",
    protocols: "Fibra óptica, UTP Cat6a, Coaxial, Radio 5G",
    color: "#ef4444",
    description:
      "Convierte bits en señales físicas (eléctricas, ópticas o electromagnéticas) para transmitirlas por el medio. Define voltajes, frecuencias, tasas de bit, conectores y la topología del canal.",
    functions: [
      "Codificación de bits en señales: NRZ, Manchester, 4B/5B",
      "Transmisión y recepción sobre el medio físico",
      "Especificación del medio y sus limitaciones",
      "Sincronización de bits entre emisor y receptor",
      "Definición de velocidades (bit rate) y latencia del canal",
    ],
    examples: [
      { name: "Fibra óptica mono", use: "Backbone, +100 km sin repetidor" },
      { name: "UTP Cat 6a", use: "Ethernet LAN 10 Gbps / 100 m" },
      { name: "Radio mmWave 5G", use: "Celular ultra-rápido corto alcance" },
    ],
    serviceTo: "Capa de Enlace",
    serviceFrom: "Medio físico",
  },
];

export function NetworkLayers() {
  const [active, setActive] = useState<number | null>(null);
  const [showEncapsulation, setShowEncapsulation] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Layer stack */}
        <div className="flex-1 min-w-0 overflow-x-auto">
          <svg viewBox="0 0 500 420" className="w-full" style={{ minWidth: 320 }}>
            <text x="250" y="18" textAnchor="middle" fill="#94a3b8" fontSize="11">
              Modelo TCP/IP de 5 capas — haz clic para detalles
            </text>
            {layers.map((layer, i) => {
              const y = i * 76 + 28;
              const isActive = active === i;
              return (
                <g key={layer.name} className="cursor-pointer" onClick={() => setActive(isActive ? null : i)}>
                  {isActive && (
                    <rect x={26} y={y + 4} width={448} height={62} rx={10} fill={layer.color} opacity={0.12} />
                  )}
                  <rect
                    x={28} y={y} width={444} height={62} rx={10}
                    fill={isActive ? layer.color : `${layer.color}15`}
                    stroke={layer.color}
                    strokeWidth={isActive ? 2.5 : 1.5}
                  />
                  {/* Number badge */}
                  <rect x={38} y={y + 16} width={30} height={30} rx={7}
                    fill={isActive ? "rgba(255,255,255,0.22)" : `${layer.color}28`} />
                  <text x={53} y={y + 36} textAnchor="middle" fill={isActive ? "white" : layer.color} fontSize={14} fontWeight="bold">
                    {5 - i}
                  </text>
                  {/* Name */}
                  <text x={80} y={y + 27} fill={isActive ? "white" : layer.color} fontSize={17} fontWeight="bold">
                    {layer.name}
                  </text>
                  {/* PDU */}
                  <text x={80} y={y + 48} fill={isActive ? "rgba(255,255,255,0.8)" : "#64748b"} fontSize={11}>
                    PDU: {layer.pdu.split("(")[0].trim()}
                  </text>
                  {/* Protocols (right side) */}
                  <text x={462} y={y + 38} textAnchor="end" fill={isActive ? "rgba(255,255,255,0.7)" : "#94a3b8"} fontSize={10}>
                    {layer.protocols.split(",").slice(0, 3).join(", ")}
                  </text>
                  {/* Down arrow between layers */}
                  {i < layers.length - 1 && (
                    <>
                      <line x1={250} y1={y + 62} x2={250} y2={y + 72} stroke="#cbd5e1" strokeWidth={1.5} />
                      <polygon points={`245,${y + 70} 255,${y + 70} 250,${y + 76}`} fill="#cbd5e1" />
                    </>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Detail panel */}
        <div className="lg:w-80 shrink-0">
          {active !== null ? (
            <div
              className="rounded-2xl border-2 overflow-hidden animate-fade-in-up"
              style={{ borderColor: layers[active].color }}
            >
              {/* Header */}
              <div className="px-5 py-4" style={{ backgroundColor: `${layers[active].color}15` }}>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full text-white inline-block mb-2"
                  style={{ backgroundColor: layers[active].color }}
                >
                  Capa {5 - active}
                </span>
                <h4 className="font-bold text-xl" style={{ color: layers[active].color }}>
                  {layers[active].name}
                </h4>
                <p className="text-xs text-muted mt-1">
                  PDU: <strong className="text-foreground">{layers[active].pdu}</strong>
                </p>
              </div>

              <div className="px-5 py-4 space-y-4 overflow-y-auto" style={{ maxHeight: 500 }}>
                <p className="text-sm text-foreground leading-relaxed">{layers[active].description}</p>

                {/* Protocols */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Protocolos</p>
                  <p className="text-sm text-foreground">{layers[active].protocols}</p>
                </div>

                {/* Functions */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted mb-2">Funciones principales</p>
                  <ul className="space-y-1.5">
                    {layers[active].functions.map((fn, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: layers[active].color }} />
                        {fn}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Examples */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted mb-2">Ejemplos reales</p>
                  <div className="space-y-1.5">
                    {layers[active].examples.map((ex, i) => (
                      <div key={i} className="rounded-lg p-2.5 text-xs"
                        style={{ backgroundColor: `${layers[active].color}10` }}>
                        <span className="font-semibold" style={{ color: layers[active].color }}>{ex.name}</span>
                        <span className="text-muted"> — {ex.use}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service model */}
                <div className="rounded-lg border border-border p-3 text-xs space-y-1.5">
                  <p>
                    <span className="font-semibold text-foreground">Sirve a: </span>
                    <span className="text-muted">{layers[active].serviceTo}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Se apoya en: </span>
                    <span className="text-muted">{layers[active].serviceFrom}</span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-border p-8 text-center h-full flex flex-col items-center justify-center gap-3">
              <div className="text-5xl opacity-20">☰</div>
              <p className="text-sm text-muted leading-relaxed">
                Selecciona una capa para ver su descripción, protocolos, funciones clave y ejemplos reales.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Encapsulation */}
      <div className="text-center">
        <button
          onClick={() => setShowEncapsulation(!showEncapsulation)}
          className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          {showEncapsulation ? "▲ Ocultar" : "▼ Ver"} Encapsulamiento
        </button>
      </div>

      {showEncapsulation && (
        <div className="animate-fade-in-up rounded-2xl border border-border bg-slate-50 dark:bg-white/[0.03] p-4 overflow-x-auto">
          <p className="text-xs text-center text-muted mb-4">
            Cada capa agrega su cabecera al bajar en el stack (encapsulamiento). La capa de enlace también agrega un trailer (CRC).
          </p>
          <svg viewBox="0 0 720 330" className="w-full" style={{ minWidth: 540 }}>
            {/* Layer labels */}
            {[
              { label: "Aplicación", y: 22,  color: "#3b82f6" },
              { label: "Transporte", y: 88,  color: "#8b5cf6" },
              { label: "Red",        y: 154, color: "#f59e0b" },
              { label: "Enlace",     y: 220, color: "#10b981" },
              { label: "Física",     y: 286, color: "#ef4444" },
            ].map(({ label, y, color }) => (
              <text key={label} x={90} y={y + 24} textAnchor="end" fill={color} fontSize={12} fontWeight="600">
                {label}
              </text>
            ))}

            {/* Row 1 — Application: just Data */}
            <rect x={100} y={22} width={160} height={40} rx={7} fill="#3b82f6" />
            <text x={180} y={47} textAnchor="middle" fill="white" fontSize={13} fontWeight="bold">Mensaje (Datos)</text>
            <text x={275} y={47} fill="#64748b" fontSize={11}>→ Mensaje</text>

            {/* Row 2 — Transport: Ht + Data */}
            <rect x={100} y={88} width={50} height={40} rx={7} fill="#8b5cf6" />
            <text x={125} y={113} textAnchor="middle" fill="white" fontSize={11} fontWeight="bold">Ht</text>
            <rect x={150} y={88} width={160} height={40} rx={7} fill="#3b82f622" stroke="#3b82f6" strokeWidth={1.5} />
            <text x={230} y={113} textAnchor="middle" fill="#3b82f6" fontSize={12}>Datos</text>
            <text x={325} y={113} fill="#64748b" fontSize={11}>→ Segmento TCP</text>

            {/* Row 3 — Network: Hn + Ht + Data */}
            <rect x={100} y={154} width={50} height={40} rx={7} fill="#f59e0b" />
            <text x={125} y={179} textAnchor="middle" fill="white" fontSize={11} fontWeight="bold">Hn</text>
            <rect x={150} y={154} width={50} height={40} rx={7} fill="#8b5cf622" stroke="#8b5cf6" strokeWidth={1.5} />
            <text x={175} y={179} textAnchor="middle" fill="#8b5cf6" fontSize={11}>Ht</text>
            <rect x={200} y={154} width={160} height={40} rx={7} fill="#3b82f622" stroke="#3b82f6" strokeWidth={1.5} />
            <text x={280} y={179} textAnchor="middle" fill="#64748b" fontSize={12}>Datos</text>
            <text x={375} y={179} fill="#64748b" fontSize={11}>→ Datagrama IP</text>

            {/* Row 4 — Link: He + Hn + Ht + Data + Tr */}
            <rect x={100} y={220} width={44} height={40} rx={7} fill="#10b981" />
            <text x={122} y={245} textAnchor="middle" fill="white" fontSize={11} fontWeight="bold">He</text>
            <rect x={144} y={220} width={44} height={40} rx={7} fill="#f59e0b22" stroke="#f59e0b" strokeWidth={1.5} />
            <text x={166} y={245} textAnchor="middle" fill="#f59e0b" fontSize={11}>Hn</text>
            <rect x={188} y={220} width={44} height={40} rx={7} fill="#8b5cf622" stroke="#8b5cf6" strokeWidth={1.5} />
            <text x={210} y={245} textAnchor="middle" fill="#8b5cf6" fontSize={11}>Ht</text>
            <rect x={232} y={220} width={140} height={40} rx={7} fill="#3b82f622" stroke="#3b82f6" strokeWidth={1.5} />
            <text x={302} y={245} textAnchor="middle" fill="#64748b" fontSize={11}>Datos</text>
            <rect x={372} y={220} width={44} height={40} rx={7} fill="#10b981" />
            <text x={394} y={245} textAnchor="middle" fill="white" fontSize={11} fontWeight="bold">Tr</text>
            <text x={430} y={245} fill="#64748b" fontSize={11}>→ Trama Ethernet</text>

            {/* Row 5 — Physical: bits */}
            <rect x={100} y={286} width={316} height={40} rx={7} fill="#ef444415" stroke="#ef4444" strokeWidth={1.5} />
            <text x={258} y={311} textAnchor="middle" fill="#ef4444" fontSize={12} fontWeight="bold">
              01101010 11001100 00111011 10100101 …
            </text>
            <text x={430} y={311} fill="#64748b" fontSize={11}>→ Bits</text>

            {/* Legend */}
            <text x={100} y={320} fill="#94a3b8" fontSize={9.5}>
              He=Header Enlace · Hn=Header Red · Ht=Header Transporte · Tr=Trailer CRC
            </text>
          </svg>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type LinkId =
  | "laptop-ap"
  | "ap-switch"
  | "switch-router"
  | "router-dns"
  | "router-google";

type LinkState = "idle" | "outgoing" | "incoming" | "flood" | "bidirectional";

interface StepData {
  title: string;
  description: string;
  detail: string;
  protocolStack: string;
  links: Partial<Record<LinkId, LinkState>>;
  activeActors: string[];
}

// ─── Steps ────────────────────────────────────────────────────────────────────

const STEPS: StepData[] = [
  {
    title: "Paso 0 — DHCP Discovery",
    description:
      "El laptop no tiene IP. Envía DHCP Discover en broadcast para encontrar un servidor DHCP.",
    detail:
      "Trama: Ethernet src=FF:FF:FF:FF:FF:FF | IP src=0.0.0.0 dst=255.255.255.255 | UDP 68→67 | DHCP Discover\nEl switch inunda todos los puertos (MAC destino = broadcast).",
    protocolStack: "App: DHCP  |  Transporte: UDP  |  Red: IP  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "laptop-ap": "outgoing",
      "ap-switch": "flood",
      "switch-router": "flood",
    },
    activeActors: ["laptop", "ap", "switch", "router"],
  },
  {
    title: "Paso 1 — DHCP Offer",
    description:
      'El router (servidor DHCP) ofrece: IP 192.168.1.100, máscara /24, gateway 192.168.1.1, DNS 8.8.8.8, TTL 24h.',
    detail:
      "DHCP Offer: IP ofrecida=192.168.1.100 | gateway=192.168.1.1 | DNS=8.8.8.8 | lease=86400s\nEtiquetado como unicast hacia la MAC del laptop (ya conocida del discover).",
    protocolStack: "App: DHCP  |  Transporte: UDP  |  Red: IP  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "switch-router": "incoming",
      "ap-switch": "incoming",
      "laptop-ap": "incoming",
    },
    activeActors: ["laptop", "ap", "switch", "router"],
  },
  {
    title: "Paso 2 — DHCP Request + ACK",
    description:
      "Laptop acepta la oferta y router confirma. Laptop ahora tiene IP, gateway y DNS configurados.",
    detail:
      "Request: broadcast (otros servidores DHCP deben saber cuál fue elegido).\nACK: unicast desde router. Laptop queda con: IP=192.168.1.100, GW=192.168.1.1, DNS=8.8.8.8",
    protocolStack: "App: DHCP  |  Transporte: UDP  |  Red: IP  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "laptop-ap": "outgoing",
      "ap-switch": "flood",
      "switch-router": "bidirectional",
    },
    activeActors: ["laptop", "ap", "switch", "router"],
  },
  {
    title: "Paso 3 — ARP para el Gateway",
    description:
      "Para enviar cualquier paquete fuera de la subred, el laptop necesita la MAC del gateway. Hace ARP broadcast.",
    detail:
      'ARP Request: "Who has 192.168.1.1? Tell 192.168.1.100"\nEthernet: src=MAC_laptop dst=FF:FF:FF:FF:FF:FF\nEl switch inunda — el router responderá.',
    protocolStack: "App: —  |  Transporte: —  |  Red: —  |  Enlace: ARP + Ethernet + WiFi 802.11",
    links: {
      "laptop-ap": "outgoing",
      "ap-switch": "flood",
      "switch-router": "flood",
    },
    activeActors: ["laptop", "ap", "switch", "router"],
  },
  {
    title: "Paso 4 — ARP Reply del Gateway",
    description:
      "El router responde con su MAC. El laptop guarda {192.168.1.1 → AA:BB:CC:DD:EE:FF} en su caché ARP.",
    detail:
      "ARP Reply: src=AA:BB:CC:DD:EE:FF (router), dst=MAC_laptop\nAhora el laptop puede construir tramas Ethernet válidas para enviar al router.",
    protocolStack: "App: —  |  Transporte: —  |  Red: —  |  Enlace: ARP + Ethernet + WiFi 802.11",
    links: {
      "switch-router": "incoming",
      "ap-switch": "incoming",
      "laptop-ap": "incoming",
    },
    activeActors: ["laptop", "ap", "switch", "router"],
  },
  {
    title: "Paso 5 — DNS Query",
    description:
      "Laptop envía: UDP query a 8.8.8.8:53 preguntando por la IP de www.google.com. El router hace NAT.",
    detail:
      "Trama: Ethernet dst=AA:BB:CC:DD:EE:FF (gateway MAC)\nIP: src=192.168.1.100 dst=8.8.8.8 | UDP 49153→53\nDNS: QTYPE=A QNAME=www.google.com\nNAT: router reemplaza src con su IP pública.",
    protocolStack: "App: DNS  |  Transporte: UDP  |  Red: IP + NAT  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "laptop-ap": "outgoing",
      "ap-switch": "outgoing",
      "switch-router": "outgoing",
      "router-dns": "outgoing",
    },
    activeActors: ["laptop", "ap", "switch", "router", "dns"],
  },
  {
    title: "Paso 6 — DNS Resolución Iterativa",
    description:
      "El servidor DNS 8.8.8.8 puede consultar de forma iterativa o recursiva. Resuelve: Root → .com TLD → google.com autoritativo.",
    detail:
      "8.8.8.8 consulta a servidores raíz → TLD .com → ns1.google.com\nRespuesta final: www.google.com → 142.250.185.46 (TTL 300s)\nTipo: A record (IPv4)",
    protocolStack: "App: DNS (iterativo)  |  Transporte: UDP  |  Red: IP  |  Enlace: varios",
    links: {
      "router-dns": "bidirectional",
    },
    activeActors: ["dns"],
  },
  {
    title: "Paso 7 — DNS Response llega al Laptop",
    description:
      "El laptop recibe la respuesta DNS. Sabe que www.google.com = 142.250.185.46. Ahora puede iniciar TCP.",
    detail:
      "DNS Response: QNAME=www.google.com ANSWER=142.250.185.46 TTL=300\nNAT reverso: router reemplaza dst con 192.168.1.100 y reenvía al laptop.\nEl laptop guarda la IP en su caché DNS.",
    protocolStack: "App: DNS  |  Transporte: UDP  |  Red: IP + NAT  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "router-dns": "incoming",
      "switch-router": "incoming",
      "ap-switch": "incoming",
      "laptop-ap": "incoming",
    },
    activeActors: ["laptop", "ap", "switch", "router", "dns"],
  },
  {
    title: "Paso 8 — TCP SYN",
    description:
      "TCP three-way handshake comienza. SYN: seq=x, src_port=49152, dst=443. El router hace NAT.",
    detail:
      "TCP SYN: seq=2847391 src=192.168.1.100:49152 dst=142.250.185.46:443\nFlags: SYN=1 ACK=0 | Window=65535 | Options: MSS=1460, SACK, Timestamps\nNAT: router registra la conexión en su tabla de traducción.",
    protocolStack: "App: (inicio HTTPS)  |  Transporte: TCP  |  Red: IP + NAT  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "laptop-ap": "outgoing",
      "ap-switch": "outgoing",
      "switch-router": "outgoing",
      "router-google": "outgoing",
    },
    activeActors: ["laptop", "ap", "switch", "router", "google"],
  },
  {
    title: "Paso 9 — TCP SYN-ACK",
    description:
      "Google responde con SYN-ACK: seq=y, ack=x+1. TCP connection half-established.",
    detail:
      "TCP SYN-ACK: seq=9182734 ack=2847392 src=142.250.185.46:443 dst=IP_pública:49152\nFlags: SYN=1 ACK=1 | Window=65535\nNAT reverso en router → llega al laptop.",
    protocolStack: "App: (inicio HTTPS)  |  Transporte: TCP  |  Red: IP + NAT  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "router-google": "incoming",
      "switch-router": "incoming",
      "ap-switch": "incoming",
      "laptop-ap": "incoming",
    },
    activeActors: ["laptop", "ap", "switch", "router", "google"],
  },
  {
    title: "Paso 10 — TCP ACK (conexión establecida)",
    description:
      "Laptop envía ACK: ack=y+1. Three-way handshake completo. Conexión TCP establecida en ambos sentidos.",
    detail:
      "TCP ACK: seq=2847392 ack=9182735\nFlags: ACK=1 | Window=65535\nEstado: ESTABLISHED en ambos extremos. El canal está listo para datos.",
    protocolStack: "Transporte: TCP (ESTABLISHED)  |  Red: IP + NAT  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "laptop-ap": "outgoing",
      "ap-switch": "outgoing",
      "switch-router": "outgoing",
      "router-google": "outgoing",
    },
    activeActors: ["laptop", "ap", "switch", "router", "google"],
  },
  {
    title: "Paso 11 — TLS ClientHello",
    description:
      "HTTPS requiere TLS. ClientHello incluye: versión TLS 1.3, cipher suites soportados, extensión SNI para indicar qué dominio se quiere.",
    detail:
      "TLS 1.3 ClientHello:\n  - Random: 32 bytes aleatorios\n  - Cipher suites: TLS_AES_256_GCM_SHA384, TLS_CHACHA20_POLY1305_SHA256\n  - Extensión SNI: www.google.com\n  - Extensión key_share: clave pública Diffie-Hellman",
    protocolStack: "App: TLS 1.3 Handshake  |  Transporte: TCP  |  Red: IP  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "laptop-ap": "outgoing",
      "ap-switch": "outgoing",
      "switch-router": "outgoing",
      "router-google": "outgoing",
    },
    activeActors: ["laptop", "ap", "switch", "router", "google"],
  },
  {
    title: "Paso 12 — TLS ServerHello + Certificado",
    description:
      "Google responde con su certificado (firmado por CA). El laptop verifica la cadena de confianza. Intercambio de claves Diffie-Hellman para forward secrecy.",
    detail:
      "TLS ServerHello + Certificate + CertificateVerify + Finished:\n  - Cipher suite elegida: TLS_AES_256_GCM_SHA384\n  - Certificado: *.google.com firmado por Google Trust Services\n  - Clave pública DH del servidor\n  - Laptop verifica firma y cadena de CA",
    protocolStack: "App: TLS 1.3 Handshake  |  Transporte: TCP  |  Red: IP  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "router-google": "incoming",
      "switch-router": "incoming",
      "ap-switch": "incoming",
      "laptop-ap": "incoming",
    },
    activeActors: ["laptop", "ap", "switch", "router", "google"],
  },
  {
    title: "Paso 13 — TLS Finished (canal cifrado)",
    description:
      "Canal TLS establecido. Todo lo siguiente va cifrado con AES-256-GCM. Ningún router intermedio puede leer el contenido.",
    detail:
      "Laptop envía Finished (cifrado con clave de sesión derivada de DH).\nClave de sesión: derivada con HKDF-SHA384 de los intercambios DH.\nDesde ahora: AES-256-GCM con claves distintas para cada dirección.\nForward secrecy: aunque se robe la clave privada del servidor, no se descifra.",
    protocolStack: "App: TLS 1.3 (ESTABLISHED)  |  Transporte: TCP  |  Red: IP  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "laptop-ap": "outgoing",
      "ap-switch": "outgoing",
      "switch-router": "outgoing",
      "router-google": "bidirectional",
    },
    activeActors: ["laptop", "ap", "switch", "router", "google"],
  },
  {
    title: "Paso 14 — HTTP GET Request",
    description:
      'Laptop envía HTTP/2 GET / a www.google.com. Todo va cifrado dentro del túnel TLS.',
    detail:
      "HTTP/2 Request (cifrado):\n  GET / HTTP/2\n  :authority: www.google.com\n  :method: GET\n  :scheme: https\n  user-agent: Mozilla/5.0\n  accept: text/html,application/xhtml+xml\n  accept-encoding: gzip, deflate, br",
    protocolStack: "App: HTTP/2 (over TLS)  |  Transporte: TCP  |  Red: IP  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "laptop-ap": "outgoing",
      "ap-switch": "outgoing",
      "switch-router": "outgoing",
      "router-google": "outgoing",
    },
    activeActors: ["laptop", "ap", "switch", "router", "google"],
  },
  {
    title: "Paso 15 — HTTP Response (HTML)",
    description:
      "HTTP 200 OK. Content-Type: text/html. Google envía el HTML en múltiples segmentos TCP con control de congestión.",
    detail:
      "HTTP/2 Response (cifrado):\n  :status: 200\n  content-type: text/html; charset=UTF-8\n  content-encoding: br (Brotli)\n  cache-control: private, max-age=0\n\nHTML enviado en múltiples DATA frames HTTP/2 → segmentos TCP → fragmentos IP",
    protocolStack: "App: HTTP/2 + TLS  |  Transporte: TCP (congestión, flujo)  |  Red: IP  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "router-google": "incoming",
      "switch-router": "incoming",
      "ap-switch": "incoming",
      "laptop-ap": "incoming",
    },
    activeActors: ["laptop", "ap", "switch", "router", "google"],
  },
  {
    title: "Paso 16 — TCP ACKs (entrega confiable)",
    description:
      "TCP garantiza entrega confiable. Cada segmento recibido es ACK'd. Si hay pérdida, retransmite. El receptor controla la ventana (flow control).",
    detail:
      "TCP cumulative ACK: ack=N confirma recepción hasta byte N-1\nVentana de recepción (rwnd) controla cuántos bytes puede enviar el emisor.\nControl de congestión: slow start → congestion avoidance → fast retransmit/recovery.\nRTT típico a Google: 10–50ms",
    protocolStack: "Transporte: TCP (ACK, flow control, congestión)  |  Red: IP  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "laptop-ap": "outgoing",
      "ap-switch": "outgoing",
      "switch-router": "outgoing",
      "router-google": "bidirectional",
    },
    activeActors: ["laptop", "ap", "switch", "router", "google"],
  },
  {
    title: "Paso 17 — DNS para recursos embebidos",
    description:
      "El browser parsea el HTML y encuentra recursos externos. Lanza nuevas consultas DNS para cada dominio. Puede abrir múltiples conexiones TCP en paralelo.",
    detail:
      "Recursos encontrados en el HTML:\n  - fonts.googleapis.com → nueva DNS query\n  - accounts.google.com → nueva DNS query\n  - www.gstatic.com → nueva DNS query\nCada dominio nuevo requiere resolución DNS antes del TCP.",
    protocolStack: "App: DNS (múltiples)  |  Transporte: UDP  |  Red: IP + NAT  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "laptop-ap": "outgoing",
      "ap-switch": "outgoing",
      "switch-router": "outgoing",
      "router-dns": "bidirectional",
    },
    activeActors: ["laptop", "ap", "switch", "router", "dns", "google"],
  },
  {
    title: "Paso 18 — Conexiones TCP paralelas (CDN)",
    description:
      "HTTP/2 multiplexa múltiples streams sobre una sola conexión TCP. El browser abre conexiones paralelas a diferentes servidores CDN.",
    detail:
      "HTTP/2 multiplexing: múltiples streams sobre 1 conexión TCP.\nConexiones paralelas a:\n  - fonts.googleapis.com:443\n  - www.gstatic.com:443\n  - ssl.gstatic.com:443\nCada una hace su propio TCP 3-way handshake + TLS handshake.",
    protocolStack: "App: HTTP/2 multiplex  |  Transporte: TCP (paralelo)  |  Red: IP  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "laptop-ap": "bidirectional",
      "ap-switch": "bidirectional",
      "switch-router": "bidirectional",
      "router-google": "bidirectional",
    },
    activeActors: ["laptop", "ap", "switch", "router", "dns", "google"],
  },
  {
    title: "Paso 19 — Pagina completamente cargada",
    description:
      "Página completamente cargada. Protocolos usados: DHCP, ARP, DNS, TCP, TLS 1.3, HTTP/2. Tiempo total típico: 500ms–2s.",
    detail:
      "Resumen de protocolos ejecutados:\n  DHCP: asignó IP, gateway, DNS\n  ARP: resolvió MAC del gateway\n  DNS: resolvió nombre → IP\n  TCP: conexiones confiables\n  TLS 1.3: cifrado end-to-end\n  HTTP/2: transferencia eficiente\n  NAT: tradujo IP privada a pública\n  WiFi 802.11: acceso inalámbrico\n  Ethernet: transporte en LAN",
    protocolStack: "Todos los protocolos activos durante la carga de la página",
    links: {
      "laptop-ap": "bidirectional",
      "ap-switch": "bidirectional",
      "switch-router": "bidirectional",
      "router-dns": "incoming",
      "router-google": "bidirectional",
    },
    activeActors: ["laptop", "ap", "switch", "router", "dns", "google"],
  },
];

// ─── Desktop layout constants (viewBox 700×380) ───────────────────────────────

const ACTORS = {
  laptop:  { x: 60,  y: 190, label: "Laptop",       sub: "192.168.1.100",  color: "#539bf5" },
  ap:      { x: 165, y: 190, label: "WiFi AP",       sub: "802.11",         color: "#57ab5a" },
  switch:  { x: 270, y: 190, label: "Switch",        sub: "Capa 2",         color: "#6cb6ff" },
  router:  { x: 375, y: 190, label: "Router/GW",     sub: "192.168.1.1",    color: "#f69d50" },
  dns:     { x: 545, y: 90,  label: "DNS",           sub: "8.8.8.8",        color: "#daaa3f" },
  google:  { x: 630, y: 190, label: "google.com",    sub: "142.250.x.x",    color: "#e05d44" },
};

const LINK_COORDS: Record<LinkId, [number, number, number, number]> = {
  "laptop-ap":      [ACTORS.laptop.x + 26, ACTORS.laptop.y, ACTORS.ap.x - 26,     ACTORS.ap.y],
  "ap-switch":      [ACTORS.ap.x + 26,     ACTORS.ap.y,     ACTORS.switch.x - 26, ACTORS.switch.y],
  "switch-router":  [ACTORS.switch.x + 26, ACTORS.switch.y, ACTORS.router.x - 26, ACTORS.router.y],
  "router-dns":     [ACTORS.router.x + 18, ACTORS.router.y - 18, ACTORS.dns.x - 18, ACTORS.dns.y + 18],
  "router-google":  [ACTORS.router.x + 26, ACTORS.router.y, ACTORS.google.x - 26, ACTORS.google.y],
};

// ─── Mobile layout constants (viewBox 360×220) ────────────────────────────────
// 2-row layout: top row = Laptop→AP→Switch→Router, bottom row = DNS + Google

const M_R = 20; // circle radius

const M_ACTORS = {
  laptop: { x: 40,  y: 70,  label: "Laptop",    sub: "192.168.1.100", color: "#539bf5" },
  ap:     { x: 118, y: 70,  label: "WiFi AP",   sub: "802.11",        color: "#57ab5a" },
  switch: { x: 196, y: 70,  label: "Switch",    sub: "Capa 2",        color: "#6cb6ff" },
  router: { x: 274, y: 70,  label: "Router",    sub: "192.168.1.1",   color: "#f69d50" },
  dns:    { x: 196, y: 168, label: "DNS",        sub: "8.8.8.8",       color: "#daaa3f" },
  google: { x: 320, y: 168, label: "Google",    sub: "142.250.x.x",   color: "#e05d44" },
};

const M_LINK_COORDS: Record<LinkId, [number, number, number, number]> = {
  "laptop-ap":     [M_ACTORS.laptop.x + M_R, M_ACTORS.laptop.y, M_ACTORS.ap.x - M_R,     M_ACTORS.ap.y],
  "ap-switch":     [M_ACTORS.ap.x + M_R,     M_ACTORS.ap.y,     M_ACTORS.switch.x - M_R, M_ACTORS.switch.y],
  "switch-router": [M_ACTORS.switch.x + M_R, M_ACTORS.switch.y, M_ACTORS.router.x - M_R, M_ACTORS.router.y],
  "router-dns":    [M_ACTORS.router.x - 10,  M_ACTORS.router.y + M_R, M_ACTORS.dns.x + 14, M_ACTORS.dns.y - M_R],
  "router-google": [M_ACTORS.router.x + 14,  M_ACTORS.router.y + M_R, M_ACTORS.google.x - 4, M_ACTORS.google.y - M_R],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function linkStroke(state: LinkState | undefined): string {
  switch (state) {
    case "outgoing":      return "#818cf8"; // indigo
    case "incoming":      return "#22c55e"; // green
    case "flood":         return "#f59e0b"; // amber
    case "bidirectional": return "#a78bfa"; // violet
    default:              return "#444c56"; // muted gray
  }
}

function linkWidth(state: LinkState | undefined): number {
  return state && state !== "idle" ? 3 : 1.5;
}

function linkDash(state: LinkState | undefined): string | undefined {
  if (state === "flood") return "7 3";
  if (state === "bidirectional") return "4 2";
  return undefined;
}

function actorActive(actorId: string, step: StepData): boolean {
  return step.activeActors.includes(actorId);
}

// ─── Actor SVG element ────────────────────────────────────────────────────────

interface ActorProps {
  id: string;
  x: number;
  y: number;
  r?: number;
  label: string;
  sub: string;
  color: string;
  active: boolean;
  fontSize?: number;
}

function Actor({ x, y, r = 24, label, sub, color, active, fontSize = 9 }: ActorProps) {
  const fill = active ? color : "#2d333b";
  const stroke = active ? color : "#444c56";
  const textColor = active ? "#e6edf3" : "#768390";
  const subColor = active ? "#adbac7" : "#545d68";

  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={fill + "22"} stroke={stroke} strokeWidth={active ? 2.5 : 1.5} />
      <text x={x} y={y + 4} textAnchor="middle" fontSize={fontSize} fontWeight="bold" fill={textColor}>
        {label.length > 8 ? label.slice(0, 8) : label}
      </text>
      {label.length > 8 && (
        <text x={x} y={y + 4 + fontSize} textAnchor="middle" fontSize={fontSize - 1} fill={textColor}>
          {label.slice(8)}
        </text>
      )}
      <text x={x} y={y + r + 14} textAnchor="middle" fontSize={fontSize - 1.5} fill={subColor}>
        {sub}
      </text>
    </g>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function WebRequestJourney() {
  const [stepIdx, setStepIdx] = useState(0);
  const step = STEPS[stepIdx];

  const prev = () => setStepIdx((i) => Math.max(0, i - 1));
  const next = () => setStepIdx((i) => Math.min(STEPS.length - 1, i + 1));
  const reset = () => setStepIdx(0);

  const totalSteps = STEPS.length; // 20

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-6">
      {/* ── Mobile SVG (compact 2-row layout) ──────────────────────────────── */}
      <svg
        viewBox="0 0 360 220"
        className="w-full sm:hidden"
        aria-label="Diagrama móvil: solicitud web"
      >
        {/* Internet bubble (bottom row area) */}
        <rect x={166} y={138} width={180} height={60} rx={10}
          fill="none" stroke="#444c56" strokeWidth={1} strokeDasharray="6 3" />
        <text x={256} y={133} textAnchor="middle" fontSize={9} fill="#768390" fontStyle="italic">Internet</text>

        {/* Mobile links */}
        {(Object.keys(M_LINK_COORDS) as LinkId[]).map((id) => {
          const [x1, y1, x2, y2] = M_LINK_COORDS[id];
          const state = step.links[id];
          return (
            <line key={id} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={linkStroke(state)} strokeWidth={linkWidth(state)}
              strokeDasharray={linkDash(state)} />
          );
        })}

        {/* Mid-point dots on active mobile links */}
        {(Object.keys(M_LINK_COORDS) as LinkId[]).map((id) => {
          const [x1, y1, x2, y2] = M_LINK_COORDS[id];
          const state = step.links[id];
          if (!state || state === "idle") return null;
          return <circle key={id + "-dot"} cx={(x1 + x2) / 2} cy={(y1 + y2) / 2}
            r={3.5} fill={linkStroke(state)} opacity={0.9} />;
        })}

        {/* Mobile actors */}
        {(Object.keys(M_ACTORS) as (keyof typeof M_ACTORS)[]).map((id) => {
          const a = M_ACTORS[id];
          return <Actor key={id} id={id} x={a.x} y={a.y} r={M_R}
            label={a.label} sub={a.sub} color={a.color}
            active={actorActive(id, step)} fontSize={9} />;
        })}

        {/* Mobile legend (compact) */}
        <g transform="translate(4, 200)">
          <line x1={0} y1={6} x2={16} y2={6} stroke="#818cf8" strokeWidth={2} />
          <text x={19} y={10} fontSize={8} fill="#768390">Envío</text>
          <line x1={52} y1={6} x2={68} y2={6} stroke="#22c55e" strokeWidth={2} />
          <text x={71} y={10} fontSize={8} fill="#768390">Respuesta</text>
          <line x1={120} y1={6} x2={136} y2={6} stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="4 2" />
          <text x={139} y={10} fontSize={8} fill="#768390">Broadcast</text>
          <line x1={195} y1={6} x2={211} y2={6} stroke="#a78bfa" strokeWidth={2} strokeDasharray="3 2" />
          <text x={214} y={10} fontSize={8} fill="#768390">Bidireccional</text>
        </g>
      </svg>

      {/* ── Desktop SVG Topology (horizontal) ───────────────────────────────── */}
      <svg
        viewBox="0 0 700 380"
        className="w-full max-w-4xl mx-auto hidden sm:block"
        aria-label="Diagrama interactivo: Un día en la vida de una solicitud web"
      >
        {/* Internet cloud region */}
        <rect
          x={398}
          y={150}
          width={218}
          height={90}
          rx={14}
          fill="none"
          stroke="#444c56"
          strokeWidth={1.5}
          strokeDasharray="8 4"
        />
        <text x={507} y={143} textAnchor="middle" fontSize={10} fill="#768390" fontStyle="italic">
          Internet
        </text>

        {/* ── Link segments ──────────────────────────────────────────────────── */}
        {(Object.keys(LINK_COORDS) as LinkId[]).map((id) => {
          const [x1, y1, x2, y2] = LINK_COORDS[id];
          const state = step.links[id];
          return (
            <line
              key={id}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={linkStroke(state)}
              strokeWidth={linkWidth(state)}
              strokeDasharray={linkDash(state)}
            />
          );
        })}

        {/* ── Direction arrows on active links ──────────────────────────────── */}
        {(Object.keys(LINK_COORDS) as LinkId[]).map((id) => {
          const [x1, y1, x2, y2] = LINK_COORDS[id];
          const state = step.links[id];
          if (!state || state === "idle") return null;
          const mx = (x1 + x2) / 2;
          const my = (y1 + y2) / 2;
          const col = linkStroke(state);
          return (
            <circle key={id + "-dot"} cx={mx} cy={my} r={4} fill={col} opacity={0.85} />
          );
        })}

        {/* ── Actors ─────────────────────────────────────────────────────────── */}
        {(Object.keys(ACTORS) as (keyof typeof ACTORS)[]).map((id) => {
          const a = ACTORS[id];
          return (
            <Actor
              key={id}
              id={id}
              x={a.x}
              y={a.y}
              label={a.label}
              sub={a.sub}
              color={a.color}
              active={actorActive(id, step)}
            />
          );
        })}

        {/* ── Actor labels (shown above circle) ─────────────────────────────── */}
        {(Object.keys(ACTORS) as (keyof typeof ACTORS)[]).map((id) => {
          const a = ACTORS[id];
          const isActive = actorActive(id, step);
          return (
            <text
              key={id + "-lbl"}
              x={a.x}
              y={a.y - 30}
              textAnchor="middle"
              fontSize={10}
              fontWeight="bold"
              fill={isActive ? a.color : "#545d68"}
            >
              {a.label}
            </text>
          );
        })}

        {/* ── Legend ─────────────────────────────────────────────────────────── */}
        <g transform="translate(10, 330)">
          <text x={0} y={0} fontSize={9} fill="#768390" fontWeight="bold">Leyenda:</text>
          <line x1={0} y1={12} x2={22} y2={12} stroke="#818cf8" strokeWidth={2.5} />
          <text x={26} y={16} fontSize={9} fill="#adbac7">Envío</text>
          <line x1={75} y1={12} x2={97} y2={12} stroke="#22c55e" strokeWidth={2.5} />
          <text x={101} y={16} fontSize={9} fill="#adbac7">Respuesta</text>
          <line x1={175} y1={12} x2={197} y2={12} stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 3" />
          <text x={201} y={16} fontSize={9} fill="#adbac7">Flood/Broadcast</text>
          <line x1={300} y1={12} x2={322} y2={12} stroke="#a78bfa" strokeWidth={2.5} strokeDasharray="4 2" />
          <text x={326} y={16} fontSize={9} fill="#adbac7">Bidireccional</text>
        </g>
      </svg>

      {/* ── Step title ───────────────────────────────────────────────────────── */}
      <div className="text-center">
        <span className="text-xs font-semibold text-muted uppercase tracking-wider">
          Paso {stepIdx} de {totalSteps - 1}
        </span>
        <h3 className="text-base font-bold text-foreground mt-0.5">{step.title}</h3>
      </div>

      {/* ── Info panel ───────────────────────────────────────────────────────── */}
      <div className="rounded-lg border border-border bg-background p-4 space-y-3">
        {/* Protocol stack */}
        <div className="font-mono text-xs bg-white/60 dark:bg-white/[0.07] rounded p-3 text-foreground">
          <span className="text-muted font-sans font-semibold text-[11px] uppercase tracking-wider block mb-1">
            Stack de Protocolos Activo
          </span>
          {step.protocolStack}
        </div>

        {/* Description */}
        <p className="text-sm text-foreground leading-relaxed">{step.description}</p>

        {/* Packet detail */}
        <pre className="font-mono text-xs space-y-1 bg-white/60 dark:bg-white/[0.07] rounded p-3 text-muted whitespace-pre-wrap leading-relaxed">
          {step.detail}
        </pre>
      </div>

      {/* ── Controls ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={prev}
          disabled={stepIdx === 0}
          className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-border transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </button>

        {/* Step dots */}
        <div className="flex flex-wrap justify-center gap-1.5 flex-1">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStepIdx(i)}
              aria-label={`Ir al paso ${i}`}
              className="rounded-full transition-all"
              style={{
                width: i === stepIdx ? 20 : 8,
                height: 8,
                background: i === stepIdx ? "#818cf8" : i < stepIdx ? "#57ab5a" : "#444c56",
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={stepIdx === STEPS.length - 1}
          className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-border transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Siguiente
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Reset */}
      <div className="flex justify-center">
        <button
          onClick={reset}
          className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reiniciar desde el paso 0
        </button>
      </div>
    </div>
  );
}

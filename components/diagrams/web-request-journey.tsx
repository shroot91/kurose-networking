"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  SkipForward,
  Eye,
} from "lucide-react";

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
    title: "DHCP Discovery",
    description:
      "El laptop no tiene IP. Envía DHCP Discover en broadcast para encontrar un servidor DHCP.",
    detail:
      "Trama: Ethernet src=FF:FF:FF:FF:FF:FF | IP src=0.0.0.0 dst=255.255.255.255 | UDP 68→67 | DHCP Discover\nEl switch inunda todos los puertos (MAC destino = broadcast).",
    protocolStack:
      "App: DHCP  |  Transporte: UDP  |  Red: IP  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "laptop-ap": "outgoing",
      "ap-switch": "flood",
      "switch-router": "flood",
    },
    activeActors: ["laptop", "ap", "switch", "router"],
  },
  {
    title: "DHCP Offer",
    description:
      "El router (servidor DHCP) ofrece: IP 192.168.1.100, máscara /24, gateway 192.168.1.1, DNS 8.8.8.8, TTL 24h.",
    detail:
      "DHCP Offer: IP ofrecida=192.168.1.100 | gateway=192.168.1.1 | DNS=8.8.8.8 | lease=86400s\nEtiquetado como unicast hacia la MAC del laptop (ya conocida del discover).",
    protocolStack:
      "App: DHCP  |  Transporte: UDP  |  Red: IP  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "switch-router": "incoming",
      "ap-switch": "incoming",
      "laptop-ap": "incoming",
    },
    activeActors: ["laptop", "ap", "switch", "router"],
  },
  {
    title: "DHCP Request + ACK",
    description:
      "Laptop acepta la oferta y router confirma. Laptop ahora tiene IP, gateway y DNS configurados.",
    detail:
      "Request: broadcast (otros servidores DHCP deben saber cuál fue elegido).\nACK: unicast desde router. Laptop queda con: IP=192.168.1.100, GW=192.168.1.1, DNS=8.8.8.8",
    protocolStack:
      "App: DHCP  |  Transporte: UDP  |  Red: IP  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "laptop-ap": "outgoing",
      "ap-switch": "flood",
      "switch-router": "bidirectional",
    },
    activeActors: ["laptop", "ap", "switch", "router"],
  },
  {
    title: "ARP Request (Gateway)",
    description:
      "Para enviar cualquier paquete fuera de la subred, el laptop necesita la MAC del gateway. Hace ARP broadcast.",
    detail:
      'ARP Request: "Who has 192.168.1.1? Tell 192.168.1.100"\nEthernet: src=MAC_laptop dst=FF:FF:FF:FF:FF:FF\nEl switch inunda — el router responderá.',
    protocolStack:
      "App: —  |  Transporte: —  |  Red: —  |  Enlace: ARP + Ethernet + WiFi 802.11",
    links: {
      "laptop-ap": "outgoing",
      "ap-switch": "flood",
      "switch-router": "flood",
    },
    activeActors: ["laptop", "ap", "switch", "router"],
  },
  {
    title: "ARP Reply",
    description:
      "El router responde con su MAC. El laptop guarda {192.168.1.1 → AA:BB:CC:DD:EE:FF} en su caché ARP.",
    detail:
      "ARP Reply: src=AA:BB:CC:DD:EE:FF (router), dst=MAC_laptop\nAhora el laptop puede construir tramas Ethernet válidas para enviar al router.",
    protocolStack:
      "App: —  |  Transporte: —  |  Red: —  |  Enlace: ARP + Ethernet + WiFi 802.11",
    links: {
      "switch-router": "incoming",
      "ap-switch": "incoming",
      "laptop-ap": "incoming",
    },
    activeActors: ["laptop", "ap", "switch", "router"],
  },
  {
    title: "DNS Query",
    description:
      "Laptop envía: UDP query a 8.8.8.8:53 preguntando por la IP de www.google.com. El router hace NAT.",
    detail:
      "Trama: Ethernet dst=AA:BB:CC:DD:EE:FF (gateway MAC)\nIP: src=192.168.1.100 dst=8.8.8.8 | UDP 49153→53\nDNS: QTYPE=A QNAME=www.google.com\nNAT: router reemplaza src con su IP pública.",
    protocolStack:
      "App: DNS  |  Transporte: UDP  |  Red: IP + NAT  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "laptop-ap": "outgoing",
      "ap-switch": "outgoing",
      "switch-router": "outgoing",
      "router-dns": "outgoing",
    },
    activeActors: ["laptop", "ap", "switch", "router", "dns"],
  },
  {
    title: "DNS Resolución Iterativa",
    description:
      "El servidor DNS 8.8.8.8 consulta: Root → .com TLD → google.com autoritativo. Resuelve: www.google.com → 142.250.185.46",
    detail:
      "8.8.8.8 consulta a servidores raíz → TLD .com → ns1.google.com\nRespuesta final: www.google.com → 142.250.185.46 (TTL 300s)\nTipo: A record (IPv4)",
    protocolStack:
      "App: DNS (iterativo)  |  Transporte: UDP  |  Red: IP  |  Enlace: varios",
    links: {
      "router-dns": "bidirectional",
    },
    activeActors: ["dns"],
  },
  {
    title: "DNS Response → Laptop",
    description:
      "El laptop recibe la respuesta DNS. Sabe que www.google.com = 142.250.185.46. Ahora puede iniciar TCP.",
    detail:
      "DNS Response: QNAME=www.google.com ANSWER=142.250.185.46 TTL=300\nNAT reverso: router reemplaza dst con 192.168.1.100 y reenvía al laptop.\nEl laptop guarda la IP en su caché DNS.",
    protocolStack:
      "App: DNS  |  Transporte: UDP  |  Red: IP + NAT  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "router-dns": "incoming",
      "switch-router": "incoming",
      "ap-switch": "incoming",
      "laptop-ap": "incoming",
    },
    activeActors: ["laptop", "ap", "switch", "router", "dns"],
  },
  {
    title: "TCP SYN",
    description:
      "TCP three-way handshake comienza. SYN: seq=x, src_port=49152, dst=443. El router hace NAT.",
    detail:
      "TCP SYN: seq=2847391 src=192.168.1.100:49152 dst=142.250.185.46:443\nFlags: SYN=1 ACK=0 | Window=65535 | Options: MSS=1460, SACK, Timestamps\nNAT: router registra la conexión en su tabla de traducción.",
    protocolStack:
      "App: (inicio HTTPS)  |  Transporte: TCP  |  Red: IP + NAT  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "laptop-ap": "outgoing",
      "ap-switch": "outgoing",
      "switch-router": "outgoing",
      "router-google": "outgoing",
    },
    activeActors: ["laptop", "ap", "switch", "router", "google"],
  },
  {
    title: "TCP SYN-ACK",
    description:
      "Google responde con SYN-ACK: seq=y, ack=x+1. TCP connection half-established.",
    detail:
      "TCP SYN-ACK: seq=9182734 ack=2847392 src=142.250.185.46:443 dst=IP_pública:49152\nFlags: SYN=1 ACK=1 | Window=65535\nNAT reverso en router → llega al laptop.",
    protocolStack:
      "App: (inicio HTTPS)  |  Transporte: TCP  |  Red: IP + NAT  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "router-google": "incoming",
      "switch-router": "incoming",
      "ap-switch": "incoming",
      "laptop-ap": "incoming",
    },
    activeActors: ["laptop", "ap", "switch", "router", "google"],
  },
  {
    title: "TCP ACK (Conexión Establecida)",
    description:
      "Laptop envía ACK: ack=y+1. Three-way handshake completo. Conexión TCP establecida en ambos sentidos.",
    detail:
      "TCP ACK: seq=2847392 ack=9182735\nFlags: ACK=1 | Window=65535\nEstado: ESTABLISHED en ambos extremos. El canal está listo para datos.",
    protocolStack:
      "Transporte: TCP (ESTABLISHED)  |  Red: IP + NAT  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "laptop-ap": "outgoing",
      "ap-switch": "outgoing",
      "switch-router": "outgoing",
      "router-google": "outgoing",
    },
    activeActors: ["laptop", "ap", "switch", "router", "google"],
  },
  {
    title: "TLS ClientHello",
    description:
      "HTTPS requiere TLS. ClientHello incluye: versión TLS 1.3, cipher suites soportados, extensión SNI para indicar qué dominio se quiere.",
    detail:
      "TLS 1.3 ClientHello:\n  - Random: 32 bytes aleatorios\n  - Cipher suites: TLS_AES_256_GCM_SHA384, TLS_CHACHA20_POLY1305_SHA256\n  - Extensión SNI: www.google.com\n  - Extensión key_share: clave pública Diffie-Hellman",
    protocolStack:
      "App: TLS 1.3 Handshake  |  Transporte: TCP  |  Red: IP  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "laptop-ap": "outgoing",
      "ap-switch": "outgoing",
      "switch-router": "outgoing",
      "router-google": "outgoing",
    },
    activeActors: ["laptop", "ap", "switch", "router", "google"],
  },
  {
    title: "TLS ServerHello + Certificado",
    description:
      "Google responde con su certificado (firmado por CA). El laptop verifica la cadena de confianza. Intercambio Diffie-Hellman para forward secrecy.",
    detail:
      "TLS ServerHello + Certificate + CertificateVerify + Finished:\n  - Cipher elegido: TLS_AES_256_GCM_SHA384\n  - Certificado: *.google.com firmado por Google Trust Services\n  - Clave pública DH del servidor\n  - Laptop verifica firma y cadena de CA",
    protocolStack:
      "App: TLS 1.3 Handshake  |  Transporte: TCP  |  Red: IP  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "router-google": "incoming",
      "switch-router": "incoming",
      "ap-switch": "incoming",
      "laptop-ap": "incoming",
    },
    activeActors: ["laptop", "ap", "switch", "router", "google"],
  },
  {
    title: "TLS Finished (Canal Cifrado)",
    description:
      "Canal TLS establecido. Todo lo siguiente va cifrado con AES-256-GCM. Ningún router intermedio puede leer el contenido.",
    detail:
      "Laptop envía Finished (cifrado con clave de sesión derivada de DH).\nClave de sesión: derivada con HKDF-SHA384.\nDesde ahora: AES-256-GCM con claves distintas para cada dirección.\nForward secrecy: si roban la clave del servidor, no se descifra el tráfico pasado.",
    protocolStack:
      "App: TLS 1.3 (ESTABLISHED)  |  Transporte: TCP  |  Red: IP  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "laptop-ap": "outgoing",
      "ap-switch": "outgoing",
      "switch-router": "outgoing",
      "router-google": "bidirectional",
    },
    activeActors: ["laptop", "ap", "switch", "router", "google"],
  },
  {
    title: "HTTP GET Request",
    description:
      "Laptop envía HTTP/2 GET / a www.google.com. Todo va cifrado dentro del túnel TLS.",
    detail:
      "HTTP/2 Request (cifrado):\n  GET / HTTP/2\n  :authority: www.google.com\n  :method: GET\n  :scheme: https\n  user-agent: Mozilla/5.0\n  accept: text/html,application/xhtml+xml\n  accept-encoding: gzip, deflate, br",
    protocolStack:
      "App: HTTP/2 (over TLS)  |  Transporte: TCP  |  Red: IP  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "laptop-ap": "outgoing",
      "ap-switch": "outgoing",
      "switch-router": "outgoing",
      "router-google": "outgoing",
    },
    activeActors: ["laptop", "ap", "switch", "router", "google"],
  },
  {
    title: "HTTP 200 OK (HTML)",
    description:
      "HTTP 200 OK. Content-Type: text/html. Google envía el HTML en múltiples segmentos TCP con control de congestión.",
    detail:
      "HTTP/2 Response (cifrado):\n  :status: 200\n  content-type: text/html; charset=UTF-8\n  content-encoding: br (Brotli)\n  cache-control: private, max-age=0\n\nHTML enviado en múltiples DATA frames HTTP/2 → segmentos TCP → fragmentos IP",
    protocolStack:
      "App: HTTP/2 + TLS  |  Transporte: TCP (congestión, flujo)  |  Red: IP  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "router-google": "incoming",
      "switch-router": "incoming",
      "ap-switch": "incoming",
      "laptop-ap": "incoming",
    },
    activeActors: ["laptop", "ap", "switch", "router", "google"],
  },
  {
    title: "TCP ACKs (Entrega Confiable)",
    description:
      "TCP garantiza entrega confiable. Cada segmento recibido es ACK'd. Si hay pérdida, retransmite.",
    detail:
      "TCP cumulative ACK: ack=N confirma recepción hasta byte N-1\nVentana de recepción (rwnd) controla cuántos bytes puede enviar el emisor.\nControl de congestión: slow start → congestion avoidance → fast retransmit.\nRTT típico a Google: 10–50ms",
    protocolStack:
      "Transporte: TCP (ACK, flow control, congestión)  |  Red: IP  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "laptop-ap": "outgoing",
      "ap-switch": "outgoing",
      "switch-router": "outgoing",
      "router-google": "bidirectional",
    },
    activeActors: ["laptop", "ap", "switch", "router", "google"],
  },
  {
    title: "DNS para Recursos Embebidos",
    description:
      "El browser parsea el HTML y encuentra recursos externos. Lanza nuevas consultas DNS para cada dominio nuevo.",
    detail:
      "Recursos encontrados en el HTML:\n  - fonts.googleapis.com → nueva DNS query\n  - accounts.google.com → nueva DNS query\n  - www.gstatic.com → nueva DNS query\nCada dominio nuevo requiere resolución DNS antes del TCP.",
    protocolStack:
      "App: DNS (múltiples)  |  Transporte: UDP  |  Red: IP + NAT  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "laptop-ap": "outgoing",
      "ap-switch": "outgoing",
      "switch-router": "outgoing",
      "router-dns": "bidirectional",
    },
    activeActors: ["laptop", "ap", "switch", "router", "dns", "google"],
  },
  {
    title: "Conexiones TCP Paralelas (CDN)",
    description:
      "HTTP/2 multiplexa streams sobre una sola conexión TCP. El browser abre conexiones paralelas a servidores CDN.",
    detail:
      "HTTP/2 multiplexing: múltiples streams sobre 1 conexión TCP.\nConexiones paralelas a:\n  - fonts.googleapis.com:443\n  - www.gstatic.com:443\n  - ssl.gstatic.com:443\nCada una hace su propio TCP + TLS handshake.",
    protocolStack:
      "App: HTTP/2 multiplex  |  Transporte: TCP (paralelo)  |  Red: IP  |  Enlace: Ethernet + WiFi 802.11",
    links: {
      "laptop-ap": "bidirectional",
      "ap-switch": "bidirectional",
      "switch-router": "bidirectional",
      "router-google": "bidirectional",
    },
    activeActors: ["laptop", "ap", "switch", "router", "dns", "google"],
  },
  {
    title: "Pagina Cargada!",
    description:
      "Pagina completamente renderizada. Protocolos usados: DHCP, ARP, DNS, TCP, TLS 1.3, HTTP/2. Tiempo total tipico: 500ms-2s.",
    detail:
      "Resumen de protocolos ejecutados:\n  DHCP: asigno IP, gateway, DNS\n  ARP: resolvio MAC del gateway\n  DNS: resolvio nombre → IP\n  TCP: conexiones confiables\n  TLS 1.3: cifrado end-to-end\n  HTTP/2: transferencia eficiente\n  NAT: tradujo IP privada ↔ publica\n  WiFi 802.11: acceso inalambrico\n  Ethernet: transporte en LAN",
    protocolStack: "Todos los protocolos activos durante la carga de la pagina",
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

// ─── Phases ──────────────────────────────────────────────────────────────────

const PHASES = [
  { label: "DHCP", steps: [0, 1, 2], color: "#539bf5" },
  { label: "ARP", steps: [3, 4], color: "#57ab5a" },
  { label: "DNS", steps: [5, 6, 7], color: "#daaa3f" },
  { label: "TCP", steps: [8, 9, 10], color: "#f69d50" },
  { label: "TLS", steps: [11, 12, 13], color: "#a78bfa" },
  { label: "HTTP", steps: [14, 15, 16], color: "#e05d44" },
  { label: "CDN", steps: [17, 18, 19], color: "#6cb6ff" },
];

// ─── Topology ────────────────────────────────────────────────────────────────

const SVG_DEVICES: Record<
  string,
  { x: number; y: number; type: "laptop" | "ap" | "switch" | "router" | "server" }
> = {
  laptop: { x: 60, y: 150, type: "laptop" },
  ap: { x: 160, y: 150, type: "ap" },
  switch: { x: 270, y: 150, type: "switch" },
  router: { x: 380, y: 150, type: "router" },
  dns: { x: 460, y: 55, type: "server" },
  google: { x: 490, y: 150, type: "server" },
};

const SVG_LINK_COORDS: Record<LinkId, [number, number, number, number]> = {
  "laptop-ap": [88, 150, 132, 150],
  "ap-switch": [188, 150, 242, 150],
  "switch-router": [298, 150, 352, 150],
  "router-dns": [395, 133, 448, 72],
  "router-google": [408, 150, 462, 150],
};

const ACTOR_ORDER = ["laptop", "ap", "switch", "router", "dns", "google"] as const;

const ACTOR_META: Record<string, { label: string; sub: string }> = {
  laptop: { label: "Laptop", sub: "192.168.1.100" },
  ap: { label: "WiFi AP", sub: "802.11" },
  switch: { label: "Switch", sub: "Capa 2" },
  router: { label: "Router", sub: "192.168.1.1" },
  dns: { label: "DNS Server", sub: "8.8.8.8" },
  google: { label: "Web Server", sub: "142.250.x.x" },
};

// ─── Layer encapsulation ─────────────────────────────────────────────────────

interface LayerState {
  protocol: string;
  active: boolean;
}

interface LayerStates {
  app: LayerState;
  transport: LayerState;
  network: LayerState;
  link: LayerState;
  physical: LayerState;
}

const PT_LAYER_COLORS = {
  app: "#cc9966",
  transport: "#339966",
  network: "#9966cc",
  link: "#339999",
  physical: "#999999",
};

const LAYERS_DEF = [
  { key: "app" as const, num: 7, name: "Application", pdu: "Data", color: PT_LAYER_COLORS.app },
  { key: "transport" as const, num: 4, name: "Transport", pdu: "Segment", color: PT_LAYER_COLORS.transport },
  { key: "network" as const, num: 3, name: "Network", pdu: "Packet", color: PT_LAYER_COLORS.network },
  { key: "link" as const, num: 2, name: "Data Link", pdu: "Frame", color: PT_LAYER_COLORS.link },
  { key: "physical" as const, num: 1, name: "Physical", pdu: "Bits", color: PT_LAYER_COLORS.physical },
];

function getLayerStates(stepIdx: number): LayerStates {
  if (stepIdx <= 2) {
    const dhcpMsg = ["Discover", "Offer", "Req+ACK"][stepIdx];
    return {
      app: { protocol: `DHCP ${dhcpMsg}`, active: true },
      transport: { protocol: "UDP 68/67", active: true },
      network: { protocol: stepIdx === 0 ? "IP (broadcast)" : "IP", active: true },
      link: { protocol: "Ethernet", active: true },
      physical: { protocol: "WiFi 802.11", active: true },
    };
  }
  if (stepIdx <= 4) {
    return {
      app: { protocol: "--", active: false },
      transport: { protocol: "--", active: false },
      network: { protocol: "--", active: false },
      link: { protocol: stepIdx === 3 ? "ARP Request" : "ARP Reply", active: true },
      physical: { protocol: "WiFi 802.11", active: true },
    };
  }
  if (stepIdx <= 7) {
    const dnsMsg = stepIdx === 5 ? "DNS Query" : stepIdx === 6 ? "DNS Iterative" : "DNS Response";
    return {
      app: { protocol: dnsMsg, active: true },
      transport: { protocol: "UDP :53", active: true },
      network: { protocol: "IP + NAT", active: true },
      link: { protocol: "Ethernet", active: true },
      physical: { protocol: "WiFi 802.11", active: true },
    };
  }
  if (stepIdx <= 10) {
    const tcpMsg = ["TCP SYN", "TCP SYN-ACK", "TCP ACK"][stepIdx - 8];
    return {
      app: { protocol: "--", active: false },
      transport: { protocol: tcpMsg, active: true },
      network: { protocol: "IP + NAT", active: true },
      link: { protocol: "Ethernet", active: true },
      physical: { protocol: "WiFi 802.11", active: true },
    };
  }
  if (stepIdx <= 13) {
    const tlsMsg = ["ClientHello", "ServerHello", "Finished"][stepIdx - 11];
    return {
      app: { protocol: `TLS ${tlsMsg}`, active: true },
      transport: { protocol: "TCP", active: true },
      network: { protocol: "IP + NAT", active: true },
      link: { protocol: "Ethernet", active: true },
      physical: { protocol: "WiFi 802.11", active: true },
    };
  }
  if (stepIdx <= 16) {
    return {
      app: {
        protocol: stepIdx === 14 ? "HTTP/2 GET" : stepIdx === 15 ? "HTTP/2 200" : "--",
        active: stepIdx <= 15,
      },
      transport: { protocol: "TCP", active: true },
      network: { protocol: "IP + NAT", active: true },
      link: { protocol: "Ethernet", active: true },
      physical: { protocol: "WiFi 802.11", active: true },
    };
  }
  return {
    app: {
      protocol: stepIdx === 17 ? "DNS multiple" : stepIdx === 18 ? "HTTP/2 mux" : "All",
      active: true,
    },
    transport: { protocol: stepIdx === 17 ? "UDP" : "TCP parallel", active: true },
    network: { protocol: "IP + NAT", active: true },
    link: { protocol: "Ethernet", active: true },
    physical: { protocol: "WiFi 802.11", active: true },
  };
}

function getPacketBlocks(
  layerIdx: number,
  ls: LayerStates
): { label: string; color: string }[] {
  const C = {
    app: PT_LAYER_COLORS.app,
    transport: PT_LAYER_COLORS.transport,
    network: PT_LAYER_COLORS.network,
    link: PT_LAYER_COLORS.link,
    physical: PT_LAYER_COLORS.physical,
    payload: "#8b949e",
  };

  if (layerIdx === 4)
    return [{ label: "0110 1001 0101 0110 1100...", color: C.physical }];

  const blocks: { label: string; color: string }[] = [];

  if (layerIdx >= 3 && ls.link.active)
    blocks.push({ label: "Eth", color: C.link });
  if (layerIdx >= 2 && ls.network.active)
    blocks.push({ label: "IP", color: C.network });
  if (layerIdx >= 1 && ls.transport.active) {
    blocks.push({
      label: ls.transport.protocol.includes("UDP") ? "UDP" : "TCP",
      color: C.transport,
    });
  }

  if (ls.app.active && ls.app.protocol !== "--") {
    blocks.push({
      label:
        ls.app.protocol.length > 11
          ? ls.app.protocol.slice(0, 11)
          : ls.app.protocol,
      color: C.app,
    });
  } else if (!ls.transport.active && !ls.network.active && ls.link.active) {
    blocks.push({ label: "ARP", color: C.payload });
  }

  if (layerIdx >= 3 && ls.link.active)
    blocks.push({ label: "FCS", color: C.link });

  return blocks;
}

// ─── Event list data builder ─────────────────────────────────────────────────

function getEventType(idx: number): string {
  if (idx <= 2) return "DHCP";
  if (idx <= 4) return "ARP";
  if (idx <= 7) return "DNS";
  if (idx <= 10) return "TCP";
  if (idx <= 13) return "TLS";
  if (idx <= 16) return "HTTP";
  if (idx <= 18) return "DNS/HTTP";
  return "ALL";
}

function getLastDevice(idx: number): string {
  const step = STEPS[idx];
  const linkEntries = Object.entries(step.links) as [LinkId, LinkState][];
  const firstLink = linkEntries[0];
  if (!firstLink) return "--";
  const [linkId, state] = firstLink;
  const parts = linkId.split("-");
  if (state === "incoming") {
    const src = parts[1];
    return ACTOR_META[src]?.label ?? src;
  }
  const src = parts[0];
  return ACTOR_META[src]?.label ?? src;
}

function getAtDevice(idx: number): string {
  const step = STEPS[idx];
  const linkEntries = Object.entries(step.links) as [LinkId, LinkState][];
  const lastLink = linkEntries[linkEntries.length - 1];
  if (!lastLink) return "--";
  const [linkId, state] = lastLink;
  const parts = linkId.split("-");
  if (state === "incoming") {
    const dst = parts[0];
    return ACTOR_META[dst]?.label ?? dst;
  }
  const dst = parts[1];
  return ACTOR_META[dst]?.label ?? dst;
}

// ─── SVG Device Icons (PT style) ─────────────────────────────────────────────

function PTDeviceIcon({
  type,
  x,
  y,
  active,
  label,
  sub,
}: {
  type: "laptop" | "ap" | "switch" | "router" | "server";
  x: number;
  y: number;
  active: boolean;
  label: string;
  sub: string;
}) {
  const c = active ? "var(--color-foreground)" : "var(--color-muted)";
  const accent = active ? "#00cc00" : "var(--color-muted)";

  return (
    <g opacity={active ? 1 : 0.45}>
      <g transform={`translate(${x}, ${y - 6})`}>
        {type === "laptop" && (<>
          <rect x={-12} y={-10} width={24} height={15} rx={2} fill="none" stroke={c} strokeWidth={1.4} />
          <rect x={-15} y={7} width={30} height={2.5} rx={1} fill="none" stroke={c} strokeWidth={1} />
        </>)}
        {type === "ap" && (<>
          <line x1={0} y1={2} x2={0} y2={-8} stroke={c} strokeWidth={1.4} />
          <circle cx={0} cy={-10} r={2} fill={accent} />
          <path d="M-5,-5 A 7,7 0 0,1 5,-5" fill="none" stroke={c} strokeWidth={1} opacity={0.7} />
          <path d="M-9,-2 A 12,12 0 0,1 9,-2" fill="none" stroke={c} strokeWidth={0.8} opacity={0.4} />
          <rect x={-6} y={2} width={12} height={8} rx={1.5} fill="none" stroke={c} strokeWidth={1.2} />
        </>)}
        {type === "switch" && (<>
          <rect x={-18} y={-6} width={36} height={12} rx={2.5} fill="none" stroke={c} strokeWidth={1.4} />
          {[-10, -3, 4, 11].map(px => <circle key={px} cx={px} cy={0} r={1.8} fill={c} />)}
        </>)}
        {type === "router" && (<>
          <circle r={13} fill="none" stroke={c} strokeWidth={1.4} />
          <line x1={-6} y1={0} x2={6} y2={0} stroke={c} strokeWidth={1.2} />
          <line x1={0} y1={-6} x2={0} y2={6} stroke={c} strokeWidth={1.2} />
          <polygon points="-8,0 -5.5,-2 -5.5,2" fill={c} />
          <polygon points="8,0 5.5,-2 5.5,2" fill={c} />
          <polygon points="0,-8 -2,-5.5 2,-5.5" fill={c} />
          <polygon points="0,8 -2,5.5 2,5.5" fill={c} />
        </>)}
        {type === "server" && (<>
          <rect x={-9} y={-13} width={18} height={26} rx={2} fill="none" stroke={c} strokeWidth={1.4} />
          <line x1={-6} y1={-4} x2={6} y2={-4} stroke={c} strokeWidth={0.7} />
          <line x1={-6} y1={4} x2={6} y2={4} stroke={c} strokeWidth={0.7} />
          <circle cx={5} cy={-8} r={1.3} fill={accent} />
          <circle cx={5} cy={0} r={1.3} fill={accent} />
          <circle cx={5} cy={8} r={1.3} fill={accent} />
        </>)}
      </g>
      {/* Labels */}
      <text x={x} y={y + 20} textAnchor="middle" fontSize={9} fontWeight="bold" fill={active ? "var(--color-foreground)" : "var(--color-muted)"}>
        {label}
      </text>
      <text x={x} y={y + 30} textAnchor="middle" fontSize={7.5} fill={active ? "var(--color-muted)" : "var(--color-muted)"}>
        {sub}
      </text>
    </g>
  );
}

// ─── Envelope SVG ────────────────────────────────────────────────────────────

function EnvelopeSVG({
  pathRef,
  color,
  dur,
  begin,
}: {
  pathRef: string;
  color: string;
  dur: string;
  begin?: string;
}) {
  return (
    <g>
      {/* Envelope body */}
      <rect
        x={-7}
        y={-5}
        width={14}
        height={10}
        rx={1.5}
        fill={color}
        stroke="#ffffff"
        strokeWidth={0.6}
      />
      {/* Envelope flap */}
      <path
        d="M-7,-5 L0,0 L7,-5"
        fill="none"
        stroke="#ffffff"
        strokeWidth={0.8}
        strokeLinejoin="round"
      />
      <animateMotion
        dur={dur}
        repeatCount="indefinite"
        calcMode="linear"
        begin={begin}
      >
        <mpath href={pathRef} />
      </animateMotion>
    </g>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function WebRequestJourney() {
  const [stepIdx, setStepIdx] = useState(0);
  const [pduTab, setPduTab] = useState<"osi" | "inbound" | "outbound">("osi");
  const [isPlaying, setIsPlaying] = useState(false);

  const step = STEPS[stepIdx];
  const currentPhase = PHASES.find((p) => p.steps.includes(stepIdx));
  const layerStates = getLayerStates(stepIdx);

  const prev = () => setStepIdx((i) => Math.max(0, i - 1));
  const next = () => setStepIdx((i) => Math.min(STEPS.length - 1, i + 1));

  const autoPlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    setIsPlaying(true);
    let current = stepIdx;
    const interval = setInterval(() => {
      current += 1;
      if (current >= STEPS.length) {
        clearInterval(interval);
        setIsPlaying(false);
        return;
      }
      setStepIdx(current);
    }, 2000);
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* ── Simulation Toolbar ─────────────────────────────────────────── */}
      <div className="flex items-center gap-0 border-b border-border bg-card">
        {/* Tabs */}
        <div className="flex">
          <button className="px-3 py-2 text-[11px] sm:text-xs text-muted border-r border-border">
            Realtime
          </button>
          <button className="px-3 py-2 text-[11px] sm:text-xs font-bold text-white border-r border-border bg-[#003366]">
            Simulation
          </button>
        </div>

        {/* Phase pills */}
        <div className="hidden sm:flex items-center gap-1 px-2">
          {PHASES.map((phase) => {
            const isActive = phase === currentPhase;
            const isDone =
              phase.steps[phase.steps.length - 1] < stepIdx;
            return (
              <button
                key={phase.label}
                onClick={() => setStepIdx(phase.steps[0])}
                className="px-2 py-0.5 rounded text-[10px] font-semibold transition-all"
                style={{
                  backgroundColor: isActive
                    ? phase.color
                    : isDone
                    ? "#57ab5a33"
                    : "transparent",
                  color: isActive ? "#fff" : isDone ? "#57ab5a" : "var(--color-muted)",
                  border: `1px solid ${isActive ? phase.color : "var(--color-border)"}`,
                }}
              >
                {isDone && !isActive ? "~ " : ""}
                {phase.label}
              </button>
            );
          })}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Play controls */}
        <div className="flex items-center border-l border-border">
          <button
            onClick={autoPlay}
            className="flex items-center gap-1 px-2 sm:px-3 py-2 text-[10px] sm:text-xs font-semibold text-foreground hover:bg-border/50 transition-colors border-r border-border"
          >
            <Play className="h-3 w-3" />
            <span className="hidden sm:inline">
              {isPlaying ? "Pause" : "Auto"}
            </span>
          </button>
          <button
            onClick={prev}
            disabled={stepIdx === 0}
            className="flex items-center gap-1 px-2 sm:px-3 py-2 text-[10px] sm:text-xs font-semibold text-foreground hover:bg-border/50 transition-colors disabled:opacity-40 border-r border-border"
          >
            <ChevronLeft className="h-3 w-3" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <button
            onClick={next}
            disabled={stepIdx === STEPS.length - 1}
            className="flex items-center gap-1 px-2 sm:px-3 py-2 text-[10px] sm:text-xs font-semibold text-foreground hover:bg-border/50 transition-colors disabled:opacity-40 border-r border-border"
          >
            <SkipForward className="h-3 w-3" />
            <span className="hidden sm:inline">Forward</span>
          </button>
          <span className="px-2 sm:px-3 py-2 text-[10px] sm:text-xs text-muted font-mono">
            {stepIdx + 1}/{STEPS.length}
          </span>
        </div>
      </div>

      {/* ── Topology Workspace ─────────────────────────────────────────── */}
      <div className="bg-background">
        <svg
          viewBox="0 0 560 240"
          className="w-full"
          aria-label="Topology workspace - Packet Tracer simulation"
        >
          {/* Grid dots pattern */}
          <defs>
            <pattern
              id="pt-grid"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="0.5" fill="var(--color-border)" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="560" height="240" fill="var(--color-background)" />
          <rect width="560" height="240" fill="url(#pt-grid)" />

          {/* Hidden paths for PDU animation */}
          {(Object.keys(SVG_LINK_COORDS) as LinkId[]).map((id) => {
            const [x1, y1, x2, y2] = SVG_LINK_COORDS[id];
            const state = step.links[id];
            if (!state || state === "idle") return null;
            const fwd = `M${x1},${y1} L${x2},${y2}`;
            const rev = `M${x2},${y2} L${x1},${y1}`;
            return (
              <g key={`paths-${id}`}>
                <path id={`pt-fwd-${id}`} d={fwd} fill="none" />
                <path id={`pt-rev-${id}`} d={rev} fill="none" />
              </g>
            );
          })}

          {/* Connection cables */}
          {(Object.keys(SVG_LINK_COORDS) as LinkId[]).map((id) => {
            const [x1, y1, x2, y2] = SVG_LINK_COORDS[id];
            const state = step.links[id];
            const isActive = state && state !== "idle";
            return (
              <line
                key={id}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isActive ? "#00cc00" : "var(--color-muted)"}
                strokeWidth={isActive ? 2 : 1.5}
                strokeDasharray={
                  state === "flood" ? "6 3" : undefined
                }
              />
            );
          })}

          {/* Green dots on active cable endpoints */}
          {(Object.keys(SVG_LINK_COORDS) as LinkId[]).map((id) => {
            const [x1, y1, x2, y2] = SVG_LINK_COORDS[id];
            const state = step.links[id];
            const isActive = state && state !== "idle";
            if (!isActive) return null;
            return (
              <g key={`dots-${id}`}>
                <circle cx={x1} cy={y1} r={2.5} fill="#00cc00" />
                <circle cx={x2} cy={y2} r={2.5} fill="#00cc00" />
              </g>
            );
          })}

          {/* PDU envelopes travelling on active links */}
          {(Object.keys(SVG_LINK_COORDS) as LinkId[]).map((id) => {
            const state = step.links[id];
            if (!state || state === "idle") return null;
            const pathRef =
              state === "incoming"
                ? `#pt-rev-${id}`
                : `#pt-fwd-${id}`;
            const dur = state === "flood" ? "1s" : "2s";

            return (
              <g key={`env-${id}`}>
                <EnvelopeSVG
                  pathRef={pathRef}
                  color="#00cc00"
                  dur={dur}
                />
                {state === "bidirectional" && (
                  <EnvelopeSVG
                    pathRef={`#pt-rev-${id}`}
                    color="#00cc00"
                    dur={dur}
                    begin="1s"
                  />
                )}
              </g>
            );
          })}

          {/* Device icons */}
          {ACTOR_ORDER.map((id) => {
            const actor = ACTOR_META[id];
            const pos = SVG_DEVICES[id];
            const active = step.activeActors.includes(id);
            return (
              <PTDeviceIcon
                key={id}
                type={pos.type}
                x={pos.x}
                y={pos.y}
                active={active}
                label={actor.label}
                sub={actor.sub}
              />
            );
          })}

          {/* Step label overlay */}
          <rect
            x={8}
            y={6}
            width={340}
            height={18}
            rx={3}
            fill="var(--color-card)"
            stroke="var(--color-border)"
            strokeWidth={0.5}
          />
          <text x={14} y={18} fontSize={10} fill="var(--color-foreground)" fontWeight="bold">
            Paso {stepIdx + 1}: {step.title}
            {currentPhase ? ` (${currentPhase.label})` : ""}
          </text>
        </svg>
      </div>

      {/* ── Bottom panels: Event List + PDU Info ─────────────────────── */}
      <div className="flex flex-col sm:flex-row border-t border-border">
        {/* ── Event List (left) ─────────────────────────────────────── */}
        <div className="sm:w-[45%] border-b sm:border-b-0 sm:border-r border-border">
          <div className="px-3 py-1.5 bg-card border-b border-border">
            <span className="text-[10px] sm:text-xs font-bold text-foreground tracking-wide">
              Event List
            </span>
          </div>
          <div className="overflow-auto max-h-[220px]">
            <table className="w-full text-[9px] sm:text-[11px]">
              <thead>
                <tr className="bg-card border-b border-border text-muted">
                  <th className="px-1.5 py-1 text-left w-6">Vis</th>
                  <th className="px-1.5 py-1 text-left w-6">#</th>
                  <th className="px-1.5 py-1 text-left w-10">Time</th>
                  <th className="px-1.5 py-1 text-left">Last Device</th>
                  <th className="px-1.5 py-1 text-left">At Device</th>
                  <th className="px-1.5 py-1 text-left">Type</th>
                </tr>
              </thead>
              <tbody>
                {STEPS.map((_, i) => {
                  const isCurrent = i === stepIdx;
                  const isPast = i < stepIdx;
                  return (
                    <tr
                      key={i}
                      onClick={() => setStepIdx(i)}
                      className={`cursor-pointer transition-colors ${
                        isCurrent
                          ? "bg-[#003366]/20"
                          : isPast
                          ? "bg-card/50"
                          : "bg-background"
                      } hover:bg-border/30`}
                    >
                      <td className="px-1.5 py-0.5 text-center">
                        {isCurrent ? (
                          <Eye className="h-3 w-3 text-foreground inline" />
                        ) : isPast ? (
                          <span className="text-muted">-</span>
                        ) : null}
                      </td>
                      <td className="px-1.5 py-0.5 text-foreground font-mono">
                        {i + 1}
                      </td>
                      <td className="px-1.5 py-0.5 text-muted font-mono">
                        {(i * 0.1).toFixed(1)}
                      </td>
                      <td className="px-1.5 py-0.5 text-foreground truncate max-w-[60px]">
                        {getLastDevice(i)}
                      </td>
                      <td className="px-1.5 py-0.5 text-foreground truncate max-w-[60px]">
                        {getAtDevice(i)}
                      </td>
                      <td className="px-1.5 py-0.5">
                        <span
                          className="inline-block px-1 rounded text-[8px] sm:text-[10px] font-semibold"
                          style={{
                            backgroundColor:
                              (
                                PHASES.find((p) =>
                                  p.steps.includes(i)
                                ) ?? PHASES[0]
                              ).color + "22",
                            color: (
                              PHASES.find((p) =>
                                p.steps.includes(i)
                              ) ?? PHASES[0]
                            ).color,
                          }}
                        >
                          {getEventType(i)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── PDU Information (right) ──────────────────────────────── */}
        <div className="sm:w-[55%]">
          {/* Tabs */}
          <div className="flex border-b border-border bg-card">
            {(
              [
                ["osi", "OSI Model"],
                ["inbound", "Inbound PDU"],
                ["outbound", "Outbound PDU"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setPduTab(key)}
                className={`px-3 py-1.5 text-[10px] sm:text-xs font-semibold transition-colors ${
                  pduTab === key
                    ? "text-foreground border-b-2 border-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-3">
            {pduTab === "osi" && (
              <div className="space-y-1.5">
                {LAYERS_DEF.map((layer, i) => {
                  const state = layerStates[layer.key];
                  const blocks = getPacketBlocks(i, layerStates);
                  const showBlocks =
                    state.active ||
                    (layer.key === "physical" && layerStates.link.active);

                  return (
                    <div key={layer.key} className="flex items-stretch gap-0 rounded overflow-hidden transition-all duration-300">
                      {/* Layer number */}
                      <div
                        className="w-7 sm:w-9 flex items-center justify-center font-mono font-black text-xs sm:text-sm shrink-0"
                        style={{
                          backgroundColor: state.active
                            ? layer.color
                            : "var(--color-border)",
                          color: "#ffffff",
                        }}
                      >
                        {layer.num}
                      </div>

                      {/* Layer color bar + name */}
                      <div
                        className="w-[72px] sm:w-[90px] flex flex-col items-center justify-center py-1.5 px-1 text-center shrink-0"
                        style={{
                          backgroundColor: state.active
                            ? layer.color + "55"
                            : "var(--color-card)",
                        }}
                      >
                        <span
                          className={`text-[9px] sm:text-[10px] font-bold leading-tight ${
                            state.active
                              ? "text-foreground"
                              : "text-muted"
                          }`}
                        >
                          {layer.name}
                        </span>
                        <span
                          className={`text-[7px] sm:text-[8px] ${
                            state.active
                              ? "text-muted"
                              : "text-muted/50"
                          }`}
                        >
                          {layer.pdu}
                        </span>
                      </div>

                      {/* Protocol + status + packet blocks */}
                      <div
                        className={`flex-1 flex items-center min-w-0 py-1.5 px-2 sm:px-3 transition-all duration-300 ${
                          state.active
                            ? "bg-background"
                            : "bg-card"
                        }`}
                      >
                        {state.active ? (
                          <div className="flex flex-col gap-0.5 min-w-0 w-full">
                            <div className="flex items-center gap-1.5">
                              <span
                                className="text-[10px] sm:text-xs font-bold"
                                style={{ color: layer.color }}
                              >
                                &#10003;
                              </span>
                              <span className="text-[9px] sm:text-[11px] text-foreground font-medium truncate">
                                {state.protocol}
                              </span>
                            </div>
                            {showBlocks && blocks.length > 0 && (
                              <div className="flex gap-[2px] items-center overflow-x-auto pb-0.5">
                                {blocks.map((block, j) => (
                                  <div
                                    key={j}
                                    className="h-[16px] sm:h-[18px] flex items-center justify-center text-[7px] sm:text-[8px] font-mono font-bold text-white rounded-[2px] px-1 sm:px-1.5 whitespace-nowrap shrink-0"
                                    style={{
                                      backgroundColor: block.color,
                                    }}
                                  >
                                    {block.label}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] sm:text-xs text-muted/50">
                              &#10005;
                            </span>
                            <span className="text-[9px] sm:text-[10px] text-muted italic">
                              Not used at this step
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {pduTab === "inbound" && (
              <div className="space-y-2">
                <p className="text-xs text-muted">
                  Inbound PDU Details - Step {stepIdx + 1}
                </p>
                <pre className="text-[10px] sm:text-xs font-mono text-foreground bg-background rounded p-2 whitespace-pre-wrap leading-relaxed border border-border">
                  {step.detail}
                </pre>
              </div>
            )}

            {pduTab === "outbound" && (
              <div className="space-y-2">
                <p className="text-xs text-muted">
                  Outbound PDU Details - Step {stepIdx + 1}
                </p>
                <pre className="text-[10px] sm:text-xs font-mono text-foreground bg-background rounded p-2 whitespace-pre-wrap leading-relaxed border border-border">
                  {step.protocolStack}
                </pre>
                <p className="text-[10px] sm:text-xs text-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

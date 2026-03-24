"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Laptop,
  Wifi,
  Network,
  Router,
  Globe,
  Server,
  ArrowRight,
  ArrowLeft,
  ArrowLeftRight,
  Zap,
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
    title: "¡Página Cargada!",
    description:
      "Página completamente renderizada. Protocolos usados: DHCP, ARP, DNS, TCP, TLS 1.3, HTTP/2. Tiempo total típico: 500ms–2s.",
    detail:
      "Resumen de protocolos ejecutados:\n  DHCP: asignó IP, gateway, DNS\n  ARP: resolvió MAC del gateway\n  DNS: resolvió nombre → IP\n  TCP: conexiones confiables\n  TLS 1.3: cifrado end-to-end\n  HTTP/2: transferencia eficiente\n  NAT: tradujo IP privada ↔ pública\n  WiFi 802.11: acceso inalámbrico\n  Ethernet: transporte en LAN",
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

// ─── Actor metadata ──────────────────────────────────────────────────────────

const ACTOR_META: Record<
  string,
  {
    label: string;
    sub: string;
    color: string;
    Icon: typeof Laptop;
  }
> = {
  laptop: { label: "Laptop", sub: "192.168.1.100", color: "#539bf5", Icon: Laptop },
  ap: { label: "WiFi AP", sub: "802.11", color: "#57ab5a", Icon: Wifi },
  switch: { label: "Switch", sub: "Capa 2", color: "#6cb6ff", Icon: Network },
  router: { label: "Router/GW", sub: "192.168.1.1", color: "#f69d50", Icon: Router },
  dns: { label: "DNS", sub: "8.8.8.8", color: "#daaa3f", Icon: Globe },
  google: { label: "google.com", sub: "142.250.x.x", color: "#e05d44", Icon: Server },
};

const ACTOR_ORDER = ["laptop", "ap", "switch", "router", "dns", "google"] as const;

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

// ─── Link topology for flow path ─────────────────────────────────────────────
// The physical topology: laptop—ap—switch—router—dns, router—google

const TOPOLOGY_EDGES: { id: LinkId; from: string; to: string }[] = [
  { id: "laptop-ap", from: "laptop", to: "ap" },
  { id: "ap-switch", from: "ap", to: "switch" },
  { id: "switch-router", from: "switch", to: "router" },
  { id: "router-dns", from: "router", to: "dns" },
  { id: "router-google", from: "router", to: "google" },
];

function buildFlowPath(step: StepData): { actor: string; arrow?: { color: string; direction: "right" | "left" | "both" } }[] {
  // Find active link chain
  const activeLinks = TOPOLOGY_EDGES.filter((e) => {
    const state = step.links[e.id];
    return state && state !== "idle";
  });

  if (activeLinks.length === 0) {
    // Just show active actors
    return step.activeActors.map((a) => ({ actor: a }));
  }

  // Build ordered set of actors from active links
  const actorSet = new Set<string>();
  const linkMap = new Map<string, { color: string; direction: "right" | "left" | "both" }>();

  for (const edge of activeLinks) {
    actorSet.add(edge.from);
    actorSet.add(edge.to);

    const state = step.links[edge.id]!;
    const color =
      state === "outgoing" ? "#818cf8" :
      state === "incoming" ? "#22c55e" :
      state === "flood" ? "#f59e0b" :
      "#a78bfa";
    const direction: "right" | "left" | "both" =
      state === "outgoing" || state === "flood" ? "right" :
      state === "incoming" ? "left" :
      "both";

    linkMap.set(`${edge.from}-${edge.to}`, { color, direction });
  }

  // Order actors based on ACTOR_ORDER
  const orderedActors = ACTOR_ORDER.filter((a) => actorSet.has(a));

  // Build path with arrows
  const result: { actor: string; arrow?: { color: string; direction: "right" | "left" | "both" } }[] = [];

  for (let i = 0; i < orderedActors.length; i++) {
    result.push({ actor: orderedActors[i] });

    if (i < orderedActors.length - 1) {
      const from = orderedActors[i];
      const to = orderedActors[i + 1];
      const key = `${from}-${to}`;
      const reverseKey = `${to}-${from}`;
      const link = linkMap.get(key) || linkMap.get(reverseKey);

      if (link) {
        result.push({ actor: "__arrow__", arrow: link });
      }
    }
  }

  return result;
}

// ─── Link state labels ───────────────────────────────────────────────────────

const LINK_LEGEND = [
  { label: "Envío", color: "#818cf8", dash: false },
  { label: "Respuesta", color: "#22c55e", dash: false },
  { label: "Broadcast", color: "#f59e0b", dash: true },
  { label: "Bidireccional", color: "#a78bfa", dash: true },
];

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

const LAYERS_DEF = [
  { key: "app" as const, name: "Aplicación", pdu: "Mensaje", color: "#539bf5" },
  { key: "transport" as const, name: "Transporte", pdu: "Segmento", color: "#57ab5a" },
  { key: "network" as const, name: "Red", pdu: "Datagrama", color: "#f69d50" },
  { key: "link" as const, name: "Enlace", pdu: "Trama", color: "#daaa3f" },
  { key: "physical" as const, name: "Física", pdu: "Bits", color: "#e05d44" },
];

function getLayerStates(stepIdx: number): LayerStates {
  // DHCP (0-2): all layers active
  if (stepIdx <= 2) {
    const dhcpMsg = ["Discover", "Offer", "Req+ACK"][stepIdx];
    return {
      app: { protocol: `DHCP ${dhcpMsg}`, active: true },
      transport: { protocol: "UDP 68↔67", active: true },
      network: { protocol: stepIdx === 0 ? "IP (broadcast)" : "IP", active: true },
      link: { protocol: "Ethernet + WiFi", active: true },
      physical: { protocol: "Radio WiFi 2.4/5 GHz", active: true },
    };
  }
  // ARP (3-4): only link + physical
  if (stepIdx <= 4) {
    return {
      app: { protocol: "—", active: false },
      transport: { protocol: "—", active: false },
      network: { protocol: "—", active: false },
      link: { protocol: stepIdx === 3 ? "ARP Request + Eth" : "ARP Reply + Eth", active: true },
      physical: { protocol: "Radio WiFi", active: true },
    };
  }
  // DNS (5-7)
  if (stepIdx <= 7) {
    const dnsMsg = stepIdx === 5 ? "DNS Query" : stepIdx === 6 ? "DNS Iterativo" : "DNS Response";
    return {
      app: { protocol: dnsMsg, active: true },
      transport: { protocol: "UDP :53", active: true },
      network: { protocol: "IP + NAT", active: true },
      link: { protocol: "Ethernet + WiFi", active: true },
      physical: { protocol: "Radio WiFi", active: true },
    };
  }
  // TCP handshake (8-10): no app data
  if (stepIdx <= 10) {
    const tcpMsg = ["TCP SYN", "TCP SYN-ACK", "TCP ACK"][stepIdx - 8];
    return {
      app: { protocol: "—", active: false },
      transport: { protocol: tcpMsg, active: true },
      network: { protocol: "IP + NAT", active: true },
      link: { protocol: "Ethernet + WiFi", active: true },
      physical: { protocol: "Radio WiFi", active: true },
    };
  }
  // TLS (11-13)
  if (stepIdx <= 13) {
    const tlsMsg = ["ClientHello", "ServerHello", "Finished"][stepIdx - 11];
    return {
      app: { protocol: `TLS ${tlsMsg}`, active: true },
      transport: { protocol: "TCP", active: true },
      network: { protocol: "IP + NAT", active: true },
      link: { protocol: "Ethernet + WiFi", active: true },
      physical: { protocol: "Radio WiFi", active: true },
    };
  }
  // HTTP (14-16): step 16 is TCP ACKs, no app
  if (stepIdx <= 16) {
    return {
      app: { protocol: stepIdx === 14 ? "HTTP/2 GET" : stepIdx === 15 ? "HTTP/2 200" : "—", active: stepIdx <= 15 },
      transport: { protocol: "TCP", active: true },
      network: { protocol: "IP + NAT", active: true },
      link: { protocol: "Ethernet + WiFi", active: true },
      physical: { protocol: "Radio WiFi", active: true },
    };
  }
  // CDN/Final (17-19)
  return {
    app: { protocol: stepIdx === 17 ? "DNS múltiple" : stepIdx === 18 ? "HTTP/2 mux" : "Todos", active: true },
    transport: { protocol: stepIdx === 17 ? "UDP" : "TCP paralelo", active: true },
    network: { protocol: "IP + NAT", active: true },
    link: { protocol: "Ethernet + WiFi", active: true },
    physical: { protocol: "Radio WiFi", active: true },
  };
}

function getPacketBlocks(layerIdx: number, ls: LayerStates): { label: string; color: string }[] {
  const C = { app: "#539bf5", transport: "#57ab5a", network: "#f69d50", link: "#daaa3f", physical: "#e05d44", payload: "#768390" };

  // Physical = just bits
  if (layerIdx === 4) return [{ label: "0110 1001 0101 0110 1100...", color: C.physical }];

  const blocks: { label: string; color: string }[] = [];

  // Headers from outermost (link) inward — only include if layer is reached
  if (layerIdx >= 3 && ls.link.active) blocks.push({ label: "Eth", color: C.link });
  if (layerIdx >= 2 && ls.network.active) blocks.push({ label: "IP", color: C.network });
  if (layerIdx >= 1 && ls.transport.active) {
    blocks.push({ label: ls.transport.protocol.includes("UDP") ? "UDP" : "TCP", color: C.transport });
  }

  // Application data (innermost content)
  if (ls.app.active && ls.app.protocol !== "—") {
    blocks.push({ label: ls.app.protocol.length > 11 ? ls.app.protocol.slice(0, 11) : ls.app.protocol, color: C.app });
  } else if (!ls.transport.active && !ls.network.active && ls.link.active) {
    // Layer 2 only (ARP) — the ARP message is the Ethernet payload
    blocks.push({ label: "ARP", color: C.payload });
  }

  // FCS trailer at link layer
  if (layerIdx >= 3 && ls.link.active) blocks.push({ label: "FCS", color: C.link });

  return blocks;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function WebRequestJourney() {
  const [stepIdx, setStepIdx] = useState(0);
  const step = STEPS[stepIdx];

  const prev = () => setStepIdx((i) => Math.max(0, i - 1));
  const next = () => setStepIdx((i) => Math.min(STEPS.length - 1, i + 1));
  const reset = () => setStepIdx(0);

  const currentPhase = PHASES.find((p) => p.steps.includes(stepIdx));
  const flowPath = buildFlowPath(step);
  const layerStates = getLayerStates(stepIdx);

  return (
    <div className="space-y-5 rounded-xl border border-border bg-card p-4 sm:p-6">

      {/* ── Phase progress bar ──────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
        {PHASES.map((phase) => {
          const isActive = phase === currentPhase;
          const isDone = phase.steps[phase.steps.length - 1] < stepIdx;
          return (
            <button
              key={phase.label}
              onClick={() => setStepIdx(phase.steps[0])}
              className="relative px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300"
              style={
                isActive
                  ? {
                      backgroundColor: phase.color + "22",
                      color: phase.color,
                      boxShadow: `0 0 12px ${phase.color}44`,
                      border: `1.5px solid ${phase.color}`,
                    }
                  : isDone
                  ? {
                      backgroundColor: "transparent",
                      color: "#57ab5a",
                      border: "1.5px solid #57ab5a44",
                      textDecoration: "line-through",
                    }
                  : {
                      backgroundColor: "transparent",
                      color: "#768390",
                      border: "1.5px solid #444c56",
                    }
              }
            >
              {isDone && !isActive && "✓ "}
              {phase.label}
            </button>
          );
        })}
      </div>

      {/* ── Step title ──────────────────────────────────────────────────── */}
      <div className="text-center space-y-1">
        <span className="text-xs font-semibold text-muted uppercase tracking-wider">
          Paso {stepIdx + 1} de {STEPS.length}
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-foreground">{step.title}</h3>
      </div>

      {/* ── Actor cards grid ────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3">
        {ACTOR_ORDER.map((id) => {
          const actor = ACTOR_META[id];
          const isActive = step.activeActors.includes(id);
          const IconComp = actor.Icon;
          return (
            <div
              key={id}
              className="relative flex flex-col items-center gap-1 rounded-xl border-2 p-3 sm:p-4 transition-all duration-500"
              style={
                isActive
                  ? {
                      borderColor: actor.color,
                      backgroundColor: actor.color + "0d",
                      boxShadow: `0 0 20px ${actor.color}30, inset 0 0 20px ${actor.color}08`,
                    }
                  : {
                      borderColor: "#444c5640",
                      backgroundColor: "transparent",
                      opacity: 0.35,
                    }
              }
            >
              {/* Online pulse dot */}
              {isActive && (
                <span
                  className="absolute -top-1 -right-1 flex h-3 w-3"
                >
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: actor.color }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-3 w-3"
                    style={{ backgroundColor: actor.color }}
                  />
                </span>
              )}

              <IconComp
                className="h-6 w-6 sm:h-7 sm:w-7 transition-colors duration-300"
                style={{ color: isActive ? actor.color : "#545d68" }}
                strokeWidth={isActive ? 2.2 : 1.5}
              />
              <span
                className="text-[11px] sm:text-xs font-bold text-center leading-tight transition-colors duration-300"
                style={{ color: isActive ? actor.color : "#545d68" }}
              >
                {actor.label}
              </span>
              <span
                className="text-[9px] sm:text-[10px] text-center leading-tight transition-colors duration-300"
                style={{ color: isActive ? "#adbac7" : "#545d68" }}
              >
                {actor.sub}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Flow path (data direction) ──────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-center gap-1 py-1">
        <Zap className="h-3.5 w-3.5 text-muted mr-1" />
        {flowPath.map((item, i) => {
          if (item.actor === "__arrow__" && item.arrow) {
            const ArrowIcon =
              item.arrow.direction === "right"
                ? ArrowRight
                : item.arrow.direction === "left"
                ? ArrowLeft
                : ArrowLeftRight;
            return (
              <ArrowIcon
                key={`arrow-${i}`}
                className="h-3.5 w-3.5 flex-shrink-0"
                style={{ color: item.arrow.color }}
                strokeWidth={2.5}
              />
            );
          }
          if (item.actor !== "__arrow__") {
            const actor = ACTOR_META[item.actor];
            return (
              <span
                key={`actor-${i}`}
                className="text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded-md whitespace-nowrap"
                style={{
                  color: actor.color,
                  backgroundColor: actor.color + "15",
                }}
              >
                {actor.label}
              </span>
            );
          }
          return null;
        })}
      </div>

      {/* ── Legend ───────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
        {LINK_LEGEND.map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span
              className="inline-block w-4 h-0.5 rounded-full"
              style={{
                backgroundColor: l.color,
                ...(l.dash ? { backgroundImage: `repeating-linear-gradient(90deg, ${l.color} 0px, ${l.color} 3px, transparent 3px, transparent 6px)`, backgroundColor: "transparent" } : {}),
              }}
            />
            <span className="text-[10px] text-muted">{l.label}</span>
          </div>
        ))}
      </div>

      {/* ── Packet Tracer – Encapsulation Stack ─────────────────────── */}
      <div className="rounded-lg border border-border bg-[#1c2128] overflow-hidden">
        {/* PT-style header bar */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#2d333b] border-b border-border">
          <span className="text-[10px] sm:text-xs font-bold text-foreground tracking-wide">PDU Information</span>
          <span className="text-[9px] text-muted ml-auto">Encapsulamiento ↓ / Desencapsulamiento ↑</span>
        </div>

        {/* Layer rows */}
        <div className="divide-y divide-border/40">
          {LAYERS_DEF.map((layer, i) => {
            const state = layerStates[layer.key];
            const blocks = getPacketBlocks(i, layerStates);
            const showBlocks = state.active || (layer.key === "physical" && layerStates.link.active);
            const layerNum = 5 - i;

            return (
              <div
                key={layer.key}
                className="flex items-stretch transition-all duration-300"
              >
                {/* Layer number */}
                <div
                  className="w-8 sm:w-10 flex items-center justify-center font-mono font-black text-sm sm:text-base flex-shrink-0"
                  style={{
                    color: state.active ? layer.color : "#444c56",
                    backgroundColor: state.active ? layer.color + "12" : "#1c2128",
                  }}
                >
                  {layerNum}
                </div>

                {/* Layer name column */}
                <div
                  className="w-[68px] sm:w-[88px] flex flex-col items-center justify-center py-2 px-1 text-center flex-shrink-0 border-l border-r transition-all duration-300"
                  style={{
                    backgroundColor: state.active ? layer.color : "#2d333b",
                    borderColor: state.active ? layer.color + "60" : "#444c56",
                  }}
                >
                  <span className={`text-[9px] sm:text-[10px] font-bold leading-tight ${state.active ? "text-white" : "text-[#545d68]"}`}>
                    {layer.name}
                  </span>
                  <span className={`text-[7px] sm:text-[8px] ${state.active ? "text-white/70" : "text-[#545d68]/60"}`}>
                    {layer.pdu}
                  </span>
                </div>

                {/* Protocol + PDU blocks OR disabled state */}
                <div className={`flex-1 flex items-center min-w-0 py-2 px-2 sm:px-3 transition-all duration-300 ${
                  state.active ? "bg-[#22272e]" : "bg-[#1c2128]"
                }`}>
                  {state.active ? (
                    <div className="flex flex-col gap-1 min-w-0 w-full">
                      {/* Protocol label + status */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] sm:text-xs font-semibold" style={{ color: layer.color }}>
                          ✓
                        </span>
                        <span className="text-[9px] sm:text-[11px] text-foreground font-medium truncate">
                          {state.protocol}
                        </span>
                      </div>
                      {/* Packet blocks */}
                      {showBlocks && blocks.length > 0 && (
                        <div className="flex gap-[2px] items-center overflow-x-auto pb-0.5">
                          {blocks.map((block, j) => (
                            <div
                              key={j}
                              className="h-[18px] sm:h-5 flex items-center justify-center text-[7px] sm:text-[8px] font-mono font-bold text-white rounded-[3px] px-1 sm:px-1.5 whitespace-nowrap flex-shrink-0"
                              style={{ backgroundColor: block.color }}
                            >
                              {block.label}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Disabled / not used */
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] sm:text-xs text-[#e0544488]">✕</span>
                      <span className="text-[9px] sm:text-[10px] text-[#545d68] italic">
                        No utilizada en este paso
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Info panel ──────────────────────────────────────────────────── */}
      <div className="rounded-lg border border-border bg-background p-4 space-y-3">
        {/* Description */}
        <p className="text-sm text-foreground leading-relaxed">{step.description}</p>

        {/* Packet detail (collapsible) */}
        <details className="group">
          <summary className="cursor-pointer text-xs font-semibold text-muted hover:text-foreground transition-colors select-none">
            📦 Ver detalle del paquete
          </summary>
          <pre className="mt-2 font-mono text-xs bg-white/60 dark:bg-white/[0.07] rounded p-3 text-muted whitespace-pre-wrap leading-relaxed">
            {step.detail}
          </pre>
        </details>
      </div>

      {/* ── Controls ────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={prev}
          disabled={stepIdx === 0}
          className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-border transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        {/* Step dots — compact on mobile */}
        <div className="flex flex-wrap justify-center gap-1 flex-1 max-w-xs sm:max-w-none">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStepIdx(i)}
              aria-label={`Ir al paso ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === stepIdx ? 18 : 7,
                height: 7,
                background:
                  i === stepIdx
                    ? currentPhase?.color || "#818cf8"
                    : i < stepIdx
                    ? "#57ab5a"
                    : "#444c56",
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={stepIdx === STEPS.length - 1}
          className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-border transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span className="hidden sm:inline">Siguiente</span>
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
          Reiniciar
        </button>
      </div>
    </div>
  );
}

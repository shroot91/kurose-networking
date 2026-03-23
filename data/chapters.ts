export interface Chapter {
  number: number;
  title: string;
  slug: string;
  description: string;
  color: string;
  colorLight: string;
  icon: string;
  sections: { id: string; title: string }[];
}

export const chapters: Chapter[] = [
  {
    number: 1,
    title: "Redes de Computadoras e Internet",
    slug: "capitulo-1",
    description:
      "Qué es Internet, conmutación de paquetes vs circuitos, retardos, pérdida, throughput y el modelo de capas de protocolos.",
    color: "from-blue-600 to-blue-800",
    colorLight: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800",
    icon: "Globe",
    sections: [
      { id: "que-es-internet", title: "¿Qué es Internet?" },
      { id: "borde-de-la-red", title: "Borde de la Red" },
      { id: "nucleo-de-la-red", title: "Núcleo de la Red" },
      { id: "retardo-perdida-throughput", title: "Retardo, Pérdida y Throughput" },
      { id: "capas-de-protocolos", title: "Capas de Protocolos" },
      { id: "quiz", title: "Quiz del Capítulo" },
    ],
  },
  {
    number: 2,
    title: "Capa de Aplicación",
    slug: "capitulo-2",
    description:
      "Arquitecturas cliente-servidor y P2P, HTTP, DNS, SMTP, correo electrónico y programación de sockets.",
    color: "from-emerald-600 to-emerald-800",
    colorLight: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800",
    icon: "AppWindow",
    sections: [
      { id: "principios-aplicaciones", title: "Principios de Aplicaciones de Red" },
      { id: "web-http", title: "La Web y HTTP" },
      { id: "correo-electronico", title: "Correo Electrónico" },
      { id: "dns", title: "DNS" },
      { id: "sockets", title: "Programación de Sockets" },
      { id: "quiz", title: "Quiz del Capítulo" },
    ],
  },
  {
    number: 3,
    title: "Capa de Transporte",
    slug: "capitulo-3",
    description:
      "UDP, TCP, transferencia confiable de datos, control de flujo, control de congestión y el three-way handshake.",
    color: "from-orange-600 to-orange-800",
    colorLight: "bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:border-orange-800",
    icon: "ArrowLeftRight",
    sections: [
      { id: "servicios-transporte", title: "Servicios de la Capa de Transporte" },
      { id: "udp", title: "UDP: Transporte sin Conexión" },
      { id: "transferencia-confiable", title: "Transferencia de Datos Confiable" },
      { id: "tcp", title: "TCP: Transporte Orientado a Conexión" },
      { id: "control-congestion", title: "Control de Congestión" },
      { id: "ventana-deslizante", title: "Ventana Deslizante" },
      { id: "quiz", title: "Quiz del Capítulo" },
    ],
  },
  {
    number: 4,
    title: "Capa de Red",
    slug: "capitulo-4",
    description: "IPv4, IPv6, direccionamiento, CIDR, NAT, DHCP, algoritmos de enrutamiento (Dijkstra, Bellman-Ford) y protocolos BGP, OSPF.",
    color: "from-violet-600 to-violet-800",
    colorLight: "bg-violet-50 text-violet-800 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800",
    icon: "Network",
    sections: [
      { id: "introduccion-red", title: "Introducción a la Capa de Red" },
      { id: "inside-router", title: "Arquitectura de un Router" },
      { id: "ipv4", title: "IPv4: Direccionamiento" },
      { id: "nat-dhcp", title: "NAT y DHCP" },
      { id: "ipv6", title: "IPv6" },
      { id: "enrutamiento", title: "Algoritmos de Enrutamiento" },
      { id: "quiz", title: "Quiz del Capítulo" },
    ],
  },
];

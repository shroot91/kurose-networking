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
    colorLight: "bg-blue-50 text-blue-800 border-blue-200",
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
    colorLight: "bg-emerald-50 text-emerald-800 border-emerald-200",
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
    colorLight: "bg-orange-50 text-orange-800 border-orange-200",
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
];

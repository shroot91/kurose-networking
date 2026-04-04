import { type Chapter } from "@/data/chapters";

export const soChapters: Chapter[] = [
  {
    number: 1,
    title: "Introducción a los Sistemas Operativos",
    slug: "so/capitulo-1",
    description:
      "¿Qué es un SO y qué problema resuelve? Historia por generaciones, tipos de sistemas operativos, conceptos de hardware relevantes, llamadas al sistema y estructuras internas del kernel.",
    color: "from-amber-600 to-amber-800",
    colorLight:
      "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800",
    icon: "Cpu",
    sections: [
      { id: "que-es-so", title: "¿Qué es un SO?" },
      { id: "historia", title: "Historia por Generaciones" },
      { id: "tipos-so", title: "Tipos de Sistemas Operativos" },
      { id: "hardware-conceptos", title: "Conceptos de Hardware" },
      { id: "llamadas-sistema", title: "Llamadas al Sistema" },
      { id: "estructura-so", title: "Estructura del SO" },
      { id: "quiz", title: "Quiz del Capítulo" },
    ],
  },
  {
    number: 2,
    title: "Procesos e Hilos",
    slug: "so/capitulo-2",
    description:
      "Modelo de proceso, PCB, estados y ciclo de vida, context switching, hilos vs procesos, IPC, condiciones de carrera, mutex, semáforos, deadlocks y algoritmos de scheduling.",
    color: "from-orange-600 to-orange-800",
    colorLight:
      "bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:border-orange-800",
    icon: "GitBranch",
    sections: [
      { id: "modelo-proceso", title: "Modelo de Proceso" },
      { id: "estados-proceso", title: "Estados y Ciclo de Vida" },
      { id: "hilos", title: "Hilos (Threads)" },
      { id: "comunicacion-procesos", title: "Comunicación entre Procesos" },
      { id: "sincronizacion", title: "Sincronización y Exclusión Mutua" },
      { id: "deadlocks", title: "Deadlocks" },
      { id: "scheduling", title: "Algoritmos de Scheduling" },
      { id: "quiz", title: "Quiz del Capítulo" },
    ],
  },
  {
    number: 3,
    title: "Gestión de Memoria",
    slug: "so/capitulo-3",
    description:
      "Espacio de direcciones, paginación, TLB, tablas de páginas multinivel, memoria virtual con demand paging, algoritmos de reemplazo de páginas (FIFO, LRU, Clock) y thrashing.",
    color: "from-lime-600 to-lime-800",
    colorLight:
      "bg-lime-50 text-lime-800 border-lime-200 dark:bg-lime-950/30 dark:text-lime-300 dark:border-lime-800",
    icon: "MemoryStick",
    sections: [
      { id: "espacio-direcciones", title: "Espacio de Direcciones" },
      { id: "paginacion", title: "Paginación" },
      { id: "tablas-paginas", title: "Tablas de Páginas y TLB" },
      { id: "memoria-virtual", title: "Memoria Virtual" },
      { id: "reemplazo-paginas", title: "Algoritmos de Reemplazo" },
      { id: "segmentacion", title: "Segmentación" },
      { id: "quiz", title: "Quiz del Capítulo" },
    ],
  },
  {
    number: 4,
    title: "Sistemas de Archivos",
    slug: "so/capitulo-4",
    description:
      "Abstracción de archivos, inodos Unix, directorios, implementación de FAT y ext4, journaling para tolerancia a fallos, RAID y sistemas de archivos en red.",
    color: "from-teal-600 to-teal-800",
    colorLight:
      "bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-950/30 dark:text-teal-300 dark:border-teal-800",
    icon: "HardDrive",
    sections: [
      { id: "abstraccion-archivos", title: "Abstracción de Archivos" },
      { id: "inodos", title: "Inodos y Estructura Unix" },
      { id: "directorios", title: "Directorios y Rutas" },
      { id: "implementacion-fs", title: "Implementación: FAT y ext4" },
      { id: "journaling", title: "Journaling y Fiabilidad" },
      { id: "raid", title: "RAID" },
      { id: "quiz", title: "Quiz del Capítulo" },
    ],
  },
  {
    number: 5,
    title: "E/S y Drivers de Dispositivos",
    slug: "so/capitulo-5",
    description:
      "Hardware de E/S, software en capas, polling vs interrupciones vs DMA, scheduling de disco (SSTF, SCAN, C-SCAN), relojes, buffers y la arquitectura de drivers de dispositivos.",
    color: "from-violet-600 to-violet-800",
    colorLight:
      "bg-violet-50 text-violet-800 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800",
    icon: "Cpu",
    sections: [
      { id: "hardware-io", title: "Hardware de E/S" },
      { id: "software-io", title: "Software de E/S en Capas" },
      { id: "interrupciones-dma", title: "Interrupciones y DMA" },
      { id: "discos", title: "Discos y Scheduling" },
      { id: "relojes", title: "Relojes y Temporización" },
      { id: "drivers", title: "Drivers de Dispositivos" },
      { id: "quiz", title: "Quiz del Capítulo" },
    ],
  },
  {
    number: 6,
    title: "Seguridad en Sistemas Operativos",
    slug: "so/capitulo-6",
    description:
      "Fundamentos de seguridad (CIA), criptografía simétrica y asimétrica, control de acceso (DAC, MAC, RBAC), vulnerabilidades clásicas (buffer overflow), malware y mecanismos de defensa.",
    color: "from-rose-600 to-rose-800",
    colorLight:
      "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-800",
    icon: "Shield",
    sections: [
      { id: "conceptos-seguridad", title: "Fundamentos de Seguridad" },
      { id: "criptografia", title: "Criptografía" },
      { id: "control-acceso", title: "Control de Acceso" },
      { id: "vulnerabilidades", title: "Vulnerabilidades Comunes" },
      { id: "malware", title: "Malware" },
      { id: "defensa", title: "Firewalls y Defensa" },
      { id: "quiz", title: "Quiz del Capítulo" },
    ],
  },
];

import Link from "next/link";
import { BookOpen, Cpu, ChevronRight, GraduationCap } from "lucide-react";

const subjects = [
  {
    href: "/redes",
    icon: BookOpen,
    title: "Redes de Computadoras",
    subtitle: "Kurose & Ross",
    description:
      "Internet, HTTP, DNS, TCP, IP, Ethernet, WiFi y más. 6 capítulos con diagramas interactivos, ejemplos y quizzes.",
    color: "from-blue-600 to-blue-800",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-300",
    badge: "6 capítulos disponibles",
    badgeColor: "bg-blue-500/20 text-blue-300",
    available: true,
  },
  {
    href: "/so",
    icon: Cpu,
    title: "Sistemas Operativos",
    subtitle: "Tanenbaum",
    description:
      "Procesos, memoria virtual, sistemas de archivos, scheduling, sincronización y seguridad.",
    color: "from-amber-600 to-amber-800",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-300",
    badge: "Próximamente",
    badgeColor: "bg-amber-500/20 text-amber-400",
    available: false,
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-950 dark:from-[#161b22] dark:to-[#0d1117] text-white py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-white/10 p-4">
              <GraduationCap className="h-10 w-10 text-white/80" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Materias Interactivas
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-2">
            Conceptos complejos explicados con diagramas, analogías y ejemplos reales
          </p>
          <p className="text-sm text-white/40">
            Material educativo basado en los libros de referencia de cada materia
          </p>
        </div>
      </div>

      {/* Subject cards */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-10 text-foreground">
          Elegí una materia
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {subjects.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.href}
                href={s.href}
                className={`group relative flex flex-col rounded-2xl overflow-hidden border border-border bg-card shadow-sm transition-all ${
                  s.available
                    ? "hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                    : "cursor-default"
                }`}
              >
                {/* Colored top band */}
                <div className={`bg-gradient-to-r ${s.color} p-6 pb-8`}>
                  <div className="flex items-start justify-between">
                    <div className={`rounded-xl ${s.iconBg} p-3`}>
                      <Icon className={`h-7 w-7 ${s.iconColor}`} />
                    </div>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${s.badgeColor}`}
                    >
                      {s.badge}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mt-4 mb-0.5">
                    {s.title}
                  </h3>
                  <p className="text-white/60 text-sm">{s.subtitle}</p>
                </div>

                {/* Description */}
                <div className="flex-1 p-6 flex items-end justify-between gap-4">
                  <p className="text-sm text-muted leading-relaxed">
                    {s.description}
                  </p>
                  {s.available && (
                    <ChevronRight className="h-5 w-5 text-muted group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Features strip */}
        <div className="mt-20 grid gap-8 sm:grid-cols-3 text-center">
          <div>
            <div className="inline-flex rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 mb-3">
              <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground mb-1">Diagramas Interactivos</h3>
            <p className="text-sm text-muted">
              Visualizá protocolos y arquitecturas con animaciones paso a paso
            </p>
          </div>
          <div>
            <div className="inline-flex rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-3 mb-3">
              <svg className="h-6 w-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground mb-1">Ejemplos Completos</h3>
            <p className="text-sm text-muted">
              Cada concepto incluye ejemplos resueltos con cálculos detallados
            </p>
          </div>
          <div>
            <div className="inline-flex rounded-full bg-orange-100 dark:bg-orange-900/30 p-3 mb-3">
              <svg className="h-6 w-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground mb-1">Cuestionarios</h3>
            <p className="text-sm text-muted">
              Evaluá tu comprensión con quizzes al final de cada capítulo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

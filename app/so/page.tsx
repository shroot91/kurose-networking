import Link from "next/link";
import { ArrowLeft, Cpu, Construction } from "lucide-react";

export const metadata = {
  title: "Sistemas Operativos — Tanenbaum",
  description:
    "Aprende sistemas operativos de forma interactiva basándote en el libro de Tanenbaum",
};

const plannedChapters = [
  {
    number: 1,
    title: "Introducción a los SO",
    description: "Historia, conceptos básicos, tipos de sistemas operativos y llamadas al sistema.",
    color: "from-amber-600 to-amber-800",
  },
  {
    number: 2,
    title: "Procesos e Hilos",
    description: "Modelo de proceso, comunicación entre procesos, scheduling y deadlocks.",
    color: "from-orange-600 to-orange-800",
  },
  {
    number: 3,
    title: "Gestión de Memoria",
    description: "Memoria virtual, paginación, segmentación, reemplazo de páginas.",
    color: "from-red-600 to-red-800",
  },
  {
    number: 4,
    title: "Sistemas de Archivos",
    description: "Implementación de filesystems, inodos, journaling, RAID.",
    color: "from-rose-600 to-rose-800",
  },
  {
    number: 5,
    title: "I/O y Drivers",
    description: "Software de E/S, drivers de dispositivos, discos, relojes, terminales.",
    color: "from-pink-600 to-pink-800",
  },
  {
    number: 6,
    title: "Seguridad",
    description: "Modelos de seguridad, criptografía, exploits, malware y defensa.",
    color: "from-purple-600 to-purple-800",
  },
];

export default function SOPage() {
  return (
    <div>
      {/* Back to home */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors w-fit"
          >
            <ArrowLeft className="h-4 w-4" />
            Todas las materias
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-700 to-slate-900 dark:from-[#1c1610] dark:to-[#0d1117] text-white py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-white/10 p-4">
              <Cpu className="h-10 w-10 text-amber-300" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Sistemas Operativos
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-2">
            Procesos, memoria, filesystems y más
          </p>
          <p className="text-sm text-white/50">
            Basado en &quot;Modern Operating Systems&quot; — Andrew S. Tanenbaum
          </p>
        </div>
      </div>

      {/* Coming soon notice */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
        <div className="flex items-center gap-3 rounded-xl border border-amber-300/30 bg-amber-50/50 dark:bg-amber-900/10 p-4 mb-12">
          <Construction className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
          <p className="text-sm text-amber-700 dark:text-amber-300">
            <span className="font-semibold">En construcción.</span> Los capítulos se van a ir
            publicando próximamente. Por ahora podés ver el plan de contenidos abajo.
          </p>
        </div>

        {/* Planned chapters grid */}
        <h2 className="text-2xl font-bold text-center mb-10 text-foreground">
          Plan de Contenidos
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plannedChapters.map((ch) => (
            <div
              key={ch.number}
              className="rounded-2xl border border-border bg-card p-6 opacity-60"
            >
              <div
                className={`inline-flex rounded-xl bg-gradient-to-r ${ch.color} p-3 text-white mb-4`}
              >
                <Cpu className="h-6 w-6" />
              </div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">
                Capítulo {ch.number}
              </p>
              <h3 className="text-lg font-bold text-foreground mb-2">{ch.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{ch.description}</p>
              <div className="mt-4">
                <span className="text-xs px-2 py-0.5 rounded-full bg-border text-muted">
                  Próximamente
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

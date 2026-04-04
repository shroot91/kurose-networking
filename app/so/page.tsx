import Link from "next/link";
import { soChapters } from "@/data/so-chapters";
import {
  ArrowLeft,
  Cpu,
  GitBranch,
  HardDrive,
  Shield,
  MemoryStick,
  ChevronRight,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  GitBranch,
  HardDrive,
  Shield,
  MemoryStick,
};

export const metadata = {
  title: "Sistemas Operativos — Tanenbaum",
  description:
    "Aprende sistemas operativos de forma interactiva basándote en Modern Operating Systems de Tanenbaum",
};

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
            Procesos, memoria, filesystems y seguridad, explicados desde adentro
          </p>
          <p className="text-sm text-white/50">
            Basado en &quot;Modern Operating Systems&quot; — Andrew S. Tanenbaum
          </p>
        </div>
      </div>

      {/* Chapters grid */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-10 text-foreground">
          Módulos de Estudio
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {soChapters.map((ch) => {
            const Icon = iconMap[ch.icon] || Cpu;
            return (
              <Link
                key={ch.slug}
                href={`/${ch.slug}`}
                className="group block rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div
                  className={`inline-flex rounded-xl bg-gradient-to-r ${ch.color} p-3 text-white mb-4`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">
                  Capítulo {ch.number}
                </p>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {ch.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {ch.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {ch.sections.slice(0, -1).map((s) => (
                    <span
                      key={s.id}
                      className="text-xs px-2 py-0.5 rounded-full bg-background text-muted"
                    >
                      {s.title}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Feature strip */}
        <div className="mt-16 p-6 rounded-2xl border border-border bg-card flex items-center gap-4">
          <div className="rounded-full bg-amber-500/10 p-3 shrink-0">
            <ChevronRight className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="font-semibold text-foreground">
              Cada capítulo incluye diagramas, ejemplos resueltos y quiz de 20 preguntas
            </p>
            <p className="text-sm text-muted mt-0.5">
              Basado en Modern Operating Systems — Andrew S. Tanenbaum, 4ta edición
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

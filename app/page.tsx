import Link from "next/link";
import { chapters } from "@/data/chapters";
import { Globe, AppWindow, ArrowLeftRight, BookOpen, Network } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  AppWindow,
  ArrowLeftRight,
  Network,
};

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary to-slate-900 dark:from-[#161b22] dark:to-[#0d1117] text-white py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-white/10 p-4">
              <BookOpen className="h-10 w-10 text-accent-light" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Redes de Computadoras
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-2">
            Aprende redes de forma interactiva y visual
          </p>
          <p className="text-sm text-white/50">
            Basado en &quot;Computer Networking: A Top-Down Approach&quot; — Kurose &amp; Ross
          </p>
        </div>
      </div>

      {/* Chapters grid */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-10 text-foreground">Módulos de Estudio</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((ch) => {
            const Icon = iconMap[ch.icon] || Globe;
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
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary-light transition-colors">
                  {ch.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{ch.description}</p>
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

        {/* Features */}
        <div className="mt-20 grid gap-8 sm:grid-cols-3 text-center">
          <div>
            <div className="inline-flex rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 mb-3">
              <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground mb-1">Diagramas Interactivos</h3>
            <p className="text-sm text-muted">
              Visualiza protocolos, paquetes y arquitecturas con animaciones paso a paso
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
              Evalúa tu comprensión con quizzes interactivos al final de cada capítulo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

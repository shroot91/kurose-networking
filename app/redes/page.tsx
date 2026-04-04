import Link from "next/link";
import { chapters } from "@/data/chapters";
import {
  Globe,
  AppWindow,
  ArrowLeftRight,
  BookOpen,
  Network,
  Settings,
  Cable,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  AppWindow,
  ArrowLeftRight,
  Network,
  Settings,
  Cable,
};

export const metadata = {
  title: "Redes de Computadoras — Kurose & Ross",
  description:
    "Aprende redes de forma interactiva basándote en el libro de Kurose y Ross",
};

export default function RedesPage() {
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
      <div className="bg-gradient-to-br from-blue-700 to-slate-900 dark:from-[#161b22] dark:to-[#0d1117] text-white py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-white/10 p-4">
              <BookOpen className="h-10 w-10 text-blue-300" />
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
        <h2 className="text-2xl font-bold text-center mb-10 text-foreground">
          Módulos de Estudio
        </h2>
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

        {/* Retrospectiva banner */}
        <div className="mt-10">
          <Link
            href="/redes/retrospectiva"
            className="flex items-center gap-4 rounded-xl border border-border bg-card hover:bg-border/30 transition-colors p-6 group"
          >
            <div className="rounded-full bg-primary/10 p-3 shrink-0">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                Retrospectiva: Un día en la vida de una solicitud web
              </p>
              <p className="text-sm text-muted mt-0.5">
                Seguí cada protocolo desde que tu laptop se conecta a WiFi hasta que carga
                google.com — DHCP → ARP → DNS → TCP → TLS → HTTP/2
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted group-hover:text-primary transition-colors shrink-0 ml-auto" />
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";
import { WebRequestJourney } from "@/components/diagrams/web-request-journey";
import { ComparisonTable } from "@/components/content/comparison-table";
import { InfoCallout } from "@/components/content/info-callout";

export const metadata = {
  title: "Retrospectiva: Un día en la vida de una solicitud web — Kurose & Ross",
  description:
    "Seguí cada protocolo que se ejecuta cuando tu laptop se conecta a WiFi y abre google.com: DHCP, ARP, DNS, TCP, TLS 1.3, HTTP/2.",
};

const protocolRows: string[][] = [
  ["DHCP",        "Aplicación",     "UDP 67/68",   "Obtener IP, gateway y DNS al conectarse a la red"],
  ["ARP",         "Enlace",         "Broadcast",   "Resolver la MAC del gateway para enviar tramas"],
  ["DNS",         "Aplicación",     "UDP 53",      "Traducir nombre de dominio → dirección IP"],
  ["TCP",         "Transporte",     "—",           "Garantizar entrega confiable, orden y control de flujo"],
  ["TLS 1.3",     "Sesión/App",     "—",           "Cifrado end-to-end para HTTPS (sobre TCP)"],
  ["HTTP/2",      "Aplicación",     "TCP 443",     "Transferencia de contenido web con multiplexing"],
  ["Ethernet",    "Enlace",         "—",           "Frames en la LAN cableada (switch ↔ router)"],
  ["WiFi 802.11", "Enlace/Física",  "—",           "Acceso inalámbrico desde el laptop hasta el AP"],
  ["NAT",         "Red",            "—",           "Traducción de IP privada a pública en el router"],
  ["IP",          "Red",            "—",           "Routing de paquetes extremo a extremo por Internet"],
];

export default function RetrospectivaPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-4 flex items-center gap-3">
          <Link
            href="/redes"
            className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a Redes
          </Link>
          <span className="text-border">|</span>
          <span className="text-xs text-muted">Kurose &amp; Ross — Capítulo 6</span>
        </div>
      </div>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-full bg-primary/10 p-2.5">
              <Layers className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              Retrospectiva Interactiva
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 leading-tight">
            Un día en la vida de una solicitud de página web
          </h1>
          <p className="text-lg text-muted max-w-3xl leading-relaxed">
            Cada protocolo que se ejecuta cuando abrís{" "}
            <code className="font-mono text-sm bg-white/60 dark:bg-white/[0.07] px-1.5 py-0.5 rounded text-foreground">
              google.com
            </code>{" "}
            en tu laptop
          </p>
          <p className="text-sm text-muted mt-4 max-w-3xl leading-relaxed">
            Esta retrospectiva traza el <strong className="text-foreground">stack completo de protocolos</strong> desde
            que una laptop de estudiante se conecta a la WiFi universitaria hasta que la página de Google carga
            completamente — incluyendo DHCP, ARP, DNS, el three-way handshake TCP, el TLS handshake y la
            transferencia HTTP/2. Está basada en la sección &quot;A Day in the Life of a Web Request&quot; del
            Capítulo 6 de Kurose &amp; Ross.
          </p>
        </div>
      </div>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 space-y-12">

        {/* Interactive diagram */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">
            Diagrama Interactivo — 20 pasos
          </h2>
          <p className="text-sm text-muted mb-6 leading-relaxed">
            Navegá paso a paso con los botones <strong className="text-foreground">Anterior</strong> y{" "}
            <strong className="text-foreground">Siguiente</strong>, o hacé clic en cualquier punto del
            recorrido. Cada paso muestra qué protocolos están activos, los campos clave del paquete y
            qué actores participan.
          </p>
          <WebRequestJourney />
        </section>

        {/* Protocol summary table */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Resumen de Protocolos
          </h2>
          <p className="text-sm text-muted mb-4 leading-relaxed">
            Todos los protocolos que intervienen en una solicitud web típica, ordenados por capa del
            modelo TCP/IP.
          </p>
          <ComparisonTable
            headers={["Protocolo", "Capa", "Puerto / Tipo", "Cuándo se usa"]}
            rows={protocolRows}
          />
        </section>

        {/* Key insight callout */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">
            ¿Qué aprendiste?
          </h2>
          <div className="space-y-4">
            <InfoCallout variant="tip" title="La coordinación invisible">
              Cada vez que abrís una página web, entre <strong>6 y 8 protocolos distintos</strong> se
              coordinan de forma invisible en menos de 2 segundos. DHCP asigna tu dirección IP, ARP
              resuelve la MAC del gateway, DNS traduce el nombre a IP, TCP establece la conexión
              confiable, TLS 1.3 cifra todo el canal, y HTTP/2 transfiere el contenido con multiplexing
              eficiente.
            </InfoCallout>
            <InfoCallout variant="info" title="La clave del diseño en capas">
              Cada protocolo hace una sola cosa bien y depende de los servicios de la capa inferior.
              TCP no sabe nada de DNS. HTTP no sabe nada de TCP. Esta separación de responsabilidades
              es lo que hace que Internet sea extensible y robusta: podés reemplazar WiFi por Ethernet
              o 5G sin cambiar nada en las capas superiores.
            </InfoCallout>
            <InfoCallout variant="warning" title="NAT: el protocolo que no debería existir">
              NAT (Network Address Translation) es un parche necesario por el agotamiento de IPv4. El
              router modifica los paquetes al vuelo, rompiendo el principio de end-to-end de Internet.
              IPv6 fue diseñado para eliminar la necesidad de NAT dando a cada dispositivo una IP
              pública única.
            </InfoCallout>
          </div>
        </section>

        {/* Footer nav */}
        <div className="border-t border-border pt-8 flex items-center justify-between">
          <Link
            href="/redes"
            className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a Redes
          </Link>
          <span className="text-xs text-muted">
            Kurose &amp; Ross — Capítulo 6: Enlace de Datos
          </span>
        </div>
      </div>
    </div>
  );
}

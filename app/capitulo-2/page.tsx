import { chapters } from "@/data/chapters";
import { ChapterLayout } from "@/components/layout/chapter-layout";
import { SectionBlock } from "@/components/content/section-block";
import { ConceptCard } from "@/components/content/concept-card";
import { ExampleBlock } from "@/components/content/example-block";
import { ComparisonTable } from "@/components/content/comparison-table";
import { InfoCallout } from "@/components/content/info-callout";
import { ClientServerDiagram } from "@/components/diagrams/client-server";
import { HttpExchange } from "@/components/diagrams/http-exchange";
import { DnsResolution } from "@/components/diagrams/dns-resolution";
import { QuizContainer } from "@/components/quiz/quiz-container";
import { quizCh2 } from "@/data/quiz-ch2";
import {
  Globe,
  Server,
  Mail,
  Search,
  Code,
  FileText,
  ArrowRightLeft,
  Network,
} from "lucide-react";

const chapter = chapters[1];

export default function Capitulo2() {
  return (
    <ChapterLayout chapter={chapter}>
      {/* ============================================ */}
      {/* SECCIÓN 1: Principios de Aplicaciones de Red */}
      {/* ============================================ */}
      <SectionBlock
        id="principios-aplicaciones"
        title="Principios de Aplicaciones de Red"
      >
        <p className="text-muted leading-relaxed">
          Las aplicaciones de red son la razón de ser de Internet. Cuando
          desarrollamos una aplicación de red, escribimos programas que se
          ejecutan en <strong>sistemas finales</strong> y se comunican entre sí a
          través de la red. No necesitamos escribir software para los routers.
        </p>

        <ClientServerDiagram />

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Arquitectura Cliente-Servidor"
            icon={Server}
            color="bg-emerald-50 text-emerald-700 border-emerald-200"
          >
            <ul className="space-y-1.5 list-disc list-inside">
              <li>El servidor está <strong>siempre activo</strong> con IP fija</li>
              <li>Los clientes inician la comunicación</li>
              <li>Los clientes <strong>no se comunican entre sí</strong></li>
              <li>Escalabilidad mediante data centers</li>
              <li>Ejemplos: Web, Email, DNS</li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="Arquitectura P2P"
            icon={Network}
            color="bg-orange-50 text-orange-700 border-orange-200"
          >
            <ul className="space-y-1.5 list-disc list-inside">
              <li>No hay servidor siempre activo</li>
              <li>Los peers se comunican <strong>directamente</strong></li>
              <li>Cada peer es cliente y servidor</li>
              <li><strong>Auto-escalable:</strong> cada peer aporta capacidad</li>
              <li>Ejemplos: BitTorrent, Skype (parcial), blockchain</li>
            </ul>
          </ConceptCard>
        </div>

        <InfoCallout variant="info" title="BitTorrent: P2P en la práctica">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>El archivo se divide en <strong>chunks</strong> (típicamente 256 KB)</li>
            <li>Un <strong>tracker</strong> lleva registro de los peers que tienen partes del archivo (en versiones modernas, reemplazado por DHT — Distributed Hash Table)</li>
            <li><strong>Tit-for-Tat</strong>: cada peer prioriza enviar datos a los peers que más le envían a él. Los 3-4 peers que más le dan son sus &quot;unchoked peers&quot;. Cada 30 segundos, &quot;optimistically unchokes&quot; un peer aleatorio para descubrir mejores vecinos.</li>
            <li><strong>Rarest First</strong>: el cliente siempre pide primero los chunks que menos peers tienen. Esto aumenta la disponibilidad global del archivo.</li>
            <li><em>Analogía:</em> Es como un trueque — compartís lo que tenés con quienes te comparten, y todos intentan conseguir primero las piezas más escasas para que el puzzle completo esté más distribuido.</li>
          </ul>
        </InfoCallout>

        <InfoCallout variant="info" title="Sockets: La interfaz de la aplicación con la red">
          <p>
            Un <strong>socket</strong> es la interfaz entre la capa de aplicación
            y la capa de transporte. Es como una puerta: la aplicación envía
            mensajes por la puerta y confía en que la infraestructura de
            transporte los lleve al socket del destino. Se identifica por{" "}
            <strong>dirección IP + número de puerto</strong>.
          </p>
        </InfoCallout>

        <ComparisonTable
          headers={["Servicio", "Puerto", "Protocolo Transporte"]}
          rows={[
            ["HTTP", "80", "TCP"],
            ["HTTPS", "443", "TCP"],
            ["SMTP", "25", "TCP"],
            ["DNS", "53", "UDP (generalmente)"],
            ["FTP", "21", "TCP"],
            ["SSH", "22", "TCP"],
          ]}
        />
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 2: La Web y HTTP */}
      {/* ============================================ */}
      <SectionBlock id="web-http" title="La Web y HTTP">
        <p className="text-muted leading-relaxed">
          <strong>HTTP</strong> (HyperText Transfer Protocol) es el protocolo de
          la capa de aplicación de la Web. Define cómo los clientes web
          (navegadores) solicitan páginas a los servidores web y cómo los
          servidores las transfieren.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-4">
          Intercambio HTTP paso a paso
        </h3>
        <HttpExchange />

        <div className="grid gap-4 sm:grid-cols-2 mt-6">
          <ConceptCard
            title="Métodos HTTP"
            icon={ArrowRightLeft}
            color="bg-blue-50 text-blue-700 border-blue-200"
          >
            <ul className="space-y-1 list-disc list-inside">
              <li><strong>GET:</strong> Solicita un recurso (el más común)</li>
              <li><strong>POST:</strong> Envía datos al servidor (formularios)</li>
              <li><strong>PUT:</strong> Sube un archivo/recurso al servidor</li>
              <li><strong>DELETE:</strong> Elimina un recurso del servidor</li>
              <li><strong>HEAD:</strong> Como GET pero solo devuelve cabeceras</li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="Códigos de Estado HTTP"
            icon={FileText}
            color="bg-purple-50 text-purple-700 border-purple-200"
          >
            <ul className="space-y-1 list-disc list-inside">
              <li><strong>200 OK:</strong> Solicitud exitosa</li>
              <li><strong>301 Moved:</strong> Recurso movido permanentemente</li>
              <li><strong>304 Not Modified:</strong> Recurso en caché válido</li>
              <li><strong>404 Not Found:</strong> Recurso no encontrado</li>
              <li><strong>500 Internal Error:</strong> Error del servidor</li>
            </ul>
          </ConceptCard>
        </div>

        <ComparisonTable
          headers={["Característica", "HTTP/1.0", "HTTP/1.1", "HTTP/2"]}
          rows={[
            ["Conexiones", "No persistentes", "Persistentes (default)", "Persistentes multiplexadas"],
            ["RTTs por objeto", "2 RTT cada uno", "1 RTT cada uno", "Paralelo en 1 conexión"],
            ["Pipelining", "No", "Sí (opcional)", "Sí (nativo)"],
            ["Compresión headers", "No", "No", "Sí (HPACK)"],
            ["Server Push", "No", "No", "Sí"],
          ]}
        />

        <ExampleBlock title="Tiempo de descarga con HTTP no persistente vs persistente">
          <p>
            Una página web tiene 1 archivo HTML base y <strong>10 objetos
            embebidos</strong>. RTT = 100 ms.
          </p>
          <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 dark:bg-white/[0.07] rounded p-3">
            <p className="font-bold">HTTP No Persistente (sin conexiones paralelas):</p>
            <p>Cada objeto = 2 RTT (1 TCP handshake + 1 request/response)</p>
            <p>Total = 11 objetos × 2 RTT = 22 × 100 ms = <strong>2,200 ms</strong></p>
            <p className="pt-2 border-t border-amber-300 font-bold">HTTP Persistente:</p>
            <p>1 TCP handshake = 1 RTT</p>
            <p>11 objetos × 1 RTT = 11 RTT</p>
            <p>Total = 12 RTT × 100 ms = <strong>1,200 ms</strong></p>
            <p className="pt-2 border-t border-amber-300 font-bold">HTTP/2 Multiplexado:</p>
            <p>1 TCP handshake + todos los objetos en paralelo</p>
            <p>Total ≈ 1 RTT + 1-2 RTT = <strong>~200-300 ms</strong></p>
          </div>
        </ExampleBlock>

        <InfoCallout variant="tip" title="Cookies y Estado">
          <p>
            HTTP es <strong>stateless</strong> (sin estado): el servidor no
            recuerda interacciones previas. Las <strong>cookies</strong> permiten
            a los sitios rastrear usuarios. El servidor envía un{" "}
            <code className="bg-card dark:bg-white/10 px-1 rounded">Set-Cookie</code> en la
            respuesta, y el navegador incluye esa cookie en solicitudes futuras
            al mismo sitio.
          </p>
        </InfoCallout>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 3: Correo Electrónico */}
      {/* ============================================ */}
      <SectionBlock id="correo-electronico" title="Correo Electrónico">
        <p className="text-muted leading-relaxed">
          El sistema de correo electrónico tiene tres componentes principales:{" "}
          <strong>agentes de usuario</strong> (clientes de correo),{" "}
          <strong>servidores de correo</strong>, y <strong>SMTP</strong> (el
          protocolo para enviar correo).
        </p>

        {/* SMTP Flow diagram */}
        <div className="my-6">
          <svg viewBox="0 0 600 160" className="w-full max-w-2xl mx-auto">
            {/* User agents and servers */}
            {[
              { x: 50, y: 80, label: "Remitente", sub: "Gmail App", color: "#3b82f6", w: 70 },
              { x: 200, y: 80, label: "Servidor", sub: "Gmail", color: "#8b5cf6", w: 70 },
              { x: 400, y: 80, label: "Servidor", sub: "Yahoo", color: "#8b5cf6", w: 70 },
              { x: 550, y: 80, label: "Destinatario", sub: "Yahoo App", color: "#10b981", w: 70 },
            ].map((n, i) => (
              <g key={i}>
                <rect x={n.x - n.w / 2} y={n.y - 25} width={n.w} height={50} rx={8} fill={n.color} />
                <text x={n.x} y={n.y - 5} textAnchor="middle" fill="white" fontSize={9} fontWeight="bold">
                  {n.label}
                </text>
                <text x={n.x} y={n.y + 10} textAnchor="middle" fill="white" fontSize={8} opacity={0.8}>
                  {n.sub}
                </text>
              </g>
            ))}

            {/* Arrows */}
            <line x1={85} y1={75} x2={165} y2={75} stroke="#3b82f6" strokeWidth={2} markerEnd="url(#arrow)" />
            <text x={125} y={68} textAnchor="middle" fill="#3b82f6" fontSize={8} fontWeight="bold">SMTP</text>

            <line x1={235} y1={75} x2={365} y2={75} stroke="#8b5cf6" strokeWidth={2} markerEnd="url(#arrow)" />
            <text x={300} y={68} textAnchor="middle" fill="#8b5cf6" fontSize={8} fontWeight="bold">SMTP</text>

            <line x1={435} y1={75} x2={515} y2={75} stroke="#10b981" strokeWidth={2} markerEnd="url(#arrow)" />
            <text x={475} y={68} textAnchor="middle" fill="#10b981" fontSize={8} fontWeight="bold">POP3/IMAP</text>

            {/* Queue labels */}
            <text x={200} y={130} textAnchor="middle" fill="#64748b" fontSize={8}>Cola de mensajes</text>
            <text x={400} y={130} textAnchor="middle" fill="#64748b" fontSize={8}>Buzón del usuario</text>

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <ConceptCard title="SMTP" icon={Mail} color="bg-purple-50 text-purple-700 border-purple-200">
            <p>
              Protocolo <strong>push</strong>: envía correo del cliente al servidor y entre servidores. Puerto <strong>25</strong>. Usa TCP. Comandos en texto ASCII (HELO, MAIL FROM, RCPT TO, DATA).
            </p>
          </ConceptCard>
          <ConceptCard title="POP3" icon={Mail} color="bg-blue-50 text-blue-700 border-blue-200">
            <p>
              Protocolo <strong>pull</strong>: descarga correo del servidor al cliente. Modo download-and-delete o download-and-keep. Simple pero <strong>no sincroniza carpetas</strong>.
            </p>
          </ConceptCard>
          <ConceptCard title="IMAP" icon={Mail} color="bg-emerald-50 text-emerald-700 border-emerald-200">
            <p>
              Protocolo pull más avanzado. Mantiene mensajes <strong>en el servidor</strong>. Permite organizar en carpetas, buscar, y acceder desde <strong>múltiples dispositivos</strong>.
            </p>
          </ConceptCard>
        </div>

        <InfoCallout variant="info" title="SMTP vs HTTP">
          <p>
            Ambos usan TCP, pero SMTP es un protocolo <strong>push</strong> (el
            cliente empuja el mensaje al servidor) mientras HTTP es
            principalmente <strong>pull</strong> (el cliente tira del contenido
            del servidor). SMTP requiere que el cuerpo del mensaje esté en ASCII
            de 7 bits; los archivos adjuntos se codifican en MIME/Base64.
          </p>
        </InfoCallout>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 4: DNS */}
      {/* ============================================ */}
      <SectionBlock id="dns" title="DNS: El Servicio de Directorio de Internet">
        <p className="text-muted leading-relaxed">
          El <strong>DNS</strong> (Domain Name System) traduce nombres de host
          legibles por humanos (como www.ejemplo.com) a direcciones IP numéricas
          (como 200.42.130.100). Es una <strong>base de datos distribuida</strong>{" "}
          implementada como una jerarquía de servidores DNS.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-4">
          Resolución DNS paso a paso (consulta iterativa)
        </h3>
        <DnsResolution />

        <ComparisonTable
          headers={["Tipo de Registro", "Formato", "Propósito", "Ejemplo"]}
          rows={[
            ["A", "(nombre, IP, A, TTL)", "Nombre → IPv4", "www.ejemplo.com → 200.42.130.100"],
            ["AAAA", "(nombre, IPv6, AAAA, TTL)", "Nombre → IPv6", "www.ejemplo.com → 2001:db8::1"],
            ["CNAME", "(alias, canónico, CNAME, TTL)", "Alias → Nombre canónico", "web.ejemplo.com → srv1.ejemplo.com"],
            ["MX", "(dominio, mailserver, MX, TTL)", "Dominio → Servidor de correo", "ejemplo.com → mail.ejemplo.com"],
            ["NS", "(dominio, dns, NS, TTL)", "Dominio → Servidor DNS autoritativo", "ejemplo.com → ns1.ejemplo.com"],
          ]}
        />

        <div className="grid gap-4 sm:grid-cols-2 mt-4">
          <ConceptCard title="Consulta Iterativa" icon={Search} color="bg-amber-50 text-amber-700 border-amber-200">
            <p>
              El servidor DNS local hace todo el trabajo. Contacta secuencialmente al raíz, TLD y autoritativo. Cada servidor responde con &quot;no sé, pero pregúntale a este otro servidor&quot;.
            </p>
          </ConceptCard>
          <ConceptCard title="Consulta Recursiva" icon={Search} color="bg-cyan-50 text-cyan-700 border-cyan-200">
            <p>
              El servidor contactado asume la responsabilidad de resolver completamente la consulta. El raíz preguntaría al TLD, quien preguntaría al autoritativo, y la respuesta regresa por la misma cadena.
            </p>
          </ConceptCard>
        </div>

        <ExampleBlock title="Resolución de www.ejemplo.com.ar">
          <ol className="list-decimal list-inside space-y-1.5">
            <li>El host consulta a su <strong>DNS local</strong> (ej: 8.8.8.8)</li>
            <li>DNS local consulta a un <strong>servidor raíz</strong> → recibe: &quot;pregunta al TLD de .ar&quot;</li>
            <li>DNS local consulta al <strong>TLD de .ar</strong> → recibe: &quot;pregunta al DNS de ejemplo.com.ar&quot;</li>
            <li>DNS local consulta al <strong>servidor autoritativo de ejemplo.com.ar</strong> → recibe: &quot;200.42.130.100&quot;</li>
            <li>DNS local <strong>cachea la respuesta</strong> (durante el TTL) y la envía al host</li>
            <li>El navegador abre conexión TCP a <strong>200.42.130.100</strong></li>
          </ol>
          <p className="mt-2">
            Gracias al <strong>caché DNS</strong>, la mayoría de las consultas se
            resuelven sin llegar hasta el servidor raíz.
          </p>
        </ExampleBlock>

        <InfoCallout variant="tip" title="Caché DNS">
          <p>
            Cada servidor DNS almacena en caché las respuestas durante el tiempo
            indicado por el <strong>TTL</strong> (Time To Live). Esto reduce
            dramáticamente el tráfico DNS y los tiempos de resolución. Los
            registros en caché eventualmente expiran, permitiendo que cambios en
            DNS se propaguen.
          </p>
        </InfoCallout>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 5: Caché Web y Servidores Proxy */}
      {/* ============================================ */}
      <SectionBlock id="cache-web" title="Caché Web y Servidores Proxy">
        <p className="text-muted leading-relaxed">
          Un <strong>servidor proxy</strong> (también llamado caché web) es un
          servidor de red que actúa en nombre de los servidores de origen.
          Cuando un navegador solicita un objeto, primero va al proxy; si el
          proxy tiene una copia reciente en caché, la devuelve directamente
          (<strong>cache hit</strong>). Si no (<strong>cache miss</strong>), el
          proxy solicita el objeto al servidor de origen, lo almacena en caché
          y lo entrega al cliente.
        </p>

        <InfoCallout variant="info" title="Analogía: la fotocopiadora de la facultad">
          <p>
            El proxy es como la fotocopiadora de una facultad. En lugar de que
            cada alumno vaya a la biblioteca (servidor de origen) a sacar una
            copia del mismo libro, alguien ya lo copió y está disponible en el
            pasillo. Si el libro cambió (expiró el TTL), hay que ir a la
            biblioteca de nuevo.
          </p>
        </InfoCallout>

        <ConceptCard
          title="Beneficios del Proxy Cache"
          icon={Server}
          color="bg-blue-50 text-blue-700 border-blue-200"
        >
          <ul className="space-y-1.5 list-disc list-inside">
            <li>Reduce tiempo de respuesta (el caché está más cerca del cliente)</li>
            <li>Reduce tráfico en el enlace de acceso a Internet (menos costo)</li>
            <li>El ISP instala proxies para reducir su tráfico de peering/transit</li>
            <li>Beneficia a múltiples usuarios (un hit sirve a todos)</li>
          </ul>
        </ConceptCard>

        <ExampleBlock title="Cálculo del impacto de un proxy cache">
          <p>
            Institución con enlace de acceso de <strong>15 Mbps</strong> hacia
            Internet, 100 solicitudes/segundo, tamaño promedio de objeto 1 Mbit.
          </p>
          <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 dark:bg-white/[0.07] rounded p-3">
            <p className="font-bold">Sin caché:</p>
            <p>Tasa de datos = 100 solicitudes/s × 1 Mbit = 100 Mbps &gt;&gt; 15 Mbps del enlace</p>
            <p>→ Enlace saturado, retardos de cola enormes</p>
            <p className="pt-2 border-t border-amber-300 font-bold">Con proxy cache (hit rate = 0.4):</p>
            <p>Solicitudes que salen al enlace = 60% × 100 Mbps = 60 Mbps → aún alto</p>
            <p className="pt-2 border-t border-amber-300 font-bold">Con proxy cache (hit rate = 0.6):</p>
            <p>Solicitudes que salen al enlace = 40% × 100 Mbps = 40 Mbps</p>
            <p>→ <strong>Enlace de 15 Mbps sigue congestionado</strong>, pero ampliar a 100 Mbps es caro</p>
            <p>→ <strong>Con proxy y hit rate 0.6:</strong> 40 Mbps promedio, funciona sin ampliar el enlace</p>
          </div>
        </ExampleBlock>

        <InfoCallout variant="info" title="GET Condicional">
          <p>
            El proxy no sirve objetos desactualizados. Usa el{" "}
            <strong>GET Condicional</strong>: incluye la cabecera{" "}
            <code className="bg-card dark:bg-white/10 px-1 rounded">
              If-Modified-Since: &lt;fecha&gt;
            </code>{" "}
            en la solicitud al servidor de origen. Si el objeto{" "}
            <strong>NO cambió</strong>, el servidor responde{" "}
            <strong>304 Not Modified</strong> (sin body, ahorrando ancho de
            banda). Si cambió, responde <strong>200 OK</strong> con el objeto
            actualizado. El proxy actualiza su caché y sirve la versión fresca.
          </p>
        </InfoCallout>

        <ComparisonTable
          headers={["Escenario", "Sin Proxy", "Con Proxy (hit rate 0.6)"]}
          rows={[
            ["Objetos servidos localmente", "0%", "60%"],
            ["Tráfico al servidor de origen", "100%", "40%"],
            ["Latencia promedio", "RTT_internet + d_trans", "~0 ms para hits, RTT_internet para misses"],
            ["Costo de ancho de banda", "Alto", "Reducido en ~60%"],
          ]}
        />
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 6: Video Streaming y DASH */}
      {/* ============================================ */}
      <SectionBlock id="video-streaming" title="Streaming de Video y DASH">
        <p className="text-muted leading-relaxed">
          El video es el tipo de tráfico dominante en Internet — Netflix,
          YouTube y plataformas similares representan más del{" "}
          <strong>80% del tráfico descargado</strong>. Un video es una
          secuencia de imágenes (frames) a 24-60 fps. Un video de 4K puede
          requerir 15-25 Mbps constantes; una conexión inestable resulta en
          buffering o calidad degradada.
        </p>

        <InfoCallout variant="info" title="Analogía: el grifo de presión variable">
          <p>
            Sin streaming adaptativo, ver un video en Internet sería como
            intentar llenar un vaso de agua con un grifo que varía su presión
            constantemente — a veces desborda, a veces queda vacío. DASH es
            como un sistema inteligente que ajusta el flujo automáticamente.
          </p>
        </InfoCallout>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="El Problema del Streaming"
            icon={Globe}
            color="bg-amber-50 text-amber-700 border-amber-200"
          >
            <ul className="space-y-1.5 list-disc list-inside">
              <li>El ancho de banda de un usuario varía constantemente (congestión, WiFi, movilidad)</li>
              <li>Si el video se codifica a un bitrate fijo y el ancho de banda cae → <strong>buffering</strong> (el vaso se vacía)</li>
              <li>Si el bitrate es muy bajo para evitar buffering → <strong>calidad degradada</strong> permanentemente</li>
              <li>Solución: <strong>adaptar dinámicamente la calidad</strong> según el ancho de banda disponible</li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="DASH: Dynamic Adaptive Streaming over HTTP"
            icon={Network}
            color="bg-emerald-50 text-emerald-700 border-emerald-200"
          >
            <ul className="space-y-1.5 list-disc list-inside">
              <li>El video se codifica en <strong>múltiples versiones</strong> (300 kbps, 1 Mbps, 4 Mbps, 8 Mbps, 25 Mbps)</li>
              <li>Cada versión se divide en <strong>chunks</strong> de 2-10 segundos</li>
              <li>Un archivo <strong>manifest</strong> (MPD) lista todas las versiones y URLs de sus chunks</li>
              <li>El cliente <strong>mide el ancho de banda disponible</strong> continuamente</li>
              <li>En cada chunk, elige la <strong>mejor calidad</strong> que puede descargar sin buffering</li>
              <li>Todo usa <strong>HTTP/TCP estándar</strong> — funciona sobre cualquier infraestructura web</li>
            </ul>
          </ConceptCard>
        </div>

        <InfoCallout variant="tip" title="Buffer del cliente como amortiguador">
          <p>
            El reproductor mantiene un <strong>buffer de reproducción</strong>{" "}
            (típicamente 10-30 segundos de video). El algoritmo DASH intenta
            mantener el buffer lleno:
          </p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li><strong>Buffer muy lleno</strong> → puede arriesgarse a pedir calidad más alta</li>
            <li><strong>Buffer casi vacío</strong> → baja calidad urgentemente para evitar corte</li>
            <li><strong>Buffer vacío</strong> → buffering (la rueda giratoria)</li>
          </ul>
          <p className="mt-2">
            Este buffer es la razón por la que cuando empieza un video hay
            unos segundos de carga inicial.
          </p>
        </InfoCallout>

        <ExampleBlock title="Selección de chunk en DASH">
          <div className="font-mono text-xs space-y-1 bg-white/60 dark:bg-white/[0.07] rounded p-3">
            <p>Ancho de banda medido:   3 Mbps</p>
            <p>Versiones disponibles:   300 kbps | 1 Mbps | 2.5 Mbps | 5 Mbps | 8 Mbps</p>
            <p className="pt-1 border-t border-amber-300">
              → Cliente elige <strong>2.5 Mbps</strong> (por debajo del ancho de banda medido, con margen de seguridad)
            </p>
            <p>Buffer actual: 15 s (saludable) → podría intentar <strong>5 Mbps</strong> en el próximo chunk</p>
            <p>Si ese chunk tarda demasiado → buffer cae → vuelve a <strong>2.5 Mbps</strong></p>
          </div>
          <p className="mt-2 text-xs text-muted">
            Esta decisión ocurre cada pocos segundos, cientos de veces durante la reproducción de un video.
          </p>
        </ExampleBlock>

        <ComparisonTable
          headers={["Característica", "Streaming Tradicional (bitrate fijo)", "DASH (adaptativo)"]}
          rows={[
            ["Calidad", "Fija (puede ser baja)", "Variable pero óptima para la red"],
            ["Buffering", "Frecuente con red variable", "Mínimo gracias a adaptación"],
            ["Infraestructura", "Servidores de streaming especiales", "HTTP estándar + CDN"],
            ["Protocolo", "RTSP, RTMP", "HTTP/HTTPS"],
            ["Ejemplos", "Streams en vivo básicos", "Netflix, YouTube, Disney+, HBO"],
          ]}
        />
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 7: CDN */}
      {/* ============================================ */}
      <SectionBlock id="cdn" title="CDN: Redes de Distribución de Contenido">
        <p className="text-muted leading-relaxed">
          Si Netflix tuviera un único servidor en California, un usuario en
          Buenos Aires sufriría enorme latencia y el enlace transatlántico se
          congestionaría. La solución son las{" "}
          <strong>CDNs (Content Delivery Networks)</strong>: redes de
          servidores distribuidos geográficamente que almacenan copias del
          contenido y lo sirven desde el servidor más cercano al usuario.
        </p>

        <InfoCallout variant="info" title="Analogía: la cadena de supermercados">
          <p>
            Una CDN es como una cadena de supermercados. En lugar de que todos
            compren desde un único almacén central (alta latencia, congestión),
            hay sucursales en cada barrio (baja latencia, alta disponibilidad).
            Cada sucursal tiene los productos más demandados; los productos
            raros se piden al almacén central.
          </p>
        </InfoCallout>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="¿Cómo funciona una CDN?"
            icon={Globe}
            color="bg-blue-50 text-blue-700 border-blue-200"
          >
            <ul className="space-y-1.5 list-disc list-inside">
              <li>La CDN distribuye miles de <strong>servidores edge</strong> (nodos) en todo el mundo</li>
              <li>Cuando un usuario solicita video.mp4, <strong>DNS redirige</strong> la solicitud al nodo CDN más cercano (geografía + carga)</li>
              <li>Si ese nodo tiene el archivo en caché → <strong>hit</strong>, baja latencia</li>
              <li>Si no → lo descarga del servidor de origen, lo cachea, y lo sirve (<strong>miss</strong>)</li>
              <li>Las solicitudes posteriores del mismo contenido en esa región → hit</li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="Estrategias de Ubicación de Servidores CDN"
            icon={Network}
            color="bg-violet-50 text-violet-700 border-violet-200"
          >
            <ul className="space-y-1.5 list-disc list-inside">
              <li>
                <strong>Enter Deep:</strong> colocar servidores CDN{" "}
                <em>dentro</em> de las redes de acceso de los ISPs. Muy cerca
                del usuario, latencia muy baja. Difícil de mantener (miles de
                ubicaciones). Estrategia de <strong>Akamai</strong>.
              </li>
              <li>
                <strong>Bring Home:</strong> colocar servidores CDN en{" "}
                <strong>IXPs</strong> (puntos de intercambio de tráfico), cerca
                de los ISPs pero no dentro. Menos ubicaciones, más fácil de
                gestionar. Estrategia de <strong>Netflix Open Connect</strong>{" "}
                y Limelight/Edgio.
              </li>
            </ul>
          </ConceptCard>
        </div>

        <ExampleBlock title="El flujo completo de Netflix con CDN">
          <div className="font-mono text-xs space-y-1 bg-white/60 dark:bg-white/[0.07] rounded p-3">
            <p className="font-bold">Escenario: usuario en Buenos Aires busca una película</p>
            <p className="pt-1">1. Cliente → DNS local: &quot;¿IP de video.netflix.com?&quot;</p>
            <p>2. DNS local → DNS de Netflix: consulta</p>
            <p>3. DNS Netflix devuelve IP del nodo CDN más cercano (Open Connect en CABASE)</p>
            <p>4. Cliente → CDN en CABASE: GET /pelicula.mpd  (latencia: ~5 ms vs ~180 ms a California)</p>
            <p>5. CDN responde con manifest DASH (película ya cacheada por solicitudes anteriores)</p>
            <p>6. Cliente solicita chunks al CDN según algoritmo DASH</p>
            <p className="pt-1 border-t border-amber-300">
              → Descarga a 25 Mbps <strong>sin cruzar el enlace transoceánico</strong>
            </p>
          </div>
        </ExampleBlock>

        <InfoCallout variant="info" title="CDNs y el Desafío del &quot;Cluster Correcto&quot;">
          <p>
            La CDN debe decidir qué servidor asignar a cada cliente. Factores:{" "}
            <strong>distancia geográfica</strong> (latencia),{" "}
            <strong>carga actual del servidor</strong> (balanceo de carga),{" "}
            <strong>disponibilidad del contenido en caché</strong>. Algunos
            CDNs usan <strong>Anycast DNS</strong>: el mismo nombre DNS
            resuelve a diferentes IPs según la ubicación del resolver. El
            cliente ni sabe desde qué país se está sirviendo el contenido.
          </p>
        </InfoCallout>

        <ComparisonTable
          headers={["CDN", "Estrategia", "Escala", "Clientes destacados"]}
          rows={[
            ["Akamai", "Enter Deep (redes de ISPs)", ">4 000 ubicaciones, >350 k servidores", "Adobe, Apple, Microsoft"],
            ["Cloudflare", "IXPs + redes propias", ">300 ciudades", "Millones de sitios web"],
            ["Netflix Open Connect", "IXPs + ISPs socios", ">1 000 ubicaciones", "Solo Netflix"],
            ["AWS CloudFront", "Edge locations propias de Amazon", ">600 puntos de presencia", "Clientes de AWS"],
          ]}
        />
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 8: Programación de Sockets */}
      {/* ============================================ */}
      <SectionBlock id="sockets" title="Programación de Sockets">
        <p className="text-muted leading-relaxed">
          La <strong>programación de sockets</strong> es cómo las aplicaciones
          usan la capa de transporte para comunicarse. Un socket es el punto
          donde la aplicación &quot;toca&quot; la red.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard title="Sockets TCP" icon={Code} color="bg-blue-50 text-blue-700 border-blue-200">
            <ul className="space-y-1 list-disc list-inside">
              <li><strong>Orientado a conexión:</strong> requiere handshake previo</li>
              <li>El servidor crea un <em>welcoming socket</em> (listen)</li>
              <li>Para cada cliente se crea un <em>connection socket</em></li>
              <li>Flujo de datos confiable y ordenado</li>
              <li>Secuencia: socket → bind → listen → accept → send/recv</li>
            </ul>
          </ConceptCard>
          <ConceptCard title="Sockets UDP" icon={Code} color="bg-orange-50 text-orange-700 border-orange-200">
            <ul className="space-y-1 list-disc list-inside">
              <li><strong>Sin conexión:</strong> no requiere handshake</li>
              <li>Cada datagrama incluye dirección destino</li>
              <li>No hay garantía de entrega ni orden</li>
              <li>Más simple y rápido para ciertos usos</li>
              <li>Secuencia: socket → bind → sendto/recvfrom</li>
            </ul>
          </ConceptCard>
        </div>

        {/* TCP Socket flow */}
        <h3 className="text-lg font-semibold mt-6 mb-4">
          Flujo de llamadas de Socket TCP
        </h3>
        <svg viewBox="0 0 500 380" className="w-full max-w-md mx-auto">
          {/* Server side */}
          <text x={150} y={20} textAnchor="middle" fill="#10b981" fontSize={12} fontWeight="bold">
            Servidor
          </text>
          {[
            { y: 40, label: "socket()" },
            { y: 80, label: "bind()" },
            { y: 120, label: "listen()" },
            { y: 160, label: "accept()" },
            { y: 240, label: "recv()" },
            { y: 280, label: "send()" },
            { y: 320, label: "close()" },
          ].map((item) => (
            <g key={item.label + "s"}>
              <rect x={90} y={item.y} width={120} height={30} rx={6} fill="#10b98122" stroke="#10b981" strokeWidth={1.5} />
              <text x={150} y={item.y + 19} textAnchor="middle" fill="#10b981" fontSize={11} fontWeight="bold">
                {item.label}
              </text>
            </g>
          ))}

          {/* Client side */}
          <text x={380} y={20} textAnchor="middle" fill="#3b82f6" fontSize={12} fontWeight="bold">
            Cliente
          </text>
          {[
            { y: 40, label: "socket()" },
            { y: 160, label: "connect()" },
            { y: 240, label: "send()" },
            { y: 280, label: "recv()" },
            { y: 320, label: "close()" },
          ].map((item) => (
            <g key={item.label + "c"}>
              <rect x={320} y={item.y} width={120} height={30} rx={6} fill="#3b82f622" stroke="#3b82f6" strokeWidth={1.5} />
              <text x={380} y={item.y + 19} textAnchor="middle" fill="#3b82f6" fontSize={11} fontWeight="bold">
                {item.label}
              </text>
            </g>
          ))}

          {/* Arrows */}
          <line x1={320} y1={175} x2={210} y2={175} stroke="#64748b" strokeWidth={1.5} strokeDasharray="4,3" />
          <text x={265} y={168} textAnchor="middle" fill="#64748b" fontSize={8}>TCP handshake</text>

          <line x1={320} y1={255} x2={210} y2={255} stroke="#3b82f6" strokeWidth={1.5} />
          <text x={265} y={248} textAnchor="middle" fill="#3b82f6" fontSize={8}>datos</text>

          <line x1={210} y1={295} x2={320} y2={295} stroke="#10b981" strokeWidth={1.5} />
          <text x={265} y={310} textAnchor="middle" fill="#10b981" fontSize={8}>respuesta</text>

          {/* Waiting annotation */}
          <text x={150} y={200} textAnchor="middle" fill="#64748b" fontSize={8} fontStyle="italic">
            bloqueado esperando
          </text>
          <text x={150} y={212} textAnchor="middle" fill="#64748b" fontSize={8} fontStyle="italic">
            conexión...
          </text>

          {/* Vertical lines */}
          <line x1={150} y1={30} x2={150} y2={350} stroke="#10b981" strokeWidth={1} opacity={0.2} />
          <line x1={380} y1={30} x2={380} y2={350} stroke="#3b82f6" strokeWidth={1} opacity={0.2} />
        </svg>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 6: Quiz */}
      {/* ============================================ */}
      <SectionBlock id="quiz" title="Quiz del Capítulo 2">
        <p className="text-muted leading-relaxed mb-4">
          Evalúa tu comprensión de la capa de aplicación: HTTP, DNS, correo
          electrónico y arquitecturas de aplicación.
        </p>
        <QuizContainer questions={quizCh2} chapterTitle={chapter.title} />
      </SectionBlock>
    </ChapterLayout>
  );
}

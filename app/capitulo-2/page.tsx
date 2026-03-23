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
          <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 rounded p-3">
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
            <code className="bg-slate-100 px-1 rounded">Set-Cookie</code> en la
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
      {/* SECCIÓN 5: Programación de Sockets */}
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

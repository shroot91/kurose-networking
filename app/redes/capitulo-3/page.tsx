import { chapters } from "@/data/chapters";
import { ChapterLayout } from "@/components/layout/chapter-layout";
import { SectionBlock } from "@/components/content/section-block";
import { ConceptCard } from "@/components/content/concept-card";
import { ExampleBlock } from "@/components/content/example-block";
import { ComparisonTable } from "@/components/content/comparison-table";
import { InfoCallout } from "@/components/content/info-callout";
import { TcpHandshake } from "@/components/diagrams/tcp-handshake";
import { SlidingWindow } from "@/components/diagrams/sliding-window";
import { CongestionControl } from "@/components/diagrams/congestion-control";
import { QuizContainer } from "@/components/quiz/quiz-container";
import { quizCh3 } from "@/data/quiz-ch3";
import {
  ArrowLeftRight,
  Zap,
  Shield,
  Timer,
  Layers,
  Activity,
} from "lucide-react";

const chapter = chapters[2];

export default function Capitulo3() {
  return (
    <ChapterLayout chapter={chapter}>
      {/* ============================================ */}
      {/* SECCIÓN 1: Servicios de Transporte */}
      {/* ============================================ */}
      <SectionBlock
        id="servicios-transporte"
        title="Servicios de la Capa de Transporte"
      >
        <p className="text-muted leading-relaxed">
          La capa de transporte proporciona <strong>comunicación lógica</strong>{" "}
          entre procesos de aplicación en diferentes hosts. Mientras la capa de
          red proporciona comunicación entre hosts, la capa de transporte extiende
          esto a comunicación <strong>proceso a proceso</strong>.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Multiplexación"
            icon={Layers}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p>
              <strong>En el emisor:</strong> recoger datos de múltiples sockets
              de aplicación, encapsularlos con cabecera de transporte (que incluye
              puerto origen y destino) y pasarlos a la capa de red. Permite que
              múltiples aplicaciones compartan la misma conexión de red.
            </p>
          </ConceptCard>
          <ConceptCard
            title="Demultiplexación"
            icon={ArrowLeftRight}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <p>
              <strong>En el receptor:</strong> examinar los campos de puerto en la
              cabecera del segmento y entregar los datos al socket correcto. UDP
              usa solo (IP dest, puerto dest). TCP usa la 4-tupla (IP src, puerto
              src, IP dest, puerto dest).
            </p>
          </ConceptCard>
        </div>

        {/* Multiplexing diagram */}
        <svg viewBox="0 0 500 200" className="w-full max-w-lg mx-auto">
          {/* Applications */}
          {[
            { x: 80, label: "HTTP", port: "80", color: "#3b82f6" },
            { x: 200, label: "SMTP", port: "25", color: "#8b5cf6" },
            { x: 320, label: "DNS", port: "53", color: "#f59e0b" },
            { x: 440, label: "SSH", port: "22", color: "#10b981" },
          ].map((app) => (
            <g key={app.label}>
              <rect x={app.x - 35} y={10} width={70} height={35} rx={6} fill={app.color} />
              <text x={app.x} y={25} textAnchor="middle" fill="white" fontSize={9} fontWeight="bold">
                {app.label}
              </text>
              <text x={app.x} y={38} textAnchor="middle" fill="white" fontSize={8} opacity={0.8}>
                Puerto {app.port}
              </text>
              <line x1={app.x} y1={45} x2={app.x} y2={80} stroke={app.color} strokeWidth={2} />
            </g>
          ))}

          {/* Transport layer */}
          <rect x={40} y={80} width={420} height={40} rx={8} fill="#64748b22" stroke="#64748b" strokeWidth={2} />
          <text x={250} y={105} textAnchor="middle" fill="#64748b" fontSize={12} fontWeight="bold">
            Capa de Transporte (TCP/UDP)
          </text>

          {/* Down to network */}
          <line x1={250} y1={120} x2={250} y2={155} stroke="#64748b" strokeWidth={2} />

          {/* Network layer */}
          <rect x={150} y={155} width={200} height={35} rx={8} fill="#94a3b822" stroke="#94a3b8" strokeWidth={2} />
          <text x={250} y={177} textAnchor="middle" fill="#94a3b8" fontSize={11} fontWeight="bold">
            Capa de Red (IP)
          </text>

          {/* Labels */}
          <text x={30} y={72} textAnchor="end" fill="#64748b" fontSize={8} fontStyle="italic">
            MUX ↓
          </text>
          <text x={30} y={92} textAnchor="end" fill="#64748b" fontSize={8} fontStyle="italic">
            DEMUX ↑
          </text>
        </svg>

        <InfoCallout variant="info" title="Puerto bien conocido vs efímero">
          <p>
            Los puertos del <strong>0 al 1023</strong> son &quot;bien
            conocidos&quot; y están reservados para servicios estándar (HTTP=80,
            HTTPS=443, SSH=22). Los puertos <strong>1024-65535</strong> se usan
            como puertos efímeros asignados automáticamente por el SO a los
            clientes.
          </p>
        </InfoCallout>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 2: UDP */}
      {/* ============================================ */}
      <SectionBlock id="udp" title="UDP: Transporte sin Conexión">
        <p className="text-muted leading-relaxed">
          <strong>UDP</strong> (User Datagram Protocol) es el protocolo de
          transporte más simple. No establece conexión, no garantiza entrega, no
          garantiza orden. Solo proporciona multiplexación y un checksum opcional.
        </p>

        {/* UDP Segment structure */}
        <h3 className="text-lg font-semibold mt-4 mb-3">
          Estructura del segmento UDP
        </h3>
        <svg viewBox="0 0 500 160" className="w-full max-w-md mx-auto">
          {/* Header row 1 */}
          <rect x={50} y={10} width={200} height={35} rx={0} fill="#3b82f622" stroke="#3b82f6" strokeWidth={1.5} />
          <text x={150} y={25} textAnchor="middle" fill="#3b82f6" fontSize={10} fontWeight="bold">
            Puerto Origen
          </text>
          <text x={150} y={38} textAnchor="middle" fill="#3b82f6" fontSize={8}>
            16 bits
          </text>

          <rect x={250} y={10} width={200} height={35} rx={0} fill="#8b5cf622" stroke="#8b5cf6" strokeWidth={1.5} />
          <text x={350} y={25} textAnchor="middle" fill="#8b5cf6" fontSize={10} fontWeight="bold">
            Puerto Destino
          </text>
          <text x={350} y={38} textAnchor="middle" fill="#8b5cf6" fontSize={8}>
            16 bits
          </text>

          {/* Header row 2 */}
          <rect x={50} y={45} width={200} height={35} rx={0} fill="#f59e0b22" stroke="#f59e0b" strokeWidth={1.5} />
          <text x={150} y={60} textAnchor="middle" fill="#f59e0b" fontSize={10} fontWeight="bold">
            Longitud
          </text>
          <text x={150} y={73} textAnchor="middle" fill="#f59e0b" fontSize={8}>
            16 bits
          </text>

          <rect x={250} y={45} width={200} height={35} rx={0} fill="#10b98122" stroke="#10b981" strokeWidth={1.5} />
          <text x={350} y={60} textAnchor="middle" fill="#10b981" fontSize={10} fontWeight="bold">
            Checksum
          </text>
          <text x={350} y={73} textAnchor="middle" fill="#10b981" fontSize={8}>
            16 bits
          </text>

          {/* Data */}
          <rect x={50} y={80} width={400} height={50} rx={0} fill="#64748b11" stroke="#64748b" strokeWidth={1.5} />
          <text x={250} y={108} textAnchor="middle" fill="#64748b" fontSize={12} fontWeight="bold">
            Datos de la Aplicación (payload)
          </text>

          {/* Labels */}
          <text x={45} y={55} textAnchor="end" fill="#64748b" fontSize={9}>
            8 bytes
          </text>
          <text x={20} y={30} textAnchor="middle" fill="#64748b" fontSize={8}>
            Header
          </text>
          <line x1={5} y1={10} x2={5} y2={80} stroke="#64748b" strokeWidth={1} />
        </svg>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard title="Ventajas de UDP" icon={Zap} color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800">
            <ul className="space-y-1 list-disc list-inside">
              <li>Sin establecimiento de conexión (sin retardo adicional)</li>
              <li>Sin estado de conexión (más conexiones simultáneas)</li>
              <li>Header pequeño (8 bytes vs 20 de TCP)</li>
              <li>Sin control de congestión (envía tan rápido como quiera)</li>
              <li>Ideal para: DNS, streaming, juegos online, VoIP</li>
            </ul>
          </ConceptCard>
          <ConceptCard title="Checksum UDP" icon={Shield} color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800">
            <p>
              El checksum verifica la integridad del segmento. Se calcula sumando
              todas las palabras de 16 bits del segmento (header + datos) usando
              complemento a 1. El receptor recalcula y compara. Si no coincide, el
              segmento tiene errores y se descarta. Es la <strong>última
              línea de defensa</strong> contra errores de bits.
            </p>
          </ConceptCard>
        </div>

        <ExampleBlock title="Cálculo de checksum simplificado">
          <p>
            Supongamos dos palabras de 16 bits a sumar:
          </p>
          <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 dark:bg-white/[0.07] rounded p-3">
            <p>Palabra 1: 0110 0110 0110 0000</p>
            <p>Palabra 2: 0101 0101 0101 0101</p>
            <p className="border-t border-amber-300 pt-1">
              Suma:       1011 1011 1011 0101
            </p>
            <p>
              Comp. a 1:  <strong>0100 0100 0100 1010</strong> ← checksum
            </p>
            <p className="mt-2 text-amber-800">
              En el receptor, sumar todas las palabras + checksum debe dar 1111 1111 1111 1111.
              Si no, hay error.
            </p>
          </div>
        </ExampleBlock>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 3: Transferencia Confiable */}
      {/* ============================================ */}
      <SectionBlock
        id="transferencia-confiable"
        title="Transferencia de Datos Confiable"
      >
        <p className="text-muted leading-relaxed">
          Construir un protocolo de transferencia confiable sobre un canal no
          confiable es uno de los problemas más importantes en redes. Kurose lo
          presenta como una evolución progresiva: rdt1.0 → rdt2.0 → rdt2.1 →
          rdt2.2 → rdt3.0.
        </p>

        <ComparisonTable
          headers={["Protocolo", "Canal", "Mecanismo añadido", "Problema que resuelve"]}
          rows={[
            ["rdt1.0", "Perfecto (sin errores ni pérdida)", "Ninguno", "Base ideal (no realista)"],
            ["rdt2.0", "Con errores de bits", "Checksum + ACK/NAK", "Detecta y solicita retransmisión"],
            ["rdt2.1", "Con errores (incluyendo ACK/NAK)", "Números de secuencia (0, 1)", "Detecta duplicados por ACK/NAK corruptos"],
            ["rdt2.2", "Igual que rdt2.1", "Solo ACKs (sin NAK)", "Simplifica: ACK duplicado = NAK implícito"],
            ["rdt3.0", "Con errores Y pérdida", "Temporizador (timer)", "Detecta pérdida por timeout y retransmite"],
          ]}
        />

        <InfoCallout variant="tip" title="De rdt3.0 a TCP">
          <p>
            rdt3.0 funciona pero es ineficiente (stop-and-wait): el emisor espera
            el ACK antes de enviar el siguiente paquete. TCP mejora esto con{" "}
            <strong>pipelining</strong> (enviar múltiples paquetes sin esperar
            ACK) usando ventanas deslizantes, como en los protocolos{" "}
            <strong>Go-Back-N</strong> y <strong>Selective Repeat</strong>.
          </p>
        </InfoCallout>

        <ExampleBlock title="Eficiencia de stop-and-wait vs pipelining">
          <p>
            Enlace de <strong>1 Gbps</strong>, RTT = <strong>30 ms</strong>,
            paquete de <strong>8,000 bits</strong>.
          </p>
          <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 dark:bg-white/[0.07] rounded p-3">
            <p>d_trans = 8,000 / 10⁹ = 0.008 ms</p>
            <p className="font-bold pt-1">Stop-and-Wait:</p>
            <p>Utilización = d_trans / (RTT + d_trans) = 0.008 / 30.008 = <strong>0.00027 = 0.027%</strong></p>
            <p className="font-bold pt-1 border-t border-amber-300">Con pipelining (ventana = 3):</p>
            <p>Utilización = 3 × d_trans / (RTT + d_trans) = 0.024 / 30.008 = <strong>0.0008 = 0.08%</strong></p>
            <p className="font-bold pt-1 border-t border-amber-300">Con ventana óptima:</p>
            <p>Ventana = RTT / d_trans = 30 / 0.008 = <strong>3,750 paquetes</strong> para utilización ~100%</p>
          </div>
        </ExampleBlock>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 4: TCP */}
      {/* ============================================ */}
      <SectionBlock id="tcp" title="TCP: Transporte Orientado a Conexión">
        <p className="text-muted leading-relaxed">
          <strong>TCP</strong> proporciona un servicio de transporte confiable,
          orientado a conexión, con control de flujo y control de congestión. Es
          full-duplex y punto a punto.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-3">
          Three-Way Handshake (animación)
        </h3>
        <TcpHandshake />

        <ComparisonTable
          headers={["Característica", "TCP", "UDP"]}
          rows={[
            ["Conexión", "Orientado a conexión (handshake)", "Sin conexión"],
            ["Confiabilidad", "Entrega garantizada y en orden", "Sin garantía"],
            ["Control de flujo", "Sí (rwnd)", "No"],
            ["Control de congestión", "Sí (cwnd, slow start, AIMD)", "No"],
            ["Header", "20-60 bytes", "8 bytes"],
            ["Overhead", "Mayor (ACKs, retransmisiones, timers)", "Mínimo"],
            ["Uso típico", "Web, email, transferencia de archivos", "DNS, streaming, juegos, VoIP"],
          ]}
        />

        {/* ---- RTT Estimation ---- */}
        <h3 className="text-lg font-semibold mt-8 mb-3">
          Estimación del RTT y Timeout en TCP
        </h3>

        <p className="text-muted leading-relaxed">
          TCP no puede usar un timeout fijo: si la red es rápida, un timeout
          largo desperdicia tiempo; si es lenta, uno corto provoca
          retransmisiones innecesarias. Por eso TCP{" "}
          <strong>estima el RTT dinámicamente</strong> y ajusta el timeout de
          forma continua.
        </p>

        <InfoCallout variant="tip" title="Analogía: el meteorólogo adaptativo">
          <p>
            TCP estima el RTT como un meteorólogo que calcula la temperatura
            promedio para mañana: usa las mediciones históricas, pero da{" "}
            <strong>más peso a las lecturas recientes</strong> que a las
            antiguas. Si ayer hizo calor y hoy también, el pronóstico de mañana
            sube. Así TCP reacciona a cambios reales de la red sin ignorar el
            comportamiento pasado.
          </p>
        </InfoCallout>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="SampleRTT y EstimatedRTT"
            icon={Timer}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p>
              <strong>SampleRTT</strong>: tiempo medido entre el envío de un
              segmento y la recepción de su ACK. Solo se mide para segmentos{" "}
              <em>no retransmitidos</em> (para evitar ambigüedad sobre a cuál
              envío corresponde el ACK — Algoritmo de Karn).
            </p>
            <p className="mt-2">
              <strong>EstimatedRTT</strong>: promedio ponderado exponencial
              (EWMA) con α = 0.125. Da más peso a muestras recientes sin
              descartar el historial.
            </p>
          </ConceptCard>
          <ConceptCard
            title="DevRTT y TimeoutInterval"
            icon={Activity}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <p>
              <strong>DevRTT</strong>: mide la <em>variabilidad</em> del RTT
              con β = 0.25. Si la red es estable, DevRTT es pequeño; si el RTT
              fluctúa mucho, DevRTT crece.
            </p>
            <p className="mt-2">
              <strong>TimeoutInterval</strong>: EstimatedRTT +{" "}
              <strong>4 × DevRTT</strong>. El margen 4×DevRTT es el
              &quot;colchón de seguridad&quot;: cuando la red varía mucho, el
              timeout se amplía para no retransmitir prematuramente.
            </p>
          </ConceptCard>
        </div>

        <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 dark:bg-white/[0.07] rounded p-3">
          <p className="font-bold text-blue-700 dark:text-blue-400">EstimatedRTT (EWMA):</p>
          <p>EstimatedRTT = (1 - α) × EstimatedRTT + α × SampleRTT</p>
          <p className="text-muted">donde α = 0.125 (recomendado por RFC 6298)</p>
          <p className="font-bold text-amber-700 dark:text-amber-400 pt-2 border-t border-slate-300 dark:border-slate-600">
            DevRTT (variación):
          </p>
          <p>DevRTT = (1 - β) × DevRTT + β × |SampleRTT - EstimatedRTT|</p>
          <p className="text-muted">donde β = 0.25</p>
          <p className="font-bold text-emerald-700 dark:text-emerald-400 pt-2 border-t border-slate-300 dark:border-slate-600">
            Intervalo de Timeout:
          </p>
          <p>TimeoutInterval = EstimatedRTT + 4 × DevRTT</p>
        </div>

        <ExampleBlock title="Cálculo numérico de EstimatedRTT y Timeout">
          <p>
            Un segmento llega con <strong>SampleRTT₁ = 106 ms</strong>.
            Estado previo: EstimatedRTT = 100 ms, DevRTT = 5 ms.
          </p>
          <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 dark:bg-white/[0.07] rounded p-3">
            <p className="font-bold">Nuevo EstimatedRTT:</p>
            <p>= (1 - 0.125) × 100 + 0.125 × 106</p>
            <p>= 0.875 × 100 + 0.125 × 106</p>
            <p>= 87.5 + 13.25 = <strong>100.75 ms</strong></p>
            <p className="font-bold pt-2 border-t border-amber-300">Nuevo DevRTT:</p>
            <p>= (1 - 0.25) × 5 + 0.25 × |106 - 100|</p>
            <p>= 0.75 × 5 + 0.25 × 6</p>
            <p>= 3.75 + 1.5 = <strong>5.25 ms</strong></p>
            <p className="font-bold pt-2 border-t border-amber-300">TimeoutInterval:</p>
            <p>= 100.75 + 4 × 5.25</p>
            <p>= 100.75 + 21 = <strong>121.75 ms</strong></p>
          </div>
          <p className="mt-2 text-sm">
            Interpretación: aunque el RTT medido subió solo 6 ms, el timeout
            resultante (121.75 ms) incluye un margen de 21 ms por si la
            variabilidad sigue aumentando.
          </p>
        </ExampleBlock>

        <ExampleBlock title="Números de secuencia TCP">
          <p>
            Un archivo de <strong>500,000 bytes</strong> se transmite con MSS ={" "}
            <strong>1,000 bytes</strong> y ISN (número de secuencia inicial) ={" "}
            <strong>0</strong>.
          </p>
          <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 dark:bg-white/[0.07] rounded p-3">
            <p>Total de segmentos = 500,000 / 1,000 = <strong>500 segmentos</strong></p>
            <p className="pt-1">Segmento 1: Seq = 0, bytes 0-999</p>
            <p>Segmento 2: Seq = 1000, bytes 1000-1999</p>
            <p>Segmento 3: Seq = 2000, bytes 2000-2999</p>
            <p>...</p>
            <p>Segmento 500: Seq = 499000, bytes 499000-499999</p>
            <p className="pt-2 border-t border-amber-300">
              Si el receptor recibió hasta el byte 2999 correctamente, envía <strong>ACK = 3000</strong>{" "}
              (el próximo byte que espera).
            </p>
            <p>
              Si el segmento 2 (bytes 1000-1999) se perdió, el receptor sigue enviando{" "}
              <strong>ACK = 1000</strong> (ACK duplicado) hasta que llegue ese segmento.
            </p>
          </div>
        </ExampleBlock>

        {/* ---- TCP Connection Teardown ---- */}
        <h3 className="text-lg font-semibold mt-8 mb-3">
          Cierre de Conexión TCP: 4-Way FIN Handshake
        </h3>

        <p className="text-muted leading-relaxed">
          Así como TCP establece la conexión con un 3-way handshake, la{" "}
          <strong>cierra formalmente con un proceso de 4 pasos</strong>. No se
          puede cerrar de golpe: TCP es full-duplex, por lo que cada dirección
          del canal debe cerrarse de forma independiente.
        </p>

        <InfoCallout variant="tip" title="Analogía: la despedida formal por teléfono">
          <p>
            Cerrar una conexión TCP es como terminar una llamada de forma
            educada: cada parte debe decir &quot;chau, yo ya terminé&quot; y
            esperar a que el otro también lo diga antes de colgar. Si uno cuelga
            sin avisar, el otro podría seguir hablando al vacío.
          </p>
        </InfoCallout>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Los 4 pasos del cierre"
            icon={ArrowLeftRight}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <ol className="space-y-1.5 list-decimal list-inside text-sm">
              <li>
                <strong>FIN</strong> (cliente → servidor): &quot;Yo terminé de
                enviar datos&quot; (FIN=1). El cliente entra en
                WAIT_1.
              </li>
              <li>
                <strong>ACK</strong> (servidor → cliente): &quot;Entendido, ya
                sé que terminaste.&quot; El servidor puede seguir enviando datos
                (half-close).
              </li>
              <li>
                <strong>FIN</strong> (servidor → cliente): &quot;Yo también
                terminé.&quot; El servidor envía su propio FIN=1.
              </li>
              <li>
                <strong>ACK</strong> (cliente → servidor): &quot;Entendido,
                cerramos.&quot; El cliente entra en <strong>TIME_WAIT</strong>.
              </li>
            </ol>
          </ConceptCard>
          <ConceptCard
            title="TIME_WAIT y RST"
            icon={Timer}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <p>
              <strong>TIME_WAIT</strong>: después del último ACK, el cliente
              espera <strong>2×MSL</strong> (~60-120 segundos) antes de liberar
              el puerto definitivamente. Esto garantiza dos cosas:
            </p>
            <ul className="mt-1 list-disc list-inside text-sm space-y-1">
              <li>
                Que el último ACK llegó al servidor (si se perdió, el servidor
                reenvía su FIN y el cliente responde).
              </li>
              <li>
                Que todos los segmentos &quot;fantasma&quot; de la conexión
                anterior hayan expirado en la red.
              </li>
            </ul>
            <p className="mt-2">
              <strong>RST</strong>: cierre abrupto sin handshake. Se usa ante
              errores graves o para rechazar conexiones no deseadas. No hay
              TIME_WAIT — la conexión se termina de inmediato.
            </p>
          </ConceptCard>
        </div>

        {/* 4-Way FIN diagram */}
        <svg
          viewBox="0 0 400 260"
          className="w-full max-w-md mx-auto mt-4"
          aria-label="Diagrama del 4-Way FIN Handshake TCP"
        >
          {/* Timeline lines */}
          <line x1={80} y1={20} x2={80} y2={240} stroke="#64748b" strokeWidth={2} />
          <line x1={320} y1={20} x2={320} y2={240} stroke="#64748b" strokeWidth={2} />

          {/* Labels */}
          <text x={80} y={15} textAnchor="middle" fill="#3b82f6" fontSize={13} fontWeight="bold">
            Cliente
          </text>
          <text x={320} y={15} textAnchor="middle" fill="#10b981" fontSize={13} fontWeight="bold">
            Servidor
          </text>

          {/* Step 1: FIN → */}
          <line x1={80} y1={60} x2={310} y2={80} stroke="#ef4444" strokeWidth={2} markerEnd="url(#arrow-red)" />
          <polygon points="308,77 320,82 310,88" fill="#ef4444" />
          <text x={190} y={58} textAnchor="middle" fill="#ef4444" fontSize={11} fontWeight="bold">
            FIN
          </text>
          <text x={190} y={70} textAnchor="middle" fill="#ef4444" fontSize={9}>
            seq=x, FIN=1
          </text>

          {/* Step 2: ACK ← */}
          <line x1={320} y1={100} x2={90} y2={120} stroke="#10b981" strokeWidth={2} />
          <polygon points="92,117 80,122 90,128" fill="#10b981" />
          <text x={190} y={98} textAnchor="middle" fill="#10b981" fontSize={11} fontWeight="bold">
            ACK
          </text>
          <text x={190} y={110} textAnchor="middle" fill="#10b981" fontSize={9}>
            ack=x+1
          </text>

          {/* Step 3: FIN ← */}
          <line x1={320} y1={140} x2={90} y2={160} stroke="#ef4444" strokeWidth={2} />
          <polygon points="92,157 80,162 90,168" fill="#ef4444" />
          <text x={190} y={138} textAnchor="middle" fill="#ef4444" fontSize={11} fontWeight="bold">
            FIN
          </text>
          <text x={190} y={150} textAnchor="middle" fill="#ef4444" fontSize={9}>
            seq=y, FIN=1
          </text>

          {/* Step 4: ACK → */}
          <line x1={80} y1={180} x2={310} y2={200} stroke="#10b981" strokeWidth={2} />
          <polygon points="308,197 320,202 310,208" fill="#10b981" />
          <text x={190} y={178} textAnchor="middle" fill="#10b981" fontSize={11} fontWeight="bold">
            ACK (TIME_WAIT)
          </text>
          <text x={190} y={190} textAnchor="middle" fill="#10b981" fontSize={9}>
            ack=y+1
          </text>

          {/* TIME_WAIT label */}
          <text x={55} y={220} textAnchor="middle" fill="#f59e0b" fontSize={9} fontStyle="italic">
            TIME_WAIT
          </text>
          <text x={55} y={231} textAnchor="middle" fill="#f59e0b" fontSize={9} fontStyle="italic">
            2×MSL
          </text>
          <text x={325} y={220} textAnchor="middle" fill="#64748b" fontSize={9} fontStyle="italic">
            CLOSED
          </text>
        </svg>

        <InfoCallout variant="info" title="¿Por qué 4 pasos y no 2?">
          <p>
            TCP es <strong>full-duplex</strong>: dos flujos de datos
            independientes corren en paralelo (cliente→servidor y
            servidor→cliente). Cada flujo necesita su propio FIN y su propio
            ACK. Por eso son 4 mensajes: 2 FINs (uno por dirección) + 2 ACKs
            (uno por cada FIN). En ocasiones, el servidor puede combinar el ACK
            del FIN del cliente con su propio FIN (piggybacking), reduciendo a
            3 mensajes — pero conceptualmente siempre son 4 eventos.
          </p>
        </InfoCallout>

        <InfoCallout variant="info" title="Control de flujo vs Control de congestión">
          <p>
            <strong>Control de flujo (rwnd):</strong> evita desbordar al{" "}
            <em>receptor</em>. El receptor anuncia cuánto espacio libre tiene en
            su buffer. <strong>Control de congestión (cwnd):</strong> evita
            desbordar la <em>red</em>. El emisor ajusta su tasa de envío según la
            congestión percibida. El emisor envía a velocidad ={" "}
            <code className="bg-card dark:bg-white/10 px-1 rounded">min(cwnd, rwnd)</code>.
          </p>
        </InfoCallout>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 5: Control de Congestión */}
      {/* ============================================ */}
      <SectionBlock
        id="control-congestion"
        title="Control de Congestión TCP"
      >
        <p className="text-muted leading-relaxed">
          TCP usa un esquema de control de congestión end-to-end llamado{" "}
          <strong>AIMD</strong> (Additive Increase, Multiplicative Decrease). La
          idea: incrementar la tasa de envío gradualmente hasta detectar
          congestión, luego reducirla drásticamente.
        </p>

        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          <ConceptCard
            title="Slow Start"
            icon={Activity}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p>
              Inicio con cwnd = 1 MSS. Se <strong>duplica</strong> cada RTT
              (crecimiento exponencial). Continúa hasta alcanzar{" "}
              <strong>ssthresh</strong> o detectar pérdida.
            </p>
          </ConceptCard>
          <ConceptCard
            title="Congestion Avoidance"
            icon={Shield}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <p>
              Una vez cwnd ≥ ssthresh, crece <strong>linealmente</strong> (+1 MSS
              por RTT). Más cauteloso que slow start. Continúa hasta detectar
              pérdida.
            </p>
          </ConceptCard>
          <ConceptCard
            title="Reacción ante pérdida"
            icon={Timer}
            color="bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800"
          >
            <p>
              <strong>Timeout:</strong> ssthresh = cwnd/2, cwnd = 1 MSS (vuelve a
              slow start). <strong>3 Dup ACKs:</strong> ssthresh = cwnd/2, cwnd =
              ssthresh (fast recovery, más suave).
            </p>
          </ConceptCard>
        </div>

        <h3 className="text-lg font-semibold mb-3">
          Simulador de Control de Congestión
        </h3>
        <p className="text-sm text-muted mb-4">
          Haz clic en &quot;Avanzar RTT&quot; para ver crecer cwnd. Usa
          &quot;Timeout&quot; o &quot;3 Dup ACKs&quot; para simular eventos de
          pérdida y observar cómo reacciona TCP.
        </p>
        <CongestionControl />

        <ExampleBlock title="Evolución de cwnd">
          <p>
            Supongamos ssthresh inicial = 8 MSS:
          </p>
          <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 dark:bg-white/[0.07] rounded p-3">
            <p className="font-bold">Slow Start (exponencial):</p>
            <p>RTT 0: cwnd = 1 → RTT 1: cwnd = 2 → RTT 2: cwnd = 4 → RTT 3: cwnd = 8</p>
            <p className="font-bold pt-1 border-t border-amber-300">Congestion Avoidance (lineal, cwnd ≥ ssthresh):</p>
            <p>RTT 4: cwnd = 9 → RTT 5: cwnd = 10 → RTT 6: cwnd = 11 → RTT 7: cwnd = 12</p>
            <p className="font-bold pt-1 border-t border-amber-300">Timeout en RTT 7 (cwnd = 12):</p>
            <p>ssthresh = 12/2 = 6, cwnd = 1 → Vuelve a Slow Start</p>
            <p className="font-bold pt-1 border-t border-amber-300">3 Dup ACKs en RTT 7 (cwnd = 12):</p>
            <p>ssthresh = 12/2 = 6, cwnd = 6 → Entra en Congestion Avoidance directamente</p>
          </div>
        </ExampleBlock>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 6: Ventana Deslizante */}
      {/* ============================================ */}
      <SectionBlock
        id="ventana-deslizante"
        title="Ventana Deslizante y Control de Flujo"
      >
        <p className="text-muted leading-relaxed">
          La <strong>ventana deslizante</strong> es el mecanismo que permite a TCP
          enviar múltiples segmentos sin esperar ACK individual (pipelining). La
          ventana define qué segmentos están &quot;permitidos&quot; para enviar.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-3">
          Simulador de Ventana Deslizante
        </h3>
        <p className="text-sm text-muted mb-4">
          Envía paquetes y observa cómo la ventana se desliza al recibir ACKs.
          Hay un 15% de probabilidad de pérdida para simular un canal con errores.
          Si un paquete se pierde (rojo), usa &quot;Retransmitir Perdido&quot;.
        </p>
        <SlidingWindow />

        <div className="grid gap-4 sm:grid-cols-2 mt-6">
          <ConceptCard title="Go-Back-N (GBN)" icon={ArrowLeftRight} color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800">
            <ul className="space-y-1 list-disc list-inside">
              <li>El receptor solo acepta paquetes <strong>en orden</strong></li>
              <li>Usa <strong>ACKs acumulativos</strong> (ACK n confirma todo hasta n)</li>
              <li>Si se pierde un paquete, el emisor <strong>retransmite todos</strong> desde ese punto</li>
              <li>Simple pero ineficiente con alta tasa de pérdida</li>
            </ul>
          </ConceptCard>
          <ConceptCard title="Selective Repeat (SR)" icon={ArrowLeftRight} color="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800">
            <ul className="space-y-1 list-disc list-inside">
              <li>El receptor acepta paquetes <strong>fuera de orden</strong> y los almacena</li>
              <li>Usa <strong>ACKs individuales</strong> para cada paquete</li>
              <li>Solo se retransmite el paquete <strong>específico</strong> perdido</li>
              <li>Más eficiente pero requiere más buffer en el receptor</li>
            </ul>
          </ConceptCard>
        </div>

        <InfoCallout variant="info" title="TCP combina ambos enfoques">
          <p>
            TCP usa una combinación: ACKs acumulativos (como GBN) pero con buffer
            para paquetes fuera de orden (como SR). Además, implementa{" "}
            <strong>fast retransmit</strong>: si recibe 3 ACKs duplicados para el
            mismo número de secuencia, retransmite ese segmento inmediatamente sin
            esperar el timeout.
          </p>
        </InfoCallout>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 7: Quiz */}
      {/* ============================================ */}
      <SectionBlock id="quiz" title="Quiz del Capítulo 3">
        <p className="text-muted leading-relaxed mb-4">
          Evalúa tu comprensión de la capa de transporte: UDP, TCP, transferencia
          confiable, control de flujo y control de congestión.
        </p>
        <QuizContainer questions={quizCh3} chapterTitle={chapter.title} />
      </SectionBlock>
    </ChapterLayout>
  );
}

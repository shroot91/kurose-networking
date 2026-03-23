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
            color="bg-blue-50 text-blue-700 border-blue-200"
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
            color="bg-emerald-50 text-emerald-700 border-emerald-200"
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
          <ConceptCard title="Ventajas de UDP" icon={Zap} color="bg-emerald-50 text-emerald-700 border-emerald-200">
            <ul className="space-y-1 list-disc list-inside">
              <li>Sin establecimiento de conexión (sin retardo adicional)</li>
              <li>Sin estado de conexión (más conexiones simultáneas)</li>
              <li>Header pequeño (8 bytes vs 20 de TCP)</li>
              <li>Sin control de congestión (envía tan rápido como quiera)</li>
              <li>Ideal para: DNS, streaming, juegos online, VoIP</li>
            </ul>
          </ConceptCard>
          <ConceptCard title="Checksum UDP" icon={Shield} color="bg-amber-50 text-amber-700 border-amber-200">
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
          <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 rounded p-3">
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
          <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 rounded p-3">
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

        <ExampleBlock title="Números de secuencia TCP">
          <p>
            Un archivo de <strong>500,000 bytes</strong> se transmite con MSS ={" "}
            <strong>1,000 bytes</strong> y ISN (número de secuencia inicial) ={" "}
            <strong>0</strong>.
          </p>
          <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 rounded p-3">
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

        <InfoCallout variant="info" title="Control de flujo vs Control de congestión">
          <p>
            <strong>Control de flujo (rwnd):</strong> evita desbordar al{" "}
            <em>receptor</em>. El receptor anuncia cuánto espacio libre tiene en
            su buffer. <strong>Control de congestión (cwnd):</strong> evita
            desbordar la <em>red</em>. El emisor ajusta su tasa de envío según la
            congestión percibida. El emisor envía a velocidad ={" "}
            <code className="bg-slate-100 px-1 rounded">min(cwnd, rwnd)</code>.
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
            color="bg-blue-50 text-blue-700 border-blue-200"
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
            color="bg-emerald-50 text-emerald-700 border-emerald-200"
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
            color="bg-red-50 text-red-700 border-red-200"
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
          <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 rounded p-3">
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
          <ConceptCard title="Go-Back-N (GBN)" icon={ArrowLeftRight} color="bg-blue-50 text-blue-700 border-blue-200">
            <ul className="space-y-1 list-disc list-inside">
              <li>El receptor solo acepta paquetes <strong>en orden</strong></li>
              <li>Usa <strong>ACKs acumulativos</strong> (ACK n confirma todo hasta n)</li>
              <li>Si se pierde un paquete, el emisor <strong>retransmite todos</strong> desde ese punto</li>
              <li>Simple pero ineficiente con alta tasa de pérdida</li>
            </ul>
          </ConceptCard>
          <ConceptCard title="Selective Repeat (SR)" icon={ArrowLeftRight} color="bg-purple-50 text-purple-700 border-purple-200">
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

import { chapters } from "@/data/chapters";
import { ChapterLayout } from "@/components/layout/chapter-layout";
import { SectionBlock } from "@/components/content/section-block";
import { ConceptCard } from "@/components/content/concept-card";
import { ExampleBlock } from "@/components/content/example-block";
import { ComparisonTable } from "@/components/content/comparison-table";
import { InfoCallout } from "@/components/content/info-callout";
import { QuizContainer } from "@/components/quiz/quiz-container";
import { quizCh6 } from "@/data/quiz-ch6";
import { SwitchLearning } from "@/components/diagrams/switch-learning";
import {
  Cable,
  Wifi,
  Server,
  Shield,
  AlertTriangle,
  CheckCircle,
  Radio,
  Network,
  GitBranch,
  Layers,
  Activity,
} from "lucide-react";

const chapter = chapters[5];

export default function Capitulo6() {
  return (
    <ChapterLayout chapter={chapter}>
      {/* ============================================ */}
      {/* SECCIÓN 1: Introducción a la Capa de Enlace */}
      {/* ============================================ */}
      <SectionBlock id="intro-enlace" title="Introducción a la Capa de Enlace">
        <p className="text-muted leading-relaxed">
          La <strong>capa de enlace</strong> es responsable de mover{" "}
          <strong>tramas</strong> (frames) entre nodos adyacentes sobre un único
          enlace de comunicación. A diferencia de la capa de red, que maneja el
          camino extremo a extremo, la capa de enlace solo se ocupa de{" "}
          <strong>un salto a la vez</strong>: de un nodo al siguiente.
        </p>

        <p className="text-muted leading-relaxed">
          La capa de enlace está implementada principalmente en la{" "}
          <strong>NIC</strong> (Network Interface Card / adaptador de red), que
          combina hardware especializado, firmware y software de driver. Cada
          host tiene al menos una NIC que conecta el sistema al medio físico.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Servicios de la Capa de Enlace"
            icon={Layers}
            color="bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/30 dark:text-teal-300 dark:border-teal-800"
          >
            <ul className="space-y-1.5 list-disc list-inside">
              <li>
                <strong>Entramado (Framing):</strong> encapsula el datagrama de
                red en una trama con encabezado y trailer
              </li>
              <li>
                <strong>Acceso al enlace (MAC):</strong> controla cómo los
                nodos comparten el medio de transmisión
              </li>
              <li>
                <strong>Entrega confiable:</strong> ACKs y retransmisión en
                enlaces propensos a errores (WiFi) — no siempre ofrecida
                (Ethernet no lo hace)
              </li>
              <li>
                <strong>Detección/corrección de errores:</strong> detecta bits
                alterados por ruido o distorsión
              </li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="Tipos de Enlace"
            icon={Cable}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <ul className="space-y-1.5 list-disc list-inside">
              <li>
                <strong>Punto a punto (PPP, HDLC):</strong> un único emisor y
                un receptor — no hay problema de acceso compartido
              </li>
              <li>
                <strong>Broadcast (Ethernet, WiFi):</strong> múltiples nodos
                comparten el mismo canal — necesita protocolo MAC para coordinar
              </li>
              <li>
                Los enlaces broadcast requieren reglas para evitar que las
                transmisiones simultáneas causen{" "}
                <strong>colisiones</strong>
              </li>
            </ul>
          </ConceptCard>
        </div>

        <InfoCallout variant="tip" title="Analogía:">
          <p>
            Si la capa de red es el sistema de autopistas del país, la capa de
            enlace es el tramo específico de calle entre dos semáforos. Cada
            tramo tiene sus propias reglas de tráfico: en una calle de doble
            mano (broadcast), los vehículos deben coordinarse para no chocar;
            en una calle de sentido único (punto a punto), no hay problema.
          </p>
        </InfoCallout>

        <ComparisonTable
          headers={["Característica", "Punto a Punto", "Broadcast"]}
          rows={[
            [
              "Dominio de colisión",
              "Sin colisiones (solo 2 nodos)",
              "Un único dominio de colisión compartido",
            ],
            [
              "Protocolo MAC necesario",
              "No (PPP, HDLC son simples)",
              "Sí (CSMA/CD, CSMA/CA, ALOHA)",
            ],
            [
              "Ejemplos",
              "Enlace WAN punto a punto, PPP dial-up",
              "Ethernet 802.3, WiFi 802.11, Cable coaxial",
            ],
          ]}
        />
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 2: Detección y Corrección de Errores */}
      {/* ============================================ */}
      <SectionBlock
        id="deteccion-errores"
        title="Detección y Corrección de Errores"
      >
        <p className="text-muted leading-relaxed">
          Los bits se pueden alterar durante la transmisión por ruido eléctrico,
          interferencia o distorsión de señal. La capa de enlace implementa
          técnicas de <strong>detección</strong> (saber que hubo error) y, en
          algunos casos, de <strong>corrección</strong> (identificar y reparar
          el bit erróneo) sin retransmisión.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Paridad Simple (1 bit)"
            icon={CheckCircle}
            color="bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/30 dark:text-teal-300 dark:border-teal-800"
          >
            <p>
              Se agrega 1 bit de paridad para que el total de 1s sea par (paridad
              par) o impar (paridad impar). Detecta errores de{" "}
              <strong>1 bit</strong> (o cualquier número impar de bits). No puede
              detectar errores de 2 bits que se cancelan entre sí. No tiene
              capacidad de corrección.
            </p>
          </ConceptCard>
          <ConceptCard
            title="Paridad 2D (Bidimensional)"
            icon={Layers}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p>
              Los bits se organizan en una matriz d×w. Se calcula paridad por
              cada <strong>fila</strong> y por cada <strong>columna</strong>. Si
              un bit cambia, falla la paridad de su fila Y su columna — la
              intersección indica la posición exacta. Puede{" "}
              <strong>detectar y corregir</strong> errores de 1 bit, y detectar
              (no corregir) errores de 2 bits.
            </p>
          </ConceptCard>
          <ConceptCard
            title="Checksum de Internet"
            icon={Shield}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <p>
              Suma de palabras de 16 bits en complemento a 1. Rápido y sencillo;
              usado en IP, TCP, UDP. Debilidad: si dos bits cambian y sus errores
              se cancelan, el error no se detecta. También vulnerable a
              reordenamiento de bytes del payload.
            </p>
          </ConceptCard>
          <ConceptCard
            title="CRC — Máxima Potencia"
            icon={Activity}
            color="bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800"
          >
            <p>
              CRC (Cyclic Redundancy Check) trata los bits como polinomio. El
              emisor divide el mensaje D(x) por G(x) (generador) y adjunta el
              residuo R como FCS. Detecta todos los errores de 1 bit, 2 bits,
              número impar de errores, y ráfagas de longitud{" "}
              <strong>{"< r bits"}</strong>. Ethernet usa CRC-32.
            </p>
          </ConceptCard>
        </div>

        <InfoCallout variant="tip" title="Analogía:">
          <p>
            La paridad simple es como verificar si llegaron todos los vagones de
            un tren — sabés si falta uno pero no cuál. La paridad 2D es como
            una hoja de cálculo con totales por fila y columna: si algo falla,
            podés encontrar exactamente qué celda está mal. El CRC es como un
            código de barras matemático que detecta hasta la más mínima
            alteración.
          </p>
        </InfoCallout>

        <ExampleBlock title="Cálculo manual de CRC">
          <p>
            Dado el mensaje <strong>D = 101110</strong> y el polinomio
            generador <strong>G = 1001</strong> (grado r = 3), calcular el FCS:
          </p>
          <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 dark:bg-white/[0.07] rounded p-3">
            <p className="text-slate-500 dark:text-slate-400">
              Paso 1: D·2³ = 101110000 (agregar r=3 ceros al mensaje)
            </p>
            <p className="text-slate-500 dark:text-slate-400">
              Paso 2: División XOR de 101110000 ÷ 1001
            </p>
            <p className="pt-1">101110000</p>
            <p>1001</p>
            <p className="border-t border-amber-300 pt-1">00001 (XOR primeros 4 bits)</p>
            <p className="pt-1">  00110000</p>
            <p>  1001</p>
            <p className="border-t border-amber-300 pt-1">   01110</p>
            <p className="pt-1">    1110 00</p>
            <p>    1001</p>
            <p className="border-t border-amber-300 pt-1">     111 0</p>
            <p className="pt-1">      1110</p>
            <p>      1001</p>
            <p className="border-t border-amber-300 pt-1">       <strong>R = 011</strong> ← FCS (residuo)</p>
            <p className="pt-2 text-slate-500 dark:text-slate-400">
              Trama transmitida: D + R = 101110 + 011 = <strong>101110011</strong>
            </p>
            <p className="pt-1 text-slate-500 dark:text-slate-400">
              Receptor: 101110011 ÷ 1001 → residuo = 000 → sin errores ✓
            </p>
          </div>
          <p className="mt-2">
            Si el receptor obtiene residuo distinto de 0, hubo error. La trama
            se descarta y (si hay entrega confiable) se solicita retransmisión.
          </p>
        </ExampleBlock>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 3: Protocolos de Acceso Múltiple */}
      {/* ============================================ */}
      <SectionBlock id="acceso-multiple" title="Protocolos de Acceso Múltiple">
        <p className="text-muted leading-relaxed">
          Un <strong>canal broadcast</strong> es compartido por múltiples nodos.
          Si dos o más transmiten simultáneamente, sus señales interfieren —
          ocurre una <strong>colisión</strong>. Los protocolos de acceso
          múltiple (MAC) coordinan cómo los nodos comparten el canal.
        </p>

        <p className="text-muted leading-relaxed">
          Existen tres grandes categorías, con características muy diferentes:
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <ConceptCard
            title="Partición del Canal"
            icon={Layers}
            color="bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/30 dark:text-teal-300 dark:border-teal-800"
          >
            <ul className="space-y-1 list-disc list-inside text-sm">
              <li>
                <strong>TDMA:</strong> divide el tiempo en slots fijos. Cada
                nodo recibe su slot. Sin colisiones, pero desperdicia capacidad
                cuando un nodo no transmite.
              </li>
              <li>
                <strong>FDMA:</strong> divide el espectro en bandas de
                frecuencia. Mismo problema de desperdicio.
              </li>
              <li>
                <strong>CDMA:</strong> cada nodo usa un código único (chip
                code). Todos transmiten a la vez en la misma frecuencia. Usado
                en 3G celular.
              </li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="Acceso Aleatorio"
            icon={Radio}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <ul className="space-y-1 list-disc list-inside text-sm">
              <li>
                <strong>Pure ALOHA:</strong> transmite cuando quieras.
                Eficiencia: 18%.
              </li>
              <li>
                <strong>Slotted ALOHA:</strong> solo al inicio del slot.
                Eficiencia: 37%.
              </li>
              <li>
                <strong>CSMA:</strong> escucha antes de transmitir. Reduce pero
                no elimina colisiones.
              </li>
              <li>
                <strong>CSMA/CD:</strong> detecta colisión → para y aplica
                backoff. Ethernet.
              </li>
              <li>
                <strong>CSMA/CA:</strong> evita colisión con espera previa.
                WiFi.
              </li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="Turno Controlado"
            icon={GitBranch}
            color="bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800"
          >
            <ul className="space-y-1 list-disc list-inside text-sm">
              <li>
                <strong>Polling:</strong> nodo maestro consulta a cada esclavo
                en round-robin. Sin colisiones. El maestro es punto único de
                fallo.
              </li>
              <li>
                <strong>Token Passing:</strong> un token circula por el anillo;
                solo el nodo con el token puede transmitir. Justo y sin
                colisiones. Usado en Token Ring, FDDI.
              </li>
            </ul>
          </ConceptCard>
        </div>

        <InfoCallout variant="tip" title="Analogía:">
          <p>
            CSMA/CD es como frenar cuando chocás con otro auto — ya hubo
            colisión, la detectás y retrocedés. CSMA/CA es como asegurarte de
            que no hay autos en el cruce antes de arrancar — intentás evitar la
            colisión antes de que ocurra.
          </p>
        </InfoCallout>

        <InfoCallout variant="info" title="CSMA/CD: Algoritmo completo">
          <p>
            (1) Preparar trama. (2) Si canal libre → transmitir. Si canal
            ocupado → esperar hasta liberar. (3) Mientras se transmite,
            monitorear el canal. Si se detecta colisión → enviar señal{" "}
            <strong>jam</strong> (48 bits) para asegurar que todos detecten la
            colisión. (4) Abortar la transmisión. (5) Aplicar{" "}
            <strong>backoff exponencial binario</strong>: tras la k-ésima
            colisión, esperar un tiempo aleatorio de {"{0,...,2^k−1}"} ×
            512 bit-times. (6) Volver al paso 2.
          </p>
        </InfoCallout>

        <ExampleBlock title="CSMA/CD — Backoff exponencial tras 3 colisiones">
          <p>
            Un nodo Ethernet sufre su <strong>3.ª colisión</strong> al intentar
            transmitir una trama. Aplicando backoff exponencial con k = 3:
          </p>
          <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 dark:bg-white/[0.07] rounded p-3">
            <p>k = 3 → rango = {"{"} 0, 1, 2, ..., 2³−1 {"}"} = {"{"} 0, 1, ..., 7 {"}"}</p>
            <p>Supongamos que el nodo elige aleatoriamente: <strong>5</strong></p>
            <p className="pt-2 border-t border-amber-300">
              Espera = 5 × 512 bit-times
            </p>
            <p>En Ethernet 10 Mbps: 1 slot = 512 bits / 10×10⁶ bps = 51.2 μs</p>
            <p>Tiempo de espera = 5 × 51.2 μs = <strong>256 μs</strong></p>
          </div>
          <p className="mt-2">
            Si hubiera una 10.ª colisión, el rango sería{" "}
            {"{0,...,1023}"} y el máximo espera sería ≈52 ms. Después de 16
            colisiones consecutivas, Ethernet reporta error a la capa superior.
          </p>
        </ExampleBlock>

        <ComparisonTable
          headers={[
            "Protocolo",
            "Eficiencia máx.",
            "Manejo de colisiones",
            "Mejor para",
          ]}
          rows={[
            [
              "TDMA",
              "100% si todos activos",
              "Sin colisiones (turnos fijos)",
              "Tráfico constante y uniforme",
            ],
            [
              "Slotted ALOHA",
              "37% (1/e)",
              "Retransmisión aleatoria",
              "Tráfico esporádico, simplicidad",
            ],
            [
              "CSMA/CD",
              "~80–90% con carga ligera",
              "Detección + backoff exp.",
              "Ethernet cableado (LAN)",
            ],
            [
              "CSMA/CA",
              "~60–70% con carga ligera",
              "Evitación + ACK + backoff",
              "WiFi 802.11 (inalámbrico)",
            ],
            [
              "Token Passing",
              "~90% con carga alta",
              "Sin colisiones (token)",
              "Cargas pesadas, latencia predecible",
            ],
          ]}
        />
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 4: Ethernet y ARP */}
      {/* ============================================ */}
      <SectionBlock id="ethernet" title="Ethernet y ARP">
        <p className="text-muted leading-relaxed">
          <strong>Ethernet</strong> (IEEE 802.3) es la tecnología de red LAN
          cableada dominante en el mundo. Evolucionó desde topología de bus
          compartido (con colisiones) a topología en estrella con switches
          (prácticamente sin colisiones). Soporta velocidades desde 10 Mbps
          hasta 400 Gbps.
        </p>

        {/* SVG: Estructura de trama Ethernet */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-2">
            Estructura de la trama Ethernet 802.3:
          </p>
          <svg
            viewBox="0 0 700 120"
            className="w-full max-w-2xl mx-auto"
            aria-label="Diagrama de trama Ethernet"
          >
            {/* Preámbulo */}
            <rect x="0" y="20" width="80" height="50" rx="4" fill="#0d9488" />
            <text x="40" y="42" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Preámbulo</text>
            <text x="40" y="56" textAnchor="middle" fill="#ccfbf1" fontSize="8">7 bytes</text>
            <text x="40" y="68" textAnchor="middle" fill="#ccfbf1" fontSize="7">10101010</text>
            {/* SFD */}
            <rect x="82" y="20" width="50" height="50" rx="4" fill="#0f766e" />
            <text x="107" y="42" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">SFD</text>
            <text x="107" y="56" textAnchor="middle" fill="#ccfbf1" fontSize="8">1 byte</text>
            <text x="107" y="68" textAnchor="middle" fill="#ccfbf1" fontSize="7">10101011</text>
            {/* MAC Destino */}
            <rect x="134" y="20" width="80" height="50" rx="4" fill="#1d4ed8" />
            <text x="174" y="42" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">MAC Dst</text>
            <text x="174" y="56" textAnchor="middle" fill="#bfdbfe" fontSize="8">6 bytes</text>
            {/* MAC Origen */}
            <rect x="216" y="20" width="80" height="50" rx="4" fill="#2563eb" />
            <text x="256" y="42" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">MAC Src</text>
            <text x="256" y="56" textAnchor="middle" fill="#bfdbfe" fontSize="8">6 bytes</text>
            {/* Type */}
            <rect x="298" y="20" width="60" height="50" rx="4" fill="#7c3aed" />
            <text x="328" y="42" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Type</text>
            <text x="328" y="56" textAnchor="middle" fill="#ede9fe" fontSize="8">2 bytes</text>
            <text x="328" y="68" textAnchor="middle" fill="#ede9fe" fontSize="7">0x0800</text>
            {/* Datos */}
            <rect x="360" y="20" width="200" height="50" rx="4" fill="#059669" />
            <text x="460" y="42" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Datos (payload)</text>
            <text x="460" y="56" textAnchor="middle" fill="#d1fae5" fontSize="8">46 – 1500 bytes</text>
            <text x="460" y="68" textAnchor="middle" fill="#d1fae5" fontSize="7">Datagrama IP</text>
            {/* CRC */}
            <rect x="562" y="20" width="60" height="50" rx="4" fill="#b45309" />
            <text x="592" y="42" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">CRC-32</text>
            <text x="592" y="56" textAnchor="middle" fill="#fef3c7" fontSize="8">4 bytes</text>
            <text x="592" y="68" textAnchor="middle" fill="#fef3c7" fontSize="7">FCS</text>
            {/* Nota al pie */}
            <text x="350" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">Trama mínima: 64 bytes | Trama máxima: 1518 bytes (sin tag VLAN)</text>
          </svg>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Características de Ethernet"
            icon={Cable}
            color="bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/30 dark:text-teal-300 dark:border-teal-800"
          >
            <ul className="space-y-1 list-disc list-inside text-sm">
              <li>
                <strong>Sin conexión:</strong> no hay handshaking antes de
                enviar la trama
              </li>
              <li>
                <strong>No confiable:</strong> no hay ACKs — la fiabilidad
                depende de TCP en la capa superior
              </li>
              <li>
                <strong>Estándares:</strong> 10BASE-T (10 Mbps), 100BASE-TX
                (Fast), 1000BASE-T (Gigabit), 10GBASE-T, 40G, 100G
              </li>
              <li>
                El tamaño mínimo de datos (46 bytes) garantiza que la trama sea
                lo suficientemente larga para que CSMA/CD detecte colisiones
              </li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="Direcciones MAC"
            icon={Network}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <ul className="space-y-1 list-disc list-inside text-sm">
              <li>
                <strong>48 bits</strong> (6 bytes), escritas en hexadecimal
                (ej: A4:C3:F0:23:12:AB)
              </li>
              <li>
                Los primeros 24 bits = <strong>OUI</strong> (fabricante);
                últimos 24 = número único del dispositivo
              </li>
              <li>
                <strong>Planas</strong> (flat): no codifican ubicación —
                la misma MAC en cualquier red
              </li>
              <li>
                Broadcast: <strong>FF:FF:FF:FF:FF:FF</strong>
              </li>
              <li>
                &quot;Quemadas&quot; (burned-in) en la ROM de la NIC por el fabricante
              </li>
            </ul>
          </ConceptCard>
        </div>

        <InfoCallout variant="tip" title="Analogía:">
          <p>
            La trama Ethernet es como un sobre postal: tiene dirección de
            destino (MAC destino), dirección de remitente (MAC origen), el
            contenido (datos IP), y un sello de verificación al final (CRC).
            Pero a diferencia del correo, Ethernet es &quot;no confiable&quot;: si el
            sobre se pierde o llega dañado, nadie avisa al remitente — eso es
            trabajo de TCP.
          </p>
        </InfoCallout>

        {/* ARP */}
        <h3 className="text-lg font-semibold text-foreground pt-2">
          ARP: Address Resolution Protocol
        </h3>

        <p className="text-muted leading-relaxed">
          <strong>Problema:</strong> la capa de red conoce la IP destino, pero
          para construir la trama Ethernet se necesita la{" "}
          <strong>dirección MAC</strong>. ARP resuelve este mapeo{" "}
          <em>dentro de la misma subred</em>.
        </p>

        <ExampleBlock title="Proceso ARP paso a paso">
          <p>
            <strong>Caso 1 — Misma subred:</strong> Host A (192.168.1.1 /
            AA:AA:AA:AA:AA:AA) quiere enviar a Host B (192.168.1.5):
          </p>
          <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 dark:bg-white/[0.07] rounded p-3">
            <p>1. A revisa su caché ARP → MAC de 192.168.1.5 no encontrada</p>
            <p>2. A envía ARP Request (broadcast):</p>
            <p>   dst MAC=FF:FF:FF:FF:FF:FF, src MAC=AA:AA:AA:AA:AA:AA</p>
            <p>   Payload: &quot;¿Quién tiene 192.168.1.5? Responder a AA:AA:AA:AA:AA:AA&quot;</p>
            <p>3. Host B (192.168.1.5) recibe el broadcast → responde:</p>
            <p>   ARP Reply (unicast a A): &quot;192.168.1.5 está en BB:BB:BB:BB:BB:BB&quot;</p>
            <p>4. A guarda {"{192.168.1.5 → BB:BB:BB:BB:BB:BB}"} en caché (TTL ~20 min)</p>
            <p>5. A envía la trama Ethernet con dst MAC = BB:BB:BB:BB:BB:BB ✓</p>
          </div>
          <p className="mt-3">
            <strong>Caso 2 — Subred diferente:</strong> Host A quiere enviar a
            Host C (10.0.0.1) en otra red:
          </p>
          <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 dark:bg-white/[0.07] rounded p-3">
            <p>1. A detecta que 10.0.0.1 está fuera de su subred /24</p>
            <p>2. A hace ARP para la IP de su <strong>gateway por defecto</strong> (192.168.1.254)</p>
            <p>3. El router responde con su MAC: GG:GG:GG:GG:GG:GG</p>
            <p>4. A envía trama con dst MAC = GG:GG:GG:GG:GG:GG (MAC del router)</p>
            <p>   pero IP destino = 10.0.0.1 (IP de C) — el router se encarga del resto</p>
          </div>
        </ExampleBlock>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="ARP Request y Reply"
            icon={Radio}
            color="bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/30 dark:text-teal-300 dark:border-teal-800"
          >
            <ul className="space-y-1 list-disc list-inside text-sm">
              <li>Request: broadcast a toda la subred (FF:FF:FF:FF:FF:FF)</li>
              <li>Reply: unicast al solicitante</li>
              <li>Caché ARP almacena los mapeos con TTL (~20 min)</li>
              <li>
                ARP es <strong>sin estado</strong>: cualquier nodo puede enviar
                un ARP Reply aunque no lo hayan pedido (Gratuitous ARP)
              </li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="ARP Gratuito y Gateway"
            icon={AlertTriangle}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <ul className="space-y-1 list-disc list-inside text-sm">
              <li>
                <strong>Gratuitous ARP:</strong> un nodo anuncia su propia MAC
                → actualiza cachés de otros, usado al cambiar NIC o IP
              </li>
              <li>
                Para comunicación inter-subred, ARP resuelve la MAC del{" "}
                <strong>router (gateway)</strong>, no la del destino final
              </li>
              <li>
                ARP solo funciona dentro de la misma red de nivel 2 (mismo
                segmento Ethernet)
              </li>
            </ul>
          </ConceptCard>
        </div>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 5: Switches y Hubs */}
      {/* ============================================ */}
      <SectionBlock id="switches" title="Switches y Hubs">
        <p className="text-muted leading-relaxed">
          Los dispositivos de interconexión de LAN operan en diferentes capas y
          tienen capacidades muy distintas. Entender sus diferencias es
          fundamental para el diseño de redes de área local.
        </p>

        <ComparisonTable
          headers={[
            "Característica",
            "Hub",
            "Switch",
            "Router",
          ]}
          rows={[
            ["Capa OSI", "Capa 1 (Física)", "Capa 2 (Enlace)", "Capa 3 (Red)"],
            [
              "Dominio de colisión",
              "Uno solo (todos los puertos)",
              "Cada puerto es su propio dominio",
              "Cada interfaz es su propio dominio",
            ],
            [
              "Dominio de broadcast",
              "Uno solo",
              "Uno solo (por defecto)",
              "Separado por interfaz / subred",
            ],
            ["Tabla MAC", "No", "Sí (auto-aprendida)", "No (usa tabla de rutas)"],
            [
              "Tabla de rutas IP",
              "No",
              "No",
              "Sí (construida por protocolos de enrutamiento)",
            ],
          ]}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Auto-aprendizaje del Switch"
            icon={Server}
            color="bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/30 dark:text-teal-300 dark:border-teal-800"
          >
            <ul className="space-y-1.5 list-disc list-inside">
              <li>
                Cuando llega una trama desde MAC X por puerto P → registra
                {"{"} X → P {"}"} en la tabla (CAM table) con TTL ~5 min
              </li>
              <li>
                <strong>Destino conocido:</strong> reenvía solo al puerto
                correspondiente
              </li>
              <li>
                <strong>Destino desconocido:</strong> inunda (flood) a todos
                los puertos excepto el de entrada
              </li>
              <li>
                <strong>Plug-and-play:</strong> no requiere configuración
                manual, transparente a los hosts
              </li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="Ventajas del Switch"
            icon={CheckCircle}
            color="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800"
          >
            <ul className="space-y-1.5 list-disc list-inside">
              <li>
                Elimina colisiones (cada puerto = dominio de colisión aislado)
              </li>
              <li>Puede interconectar puertos de diferentes velocidades</li>
              <li>
                <strong>Store-and-forward:</strong> almacena la trama completa,
                verifica CRC, luego reenvía
              </li>
              <li>
                Múltiples conversaciones simultáneas sin interferencia
              </li>
            </ul>
          </ConceptCard>
        </div>

        <InfoCallout variant="tip" title="Analogía:">
          <p>
            Un switch es como un portero inteligente en un edificio: la primera
            vez que ve a alguien, anota a qué piso va; la próxima vez que
            llegue correspondencia para esa persona, sabe exactamente a qué
            ascensor enviarla. Si no sabe a quién pertenece un paquete, lo
            reparte a todos los pisos y espera ver quién responde.
          </p>
        </InfoCallout>

        <ExampleBlock title="Auto-aprendizaje con 4 hosts">
          <p>
            Red con hosts A, B, C, D conectados a puertos 1, 2, 3, 4 de un
            switch. Tabla inicial vacía:
          </p>
          <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 dark:bg-white/[0.07] rounded p-3">
            <p className="text-slate-500 dark:text-slate-400">Evento 1: A envía a B (puerto 1 → destino B en puerto 2)</p>
            <p>  → Aprende: A en puerto 1</p>
            <p>  → B desconocido → FLOOD a puertos 2, 3, 4</p>
            <p>  → Tabla: {"{A→1}"}</p>
            <p className="pt-1 text-slate-500 dark:text-slate-400">Evento 2: B responde a A (puerto 2 → destino A en puerto 1)</p>
            <p>  → Aprende: B en puerto 2</p>
            <p>  → A conocido → REENVÍO directo a puerto 1 solo</p>
            <p>  → Tabla: {"{A→1, B→2}"}</p>
            <p className="pt-1 text-slate-500 dark:text-slate-400">Evento 3: C envía a D (puerto 3 → destino D en puerto 4)</p>
            <p>  → Aprende: C en puerto 3</p>
            <p>  → D desconocido → FLOOD a puertos 1, 2, 4</p>
            <p>  → Tabla: {"{A→1, B→2, C→3}"}</p>
            <p className="pt-1 text-slate-500 dark:text-slate-400">Nótese: A-B pueden comunicarse simultáneamente con C-D sin colisiones</p>
          </div>
        </ExampleBlock>

        {/* ── Diagrama interactivo ── */}
        <div className="rounded-xl border border-border bg-background p-5 space-y-3">
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Simulación interactiva: Auto-aprendizaje del Switch
            </h3>
            <p className="text-sm text-muted mt-1">
              Avanzá paso a paso para ver cómo el switch construye su tabla MAC,
              cuándo hace FLOOD y cuándo reenvía directamente.
            </p>
          </div>
          <SwitchLearning />
        </div>

        <InfoCallout variant="info" title="Spanning Tree Protocol (STP)">
          <p>
            Los switches pueden conectarse en bucles para redundancia, lo que
            causa <strong>tormentas de broadcast</strong> (broadcast storms).
            STP (IEEE 802.1D) elige un <strong>root bridge</strong> y bloquea
            puertos redundantes, creando una topología lógica sin ciclos. RSTP
            (Rapid STP, 802.1w) converge en menos de 1 segundo, mientras que
            STP clásico puede tardar 30–50 segundos.
          </p>
        </InfoCallout>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 6: VLANs */}
      {/* ============================================ */}
      <SectionBlock id="vlans" title="VLANs">
        <p className="text-muted leading-relaxed">
          Una red Ethernet plana grande tiene un único{" "}
          <strong>dominio de broadcast</strong>: todos los dispositivos reciben
          todos los broadcasts ARP, DHCP, etc. Con cientos o miles de
          dispositivos, esto degrada el rendimiento y crea problemas de
          seguridad (cualquier host puede capturar el tráfico de otros).
        </p>

        <p className="text-muted leading-relaxed">
          Las <strong>VLANs</strong> (Virtual Local Area Networks) resuelven
          este problema creando{" "}
          <strong>dominios de broadcast lógicos independientes</strong> dentro
          del mismo switch físico. Los puertos se asignan a VLANs por
          configuración, no por cableado físico.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Beneficios de las VLANs"
            icon={Shield}
            color="bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/30 dark:text-teal-300 dark:border-teal-800"
          >
            <ul className="space-y-1.5 list-disc list-inside">
              <li>
                <strong>Aislamiento de seguridad:</strong> VLAN de RR.HH. no
                puede recibir tráfico de Engineering
              </li>
              <li>
                <strong>Reducción de broadcast:</strong> los broadcasts de cada
                VLAN no llegan a otras VLANs
              </li>
              <li>
                <strong>Flexibilidad:</strong> mover un usuario de VLAN no
                requiere cambiar el cableado — solo reconfigurar el puerto
              </li>
              <li>
                <strong>Gestión simplificada:</strong> separación lógica sin
                switches físicos separados
              </li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="Etiqueta 802.1Q"
            icon={Layers}
            color="bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                Se inserta 1 etiqueta de <strong>4 bytes</strong> en la trama
                Ethernet (entre MAC origen y Type)
              </li>
              <li>
                TPID: 0x8100 (identifica trama 802.1Q)
              </li>
              <li>
                Priority (3 bits): clase de servicio QoS (802.1p)
              </li>
              <li>
                CFI/DEI (1 bit): indicador de descarte
              </li>
              <li>
                <strong>VLAN ID (12 bits):</strong> hasta 4096 VLANs (0 y 4095
                reservados → 4094 utilizables)
              </li>
            </ul>
          </ConceptCard>
        </div>

        <InfoCallout variant="tip" title="Analogía:">
          <p>
            Las VLANs son como pisos de un edificio: aunque estén en el mismo
            edificio físico (mismo switch), los del piso 3 (VLAN 3) no pueden
            hablar directamente con los del piso 7 (VLAN 7) sin pasar por
            recepción (el router). Podés mover a una persona de piso sin
            construir nuevas paredes — solo reconfigurás su tarjeta de acceso.
          </p>
        </InfoCallout>

        <InfoCallout variant="info" title="Puertos Trunk e Inter-VLAN Routing">
          <p>
            Un <strong>puerto trunk</strong> (enlace troncal) entre switches
            transporta tramas de <em>múltiples VLANs</em>, etiquetadas con
            802.1Q. Los puertos de acceso (hacia hosts) no llevan etiqueta — el
            switch la agrega/quita automáticamente.
          </p>
          <p className="mt-2">
            Para que dos VLANs se comuniquen, se necesita{" "}
            <strong>inter-VLAN routing</strong>: un router con subinterfaces
            (&quot;router on a stick&quot;) o un switch de capa 3 con SVIs (Switch
            Virtual Interfaces). El tráfico entre VLANs debe subir a capa 3 y
            ser enrutado.
          </p>
        </InfoCallout>

        <ExampleBlock title="Empresa con 3 VLANs y router-on-a-stick">
          <p>
            Una empresa tiene VLAN 10 (RR.HH.), VLAN 20 (Ingeniería), VLAN 30
            (Gerencia). Un host de RR.HH. quiere enviar un paquete a Ingeniería:
          </p>
          <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 dark:bg-white/[0.07] rounded p-3">
            <p>1. Host HR (VLAN 10, 10.0.10.5) envía paquete a Eng (10.0.20.8)</p>
            <p>2. Switch detecta destino fuera de VLAN 10 → envía al trunk hacia router</p>
            <p>   Trama lleva etiqueta 802.1Q: VLAN ID = 10</p>
            <p>3. Router recibe en subinterfaz Gi0/0.10 (configurada para VLAN 10)</p>
            <p>4. Router consulta tabla de enrutamiento → 10.0.20.0/24 vía Gi0/0.20</p>
            <p>5. Router reenvía por subinterfaz Gi0/0.20 con etiqueta VLAN ID = 20</p>
            <p>6. Switch recibe trama con VLAN 20 → entrega al puerto del host Eng</p>
            <p>   Switch quita la etiqueta 802.1Q antes de entregar al host</p>
          </div>
        </ExampleBlock>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 7: WiFi 802.11 */}
      {/* ============================================ */}
      <SectionBlock id="wifi" title="WiFi: 802.11">
        <p className="text-muted leading-relaxed">
          El estándar <strong>IEEE 802.11</strong> define las redes inalámbricas
          de área local (WLAN). A diferencia de Ethernet, WiFi opera en un
          medio compartido e invisible — el espectro de radio — donde las
          condiciones cambian constantemente y detectar colisiones es imposible.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Arquitectura 802.11"
            icon={Wifi}
            color="bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/30 dark:text-teal-300 dark:border-teal-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                <strong>BSS</strong> (Basic Service Set): un AP + las
                estaciones asociadas
              </li>
              <li>
                <strong>BSSID:</strong> dirección MAC del AP (identifica al
                BSS)
              </li>
              <li>
                <strong>SSID:</strong> nombre de red legible (ej:
                &quot;MiRedWiFi&quot;)
              </li>
              <li>
                <strong>Modo infraestructura:</strong> estaciones se comunican
                a través del AP (lo más común)
              </li>
              <li>
                <strong>Modo ad-hoc:</strong> estaciones se comunican
                directamente sin AP
              </li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="Proceso de Asociación"
            icon={CheckCircle}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <ol className="space-y-1 list-decimal list-inside text-sm">
              <li>AP difunde <strong>Beacon frames</strong> (~cada 100 ms) con SSID y BSSID</li>
              <li>Estación escanea canales (pasivo) o envía Probe Requests (activo)</li>
              <li>Estación envía <strong>Association Request</strong> al AP elegido</li>
              <li>AP responde con <strong>Association Response</strong></li>
              <li>
                Estación obtiene IP vía <strong>DHCP</strong> y comienza a
                comunicarse
              </li>
            </ol>
          </ConceptCard>
        </div>

        <h3 className="text-lg font-semibold text-foreground pt-2">
          CSMA/CA: Collision Avoidance
        </h3>

        <p className="text-muted leading-relaxed">
          WiFi usa <strong>CSMA/CA</strong> (no CD) porque: (1) los
          transceivers WiFi son half-duplex — no pueden escuchar mientras
          transmiten; (2) existe el{" "}
          <strong>problema del terminal oculto</strong> — dos estaciones no
          pueden escucharse entre sí pero sí interfieren en el AP.
        </p>

        <InfoCallout variant="tip" title="Analogía:">
          <p>
            En una videollamada grupal, antes de hablar esperás un momento de
            silencio (DIFS), y si nadie habla, tomás la palabra. Si dos hablan
            a la vez, ambos se detienen, esperan un tiempo aleatorio antes de
            intentar de nuevo, y quien tenía la ventana más corta gana. Además,
            el moderador (AP) confirma que recibió tu mensaje (ACK) — si no
            confirma, asumís que hubo interferencia.
          </p>
        </InfoCallout>

        <ConceptCard
          title="Pasos de CSMA/CA en 802.11"
          icon={Activity}
          color="bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/30 dark:text-teal-300 dark:border-teal-800"
        >
          <ol className="space-y-1.5 list-decimal list-inside">
            <li>
              Esperar que el canal esté inactivo durante{" "}
              <strong>DIFS</strong> (Distributed IFS ~34 μs en 802.11a/g)
            </li>
            <li>
              Iniciar un <strong>contador de backoff aleatorio</strong>;
              decrementar solo mientras el canal esté inactivo
            </li>
            <li>
              Cuando el contador llega a 0 → transmitir la <strong>trama completa</strong>
            </li>
            <li>
              Esperar <strong>ACK</strong> del receptor (espera SIFS ~16 μs).
              Cada trama WiFi es confirmada individualmente.
            </li>
            <li>
              Si no llega ACK → asumir colisión → duplicar ventana de backoff → reintentar
            </li>
          </ol>
        </ConceptCard>

        <ExampleBlock title="Problema del Terminal Oculto">
          <p>
            Tres nodos: <strong>A</strong>, <strong>AP</strong>,{" "}
            <strong>C</strong>. A y C están en extremos opuestos del AP.
          </p>
          <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 dark:bg-white/[0.07] rounded p-3">
            <p>Alcance de A: [A ←→ AP]      (A no alcanza a C)</p>
            <p>Alcance de C:      [AP ←→ C] (C no alcanza a A)</p>
            <p className="pt-2 text-slate-500 dark:text-slate-400">Situación:</p>
            <p>1. A escucha el canal → libre (no oye a C) → comienza a transmitir al AP</p>
            <p>2. C escucha el canal → libre (no oye a A) → también comienza a transmitir al AP</p>
            <p>3. En el AP: las dos señales llegan simultáneamente → COLISIÓN</p>
            <p>   Ningún nodo detectó la colisión porque no se escuchan entre sí</p>
            <p className="pt-2 text-slate-500 dark:text-slate-400">Solución RTS/CTS:</p>
            <p>1. A envía RTS al AP (corto, ~20 bytes)</p>
            <p>2. AP difunde CTS (todos los nodos lo escuchan, incluido C)</p>
            <p>3. C ve el CTS → sabe que debe esperar la duración indicada</p>
            <p>4. A transmite trama completa sin interferencia de C ✓</p>
          </div>
        </ExampleBlock>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Trama 802.11 (4 campos MAC)"
            icon={Layers}
            color="bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800"
          >
            <p className="text-sm mb-2">
              La trama WiFi es más compleja que Ethernet — tiene{" "}
              <strong>4 campos de dirección MAC</strong>:
            </p>
            <ul className="space-y-1 list-disc list-inside text-sm">
              <li><strong>Addr 1:</strong> MAC del receptor (AP o estación)</li>
              <li><strong>Addr 2:</strong> MAC del transmisor</li>
              <li><strong>Addr 3:</strong> MAC del router destino / AP origen</li>
              <li><strong>Addr 4:</strong> usado en modo ad-hoc / mesh</li>
              <li>También incluye: Duration, Sequence number, Frame Control</li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="Estándares WiFi"
            icon={Wifi}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <ul className="space-y-1 list-disc list-inside text-sm">
              <li><strong>802.11b</strong> (1999): 2.4 GHz, hasta 11 Mbps</li>
              <li><strong>802.11a</strong> (1999): 5 GHz, hasta 54 Mbps</li>
              <li><strong>802.11g</strong> (2003): 2.4 GHz, hasta 54 Mbps</li>
              <li><strong>802.11n</strong> (WiFi 4, 2009): MIMO, hasta 600 Mbps</li>
              <li><strong>802.11ac</strong> (WiFi 5, 2013): 5 GHz, hasta 3.5 Gbps</li>
              <li><strong>802.11ax</strong> (WiFi 6, 2019): hasta 9.6 Gbps, OFDMA</li>
            </ul>
          </ConceptCard>
        </div>

        <ComparisonTable
          headers={[
            "Característica",
            "CSMA/CD (Ethernet)",
            "CSMA/CA (WiFi)",
          ]}
          rows={[
            [
              "Estrategia",
              "Detección de colisión (después)",
              "Evitación de colisión (antes)",
            ],
            [
              "Dúplex",
              "Full-duplex (puede transmitir y recibir a la vez)",
              "Half-duplex (no puede detectar colisión mientras transmite)",
            ],
            [
              "ACKs por trama",
              "No (sin ACK en capa de enlace)",
              "Sí (cada trama es confirmada)",
            ],
            [
              "Acción al detectar colisión",
              "Para inmediatamente, jam signal, backoff",
              "No puede detectar — asume colisión si no llega ACK",
            ],
            [
              "Estándar",
              "IEEE 802.3",
              "IEEE 802.11",
            ],
          ]}
        />
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 8: Quiz */}
      {/* ============================================ */}
      <SectionBlock id="quiz" title="Quiz del Capítulo 6">
        <p className="text-muted leading-relaxed mb-4">
          Evaluá tu comprensión de la capa de enlace: detección de errores,
          protocolos de acceso múltiple, Ethernet, ARP, switches, VLANs y
          WiFi. Seleccioná la respuesta correcta para cada pregunta.
        </p>
        <QuizContainer questions={quizCh6} chapterTitle={chapter.title} />
      </SectionBlock>
    </ChapterLayout>
  );
}

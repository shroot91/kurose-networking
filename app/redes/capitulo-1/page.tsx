import { chapters } from "@/data/chapters";
import { ChapterLayout } from "@/components/layout/chapter-layout";
import { SectionBlock } from "@/components/content/section-block";
import { ConceptCard } from "@/components/content/concept-card";
import { ExampleBlock } from "@/components/content/example-block";
import { ComparisonTable } from "@/components/content/comparison-table";
import { InfoCallout } from "@/components/content/info-callout";
import { NetworkLayers } from "@/components/diagrams/network-layers";
import { PacketSwitching } from "@/components/diagrams/packet-switching";
import { DelayComponents } from "@/components/diagrams/delay-components";
import { QuizContainer } from "@/components/quiz/quiz-container";
import { quizCh1 } from "@/data/quiz-ch1";
import {
  Globe,
  Server,
  Router,
  Wifi,
  Cable,
  MonitorSmartphone,
  Clock,
  Layers,
  Building2,
} from "lucide-react";

const chapter = chapters[0];

export default function Capitulo1() {
  return (
    <ChapterLayout chapter={chapter}>
      {/* ============================================ */}
      {/* SECCIÓN 1: ¿Qué es Internet? */}
      {/* ============================================ */}
      <SectionBlock id="que-es-internet" title="¿Qué es Internet?">
        <p className="text-muted leading-relaxed">
          Internet puede describirse desde dos perspectivas: como una{" "}
          <strong>infraestructura de hardware y software</strong> (la vista de
          &quot;tuercas y tornillos&quot;), o como una{" "}
          <strong>plataforma de servicios</strong> para aplicaciones distribuidas.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Vista de Hardware"
            icon={Server}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p>
              Internet es una red de redes que interconecta miles de millones de{" "}
              <strong>dispositivos</strong> (hosts/sistemas finales) mediante{" "}
              <strong>enlaces de comunicación</strong> (fibra, cobre, radio,
              satélite) y <strong>conmutadores de paquetes</strong> (routers y
              switches).
            </p>
          </ConceptCard>
          <ConceptCard
            title="Vista de Servicios"
            icon={Globe}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <p>
              Internet es una <strong>infraestructura</strong> que proporciona
              servicios a aplicaciones distribuidas (web, email, streaming,
              juegos). Las aplicaciones usan una <strong>API de sockets</strong>{" "}
              para enviar y recibir datos.
            </p>
          </ConceptCard>
        </div>

        <InfoCallout variant="info" title="Protocolos">
          <p>
            Un <strong>protocolo</strong> define el formato y orden de los
            mensajes intercambiados entre entidades, y las acciones a tomar al
            transmitir o recibir un mensaje. Ejemplo: TCP, IP, HTTP, DNS. Toda la
            actividad de Internet que involucra comunicación está gobernada por
            protocolos.
          </p>
        </InfoCallout>

        <div className="grid gap-4 sm:grid-cols-3">
          <ConceptCard title="Hosts" icon={MonitorSmartphone} color="bg-card text-foreground border-border">
            <p>
              Dispositivos conectados a Internet. Se llaman &quot;sistemas finales&quot; porque están en el borde de la red. Ejecutan aplicaciones (navegadores, servidores web, apps móviles).
            </p>
          </ConceptCard>
          <ConceptCard title="Routers" icon={Router} color="bg-card text-foreground border-border">
            <p>
              Conmutadores de paquetes que reenvían paquetes hacia su destino. Operan en la capa de red. Cada router examina la dirección destino del paquete y lo reenvía por el enlace apropiado.
            </p>
          </ConceptCard>
          <ConceptCard title="Enlaces" icon={Cable} color="bg-card text-foreground border-border">
            <p>
              Medios físicos que conectan los dispositivos: fibra óptica, cable coaxial, par trenzado, ondas de radio. Cada enlace tiene una <strong>tasa de transmisión</strong> (bandwidth) medida en bps.
            </p>
          </ConceptCard>
        </div>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 2: Borde de la Red */}
      {/* ============================================ */}
      <SectionBlock id="borde-de-la-red" title="Borde de la Red">
        <p className="text-muted leading-relaxed">
          El <strong>borde de la red</strong> está compuesto por los sistemas
          finales (hosts) y las <strong>redes de acceso</strong> que conectan
          estos hosts al primer router (router de borde). Las redes de acceso
          determinan cómo los usuarios se conectan a Internet.
        </p>

        <ComparisonTable
          headers={["Tecnología", "Velocidad típica", "Medio", "Compartido?"]}
          rows={[
            ["DSL", "5-35 Mbps bajada", "Par trenzado (línea telefónica)", "No (dedicado)"],
            ["Cable (HFC)", "10-500 Mbps bajada", "Cable coaxial + fibra", "Sí (compartido)"],
            ["FTTH", "1-10 Gbps", "Fibra óptica hasta el hogar", "No (dedicado)"],
            ["WiFi (802.11)", "54-1000+ Mbps", "Ondas de radio", "Sí (compartido)"],
            ["Celular 4G/5G", "10-300+ Mbps", "Ondas de radio", "Sí (compartido)"],
            ["Ethernet", "100 Mbps-10 Gbps", "Par trenzado/Fibra", "Conmutado"],
          ]}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard title="DSL (Digital Subscriber Line)" icon={Cable} color="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/30 dark:text-indigo-300 dark:border-indigo-800">
            <p>
              Usa la línea telefónica existente. El módem DSL convierte datos digitales en tonos de alta frecuencia. La velocidad depende de la <strong>distancia al central telefónico</strong> (DSLAM). Bajada y subida asimétricas (ADSL).
            </p>
          </ConceptCard>
          <ConceptCard title="FTTH (Fibra al Hogar)" icon={Wifi} color="bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/30 dark:text-cyan-300 dark:border-cyan-800">
            <p>
              Provee un camino de fibra óptica directo desde el central hasta el hogar. Ofrece las <strong>velocidades más altas</strong> disponibles. Usa splitters ópticos (PON) o conexiones punto a punto.
            </p>
          </ConceptCard>
        </div>

        <InfoCallout variant="tip" title="Medios Físicos">
          <p>
            Los medios se clasifican en <strong>guiados</strong> (par trenzado,
            coaxial, fibra óptica) donde las ondas se guían por un medio sólido,
            y <strong>no guiados</strong> (radio, WiFi, satélite) donde las ondas
            se propagan libremente por la atmósfera.
          </p>
        </InfoCallout>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 3: Núcleo de la Red */}
      {/* ============================================ */}
      <SectionBlock id="nucleo-de-la-red" title="Núcleo de la Red">
        <p className="text-muted leading-relaxed">
          El <strong>núcleo de la red</strong> es la malla de routers y enlaces
          que interconectan los sistemas finales. Existen dos enfoques
          fundamentales para mover datos: <strong>conmutación de paquetes</strong>{" "}
          y <strong>conmutación de circuitos</strong>.
        </p>

        <PacketSwitching />

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard title="Conmutación de Paquetes" icon={Layers} color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800">
            <ul className="space-y-1.5 list-disc list-inside">
              <li>Los datos se dividen en <strong>paquetes</strong></li>
              <li>Cada paquete se envía independientemente</li>
              <li><strong>Store-and-forward:</strong> el router debe recibir todo el paquete antes de reenviarlo</li>
              <li>Los paquetes comparten el ancho de banda (<strong>multiplexación estadística</strong>)</li>
              <li>Puede haber <strong>congestión</strong> y pérdida si los buffers se llenan</li>
            </ul>
          </ConceptCard>
          <ConceptCard title="Conmutación de Circuitos" icon={Cable} color="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800">
            <ul className="space-y-1.5 list-disc list-inside">
              <li>Se establece un <strong>circuito dedicado</strong> antes de comunicar</li>
              <li>Recursos reservados de extremo a extremo</li>
              <li><strong>FDM</strong> (por frecuencia) o <strong>TDM</strong> (por tiempo)</li>
              <li>Rendimiento <strong>garantizado</strong> pero recursos desperdiciados en silencio</li>
              <li>Ejemplo clásico: red telefónica tradicional</li>
            </ul>
          </ConceptCard>
        </div>

        <ExampleBlock title="Multiplexación estadística vs TDM">
          <p>
            Supongamos un enlace de <strong>1 Mbps</strong> compartido por 10
            usuarios. Cada usuario activo necesita 100 kbps pero solo está activo
            el 10% del tiempo.
          </p>
          <p>
            <strong>Con TDM (circuitos):</strong> Cada usuario recibe un slot
            fijo de 100 kbps. Solo se pueden atender <strong>10 usuarios</strong>{" "}
            máximo, aunque la mayoría estén inactivos.
          </p>
          <p>
            <strong>Con multiplexación estadística (paquetes):</strong> Los
            recursos se asignan bajo demanda. Con 35 usuarios, la probabilidad de
            que más de 10 estén activos simultáneamente es menor al 0.04%.
            Se atienden <strong>3.5 veces más usuarios</strong> con el mismo
            enlace.
          </p>
        </ExampleBlock>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 3b: Jerarquía de ISPs */}
      {/* ============================================ */}
      <SectionBlock
        id="isp-jerarquia"
        title="Estructura de Internet: Jerarquía de ISPs"
      >
        <p className="text-muted leading-relaxed">
          Internet no es una red única, sino una{" "}
          <strong>red de redes</strong> organizada jerárquicamente. Entender
          quién conecta a quién, y bajo qué acuerdos económicos, es fundamental
          para comprender cómo fluye el tráfico globalmente.
        </p>

        <InfoCallout variant="tip" title="Analogía: El sistema de autopistas">
          <p>
            Internet es como el sistema de carreteras: las{" "}
            <strong>calles locales</strong> (ISP de acceso, Tier 3) conectan
            hogares y empresas a{" "}
            <strong>rutas provinciales</strong> (ISP regionales, Tier 2), que a
            su vez se conectan a las{" "}
            <strong>autopistas nacionales e internacionales</strong> (ISP Tier
            1). Los peajes donde las autopistas se cruzan son los{" "}
            <strong>IXP</strong> (Internet Exchange Points).
          </p>
        </InfoCallout>

        <div className="grid gap-4 sm:grid-cols-3">
          <ConceptCard
            title="ISP de Acceso — Tier 3"
            icon={Building2}
            color="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/30 dark:text-indigo-300 dark:border-indigo-800"
          >
            <p>
              El <strong>último kilómetro</strong>. Conectan usuarios finales y
              empresas a Internet. Pagan a ISPs de nivel superior (transit) para
              alcanzar el resto de Internet. Ejemplos: Fibertel, Claro,
              Movistar, Telecentro.
            </p>
          </ConceptCard>
          <ConceptCard
            title="ISP Regionales — Tier 2"
            icon={Globe}
            color="bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/30 dark:text-cyan-300 dark:border-cyan-800"
          >
            <p>
              Cubren regiones geográficas o países enteros. Se conectan a Tier 1
              pagando <strong>transit</strong> y entre sí mediante{" "}
              <strong>peering</strong> (acuerdos gratuitos). Ejemplos: IFX
              Networks, GTD, Cablevision Business.
            </p>
          </ConceptCard>
          <ConceptCard
            title="ISP Tier 1 — Columna Vertebral"
            icon={Server}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p>
              La <strong>columna vertebral de Internet</strong>. Presencia
              global, se interconectan entre sí sin pagar (peering entre pares).
              No necesitan pagar a nadie para llegar a cualquier destino.
              Ejemplos: AT&amp;T, NTT, Level 3/Lumen, Telia.
            </p>
          </ConceptCard>
        </div>

        <ComparisonTable
          headers={["Nivel", "Rol", "Relación económica", "Ejemplos"]}
          rows={[
            [
              "Tier 1",
              "Columna vertebral global",
              "Peering gratuito entre Tier 1; cobran transit a Tier 2",
              "AT&T, NTT, Level 3/Lumen, Telia",
            ],
            [
              "Tier 2",
              "ISP regional o nacional",
              "Pagan transit a Tier 1; peering con otros Tier 2",
              "IFX Networks, GTD, Telecom Argentina",
            ],
            [
              "Tier 3 (Acceso)",
              "Último kilómetro",
              "Pagan transit a Tier 2 o Tier 1",
              "Fibertel, Claro, Movistar, Telecentro",
            ],
            [
              "IXP",
              "Punto de intercambio de tráfico",
              "Facilita peering sin costo entre participantes",
              "CABASE (Buenos Aires), DE-CIX, AMS-IX",
            ],
            [
              "Proveedor de Contenido",
              "Red privada global propia",
              "Peering directo con ISPs e IXPs; evita Tier 1 cuando es posible",
              "Google, Netflix, Facebook/Meta",
            ],
          ]}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="IXPs: Internet Exchange Points"
            icon={Router}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <p>
              Puntos de interconexión física donde múltiples ISPs intercambian
              tráfico directamente (<strong>peering</strong>) sin pasar por un
              intermediario. Reducen latencia y costos. Argentina tiene el{" "}
              <strong>CABASE IXP</strong> en Buenos Aires.
            </p>
            <p className="mt-2 text-sm italic">
              Analogía: es como un mercado mayorista central donde los
              distribuidores se venden entre sí directamente, eliminando
              intermediarios y abaratando costos.
            </p>
          </ConceptCard>
          <ConceptCard
            title="Redes de Proveedores de Contenido"
            icon={Globe}
            color="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800"
          >
            <p>
              Google, Netflix y Meta construyen sus propias{" "}
              <strong>redes privadas globales</strong> con cientos de puntos de
              presencia (PoPs) en todo el mundo. Se conectan directamente a ISPs
              e IXPs, saltando a los Tier 1 cuando es posible. Resultado:
              menores costos y mejor rendimiento para el usuario.
            </p>
          </ConceptCard>
        </div>

        <InfoCallout variant="info" title="Peering vs Transit">
          <p>
            <strong>Transit (relación cliente-proveedor):</strong> el ISP de
            nivel inferior paga al superior para alcanzar{" "}
            <em>toda</em> Internet. Es como pagar por acceso a la autopista
            completa.
          </p>
          <p className="mt-2">
            <strong>Peering (acuerdo entre pares):</strong> dos ISPs del mismo
            nivel intercambian tráfico <em>sin costo</em> entre sí. Solo
            intercambian tráfico destinado a sus propias redes (o clientes
            directos), no tráfico de tránsito. Es beneficio mutuo: ambos
            evitan pagar a un intermediario.
          </p>
        </InfoCallout>

        <ExampleBlock title="¿Cómo llega un paquete de Buenos Aires a Tokio?">
          <p>
            Un usuario de Fibertel en Buenos Aires abre una página en un
            servidor japonés de NTT. El camino probable:
          </p>
          <ol className="list-decimal list-inside space-y-1 mt-2">
            <li>
              <strong>Fibertel (Tier 3 AR)</strong> — el paquete sale del hogar
              y llega al router de borde de Fibertel.
            </li>
            <li>
              <strong>Telecom Argentina (Tier 2)</strong> — Fibertel entrega el
              paquete a su ISP upstream, que tiene mayor conectividad
              internacional.
            </li>
            <li>
              <strong>Level 3/Lumen (Tier 1)</strong> — el ISP regional paga
              transit a un Tier 1 global con cables submarinos transpacíficos.
            </li>
            <li>
              <strong>NTT (Tier 1 JP)</strong> — Level 3 y NTT hacen peering
              gratuito; el paquete entra a la red de NTT en Japón.
            </li>
            <li>
              <strong>Servidor destino</strong> — NTT entrega el paquete al
              servidor japonés.
            </li>
          </ol>
          <p className="mt-2 text-sm">
            Todo este recorrido de más de 18,000 km ocurre en menos de{" "}
            <strong>200 ms</strong> (velocidad de propagación de la fibra
            ≈ 200,000 km/s).
          </p>
        </ExampleBlock>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 4: Retardo, Pérdida y Throughput */}
      {/* ============================================ */}
      <SectionBlock
        id="retardo-perdida-throughput"
        title="Retardo, Pérdida y Throughput"
      >
        <p className="text-muted leading-relaxed">
          Cuando un paquete viaja de un nodo a otro, sufre varios tipos de
          retardo. El <strong>retardo nodal total</strong> es la suma de cuatro
          componentes.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard title="Retardo de Procesamiento" icon={Clock} color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800">
            <p>
              Tiempo que tarda el router en examinar la cabecera del paquete,
              verificar errores de bits y determinar el enlace de salida.
              Típicamente <strong>&lt; 1 ms</strong> en routers modernos.
            </p>
          </ConceptCard>
          <ConceptCard title="Retardo de Cola" icon={Clock} color="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800">
            <p>
              Tiempo de espera en el buffer de salida del router. Depende del
              <strong> nivel de congestión</strong>. Puede variar de microsegundos
              a milisegundos. Si el buffer está lleno, el paquete se
              <strong> descarta</strong>.
            </p>
          </ConceptCard>
          <ConceptCard title="Retardo de Transmisión" icon={Clock} color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800">
            <p>
              Tiempo para &quot;empujar&quot; todos los bits del paquete al enlace.{" "}
              <strong>d_trans = L/R</strong> donde L = tamaño del paquete (bits) y
              R = tasa de transmisión del enlace (bps).
            </p>
          </ConceptCard>
          <ConceptCard title="Retardo de Propagación" icon={Clock} color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800">
            <p>
              Tiempo que tarda un bit en viajar físicamente de un extremo del
              enlace al otro. <strong>d_prop = d/s</strong> donde d = longitud del
              enlace y s = velocidad de propagación (~2×10⁸ m/s en fibra).
            </p>
          </ConceptCard>
        </div>

        <h3 className="text-lg font-semibold mt-8 mb-4">
          Calculadora Interactiva de Retardo
        </h3>
        <DelayComponents />

        <ExampleBlock title="Cálculo de retardo end-to-end">
          <p>
            Un paquete de <strong>1,500 bytes</strong> se transmite por un enlace
            de <strong>100 Mbps</strong> de fibra óptica de{" "}
            <strong>2,500 km</strong> de longitud. Retardo de procesamiento:{" "}
            <strong>0.01 ms</strong>.
          </p>
          <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 dark:bg-white/[0.07] rounded p-3">
            <p>L = 1,500 × 8 = 12,000 bits</p>
            <p>R = 100 × 10⁶ = 100,000,000 bps</p>
            <p>d = 2,500 × 1,000 = 2,500,000 m</p>
            <p>s = 2 × 10⁸ m/s (fibra óptica)</p>
            <p className="pt-2 border-t border-amber-300">
              d_trans = 12,000 / 100,000,000 = <strong>0.12 ms</strong>
            </p>
            <p>
              d_prop = 2,500,000 / 200,000,000 = <strong>12.5 ms</strong>
            </p>
            <p>
              d_total = 0.01 + ~0.06 + 0.12 + 12.5 ≈ <strong>12.69 ms</strong>
            </p>
          </div>
          <p className="mt-2">
            En este caso, el <strong>retardo de propagación domina</strong> por la
            gran distancia. En enlaces cortos con baja velocidad, el retardo de
            transmisión dominaría.
          </p>
        </ExampleBlock>

        <InfoCallout variant="info" title="Throughput">
          <p>
            El <strong>throughput</strong> es la tasa a la que los datos se
            transfieren de extremo a extremo (bits/s). El throughput instantáneo
            es la tasa en un instante dado; el throughput promedio es F/T donde F
            es el tamaño del archivo y T el tiempo total de transferencia. Está
            limitado por el <strong>enlace cuello de botella</strong> (el más
            lento en la ruta).
          </p>
        </InfoCallout>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 5: Capas de Protocolos */}
      {/* ============================================ */}
      <SectionBlock id="capas-de-protocolos" title="Capas de Protocolos">
        <p className="text-muted leading-relaxed">
          La arquitectura de red se organiza en <strong>capas</strong>. Cada capa
          ofrece servicios a la capa superior y utiliza los servicios de la capa
          inferior. Este diseño modular facilita la comprensión, el mantenimiento
          y la evolución del sistema.
        </p>

        <NetworkLayers />

        <ComparisonTable
          headers={["Capa", "PDU", "Dispositivo", "Función principal"]}
          rows={[
            [
              "5. Aplicación",
              "Mensaje",
              "Host",
              "Soportar aplicaciones de red (HTTP, DNS, SMTP)",
            ],
            [
              "4. Transporte",
              "Segmento",
              "Host",
              "Transferencia proceso-a-proceso (TCP, UDP)",
            ],
            [
              "3. Red",
              "Datagrama",
              "Router",
              "Enrutamiento de paquetes origen-destino (IP)",
            ],
            [
              "2. Enlace",
              "Trama",
              "Switch",
              "Transferencia nodo-a-nodo en un enlace (Ethernet)",
            ],
            [
              "1. Física",
              "Bit",
              "Hub/Medio",
              "Transmisión de bits crudos por el medio",
            ],
          ]}
        />

        <InfoCallout variant="tip" title="Modelo OSI vs TCP/IP">
          <p>
            El modelo <strong>OSI de 7 capas</strong> incluye dos capas
            adicionales entre Aplicación y Transporte:{" "}
            <strong>Presentación</strong> (formatos de datos, encriptación,
            compresión) y <strong>Sesión</strong> (sincronización, checkpointing).
            En la práctica, Internet usa el modelo de 5 capas y estas funciones se
            implementan en la capa de aplicación cuando se necesitan.
          </p>
        </InfoCallout>

        <ExampleBlock title="Encapsulamiento en acción">
          <p>
            Cuando envías un email, los datos pasan por el siguiente proceso:
          </p>
          <ol className="list-decimal list-inside space-y-1 mt-2">
            <li>
              <strong>Aplicación (SMTP):</strong> Tu cliente de correo crea un{" "}
              <strong>mensaje</strong> con el texto del email
            </li>
            <li>
              <strong>Transporte (TCP):</strong> Añade cabecera con puertos
              origen/destino → <strong>segmento</strong>
            </li>
            <li>
              <strong>Red (IP):</strong> Añade cabecera con direcciones IP →{" "}
              <strong>datagrama</strong>
            </li>
            <li>
              <strong>Enlace (Ethernet):</strong> Añade cabecera con direcciones
              MAC + trailer → <strong>trama</strong>
            </li>
            <li>
              <strong>Física:</strong> Convierte la trama en señales eléctricas,
              ópticas o de radio → <strong>bits</strong>
            </li>
          </ol>
          <p className="mt-2">
            En el destino, cada capa <strong>desencapsula</strong> (remueve su
            cabecera) y pasa los datos a la capa superior.
          </p>
        </ExampleBlock>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 6: Quiz */}
      {/* ============================================ */}
      <SectionBlock id="quiz" title="Quiz del Capítulo 1">
        <p className="text-muted leading-relaxed mb-4">
          Evalúa tu comprensión de los conceptos fundamentales de redes de
          computadoras e Internet. Selecciona la respuesta correcta para cada
          pregunta.
        </p>
        <QuizContainer questions={quizCh1} chapterTitle={chapter.title} />
      </SectionBlock>
    </ChapterLayout>
  );
}

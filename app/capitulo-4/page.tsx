import { chapters } from "@/data/chapters";
import { ChapterLayout } from "@/components/layout/chapter-layout";
import { SectionBlock } from "@/components/content/section-block";
import { ConceptCard } from "@/components/content/concept-card";
import { ExampleBlock } from "@/components/content/example-block";
import { ComparisonTable } from "@/components/content/comparison-table";
import { InfoCallout } from "@/components/content/info-callout";
import { QuizContainer } from "@/components/quiz/quiz-container";
import { quizCh4 } from "@/data/quiz-ch4";
import {
  Network,
  Router,
  Globe,
  Cpu,
  Server,
  Shield,
  ArrowRightLeft,
  MapPin,
  GitBranch,
  Layers,
} from "lucide-react";

const chapter = chapters[3];

export default function Capitulo4() {
  return (
    <ChapterLayout chapter={chapter}>
      {/* ============================================ */}
      {/* SECCIÓN 1: Introducción a la Capa de Red */}
      {/* ============================================ */}
      <SectionBlock id="introduccion-red" title="Introducción a la Capa de Red">
        <p className="text-muted leading-relaxed">
          La <strong>capa de red</strong> es responsable de mover paquetes desde
          un host origen hasta un host destino, atravesando potencialmente
          múltiples routers intermedios. A diferencia de la capa de transporte,
          que opera solo en los sistemas finales, la capa de red también corre
          en cada router de Internet.
        </p>

        <p className="text-muted leading-relaxed">
          La capa de red realiza dos funciones fundamentales que deben
          distinguirse con claridad:
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Forwarding (Reenvío)"
            icon={ArrowRightLeft}
            color="bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800"
          >
            <ul className="space-y-1.5 list-disc list-inside">
              <li>
                Acción <strong>local</strong> realizada en un router
              </li>
              <li>
                Mueve un paquete del enlace de entrada al enlace de salida
                correcto
              </li>
              <li>
                Implementado en el <strong>plano de datos</strong>
              </li>
              <li>
                Usa la <strong>tabla de reenvío</strong> (forwarding table)
              </li>
              <li>
                Operación muy rápida: escala de <strong>nanosegundos</strong>
              </li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="Routing (Enrutamiento)"
            icon={MapPin}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <ul className="space-y-1.5 list-disc list-inside">
              <li>
                Proceso <strong>global</strong> que determina rutas extremo a
                extremo
              </li>
              <li>
                Ejecuta <strong>algoritmos de enrutamiento</strong> para
                construir las tablas de reenvío
              </li>
              <li>
                Implementado en el <strong>plano de control</strong>
              </li>
              <li>
                Involucra a múltiples routers coordinando entre sí
              </li>
              <li>
                Operación más lenta: escala de <strong>segundos o minutos</strong>
              </li>
            </ul>
          </ConceptCard>
        </div>

        <InfoCallout variant="tip" title="Regla mnemotécnica">
          <p>
            <strong>Forwarding</strong> = tabla de reenvío local (¿por qué
            enlace sale este paquete?). <strong>Routing</strong> = algoritmo
            global (¿cuál es la mejor ruta de A a B en toda la red?). El
            routing construye las tablas que usa el forwarding.
          </p>
        </InfoCallout>

        <ComparisonTable
          headers={["Característica", "Plano de Datos", "Plano de Control"]}
          rows={[
            [
              "Función",
              "Reenvío local de paquetes (forwarding)",
              "Determinación de rutas globales (routing)",
            ],
            [
              "Velocidad",
              "Nanosegundos (hardware)",
              "Segundos a minutos (software)",
            ],
            [
              "Implementación",
              "ASIC / hardware dedicado en línea de datos",
              "Procesador de enrutamiento (software)",
            ],
            [
              "Alcance",
              "Dentro de un único router",
              "Toda la red o sistema autónomo",
            ],
          ]}
        />
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 2: Arquitectura de un Router */}
      {/* ============================================ */}
      <SectionBlock id="inside-router" title="Arquitectura de un Router">
        <p className="text-muted leading-relaxed">
          Un router moderno es un sistema especializado compuesto por cuatro
          componentes principales. Entender su arquitectura interna ayuda a
          comprender cómo se procesan los paquetes a alta velocidad y cuáles
          son los posibles cuellos de botella.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Puertos de Entrada"
            icon={Layers}
            color="bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800"
          >
            <p>
              Terminan el enlace físico de entrada y realizan funciones de capa
              de enlace. Buscan en la tabla de reenvío el puerto de salida
              correcto usando{" "}
              <strong>longest prefix matching</strong>. El objetivo es procesar
              paquetes tan rápido como llegan (line speed) para evitar colas de
              entrada.
            </p>
          </ConceptCard>
          <ConceptCard
            title="Switching Fabric"
            icon={Network}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p>
              Conecta los puertos de entrada con los de salida. Existen tres
              tipos: <strong>memoria</strong> (el más antiguo, procesador copia
              paquetes), <strong>bus</strong> (bus compartido, cuello de
              botella), y <strong>crossbar/interconexión</strong> (permite
              transferencias paralelas, la más usada hoy).
            </p>
          </ConceptCard>
          <ConceptCard
            title="Puertos de Salida"
            icon={Server}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <p>
              Almacenan paquetes en buffers cuando la fabric entrega más rápido
              de lo que el enlace puede transmitir. Aplican <strong>scheduling</strong>{" "}
              (disciplina de cola: FIFO, PQ, WFQ) para determinar qué paquete
              enviar primero. Si el buffer se llena, los paquetes se descartan.
            </p>
          </ConceptCard>
          <ConceptCard
            title="Procesador de Enrutamiento"
            icon={Cpu}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <p>
              Ejecuta los <strong>protocolos de enrutamiento</strong> (OSPF,
              BGP, RIP), mantiene las tablas de enrutamiento y construye las
              tablas de reenvío usadas por los puertos de entrada. También
              gestiona las funciones de gestión del router. Opera en el plano de
              control.
            </p>
          </ConceptCard>
        </div>

        <ExampleBlock title="Cálculo de tasa de conmutación">
          <p>
            Supongamos un router con <strong>32 puertos de entrada</strong>,
            cada uno operando a <strong>10 Gbps</strong>. Para que el switching
            fabric no sea el cuello de botella, debe ser capaz de conmutar a
            una velocidad al menos igual al total de la capacidad de entrada:
          </p>
          <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 dark:bg-white/[0.07] rounded p-3">
            <p>Capacidad por puerto = 10 Gbps</p>
            <p>Número de puertos = 32</p>
            <p className="pt-2 border-t border-amber-300">
              Tasa mínima del fabric = 32 × 10 Gbps ={" "}
              <strong>320 Gbps</strong>
            </p>
          </div>
          <p className="mt-2">
            Routers de núcleo modernos (como los de Cisco o Juniper) tienen
            fabrics de varios <strong>Terabits por segundo</strong> para manejar
            este tráfico. La velocidad de switching es crítica para evitar que
            los puertos de entrada saturen sus buffers.
          </p>
        </ExampleBlock>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 3: IPv4: Direccionamiento */}
      {/* ============================================ */}
      <SectionBlock id="ipv4" title="IPv4: Direccionamiento">
        <p className="text-muted leading-relaxed">
          IPv4 (Internet Protocol versión 4) es el protocolo de capa de red
          dominante de Internet. Un <strong>datagrama IPv4</strong> consta de
          una cabecera y datos. La cabecera mínima es de 20 bytes y puede
          extenderse con campos de opciones.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <ConceptCard
            title="Campos Clave del Datagrama"
            icon={Layers}
            color="bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800"
          >
            <ul className="space-y-1 text-sm list-disc list-inside">
              <li>
                <strong>Versión</strong> (4 bits): indica IPv4 (0100)
              </li>
              <li>
                <strong>IHL</strong>: longitud de cabecera en palabras de 32 bits
              </li>
              <li>
                <strong>TTL</strong> (8 bits): decrementado por cada router
              </li>
              <li>
                <strong>Protocolo</strong> (8 bits): TCP=6, UDP=17, ICMP=1
              </li>
              <li>
                <strong>Checksum</strong>: verificación de integridad de cabecera
              </li>
              <li>
                <strong>IP origen / IP destino</strong>: 32 bits cada uno
              </li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="CIDR y Prefijos de Red"
            icon={Network}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p className="text-sm">
              CIDR (Classless Inter-Domain Routing) usa la notación{" "}
              <strong>a.b.c.d/x</strong> donde x es el número de bits del
              prefijo de red. Reemplazó el sistema de clases A/B/C para un uso
              más eficiente del espacio de direcciones.
            </p>
            <p className="text-sm mt-2">
              Los routers usan <strong>longest prefix matching</strong>: cuando
              múltiples entradas coinciden, se elige la más específica (prefijo
              más largo).
            </p>
          </ConceptCard>
          <ConceptCard
            title="Fragmentación"
            icon={GitBranch}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <p className="text-sm">
              Si un datagrama supera el <strong>MTU</strong> del enlace, el
              router lo fragmenta. Los fragmentos se identifican por el campo
              Identification, el bit MF (More Fragments) y el Fragment Offset.
            </p>
            <p className="text-sm mt-2">
              El <strong>reensamblaje</strong> ocurre solo en el host destino
              final, nunca en routers intermedios.
            </p>
          </ConceptCard>
        </div>

        <ExampleBlock title="Cálculo de subred">
          <p>
            Dada la red <strong>192.168.10.0/26</strong>, calcular la máscara,
            número de hosts y rango de direcciones:
          </p>
          <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 dark:bg-white/[0.07] rounded p-3">
            <p>Prefijo /26 → 26 bits de red, 6 bits de host</p>
            <p>Máscara: 255.255.255.192 (11111111.11111111.11111111.11000000)</p>
            <p className="pt-2 border-t border-amber-300">
              Direcciones totales: 2⁶ = <strong>64</strong>
            </p>
            <p>
              Hosts utilizables: 64 - 2 = <strong>62</strong>
            </p>
            <p>Dirección de red: 192.168.10.0</p>
            <p>Primera IP host: 192.168.10.1</p>
            <p>Última IP host: 192.168.10.62</p>
            <p>Broadcast: 192.168.10.63</p>
          </div>
        </ExampleBlock>

        <ComparisonTable
          headers={["Rango de Direcciones", "Prefijo CIDR", "Número de IPs", "Uso Típico"]}
          rows={[
            ["10.0.0.0 – 10.255.255.255", "10.0.0.0/8", "~16.7 millones", "Redes corporativas grandes"],
            ["172.16.0.0 – 172.31.255.255", "172.16.0.0/12", "~1.05 millones", "Redes medianas"],
            ["192.168.0.0 – 192.168.255.255", "192.168.0.0/16", "~65,536", "Redes domésticas y SOHO"],
            ["127.0.0.0 – 127.255.255.255", "127.0.0.0/8", "~16.7 millones", "Loopback (localhost)"],
          ]}
        />
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 4: NAT y DHCP */}
      {/* ============================================ */}
      <SectionBlock id="nat-dhcp" title="NAT y DHCP">
        <p className="text-muted leading-relaxed">
          Dos mecanismos fundamentales que permiten el funcionamiento de las
          redes IPv4 en el contexto del agotamiento de direcciones: NAT extiende
          el uso de pocas IPs públicas, mientras que DHCP automatiza la
          configuración de los hosts.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="NAT: Traducción de Direcciones"
            icon={ArrowRightLeft}
            color="bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800"
          >
            <p className="text-sm">
              El router NAT mantiene una{" "}
              <strong>tabla de traducción NAT</strong> que mapea cada conexión
              interna (IP privada + puerto) a la IP pública del router con un
              puerto único.
            </p>
            <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
              <li>
                <strong>Beneficio 1:</strong> Conserva espacio de IPs públicas
              </li>
              <li>
                <strong>Beneficio 2:</strong> Oculta la topología interna
                (seguridad por oscuridad)
              </li>
              <li>
                <strong>Beneficio 3:</strong> Permite cambiar IPs internas sin
                notificar al ISP
              </li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="DHCP: Configuración Automática"
            icon={Server}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p className="text-sm">
              DHCP (Dynamic Host Configuration Protocol) permite a un host
              obtener automáticamente una dirección IP, máscara de subred,
              gateway por defecto y servidor DNS al conectarse a la red.
            </p>
            <p className="text-sm mt-2">
              Las direcciones se <strong>arriendan</strong> por un tiempo
              limitado (lease time) y deben renovarse periódicamente. Usa UDP:
              cliente en puerto 68, servidor en puerto 67.
            </p>
          </ConceptCard>
        </div>

        <InfoCallout variant="warning" title="Controversia del NAT">
          <p>
            NAT <strong>viola el principio end-to-end</strong> de Internet: los
            routers deben procesar paquetes hasta la capa de red, pero NAT
            inspecciona y modifica puertos de capa de transporte. Además,
            dificulta conexiones entrantes (P2P, servidores detrás de NAT) y
            complica protocolos que incluyen IPs en el payload (FTP, SIP). Sin
            embargo, es necesario por el agotamiento de IPv4.
          </p>
        </InfoCallout>

        <ExampleBlock title="Intercambio DHCP: los 4 mensajes">
          <p>
            Cuando un host se conecta a una red por primera vez o su lease
            expira, sigue este proceso:
          </p>
          <ol className="list-decimal list-inside space-y-2 mt-2">
            <li>
              <strong>DHCP Discover</strong> (cliente → broadcast 255.255.255.255):
              El host hace broadcast buscando servidores DHCP disponibles.
              Aún no tiene IP, usa 0.0.0.0 como origen.
            </li>
            <li>
              <strong>DHCP Offer</strong> (servidor → broadcast):
              El servidor responde ofreciendo una dirección IP disponible,
              máscara, gateway, DNS y el tiempo de arrendamiento (lease time).
            </li>
            <li>
              <strong>DHCP Request</strong> (cliente → broadcast):
              El cliente acepta la oferta y envía un Request para confirmar
              (broadcast porque puede haber varios servidores).
            </li>
            <li>
              <strong>DHCP ACK</strong> (servidor → broadcast/unicast):
              El servidor confirma el arrendamiento. El cliente ya puede usar
              la dirección IP asignada.
            </li>
          </ol>
          <div className="font-mono text-xs mt-3 bg-white/60 dark:bg-white/[0.07] rounded p-3">
            <p>Cliente: DISCOVER src=0.0.0.0:68 dst=255.255.255.255:67</p>
            <p>Servidor: OFFER src=192.168.1.1:67 dst=255.255.255.255:68 [IP: 192.168.1.100]</p>
            <p>Cliente: REQUEST src=0.0.0.0:68 dst=255.255.255.255:67 [quiero: 192.168.1.100]</p>
            <p>Servidor: ACK src=192.168.1.1:67 dst=255.255.255.255:68 [confirmo: 192.168.1.100]</p>
          </div>
        </ExampleBlock>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 5: IPv6 */}
      {/* ============================================ */}
      <SectionBlock id="ipv6" title="IPv6">
        <p className="text-muted leading-relaxed">
          IPv6 fue diseñado para resolver el agotamiento de direcciones IPv4 y
          mejorar el rendimiento del enrutamiento. Usa direcciones de{" "}
          <strong>128 bits</strong> (vs 32 bits de IPv4), proporcionando
          2<sup>128</sup> ≈ 3.4 × 10<sup>38</sup> direcciones únicas — suficiente
          para dar miles de millones de IPs a cada grano de arena de la Tierra.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Cabecera IPv6 Simplificada"
            icon={Layers}
            color="bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800"
          >
            <p className="text-sm">
              La cabecera IPv6 es fija de <strong>40 bytes</strong>. Campos
              principales:
            </p>
            <ul className="text-sm mt-1 space-y-1 list-disc list-inside">
              <li>
                <strong>Versión</strong> (4 bits): 6
              </li>
              <li>
                <strong>Traffic Class</strong>: prioridad del tráfico (como DSCP)
              </li>
              <li>
                <strong>Flow Label</strong>: identifica flujos para QoS
              </li>
              <li>
                <strong>Payload Length</strong>: longitud del payload en bytes
              </li>
              <li>
                <strong>Next Header</strong>: protocolo superior (como Protocol en IPv4)
              </li>
              <li>
                <strong>Hop Limit</strong>: equivalente al TTL de IPv4
              </li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="Mejoras Clave vs IPv4"
            icon={Globe}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <ul className="text-sm space-y-1.5 list-disc list-inside">
              <li>
                <strong>Sin fragmentación en routers:</strong> los hosts deben
                usar Path MTU Discovery
              </li>
              <li>
                <strong>Sin checksum de cabecera:</strong> las capas inferiores
                y superiores ya lo hacen
              </li>
              <li>
                <strong>Sin broadcast:</strong> usa multicast y anycast
              </li>
              <li>
                <strong>Autoconfiguración:</strong> SLAAC (sin DHCP)
              </li>
              <li>
                <strong>IPSec nativo:</strong> seguridad integrada en el diseño
              </li>
            </ul>
          </ConceptCard>
        </div>

        <ConceptCard
          title="Transición IPv4 → IPv6: Dual-Stack y Tunneling"
          icon={Shield}
          color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
        >
          <p className="text-sm">
            La transición a IPv6 es gradual. Dos mecanismos principales:
          </p>
          <ul className="text-sm mt-2 space-y-1.5 list-disc list-inside">
            <li>
              <strong>Dual-Stack:</strong> los nodos soportan tanto IPv4 como
              IPv6 simultáneamente. Se prefiere IPv6 cuando está disponible.
            </li>
            <li>
              <strong>Tunneling (6in4):</strong> datagramas IPv6 se encapsulan
              dentro de datagramas IPv4 para cruzar regiones de la red que solo
              soportan IPv4. Los extremos del túnel encapsulan y desencapsulan.
            </li>
          </ul>
        </ConceptCard>

        <ComparisonTable
          headers={["Característica", "IPv4", "IPv6"]}
          rows={[
            ["Tamaño de dirección", "32 bits (~4.3×10⁹)", "128 bits (~3.4×10³⁸)"],
            ["Cabecera", "20-60 bytes (variable)", "40 bytes (fija)"],
            ["Fragmentación", "En routers y hosts", "Solo en hosts (Path MTU)"],
            ["Checksum cabecera", "Sí (recalculado en cada router)", "No (eliminado)"],
            ["Broadcast", "Sí", "No (reemplazado por multicast)"],
            ["Autoconfiguración", "DHCP (externo)", "SLAAC nativo"],
          ]}
        />
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 6: Algoritmos de Enrutamiento */}
      {/* ============================================ */}
      <SectionBlock id="enrutamiento" title="Algoritmos de Enrutamiento">
        <p className="text-muted leading-relaxed">
          Los algoritmos de enrutamiento determinan la ruta óptima (menor costo)
          para los paquetes a través de la red. Se clasifican según si tienen
          conocimiento completo de la red o solo local, y si son centralizados
          o distribuidos.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <ConceptCard
            title="Link-State: Dijkstra"
            icon={Network}
            color="bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800"
          >
            <ul className="text-sm space-y-1.5 list-disc list-inside">
              <li>
                Cada router conoce la <strong>topología completa</strong>
              </li>
              <li>
                Inundación (flooding) de Link State Advertisements
              </li>
              <li>
                Cada router ejecuta <strong>Dijkstra localmente</strong>
              </li>
              <li>
                Complejidad: <strong>O(n²)</strong> básico, O(n log n) con heap
              </li>
              <li>
                Convergencia <strong>rápida</strong>
              </li>
              <li>
                Usado por: <strong>OSPF</strong> (intra-AS)
              </li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="Distance-Vector: Bellman-Ford"
            icon={ArrowRightLeft}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <ul className="text-sm space-y-1.5 list-disc list-inside">
              <li>
                Cada router solo conoce sus <strong>vecinos directos</strong>
              </li>
              <li>
                Intercambia vectores de distancia con vecinos
              </li>
              <li>
                Actualización <strong>iterativa y distribuida</strong>
              </li>
              <li>
                Problema: <strong>count-to-infinity</strong>
              </li>
              <li>
                Convergencia más <strong>lenta</strong>
              </li>
              <li>
                Usado por: <strong>RIP</strong> (intra-AS)
              </li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="BGP: Path-Vector"
            icon={GitBranch}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <ul className="text-sm space-y-1.5 list-disc list-inside">
              <li>
                Enrutamiento <strong>inter-AS</strong> (entre ISPs)
              </li>
              <li>
                Anuncia rutas como <strong>secuencias de AS</strong>
              </li>
              <li>
                Evita bucles (detecta su propio AS en la ruta)
              </li>
              <li>
                Basado en <strong>políticas</strong> (acuerdos comerciales)
              </li>
              <li>
                Protocolo <strong>eBGP</strong> (entre AS) e{" "}
                <strong>iBGP</strong> (dentro de AS)
              </li>
              <li>
                Es el protocolo de enrutamiento de <strong>Internet</strong>
              </li>
            </ul>
          </ConceptCard>
        </div>

        <ExampleBlock title="Dijkstra: paso a paso en un grafo simple">
          <p>
            Red con 4 nodos: <strong>u, v, w, x</strong>. Costos de enlace:
            u-v=2, u-w=5, v-w=1, v-x=4, w-x=2. Calcular rutas más cortas desde{" "}
            <strong>u</strong>.
          </p>
          <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 dark:bg-white/[0.07] rounded p-3 overflow-x-auto">
            <p className="font-bold">Inicialización:</p>
            <p>D(u)=0 (visitado), D(v)=2, D(w)=5, D(x)=∞</p>
            <p className="font-bold mt-2">Paso 1 — visitar nodo con menor D: v (D=2)</p>
            <p>Actualizar vecinos de v:</p>
            <p>  D(w) = min(5, D(v)+c(v,w)) = min(5, 2+1) = 3 ✓ vía v</p>
            <p>  D(x) = min(∞, D(v)+c(v,x)) = min(∞, 2+4) = 6 vía v</p>
            <p className="font-bold mt-2">Paso 2 — visitar w (D=3)</p>
            <p>Actualizar vecinos de w:</p>
            <p>  D(x) = min(6, D(w)+c(w,x)) = min(6, 3+2) = 5 ✓ vía w</p>
            <p className="font-bold mt-2">Paso 3 — visitar x (D=5) → fin</p>
            <p className="pt-2 border-t border-amber-300 font-bold">Rutas más cortas desde u:</p>
            <p>  u → v: costo 2 (directo)</p>
            <p>  u → w: costo 3 (u→v→w)</p>
            <p>  u → x: costo 5 (u→v→w→x)</p>
          </div>
        </ExampleBlock>

        <InfoCallout variant="info" title="Jerarquía de enrutamiento en Internet">
          <p>
            Internet se divide en <strong>Sistemas Autónomos (AS)</strong>,
            cada uno bajo una administración técnica única (ISP, empresa,
            universidad). El enrutamiento sigue una jerarquía:{" "}
            <strong>IGP</strong> (Interior Gateway Protocols) como OSPF y RIP
            operan <em>dentro</em> de un AS para enrutamiento interno.{" "}
            <strong>EGP</strong> (Exterior Gateway Protocols) como{" "}
            <strong>BGP</strong> operan <em>entre</em> ASes para enrutamiento
            inter-dominio. Esta jerarquía permite que Internet escale a millones
            de routers.
          </p>
        </InfoCallout>

        <ComparisonTable
          headers={["Protocolo", "Tipo", "Algoritmo", "Ámbito", "Métrica"]}
          rows={[
            ["OSPF", "IGP (link-state)", "Dijkstra", "Intra-AS", "Costo configurable"],
            ["RIP", "IGP (distance-vector)", "Bellman-Ford", "Intra-AS", "Número de saltos (máx 15)"],
            ["BGP", "EGP (path-vector)", "Policy-based", "Inter-AS", "Políticas + atributos"],
            ["IS-IS", "IGP (link-state)", "Dijkstra", "Intra-AS", "Costo configurable"],
          ]}
        />
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 7: Quiz */}
      {/* ============================================ */}
      <SectionBlock id="quiz" title="Quiz del Capítulo 4">
        <p className="text-muted leading-relaxed mb-4">
          Evalúa tu comprensión de la capa de red: IPv4, IPv6, NAT, DHCP y
          algoritmos de enrutamiento. Selecciona la respuesta correcta para cada
          pregunta.
        </p>
        <QuizContainer questions={quizCh4} chapterTitle={chapter.title} />
      </SectionBlock>
    </ChapterLayout>
  );
}

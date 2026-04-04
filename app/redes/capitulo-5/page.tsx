import { chapters } from "@/data/chapters";
import { ChapterLayout } from "@/components/layout/chapter-layout";
import { SectionBlock } from "@/components/content/section-block";
import { ConceptCard } from "@/components/content/concept-card";
import { ExampleBlock } from "@/components/content/example-block";
import { ComparisonTable } from "@/components/content/comparison-table";
import { InfoCallout } from "@/components/content/info-callout";
import { QuizContainer } from "@/components/quiz/quiz-container";
import { quizCh5 } from "@/data/quiz-ch5";
import {
  Settings,
  Globe,
  Router,
  Server,
  Shield,
  GitBranch,
  Network,
  Cpu,
  Database,
  ArrowRightLeft,
  Activity,
  Map,
} from "lucide-react";

const chapter = chapters[4];

export default function Capitulo5() {
  return (
    <ChapterLayout chapter={chapter}>
      {/* ============================================ */}
      {/* SECCIÓN 1: Introducción al Plano de Control */}
      {/* ============================================ */}
      <SectionBlock id="intro-control" title="Introducción al Plano de Control">
        <p className="text-muted leading-relaxed">
          La capa de red tiene dos funciones bien diferenciadas. El{" "}
          <strong>plano de datos</strong> (data plane) opera a nivel local en
          cada router: recibe un paquete por un enlace de entrada y lo reenvía
          por el enlace de salida correcto, usando la tabla de reenvío. El{" "}
          <strong>plano de control</strong> (control plane) opera a nivel de
          red: determina cómo se construyen esas tablas de reenvío, eligiendo
          los caminos que los paquetes deben tomar de origen a destino.
        </p>

        <p className="text-muted leading-relaxed">
          Existen dos enfoques fundamentales para implementar el plano de
          control, con filosofías opuestas sobre dónde reside la inteligencia
          de enrutamiento:
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Control Per-Router (Tradicional)"
            icon={Router}
            color="bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                Cada router ejecuta <strong>algoritmos de enrutamiento</strong>{" "}
                de forma independiente (OSPF, BGP, RIP)
              </li>
              <li>
                Los routers intercambian mensajes entre sí para construir sus
                propias tablas de reenvío
              </li>
              <li>
                Inteligencia <strong>distribuida</strong>: no hay punto central
                de fallo
              </li>
              <li>
                Protocolos maduros y ampliamente desplegados en Internet
              </li>
              <li>
                Cambios de política requieren reconfigurar múltiples routers
              </li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="Control Centralizado (SDN)"
            icon={Settings}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                Un <strong>controlador lógicamente centralizado</strong> tiene
                visión global de toda la red
              </li>
              <li>
                El controlador calcula las rutas y las instala en los routers
                (switches) via OpenFlow
              </li>
              <li>
                Los switches son simples dispositivos de <strong>reenvío</strong>;
                la lógica está en el controlador
              </li>
              <li>
                Facilita ingeniería de tráfico, políticas complejas e innovación
              </li>
              <li>
                El controlador puede ser un punto único de fallo si no se replica
              </li>
            </ul>
          </ConceptCard>
        </div>

        <InfoCallout variant="tip" title="Analogía:">
          <p>
            <em>
              Per-router es como cada taxista que decide su ruta mirando mapas
              locales e intercambiando información con taxistas vecinos. SDN es
              como tener un centro de control que ve todo el tráfico de la
              ciudad en tiempo real y da instrucciones óptimas a todos los
              taxis simultáneamente.
            </em>
          </p>
        </InfoCallout>

        <ComparisonTable
          headers={["Característica", "Per-Router (Tradicional)", "SDN Centralizado"]}
          rows={[
            [
              "Control",
              "Distribuido — cada router decide",
              "Centralizado — un controlador decide",
            ],
            [
              "Escalabilidad",
              "Alta — no hay cuello de botella central",
              "Limitada por capacidad del controlador",
            ],
            [
              "Visibilidad",
              "Local — cada router ve solo su entorno",
              "Global — el controlador ve toda la red",
            ],
            [
              "Fallo único",
              "No — fallo de un router no afecta el resto",
              "Sí — controlador fallido paraliza la red (mitigado con redundancia)",
            ],
            [
              "Innovación",
              "Lenta — requiere estándares y actualizaciones masivas",
              "Rápida — cambios de política en el controlador",
            ],
          ]}
        />
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 2: OSPF */}
      {/* ============================================ */}
      <SectionBlock id="ospf" title="OSPF: Enrutamiento Intra-AS">
        <p className="text-muted leading-relaxed">
          <strong>OSPF</strong> (Open Shortest Path First) es un protocolo de
          enrutamiento de <strong>estado de enlace</strong> (link-state) que
          opera dentro de un único Sistema Autónomo (AS). Es el IGP (Interior
          Gateway Protocol) más usado en redes empresariales e ISPs. Fue
          diseñado para reemplazar a RIP superando sus limitaciones de
          escalabilidad y velocidad de convergencia.
        </p>

        <p className="text-muted leading-relaxed">
          El principio central de OSPF: cada router difunde el estado de sus
          enlaces ({" "}
          <span className="font-mono text-sm bg-card dark:bg-white/10 px-1 rounded">
            LSA
          </span>{" "}
          — Link State Advertisement) a <strong>todos</strong> los routers del
          área mediante inundación (flooding). Con la topología completa, cada
          router ejecuta <strong>Dijkstra</strong> de forma independiente y
          calcula su propio árbol de rutas más cortas.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Tipos de Mensajes OSPF"
            icon={Activity}
            color="bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                <strong>Hello</strong>: descubre vecinos y mantiene adyacencias
                activas
              </li>
              <li>
                <strong>DBD</strong> (Database Description): resumen de la LSDB
                al iniciar adyacencia
              </li>
              <li>
                <strong>LSR</strong> (Link State Request): solicita LSAs
                específicos al vecino
              </li>
              <li>
                <strong>LSU</strong> (Link State Update): lleva uno o más LSAs;
                es el flooding principal
              </li>
              <li>
                <strong>LSAck</strong>: confirma recepción de LSAs
              </li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="Características Clave de OSPF"
            icon={Shield}
            color="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                <strong>Autenticación</strong>: soporta MD5 para proteger
                mensajes OSPF
              </li>
              <li>
                <strong>ECMP</strong>: múltiples rutas de igual costo
                (Equal-Cost Multi-Path)
              </li>
              <li>
                Soporte para <strong>unicast y multicast</strong>
              </li>
              <li>
                Convergencia rápida al detectar cambios de topología
              </li>
              <li>
                Sin límite de saltos (a diferencia de RIP que tiene límite de
                15)
              </li>
            </ul>
          </ConceptCard>
        </div>

        <InfoCallout variant="tip" title="Analogía:">
          <p>
            <em>
              OSPF es como todos los vecinos de un barrio compartiendo sus
              mapas locales de calles hasta que todos tienen el mapa completo
              del barrio. Luego, cada vecino calcula por su cuenta la mejor
              ruta a cualquier punto usando ese mapa completo.
            </em>
          </p>
        </InfoCallout>

        <ExampleBlock title="Diseño jerárquico OSPF con áreas">
          <p>
            En redes grandes, el flooding de LSAs puede consumir mucho ancho de
            banda y memoria. OSPF jerárquico divide la red en{" "}
            <strong>áreas</strong> para reducir este overhead:
          </p>
          <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 dark:bg-white/[0.07] rounded p-3">
            <p>┌─────────────────────────────────────────┐</p>
            <p>│           Área 0 (Backbone)             │</p>
            <p>│    R1 ──── R2 ──── R3 ──── R4          │</p>
            <p>│    │                         │           │</p>
            <p>│   ABR1                      ABR2         │</p>
            <p>└────│─────────────────────────│───────────┘</p>
            <p>     │                         │</p>
            <p>  ┌──┴──────┐           ┌─────┴───┐</p>
            <p>  │  Área 1 │           │  Área 2 │</p>
            <p>  │ R5─R6─R7│           │ R8─R9   │</p>
            <p>  └─────────┘           └─────────┘</p>
          </div>
          <ul className="mt-3 space-y-1 text-sm list-disc list-inside">
            <li>
              <strong>Área backbone (área 0):</strong> todas las demás áreas
              deben conectarse a ella
            </li>
            <li>
              <strong>ABR</strong> (Area Border Router): tiene interfaces en el
              backbone y en otra área; resume rutas entre ellas
            </li>
            <li>
              Los LSAs solo se inundan dentro del área, no a toda la red; el
              ABR resume la información al backbone
            </li>
            <li>
              Con 3 áreas de 50 routers c/u: flooding limitado a 50 routers
              en lugar de 150
            </li>
          </ul>
        </ExampleBlock>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Proceso de Flooding LSA"
            icon={Network}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <ol className="space-y-1 list-decimal list-inside text-sm">
              <li>Router detecta cambio en enlace o inicia OSPF</li>
              <li>
                Genera un LSA con: Router ID, enlaces, costos, número de
                secuencia
              </li>
              <li>
                Envía LSA por <strong>todos</strong> sus interfaces
              </li>
              <li>
                Cada vecino guarda el LSA en su LSDB y lo reenvía por todos
                sus interfaces (excepto el de entrada)
              </li>
              <li>El proceso termina cuando todos tienen el LSA</li>
              <li>
                Cada router recalcula Dijkstra con la LSDB actualizada
              </li>
            </ol>
          </ConceptCard>

          <ConceptCard
            title="Elección DR/BDR"
            icon={Router}
            color="bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800"
          >
            <p className="text-sm">
              En redes broadcast (Ethernet), OSPF elige un{" "}
              <strong>DR</strong> (Designated Router) y un{" "}
              <strong>BDR</strong> (Backup DR) para reducir el número de
              adyacencias OSPF completas de O(n²) a O(n).
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
              <li>
                Todos los routers forman adyacencia solo con DR y BDR
              </li>
              <li>
                Elección: mayor prioridad OSPF → mayor Router ID como
                desempate
              </li>
              <li>
                DR distribuye LSAs recibidos a todos via multicast
                224.0.0.5
              </li>
            </ul>
          </ConceptCard>
        </div>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 3: BGP */}
      {/* ============================================ */}
      <SectionBlock id="bgp" title="BGP: Enrutamiento Inter-AS">
        <p className="text-muted leading-relaxed">
          <strong>BGP</strong> (Border Gateway Protocol) es{" "}
          <em>el</em> protocolo de enrutamiento de Internet: gestiona cómo los
          paquetes atraviesan los miles de Sistemas Autónomos independientes
          que forman la red global. A diferencia de OSPF que minimiza costos
          técnicos, BGP toma decisiones basadas en{" "}
          <strong>políticas comerciales y administrativas</strong>.
        </p>

        <p className="text-muted leading-relaxed">
          BGP es un protocolo <strong>path-vector</strong>: en lugar de
          anunciar solo el costo de alcanzar un destino, anuncia el{" "}
          <em>camino completo de ASes</em> que se debe atravesar. Esto permite
          detectar loops y aplicar políticas de filtrado basadas en el camino.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="eBGP vs iBGP"
            icon={ArrowRightLeft}
            color="bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-800"
          >
            <p className="text-sm font-semibold mb-1">eBGP (external BGP):</p>
            <ul className="text-sm space-y-1 list-disc list-inside mb-3">
              <li>Entre routers de <strong>diferentes</strong> ASes</li>
              <li>Típicamente entre routers de borde directamente conectados</li>
              <li>Aprende prefijos externos y su AS_PATH</li>
            </ul>
            <p className="text-sm font-semibold mb-1">iBGP (internal BGP):</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Entre routers <strong>dentro del mismo</strong> AS</li>
              <li>Distribuye internamente las rutas aprendidas por eBGP</li>
              <li>
                Requiere full-mesh o route reflectors (no redistribuye rutas
                iBGP a otros iBGP peers)
              </li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="Atributos BGP"
            icon={GitBranch}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <ul className="text-sm space-y-1.5 list-disc list-inside">
              <li>
                <strong>AS_PATH</strong>: lista de ASes recorridos → prevención
                de loops y selección por longitud
              </li>
              <li>
                <strong>NEXT_HOP</strong>: IP del router de borde para alcanzar
                el prefijo
              </li>
              <li>
                <strong>LOCAL_PREF</strong>: preferencia local del AS para
                elegir la salida (mayor = mejor; máxima prioridad)
              </li>
              <li>
                <strong>MED</strong> (Multi-Exit Discriminator): sugerencia al
                vecino sobre el punto de entrada preferido (menor = mejor)
              </li>
              <li>
                <strong>COMMUNITY</strong>: etiqueta para agrupar rutas y
                aplicar políticas en masa
              </li>
            </ul>
          </ConceptCard>
        </div>

        <ExampleBlock title="Algoritmo de selección de rutas BGP">
          <p>
            Cuando un router BGP tiene múltiples rutas hacia el mismo prefijo,
            las evalúa en este orden hasta encontrar un ganador:
          </p>
          <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 dark:bg-white/[0.07] rounded p-3">
            <p>1. Mayor LOCAL_PREF  ← máxima prioridad (política local)</p>
            <p>2. AS_PATH más corto ← menos ASes en el camino</p>
            <p>3. Menor MED         ← punto de entrada preferido del vecino</p>
            <p>4. eBGP &gt; iBGP        ← preferir rutas externas</p>
            <p>5. Menor costo IGP al NEXT_HOP ← hot potato routing</p>
            <p>6. Menor Router ID   ← desempate final</p>
          </div>
          <p className="mt-2 text-sm">
            En la práctica, LOCAL_PREF domina: un administrador puede forzar
            que todo el tráfico salga por un enlace específico configurando
            LOCAL_PREF alto en las rutas aprendidas por ese enlace.
          </p>
        </ExampleBlock>

        <InfoCallout variant="tip" title="Analogía:">
          <p>
            <em>
              BGP es como las negociaciones diplomáticas entre países: cada AS
              decide qué rutas anunciar y a quién, basándose en acuerdos
              comerciales y políticos, no solo en la distancia geográfica. Un
              ISP puede preferir enviar tráfico por un camino más largo si
              tiene un acuerdo de peering favorable.
            </em>
          </p>
        </InfoCallout>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="AS_PATH: Prevención de Loops"
            icon={Map}
            color="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800"
          >
            <p className="text-sm">
              Cuando un router BGP recibe un anuncio, verifica si su propio
              número de AS ya aparece en el AS_PATH. Si es así, descarta el
              anuncio para evitar bucles de enrutamiento.
            </p>
            <div className="font-mono text-xs mt-2 bg-white/60 dark:bg-white/[0.07] rounded p-2">
              <p>AS100 anuncia: 203.0.113.0/24 AS_PATH=[100]</p>
              <p>AS200 propaga: AS_PATH=[200, 100]</p>
              <p>AS300 propaga: AS_PATH=[300, 200, 100]</p>
              <p className="pt-1 border-t border-green-300">
                AS100 recibe AS_PATH=[300,200,100] → loop! Descarta.
              </p>
            </div>
          </ConceptCard>

          <ConceptCard
            title="Hot Potato Routing"
            icon={Activity}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <p className="text-sm">
              Cuando hay múltiples puntos de salida para un destino, el router
              elige el que tiene <strong>menor costo IGP</strong> (más cercano
              dentro del propio AS), entregando el paquete al siguiente AS lo
              antes posible.
            </p>
            <p className="text-sm mt-2">
              Reduce carga en la red interna pero puede producir rutas
              subóptimas globalmente. Lo opuesto es{" "}
              <strong>cold potato routing</strong> (usado por Google): mantener
              el paquete en la propia red el mayor tiempo posible para
              controlar la calidad.
            </p>
          </ConceptCard>
        </div>

        <ComparisonTable
          headers={["Característica", "BGP", "OSPF"]}
          rows={[
            ["Ámbito", "Inter-AS (entre Sistemas Autónomos)", "Intra-AS (dentro de un AS)"],
            ["Tipo de protocolo", "Path-vector", "Link-state"],
            ["Algoritmo", "Selección por atributos y política", "Dijkstra (costo mínimo)"],
            ["Métrica principal", "Políticas comerciales y AS_PATH", "Costo de enlace (ancho de banda)"],
            ["Convergencia", "Lenta (segundos a minutos)", "Rápida (segundos)"],
            ["Objetivo", "Política + relaciones comerciales", "Optimización técnica de rutas"],
          ]}
        />
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 4: Enrutamiento en Internet */}
      {/* ============================================ */}
      <SectionBlock id="internet-routing" title="Enrutamiento en Internet">
        <p className="text-muted leading-relaxed">
          Internet es una <strong>red de redes</strong>: una colección de miles
          de Sistemas Autónomos independientes interconectados. Cada AS tiene
          un ASN (Autonomous System Number) único de 16 o 32 bits asignado por
          los RIRs (Regional Internet Registries). El enrutamiento en Internet
          opera en dos niveles complementarios.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Enrutamiento Intra-AS"
            icon={Network}
            color="bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                Protocolos: <strong>OSPF</strong>, RIP, EIGRP (propietario
                Cisco)
              </li>
              <li>
                Objetivo: minimizar costo o latencia{" "}
                <strong>dentro del AS</strong>
              </li>
              <li>
                También llamados IGP (Interior Gateway Protocols)
              </li>
              <li>
                La topología interna es privada — otros ASes no la ven
              </li>
              <li>
                Escala hasta miles de routers con OSPF jerárquico
              </li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="Enrutamiento Inter-AS"
            icon={Globe}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                Protocolo único: <strong>BGP</strong> (Border Gateway Protocol)
              </li>
              <li>
                Objetivo: política + relaciones comerciales entre ISPs
              </li>
              <li>
                También llamado EGP (Exterior Gateway Protocol)
              </li>
              <li>
                Cada AS anuncia sus prefijos IP y los de sus clientes
              </li>
              <li>
                Los ASes controlan qué rutas aceptan y anuncian según acuerdos
              </li>
            </ul>
          </ConceptCard>
        </div>

        <InfoCallout variant="tip" title="Analogía:">
          <p>
            <em>
              Hot potato routing es como sacarte el problema de encima lo más
              rápido posible: mandás el paquete al router de salida más cercano
              dentro de tu red aunque el destino final quede muy lejos de ahí.
              Cold potato routing (Google, Cloudflare) es lo contrario: mantenés
              el paquete en tu red de alta calidad el mayor tiempo posible antes
              de entregarlo al AS destino.
            </em>
          </p>
        </InfoCallout>

        <ExampleBlock title="Un paquete de Argentina a Japón via BGP">
          <p>
            Traza de un paquete desde un host en Argentina (AS 7303, Telecom
            Argentina) hasta un servidor en Japón (AS 2497, Internet Initiative
            Japan):
          </p>
          <div className="font-mono text-xs space-y-1 mt-2 bg-white/60 dark:bg-white/[0.07] rounded p-3">
            <p>Host Argentina → Router de borde Telecom (AS 7303)</p>
            <p>  ↓  eBGP: AS 7303 anuncia ruta al AS 2497</p>
            <p>AS 7303 (Telecom AR) → AS 3549 (Level 3 / Lumen)</p>
            <p>  ↓  eBGP: traversal por backbone Tier-1</p>
            <p>AS 3549 (Lumen USA) → AS 2914 (NTT Communications)</p>
            <p>  ↓  eBGP: ingreso a red japonesa</p>
            <p>AS 2914 (NTT) → AS 2497 (IIJ Japan)</p>
            <p>  ↓  eBGP: entrega al AS destino</p>
            <p>AS 2497 → Servidor destino en Japón</p>
            <p className="pt-2 border-t border-amber-300">
              AS_PATH en BGP: [7303, 3549, 2914, 2497]
            </p>
          </div>
          <p className="mt-2 text-sm">
            En cada frontera AS, el router de borde aplica políticas BGP:
            filtra rutas, ajusta LOCAL_PREF y anuncia solo las rutas que le
            convienen según sus acuerdos comerciales.
          </p>
        </ExampleBlock>

        <InfoCallout variant="info" title="Escala de Internet">
          <p>
            Internet tiene aproximadamente <strong>100.000 ASes</strong>{" "}
            registrados activos. La tabla de enrutamiento BGP global contiene
            más de <strong>900.000 prefijos IPv4</strong> y está creciendo
            continuamente. Los routers de core de Internet deben buscar en esta
            tabla para cada paquete. Esto hace que los ASICs de forwarding
            (basados en TCAM) sean críticos para el rendimiento.
          </p>
        </InfoCallout>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 5: SDN: Plano de Control */}
      {/* ============================================ */}
      <SectionBlock id="sdn-control" title="SDN: Plano de Control">
        <p className="text-muted leading-relaxed">
          SDN (Software-Defined Networking) representa un cambio de paradigma:
          separa el <strong>plano de control</strong> (decisión de qué hacer con
          los paquetes) del <strong>plano de datos</strong> (acción de reenviar
          paquetes). El control se concentra en un software llamado
          controlador SDN que tiene una visión global de la red.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="API Southbound: OpenFlow"
            icon={Server}
            color="bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-800"
          >
            <p className="text-sm">
              Protocolo de comunicación entre el controlador SDN y los switches
              de la capa de datos. El controlador instala{" "}
              <strong>reglas de flujo</strong> (flow entries) en las tablas de
              los switches.
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
              <li>
                <strong>Match</strong>: campos de cabecera (IP src/dst, puerto,
                MAC, VLAN)
              </li>
              <li>
                <strong>Action</strong>: forward, drop, modify, send to
                controller
              </li>
              <li>
                <strong>Priority</strong> y contador de paquetes por regla
              </li>
              <li>Opera sobre TCP puerto 6653</li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="API Northbound: REST"
            icon={Cpu}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p className="text-sm">
              Interfaz entre el controlador SDN y las{" "}
              <strong>aplicaciones de red</strong> que definen las políticas.
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
              <li>Típicamente APIs REST (HTTP + JSON)</li>
              <li>
                Aplicaciones: traffic engineering, load balancing, firewall
                virtual, network slicing
              </li>
              <li>
                El controlador traduce las políticas de alto nivel a reglas
                OpenFlow de bajo nivel
              </li>
              <li>
                Permite innovar sin modificar el hardware de red
              </li>
            </ul>
          </ConceptCard>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="OpenDaylight y ONOS"
            icon={Database}
            color="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800"
          >
            <p className="text-sm">
              Controladores SDN open-source de referencia:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
              <li>
                <strong>OpenDaylight</strong>: proyecto de Linux Foundation,
                modular, Java-based; usado en redes empresariales y de
                operadores
              </li>
              <li>
                <strong>ONOS</strong> (Open Network OS): diseñado para
                telecomunicaciones y redes de alta disponibilidad; soporta
                clustering para escalar
              </li>
              <li>Ambos exponen APIs northbound REST y soportan OpenFlow</li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="P4: Programando el Plano de Datos"
            icon={GitBranch}
            color="bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800"
          >
            <p className="text-sm">
              P4 (Programming Protocol-Independent Packet Processors) va más
              allá de OpenFlow: permite{" "}
              <strong>definir cómo el switch procesa los paquetes</strong>,
              no solo elegir acciones predefinidas.
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
              <li>Define nuevos headers y protocolos personalizados</li>
              <li>
                Programable en FPGAs, ASICs, CPUs y SmartNICs
              </li>
              <li>
                Casos de uso: telemetría in-band, SRv6, procesamiento en el
                switch, 5G
              </li>
            </ul>
          </ConceptCard>
        </div>

        <InfoCallout variant="tip" title="Analogía:">
          <p>
            <em>
              El controlador SDN es como el director de una orquesta: cada
              músico (switch) es especialista en su instrumento (reenviar
              paquetes), pero el director (controlador) decide qué tocar,
              cuándo y a qué velocidad. Sin el director, cada músico tocaría
              su propia melodía; con el director, la orquesta produce algo
              coordinado y optimizado.
            </em>
          </p>
        </InfoCallout>

        <ComparisonTable
          headers={["Característica", "Red Tradicional", "Red SDN"]}
          rows={[
            [
              "Control",
              "Distribuido en cada router (OSPF/BGP)",
              "Centralizado en el controlador SDN",
            ],
            [
              "Plano de datos",
              "Integrado con el control en el mismo dispositivo",
              "Separado: switches simples controlados externamente",
            ],
            [
              "Programabilidad",
              "CLI o SNMP, difícil de automatizar",
              "APIs REST northbound, totalmente programable",
            ],
            [
              "Visibilidad",
              "Local — cada router ve su entorno inmediato",
              "Global — el controlador ve toda la topología",
            ],
            [
              "Innovación",
              "Requiere actualizar firmware en todos los equipos",
              "Nueva lógica desplegada en el controlador (software)",
            ],
          ]}
        />
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 6: ICMP y Gestión de Redes */}
      {/* ============================================ */}
      <SectionBlock id="icmp-mgmt" title="ICMP y Gestión de Redes">
        <p className="text-muted leading-relaxed">
          Esta sección cubre dos áreas complementarias de la capa de red: ICMP,
          el protocolo que permite comunicar errores y diagnósticos entre
          dispositivos, y los protocolos de gestión de redes (SNMP y NETCONF)
          que permiten monitorizar y configurar la infraestructura.
        </p>

        {/* ---- ICMP ---- */}
        <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">
          ICMP: Internet Control Message Protocol
        </h3>

        <p className="text-muted leading-relaxed">
          ICMP es usado por routers y hosts para comunicar{" "}
          <strong>información de error y diagnóstico</strong> sobre el
          procesamiento de datagramas IP. Aunque vive en la capa de red, los
          mensajes ICMP se encapsulan dentro de datagramas IP (protocolo número
          1). ICMP no garantiza entrega confiable; es un protocolo best-effort.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Tipos de Mensajes ICMP Clave"
            icon={Activity}
            color="bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                <strong>Tipo 0</strong>: Echo Reply (respuesta de ping)
              </li>
              <li>
                <strong>Tipo 8</strong>: Echo Request (envío de ping)
              </li>
              <li>
                <strong>Tipo 3</strong>: Destination Unreachable
                <ul className="ml-4 mt-0.5 space-y-0.5 list-disc list-inside">
                  <li>Código 0: Red inalcanzable</li>
                  <li>Código 1: Host inalcanzable</li>
                  <li>Código 3: Puerto inalcanzable</li>
                </ul>
              </li>
              <li>
                <strong>Tipo 11</strong>: Time Exceeded (TTL = 0 → usado por
                traceroute)
              </li>
              <li>
                <strong>Tipo 5</strong>: Redirect (mejor ruta disponible)
              </li>
              <li>
                <strong>Tipo 12</strong>: Parameter Problem (error en cabecera
                IP)
              </li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="ICMPv6 y NDP"
            icon={Globe}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p className="text-sm">
              ICMPv6 extiende ICMP para IPv6 e incluye el{" "}
              <strong>Neighbor Discovery Protocol (NDP)</strong>, que reemplaza
              ARP completamente:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
              <li>
                <strong>Neighbor Solicitation</strong> (Tipo 135): equivale a
                ARP Request
              </li>
              <li>
                <strong>Neighbor Advertisement</strong> (Tipo 136): equivale a
                ARP Reply
              </li>
              <li>
                <strong>Router Solicitation/Advertisement</strong>: descubre el
                gateway y prefijos de red
              </li>
              <li>
                <strong>DAD</strong>: Duplicate Address Detection antes de usar
                una dirección
              </li>
            </ul>
          </ConceptCard>
        </div>

        <ExampleBlock title="Ping y Traceroute paso a paso">
          <p className="font-semibold">Ping (ICMP Echo Request/Reply):</p>
          <div className="font-mono text-xs space-y-1 mt-1 mb-3 bg-white/60 dark:bg-white/[0.07] rounded p-3">
            <p>1. Host A envía ICMP Tipo 8 (Echo Request) a Host B</p>
            <p>   → ID=1234, Seq=1, datos de 32 bytes, TTL=64</p>
            <p>2. Host B recibe el paquete y responde</p>
            <p>   → ICMP Tipo 0 (Echo Reply), mismo ID y Seq</p>
            <p>3. Host A calcula RTT = tiempo recepción - tiempo envío</p>
            <p>   → ping: 64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=12.3 ms</p>
          </div>
          <p className="font-semibold">Traceroute (usando TTL incremental):</p>
          <div className="font-mono text-xs space-y-1 mt-1 bg-white/60 dark:bg-white/[0.07] rounded p-3">
            <p>1. Envía UDP/ICMP con TTL=1 → Router1 decrementa: TTL=0</p>
            <p>   → Router1 descarta y envía ICMP Tipo 11 (Time Exceeded)</p>
            <p>   → Traceroute registra IP de Router1 y RTT</p>
            <p>2. Envía con TTL=2 → Router1 pasa, Router2 descarta TTL=0</p>
            <p>   → Router2 envía ICMP Tipo 11 → registra Router2</p>
            <p>3. Continúa incrementando TTL hasta llegar al destino</p>
            <p>   → Destino recibe UDP a puerto cerrado → ICMP Tipo 3</p>
            <p>   (Port Unreachable) → traceroute termina</p>
            <p className="pt-2 border-t border-amber-300">
              Resultado: mapa de routers y RTT en cada salto
            </p>
          </div>
        </ExampleBlock>

        {/* ---- Gestión de Redes ---- */}
        <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">
          Gestión de Redes: SNMP y NETCONF
        </h3>

        <p className="text-muted leading-relaxed">
          La gestión de redes abarca el monitoreo y la configuración de
          dispositivos (routers, switches, servidores). Los componentes básicos
          son: el <strong>manager</strong> (software que gestiona), los{" "}
          <strong>agentes</strong> (software en cada dispositivo gestionado) y
          los <strong>objetos gestionados</strong> (datos del dispositivo: carga
          de CPU, contadores de interfaces, tablas de rutas).
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <ConceptCard
            title="SNMP: Arquitectura"
            icon={Network}
            color="bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                <strong>GET</strong>: manager solicita valor de un objeto MIB
              </li>
              <li>
                <strong>GETNEXT/GETBULK</strong>: recupera múltiples objetos
              </li>
              <li>
                <strong>SET</strong>: manager configura un parámetro del
                agente
              </li>
              <li>
                <strong>Trap</strong>: agente notifica proactivamente al manager
                (evento asíncrono)
              </li>
              <li>
                Usa <strong>UDP</strong> (puerto 161 para GET/SET, 162 para
                Traps)
              </li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="MIB: Base de Objetos"
            icon={Database}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <p className="text-sm">
              La <strong>MIB</strong> (Management Information Base) es una
              jerarquía de objetos gestionados identificados por OIDs:
            </p>
            <div className="font-mono text-xs mt-2 bg-white/60 dark:bg-white/[0.07] rounded p-2">
              <p>sysDescr: 1.3.6.1.2.1.1.1</p>
              <p>ifInOctets: 1.3.6.1.2.1.2.2.1.10</p>
              <p>ifOutOctets: 1.3.6.1.2.1.2.2.1.16</p>
              <p>ipInReceives: 1.3.6.1.2.1.4.3</p>
            </div>
            <p className="text-sm mt-2">
              MIB-II define objetos estándar; fabricantes agregan MIBs
              propietarias.
            </p>
          </ConceptCard>

          <ConceptCard
            title="NETCONF/YANG"
            icon={Shield}
            color="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                <strong>NETCONF</strong>: protocolo de configuración sobre SSH
                con mensajes XML
              </li>
              <li>
                <strong>YANG</strong>: lenguaje de modelado de datos para
                estructurar la configuración
              </li>
              <li>
                Soporta <strong>transacciones</strong>: configuración candidata
                → validar → commit
              </li>
              <li>
                Operaciones: get-config, edit-config, commit, lock/unlock
              </li>
              <li>
                Más expresivo y seguro que SNMP SET para configuración
              </li>
            </ul>
          </ConceptCard>
        </div>

        <InfoCallout variant="tip" title="Analogía:">
          <p>
            <em>
              SNMP es como hacer encuestas a cada empleado por teléfono para
              saber cómo está (polling periódico) o esperar a que llamen si
              hay una emergencia (trap). NETCONF es como una app de gestión
              empresarial con formularios estructurados, validación antes de
              guardar y transacciones que aseguran consistencia.
            </em>
          </p>
        </InfoCallout>

        <InfoCallout variant="warning" title="SNMP: Limitaciones de seguridad">
          <p>
            SNMPv1 y v2c usan "community strings" (esencialmente contraseñas en
            texto plano) para autenticación. Esto es inseguro en redes no
            confiables. SNMPv3 introduce autenticación (HMAC-MD5/SHA) y cifrado
            (DES/AES), pero su configuración es compleja. NETCONF sobre SSH
            hereda la seguridad de SSH desde el diseño.
          </p>
        </InfoCallout>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 7: Quiz */}
      {/* ============================================ */}
      <SectionBlock id="quiz" title="Quiz del Capítulo">
        <QuizContainer questions={quizCh5} chapterTitle={chapter.title} />
      </SectionBlock>
    </ChapterLayout>
  );
}

import type { QuizQuestion } from "@/types/quiz";

// Correct answers: a d b c a d c b d a c b a d b c d a c b
export const quizCh5: QuizQuestion[] = [
  {
    id: "ch5-q1",
    question: "¿Cuál es la diferencia principal entre el plano de control per-router y el plano de control centralizado (SDN)?",
    options: [
      { id: "a", text: "En per-router, cada router ejecuta algoritmos de enrutamiento de forma independiente; en SDN, un controlador centralizado calcula las rutas y las instala en los routers" },
      { id: "b", text: "El plano de control per-router solo funciona con IPv6, mientras que SDN es compatible con IPv4" },
      { id: "c", text: "SDN elimina la necesidad de tablas de reenvío en los routers, mientras que per-router las genera localmente" },
      { id: "d", text: "En per-router, el plano de datos y el plano de control están separados físicamente; en SDN están integrados" },
    ],
    correctAnswerId: "a",
    explanation:
      "En el enfoque per-router tradicional (usado por OSPF y BGP), cada router ejecuta de forma autónoma algoritmos de enrutamiento e intercambia mensajes con sus vecinos para construir sus propias tablas de reenvío. En SDN, un controlador lógicamente centralizado tiene visión global de la red, calcula todas las rutas y las instala en los routers (switches) mediante protocolos como OpenFlow.",
  },
  {
    id: "ch5-q2",
    question: "En OSPF, ¿qué es un LSA (Link State Advertisement) y cómo se distribuye en la red?",
    options: [
      { id: "a", text: "Es un mensaje de saludo que OSPF envía cada 10 segundos solo a los vecinos directos" },
      { id: "b", text: "Es una tabla de enrutamiento completa que se envía solo al router designado (DR)" },
      { id: "c", text: "Es un mensaje de error que se genera cuando un enlace falla" },
      { id: "d", text: "Es un anuncio que describe el estado de los enlaces de un router y se difunde a todos los routers del área mediante inundación (flooding)" },
    ],
    correctAnswerId: "d",
    explanation:
      "Un LSA (Link State Advertisement) contiene información sobre los costos de los enlaces de un router y sus vecinos conectados. Cuando un router genera o recibe un LSA, lo reenvía por todos sus interfaces excepto el que lo recibió (flooding). Este proceso garantiza que todos los routers del área tengan una vista completa e idéntica de la topología, sobre la cual cada uno ejecuta Dijkstra de forma independiente.",
  },
  {
    id: "ch5-q3",
    question: "¿Cuál es la función del área backbone (área 0) en OSPF jerárquico?",
    options: [
      { id: "a", text: "Es el área con mayor número de routers donde se realiza toda la computación de rutas" },
      { id: "b", text: "Es el área central a la que deben conectarse todas las demás áreas; los routers ABR se encargan de resumir información entre áreas" },
      { id: "c", text: "Es un área opcional que solo se usa en redes con más de 100 routers" },
      { id: "d", text: "Es el área donde residen exclusivamente los routers de borde (ASBR) que conectan con otros sistemas autónomos" },
    ],
    correctAnswerId: "b",
    explanation:
      "En OSPF jerárquico, el área backbone (área 0) es el núcleo al que deben conectarse todas las demás áreas. Los routers ABR (Area Border Routers) tienen interfaces en el área backbone y en otras áreas, resumiendo la información de enrutamiento entre ellas. Esta jerarquía reduce el overhead de flooding: cada router solo hace flooding dentro de su área, no en toda la red.",
  },
  {
    id: "ch5-q4",
    question: "En redes broadcast (como Ethernet), OSPF elige un DR y un BDR. ¿Cuál es el propósito del DR (Designated Router)?",
    options: [
      { id: "a", text: "El DR reemplaza al router con mayor costo en la red para reducir la convergencia" },
      { id: "b", text: "El DR es el único router que puede iniciar sesiones BGP con otros sistemas autónomos" },
      { id: "c", text: "El DR actúa como punto central de intercambio de LSAs: todos los routers de la red forman adyacencia completa solo con el DR (y BDR), reduciendo el número de adyacencias de O(n²) a O(n)" },
      { id: "d", text: "El DR fragmenta los LSAs grandes para adaptarlos al MTU del enlace Ethernet" },
    ],
    correctAnswerId: "c",
    explanation:
      "En una red broadcast, si cada par de routers formara adyacencia OSPF completa, el número de relaciones sería n(n-1)/2 = O(n²). El DR centraliza el intercambio: todos los routers envían sus LSAs al DR (y BDR), y el DR los redistribuye a todos. Esto reduce el tráfico OSPF y el número de adyacencias completas a O(n). La elección se basa en la prioridad OSPF y el Router ID.",
  },
  {
    id: "ch5-q5",
    question: "¿Cuál es la diferencia entre eBGP e iBGP?",
    options: [
      { id: "a", text: "eBGP intercambia rutas entre routers de diferentes Sistemas Autónomos (ASes); iBGP intercambia rutas entre routers dentro del mismo AS" },
      { id: "b", text: "eBGP usa TCP sobre el puerto 80, mientras que iBGP usa UDP sobre el puerto 53" },
      { id: "c", text: "eBGP es la versión más antigua de BGP y fue reemplazada por iBGP en redes modernas" },
      { id: "d", text: "eBGP maneja solo rutas IPv4; iBGP puede manejar rutas IPv4 e IPv6 simultáneamente" },
    ],
    correctAnswerId: "a",
    explanation:
      "eBGP (external BGP) establece sesiones entre routers de borde de ASes distintos. iBGP (internal BGP) distribuye las rutas aprendidas via eBGP dentro del mismo AS, de router a router. Una regla clave de iBGP es que no anuncia rutas aprendidas por iBGP a otros peers iBGP (para evitar loops), por lo que se requiere full mesh o route reflectors. Ambos usan TCP puerto 179.",
  },
  {
    id: "ch5-q6",
    question: "En BGP, ¿qué función cumple el atributo AS_PATH?",
    options: [
      { id: "a", text: "Indica el ancho de banda disponible en el camino hasta el destino" },
      { id: "b", text: "Especifica la dirección IP del siguiente salto (next-hop) para alcanzar el prefijo anunciado" },
      { id: "c", text: "Define la preferencia local del router para elegir entre múltiples rutas hacia el mismo destino" },
      { id: "d", text: "Lista los ASes por los que ha pasado el anuncio de ruta, permitiendo detectar y evitar bucles de enrutamiento" },
    ],
    correctAnswerId: "d",
    explanation:
      "AS_PATH es una lista ordenada de los números de AS por los que ha viajado el anuncio BGP. Cuando un router recibe un anuncio con su propio AS en el AS_PATH, lo descarta (prevención de loops). También se usa para selección de rutas: a igualdad de LOCAL_PREF, se prefiere el AS_PATH más corto. Además, permite a los operadores filtrar rutas o aplicar políticas basadas en el camino.",
  },
  {
    id: "ch5-q7",
    question: "¿Qué es el 'hot potato routing' y por qué lo usan los ISPs?",
    options: [
      { id: "a", text: "Una técnica de balanceo de carga que distribuye el tráfico uniformemente entre todos los enlaces disponibles" },
      { id: "b", text: "Un protocolo de enrutamiento especializado para redes de datacenter con alta densidad de servidores" },
      { id: "c", text: "La práctica de elegir el punto de salida del AS con menor costo IGP, entregando el paquete al siguiente AS lo más rápido posible, independientemente de la ruta total" },
      { id: "d", text: "Un algoritmo que prioriza los paquetes de menor tamaño para reducir la latencia en redes congestionadas" },
    ],
    correctAnswerId: "c",
    explanation:
      "Hot potato routing es la estrategia de un AS de 'deshacerse' del paquete lo antes posible: cuando hay múltiples puntos de salida para alcanzar un destino, el router elige el que tiene menor costo IGP (más cercano dentro del propio AS), sin considerar el costo en ASes externos. Reduce la carga interna del ISP pero puede resultar en rutas subóptimas globalmente. El término alude a 'sacarse la papa caliente de la mano'.",
  },
  {
    id: "ch5-q8",
    question: "En el algoritmo de selección de rutas BGP, ¿cuál atributo tiene la máxima prioridad?",
    options: [
      { id: "a", text: "AS_PATH más corto" },
      { id: "b", text: "LOCAL_PREF más alto" },
      { id: "c", text: "MED más bajo" },
      { id: "d", text: "Preferencia eBGP sobre iBGP" },
    ],
    correctAnswerId: "b",
    explanation:
      "El orden de selección de rutas BGP es: (1) LOCAL_PREF más alto — preferencia local del AS, configurada por el administrador; (2) AS_PATH más corto; (3) MED más bajo — indica el punto de entrada preferido del vecino; (4) eBGP > iBGP; (5) menor costo IGP al next-hop (hot potato); (6) menor Router ID. LOCAL_PREF es el criterio más prioritario porque permite a cada AS controlar soberanamente qué rutas prefiere.",
  },
  {
    id: "ch5-q9",
    question: "¿Qué es un Sistema Autónomo (AS) y cómo se identifica en Internet?",
    options: [
      { id: "a", text: "Un servidor DNS autorizado que gestiona la resolución de nombres para un dominio específico" },
      { id: "b", text: "Un conjunto de routers que implementan únicamente el protocolo OSPF dentro de una misma organización" },
      { id: "c", text: "Un tipo especial de firewall que protege el perímetro de una red corporativa" },
      { id: "d", text: "Un grupo de routers bajo el mismo control administrativo, identificado por un número ASN de 16 o 32 bits asignado por IANA/RIRs" },
    ],
    correctAnswerId: "d",
    explanation:
      "Un AS (Autonomous System) es un conjunto de prefijos IP y routers bajo una única política de enrutamiento y control administrativo (ISP, empresa, universidad). Cada AS recibe un ASN (Autonomous System Number) único: originalmente 16 bits (1–65535), ampliado a 32 bits (hasta ~4 mil millones). Los ASNs son asignados por IANA a través de los RIRs regionales (LACNIC para Latinoamérica). BGP usa los ASNs para intercambiar rutas entre ASes.",
  },
  {
    id: "ch5-q10",
    question: "¿Qué protocolo southbound usa el controlador SDN para instalar reglas de flujo en los switches?",
    options: [
      { id: "a", text: "OpenFlow" },
      { id: "b", text: "NETCONF" },
      { id: "c", text: "OSPF" },
      { id: "d", text: "SNMP" },
    ],
    correctAnswerId: "a",
    explanation:
      "OpenFlow es el protocolo southbound estándar en SDN: define cómo el controlador SDN comunica reglas de flujo (flow entries) a los switches de la capa de datos. Una regla OpenFlow especifica un patrón de coincidencia (match fields: IP de origen/destino, puerto, protocolo) y una acción (forward, drop, modify). El controlador establece conexiones TCP con los switches y envía mensajes OpenFlow para instalar, modificar o eliminar entradas de la tabla de flujos.",
  },
  {
    id: "ch5-q11",
    question: "¿Qué lenguaje/herramienta se usa en SDN para programar el comportamiento del plano de datos más allá de las capacidades de OpenFlow?",
    options: [
      { id: "a", text: "YAML — para describir políticas de enrutamiento en formato legible" },
      { id: "b", text: "YANG — para modelar datos de configuración de dispositivos de red" },
      { id: "c", text: "P4 (Programming Protocol-Independent Packet Processors) — para definir el procesamiento de paquetes directamente en el hardware de la capa de datos" },
      { id: "d", text: "Ansible — para automatizar la configuración de routers mediante playbooks" },
    ],
    correctAnswerId: "c",
    explanation:
      "P4 (Programming Protocol-Independent Packet Processors) es un lenguaje de dominio específico que permite programar cómo los dispositivos de red (switches, NICs, FPGAs) procesan los paquetes. A diferencia de OpenFlow que solo permite elegir entre acciones predefinidas sobre campos fijos, P4 permite definir nuevos headers, protocolos y acciones desde cero. Esto habilita funciones como telemetría in-band, procesamiento de segmentos (SRv6) y protocolos personalizados sin cambiar el hardware.",
  },
  {
    id: "ch5-q12",
    question: "¿Cuál es la función de la API northbound en una arquitectura SDN?",
    options: [
      { id: "a", text: "Conectar el controlador SDN con los switches físicos de la capa de datos" },
      { id: "b", text: "Permitir que las aplicaciones de red (traffic engineering, seguridad, load balancing) interactúen con el controlador para definir políticas de red" },
      { id: "c", text: "Sincronizar el estado entre múltiples controladores SDN distribuidos geográficamente" },
      { id: "d", text: "Traducir los paquetes entre distintas versiones del protocolo OpenFlow" },
    ],
    correctAnswerId: "b",
    explanation:
      "La API northbound es la interfaz entre el controlador SDN y las aplicaciones de red que corren sobre él. Típicamente es una API REST que permite a aplicaciones de traffic engineering, detección de intrusiones, load balancing, o network slicing indicarle al controlador qué políticas implementar. El controlador traduce esas políticas a reglas OpenFlow que instala en los switches vía la API southbound. OpenDaylight y ONOS exponen APIs northbound ricas para este propósito.",
  },
  {
    id: "ch5-q13",
    question: "¿Qué tipo de mensaje ICMP genera traceroute para descubrir los routers en el camino?",
    options: [
      { id: "a", text: "ICMP Tipo 3 (Destination Unreachable) enviado por el host destino al llegar el paquete con TTL=0" },
      { id: "b", text: "ICMP Tipo 8 (Echo Request) que los routers intermedios responden directamente" },
      { id: "c", text: "ICMP Tipo 5 (Redirect) que indica al origen una mejor ruta" },
      { id: "d", text: "ICMP Tipo 0 (Echo Reply) generado por cada router al recibir el paquete" },
    ],
    correctAnswerId: "a",
    explanation:
      "Traceroute envía datagramas UDP (o ICMP Echo en Windows) con TTL incrementalmente: TTL=1, 2, 3, ... Cuando el TTL llega a 0 en un router intermedio, ese router descarta el paquete y envía al origen un mensaje ICMP Tipo 11 (Time Exceeded, Code 0). Traceroute usa la IP de origen de ese mensaje ICMP para identificar el router. Cuando el paquete llega al destino, el puerto UDP cerrado provoca ICMP Tipo 3 (Port Unreachable), señalando el final del recorrido.",
  },
  {
    id: "ch5-q14",
    question: "¿Qué protocolo utiliza SNMP para que un agente notifique proactivamente al manager sobre un evento sin ser consultado?",
    options: [
      { id: "a", text: "SNMP GET — el manager solicita periódicamente el estado de los objetos gestionados" },
      { id: "b", text: "SNMP SET — el manager configura remotamente los parámetros del agente" },
      { id: "c", text: "SNMP GETBULK — recupera múltiples objetos de la MIB en una sola operación" },
      { id: "d", text: "SNMP Trap — el agente envía una notificación no solicitada al manager cuando ocurre un evento significativo (ej. fallo de interfaz, umbral excedido)" },
    ],
    correctAnswerId: "d",
    explanation:
      "Un SNMP Trap es un mensaje asíncrono que el agente (en el dispositivo gestionado) envía al manager sin que este lo haya solicitado. Es clave para la gestión reactiva: en lugar de que el manager haga polling constante, el agente informa inmediatamente sobre eventos como interfaces que caen, errores de autenticación o umbrales de CPU excedidos. En SNMPv2 se introdujo el Inform, que es similar pero requiere confirmación del manager.",
  },
  {
    id: "ch5-q15",
    question: "¿Cuál es la principal ventaja de NETCONF/YANG sobre SNMP para la gestión de redes modernas?",
    options: [
      { id: "a", text: "NETCONF usa UDP para mayor velocidad, mientras que SNMP usa TCP que es más lento" },
      { id: "b", text: "NETCONF soporta transacciones atómicas, configuración estructurada en XML/JSON con YANG, y operaciones de candidato/commit que permiten validar cambios antes de aplicarlos" },
      { id: "c", text: "NETCONF solo gestiona dispositivos Cisco, lo que simplifica la interoperabilidad" },
      { id: "d", text: "SNMP requiere agentes en cada dispositivo; NETCONF funciona sin agentes usando solo SSH" },
    ],
    correctAnswerId: "b",
    explanation:
      "NETCONF (RFC 6241) opera sobre SSH con mensajes XML y soporta un modelo de configuración candidata: los cambios se preparan en una configuración candidata, se validan y luego se confirman (commit) atómicamente. YANG (RFC 6020) es el lenguaje de modelado de datos que define la estructura, tipos y restricciones de los datos de configuración. Juntos permiten cambios complejos y seguros que SNMP no puede hacer (SNMP es principalmente para monitoreo, con SET limitado).",
  },
  {
    id: "ch5-q16",
    question: "¿Qué es la MIB (Management Information Base) en el contexto de SNMP?",
    options: [
      { id: "a", text: "La dirección IP del servidor de gestión centralizado en la red" },
      { id: "b", text: "El protocolo de cifrado que SNMP usa para proteger las credenciales de administración" },
      { id: "c", text: "La lista de comandos disponibles en el agente SNMP para configurar el dispositivo" },
      { id: "d", text: "Una base de datos jerárquica de objetos gestionados del dispositivo (interfaces, CPU, memoria), cada uno identificado por un OID (Object Identifier)" },
    ],
    correctAnswerId: "d",
    explanation:
      "La MIB (Management Information Base) es una base de datos virtual organizada jerárquicamente que define todos los objetos gestionables de un dispositivo. Cada objeto tiene un OID único (ej: 1.3.6.1.2.1.2.2.1.10 = ifInOctets). Hay MIBs estándar (MIB-II para objetos básicos de TCP/IP) y MIBs propietarias de fabricantes. El manager SNMP consulta objetos MIB específicos; el agente responde con los valores actuales.",
  },
  {
    id: "ch5-q17",
    question: "En el modelo de enrutamiento de Internet, ¿por qué BGP aplica 'valley-free routing' en las relaciones ISP?",
    options: [
      { id: "a", text: "Para garantizar que todas las rutas tengan latencia mínima mediante métricas de costo basadas en geografía" },
      { id: "b", text: "Porque los ISPs solo anuncian rutas de clientes hacia arriba (providers) y horizontalmente (peers), nunca de providers o peers a otros providers/peers" },
      { id: "c", text: "Para asegurar que todos los paquetes pasen por puntos de intercambio (IXP) certificados por IANA" },
      { id: "d", text: "Porque valley-free routing es un requisito técnico de BGP4 especificado en el RFC 4271" },
    ],
    correctAnswerId: "d",
    explanation:
      "Valley-free routing es una política comercial, no técnica: un ISP no reenvía tráfico entre dos providers (o dos peers) porque haría tránsito gratuito para ellos. La jerarquía es: Customer → Provider → Customer (cliente paga al provider por tráfico). Un provider anuncia rutas de sus clientes a sus propios providers y peers, pero NO anuncia rutas de un provider/peer a otro provider/peer, evitando 'valles' en el grafo. Esto refleja la economía de Internet.",
  },
  {
    id: "ch5-q18",
    question: "¿Qué mensaje ICMP utiliza el comando ping y cuáles son sus tipos?",
    options: [
      { id: "a", text: "Ping usa ICMP Tipo 11 (Time Exceeded) para medir el tiempo de ida y vuelta a un destino" },
      { id: "b", text: "Ping usa ICMP Tipo 8 (Echo Request) enviado al destino, que responde con ICMP Tipo 0 (Echo Reply); el RTT se calcula con las marcas de tiempo" },
      { id: "c", text: "Ping usa ICMP Tipo 3 (Destination Unreachable) para verificar si un host está activo" },
      { id: "d", text: "Ping usa ICMP Tipo 5 (Redirect) para descubrir el gateway óptimo hacia el destino" },
    ],
    correctAnswerId: "b",
    explanation:
      "Ping envía un ICMP Echo Request (Tipo 8, Código 0) al host destino con un identificador y número de secuencia. Si el host está activo y alcanzable, responde con un ICMP Echo Reply (Tipo 0, Código 0). El programa ping mide el RTT (Round-Trip Time) entre el envío del Request y la recepción del Reply. También reporta el TTL del paquete recibido y detecta pérdida de paquetes si no llega respuesta.",
  },
  {
    id: "ch5-q19",
    question: "¿Cuál es el protocolo de gestión de redes que reemplaza a ARP en redes IPv6?",
    options: [
      { id: "a", text: "DHCPv6 — asigna direcciones IPv6 y también resuelve direcciones MAC" },
      { id: "b", text: "ICMPv6 con el protocolo NDP (Neighbor Discovery Protocol) — incluye Neighbor Solicitation y Neighbor Advertisement" },
      { id: "c", text: "OSPFv3 — además de enrutar, gestiona la resolución de direcciones en IPv6" },
      { id: "d", text: "BGP4+ con extensiones multiprotocolo para resolución de direcciones de capa 2" },
    ],
    correctAnswerId: "b",
    explanation:
      "En IPv6, ARP es reemplazado por el Neighbor Discovery Protocol (NDP), definido como parte de ICMPv6. NDP usa mensajes Neighbor Solicitation (NS, ICMPv6 Tipo 135) y Neighbor Advertisement (NA, ICMPv6 Tipo 136) para resolver direcciones IPv6 a direcciones MAC, equivalente al ARP Request/Reply de IPv4. NDP también hace Router Discovery, Prefix Discovery y detección de direcciones duplicadas (DAD), siendo mucho más completo que ARP.",
  },
  {
    id: "ch5-q20",
    question: "Comparando OSPF y BGP como protocolos de enrutamiento, ¿cuál de las siguientes afirmaciones es correcta?",
    options: [
      { id: "a", text: "OSPF usa path-vector mientras que BGP usa link-state para calcular rutas óptimas" },
      { id: "b", text: "BGP garantiza rutas óptimas en términos de latencia, OSPF optimiza según políticas comerciales" },
      { id: "c", text: "Tanto OSPF como BGP usan el algoritmo de Bellman-Ford; la diferencia es el ámbito de aplicación" },
      { id: "d", text: "OSPF es un protocolo intra-AS basado en link-state y Dijkstra; BGP es un protocolo inter-AS basado en path-vector con criterios de política" },
    ],
    correctAnswerId: "d",
    explanation:
      "OSPF (Open Shortest Path First) es un IGP (Interior Gateway Protocol) intra-AS que usa link-state routing: cada router difunde su estado de enlace, todos construyen el grafo completo y ejecutan Dijkstra localmente. El objetivo es minimizar el costo (típicamente latencia o carga). BGP es un EGP (Exterior Gateway Protocol) inter-AS que usa path-vector: anuncia rutas con el AS_PATH recorrido, y la selección se basa en políticas comerciales y administrativas, no en métricas de costo técnico.",
  },
];

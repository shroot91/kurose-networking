import type { QuizQuestion } from "@/types/quiz";

// Correct answers: c a d b c d a b c d a c b d a c b d c a
export const quizCh4: QuizQuestion[] = [
  {
    id: "ch4-q1",
    question: "¿Cuál es la diferencia fundamental entre forwarding (reenvío) y routing (enrutamiento)?",
    options: [
      { id: "a", text: "Son términos sinónimos en la capa de red" },
      { id: "b", text: "El routing es local y el forwarding es global" },
      { id: "c", text: "El forwarding es una acción local (plano de datos) y el routing es un proceso global (plano de control)" },
      { id: "d", text: "El forwarding opera en la capa de transporte y el routing en la capa de enlace" },
    ],
    correctAnswerId: "c",
    explanation:
      "El forwarding mueve un paquete del enlace de entrada al enlace de salida correcto usando la tabla de reenvío local (plano de datos, nanosegundos). El routing determina la ruta extremo a extremo ejecutando algoritmos globales que construyen esas tablas (plano de control, segundos/minutos).",
  },
  {
    id: "ch4-q2",
    question: "En el datagrama IPv4, ¿en qué campo se decrementa un valor cada vez que el paquete pasa por un router?",
    options: [
      { id: "a", text: "TTL (Time To Live)" },
      { id: "b", text: "Número de identificación" },
      { id: "c", text: "Checksum de cabecera" },
      { id: "d", text: "Longitud total" },
    ],
    correctAnswerId: "a",
    explanation:
      "El campo TTL (Time To Live) se decrementa en 1 por cada router que procesa el datagrama. Cuando llega a 0, el router descarta el paquete y envía un mensaje ICMP 'Time Exceeded' al origen. Esto evita que los paquetes circulen indefinidamente en la red.",
  },
  {
    id: "ch4-q3",
    question: "Usando notación CIDR 192.168.1.0/24, ¿cuántas direcciones de host utilizables hay?",
    options: [
      { id: "a", text: "256" },
      { id: "b", text: "255" },
      { id: "c", text: "253" },
      { id: "d", text: "254" },
    ],
    correctAnswerId: "d",
    explanation:
      "Con prefijo /24, hay 8 bits para hosts → 2⁸ = 256 direcciones totales. Se restan 2: la dirección de red (192.168.1.0) y la de broadcast (192.168.1.255). Quedan 254 direcciones de host utilizables. Esta fórmula es siempre 2^(32-prefijo) - 2.",
  },
  {
    id: "ch4-q4",
    question: "¿Qué función principal realiza NAT (Network Address Translation)?",
    options: [
      { id: "a", text: "Cifra el tráfico de red entre redes privadas y públicas" },
      { id: "b", text: "Traduce direcciones IP privadas a una o pocas direcciones IP públicas, conservando espacio de direccionamiento" },
      { id: "c", text: "Asigna dinámicamente direcciones IP a los hosts de la red" },
      { id: "d", text: "Fragmenta datagramas IPv4 para adaptarlos al MTU del enlace" },
    ],
    correctAnswerId: "b",
    explanation:
      "NAT traduce las direcciones IP privadas (10.x.x.x, 172.16.x.x, 192.168.x.x) de los hosts internos a la dirección IP pública del router NAT cuando salen a Internet. Usa una tabla de traducción que incluye número de puerto para distinguir conexiones de múltiples hosts internos.",
  },
  {
    id: "ch4-q5",
    question: "¿Cuál es el orden correcto de los mensajes en el proceso de arrendamiento DHCP?",
    options: [
      { id: "a", text: "Request → Discover → Offer → ACK" },
      { id: "b", text: "Discover → Request → Offer → ACK" },
      { id: "c", text: "Discover → Offer → Request → ACK" },
      { id: "d", text: "Offer → Discover → ACK → Request" },
    ],
    correctAnswerId: "c",
    explanation:
      "El proceso DHCP sigue cuatro pasos: (1) DHCP Discover: el cliente hace broadcast buscando un servidor DHCP; (2) DHCP Offer: el servidor ofrece una dirección IP; (3) DHCP Request: el cliente solicita formalmente esa dirección; (4) DHCP ACK: el servidor confirma el arrendamiento con la configuración completa.",
  },
  {
    id: "ch4-q6",
    question: "¿Cuál es el tamaño fijo de la cabecera IPv6 comparado con IPv4?",
    options: [
      { id: "a", text: "IPv6 tiene cabecera de 20 bytes, igual que IPv4" },
      { id: "b", text: "IPv6 tiene cabecera de 20 bytes; IPv4 puede tener hasta 60 bytes con opciones" },
      { id: "c", text: "IPv6 tiene cabecera de 60 bytes; IPv4 tiene 20 bytes" },
      { id: "d", text: "IPv6 tiene cabecera fija de 40 bytes; IPv4 tiene mínimo 20 bytes con opciones variables" },
    ],
    correctAnswerId: "d",
    explanation:
      "IPv6 tiene una cabecera fija de 40 bytes (simplificada para procesamiento eficiente en routers). IPv4 tiene una cabecera mínima de 20 bytes pero puede crecer hasta 60 bytes con opciones. IPv6 elimina fragmentación en routers, checksum y opciones de longitud variable para acelerar el procesamiento.",
  },
  {
    id: "ch4-q7",
    question: "¿Cuál es la propiedad clave del algoritmo de Dijkstra para el cálculo de rutas más cortas?",
    options: [
      { id: "a", text: "Calcula la ruta más corta desde un nodo origen a todos los demás nodos con conocimiento global del grafo" },
      { id: "b", text: "Cada router solo necesita conocer sus vecinos directos para converger" },
      { id: "c", text: "Funciona correctamente aunque haya pesos negativos en los enlaces" },
      { id: "d", text: "Intercambia vectores de distancia con todos los routers de Internet" },
    ],
    correctAnswerId: "a",
    explanation:
      "El algoritmo de Dijkstra (link-state) requiere conocimiento completo del grafo de la red. Calcula el árbol de rutas más cortas desde un origen a todos los destinos. Tiene complejidad O(n²) con implementación básica y O(n log n) con heap. Es utilizado por OSPF en redes empresariales.",
  },
  {
    id: "ch4-q8",
    question: "El algoritmo de vector de distancias (Bellman-Ford) puede sufrir del problema 'count-to-infinity'. ¿Qué lo provoca?",
    options: [
      { id: "a", text: "El uso de pesos negativos en los enlaces de la red" },
      { id: "b", text: "Cuando un enlace falla, los routers vecinos se informan mutuamente rutas incorrectas de forma circular, aumentando el costo indefinidamente" },
      { id: "c", text: "El exceso de routers en una misma red autónoma" },
      { id: "d", text: "La falta de sincronización entre los relojes de los routers" },
    ],
    correctAnswerId: "b",
    explanation:
      "Count-to-infinity ocurre cuando un enlace falla. Por ejemplo, si el enlace A-B cae y C pensaba que podía llegar a A vía B, C le dice a B que puede llegar a A en costo 3. B entonces piensa que puede llegar a A vía C en costo 4, y así sucesivamente. Soluciones: split horizon, poison reverse, hold-down timers.",
  },
  {
    id: "ch4-q9",
    question: "¿Para qué se utiliza el protocolo BGP (Border Gateway Protocol)?",
    options: [
      { id: "a", text: "Para enrutar paquetes dentro de una red de área local (LAN)" },
      { id: "b", text: "Para asignar direcciones IP dinámicamente a los hosts" },
      { id: "c", text: "Para intercambiar información de enrutamiento entre Sistemas Autónomos (AS) en Internet" },
      { id: "d", text: "Para detectar errores en datagramas IPv4 mediante checksums" },
    ],
    correctAnswerId: "c",
    explanation:
      "BGP (Border Gateway Protocol) es el protocolo de enrutamiento inter-AS (exterior gateway protocol) de Internet. Conecta los Sistemas Autónomos (ASes) de distintos ISPs y organizaciones. BGP usa path-vector routing y permite políticas de enrutamiento basadas en acuerdos comerciales entre ISPs.",
  },
  {
    id: "ch4-q10",
    question: "¿Qué problema evita el campo TTL en un datagrama IP?",
    options: [
      { id: "a", text: "Evita la fragmentación de datagramas grandes" },
      { id: "b", text: "Evita la congestión en los routers intermedios" },
      { id: "c", text: "Evita la corrupción de datos durante la transmisión" },
      { id: "d", text: "Evita que los paquetes circulen indefinidamente en la red en caso de bucles de enrutamiento" },
    ],
    correctAnswerId: "d",
    explanation:
      "El TTL (Time To Live) actúa como límite de vida del paquete. Si hay un bucle de enrutamiento (routing loop), los paquetes podrían circular para siempre consumiendo recursos. El TTL se decrementa en cada router; cuando llega a 0, el paquete es descartado y se notifica al origen con un mensaje ICMP.",
  },
  {
    id: "ch4-q11",
    question: "Con una máscara de subred /26, ¿cuántos hosts utilizables hay por subred?",
    options: [
      { id: "a", text: "62" },
      { id: "b", text: "64" },
      { id: "c", text: "30" },
      { id: "d", text: "126" },
    ],
    correctAnswerId: "a",
    explanation:
      "Con prefijo /26, se usan 26 bits para red y 6 bits para hosts. 2⁶ = 64 direcciones totales. Restando la dirección de red y la de broadcast: 64 - 2 = 62 hosts utilizables por subred. Con /26 también se crean 4 subredes dentro de un bloque /24.",
  },
  {
    id: "ch4-q12",
    question: "¿Cuántos bits tiene una dirección IPv6?",
    options: [
      { id: "a", text: "32 bits" },
      { id: "b", text: "64 bits" },
      { id: "c", text: "128 bits" },
      { id: "d", text: "256 bits" },
    ],
    correctAnswerId: "c",
    explanation:
      "Las direcciones IPv6 tienen 128 bits, comparado con los 32 bits de IPv4. Esto permite 2¹²⁸ ≈ 3.4 × 10³⁸ direcciones únicas. Se representan en notación hexadecimal separada por dos puntos (8 grupos de 16 bits), por ejemplo: 2001:0db8:85a3:0000:0000:8a2e:0370:7334.",
  },
  {
    id: "ch4-q13",
    question: "¿Qué algoritmo de enrutamiento utiliza OSPF (Open Shortest Path First)?",
    options: [
      { id: "a", text: "Bellman-Ford (vector de distancias)" },
      { id: "b", text: "Dijkstra (estado de enlace)" },
      { id: "c", text: "Path-vector (como BGP)" },
      { id: "d", text: "Floyd-Warshall" },
    ],
    correctAnswerId: "b",
    explanation:
      "OSPF utiliza el algoritmo de Dijkstra (link-state routing). Cada router construye un mapa completo de la topología de la red intercambiando Link State Advertisements (LSAs) con todos los routers del área. Con ese mapa, cada router ejecuta Dijkstra localmente para calcular las rutas más cortas.",
  },
  {
    id: "ch4-q14",
    question: "¿Qué es un gateway por defecto (default gateway)?",
    options: [
      { id: "a", text: "El router con la dirección IP más baja en la red" },
      { id: "b", text: "El servidor DHCP que asigna direcciones IP" },
      { id: "c", text: "El switch central de la red local" },
      { id: "d", text: "El router al que un host envía paquetes destinados a direcciones fuera de su subred local" },
    ],
    correctAnswerId: "d",
    explanation:
      "El default gateway es la dirección IP del router local al que un host envía todos los paquetes cuyo destino no está en su misma subred. El host determina si el destino está en su red local comparando con su máscara; si no está, envía el paquete al gateway por defecto para que lo enrute.",
  },
  {
    id: "ch4-q15",
    question: "¿Cuál es el propósito del protocolo ARP (Address Resolution Protocol)?",
    options: [
      { id: "a", text: "Resolver direcciones IP a direcciones MAC (hardware) en la misma red local" },
      { id: "b", text: "Resolver nombres de dominio a direcciones IP" },
      { id: "c", text: "Asignar direcciones IP dinámicamente a los hosts" },
      { id: "d", text: "Verificar la conectividad entre dos hosts en Internet" },
    ],
    correctAnswerId: "a",
    explanation:
      "ARP resuelve una dirección IP a una dirección MAC dentro de una red local. Cuando un host quiere enviar un paquete a una IP en su misma subred, hace un ARP broadcast ('¿Quién tiene la IP X?'). El host con esa IP responde con su dirección MAC. El resultado se almacena en caché en la tabla ARP.",
  },
  {
    id: "ch4-q16",
    question: "En IPv4, cuando un datagrama se fragmenta porque es más grande que el MTU del enlace, ¿quién realiza el reensamblaje?",
    options: [
      { id: "a", text: "El primer router que detectó la necesidad de fragmentar" },
      { id: "b", text: "El router de borde de la red destino" },
      { id: "c", text: "El host destino final" },
      { id: "d", text: "Cualquier router en el camino que tenga suficiente memoria" },
    ],
    correctAnswerId: "c",
    explanation:
      "En IPv4, el reensamblaje de fragmentos se realiza exclusivamente en el host destino final, no en routers intermedios. Esto simplifica el diseño de los routers. Los fragmentos usan el campo 'Identification' (mismo valor en todos los fragmentos), 'Fragment Offset' y el bit 'More Fragments' para el reensamblaje.",
  },
  {
    id: "ch4-q17",
    question: "¿Qué función cumple el protocolo ICMP (Internet Control Message Protocol)?",
    options: [
      { id: "a", text: "Garantizar la entrega confiable de paquetes IP" },
      { id: "b", text: "Reportar errores y condiciones de diagnóstico entre routers y hosts (ej. destino inalcanzable, tiempo expirado)" },
      { id: "c", text: "Cifrar el contenido de los datagramas IP" },
      { id: "d", text: "Asignar direcciones IP a los interfaces de red" },
    ],
    correctAnswerId: "b",
    explanation:
      "ICMP es usado por routers y hosts para comunicar información de error y diagnóstico sobre el procesamiento de datagramas IP. Ejemplos: 'Destination Unreachable' (destino inalcanzable), 'Time Exceeded' (TTL agotado, usado para traceroute), 'Echo Request/Reply' (usado por ping). Opera sobre IP como si fuera una capa superior.",
  },
  {
    id: "ch4-q18",
    question: "¿Cuál de los siguientes describe correctamente el direccionamiento CIDR (Classless Inter-Domain Routing)?",
    options: [
      { id: "a", text: "Divide el espacio de direcciones en clases fijas A, B y C" },
      { id: "b", text: "Solo permite prefijos de 8, 16 o 24 bits" },
      { id: "c", text: "Requiere que todas las subredes tengan el mismo tamaño" },
      { id: "d", text: "Permite prefijos de longitud arbitraria (a.b.c.d/x), eliminando las clases fijas para usar el espacio de forma eficiente" },
    ],
    correctAnswerId: "d",
    explanation:
      "CIDR reemplazó el direccionamiento clasista que dividía el espacio en clases A (/8), B (/16) y C (/24), lo cual desperdiciaba muchas direcciones. CIDR usa una notación a.b.c.d/x donde x puede ser cualquier valor entre 0 y 32. Esto permite agregación de rutas (route summarization) y asignación más eficiente de bloques de direcciones.",
  },
  {
    id: "ch4-q19",
    question: "En el enrutamiento de estado de enlace (link-state), ¿con quién comparten los routers su información de estado?",
    options: [
      { id: "a", text: "Solo con sus vecinos directos" },
      { id: "b", text: "Solo con el router raíz del árbol de spanning tree" },
      { id: "c", text: "Con todos los routers en la red (inundación o flooding)" },
      { id: "d", text: "Con un servidor de enrutamiento centralizado" },
    ],
    correctAnswerId: "c",
    explanation:
      "En link-state routing, cada router difunde su información de estado de enlace (costo de sus enlaces) a TODOS los routers de la red mediante inundación (flooding). Así, cada router obtiene una vista completa y consistente de toda la topología y puede ejecutar Dijkstra localmente. Esto contrasta con distance-vector donde solo se comparte con vecinos.",
  },
  {
    id: "ch4-q20",
    question: "¿Qué es el longest prefix matching (coincidencia de prefijo más largo)?",
    options: [
      { id: "a", text: "La regla de reenvío que selecciona la entrada de la tabla con el prefijo de red más específico (más largo) que coincida con la dirección destino" },
      { id: "b", text: "El algoritmo que encuentra la ruta con menor número de saltos" },
      { id: "c", text: "La técnica de comprimir múltiples rutas en un solo prefijo" },
      { id: "d", text: "El proceso de asignar la dirección IP más larga disponible a un nuevo host" },
    ],
    correctAnswerId: "a",
    explanation:
      "Longest prefix matching es la regla fundamental de reenvío en routers IP. Cuando una dirección destino coincide con múltiples entradas de la tabla de enrutamiento, se selecciona la que tiene el prefijo más largo (más específico). Por ejemplo, si hay rutas para 192.168.0.0/16 y 192.168.1.0/24, un paquete a 192.168.1.5 usará la ruta /24 por ser más específica.",
  },
];

import type { QuizQuestion } from "@/types/quiz";

// Correct answers: a d b c a d c b a d c b d a c b d a c d
export const quizCh6: QuizQuestion[] = [
  {
    id: "ch6-q1",
    question: "¿Qué unidad de datos transmite la capa de enlace entre nodos adyacentes?",
    options: [
      { id: "a", text: "Trama (frame)" },
      { id: "b", text: "Segmento" },
      { id: "c", text: "Datagrama" },
      { id: "d", text: "Paquete" },
    ],
    correctAnswerId: "a",
    explanation:
      "La capa de enlace encapsula los datagramas de la capa de red en tramas (frames) para su transmisión sobre un enlace específico. Cada trama incluye encabezado con direcciones MAC, los datos y un campo de verificación de errores (CRC). El término 'paquete' o 'datagrama' se usa en la capa de red; en capa de transporte se llama 'segmento'.",
  },
  {
    id: "ch6-q2",
    question: "¿Cuál es la eficiencia máxima teórica del protocolo ALOHA ranurado (Slotted ALOHA) cuando hay muchos nodos transmitiendo?",
    options: [
      { id: "a", text: "100% (ocupa siempre el canal completo)" },
      { id: "b", text: "50% (la mitad de los slots tienen colisiones)" },
      { id: "c", text: "18% (igual que ALOHA puro)" },
      { id: "d", text: "37% (≈ 1/e)" },
    ],
    correctAnswerId: "d",
    explanation:
      "La eficiencia máxima del ALOHA ranurado es 1/e ≈ 0.368 ≈ 37%, alcanzada cuando cada nodo transmite con probabilidad p = 1/N (N nodos). Esto es el doble que el ALOHA puro (18%). Aunque es mejor que ALOHA puro, sigue siendo ineficiente porque las colisiones son frecuentes. Los protocolos CSMA aprovechan mejor el canal al escuchar antes de transmitir.",
  },
  {
    id: "ch6-q3",
    question: "En CSMA/CD (Ethernet), después de detectar una colisión en el k-ésimo intento, ¿de qué rango elige el nodo un tiempo de espera aleatorio?",
    options: [
      { id: "a", text: "Siempre espera exactamente 512 bit-times" },
      { id: "b", text: "Elige aleatoriamente entre {0, 1, 2, ..., 2^k - 1} slots de 512 bit-times" },
      { id: "c", text: "Espera k × 512 bit-times fijo" },
      { id: "d", text: "Elige aleatoriamente entre {0, 1, 2, ..., k} slots" },
    ],
    correctAnswerId: "b",
    explanation:
      "El algoritmo de retroceso exponencial binario (binary exponential backoff) selecciona aleatoriamente un valor del conjunto {0, 1, ..., 2^k - 1} después de la k-ésima colisión, donde cada unidad es un slot de 512 bit-times (51.2 μs en Ethernet 10 Mbps). Así, en la primera colisión (k=1) se elige entre {0,1}; en la segunda entre {0,1,2,3}; en la décima entre 1024 valores posibles. El máximo es k=10.",
  },
  {
    id: "ch6-q4",
    question: "¿Cuál es la principal razón por la que WiFi 802.11 usa CSMA/CA en lugar de CSMA/CD?",
    options: [
      { id: "a", text: "WiFi es más rápido y no necesita detectar colisiones" },
      { id: "b", text: "WiFi usa canales de frecuencia separados para cada nodo" },
      { id: "c", text: "Los adaptadores WiFi son half-duplex y no pueden transmitir y recibir simultáneamente para detectar colisiones, y además existe el problema del terminal oculto" },
      { id: "d", text: "WiFi usa switches que eliminan las colisiones automáticamente" },
    ],
    correctAnswerId: "c",
    explanation:
      "En WiFi, los transceivers son half-duplex: no pueden escuchar el canal mientras transmiten (para detectar colisiones como en CSMA/CD). Además, existe el 'problema del terminal oculto': dos estaciones pueden no escucharse entre sí pero interferir en el AP. Por esto, WiFi usa CSMA/CA: espera DIFS de inactividad, luego aplica un backoff aleatorio antes de transmitir, y requiere ACK por cada trama.",
  },
  {
    id: "ch6-q5",
    question: "¿Cuántos bits tiene una dirección MAC y cuál es la dirección de difusión (broadcast)?",
    options: [
      { id: "a", text: "48 bits; broadcast = FF:FF:FF:FF:FF:FF" },
      { id: "b", text: "32 bits; broadcast = 255.255.255.255" },
      { id: "c", text: "64 bits; broadcast = FF:FF:FF:FF:FF:FF:FF:FF" },
      { id: "d", text: "48 bits; broadcast = 00:00:00:00:00:00" },
    ],
    correctAnswerId: "a",
    explanation:
      "Las direcciones MAC tienen 48 bits (6 bytes), escritas en hexadecimal (ej: A4:C3:F0:23:12:AB). Son 'quemadas' (burned-in) en la NIC por el fabricante — los primeros 24 bits identifican al fabricante (OUI) y los últimos 24 son únicos para cada dispositivo. La dirección de broadcast es FF:FF:FF:FF:FF:FF (todos los bits en 1), recibida por todas las NICs en el mismo segmento de red.",
  },
  {
    id: "ch6-q6",
    question: "¿Qué método de detección de errores es el más potente y se usa en Ethernet, WiFi y almacenamiento en disco?",
    options: [
      { id: "a", text: "Paridad simple de 1 bit" },
      { id: "b", text: "Checksum de complemento a 1 de 16 bits" },
      { id: "c", text: "Paridad 2D (bidimensional)" },
      { id: "d", text: "CRC (Cyclic Redundancy Check)" },
    ],
    correctAnswerId: "d",
    explanation:
      "El CRC (Verificación de Redundancia Cíclica) es el método más poderoso de los estudiados. Trata los bits como coeficientes de un polinomio, divide el mensaje por un polinomio generador G(x) y adjunta el residuo como FCS (Frame Check Sequence). CRC puede detectar todos los errores de 1 bit, todos los errores de 2 bits, cualquier número impar de errores, y ráfagas de error < r bits (siendo r el grado de G). Ethernet usa CRC-32 con un polinomio de 33 bits.",
  },
  {
    id: "ch6-q7",
    question: "Un switch Ethernet recibe una trama desde el host A (MAC: AA:AA:AA:AA:AA:AA) por el puerto 3. El destino es el host B (MAC: BB:BB:BB:BB:BB:BB) que aún no está en la tabla del switch. ¿Qué hace el switch?",
    options: [
      { id: "a", text: "Descarta la trama porque no conoce el destino" },
      { id: "b", text: "La envía al router por defecto" },
      { id: "c", text: "Registra {AA:AA:AA:AA:AA:AA → puerto 3} y difunde (flood) la trama a todos los puertos excepto el 3" },
      { id: "d", text: "Registra {AA:AA:AA:AA:AA:AA → puerto 3} y descarta la trama por seguridad" },
    ],
    correctAnswerId: "c",
    explanation:
      "El switch aplica auto-aprendizaje en dos pasos: (1) Aprende la dirección origen — registra que AA:AA:AA:AA:AA:AA está en el puerto 3 (con TTL ~5 min); (2) Para el destino desconocido, inunda (flood) la trama a todos los demás puertos. Cuando B responda, el switch aprenderá también su MAC y puerto. Este mecanismo plug-and-play no requiere configuración manual.",
  },
  {
    id: "ch6-q8",
    question: "¿Cuál de los siguientes describe correctamente el proceso ARP para resolver una IP dentro de la misma subred?",
    options: [
      { id: "a", text: "El host origen consulta al servidor DNS que responde con la MAC correspondiente" },
      { id: "b", text: "El host origen hace broadcast ARP Request ('¿Quién tiene la IP X?'); el host destino responde con un unicast ARP Reply con su MAC" },
      { id: "c", text: "El switch intercepta el datagrama y completa la dirección MAC automáticamente" },
      { id: "d", text: "El router responde con la MAC del host destino usando su tabla de enrutamiento" },
    ],
    correctAnswerId: "b",
    explanation:
      "ARP (Address Resolution Protocol) funciona en dos pasos: el host A envía un ARP Request en broadcast (dst MAC = FF:FF:FF:FF:FF:FF) con la IP destino buscada. El host B que tiene esa IP responde con un ARP Reply unicast que contiene su dirección MAC. A almacena el par {IP → MAC} en su caché ARP (TTL ~20 min). ARP solo funciona dentro de la misma subred; para comunicación inter-subred se resuelve la MAC del gateway.",
  },
  {
    id: "ch6-q9",
    question: "En el estándar Ethernet 802.3, ¿qué indica el campo 'Type/EtherType' de la trama?",
    options: [
      { id: "a", text: "El protocolo de capa de red encapsulado (ej: 0x0800 = IPv4, 0x0806 = ARP, 0x86DD = IPv6)" },
      { id: "b", text: "El tipo de medio físico (par trenzado, fibra óptica o coaxial)" },
      { id: "c", text: "La velocidad del enlace (10/100/1000 Mbps)" },
      { id: "d", text: "El número de fragmento para el reensamblaje de tramas largas" },
    ],
    correctAnswerId: "a",
    explanation:
      "El campo Type (EtherType) de 2 bytes indica qué protocolo de capa superior está encapsulado en el campo de datos: 0x0800 = IPv4, 0x86DD = IPv6, 0x0806 = ARP, 0x8100 = 802.1Q VLAN tag. El receptor de la trama usa este campo para pasarle el payload al protocolo correcto (demultiplexación). Es análogo al campo 'Protocol' en el datagrama IPv4 o 'Port' en UDP/TCP.",
  },
  {
    id: "ch6-q10",
    question: "¿Cuál es la diferencia fundamental entre un hub y un switch Ethernet?",
    options: [
      { id: "a", text: "Un hub opera en capa 3 (red) y un switch en capa 2 (enlace)" },
      { id: "b", text: "Un hub es más seguro porque filtra el tráfico por MAC" },
      { id: "c", text: "Un switch puede operar a velocidades más altas que un hub" },
      { id: "d", text: "Un hub repite tramas a todos los puertos (capa 1, un dominio de colisión); un switch reenvía selectivamente por MAC (capa 2, cada puerto es su propio dominio de colisión)" },
    ],
    correctAnswerId: "d",
    explanation:
      "Un hub es un repetidor de capa 1: amplifica y retransmite la señal a todos los puertos — todos los dispositivos comparten el mismo dominio de colisión y el mismo dominio de broadcast. Un switch opera en capa 2: examina la dirección MAC destino y reenvía la trama solo al puerto correcto. Cada puerto del switch es un dominio de colisión independiente, lo que elimina las colisiones entre hosts en diferentes puertos y aumenta drásticamente el rendimiento.",
  },
  {
    id: "ch6-q11",
    question: "¿Qué es una VLAN y qué problema resuelve?",
    options: [
      { id: "a", text: "Una red inalámbrica virtual que extiende el alcance del WiFi entre edificios" },
      { id: "b", text: "Un protocolo para encriptar el tráfico entre switches" },
      { id: "c", text: "Una agrupación lógica de puertos de switch en dominios de broadcast separados, independientemente de la ubicación física, para aislamiento y seguridad" },
      { id: "d", text: "Un mecanismo para aumentar la velocidad del enlace troncal entre switches" },
    ],
    correctAnswerId: "c",
    explanation:
      "Una VLAN (Virtual LAN) permite dividir un switch físico en múltiples dominios de broadcast lógicos. Por ejemplo, los puertos 1-8 pueden ser VLAN 10 (HR) y los puertos 9-16 pueden ser VLAN 20 (Engineering). Los dispositivos de VLANs distintas no se ven entre sí aunque estén en el mismo switch físico. Esto mejora la seguridad (aislamiento), reduce el tráfico broadcast y permite mover usuarios entre grupos lógicos sin cambiar el cableado.",
  },
  {
    id: "ch6-q12",
    question: "¿Qué agrega el estándar 802.1Q a una trama Ethernet para soportar VLANs en un enlace troncal (trunk)?",
    options: [
      { id: "a", text: "Un nuevo campo de 8 bytes con la dirección MAC del switch origen" },
      { id: "b", text: "Una etiqueta (tag) de 4 bytes insertada en la trama, con un campo de 12 bits que identifica la VLAN (hasta 4096 VLANs)" },
      { id: "c", text: "Un encabezado IP adicional con la dirección de la VLAN" },
      { id: "d", text: "Un campo de prioridad de 16 bits para QoS" },
    ],
    correctAnswerId: "b",
    explanation:
      "El estándar 802.1Q inserta una etiqueta de 4 bytes en la trama Ethernet entre el campo Source MAC y el campo Type. Esta etiqueta contiene: Tag Protocol Identifier (TPID = 0x8100, 2 bytes), Priority (3 bits para QoS 802.1p), CFI/DEI (1 bit), y VLAN ID (12 bits, que permite hasta 4096 VLANs: 0 y 4095 reservados, por lo que en práctica 4094 VLANs). Los puertos trunk entre switches transportan tramas etiquetadas para múltiples VLANs.",
  },
  {
    id: "ch6-q13",
    question: "En la técnica TDMA (Time Division Multiple Access), ¿cuál es la principal desventaja?",
    options: [
      { id: "a", text: "Produce muchas colisiones en períodos de tráfico alto" },
      { id: "b", text: "No permite que múltiples nodos compartan el mismo canal" },
      { id: "c", text: "Requiere hardware muy costoso para implementarse" },
      { id: "d", text: "Si un nodo no tiene datos para enviar en su slot, ese tiempo de canal se desperdicia (slots vacíos)" },
    ],
    correctAnswerId: "d",
    explanation:
      "TDMA divide el tiempo en slots fijos, asignando un slot a cada nodo. Si un nodo no tiene datos que enviar, su slot permanece vacío — el canal no se aprovecha. Por ejemplo, con 10 nodos y solo 1 transmitiendo activamente, el 90% del canal se desperdicia. Esta ineficiencia bajo carga asimétrica es la razón por la que los protocolos de acceso aleatorio (como CSMA) son preferidos en redes de área local donde el tráfico es irregular.",
  },
  {
    id: "ch6-q14",
    question: "¿Cuál es la estructura correcta de una trama Ethernet 802.3 de izquierda a derecha?",
    options: [
      { id: "a", text: "Preámbulo | SFD | MAC destino | MAC origen | Tipo | Datos | CRC" },
      { id: "b", text: "MAC destino | MAC origen | Preámbulo | Tipo | Datos | CRC" },
      { id: "c", text: "Preámbulo | MAC origen | MAC destino | Tipo | Datos | CRC" },
      { id: "d", text: "SFD | Preámbulo | MAC destino | MAC origen | Datos | Tipo | CRC" },
    ],
    correctAnswerId: "a",
    explanation:
      "La trama Ethernet 802.3 tiene este orden: Preámbulo (7 bytes: 10101010... para sincronización de reloj) → SFD Start Frame Delimiter (1 byte: 10101011 indica inicio real) → Dirección MAC destino (6 bytes) → Dirección MAC origen (6 bytes) → Type/EtherType (2 bytes: indica protocolo encapsulado) → Datos (46-1500 bytes; mínimo 46 para garantizar CSMA/CD) → CRC-32 FCS (4 bytes). La trama mínima es 64 bytes y la máxima 1518 bytes (sin etiqueta VLAN).",
  },
  {
    id: "ch6-q15",
    question: "En el proceso de asociación WiFi 802.11, ¿cómo descubre una estación los puntos de acceso disponibles?",
    options: [
      { id: "a", text: "Enviando un ARP broadcast a 255.255.255.255 preguntando por APs disponibles" },
      { id: "b", text: "Consultando un servidor DNS especial que lista los APs de la red" },
      { id: "c", text: "Recibiendo tramas Beacon que los APs difunden periódicamente (~cada 100 ms) con SSID y BSSID, o enviando Probe Requests activos" },
      { id: "d", text: "El router DHCP informa a la estación qué APs están disponibles durante la asignación de IP" },
    ],
    correctAnswerId: "c",
    explanation:
      "Los APs (puntos de acceso) transmiten periódicamente tramas Beacon (~cada 100 ms) en modo broadcast, anunciando su SSID (nombre de red) y BSSID (MAC del AP). Una estación WiFi puede escanear pasivamente (esperar Beacons en cada canal) o activamente (enviar Probe Requests y esperar Probe Responses). Tras seleccionar un AP, la estación envía un Association Request; el AP responde con Association Response. Luego DHCP asigna la IP.",
  },
  {
    id: "ch6-q16",
    question: "La paridad 2D (bidimensional) organiza los bits en una matriz d×w con bits de paridad por fila y columna. ¿Qué ventaja tiene sobre la paridad simple?",
    options: [
      { id: "a", text: "Es más rápida de calcular porque solo verifica filas" },
      { id: "b", text: "No requiere bits adicionales de overhead" },
      { id: "c", text: "Solo detecta errores en la primera fila de la matriz" },
      { id: "d", text: "Puede detectar Y corregir errores de 1 bit (la fila y columna erróneas identifican la posición exacta), y detectar (no corregir) errores de 2 bits" },
    ],
    correctAnswerId: "d",
    explanation:
      "La paridad 2D añade un bit de paridad por cada fila y cada columna. Si un bit cambia, fallará la paridad de su fila Y de su columna — la intersección identifica exactamente el bit erróneo, permitiendo corregirlo. Con errores de 2 bits en la misma fila o columna, la paridad puede no detectarlos. La paridad simple solo puede detectar (nunca corregir) un error de 1 bit, y falla completamente con errores de 2 bits que se anulan. El overhead de paridad 2D es O(d+w) bits vs 1 bit de paridad simple.",
  },
  {
    id: "ch6-q17",
    question: "¿Cómo funciona el protocolo de 'token passing' (paso de testigo) en una red en anillo?",
    options: [
      { id: "a", text: "El nodo con mayor prioridad siempre retiene el token indefinidamente" },
      { id: "b", text: "Un nodo maestro envía una copia de datos a todos los nodos simultáneamente" },
      { id: "c", text: "Todos los nodos transmiten al mismo tiempo en diferentes frecuencias" },
      { id: "d", text: "Un token especial circula por el anillo; solo el nodo que posee el token puede transmitir. Al terminar, libera el token al siguiente nodo" },
    ],
    correctAnswerId: "d",
    explanation:
      "En el paso de testigo (token passing), un pequeño frame especial llamado 'token' circula continuamente por el anillo en orden fijo. Un nodo que quiere transmitir espera hasta recibir el token libre, lo captura, transmite sus datos, y luego libera el token (o lo pasa al siguiente nodo). Garantiza que no haya colisiones y que todos los nodos reciban acceso justo. Se usa en Token Ring (IEEE 802.5) y FDDI. Desventaja: si el nodo que tiene el token falla, el anillo se interrumpe.",
  },
  {
    id: "ch6-q18",
    question: "¿Por qué las direcciones MAC se llaman 'planas' (flat) en contraste con las direcciones IP que son 'jerárquicas'?",
    options: [
      { id: "a", text: "Las MAC son más cortas que las IP, por eso son 'planas'" },
      { id: "b", text: "Las MAC no tienen bits de paridad; las IP sí tienen checksum" },
      { id: "c", text: "Las MAC están organizadas en grupos que reflejan la topología de red, igual que las IP" },
      { id: "d", text: "Las MAC no codifican ninguna información de ubicación — un NIC tiene la misma MAC en cualquier red; las IP incluyen información de subred/prefijo que cambia según la red a la que está conectado el host" },
    ],
    correctAnswerId: "a",
    explanation:
      "Las direcciones MAC son 'planas' (flat) porque no tienen estructura jerárquica que refleje la topología: la MAC de un adaptador es la misma esté en Buenos Aires o en Tokio. Las direcciones IP son 'jerárquicas': contienen prefijo de red + host, de forma que la parte de red cambia cuando el host se mueve a otra subred. Esta jerarquía es lo que permite el enrutamiento escalable en Internet. Las MACs se usan solo para comunicación dentro de un enlace local; las IPs para enrutamiento global.",
  },
  {
    id: "ch6-q19",
    question: "En el protocolo CSMA, ¿por qué pueden seguir ocurriendo colisiones aunque los nodos escuchen el canal antes de transmitir?",
    options: [
      { id: "a", text: "Porque los nodos no tienen suficiente memoria para guardar las tramas en cola" },
      { id: "b", text: "Porque el protocolo solo funciona con topología en estrella, no en bus" },
      { id: "c", text: "Debido al retardo de propagación: dos nodos pueden encontrar el canal libre casi simultáneamente y comenzar a transmitir antes de que la señal del otro haya llegado" },
      { id: "d", text: "Porque CSMA solo escucha durante 1 microsegundo, que es insuficiente" },
    ],
    correctAnswerId: "c",
    explanation:
      "CSMA (Carrier Sense Multiple Access) reduce las colisiones pero no las elimina. Si el nodo A empieza a transmitir en el instante t, su señal tarda un tiempo de propagación τ en llegar al nodo B. Si B escucha el canal en el instante t+ε (ε < τ), el canal le parece libre y también comienza a transmitir — colisión. Cuanto mayor es la distancia entre nodos y menor es la velocidad de transmisión, mayor es la probabilidad de colisión. CSMA/CD agrega detección de colisión para abortar rápido.",
  },
  {
    id: "ch6-q20",
    question: "¿Cuál de los siguientes es el propósito del campo RTS/CTS en WiFi 802.11?",
    options: [
      { id: "a", text: "Negociar la velocidad de transmisión entre el AP y la estación" },
      { id: "b", text: "Autenticar al usuario antes de permitir la transmisión de datos" },
      { id: "c", text: "Comprimir los datos antes de transmitirlos para mayor eficiencia" },
      { id: "d", text: "Resolver el problema del terminal oculto: el RTS reserva el canal y el CTS (difundido por el AP) avisa a todos los nodos cercanos que deben esperar" },
    ],
    correctAnswerId: "d",
    explanation:
      "RTS/CTS (Request To Send / Clear To Send) es un mecanismo opcional en 802.11 para mitigar el problema del terminal oculto. El nodo A envía un RTS corto al AP solicitando el canal. El AP responde con un CTS (difundido a todos en su alcance), que incluye la duración de la transmisión. Los nodos B y C que no escucharon el RTS sí escuchan el CTS y saben que deben esperar. El overhead de RTS/CTS solo se justifica para tramas grandes; para tramas pequeñas no se usa porque el overhead es mayor que el beneficio.",
  },
];

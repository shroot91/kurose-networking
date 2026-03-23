import type { QuizQuestion } from "@/types/quiz";

// Correct answers: b b b b c b c a b b d a c d a b d c a d
export const quizCh3: QuizQuestion[] = [
  {
    id: "ch3-q1",
    question: "¿Cuál es el propósito del número de secuencia en TCP?",
    options: [
      { id: "a", text: "Identificar el puerto destino" },
      { id: "b", text: "Detectar segmentos duplicados y ordenar datos correctamente" },
      { id: "c", text: "Calcular el checksum" },
      { id: "d", text: "Controlar la congestión de la red" },
    ],
    correctAnswerId: "b",
    explanation:
      "Los números de secuencia en TCP identifican cada byte en el flujo de datos. Permiten al receptor reordenar segmentos que llegan fuera de orden y detectar duplicados. El número de secuencia indica el número del primer byte de datos en ese segmento.",
  },
  {
    id: "ch3-q2",
    question: "En el arranque lento de TCP (slow start), el tamaño de la ventana de congestión (cwnd)...",
    options: [
      { id: "a", text: "Aumenta linealmente (suma 1 MSS por RTT)" },
      { id: "b", text: "Se duplica cada RTT (crecimiento exponencial)" },
      { id: "c", text: "Permanece constante hasta que hay pérdida" },
      { id: "d", text: "Disminuye exponencialmente" },
    ],
    correctAnswerId: "b",
    explanation:
      "En slow start, cwnd se duplica cada RTT (crece exponencialmente). Por cada ACK recibido, cwnd aumenta en 1 MSS, lo que efectivamente duplica cwnd cada RTT. Este crecimiento continúa hasta alcanzar ssthresh o detectar pérdida. A pesar del nombre 'lento', el crecimiento es exponencial.",
  },
  {
    id: "ch3-q3",
    question: "¿Qué protocolo de transporte usarías para una aplicación de videoconferencia en tiempo real?",
    options: [
      { id: "a", text: "TCP, porque necesita entrega confiable" },
      { id: "b", text: "UDP, porque la baja latencia es más importante que la confiabilidad perfecta" },
      { id: "c", text: "HTTP, porque es el protocolo más compatible" },
      { id: "d", text: "DNS, porque resuelve direcciones rápidamente" },
    ],
    correctAnswerId: "b",
    explanation:
      "Las aplicaciones de tiempo real como videoconferencia prefieren UDP porque: (1) toleran algo de pérdida (un frame perdido es mejor que un frame retardado), (2) no necesitan el overhead del control de congestión de TCP, (3) la retransmisión de TCP llegaría demasiado tarde para ser útil.",
  },
  {
    id: "ch3-q4",
    question: "¿Cuál de las siguientes afirmaciones sobre UDP es CORRECTA?",
    options: [
      { id: "a", text: "UDP garantiza la entrega ordenada de los datos" },
      { id: "b", text: "UDP proporciona multiplexación/demultiplexación y verificación de errores" },
      { id: "c", text: "UDP establece una conexión antes de enviar datos" },
      { id: "d", text: "UDP tiene control de congestión integrado" },
    ],
    correctAnswerId: "b",
    explanation:
      "UDP proporciona dos servicios mínimos: (1) multiplexación/demultiplexación mediante puertos, y (2) verificación de errores mediante checksum (opcional en IPv4, obligatorio en IPv6). NO garantiza entrega, orden, ni tiene control de congestión ni conexión previa.",
  },
  {
    id: "ch3-q5",
    question: "En TCP, ¿qué sucede cuando el emisor detecta 3 ACKs duplicados?",
    options: [
      { id: "a", text: "Cierra la conexión inmediatamente" },
      { id: "b", text: "cwnd se reduce a 1 MSS y entra en slow start" },
      { id: "c", text: "cwnd se reduce a la mitad y entra en congestion avoidance (fast recovery)" },
      { id: "d", text: "Espera un timeout antes de actuar" },
    ],
    correctAnswerId: "c",
    explanation:
      "3 ACKs duplicados indican que probablemente se perdió un segmento específico pero los posteriores sí llegaron. TCP realiza 'fast retransmit' del segmento perdido y entra en 'fast recovery': ssthresh = cwnd/2, cwnd = ssthresh. Esto es menos drástico que un timeout porque la red aún está entregando paquetes.",
  },
  {
    id: "ch3-q6",
    question: "¿Cuál es la diferencia fundamental entre la multiplexación y la demultiplexación en la capa de transporte?",
    options: [
      { id: "a", text: "Multiplexación comprime datos; demultiplexación los descomprime" },
      { id: "b", text: "Multiplexación combina datos de múltiples sockets en segmentos; demultiplexación entrega segmentos al socket correcto" },
      { id: "c", text: "Son dos nombres para el mismo proceso" },
      { id: "d", text: "Multiplexación es de TCP y demultiplexación es de UDP" },
    ],
    correctAnswerId: "b",
    explanation:
      "Multiplexación (en el emisor): recolecta datos de diferentes sockets, los encapsula con cabecera de transporte y los pasa a la capa de red. Demultiplexación (en el receptor): examina los puertos en la cabecera del segmento y entrega los datos al socket correcto. Ambos protocolos (TCP y UDP) realizan ambas funciones.",
  },
  {
    id: "ch3-q7",
    question: "En el protocolo rdt3.0, ¿qué mecanismo se añade respecto a rdt2.2?",
    options: [
      { id: "a", text: "Checksums para detectar errores" },
      { id: "b", text: "Números de secuencia para detectar duplicados" },
      { id: "c", text: "Temporizador (timer) para detectar pérdida de paquetes" },
      { id: "d", text: "NAKs (acknowledgements negativos)" },
    ],
    correctAnswerId: "c",
    explanation:
      "rdt3.0 añade un temporizador. Si el emisor no recibe ACK antes de que expire el timer, asume que el paquete (o su ACK) se perdió y retransmite. rdt2.0 añadió ACK/NAK, rdt2.1 añadió números de secuencia, rdt2.2 eliminó NAKs. rdt3.0 es el primer protocolo que maneja pérdida de paquetes.",
  },
  {
    id: "ch3-q8",
    question: "Si un archivo de 500,000 bytes se transmite usando TCP con MSS = 1,000 bytes, ¿cuántos segmentos se necesitan?",
    options: [
      { id: "a", text: "500 segmentos" },
      { id: "b", text: "499 segmentos" },
      { id: "c", text: "501 segmentos" },
      { id: "d", text: "1,000 segmentos" },
    ],
    correctAnswerId: "a",
    explanation:
      "Número de segmentos = tamaño del archivo / MSS = 500,000 / 1,000 = 500 segmentos. Cada segmento lleva hasta MSS bytes de datos. El número de secuencia del primer segmento sería el ISN, y cada segmento subsiguiente incrementa el seq en MSS (1,000).",
  },
  {
    id: "ch3-q9",
    question: "El campo 'ventana de recepción' (rwnd) en la cabecera TCP se usa para:",
    options: [
      { id: "a", text: "Control de congestión de la red" },
      { id: "b", text: "Control de flujo: indica cuánto espacio libre tiene el buffer del receptor" },
      { id: "c", text: "Indicar el tamaño máximo de segmento (MSS)" },
      { id: "d", text: "Identificar el número de secuencia esperado" },
    ],
    correctAnswerId: "b",
    explanation:
      "El campo rwnd (receive window) permite control de flujo. El receptor informa al emisor cuánto espacio libre tiene en su buffer. El emisor se asegura de no enviar más datos de los que el receptor puede almacenar: datos no confirmados ≤ min(cwnd, rwnd). Esto evita desbordar el buffer del receptor.",
  },
  {
    id: "ch3-q10",
    question: "¿Por qué TCP necesita un three-way handshake en vez de un two-way handshake?",
    options: [
      { id: "a", text: "Para negociar el algoritmo de encriptación" },
      { id: "b", text: "Para que AMBOS lados confirmen sus números de secuencia iniciales y la capacidad de comunicación bidireccional" },
      { id: "c", text: "Para verificar que la red no tiene congestión" },
      { id: "d", text: "Porque UDP usa un two-way handshake" },
    ],
    correctAnswerId: "b",
    explanation:
      "El three-way handshake es necesario porque: (1) SYN: el cliente envía su ISN, (2) SYN-ACK: el servidor confirma el ISN del cliente y envía su propio ISN, (3) ACK: el cliente confirma el ISN del servidor. Sin el tercer paso, el servidor no sabría si el cliente recibió su ISN.",
  },
  {
    id: "ch3-q11",
    question: "¿Cuál es la diferencia entre Go-Back-N (GBN) y Selective Repeat (SR) en protocolos de ventana deslizante?",
    options: [
      { id: "a", text: "GBN permite ventanas más grandes que SR" },
      { id: "b", text: "SR usa UDP; GBN usa TCP" },
      { id: "c", text: "GBN no necesita buffer en el receptor" },
      { id: "d", text: "En GBN el receptor descarta paquetes fuera de orden; en SR los almacena en buffer para retransmitir solo el perdido" },
    ],
    correctAnswerId: "d",
    explanation:
      "En GBN, ante una pérdida, el emisor retransmite el paquete perdido Y todos los posteriores (incluso los que llegaron bien). El receptor descarta todo lo fuera de orden. En SR, el receptor almacena paquetes fuera de orden; solo se retransmite el paquete perdido. SR es más eficiente pero requiere más buffer.",
  },
  {
    id: "ch3-q12",
    question: "¿Qué ocurre con cwnd en TCP cuando expira el temporizador de retransmisión (timeout)?",
    options: [
      { id: "a", text: "cwnd = 1 MSS, ssthresh = cwnd/2 anterior, y entra en slow start desde 1" },
      { id: "b", text: "La conexión se cierra y debe reiniciarse" },
      { id: "c", text: "cwnd se mantiene igual pero ssthresh se actualiza" },
      { id: "d", text: "cwnd se reduce a la mitad y entra en congestion avoidance" },
    ],
    correctAnswerId: "a",
    explanation:
      "Ante timeout (pérdida severa), TCP Tahoe y Reno reaccionan igual: ssthresh = cwnd/2, cwnd = 1 MSS, y entran en slow start desde 1. Esta reacción es más drástica que ante 3 ACKs duplicados (que en TCP Reno solo baja cwnd a ssthresh). Un timeout sugiere congestión severa o enlace caído.",
  },
  {
    id: "ch3-q13",
    question: "¿Cuántos bytes del header TCP son obligatorios (sin opciones)?",
    options: [
      { id: "a", text: "8 bytes (igual que UDP)" },
      { id: "b", text: "16 bytes" },
      { id: "c", text: "20 bytes" },
      { id: "d", text: "40 bytes" },
    ],
    correctAnswerId: "c",
    explanation:
      "El header TCP mínimo (sin opciones) es de 20 bytes: puerto origen (2B), puerto destino (2B), número de secuencia (4B), número de ACK (4B), offset de datos/flags (2B), ventana (2B), checksum (2B), puntero urgente (2B) = 20 bytes. UDP solo tiene 8 bytes de header.",
  },
  {
    id: "ch3-q14",
    question: "En TCP, ¿cómo se cierra una conexión de forma ordenada?",
    options: [
      { id: "a", text: "El servidor envía un RST para terminar abruptamente" },
      { id: "b", text: "Basta con que un lado envíe FIN para cerrar la conexión" },
      { id: "c", text: "La conexión se cierra sola tras un periodo de inactividad" },
      { id: "d", text: "Four-way handshake: FIN→ACK (semicierre), luego FIN→ACK del otro lado" },
    ],
    correctAnswerId: "d",
    explanation:
      "El cierre TCP usa 4 mensajes: (1) FIN del cliente, (2) ACK del servidor, (3) FIN del servidor cuando termina de enviar, (4) ACK del cliente. Entre el paso 2 y 3 el servidor puede seguir enviando datos (semicierre). Tras el FIN del servidor, el cliente espera 2×MSL (TIME_WAIT) antes de cerrar definitivamente.",
  },
  {
    id: "ch3-q15",
    question: "¿Cuál es la diferencia entre control de flujo y control de congestión en TCP?",
    options: [
      { id: "a", text: "Control de flujo evita sobrecargar al receptor; control de congestión evita sobrecargar la red" },
      { id: "b", text: "Son el mismo mecanismo implementado con rwnd" },
      { id: "c", text: "Control de flujo es para UDP; control de congestión para TCP" },
      { id: "d", text: "Control de congestión evita sobrecargar al receptor; control de flujo evita sobrecargar la red" },
    ],
    correctAnswerId: "a",
    explanation:
      "Control de flujo (flow control): evita que el emisor sature el buffer del RECEPTOR. Mecanismo: rwnd en la cabecera TCP. Control de congestión: evita que el emisor sature los routers de la RED. Mecanismo: cwnd calculado por el emisor. La tasa de envío = min(rwnd, cwnd) / RTT.",
  },
  {
    id: "ch3-q16",
    question: "¿Qué es el ISN (Initial Sequence Number) en TCP y por qué es aleatorio?",
    options: [
      { id: "a", text: "El número máximo de bytes que puede enviar el emisor; es fijo para ser predecible" },
      { id: "b", text: "El número de secuencia inicial de la conexión; es aleatorio para prevenir ataques de predicción de secuencia" },
      { id: "c", text: "El identificador de la conexión TCP; es único por conexión pero predecible" },
      { id: "d", text: "El número de ACK inicial; siempre empieza en 0" },
    ],
    correctAnswerId: "b",
    explanation:
      "El ISN es el número de secuencia del primer byte en la conexión TCP, enviado en el SYN. Se genera aleatoriamente para prevenir ataques donde un atacante adivina los números de secuencia e inyecta segmentos maliciosos en la conexión (TCP session hijacking). Además evita confusión con conexiones anteriores en el mismo puerto.",
  },
  {
    id: "ch3-q17",
    question: "En la fase de 'congestion avoidance' de TCP, ¿cómo crece cwnd?",
    options: [
      { id: "a", text: "Se duplica cada RTT (exponencial)" },
      { id: "b", text: "Permanece constante hasta detectar pérdida" },
      { id: "c", text: "Disminuye gradualmente para liberar ancho de banda" },
      { id: "d", text: "Crece en 1 MSS por RTT (lineal/aditivo)" },
    ],
    correctAnswerId: "d",
    explanation:
      "En congestion avoidance (cuando cwnd ≥ ssthresh), TCP aumenta cwnd en 1 MSS por RTT (incremento aditivo). Esto produce crecimiento lineal, mucho más conservador que slow start. Junto con la reducción multiplicativa ante pérdida, forma el algoritmo AIMD (Additive Increase Multiplicative Decrease).",
  },
  {
    id: "ch3-q18",
    question: "¿Qué información contiene la cabecera UDP a diferencia de TCP?",
    options: [
      { id: "a", text: "Solo los puertos origen y destino — UDP no tiene checksum" },
      { id: "b", text: "Puertos, número de secuencia y control de flujo" },
      { id: "c", text: "Puerto origen, puerto destino, longitud y checksum (8 bytes total)" },
      { id: "d", text: "Solo puerto destino y checksum — el puerto origen es opcional" },
    ],
    correctAnswerId: "c",
    explanation:
      "La cabecera UDP tiene exactamente 4 campos de 2 bytes cada uno = 8 bytes: (1) puerto origen, (2) puerto destino, (3) longitud (del segmento UDP completo), (4) checksum. La simplicidad de UDP hace que su overhead sea mínimo comparado con los 20+ bytes de TCP.",
  },
  {
    id: "ch3-q19",
    question: "¿Qué es el 'SYN flood attack' y qué lo hace posible?",
    options: [
      { id: "a", text: "Un ataque que explota la fase de congestion avoidance para maximizar el ancho de banda" },
      { id: "b", text: "El atacante envía SYN masivos sin completar el handshake, agotando los recursos del servidor con conexiones semi-abiertas" },
      { id: "c", text: "Un ataque que intercepta el ACK final del three-way handshake" },
      { id: "d", text: "El atacante corrompe los números de secuencia para desincronizar la conexión" },
    ],
    correctAnswerId: "b",
    explanation:
      "En SYN flood, el atacante envía miles de SYN con IPs falsificadas. El servidor reserva recursos (buffers, estado) para cada conexión semi-abierta esperando el ACK final que nunca llega. Al agotarse los recursos, el servidor no puede aceptar conexiones legítimas (DoS). La solución moderna son los SYN cookies.",
  },
  {
    id: "ch3-q20",
    question: "Si TCP tiene cwnd = 8 MSS y ssthresh = 4 MSS y detecta 3 ACKs duplicados (TCP Reno), ¿cuál será el nuevo cwnd?",
    options: [
      { id: "a", text: "cwnd = 1 MSS, ssthresh = 4 MSS" },
      { id: "b", text: "cwnd = 8 MSS (sin cambio, solo retransmite)" },
      { id: "c", text: "cwnd = 2 MSS, ssthresh = 4 MSS" },
      { id: "d", text: "cwnd = 4 MSS, ssthresh = 4 MSS (fast recovery)" },
    ],
    correctAnswerId: "d",
    explanation:
      "Con TCP Reno ante 3 ACKs duplicados: ssthresh = cwnd/2 = 8/2 = 4 MSS, cwnd = ssthresh = 4 MSS, entra en congestion avoidance. El ssthresh ya era 4, así que no cambia. TCP Tahoe ante el mismo evento bajaría cwnd a 1 MSS y entraría en slow start. Reno es más eficiente al no bajar tanto.",
  },
];

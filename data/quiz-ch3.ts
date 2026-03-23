import type { QuizQuestion } from "@/types/quiz";

export const quizCh3: QuizQuestion[] = [
  {
    id: "ch3-q1",
    question:
      "¿Cuál es el propósito del número de secuencia en TCP?",
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
    question:
      "En el arranque lento de TCP (slow start), el tamaño de la ventana de congestión (cwnd)...",
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
    question:
      "¿Qué protocolo de transporte usarías para una aplicación de videoconferencia en tiempo real?",
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
    question:
      "¿Cuál de las siguientes afirmaciones sobre UDP es CORRECTA?",
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
    question:
      "En TCP, ¿qué sucede cuando el emisor detecta 3 ACKs duplicados?",
    options: [
      { id: "a", text: "Cierra la conexión inmediatamente" },
      { id: "b", text: "cwnd se reduce a 1 MSS y entra en slow start" },
      { id: "c", text: "cwnd se reduce a la mitad y entra en congestion avoidance (fast recovery)" },
      { id: "d", text: "Espera un timeout antes de actuar" },
    ],
    correctAnswerId: "c",
    explanation:
      "3 ACKs duplicados indican que probablemente se perdió un segmento específico pero los posteriores sí llegaron. TCP realiza 'fast retransmit' del segmento perdido y entra en 'fast recovery': ssthresh = cwnd/2, cwnd = ssthresh (no baja a 1). Esto es menos drástico que un timeout porque la red aún está entregando paquetes.",
  },
  {
    id: "ch3-q6",
    question:
      "¿Cuál es la diferencia fundamental entre la multiplexación y la demultiplexación en la capa de transporte?",
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
    question:
      "En el protocolo rdt3.0 (transferencia confiable sobre canal con errores y pérdida), ¿qué mecanismo se añade respecto a rdt2.2?",
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
    question:
      "Si un archivo de 500,000 bytes se transmite usando TCP con MSS = 1,000 bytes, ¿cuántos segmentos se necesitan?",
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
    question:
      "El campo 'ventana de recepción' (rwnd) en la cabecera TCP se usa para:",
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
    question:
      "¿Por qué TCP necesita un three-way handshake en vez de un two-way handshake?",
    options: [
      { id: "a", text: "Para negociar el algoritmo de encriptación" },
      { id: "b", text: "Para que AMBOS lados confirmen sus números de secuencia iniciales y la capacidad de comunicación bidireccional" },
      { id: "c", text: "Para verificar que la red no tiene congestión" },
      { id: "d", text: "Porque UDP usa un two-way handshake" },
    ],
    correctAnswerId: "b",
    explanation:
      "El three-way handshake es necesario porque: (1) SYN: el cliente envía su ISN, (2) SYN-ACK: el servidor confirma el ISN del cliente y envía su propio ISN, (3) ACK: el cliente confirma el ISN del servidor. Sin el tercer paso, el servidor no sabría si el cliente recibió su ISN. Además, evita el problema de conexiones duplicadas por segmentos SYN retrasados.",
  },
];

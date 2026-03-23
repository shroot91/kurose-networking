import type { QuizQuestion } from "@/types/quiz";

export const quizCh1: QuizQuestion[] = [
  {
    id: "ch1-q1",
    question:
      "En la conmutación de paquetes, cuando un paquete llega a un router y el enlace de salida está ocupado, ¿qué sucede?",
    options: [
      { id: "a", text: "Es descartado inmediatamente" },
      { id: "b", text: "Espera en un buffer de salida (cola)" },
      { id: "c", text: "Se envía automáticamente por un enlace alternativo" },
      { id: "d", text: "Se divide en paquetes más pequeños" },
    ],
    correctAnswerId: "b",
    explanation:
      "En la conmutación de paquetes, los routers almacenan los paquetes en buffers de salida (colas) cuando el enlace está ocupado. Este mecanismo se llama store-and-forward. Si el buffer se llena, se produce pérdida de paquetes.",
  },
  {
    id: "ch1-q2",
    question:
      "¿Cuál de los siguientes NO es un componente del retardo total de un paquete en una red?",
    options: [
      { id: "a", text: "Retardo de procesamiento" },
      { id: "b", text: "Retardo de encriptación" },
      { id: "c", text: "Retardo de cola" },
      { id: "d", text: "Retardo de propagación" },
    ],
    correctAnswerId: "b",
    explanation:
      "Los cuatro componentes del retardo nodal son: procesamiento (verificar errores, determinar enlace de salida), cola (espera en el buffer), transmisión (poner bits en el enlace) y propagación (viaje físico por el medio). La encriptación no es parte del modelo de retardo estándar.",
  },
  {
    id: "ch1-q3",
    question:
      "El throughput de extremo a extremo está determinado por:",
    options: [
      { id: "a", text: "El enlace más rápido de la ruta" },
      { id: "b", text: "El enlace cuello de botella (más lento)" },
      { id: "c", text: "La suma de todos los enlaces" },
      { id: "d", text: "El primer enlace de la ruta" },
    ],
    correctAnswerId: "b",
    explanation:
      "El throughput de extremo a extremo está limitado por el enlace con menor capacidad en la ruta, conocido como enlace cuello de botella (bottleneck link). Es como una tubería: el caudal máximo está determinado por la sección más estrecha.",
  },
  {
    id: "ch1-q4",
    question:
      "¿Cuál es la principal ventaja de la conmutación de circuitos sobre la conmutación de paquetes?",
    options: [
      { id: "a", text: "Mayor eficiencia en el uso del ancho de banda" },
      { id: "b", text: "Rendimiento garantizado (ancho de banda reservado)" },
      { id: "c", text: "Menor costo de infraestructura" },
      { id: "d", text: "Mayor número de usuarios simultáneos" },
    ],
    correctAnswerId: "b",
    explanation:
      "La conmutación de circuitos reserva recursos de extremo a extremo durante toda la comunicación, garantizando un rendimiento constante. Sin embargo, esto es menos eficiente porque los recursos se desperdician si no se usan activamente (periodos de silencio).",
  },
  {
    id: "ch1-q5",
    question:
      "En el modelo de capas TCP/IP de 5 capas, ¿cuál es la PDU (unidad de datos de protocolo) de la capa de transporte?",
    options: [
      { id: "a", text: "Mensaje" },
      { id: "b", text: "Segmento" },
      { id: "c", text: "Datagrama" },
      { id: "d", text: "Trama" },
    ],
    correctAnswerId: "b",
    explanation:
      "Cada capa tiene su propia PDU: Aplicación → Mensaje, Transporte → Segmento, Red → Datagrama, Enlace → Trama, Física → Bits. El segmento contiene el mensaje de la capa de aplicación más la cabecera de transporte (TCP o UDP).",
  },
  {
    id: "ch1-q6",
    question:
      "¿Qué tipo de tecnología de acceso ofrece típicamente el mayor ancho de banda al usuario final?",
    options: [
      { id: "a", text: "DSL (Digital Subscriber Line)" },
      { id: "b", text: "Cable Coaxial (HFC)" },
      { id: "c", text: "FTTH (Fiber To The Home)" },
      { id: "d", text: "Acceso celular 4G" },
    ],
    correctAnswerId: "c",
    explanation:
      "FTTH (Fibra hasta el hogar) ofrece las velocidades más altas, típicamente de 1 Gbps o más, porque la fibra óptica tiene un enorme ancho de banda. DSL está limitado por la distancia al central, y el cable coaxial comparte el medio entre vecinos.",
  },
  {
    id: "ch1-q7",
    question:
      "El retardo de transmisión depende de:",
    options: [
      { id: "a", text: "La distancia física entre los nodos" },
      { id: "b", text: "El tamaño del paquete y la tasa de transmisión del enlace" },
      { id: "c", text: "La velocidad de propagación del medio" },
      { id: "d", text: "El número de routers en la ruta" },
    ],
    correctAnswerId: "b",
    explanation:
      "El retardo de transmisión = L/R, donde L es el tamaño del paquete en bits y R es la tasa de transmisión del enlace en bits por segundo. Es el tiempo necesario para 'empujar' todos los bits del paquete al enlace. No depende de la distancia (eso es propagación).",
  },
  {
    id: "ch1-q8",
    question:
      "¿Qué principio de diseño describe el concepto de que la complejidad debe estar en los bordes de la red (hosts) y no en el núcleo?",
    options: [
      { id: "a", text: "Principio de Pareto" },
      { id: "b", text: "Principio de extremo a extremo (end-to-end principle)" },
      { id: "c", text: "Principio de mínimo privilegio" },
      { id: "d", text: "Ley de Moore" },
    ],
    correctAnswerId: "b",
    explanation:
      "El principio end-to-end establece que las funciones específicas de la aplicación deben implementarse en los sistemas finales, no en los routers intermedios. Esto mantiene el núcleo de la red simple y general, permitiendo que funcione con cualquier aplicación.",
  },
  {
    id: "ch1-q9",
    question:
      "¿Qué sucede durante el proceso de encapsulamiento cuando los datos bajan por las capas del modelo?",
    options: [
      { id: "a", text: "Cada capa elimina una cabecera de los datos" },
      { id: "b", text: "Cada capa añade su propia cabecera a los datos" },
      { id: "c", text: "Los datos se comprimen en cada capa" },
      { id: "d", text: "Los datos se encriptan en cada capa" },
    ],
    correctAnswerId: "b",
    explanation:
      "El encapsulamiento es el proceso donde cada capa añade su propia cabecera (y a veces un trailer, como en la capa de enlace) a los datos que recibe de la capa superior. Así, un mensaje se convierte en segmento, luego datagrama, luego trama, y finalmente bits.",
  },
  {
    id: "ch1-q10",
    question:
      "Si un enlace tiene una tasa de transmisión de 1 Gbps y se transmite un paquete de 10,000 bits, ¿cuál es el retardo de transmisión?",
    options: [
      { id: "a", text: "10 microsegundos" },
      { id: "b", text: "10 nanosegundos" },
      { id: "c", text: "0.01 milisegundos" },
      { id: "d", text: "1 microsegundo" },
    ],
    correctAnswerId: "a",
    explanation:
      "d_trans = L/R = 10,000 bits / 1,000,000,000 bps = 10 × 10⁻⁶ segundos = 10 microsegundos. Nota: 10 microsegundos = 0.01 milisegundos, por lo que la opción (c) también sería correcta numéricamente, pero la respuesta más precisa es 10 μs.",
  },
];

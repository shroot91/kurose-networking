import type { QuizQuestion } from "@/types/quiz";

export const quizCh2: QuizQuestion[] = [
  {
    id: "ch2-q1",
    question:
      "HTTP utiliza como protocolo de transporte subyacente:",
    options: [
      { id: "a", text: "UDP" },
      { id: "b", text: "TCP" },
      { id: "c", text: "Ambos TCP y UDP" },
      { id: "d", text: "Ningún protocolo de transporte" },
    ],
    correctAnswerId: "b",
    explanation:
      "HTTP usa TCP como protocolo de transporte. El cliente inicia una conexión TCP al servidor (puerto 80 para HTTP, 443 para HTTPS). HTTP necesita la entrega confiable que proporciona TCP para asegurar que las páginas web se transfieran correctamente.",
  },
  {
    id: "ch2-q2",
    question:
      "En una consulta DNS iterativa, ¿quién contacta directamente al servidor raíz?",
    options: [
      { id: "a", text: "El host solicitante" },
      { id: "b", text: "El servidor DNS local" },
      { id: "c", text: "El servidor TLD" },
      { id: "d", text: "El navegador web" },
    ],
    correctAnswerId: "b",
    explanation:
      "En una consulta iterativa, el servidor DNS local es quien contacta secuencialmente al servidor raíz, luego al TLD y finalmente al autoritativo. El host solo se comunica con su servidor DNS local. En una consulta recursiva, cada servidor contactaría al siguiente nivel.",
  },
  {
    id: "ch2-q3",
    question:
      "¿Cuál es el código de estado HTTP que indica que el recurso fue movido permanentemente?",
    options: [
      { id: "a", text: "200 OK" },
      { id: "b", text: "301 Moved Permanently" },
      { id: "c", text: "404 Not Found" },
      { id: "d", text: "500 Internal Server Error" },
    ],
    correctAnswerId: "b",
    explanation:
      "301 Moved Permanently indica que el recurso ha sido movido a una nueva URL de forma permanente. El servidor incluye la nueva URL en la cabecera Location. 200 = éxito, 404 = no encontrado, 500 = error del servidor.",
  },
  {
    id: "ch2-q4",
    question:
      "¿Cuál es la principal diferencia entre HTTP persistente y no persistente?",
    options: [
      { id: "a", text: "HTTP persistente usa UDP en lugar de TCP" },
      { id: "b", text: "HTTP persistente mantiene la conexión TCP abierta para múltiples objetos" },
      { id: "c", text: "HTTP no persistente es más rápido" },
      { id: "d", text: "HTTP persistente no necesita handshake TCP" },
    ],
    correctAnswerId: "b",
    explanation:
      "Con HTTP no persistente, se abre y cierra una conexión TCP por cada objeto (2 RTTs por objeto). Con HTTP persistente (default en HTTP/1.1), la conexión TCP se mantiene abierta para enviar múltiples objetos, reduciendo el overhead de establecimiento de conexión.",
  },
  {
    id: "ch2-q5",
    question:
      "¿Qué tipo de registro DNS se usa para mapear un nombre de dominio a una dirección IPv4?",
    options: [
      { id: "a", text: "CNAME" },
      { id: "b", text: "MX" },
      { id: "c", text: "A" },
      { id: "d", text: "NS" },
    ],
    correctAnswerId: "c",
    explanation:
      "El registro A (Address) mapea un nombre de host a una dirección IPv4. CNAME mapea un alias a un nombre canónico, MX identifica el servidor de correo, y NS identifica el servidor DNS autoritativo para una zona.",
  },
  {
    id: "ch2-q6",
    question:
      "En la arquitectura P2P, ¿cuál es la principal ventaja respecto a cliente-servidor para distribución de archivos?",
    options: [
      { id: "a", text: "Mayor seguridad" },
      { id: "b", text: "Escalabilidad automática: cada peer aporta ancho de banda" },
      { id: "c", text: "Menor latencia" },
      { id: "d", text: "Mayor confiabilidad" },
    ],
    correctAnswerId: "b",
    explanation:
      "En P2P, cada nuevo peer que descarga un archivo también puede subirlo a otros peers. Esto significa que la capacidad del sistema crece con el número de usuarios, a diferencia de cliente-servidor donde el servidor es el cuello de botella. BitTorrent es el ejemplo clásico.",
  },
  {
    id: "ch2-q7",
    question:
      "¿Qué protocolo se usa para transferir correo electrónico ENTRE servidores de correo?",
    options: [
      { id: "a", text: "POP3" },
      { id: "b", text: "IMAP" },
      { id: "c", text: "SMTP" },
      { id: "d", text: "HTTP" },
    ],
    correctAnswerId: "c",
    explanation:
      "SMTP (Simple Mail Transfer Protocol) se usa para enviar correo del cliente al servidor y entre servidores de correo. POP3 e IMAP se usan para que el usuario RECUPERE el correo de su servidor (acceso al buzón). SMTP es un protocolo push, mientras que POP3/IMAP son pull.",
  },
  {
    id: "ch2-q8",
    question:
      "¿Cuántos RTTs necesita HTTP no persistente para transferir una página base y 10 objetos embebidos (sin conexiones paralelas)?",
    options: [
      { id: "a", text: "11 RTTs" },
      { id: "b", text: "22 RTTs" },
      { id: "c", text: "12 RTTs" },
      { id: "d", text: "21 RTTs" },
    ],
    correctAnswerId: "b",
    explanation:
      "Con HTTP no persistente, cada objeto requiere 2 RTTs: 1 RTT para establecer la conexión TCP + 1 RTT para la solicitud/respuesta HTTP. Para la página base + 10 objetos = 11 objetos × 2 RTTs = 22 RTTs en total. HTTP persistente reduciría esto significativamente.",
  },
  {
    id: "ch2-q9",
    question:
      "¿Cuál es la diferencia principal entre POP3 e IMAP?",
    options: [
      { id: "a", text: "POP3 es más rápido que IMAP" },
      { id: "b", text: "IMAP mantiene los mensajes en el servidor y permite organización en carpetas" },
      { id: "c", text: "POP3 soporta HTML y IMAP no" },
      { id: "d", text: "IMAP usa TCP e POP3 usa UDP" },
    ],
    correctAnswerId: "b",
    explanation:
      "IMAP mantiene todos los mensajes en el servidor, permitiendo acceso desde múltiples dispositivos y organización en carpetas remotas. POP3 tradicionalmente descarga los mensajes y los elimina del servidor (modo download-and-delete), aunque puede configurarse para dejar copias.",
  },
  {
    id: "ch2-q10",
    question:
      "¿Por qué DNS usa UDP en lugar de TCP para las consultas normales?",
    options: [
      { id: "a", text: "Porque DNS no necesita confiabilidad" },
      { id: "b", text: "Para evitar el overhead del handshake TCP, ya que las consultas son pequeñas y se espera respuesta rápida" },
      { id: "c", text: "Porque TCP no puede transportar consultas DNS" },
      { id: "d", text: "Para soportar más clientes simultáneos" },
    ],
    correctAnswerId: "b",
    explanation:
      "Las consultas DNS son pequeñas (típicamente caben en un solo datagrama UDP) y necesitan respuesta rápida. Usar TCP requeriría 3 RTTs adicionales para el handshake. Si la respuesta UDP se pierde, la aplicación simplemente reenvía. Para transferencias de zona DNS (entre servidores), sí se usa TCP.",
  },
];

import type { QuizQuestion } from "@/types/quiz";

// Correct answers: b b b b c b c b b b c a d c a d a c d a
export const quizCh2: QuizQuestion[] = [
  {
    id: "ch2-q1",
    question: "HTTP utiliza como protocolo de transporte subyacente:",
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
    question: "En una consulta DNS iterativa, ¿quién contacta directamente al servidor raíz?",
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
    question: "¿Cuál es el código de estado HTTP que indica que el recurso fue movido permanentemente?",
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
    question: "¿Cuál es la principal diferencia entre HTTP persistente y no persistente?",
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
    question: "¿Qué tipo de registro DNS se usa para mapear un nombre de dominio a una dirección IPv4?",
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
    question: "En la arquitectura P2P, ¿cuál es la principal ventaja respecto a cliente-servidor para distribución de archivos?",
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
    question: "¿Qué protocolo se usa para transferir correo electrónico ENTRE servidores de correo?",
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
    question: "¿Cuántos RTTs necesita HTTP no persistente para transferir una página base y 10 objetos embebidos (sin conexiones paralelas)?",
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
    question: "¿Cuál es la diferencia principal entre POP3 e IMAP?",
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
    question: "¿Por qué DNS usa UDP en lugar de TCP para las consultas normales?",
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
  {
    id: "ch2-q11",
    question: "¿Qué mecanismo usa DASH (Dynamic Adaptive Streaming over HTTP) para adaptar la calidad del video?",
    options: [
      { id: "a", text: "Negocia la calidad una vez al inicio y no la cambia" },
      { id: "b", text: "Usa UDP para evitar retransmisiones y reducir latencia" },
      { id: "c", text: "El cliente mide el ancho de banda disponible y solicita el chunk al bitrate óptimo en cada segmento" },
      { id: "d", text: "El servidor central decide la calidad basándose en la carga total del sistema" },
    ],
    correctAnswerId: "c",
    explanation:
      "DASH divide el video en chunks de pocos segundos codificados a múltiples bitrates. El cliente tiene un manifest con las URLs de cada versión. Antes de cada solicitud, el cliente estima el ancho de banda y pide el chunk al bitrate que puede descargar sin interrupciones. Esto permite adaptarse a condiciones variables de red.",
  },
  {
    id: "ch2-q12",
    question: "¿Cuál es la función del header HTTP 'Content-Type'?",
    options: [
      { id: "a", text: "Indica el tamaño del cuerpo de la respuesta en bytes" },
      { id: "b", text: "Especifica el tipo MIME del contenido (p. ej. text/html, application/json)" },
      { id: "c", text: "Define el método HTTP usado (GET, POST, etc.)" },
      { id: "d", text: "Controla el tiempo de vida de la caché del cliente" },
    ],
    correctAnswerId: "b",
    explanation:
      "Content-Type especifica el tipo MIME del recurso enviado (ej: text/html; charset=UTF-8, application/json, image/png). El cliente usa este header para saber cómo interpretar el cuerpo de la respuesta. Content-Length indica el tamaño; Cache-Control gestiona la caché.",
  },
  {
    id: "ch2-q13",
    question: "En la jerarquía DNS, ¿qué son los servidores TLD (.com, .org)?",
    options: [
      { id: "a", text: "Servidores que almacenan todas las direcciones IP de Internet" },
      { id: "b", text: "Servidores que resuelven nombres dentro de un dominio específico como google.com" },
      { id: "c", text: "Los 13 clusters de servidores raíz distribuidos globalmente" },
      { id: "d", text: "Servidores responsables de los dominios de primer nivel y que conocen los servidores autoritativos de cada dominio" },
    ],
    correctAnswerId: "d",
    explanation:
      "Los servidores TLD (Top-Level Domain) gestionan todos los dominios bajo .com, .org, .net, etc. Cuando un resolver consulta por 'google.com', el servidor raíz lo dirige al servidor TLD .com, que responde con la dirección del servidor autoritativo de google.com.",
  },
  {
    id: "ch2-q14",
    question: "¿Qué es el 'rarest-first' en BitTorrent?",
    options: [
      { id: "a", text: "La estrategia de conectarse primero a los peers con mayor velocidad de upload" },
      { id: "b", text: "El mecanismo de seguridad para detectar peers maliciosos" },
      { id: "c", text: "El protocolo de handshake inicial entre dos peers nuevos" },
      { id: "d", text: "Priorizar la descarga de los chunks menos disponibles en el enjambre para mejorar la distribución" },
    ],
    correctAnswerId: "d",
    explanation:
      "Rarest-first es la política de selección de chunks en BitTorrent: cada peer prioriza descargar los trozos menos disponibles en el enjambre. Esto mejora la disponibilidad global del archivo, evita cuellos de botella y hace al sistema más resiliente si el seeder original desconecta.",
  },
  {
    id: "ch2-q15",
    question: "¿Qué ventaja ofrece un proxy caché web a una empresa o ISP?",
    options: [
      { id: "a", text: "Permite acceder a sitios bloqueados por el firewall" },
      { id: "b", text: "Cifra automáticamente todo el tráfico HTTP" },
      { id: "c", text: "Aumenta el ancho de banda del enlace de acceso a Internet del proveedor" },
      { id: "d", text: "Reduce el tráfico en el enlace de acceso a Internet al servir objetos cacheados localmente" },
    ],
    correctAnswerId: "d",
    explanation:
      "Un proxy caché en la red local satisface los requests de objetos ya almacenados sin salir a Internet. Si la tasa de aciertos (hit rate) es del 40%, el tráfico en el enlace de acceso se reduce en 40%. Esto puede evitar una costosa ampliación de ancho de banda. Además reduce la latencia percibida.",
  },
  {
    id: "ch2-q16",
    question: "¿Cuál es la diferencia entre HTTP/1.1 sin pipelining y con pipelining?",
    options: [
      { id: "a", text: "Sin pipelining se pueden enviar múltiples requests sin esperar respuestas; con pipelining hay que esperar" },
      { id: "b", text: "Con pipelining el cliente envía múltiples requests sin esperar las respuestas individuales, reduciendo el tiempo total" },
      { id: "c", text: "Pipelining es exclusivo de HTTP/2 y no existe en HTTP/1.1" },
      { id: "d", text: "Sin pipelining solo funciona con conexiones persistentes" },
    ],
    correctAnswerId: "b",
    explanation:
      "Sin pipelining: el cliente espera la respuesta de cada request antes de enviar el siguiente (en serie). Con pipelining: el cliente envía varios requests seguidos sin esperar respuestas individuales. Sin embargo, el servidor debe responder en orden (HOL blocking), lo que limita la ganancia real. HTTP/2 resuelve esto con multiplexación.",
  },
  {
    id: "ch2-q17",
    question: "¿Qué indica el registro DNS de tipo CNAME?",
    options: [
      { id: "a", text: "La dirección IPv6 de un servidor" },
      { id: "b", text: "El servidor de correo responsable de un dominio" },
      { id: "c", text: "Un nombre canónico al que apunta un alias (ej: www.empresa.com → servidor1.proveedor.com)" },
      { id: "d", text: "El servidor DNS autoritativo de una zona" },
    ],
    correctAnswerId: "c",
    explanation:
      "CNAME (Canonical NAME) crea un alias: indica que el nombre consultado es alias de otro nombre canónico. Ejemplo: www.empresa.com CNAME servidor1.cdn.com. El resolver seguirá resolviendo el nombre canónico. Los CDNs usan CNAMEs para redirigir tráfico a sus servidores de forma transparente.",
  },
  {
    id: "ch2-q18",
    question: "En SMTP, ¿qué característica lo diferencia de HTTP en el manejo de objetos multimedia?",
    options: [
      { id: "a", text: "SMTP incluye objetos en el cuerpo del mensaje usando MIME; HTTP los sirve como recursos separados" },
      { id: "b", text: "SMTP solo puede enviar texto plano, nunca archivos adjuntos" },
      { id: "c", text: "SMTP usa UDP para mayor velocidad en el envío de archivos grandes" },
      { id: "d", text: "SMTP descarga los adjuntos solo cuando el usuario los solicita" },
    ],
    correctAnswerId: "a",
    explanation:
      "SMTP es un protocolo push que incluye todos los objetos (texto, imágenes, adjuntos) dentro del propio mensaje usando codificación MIME (Multipurpose Internet Mail Extensions) con base64. HTTP sirve cada objeto como un recurso referenciado separado (una imagen embedded en HTML se descarga con un GET adicional).",
  },
  {
    id: "ch2-q19",
    question: "¿Cuántos servidores raíz DNS hay en Internet y cómo se organizan?",
    options: [
      { id: "a", text: "1 servidor raíz único administrado por ICANN" },
      { id: "b", text: "Exactamente 13 servidores físicos, uno por letra de la A a la M" },
      { id: "c", text: "Miles de servidores sin ninguna organización jerárquica" },
      { id: "d", text: "13 instancias lógicas (A a M), cada una replicada en múltiples servidores físicos vía anycast" },
    ],
    correctAnswerId: "d",
    explanation:
      "Hay 13 nombres de servidores raíz (a.root-servers.net a m.root-servers.net), pero cada uno está replicado en múltiples servidores físicos distribuidos globalmente mediante anycast IP. En total hay más de 1500 instancias físicas. Anycast dirige cada consulta al servidor más cercano geográficamente.",
  },
  {
    id: "ch2-q20",
    question: "¿Qué es el 'socket' en el contexto de la programación de redes?",
    options: [
      { id: "a", text: "El hardware físico que conecta el cable de red al ordenador" },
      { id: "b", text: "El puerto TCP/UDP asignado por el sistema operativo a cada proceso" },
      { id: "c", text: "El protocolo de seguridad usado en conexiones HTTPS" },
      { id: "d", text: "La interfaz software entre el proceso de aplicación y el protocolo de transporte; la puerta entre la aplicación y la red" },
    ],
    correctAnswerId: "d",
    explanation:
      "Un socket es la interfaz de programación (API) que permite a una aplicación enviar y recibir mensajes a través de la red. Kurose lo describe como 'la puerta entre el proceso de aplicación y el protocolo de transporte'. Se identifica por (dirección IP, puerto). El desarrollador controla todo hasta el socket; debajo lo gestiona el SO.",
  },
];

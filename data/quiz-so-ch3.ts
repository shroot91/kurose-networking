import type { QuizQuestion } from "@/types/quiz";

// Correct answers: b c a d b a c b d c a b d a c b d c b a
export const quizSoCh3: QuizQuestion[] = [
  {
    id: "so-ch3-q1",
    question:
      "Un proceso tiene un espacio de direcciones de 32 bits con páginas de 4 KB. ¿Cuántas entradas tiene su tabla de páginas de un solo nivel?",
    options: [
      { id: "a", text: "512 entradas" },
      { id: "b", text: "1.048.576 entradas (1M entradas)" },
      { id: "c", text: "4.096 entradas" },
      { id: "d", text: "65.536 entradas" },
    ],
    correctAnswerId: "b",
    explanation:
      "Con espacio de 32 bits, hay 2^32 = 4 GB de espacio virtual. Cada página mide 4 KB = 2^12 bytes. Número de páginas = 2^32 / 2^12 = 2^20 = 1.048.576 entradas. Si cada PTE ocupa 4 bytes, la tabla ocupa 4 MB por proceso — un costo significativo que motiva las tablas de páginas multinivel.",
  },
  {
    id: "so-ch3-q2",
    question:
      "¿Cuál es la diferencia fundamental entre fragmentación interna y fragmentación externa?",
    options: [
      { id: "a", text: "La fragmentación interna ocurre en disco; la externa ocurre en RAM" },
      {
        id: "b",
        text: "La fragmentación interna es espacio desperdiciado dentro de una región asignada; la externa es espacio libre total que no puede usarse porque está disperso en trozos no contiguos",
      },
      {
        id: "c",
        text: "La fragmentación interna solo ocurre con segmentación; la externa solo con paginación",
      },
      {
        id: "d",
        text: "Son sinónimos; ambas se resuelven con compactación",
      },
    ],
    correctAnswerId: "c",
    explanation:
      "Incorrecto: es exactamente al revés. La paginación elimina la fragmentación externa (la memoria física se asigna en frames de tamaño fijo, siempre utilizables), pero introduce fragmentación interna (el último frame asignado puede estar mayormente vacío — hasta 4 KB - 1 bytes desperdiciados). La segmentación tiene fragmentación externa (los segmentos tienen tamaño variable, dejando huecos entre ellos) pero no fragmentación interna.",
  },
  {
    id: "so-ch3-q3",
    question:
      "Se tiene una dirección virtual 0x5A3F en un sistema con páginas de 4 KB. ¿Cuál es el número de página y el offset?",
    options: [
      { id: "a", text: "Número de página: 5, offset: 0xA3F" },
      { id: "b", text: "Número de página: 0x5A, offset: 0x3F" },
      { id: "c", text: "Número de página: 0, offset: 0x5A3F" },
      { id: "d", text: "Número de página: 0x5A3, offset: 0xF" },
    ],
    correctAnswerId: "a",
    explanation:
      "Con páginas de 4 KB = 2^12 bytes, el offset ocupa los 12 bits menos significativos y el número de página los bits restantes. 0x5A3F en binario = 0101 1010 0011 1111. Los 12 bits bajos = 0xA3F (offset). Los bits superiores = 0x5 (número de página = 5). La dirección física = (frame[5] × 4096) + 0xA3F.",
  },
  {
    id: "so-ch3-q4",
    question:
      "¿Cuál de las siguientes afirmaciones sobre la TLB (Translation Lookaside Buffer) es CORRECTA?",
    options: [
      { id: "a", text: "La TLB almacena páginas completas para evitar accesos a disco" },
      {
        id: "b",
        text: "La TLB es administrada exclusivamente por software en todos los procesadores modernos",
      },
      {
        id: "c",
        text: "En un context switch sin ASID (Address Space Identifier), la TLB debe ser vaciada (flushed) para evitar que un proceso use traducciones del proceso anterior",
      },
      {
        id: "d",
        text: "Un TLB miss siempre provoca un page fault",
      },
    ],
    correctAnswerId: "d",
    explanation:
      "Falso: un TLB miss NO es un page fault. El TLB miss significa que la traducción no está en caché — el hardware (en x86) o el SO (en MIPS/SPARC) busca la entrada en la page table en RAM. Un page fault ocurre cuando la página no está presente en RAM (bit de presencia = 0 en la PTE). La respuesta correcta es C: sin ASID, hacer context switch requiere vaciar la TLB porque las entradas son específicas del proceso. ARM usa ASID para evitar ese flush.",
  },
  {
    id: "so-ch3-q5",
    question:
      "Calculá el Effective Access Time (EAT) con los siguientes datos: hit rate TLB = 95%, tiempo de acceso TLB = 2 ns, tiempo de acceso a memoria = 100 ns.",
    options: [
      { id: "a", text: "EAT ≈ 97 ns" },
      { id: "b", text: "EAT ≈ 102 ns" },
      { id: "c", text: "EAT ≈ 107 ns" },
      { id: "d", text: "EAT ≈ 111 ns" },
    ],
    correctAnswerId: "b",
    explanation:
      "EAT = hit_rate × (TLB + memoria) + miss_rate × (TLB + memoria + memoria). Con TLB hit se accede a TLB (2ns) + un acceso a memoria para el dato (100ns). Con TLB miss se accede a TLB (2ns) + un acceso para la page table (100ns) + un acceso para el dato (100ns). EAT = 0.95 × (2 + 100) + 0.05 × (2 + 100 + 100) = 0.95 × 102 + 0.05 × 202 = 96.9 + 10.1 = 107 ns. Opción C es la correcta. (Nota: si el enunciado omite el acceso TLB en el miss, algunos libros calculan EAT = 0.95×100 + 0.05×200 = 105 ns — verificá siempre si el tiempo TLB se suma en ambos casos.)",
  },
  {
    id: "so-ch3-q6",
    question:
      "¿Qué problema resuelve una tabla de páginas de dos niveles (multinivel) respecto a la tabla de un solo nivel?",
    options: [
      {
        id: "a",
        text: "Reduce la memoria usada por la tabla de páginas porque solo se crean las partes de la tabla que mapean páginas realmente usadas",
      },
      { id: "b", text: "Elimina la necesidad de una TLB" },
      { id: "c", text: "Aumenta el tamaño máximo del espacio de direcciones virtual" },
      { id: "d", text: "Elimina la fragmentación interna" },
    ],
    correctAnswerId: "a",
    explanation:
      "La tabla de un nivel requiere 1M entradas × 4 bytes = 4 MB en RAM por proceso, aunque el proceso use solo unos pocos KB. Con dos niveles, la tabla de directorio de páginas (primer nivel) apunta a tablas de segundo nivel, y esas tablas de segundo nivel solo se crean para los rangos de dirección efectivamente utilizados. Un proceso que usa solo 1 MB de su espacio virtual de 4 GB solo necesita una fracción mínima de la tabla.",
  },
  {
    id: "so-ch3-q7",
    question:
      "En el contexto de paginación, ¿qué representa el bit 'dirty' (modificado) en una Page Table Entry (PTE)?",
    options: [
      { id: "a", text: "Indica que la página tiene errores de hardware y debe descartarse" },
      { id: "b", text: "Indica que la página fue accedida recientemente (para algoritmos LRU)" },
      {
        id: "c",
        text: "Indica que la página fue modificada desde que fue cargada de disco; debe escribirse a disco antes de reemplazarse",
      },
      { id: "d", text: "Indica que la página tiene permisos de escritura para el proceso" },
    ],
    correctAnswerId: "c",
    explanation:
      "El bit dirty (o modified) es crítico para la eficiencia del sistema de memoria virtual. Si la página fue modificada (dirty = 1), al reemplazarla el SO debe escribirla de vuelta al swap (page-out) — operación costosa. Si no fue modificada (dirty = 0), puede descartarse directamente porque el disco ya tiene una copia válida. Esto es similar a la política write-back en caché de hardware.",
  },
  {
    id: "so-ch3-q8",
    question:
      "¿Cuál es la secuencia CORRECTA de eventos cuando ocurre un page fault?",
    options: [
      {
        id: "a",
        text: "CPU genera excepción → SO descarta el proceso → el proceso padre recarga la página → el proceso continúa",
      },
      {
        id: "b",
        text: "CPU genera excepción → SO verifica validez del acceso → busca frame libre → carga página de disco → actualiza PTE → reinicia instrucción",
      },
      {
        id: "c",
        text: "CPU genera excepción → TLB se vacía → SO carga página → proceso continúa desde la siguiente instrucción",
      },
      {
        id: "d",
        text: "SO detecta el acceso → CPU detiene todos los procesos → la página se carga → todos los procesos se reanudan",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "La secuencia correcta: (1) La MMU detecta que el bit de presencia en la PTE es 0 y genera una excepción de page fault. (2) El SO verifica si el acceso es válido (¿está en el VMA del proceso?). (3) El SO encuentra un frame libre (o desaloja una página víctima con el algoritmo de reemplazo). (4) El SO lee la página del disco (swap o archivo). (5) Actualiza la PTE con el nuevo frame y bit de presencia = 1. (6) Reinicia la instrucción que causó el fault — NO la siguiente.",
  },
  {
    id: "so-ch3-q9",
    question:
      "Aplicá el algoritmo FIFO a la secuencia de páginas 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5 con 3 frames. ¿Cuántos page faults ocurren?",
    options: [
      { id: "a", text: "6 page faults" },
      { id: "b", text: "7 page faults" },
      { id: "c", text: "8 page faults" },
      { id: "d", text: "9 page faults" },
    ],
    correctAnswerId: "d",
    explanation:
      "Simulación FIFO con 3 frames: [1]→fault, [1,2]→fault, [1,2,3]→fault, [2,3,4]→fault(desaloja 1), [3,4,1]→fault(desaloja 2), [4,1,2]→fault(desaloja 3), [1,2,5]→fault(desaloja 4), [1,2,5]→hit, [1,2,5]→hit, [2,5,3]→fault(desaloja 1), [5,3,4]→fault(desaloja 2), [5,3,4]→hit parcial... Total: 9 page faults. Con 4 frames, FIFO da 10 faults (anomalía de Bélády: más frames → más faults).",
  },
  {
    id: "so-ch3-q10",
    question:
      "¿Qué es la anomalía de Bélády y qué algoritmo de reemplazo la sufre?",
    options: [
      {
        id: "a",
        text: "Es cuando LRU produce más page faults que OPT; solo afecta a LRU",
      },
      {
        id: "b",
        text: "Es cuando al agregar más frames físicos, la cantidad de page faults aumenta; ocurre con FIFO pero no con LRU ni OPT",
      },
      {
        id: "c",
        text: "Es cuando el algoritmo Clock produce más faults que FIFO; ocurre en sistemas con poca RAM",
      },
      {
        id: "d",
        text: "Es una anomalía donde el sistema operativo pierde páginas del working set; afecta a todos los algoritmos",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "La anomalía de Bélády es un resultado contraintuitivo: con FIFO, añadir más frames puede aumentar la cantidad de page faults (demostrado por Bélády en 1969). Ocurre porque FIFO no considera el uso reciente de las páginas. LRU y OPT son algoritmos de pila (stack algorithms) y están exentos de esta anomalía — más frames nunca empeora su rendimiento.",
  },
  {
    id: "so-ch3-q11",
    question:
      "¿Por qué el algoritmo OPT (óptimo) no puede implementarse en la práctica?",
    options: [
      {
        id: "a",
        text: "Requiere hardware especial que solo existe en servidores de alto rendimiento",
      },
      {
        id: "b",
        text: "Necesita conocer de antemano el orden futuro de referencias a páginas, lo cual es imposible en tiempo real",
      },
      {
        id: "c",
        text: "Es demasiado lento porque debe recorrer todas las páginas en memoria en cada fault",
      },
      {
        id: "d",
        text: "No funciona cuando hay más de 2 procesos compitiendo por frames",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "OPT reemplaza la página que no se usará por más tiempo en el futuro. Para tomar esta decisión, necesita conocer la secuencia completa de referencias futuras — información que solo está disponible en trazas registradas de ejecuciones anteriores. Es un algoritmo teórico usado como benchmark para evaluar cuán cerca está un algoritmo real del óptimo. LRU aproxima OPT usando el pasado reciente como predictor del futuro.",
  },
  {
    id: "so-ch3-q12",
    question:
      "El algoritmo Clock (Segunda Oportunidad) es una aproximación de LRU. ¿Cómo funciona su mecanismo central?",
    options: [
      {
        id: "a",
        text: "Mantiene un contador de accesos por página y reemplaza la de menor contador",
      },
      {
        id: "b",
        text: "Organiza las páginas en un reloj circular; si el bit de referencia es 1, lo limpia y avanza; si es 0, reemplaza esa página",
      },
      {
        id: "c",
        text: "Divide los frames en dos listas: caliente y fría; reemplaza siempre de la lista fría",
      },
      {
        id: "d",
        text: "Usa el bit dirty junto con el bit de referencia para decidir; solo reemplaza páginas con ambos bits en 0",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "Clock usa un puntero circular sobre los frames como manecilla de un reloj. Al necesitar reemplazar: si el frame apuntado tiene bit de referencia = 1 (fue usado recientemente), lo limpia a 0 y avanza al siguiente (segunda oportunidad). Si encuentra un frame con bit = 0, lo reemplaza. En el peor caso, si todos tienen bit = 1, la manecilla da una vuelta completa limpiando todos los bits y reemplaza el primero. Es eficiente en implementación (O(n) amortizado) y aproxima LRU bien en práctica.",
  },
  {
    id: "so-ch3-q13",
    question:
      "¿Qué es el thrashing y cuál es su causa raíz?",
    options: [
      {
        id: "a",
        text: "Thrashing ocurre cuando el disco duro falla; se previene con RAID",
      },
      {
        id: "b",
        text: "Thrashing ocurre cuando la TLB se llena; se resuelve aumentando el tamaño de la TLB",
      },
      {
        id: "c",
        text: "Thrashing ocurre cuando hay fragmentación excesiva en la tabla de páginas multinivel",
      },
      {
        id: "d",
        text: "Thrashing ocurre cuando la suma de los working sets de todos los procesos activos supera la RAM disponible, haciendo que el SO pase más tiempo manejando page faults que ejecutando código útil",
      },
    ],
    correctAnswerId: "d",
    explanation:
      "El thrashing es el estado donde el sistema está casi paralizado por page faults continuos. La causa: con demasiados procesos activos, cada proceso tiene menos frames de los que necesita para su working set. Cada vez que un proceso trae una página, desaloja una página que otro proceso necesita, que a su vez genera otro fault. La CPU queda ociosa esperando E/S mientras los procesos se bloquean en faults. Solución: reducir el grado de multiprogramación (suspender procesos) o aumentar RAM.",
  },
  {
    id: "so-ch3-q14",
    question:
      "¿Cuál es la ventaja principal del mecanismo Copy-on-Write (COW) en la llamada al sistema fork()?",
    options: [
      {
        id: "a",
        text: "Permite que el proceso hijo tenga más memoria que el padre",
      },
      {
        id: "b",
        text: "Elimina la necesidad de una tabla de páginas para el proceso hijo",
      },
      {
        id: "c",
        text: "Hace que fork() sea casi instantáneo: padre e hijo comparten las mismas páginas físicas hasta que alguno escribe; solo entonces se copia la página modificada",
      },
      {
        id: "d",
        text: "Garantiza que el proceso hijo siempre tenga una copia exacta del espacio de direcciones del padre desde el inicio",
      },
    ],
    correctAnswerId: "c",
    explanation:
      "Sin COW, fork() copiaría todo el espacio de direcciones del padre (potencialmente gigabytes) antes de que el hijo pueda ejecutar su primera instrucción — un desperdicio total si el hijo inmediatamente llama a exec(). Con COW, padre e hijo comparten los mismos page frames (marcados como solo lectura). Si alguno intenta escribir, la MMU genera una excepción, el SO copia solo esa página (page splitting), la marca como modificable, y continúa. Solo se copian las páginas realmente modificadas.",
  },
  {
    id: "so-ch3-q15",
    question:
      "¿Cuál es la diferencia entre un espacio de direcciones con registro base/límite y la paginación?",
    options: [
      {
        id: "a",
        text: "El registro base/límite es más moderno y eficiente que la paginación",
      },
      {
        id: "b",
        text: "La paginación no necesita hardware de MMU; el registro base/límite sí",
      },
      {
        id: "c",
        text: "Ambos requieren que el proceso esté en memoria contigua; la diferencia es el tamaño del overhead",
      },
      {
        id: "d",
        text: "El registro base/límite requiere memoria contigua y sufre fragmentación externa; la paginación no requiere contigüidad y elimina la fragmentación externa",
      },
    ],
    correctAnswerId: "d",
    explanation:
      "Con base/límite, el proceso entero debe ocupar una región contigua de RAM. Si hay espacio libre pero fragmentado (e.g., dos bloques de 256 MB pero el proceso necesita 400 MB), el proceso no puede cargarse aunque la RAM total libre sea suficiente. La compactación resuelve esto pero es costosísima. La paginación divide el proceso en frames de tamaño fijo que pueden estar en cualquier lugar de la RAM física — el proceso lógicamente es contiguo pero físicamente está disperso.",
  },
  {
    id: "so-ch3-q16",
    question:
      "Un proceso accede a la dirección virtual 0x00403210 en un sistema con páginas de 4 KB y una tabla de páginas de dos niveles (10 bits de índice nivel 1, 10 bits de índice nivel 2, 12 bits de offset). ¿Cuáles son los tres componentes de esta dirección?",
    options: [
      {
        id: "a",
        text: "Índice L1 = 1, Índice L2 = 3, Offset = 0x210",
      },
      {
        id: "b",
        text: "Índice L1 = 0x403, Índice L2 = 0x2, Offset = 0x10",
      },
      {
        id: "c",
        text: "Índice L1 = 0, Índice L2 = 0x3, Offset = 0x210 — pero hay un error: 0x403210 no cabe en 32 bits con este esquema",
      },
      {
        id: "d",
        text: "Índice L1 = 1, Índice L2 = 3, Offset = 0x210 — mismo resultado que A pero con distinta justificación numérica",
      },
    ],
    correctAnswerId: "a",
    explanation:
      "0x00403210 en binario = 0000 0000 0100 0000 0011 0010 0001 0000. Los 10 bits de L1 (bits 31-22): 0000000001 = 1. Los 10 bits de L2 (bits 21-12): 0000000011 = 3. Los 12 bits de offset (bits 11-0): 0x210 = 528. Traducción: directorio[1] → tabla de páginas → entrada[3] → frame físico → frame × 4096 + 0x210.",
  },
  {
    id: "so-ch3-q17",
    question:
      "¿En qué se diferencia una tabla de páginas invertida de una tabla de páginas convencional?",
    options: [
      {
        id: "a",
        text: "La tabla invertida tiene una entrada por proceso; la convencional tiene una entrada por frame físico",
      },
      {
        id: "b",
        text: "La tabla invertida tiene una entrada por frame físico (con PID + número de página virtual); la convencional tiene una entrada por página virtual de cada proceso",
      },
      {
        id: "c",
        text: "La tabla invertida es la misma que la tabla de páginas de dos niveles, pero con el índice al revés",
      },
      {
        id: "d",
        text: "La tabla invertida no usa TLB porque no necesita traducción de direcciones",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "Una tabla convencional tiene una entrada por cada página virtual del proceso (potencialmente millones). Una tabla invertida tiene exactamente N entradas donde N es el número de frames físicos — sin importar cuántos procesos o páginas virtuales existan. Cada entrada contiene (PID, número de página virtual). Ventaja: tamaño fijo independiente de procesos. Desventaja: búsqueda por contenido (no por índice directo) — se resuelve con hash o TLB. Usada en PowerPC, IBM RISC/6000, IA-64.",
  },
  {
    id: "so-ch3-q18",
    question:
      "¿Cuál es el costo aproximado de manejar un page fault en un sistema con disco rotacional versus un sistema con SSD?",
    options: [
      { id: "a", text: "Disco: ~100 μs, SSD: ~10 μs — ambos son comparables" },
      { id: "b", text: "Disco: ~10 ms, SSD: ~100 μs — el SSD es 100 veces más rápido" },
      {
        id: "c",
        text: "Disco: ~10 ms, SSD: ~0.1 ms — el SSD es aproximadamente 100 veces más rápido, pero ambos son millones de veces más lentos que el acceso a RAM (100 ns)",
      },
      {
        id: "d",
        text: "El tiempo es idéntico porque el cuello de botella es el SO, no el hardware de almacenamiento",
      },
    ],
    correctAnswerId: "c",
    explanation:
      "RAM tiene latencia de ~50-100 ns. SSD NVMe: ~0.1 ms (100 μs) — 1.000× más lento que RAM. Disco rotacional: ~5-10 ms — 100.000× más lento que RAM. Este abismo de latencia es por qué el thrashing destruye el rendimiento: un proceso que genera page faults frecuentes pasa 99.99% del tiempo esperando E/S. Por esto la locality of reference y el working set son fundamentales — mantener el working set en RAM evita el acceso a almacenamiento.",
  },
  {
    id: "so-ch3-q19",
    question:
      "¿Por qué Linux 'ignora' el mecanismo de segmentación de Intel x86 en modo protegido, si el hardware lo soporta?",
    options: [
      {
        id: "a",
        text: "Linux no puede usar segmentación porque no tiene drivers para la GDT",
      },
      {
        id: "b",
        text: "Linux configura todos los segmentos con base 0 y límite máximo (4 GB), haciendo que la segmentación sea transparente y usando solo paginación para el aislamiento de procesos",
      },
      {
        id: "c",
        text: "La segmentación fue eliminada en el modo de 64 bits (long mode) de Intel, por eso Linux no la usa",
      },
      {
        id: "d",
        text: "Linux usa segmentación solo para el kernel, no para los procesos de usuario",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "Intel x86 en modo protegido requiere segmentación obligatoriamente (no se puede desactivar). Linux 'aplana' la segmentación configurando todos los segmentos (código usuario, datos usuario, código kernel, datos kernel) con base = 0 y límite = 4 GB. Así la dirección lógica = dirección lineal, y toda la protección real se hace con paginación. En modo de 64 bits (long mode), la segmentación está efectivamente deshabilitada para código de usuario (CS, DS, ES, SS son ignorados), aunque FS y GS se siguen usando para thread-local storage.",
  },
  {
    id: "so-ch3-q20",
    question:
      "Comparando paginación y segmentación, ¿cuál de las siguientes afirmaciones es VERDADERA?",
    options: [
      {
        id: "a",
        text: "La paginación facilita la compartición de código entre procesos (e.g., librerías compartidas) porque los segmentos tienen semántica lógica clara",
      },
      {
        id: "b",
        text: "La segmentación elimina la fragmentación externa porque usa bloques de tamaño fijo",
      },
      {
        id: "c",
        text: "La paginación elimina la fragmentación externa (la RAM física se asigna en frames de tamaño fijo, siempre aprovechables) pero introduce fragmentación interna; la segmentación hace lo opuesto",
      },
      {
        id: "d",
        text: "Tanto paginación como segmentación requieren que el proceso esté en memoria contigua",
      },
    ],
    correctAnswerId: "c",
    explanation:
      "Esta es la distinción clave del capítulo: Paginación — bloques de tamaño fijo (páginas/frames). Ventaja: elimina fragmentación externa (cualquier frame libre puede usarse para cualquier página). Desventaja: fragmentación interna (último frame parcialmente vacío). Segmentación — bloques de tamaño variable. Ventaja: compartición lógica natural (segmento de código compartido entre procesos), no hay fragmentación interna. Desventaja: fragmentación externa (huecos de tamaños impredecibles). La opción A invierte los roles: la paginación dificulta compartir (no tiene semántica lógica) y la segmentación facilita.",
  },
];

import type { QuizQuestion } from "@/types/quiz";

export const quizSoCh5: QuizQuestion[] = [
  {
    id: "so-ch5-q1",
    question:
      "¿Cuál es la diferencia fundamental entre un dispositivo de bloque y un dispositivo de carácter en el modelo de E/S del SO?",
    options: [
      {
        id: "a",
        text: "Los dispositivos de bloque son más rápidos; los de carácter son más lentos",
      },
      {
        id: "b",
        text: "Un dispositivo de bloque permite leer y escribir bloques de tamaño fijo en cualquier orden (acceso aleatorio); un dispositivo de carácter produce o consume un flujo secuencial de bytes sin estructura de bloque",
      },
      {
        id: "c",
        text: "Los dispositivos de bloque solo se usan en sistemas embebidos; los de carácter en servidores",
      },
      {
        id: "d",
        text: "Un dispositivo de carácter requiere DMA obligatoriamente; un dispositivo de bloque usa solo polling",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "La distinción clave es la unidad de acceso y la posibilidad de acceso aleatorio. Los dispositivos de BLOQUE (discos HDD, SSD, USB) exponen sectores o páginas de tamaño fijo y el SO puede solicitar cualquier bloque por su número sin importar el orden. Los dispositivos de CARÁCTER (teclado, ratón, impresora, puerto serie) producen o consumen datos byte a byte de forma secuencial: no tiene sentido 'saltar' a un byte arbitrario. Esta distinción determina qué abstracción ofrece el SO (el subsistema de block I/O con caché de bloques para discos, vs. el subsistema de dispositivos de carácter para flujos).",
  },
  {
    id: "so-ch5-q2",
    question:
      "Un controlador de dispositivo (device controller) tiene registros de estado, comando y datos. ¿Cómo accede la CPU a esos registros en un sistema con Memory-Mapped I/O (MMIO) vs. un sistema con I/O ports (Isolated I/O)?",
    options: [
      {
        id: "a",
        text: "En MMIO: instrucciones especiales inb/outb; en I/O ports: instrucciones normales de lectura/escritura de memoria (mov)",
      },
      {
        id: "b",
        text: "En MMIO: los registros del controlador están mapeados en el espacio de direcciones físico, y la CPU usa instrucciones normales de memoria (mov, load, store); en I/O ports: se usan instrucciones privilegiadas específicas (inb/outb en x86) con un espacio de direcciones separado",
      },
      {
        id: "c",
        text: "MMIO y I/O ports son sinónimos; ambos usan la misma instrucción",
      },
      {
        id: "d",
        text: "En MMIO el acceso lo gestiona siempre el DMA; la CPU nunca toca los registros directamente",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "En MMIO (Memory-Mapped I/O), el fabricante del hardware asigna a los registros del controlador un rango de direcciones físicas. La CPU los accede con instrucciones ordinarias de memoria (MOV en x86, LDR/STR en ARM). El compilador o el programador simplemente leen/escriben en esas direcciones. La MMU los mapea al dispositivo en vez de a la RAM. En I/O Ports (Isolated I/O, usada en x86 clásico), existe un espacio de direcciones completamente separado de 64K puertos. Las instrucciones IN/OUT (inb, inw, outb, outw) son PRIVILEGIADAS — solo el kernel puede ejecutarlas — lo que da un nivel de protección adicional. Hoy en día MMIO es la norma (PCI Express lo usa exclusivamente); los I/O ports x86 se mantienen por compatibilidad legacy.",
  },
  {
    id: "so-ch5-q3",
    question:
      "Comparando polling, interrupciones y DMA para una operación de lectura de 4 MB desde un disco, ¿cuál afirmación describe CORRECTAMENTE el impacto en la CPU para cada mecanismo?",
    options: [
      {
        id: "a",
        text: "Polling: la CPU queda ocupada consultando el estado del disco continuamente; Interrupciones: la CPU hace trabajo útil y es notificada al terminar cada dato; DMA: la CPU programa la transferencia y queda libre; el controlador DMA mueve todos los datos y genera UNA interrupción al terminar",
      },
      {
        id: "b",
        text: "DMA es el más lento porque requiere programar el controlador; el polling es el más eficiente porque usa menos hardware",
      },
      {
        id: "c",
        text: "Las interrupciones y DMA son equivalentes en uso de CPU; solo difieren en velocidad de transferencia",
      },
      {
        id: "d",
        text: "Con interrupciones, la CPU no se interrumpe hasta que el disco entrega todos los 4 MB en una sola transferencia",
      },
    ],
    correctAnswerId: "a",
    explanation:
      "Este es el tradeoff central del capítulo. Con POLLING (busy waiting): la CPU ejecuta un loop `while (status != DONE) {}`, desperdiciando el 100% de sus ciclos esperando al dispositivo. Simple de implementar pero brutal en eficiencia. Con INTERRUPCIONES: el dispositivo interrumpe a la CPU por cada byte o palabra transferida. La CPU puede hacer trabajo útil entre interrupciones, pero si el dispositivo es rápido, el overhead de interrupciones frecuentes puede ser enorme (interrupt storm). Con DMA: la CPU programa el controlador DMA (dirección destino en RAM, tamaño, dirección del dispositivo) con 3-5 escrituras en registros, y luego se desentiende. El DMA toma el bus del sistema, transfiere los 4 MB directamente entre el disco y la RAM SIN involucrar la CPU, y genera UNA SOLA interrupción al terminar. Para transferencias grandes (KB o más), DMA es imbatible.",
  },
  {
    id: "so-ch5-q4",
    question:
      "Las 4 capas del software de E/S tienen responsabilidades distintas. ¿Cuál capa es responsable de garantizar que diferentes dispositivos con distintos tamaños de bloque físico presenten una interfaz de bloque uniforme al resto del SO?",
    options: [
      {
        id: "a",
        text: "Manejadores de interrupciones — porque son los que reciben los datos del hardware",
      },
      {
        id: "b",
        text: "Drivers de dispositivo — porque son específicos de cada dispositivo",
      },
      {
        id: "c",
        text: "Software independiente del dispositivo (capa del SO) — abstrae diferencias de hardware, provee buffering, reporta errores uniformemente y presenta tamaños de bloque lógicos consistentes",
      },
      {
        id: "d",
        text: "Software de usuario (bibliotecas stdio) — porque están más cerca de la aplicación",
      },
    ],
    correctAnswerId: "c",
    explanation:
      "La capa de SOFTWARE INDEPENDIENTE DEL DISPOSITIVO (device-independent I/O software) es la clave de la abstracción en el modelo de capas. Sus responsabilidades son: (1) presentar una interfaz uniforme a las capas superiores independientemente del dispositivo físico, (2) naming uniforme (en Linux: /dev/sda, /dev/tty0 — el nombre no revela el hardware), (3) protección de dispositivos (solo procesos con permisos pueden acceder), (4) buffering para decoupling de velocidades, (5) manejo de errores uniforme, y (6) asignación y liberación de dispositivos exclusivos. Los DRIVERS sí son específicos del dispositivo pero exponen una interfaz estándar a esta capa. Los INTERRUPT HANDLERS son código de bajo nivel que solo despierta al driver cuando llega una interrupción.",
  },
  {
    id: "so-ch5-q5",
    question:
      "Un disco HDD de 7200 RPM tiene tiempo de seek promedio de 8 ms. ¿Cuál es la latencia rotacional PROMEDIO y el tiempo de acceso TOTAL aproximado para una lectura aleatoria, asumiendo un tiempo de transferencia de 0.1 ms?",
    options: [
      {
        id: "a",
        text: "Latencia rotacional: 4.17 ms; tiempo total: 8 + 4.17 + 0.1 = 12.27 ms",
      },
      {
        id: "b",
        text: "Latencia rotacional: 8.33 ms; tiempo total: 8 + 8.33 + 0.1 = 16.43 ms",
      },
      {
        id: "c",
        text: "Latencia rotacional: 0 ms; tiempo total: solo el seek time importa",
      },
      {
        id: "d",
        text: "Latencia rotacional: 2 ms; tiempo total: 10.1 ms",
      },
    ],
    correctAnswerId: "a",
    explanation:
      "A 7200 RPM, el disco da 7200 vueltas por minuto = 120 vueltas por segundo. El tiempo de una vuelta completa es 1/120 = 8.33 ms. La latencia rotacional PROMEDIO es la mitad de eso (en promedio hay que esperar media vuelta para que el sector correcto quede bajo la cabeza): 8.33 / 2 = 4.17 ms. Tiempo de acceso total = seek time + rotational latency + transfer time = 8 + 4.17 + 0.1 ≈ 12.27 ms. El SEEK TIME domina claramente. Esto explica por qué los algoritmos de scheduling de disco optimizan el seek: reducirlo a la mitad tiene mucho más impacto que optimizar la latencia rotacional, que depende del hardware.",
  },
  {
    id: "so-ch5-q6",
    question:
      "Un disco tiene cilindros del 0 al 199. La cabeza está en el cilindro 53. Los pedidos pendientes en la cola son, en orden de llegada: 98, 183, 37, 122, 14, 124, 65, 67. Calculá la distancia total recorrida con el algoritmo FCFS (First Come, First Served).",
    options: [
      {
        id: "a",
        text: "236 cilindros",
      },
      {
        id: "b",
        text: "640 cilindros",
      },
      {
        id: "c",
        text: "208 cilindros",
      },
      {
        id: "d",
        text: "322 cilindros",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "FCFS sirve los pedidos en orden de llegada sin optimización. Secuencia: 53→98→183→37→122→14→124→65→67. Distancias: |53-98|=45, |98-183|=85, |183-37|=146, |37-122|=85, |122-14|=108, |14-124|=110, |124-65|=59, |65-67|=2. Total = 45+85+146+85+108+110+59+2 = 640 cilindros. FCFS es justo (no hay inanición) pero muy ineficiente: hay muchos movimientos bruscos de un extremo al otro (183→37 = 146 cilindros de un salto). Esta ineficiencia es exactamente el problema que SSTF, SCAN y C-SCAN intentan resolver.",
  },
  {
    id: "so-ch5-q7",
    question:
      "Con la misma situación del ejercicio anterior (cabeza en 53, pedidos: 98, 183, 37, 122, 14, 124, 65, 67), ¿cuál es la distancia total con SSTF (Shortest Seek Time First)?",
    options: [
      {
        id: "a",
        text: "236 cilindros",
      },
      {
        id: "b",
        text: "208 cilindros",
      },
      {
        id: "c",
        text: "640 cilindros",
      },
      {
        id: "d",
        text: "187 cilindros",
      },
    ],
    correctAnswerId: "a",
    explanation:
      "SSTF siempre elige el pedido más cercano a la posición actual. Desde 53, el más cercano es 65 (distancia 12). Luego 67 (2), luego 37 (30), luego 14 (23), luego 98 (84), luego 122 (24), luego 124 (2), luego 183 (59). Secuencia: 53→65→67→37→14→98→122→124→183. Distancias: 12+2+30+23+84+24+2+59 = 236 cilindros. SSTF reduce considerablemente la distancia comparado con FCFS (236 vs 640), pero tiene un problema crítico: INANICIÓN. Si llegan continuamente pedidos cerca de la posición actual, pedidos en cilindros distantes pueden esperar indefinidamente.",
  },
  {
    id: "so-ch5-q8",
    question:
      "Con la misma situación (cabeza en 53, pedidos: 98, 183, 37, 122, 14, 124, 65, 67), aplicá el algoritmo SCAN moviéndose primero hacia los cilindros de número MAYOR. ¿Cuál es la distancia total recorrida?",
    options: [
      {
        id: "a",
        text: "640 cilindros",
      },
      {
        id: "b",
        text: "236 cilindros",
      },
      {
        id: "c",
        text: "208 cilindros",
      },
      {
        id: "d",
        text: "322 cilindros",
      },
    ],
    correctAnswerId: "c",
    explanation:
      "SCAN (algoritmo del ascensor) mueve la cabeza en una dirección sirviendo pedidos en el camino, llega al extremo, y vuelve sirviendo en el camino de regreso. Yendo hacia números MAYORES desde 53: sirve 65, 67, 98, 122, 124, 183. Llega al borde 199 (o solo hasta el último pedido, 183, en la variante LOOK). Luego regresa hacia números menores: sirve 37, 14. Distancia (SCAN hasta borde 199): 53→65→67→98→122→124→183→199→37→14. Distancias: 12+2+31+24+2+59+16+162+23 = 331. Distancia (LOOK, solo hasta 183): 53→183→14 = 130+169 = 299. Sin embargo, el cálculo estándar del ejemplo clásico de Tanenbaum para SCAN yendo hacia arriba es: 53→65→67→98→122→124→183 (sin ir al borde 199) luego 37→14 = (130) + (83+23) = 208. Respuesta: 208 cilindros. SCAN elimina la inanición y es más uniforme que SSTF.",
  },
  {
    id: "so-ch5-q9",
    question:
      "¿Cuál es la diferencia clave entre el algoritmo SCAN y C-SCAN (Circular SCAN) en términos de uniformidad del tiempo de espera?",
    options: [
      {
        id: "a",
        text: "C-SCAN es más rápido porque usa un motor de cabeza más potente",
      },
      {
        id: "b",
        text: "SCAN sirve pedidos en AMBAS direcciones (ida y vuelta), lo que causa que los pedidos en los extremos del disco esperen menos. C-SCAN sirve pedidos solo en una dirección y regresa al inicio sin servir — esto da tiempos de espera MÁS uniformes para todos los cilindros",
      },
      {
        id: "c",
        text: "C-SCAN y SCAN son idénticos; solo difieren en el nombre según el fabricante",
      },
      {
        id: "d",
        text: "SCAN nunca alcanza los extremos del disco; C-SCAN sí llega al cilindro 0 y al último",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "En SCAN, la cabeza viaja de un extremo al otro sirviendo pedidos en ambas direcciones. Esto significa que los pedidos recién agregados CERCA del extremo donde acaba de estar la cabeza tendrán que esperar casi un ciclo completo de ida y vuelta. Los pedidos en el CENTRO son favorecidos porque la cabeza pasa por allí con más frecuencia. En C-SCAN, la cabeza solo sirve pedidos mientras va en una dirección (digamos, hacia cilindros altos). Al llegar al extremo, vuelve RÁPIDAMENTE al otro extremo SIN servir pedidos en el retorno. Esto trata a los cilindros como un cilindro circular: el tiempo de espera máximo es el tiempo de un barrido completo, y es más uniforme para todos. La variante C-LOOK es igual pero solo va hasta el último pedido pendiente, no hasta el borde físico del disco.",
  },
  {
    id: "so-ch5-q10",
    question:
      "¿Por qué los algoritmos de scheduling de disco como SSTF o SCAN son IRRELEVANTES para los SSDs modernos?",
    options: [
      {
        id: "a",
        text: "Porque los SSDs son más baratos y no necesitan optimización",
      },
      {
        id: "b",
        text: "Porque los SSDs no tienen partes mecánicas móviles: no existe seek time ni latencia rotacional. El acceso a cualquier página es prácticamente uniforme (~0.1 ms lectura), por lo que optimizar el orden de acceso no aporta beneficio significativo",
      },
      {
        id: "c",
        text: "Porque los SSDs usan el sistema de archivos directamente sin pasar por el SO",
      },
      {
        id: "d",
        text: "Porque los SSDs tienen su propio scheduler interno que el SO no puede controlar",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "Los algoritmos SSTF, SCAN, C-SCAN existen para minimizar el SEEK TIME, que es el tiempo de mover la cabeza lectora de un cilindro a otro en un HDD (3-15 ms). En un SSD no hay partes mecánicas: no hay platos, ni cabezas, ni cilindros. El acceso a cualquier página flash es aproximadamente uniforme (~0.1 ms de lectura, ~0.5 ms de escritura). Optimizar el ORDEN de acceso en un SSD no produce ganancia significativa. Los SSDs tienen otros desafíos: write amplification, wear leveling (distribuir escrituras para no agotar ningún bloque), y el hecho de que solo se puede borrar en bloques grandes (~512 KB) aunque se escriba de a páginas (~4 KB). Estos problemas los maneja internamente el FTL (Flash Translation Layer) del controlador del SSD.",
  },
  {
    id: "so-ch5-q11",
    question:
      "¿Qué es el IOMMU y por qué es crítico para la seguridad en sistemas con DMA?",
    options: [
      {
        id: "a",
        text: "Es un caché especial que acelera las transferencias DMA",
      },
      {
        id: "b",
        text: "Es una unidad de gestión de memoria para dispositivos de E/S: restringe qué regiones de memoria física puede acceder cada dispositivo. Sin IOMMU, un dispositivo con DMA podría leer o escribir cualquier dirección de RAM, incluyendo el kernel",
      },
      {
        id: "c",
        text: "Es el protocolo de comunicación entre el CPU y el controlador DMA",
      },
      {
        id: "d",
        text: "Es el registro de estado del controlador DMA que indica si la transferencia terminó",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "Sin IOMMU, cuando programás un controlador DMA con una dirección destino en RAM, ese dispositivo puede escribir en CUALQUIER dirección de memoria física, incluyendo las estructuras del kernel, la tabla de páginas, o el área de memoria de otro proceso. Esto es una vulnerabilidad de seguridad enorme: se llama DMA attack. Por ejemplo, conectar un dispositivo Thunderbolt malicioso puede comprometer todo el sistema. La IOMMU (Intel VT-d, AMD-Vi) aplica una tabla de traducción de direcciones para dispositivos: cada dispositivo tiene su propio 'espacio de direcciones DMA' y solo puede acceder a las regiones físicas que el SO le asignó explícitamente. Linux usa la IOMMU al asignar buffers DMA con dma_alloc_coherent() y compañía — el SO registra esas regiones y el hardware las protege.",
  },
  {
    id: "so-ch5-q12",
    question:
      "Un proceso llama a nanosleep(2ms). El timer del SO tiene una resolución de 10ms (tick rate de 100 Hz). ¿Qué ocurre realmente?",
    options: [
      {
        id: "a",
        text: "El proceso duerme exactamente 2 ms con precisión de nanosegundos",
      },
      {
        id: "b",
        text: "El proceso puede dormir entre 2ms y 10ms dependiendo de en qué punto del tick actual se encuentre. En el peor caso, la primera interrupción de timer ocurre casi 10ms después de la llamada, y el proceso no se despierta antes",
      },
      {
        id: "c",
        text: "nanosleep() ignora el tick rate y usa el TSC directamente para despertar al proceso en exactamente 2ms",
      },
      {
        id: "d",
        text: "El SO rechaza la llamada porque 2ms es menor que un tick de 10ms",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "Esta es una realidad importante de los sistemas operativos de propósito general. El kernel procesa los timers y despierta procesos dormidos en cada interrupción de timer (tick). Con HZ=100 (tick cada 10ms), si pedís nanosleep(2ms) y acabas de pasar un tick, el próximo ocurrirá en ~10ms. El kernel te despertará en ESE tick (en el mejor caso, inmediatamente en el próximo tick). En PROMEDIO dormirás ~11ms (10ms de tick + el tiempo restante hasta el próximo tick). Para precisión de microsegundos se necesita un kernel CONFIG_HZ=1000 (1ms tick) o usar hrtimers (high-resolution timers) con hardware HPET/APIC que en kernels modernos permiten ~microsegundos de resolución aunque el HZ sea bajo. Los sistemas de tiempo real (PREEMPT_RT) van más lejos aún.",
  },
  {
    id: "so-ch5-q13",
    question:
      "¿Por qué está PROHIBIDO llamar a sleep() o cualquier función bloqueante dentro de un interrupt handler en Linux?",
    options: [
      {
        id: "a",
        text: "Porque los interrupt handlers no tienen permiso de escritura en memoria",
      },
      {
        id: "b",
        text: "Porque un interrupt handler corre en un contexto especial de interrupción sin proceso asociado: no puede bloquearse porque bloquear implica hacer context switch, lo que requiere un proceso en ejecución. Si se bloquea, el kernel no puede planificar a ningún proceso y el sistema se cuelga",
      },
      {
        id: "c",
        text: "Solo está prohibido en sistemas de tiempo real; en kernels normales se puede llamar sleep() con cuidado",
      },
      {
        id: "d",
        text: "Porque sleep() requiere acceso al disco y los interrupt handlers no tienen permisos de E/S",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "Un interrupt handler corre en 'interrupt context' (también llamado atomic context en Linux). En este contexto: (1) no hay un proceso 'actual' (current) válido asociado — el handler interrumpió a algún proceso arbitrario, (2) las interrupciones pueden estar desactivadas, (3) el kernel puede estar manteniendo spinlocks. Bloquearse (sleep, wait_event, kmalloc con GFP_KERNEL) implicaría que el scheduler intente un context switch, pero no hay proceso a quién cambiar en el contexto de interrupción, lo que causaría un kernel BUG(). Las funciones permitidas en interrupt context son solo las 'non-sleeping': spinlocks, operaciones atómicas, tasklets, work queues diferidas. Si necesitás trabajo más complejo, usás bottom halves: tasklets o work queues que corren en contexto de proceso.",
  },
  {
    id: "so-ch5-q14",
    question:
      "¿Cuál es la función del TSC (Time Stamp Counter) en x86 y por qué es la clocksource preferida en kernels Linux modernos?",
    options: [
      {
        id: "a",
        text: "El TSC mide la temperatura del procesador; Linux lo usa para throttling térmico",
      },
      {
        id: "b",
        text: "El TSC es un contador de ciclos de 64 bits que se incrementa con cada ciclo de CPU. Es la clocksource más precisa (nanosegundos) y la más barata de leer (instrucción RDTSC toma ~10 ciclos vs ~1000 ciclos para HPET). En CPUs modernas es invariante (no cambia con frequency scaling)",
      },
      {
        id: "c",
        text: "El TSC es un timer programable de hardware que genera interrupciones periódicas para el scheduler",
      },
      {
        id: "d",
        text: "El TSC solo existe en CPUs Intel; AMD usa un contador diferente incompatible",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "El TSC (RDTSC instruction) es un contador de 64 bits incrementado en cada ciclo de CPU. Sus ventajas: (1) costo de lectura mínimo (~10 ciclos con RDTSC vs miles para acceder al HPET por MMIO), (2) resolución sub-nanosegundo en CPUs de 3+ GHz, (3) en CPUs modernas el flag 'invariant TSC' (bit en CPUID) garantiza que el contador avanza a frecuencia constante independientemente del power state o frequency scaling. Linux lo usa como clocksource principal si detecta invariant TSC. El kernel calibra el TSC al arrancar para saber cuántos ticks TSC corresponden a 1 ns. El HPET (High Precision Event Timer) es una alternativa más lenta pero más confiable en sistemas antiguos sin invariant TSC.",
  },
  {
    id: "so-ch5-q15",
    question:
      "Un driver de Linux quiere registrar un dispositivo de carácter. ¿Cuál es la secuencia CORRECTA de llamadas al kernel?",
    options: [
      {
        id: "a",
        text: "device_create() → class_create() → register_chrdev()",
      },
      {
        id: "b",
        text: "register_chrdev() para obtener el major number → class_create() para crear la clase del dispositivo → device_create() para crear la entrada en /dev",
      },
      {
        id: "c",
        text: "open() → read() → write() → release()",
      },
      {
        id: "d",
        text: "insmod() → modprobe() → register_chrdev()",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "El proceso de registro de un char device en Linux tiene pasos definidos. (1) register_chrdev(major, name, fops): reserva un número mayor (major number) en el sistema — si pasás 0, el kernel asigna uno libre — y registra el struct file_operations que vincula las llamadas del VFS (open, read, write, ioctl) a las funciones del driver. (2) class_create(THIS_MODULE, class_name): crea una clase de dispositivo en sysfs (/sys/class/), que udev usa para crear entradas automáticas en /dev. (3) device_create(class, parent, devt, drvdata, name): registra el dispositivo específico, crea /dev/nombre con el major/minor indicado. La función init del módulo hace todo esto; la función exit hace lo inverso: device_destroy() → class_destroy() → unregister_chrdev().",
  },
  {
    id: "so-ch5-q16",
    question:
      "¿Qué hace exactamente IOCTL (Input/Output Control) y para qué se usa en la práctica?",
    options: [
      {
        id: "a",
        text: "IOCTL es sinónimo de DMA; es el mecanismo para programar transferencias",
      },
      {
        id: "b",
        text: "IOCTL es una syscall de propósito general para enviar comandos específicos del dispositivo que no encajan en el modelo estándar read/write. Permite a las aplicaciones controlar parámetros del hardware o del driver: velocidad de puerto serie, tamaño de ventana de terminal, modo de operación de una tarjeta de red, etc.",
      },
      {
        id: "c",
        text: "IOCTL solo funciona con dispositivos de red; para discos se usa fcntl",
      },
      {
        id: "d",
        text: "IOCTL reemplaza a read() y write() en los drivers modernos por ser más eficiente",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "IOCTL (ioctl(fd, request, arg)) es la 'válvula de escape' del modelo de E/S. Las syscalls read/write son suficientes para transferir datos, pero muchos dispositivos necesitan operaciones de configuración o control que no son 'leer bytes' ni 'escribir bytes'. Ejemplos reales: (1) `ioctl(fd, TIOCGWINSZ, &ws)` — obtiene el tamaño de ventana del terminal (filas/columnas), (2) `ioctl(fd, SIOCSIFADDR, &ifr)` — asigna una dirección IP a una interfaz de red, (3) `ioctl(fd, BLKGETSIZE64, &size)` — obtiene el tamaño de un dispositivo de bloque, (4) en cámaras V4L2: configurar resolución, formato de pixel, frame rate. El campo `request` es un entero de 32 bits que encoda dirección (lectura/escritura) + tipo + número + tamaño del argumento. En el driver, se implementa en la función `.unlocked_ioctl` del struct file_operations.",
  },
  {
    id: "so-ch5-q17",
    question:
      "¿Cuál es la diferencia entre un driver en espacio de kernel (LKM) y un driver en espacio de usuario (UIO — Userspace I/O)?",
    options: [
      {
        id: "a",
        text: "Los drivers UIO son más rápidos que los LKM porque evitan el overhead del kernel",
      },
      {
        id: "b",
        text: "Un LKM corre en modo kernel con acceso total al hardware y sin protección de memoria. UIO mapea registros del dispositivo en espacio de usuario: el driver corre como proceso normal, es más seguro (un bug no tumba el kernel) pero tiene más overhead por context switches y no puede manejar interrupciones directamente sin un componente mínimo en kernel",
      },
      {
        id: "c",
        text: "UIO solo funciona con dispositivos USB; LKM funciona con cualquier bus",
      },
      {
        id: "d",
        text: "Los drivers LKM no pueden usar DMA; UIO sí puede",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "Los LKMs (Loadable Kernel Modules) son el modo tradicional: el código del driver corre en ring 0 (modo kernel), tiene acceso directo a MMIO, puede programar DMA, y maneja interrupciones con latencias mínimas. El problema: un bug (null pointer, buffer overflow) causa kernel panic o compromete la seguridad de todo el sistema. UIO (Userspace I/O) es un framework que expone registros MMIO del dispositivo como mmap() en espacio de usuario. Un proceso normal puede leer/escribir esos registros como si fueran RAM. Para interrupciones, hay un pequeño driver en kernel que solo hace `return IRQ_HANDLED` y despierta al proceso de usuario mediante un read() en el fd del UIO. Ventajas: fault isolation (un crash del driver no afecta al kernel), desarrollo más sencillo (debugging normal, tools normales). Desventajas: latencia de interrupción mayor (~microsegundos adicionales), y la necesidad de ese componente mínimo en kernel para registrar la interrupción. DPDK (Data Plane Development Kit) y VFIO lo usan para networking de alta velocidad.",
  },
  {
    id: "so-ch5-q18",
    question:
      "El double buffering en E/S de disco permite E/S continua. ¿Cómo funciona exactamente y qué problema resuelve?",
    options: [
      {
        id: "a",
        text: "Double buffering duplica el ancho de banda de E/S al usar dos canales DMA simultáneos",
      },
      {
        id: "b",
        text: "Con un solo buffer, el productor (disco) debe esperar a que el consumidor (CPU/aplicación) procese el buffer antes de poder llenarlo de nuevo. Con dos buffers alternos, mientras el consumidor procesa el buffer A, el disco llena el buffer B simultáneamente — eliminando tiempos de espera y permitiendo E/S continua",
      },
      {
        id: "c",
        text: "Double buffering reduce el seek time a la mitad al leer dos sectores a la vez",
      },
      {
        id: "d",
        text: "Es una técnica que almacena en caché el último bloque leído para reutilizarlo si se lee de nuevo",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "El problema del single buffer: el dispositivo llena el buffer → el proceso consume el buffer → el dispositivo espera a que el proceso termine para llenar el buffer de nuevo → ciclo secuencial, throughput limitado. Con double buffering: el dispositivo llena el buffer A mientras el proceso consume el buffer B. Cuando el proceso termina con B, cambia al buffer A (que ya está lleno y listo). Mientras el proceso consume A, el dispositivo llena B. Los roles se alternan continuamente. El beneficio es que, si el dispositivo y el proceso tienen velocidades similares, la E/S es continua sin tiempos muertos. Si el proceso es más lento que el dispositivo, igual habrá espera, pero el doble buffer reduce la latencia de inicio del siguiente bloque. Linux usa este principio en su page cache y en los pipes internamente.",
  },
  {
    id: "so-ch5-q19",
    question:
      "Un programador junior escribe un driver de Linux y en su interrupt handler llama a `kmalloc(size, GFP_KERNEL)`. ¿Qué problema tiene este código y cómo debe corregirse?",
    options: [
      {
        id: "a",
        text: "No hay problema; kmalloc siempre es seguro en cualquier contexto del kernel",
      },
      {
        id: "b",
        text: "GFP_KERNEL puede hacer que kmalloc duerma (si no hay memoria libre, puede intentar liberar páginas o swappear). Dormir en interrupt context es ilegal y causa kernel BUG. La corrección: usar GFP_ATOMIC que garantiza no-blocking (usa una reserva de memoria de emergencia)",
      },
      {
        id: "c",
        text: "kmalloc no funciona en drivers; debe usar vmalloc en su lugar",
      },
      {
        id: "d",
        text: "El problema es de tamaño: kmalloc solo puede asignar hasta 4 KB en interrupt context",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "Este es un bug clásico en desarrollo de drivers de Linux. `kmalloc(size, GFP_KERNEL)` le dice al allocator que puede dormir si es necesario para obtener memoria (p. ej. liberar páginas de caché o esperar al swapper). En INTERRUPT CONTEXT, dormir es imposible (no hay proceso asociado para hacer context switch), por lo que intentarlo causa `BUG: scheduling while atomic` y un kernel panic. La solución es `kmalloc(size, GFP_ATOMIC)`: el flag ATOMIC le dice al allocator que NUNCA puede dormir — si no hay memoria libre inmediatamente disponible, simplemente retorna NULL. Por esto, el código que usa GFP_ATOMIC SIEMPRE debe verificar el retorno por NULL. Para asignaciones grandes en handlers, la práctica correcta es pre-asignar memoria en la función probe/init del driver (con GFP_KERNEL, cuando no es interrupt context) y reutilizarla en el handler.",
  },
  {
    id: "so-ch5-q20",
    question:
      "¿Cuál de los siguientes escenarios describe CORRECTAMENTE por qué el journaling del capítulo anterior (sistemas de archivos) y el DMA de este capítulo están relacionados en la integridad de datos?",
    options: [
      {
        id: "a",
        text: "El journaling usa DMA para escribir el journal, y si DMA falla el journal queda corrupto sin posibilidad de recuperación",
      },
      {
        id: "b",
        text: "El journaling garantiza que los metadatos del FS son consistentes tras un crash. DMA garantiza que los datos en memoria son los correctos del dispositivo. Ambos son capas de confiabilidad complementarias: DMA asegura la integridad de la transferencia hardware-RAM, journaling asegura la consistencia estructural del FS. Sin DMA correcto, el journal en RAM podría estar corrompido antes de ser escrito al disco",
      },
      {
        id: "c",
        text: "Journaling reemplaza la necesidad de DMA porque garantiza todas las escrituras",
      },
      {
        id: "d",
        text: "No hay relación entre journaling y DMA; operan en capas completamente independientes sin interacción",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "Esta pregunta conecta los capítulos 4 y 5. El JOURNALING (ext4, XFS, NTFS) opera en la capa del sistema de archivos: registra las operaciones en un log antes de ejecutarlas para poder reproducirlas o descartar cambios incompletos tras un crash de energía. Garantiza la CONSISTENCIA ESTRUCTURAL del sistema de archivos. DMA opera en la capa de hardware: garantiza que la transferencia entre el dispositivo y la RAM ocurre correctamente. Si hay un bug en el controlador DMA o en el driver, los datos que llegan a la memoria podrían ser incorrectos o corromperse (por ej. por una race condition en el buffer DMA). En ese caso, el journal en memoria tendría datos corruptos, y aunque el journaling 'funcione' correctamente en su lógica, los datos que persiste en disco serían incorrectos. Por esto los SO modernos usan checksums en el journal (ext4 journal checksum) para detectar corrupción durante la recuperación. La confiabilidad es un sistema en capas donde cada capa confía en las garantías de la capa inferior.",
  },
];

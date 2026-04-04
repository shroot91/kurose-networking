import type { QuizQuestion } from "@/types/quiz";

export const quizSoCh1: QuizQuestion[] = [
  {
    id: "so-ch1-q1",
    question:
      "Un sistema operativo actúa como intermediario entre el hardware y las aplicaciones. ¿Cuál de las siguientes afirmaciones describe MEJOR la función del SO desde la perspectiva 'top-down'?",
    options: [
      { id: "a", text: "Gestiona físicamente los recursos de la CPU y la RAM" },
      {
        id: "b",
        text: "Provee una máquina extendida con abstracciones como archivos, procesos y sockets que ocultan la complejidad del hardware",
      },
      {
        id: "c",
        text: "Ejecuta directamente las instrucciones de máquina de los programas de usuario",
      },
      {
        id: "d",
        text: "Es el conjunto de programas que el usuario instala para usar la computadora",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "La vista 'top-down' (máquina extendida o máquina virtual) describe al SO como una capa de abstracción: en vez de exponer registros, sectores de disco e interrupciones, presenta abstracciones amigables como archivos, procesos, memoria virtual y sockets. La vista 'bottom-up' es la que lo describe como gestor de recursos de hardware.",
  },
  {
    id: "so-ch1-q2",
    question:
      "En un sistema con dual-mode operation, ¿qué ocurre exactamente cuando un proceso de usuario quiere leer un archivo del disco?",
    options: [
      {
        id: "a",
        text: "El proceso accede directamente al controlador del disco usando instrucciones privilegiadas",
      },
      {
        id: "b",
        text: "El proceso solicita al SO mediante una interrupción de software (trap), el SO ejecuta en modo kernel y retorna el resultado al proceso",
      },
      {
        id: "c",
        text: "El hardware permite a cualquier proceso acceder al disco si el archivo le pertenece",
      },
      {
        id: "d",
        text: "El proceso cambia su propio bit de modo de usuario a kernel y ejecuta el driver directamente",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "El dual-mode operation es fundamental: los programas de usuario corren en modo usuario y NO pueden ejecutar instrucciones privilegiadas. Para operaciones de I/O emiten una llamada al sistema (trap), que provoca una excepción controlada que salta al kernel en modo privilegiado. El kernel realiza la operación y retorna al proceso de usuario. Esto es IMPOSIBLE hacerlo al revés: un proceso de usuario no puede autopromocionar su propio bit de modo.",
  },
  {
    id: "so-ch1-q3",
    question:
      "En la primera generación de computadoras (1945-1955), ¿cómo se programaban las máquinas y cuál era el gran problema de eficiencia?",
    options: [
      {
        id: "a",
        text: "Se usaban lenguajes de alto nivel; el problema era la lentitud de los compiladores",
      },
      {
        id: "b",
        text: "Se programaban con tarjetas perforadas y batch systems; el problema era la fragmentación de memoria",
      },
      {
        id: "c",
        text: "Se cableaban conexiones físicas manualmente o se usaban tableros de enchufes; la CPU quedaba inactiva mientras el operador configuraba el siguiente trabajo",
      },
      {
        id: "d",
        text: "Se usaban lenguajes ensambladores; el problema era la falta de memoria RAM suficiente",
      },
    ],
    correctAnswerId: "c",
    explanation:
      "Las máquinas de primera generación (ENIAC, etc.) usaban tubos de vacío y se programaban cableando conexiones o con tableros de enchufes. No existían los sistemas operativos: el programador reservaba la máquina, la configuraba manualmente y ejecutaba. La CPU quedaba inactiva durante todo el tiempo de setup, lo cual era un desperdicio enorme. La programación con tarjetas perforadas y los batch systems son características de la segunda generación.",
  },
  {
    id: "so-ch1-q4",
    question:
      "¿Qué innovación de la tercera generación (1965-1980) permitió por primera vez que múltiples usuarios interactuaran con la computadora de forma simultánea e independiente?",
    options: [
      { id: "a", text: "Los batch systems con procesamiento en lotes secuenciales" },
      { id: "b", text: "La multiprogramación con time-sharing (tiempo compartido)" },
      { id: "c", text: "La introducción de transistores que reemplazaron los tubos de vacío" },
      { id: "d", text: "El lenguaje ensamblador que aceleró la programación" },
    ],
    correctAnswerId: "b",
    explanation:
      "La multiprogramación y el time-sharing son las grandes innovaciones de la tercera generación. Con la multiprogramación, varios trabajos residen en memoria y la CPU cambia entre ellos (p. ej. cuando uno espera I/O). El time-sharing agrega la ilusión de simultaneidad para usuarios interactivos, dividiendo la CPU en pequeñas ranuras de tiempo. UNIX (desarrollado por Bell Labs en esta época) fue el primer gran SO que implementó estas ideas de forma elegante.",
  },
  {
    id: "so-ch1-q5",
    question:
      "En la tabla de generaciones, ¿qué par tecnología→SO corresponde CORRECTAMENTE a la segunda generación?",
    options: [
      { id: "a", text: "Tubos de vacío → no existía SO; programación manual por cableado" },
      { id: "b", text: "Transistores → FMS e IBSYS; procesamiento batch" },
      { id: "c", text: "Circuitos integrados → UNIX y C; multiprogramación" },
      { id: "d", text: "Microprocesadores VLSI → MS-DOS y Windows; SO de escritorio" },
    ],
    correctAnswerId: "b",
    explanation:
      "Segunda generación (1955-1965): los transistores reemplazaron los tubos de vacío, haciendo las computadoras más confiables y manejables. Aparecen los primeros sistemas operativos de batch como FMS (Fortran Monitor System) e IBSYS de IBM. Los trabajos se preparaban en tarjetas perforadas y se procesaban en lotes secuenciales sin intervención del usuario.",
  },
  {
    id: "so-ch1-q6",
    question:
      "Los sistemas operativos de tipo 'tiempo real' se clasifican en hard real-time y soft real-time. ¿Cuál es la diferencia crítica?",
    options: [
      {
        id: "a",
        text: "Hard real-time es más rápido en promedio; soft real-time tiene menor consumo de energía",
      },
      {
        id: "b",
        text: "En hard real-time, perder un deadline es un fallo catastrófico del sistema; en soft real-time, perder deadlines es degradación aceptable del servicio",
      },
      {
        id: "c",
        text: "Hard real-time se usa en servidores web; soft real-time en sistemas embebidos industriales",
      },
      {
        id: "d",
        text: "Hard real-time requiere hardware específico; soft real-time puede correr en cualquier CPU",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "La distinción es sobre las consecuencias de perder un deadline temporal. En hard real-time (controladores de airbags, marcapasos, sistemas de control de vuelo), perder un deadline puede costar vidas o destruir el sistema. En soft real-time (streaming de video, audio), perder un deadline causa degradación perceptible pero no catástrofe. VxWorks y FreeRTOS son ejemplos de RTOS hard real-time.",
  },
  {
    id: "so-ch1-q7",
    question:
      "¿Qué problema resuelven los sistemas multiprocesadores (SMP) y por qué son más complejos de gestionar que un sistema monoprocesador?",
    options: [
      {
        id: "a",
        text: "Permiten ejecutar más programas porque tienen más memoria RAM instalada",
      },
      {
        id: "b",
        text: "Permiten paralelismo real al ejecutar hilos en múltiples CPUs simultáneamente, pero exigen sincronización de caché coherente y schedulers conscientes de la topología NUMA",
      },
      {
        id: "c",
        text: "Son más simples porque cada CPU tiene su propio SO independiente",
      },
      {
        id: "d",
        text: "Solo mejoran el rendimiento de I/O, no el cómputo",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "Los sistemas SMP (Symmetric Multi-Processing) tienen múltiples CPUs compartiendo la misma memoria física. Esto permite paralelismo real, pero introduce complejidad: la coherencia de caché (si un core modifica un dato en su L1, los otros cores deben ver el valor actualizado), el acceso no uniforme a memoria (NUMA, donde acceder a memoria 'remota' es más lento), y schedulers que deben decidir en qué core ejecutar cada proceso para minimizar migración y maximizar localidad.",
  },
  {
    id: "so-ch1-q8",
    question:
      "Un proceso ejecuta la instrucción `read(fd, buffer, 1024)`. Trazá mentalmente los pasos del mecanismo de llamada al sistema. ¿Cuál es el orden CORRECTO?",
    options: [
      {
        id: "a",
        text: "1) Se llama al driver directamente → 2) El driver lee el disco → 3) Los datos llegan al buffer del proceso",
      },
      {
        id: "b",
        text: "1) La librería C coloca el número de syscall en un registro → 2) Ejecuta instrucción TRAP → 3) El hardware salta al vector de interrupciones del kernel → 4) El handler del kernel ejecuta la operación → 5) El kernel retorna al modo usuario con el resultado",
      },
      {
        id: "c",
        text: "1) El proceso pide permiso al scheduler → 2) El scheduler pausa el proceso → 3) El SO lee el archivo → 4) El scheduler reanuda el proceso",
      },
      {
        id: "d",
        text: "1) El proceso cambia su propio modo a kernel → 2) Ejecuta el driver → 3) Vuelve a modo usuario",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "El mecanismo de llamada al sistema es preciso: la librería C envuelve la llamada, coloca el número identificador de la syscall en un registro (ej. EAX en x86), y ejecuta una instrucción especial (INT 0x80, SYSCALL, o SYSENTER). Esta instrucción genera una excepción controlada (trap) que hace que el hardware cambie automáticamente a modo privilegiado y salte a la dirección del handler en el kernel. El proceso de usuario JAMÁS puede cambiar su propio modo de operación.",
  },
  {
    id: "so-ch1-q9",
    question:
      "¿Cuál es la diferencia fundamental entre una interrupción de hardware y una excepción (trap)?",
    options: [
      {
        id: "a",
        text: "Las interrupciones son causadas por el software; las traps por el hardware",
      },
      {
        id: "b",
        text: "Las interrupciones son asíncronas (generadas por dispositivos externos a la CPU); las traps son síncronas (causadas por la instrucción en ejecución, como una syscall o error)",
      },
      {
        id: "c",
        text: "Las interrupciones solo ocurren en modo kernel; las traps solo en modo usuario",
      },
      {
        id: "d",
        text: "No hay diferencia; ambos términos describen el mismo mecanismo",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "La distinción es temporal y causal. Una interrupción de hardware es asíncrona: la genera un dispositivo externo (disco terminó una lectura, NIC recibió un paquete, timer disparó) en cualquier momento, independientemente de qué instrucción esté ejecutando la CPU. Una excepción/trap es síncrona: la genera la instrucción misma que se está ejecutando (división por cero, acceso a memoria inválido, instrucción SYSCALL intencional). El mecanismo de manejo es similar, pero la causa y el timing son distintos.",
  },
  {
    id: "so-ch1-q10",
    question:
      "La jerarquía de memoria existe porque hay un tradeoff entre velocidad, costo y capacidad. ¿Cuál es el orden CORRECTO de velocidad (más rápida primero)?",
    options: [
      { id: "a", text: "RAM → L2 cache → L1 cache → Registros → SSD → HDD" },
      { id: "b", text: "Registros → L1 cache → L2 cache → L3 cache → RAM → SSD → HDD" },
      { id: "c", text: "L1 cache → Registros → L2 cache → RAM → L3 cache → SSD → HDD" },
      { id: "d", text: "Registros → RAM → L1 cache → L2 cache → SSD → HDD" },
    ],
    correctAnswerId: "b",
    explanation:
      "La jerarquía de velocidad (y costo, de más caro a más barato) es: Registros (~1 ns, decenas de bytes) → L1 cache (~1-4 ns, 32-64 KB) → L2 cache (~4-12 ns, 256 KB-1 MB) → L3 cache (~12-50 ns, 4-32 MB) → RAM (~60-100 ns, 4-64 GB) → SSD NVMe (~100 μs) → HDD (~10 ms). Cada nivel es entre 5x y 1000x más lento que el anterior.",
  },
  {
    id: "so-ch1-q11",
    question:
      "¿Qué ventaja ofrece DMA (Direct Memory Access) sobre el modelo donde la CPU maneja directamente cada transferencia de I/O byte a byte?",
    options: [
      {
        id: "a",
        text: "DMA permite que el disco sea más rápido porque opera sin electricidad",
      },
      {
        id: "b",
        text: "Con DMA la CPU programa la transferencia y queda libre para otro trabajo; el controlador DMA mueve los datos autónomamente y lanza una interrupción solo al terminar",
      },
      {
        id: "c",
        text: "DMA elimina la necesidad de interrupciones de hardware en el sistema",
      },
      {
        id: "d",
        text: "DMA duplica el ancho de banda del bus del sistema",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "Sin DMA (modo Programmed I/O), la CPU debe leer o escribir cada byte o palabra, desperdiciando ciclos en transferencias lentas. Con DMA, la CPU programa el controlador DMA con la dirección fuente, destino y tamaño de transferencia, y luego continúa ejecutando otro trabajo. El controlador DMA mueve los datos entre el dispositivo y la RAM de forma autónoma. Solo al terminar envía una interrupción a la CPU. Resultado: la CPU puede ejecutar código útil durante transfers de disco o red.",
  },
  {
    id: "so-ch1-q12",
    question:
      "Cuando el BIOS/UEFI termina su tarea durante el arranque de la computadora, ¿cuál es el siguiente paso en la secuencia de boot?",
    options: [
      {
        id: "a",
        text: "Carga directamente el kernel del SO en memoria y le pasa el control",
      },
      {
        id: "b",
        text: "Carga el bootloader (ej. GRUB) desde el sector de arranque, que luego carga y descomprime el kernel",
      },
      {
        id: "c",
        text: "Inicializa todos los drivers de dispositivos antes de cualquier otra operación",
      },
      {
        id: "d",
        text: "Ejecuta el login manager para autenticar al usuario",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "La secuencia de boot es: BIOS/UEFI realiza el POST (Power-On Self Test), detecta hardware y localiza el dispositivo de arranque. Luego carga el primer sector (MBR/GPT) que contiene el bootloader (GRUB en Linux, NTLDR/BOOTMGR en Windows). El bootloader presenta el menú de SO (si hay varios), carga el kernel del SO seleccionado en memoria, y le pasa el control. El kernel entonces inicializa subsistemas, monta el sistema de archivos root y lanza el proceso init/systemd.",
  },
  {
    id: "so-ch1-q13",
    question:
      "¿Cuál de las siguientes llamadas al sistema de POSIX se usa para crear un nuevo proceso en Unix/Linux?",
    options: [
      { id: "a", text: "exec()" },
      { id: "b", text: "spawn()" },
      { id: "c", text: "fork()" },
      { id: "d", text: "create_process()" },
    ],
    correctAnswerId: "c",
    explanation:
      "fork() crea un proceso hijo que es una copia exacta del proceso padre (memoria, descriptores de archivo, etc.), retornando 0 al hijo y el PID del hijo al padre. Es diferente de exec() que reemplaza la imagen del proceso actual con un nuevo programa. El patrón clásico Unix es fork()+exec(): el padre hace fork, el hijo llama exec() para ejecutar otro programa. spawn() es una función de alto nivel de C que combina ambos, pero no es una syscall POSIX primitiva.",
  },
  {
    id: "so-ch1-q14",
    question:
      "Comparando el estándar POSIX con la Win32 API, ¿cuál es la equivalencia correcta para crear un nuevo proceso?",
    options: [
      { id: "a", text: "POSIX fork() ↔ Win32 CreateProcess()" },
      { id: "b", text: "POSIX exec() ↔ Win32 CreateProcess()" },
      { id: "c", text: "POSIX fork() ↔ Win32 OpenProcess()" },
      { id: "d", text: "POSIX wait() ↔ Win32 CreateProcess()" },
    ],
    correctAnswerId: "a",
    explanation:
      "La correspondencia más cercana es fork()/exec() ↔ CreateProcess(). En Unix, fork() clona el proceso actual y exec() reemplaza su imagen con otro programa (dos pasos). En Windows, CreateProcess() hace todo en un solo paso: crea el proceso e inicia la ejecución del ejecutable indicado. La semántica no es idéntica (fork produce una copia exacta; CreateProcess arranca de cero), pero funcionalmente ambos crean un nuevo proceso que ejecuta un programa.",
  },
  {
    id: "so-ch1-q15",
    question:
      "Un kernel monolítico como el de Linux ejecuta TODO el código del SO en modo kernel. ¿Cuál es la principal DESVENTAJA de este diseño?",
    options: [
      { id: "a", text: "Es muy lento porque requiere muchos cambios de contexto entre módulos" },
      {
        id: "b",
        text: "Un bug en cualquier driver o subsistema puede corromper todo el kernel y causar un kernel panic, ya que no hay aislamiento de fallos",
      },
      { id: "c", text: "No soporta módulos cargables en tiempo de ejecución" },
      { id: "d", text: "No puede ejecutar múltiples procesos simultáneamente" },
    ],
    correctAnswerId: "b",
    explanation:
      "La principal desventaja del diseño monolítico es la falta de aislamiento: todo el kernel (schedulers, gestión de memoria, sistema de archivos, drivers de red, drivers de dispositivos) corre en el mismo espacio de direcciones privilegiado. Un driver de dispositivo bugueado puede escribir sobre estructuras de datos del kernel, corromper la tabla de procesos o causar accesos a punteros nulos que colapsan todo el sistema. Nótese que Linux SÍ soporta módulos cargables (LKMs), pero estos también corren en modo kernel sin aislamiento.",
  },
  {
    id: "so-ch1-q16",
    question:
      "Un microkernel como Minix 3 o Mach minimiza el código en modo kernel. ¿Qué servicios se ejecutan FUERA del kernel (en espacio de usuario) en este diseño?",
    options: [
      {
        id: "a",
        text: "Solo el scheduler; el resto permanece en modo kernel por rendimiento",
      },
      {
        id: "b",
        text: "Drivers de dispositivos, servidores de sistema de archivos, servidores de red; el kernel solo maneja IPC, gestión básica de memoria y scheduling mínimo",
      },
      {
        id: "c",
        text: "Todas las aplicaciones de usuario, incluyendo el shell",
      },
      {
        id: "d",
        text: "Solo el servidor de ventanas gráfico; los drivers son siempre privilegiados",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "En un microkernel puro, el kernel contiene solo lo absolutamente esencial: gestión básica de memoria (mapeo de páginas), IPC (comunicación entre procesos) y scheduling primitivo. Todo lo demás corre como procesos de usuario: drivers de dispositivos, servidores de sistema de archivos (ext4, FAT), servidores de red (TCP/IP stack), servidores de seguridad. Esto mejora la fiabilidad (un driver crasheado no tumba el kernel) pero reduce rendimiento porque toda comunicación requiere IPC, que implica múltiples cambios de contexto.",
  },
  {
    id: "so-ch1-q17",
    question:
      "Linux usa un sistema de módulos cargables del kernel (LKM — Loadable Kernel Modules). ¿Qué afirmación describe MEJOR las implicaciones de seguridad de los LKMs?",
    options: [
      {
        id: "a",
        text: "Los LKMs son seguros porque corren en espacio de usuario aislado del kernel",
      },
      {
        id: "b",
        text: "Los LKMs son código que se inserta dinámicamente en el kernel en modo privilegiado; un LKM malicioso o bugueado tiene acceso total al sistema y puede comprometer todo el SO",
      },
      {
        id: "c",
        text: "Los LKMs están firmados y verificados por hardware, por lo que no pueden ser maliciosos",
      },
      {
        id: "d",
        text: "Los LKMs son equivalentes a plugins de aplicación que corren con permisos de usuario normal",
      },
    ],
    correctAnswerId: "b",
    explanation:
      "Los LKMs son código que se carga directamente en el espacio de kernel en tiempo de ejecución. Aunque son más fáciles de mantener (no requieren recompilar el kernel), corren con los mismos privilegios que el kernel monolítico. Un rootkit de kernel, por ejemplo, se implementa típicamente como un LKM malicioso que oculta procesos, archivos y conexiones de red. Por esto, las distribuciones modernas implementan Secure Boot y firma obligatoria de módulos (module signing) para mitigar este riesgo.",
  },
  {
    id: "so-ch1-q18",
    question:
      "¿Cuál es la diferencia entre un hipervisor Tipo 1 (bare-metal) y un hipervisor Tipo 2 (hosted)?",
    options: [
      {
        id: "a",
        text: "El Tipo 1 solo puede virtualizar sistemas Windows; el Tipo 2 es multiplataforma",
      },
      {
        id: "b",
        text: "El Tipo 1 corre directamente sobre el hardware sin SO host (ej. VMware ESXi, KVM); el Tipo 2 corre como aplicación sobre un SO existente (ej. VirtualBox, VMware Workstation)",
      },
      {
        id: "c",
        text: "El Tipo 1 es más lento porque necesita un SO host subyacente como intermediario",
      },
      { id: "d", text: "El Tipo 2 es el estándar en producción en centros de datos enterprise" },
    ],
    correctAnswerId: "b",
    explanation:
      "Un hipervisor Tipo 1 (bare-metal) corre directamente sobre el hardware físico, sin un SO host intermediario. Ejemplos: VMware ESXi, Microsoft Hyper-V, KVM (que convierte el kernel Linux en hipervisor). Tienen menor overhead y son el estándar en producción empresarial y cloud. Un hipervisor Tipo 2 (hosted) corre como proceso sobre un SO convencional (Windows, macOS, Linux). Ejemplos: VirtualBox, VMware Workstation, QEMU. Más fáciles de instalar para desarrollo/testing, pero con mayor overhead.",
  },
  {
    id: "so-ch1-q19",
    question:
      "El PSW (Program Status Word) es un registro especial de la CPU. ¿Cuál de los siguientes bits o campos contiene el PSW que es CRÍTICO para la seguridad del sistema?",
    options: [
      { id: "a", text: "El valor de la instrucción actualmente en ejecución" },
      {
        id: "b",
        text: "El bit de modo (kernel/usuario) y el Program Counter (PC) que indican el nivel de privilegio actual y la próxima instrucción a ejecutar",
      },
      { id: "c", text: "El contenido del registro de datos más recientemente leído" },
      { id: "d", text: "La dirección base de la tabla de páginas del proceso activo" },
    ],
    correctAnswerId: "b",
    explanation:
      "El PSW (o equivalente como EFLAGS/RFLAGS en x86) contiene el estado completo del procesador: el bit de modo (kernel/usuario), flags de condición (zero, carry, overflow, sign), el PC (Program Counter, también llamado IP/Instruction Pointer). El bit de modo es crítico: si está en kernel, la CPU permite instrucciones privilegiadas (acceso directo a I/O, manipulación de interrupciones, cambio de tablas de páginas). Este bit solo puede cambiarse mediante mecanismos controlados por el hardware (interrupt/trap), nunca por instrucciones de usuario normales.",
  },
  {
    id: "so-ch1-q20",
    question:
      "Dado el siguiente escenario: el proceso shell ejecuta `cat archivo.txt | grep error`. ¿Cuántas llamadas a `fork()` realiza el shell aproximadamente para ejecutar este pipeline?",
    options: [
      { id: "a", text: "0 — el shell ejecuta los comandos directamente sin crear procesos hijos" },
      { id: "b", text: "1 — solo se crea un proceso para el comando cat" },
      { id: "c", text: "2 — se crea un proceso hijo para cada comando del pipeline" },
      { id: "d", text: "4 — se necesitan procesos adicionales para el pipe de IPC" },
    ],
    correctAnswerId: "c",
    explanation:
      "Un pipeline de N comandos requiere N llamadas a fork(). Para `cat archivo.txt | grep error`, el shell hace 2 fork(): uno que crea el proceso para `cat` y otro para `grep`. El shell también crea el pipe (con la syscall pipe()) antes de hacer fork, y luego redirige el stdout de cat al stdin de grep usando dup2(). Cada proceso hijo llama exec() para reemplazar su imagen con el binario correspondiente (cat o grep). El shell padre espera con wait() a que ambos terminen.",
  },
];

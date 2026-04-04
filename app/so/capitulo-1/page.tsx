import { soChapters } from "@/data/so-chapters";
import { ChapterLayout } from "@/components/layout/chapter-layout";
import { SectionBlock } from "@/components/content/section-block";
import { ConceptCard } from "@/components/content/concept-card";
import { ExampleBlock } from "@/components/content/example-block";
import { ComparisonTable } from "@/components/content/comparison-table";
import { InfoCallout } from "@/components/content/info-callout";
import { QuizContainer } from "@/components/quiz/quiz-container";
import { quizSoCh1 } from "@/data/quiz-so-ch1";
import {
  Cpu,
  Server,
  Shield,
  Layers,
  HardDrive,
  Zap,
  Clock,
  Box,
  Network,
  MemoryStick,
  Terminal,
  Microchip,
  GitMerge,
  Building2,
} from "lucide-react";

const chapter = soChapters[0];

export default function SOCapitulo1() {
  return (
    <ChapterLayout chapter={chapter} allChapters={soChapters}>
      {/* ============================================ */}
      {/* SECCIÓN 1: ¿Qué es un SO? */}
      {/* ============================================ */}
      <SectionBlock id="que-es-so" title="¿Qué es un SO?">
        <p className="text-muted leading-relaxed">
          Un sistema operativo es el software más importante de la computadora.
          Su función esencial es <strong>gestionar el hardware</strong> y
          presentarlo a los programas de una manera usable, abstraída y segura.
          Pero hay dos maneras completamente distintas de ver ese rol, y ambas
          son igualmente válidas.
        </p>

        <InfoCallout variant="info" title="Analogía: el SO como gerente de hotel">
          <p>
            Imaginá que el hardware es un hotel de lujo: tiene habitaciones
            (memoria RAM), restaurante con mesas (CPU), estacionamiento (disco),
            y una central telefónica (red). El <strong>gerente del hotel</strong>{" "}
            — el SO — es quien asigna habitaciones, gestiona las reservas,
            cobra los recursos usados y resuelve conflictos cuando dos huéspedes
            (procesos) quieren la misma habitación al mismo tiempo. Los huéspedes
            no interactúan directamente con la infraestructura del hotel; hablan
            con el gerente, que lo hace por ellos.
          </p>
        </InfoCallout>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Vista Top-Down: Máquina Extendida"
            icon={Layers}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <p>
              Desde arriba, el SO es una{" "}
              <strong>máquina virtual más amigable</strong> que el hardware
              desnudo. En vez de exponer registros del disco, pistas, sectores y
              cilindros, provee la abstracción de <em>archivo</em>. En vez de
              exponer interrupciones de teclado y accesos a puertos de memoria,
              provee la abstracción de <em>proceso</em> con una función
              bloqueante <code>read()</code>.
            </p>
            <p className="mt-2 text-sm">
              Esta vista es la del programador de aplicaciones: el SO como una
              API que hace posible escribir código sin saber si el disco es NVMe,
              SATA o red (NFS).
            </p>
          </ConceptCard>

          <ConceptCard
            title="Vista Bottom-Up: Gestor de Recursos"
            icon={Server}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p>
              Desde abajo, el SO es un{" "}
              <strong>gestor de recursos de hardware</strong> que resuelve
              conflictos cuando múltiples programas quieren usar la misma CPU,
              la misma memoria o el mismo dispositivo al mismo tiempo. Decide
              quién usa qué, cuándo y por cuánto tiempo.
            </p>
            <p className="mt-2 text-sm">
              Esta vista es la del diseñador del SO: multiplexación de recursos,
              políticas de scheduling, protección entre procesos.
            </p>
          </ConceptCard>
        </div>

        <h3 className="text-lg font-semibold mt-8 mb-4">
          Dual-Mode Operation: la base de la protección
        </h3>

        <p className="text-muted leading-relaxed">
          Toda la seguridad del SO depende de un mecanismo de hardware:{" "}
          <strong>dos modos de operación de la CPU</strong>. Sin este mecanismo,
          cualquier programa podría corromper el SO o los datos de otro programa.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Modo Kernel (Supervisor Mode)"
            icon={Shield}
            color="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:border-orange-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>Acceso completo a todo el hardware</li>
              <li>
                Puede ejecutar <strong>instrucciones privilegiadas</strong>:
                acceso directo a I/O, manipulación de interrupciones, cambio de
                tablas de páginas
              </li>
              <li>Solo el kernel del SO corre en este modo</li>
              <li>
                Un error en modo kernel puede colapsar todo el sistema (kernel
                panic / BSOD)
              </li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="Modo Usuario (User Mode)"
            icon={Box}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>Acceso restringido al hardware</li>
              <li>
                Las instrucciones privilegiadas están <strong>prohibidas</strong>{" "}
                — generan una excepción
              </li>
              <li>
                Todos los programas de usuario, incluidos navegadores, editores y
                servidores web, corren aquí
              </li>
              <li>
                Un error en modo usuario solo afecta al proceso en cuestión
              </li>
            </ul>
          </ConceptCard>
        </div>

        <ExampleBlock title="¿Cómo cruza un proceso la frontera kernel/usuario?">
          <p>
            Un proceso en modo usuario quiere leer un archivo. No puede acceder
            al disco directamente — eso es una instrucción privilegiada. Entonces
            ejecuta una <strong>llamada al sistema</strong>, que internamente:
          </p>
          <ol className="list-decimal list-inside space-y-1 mt-2">
            <li>
              Coloca el número de syscall en un registro (ej. EAX = 0 para{" "}
              <code>read</code> en Linux x86-64)
            </li>
            <li>
              Ejecuta la instrucción <code>SYSCALL</code> (o{" "}
              <code>INT 0x80</code> en x86 legacy)
            </li>
            <li>
              El hardware cambia automáticamente al modo kernel y salta al{" "}
              <em>vector de interrupciones</em> del SO
            </li>
            <li>El handler del kernel valida los parámetros y ejecuta la I/O</li>
            <li>
              El kernel retorna al proceso de usuario con el resultado y vuelve a
              modo usuario
            </li>
          </ol>
          <p className="mt-2 text-sm italic">
            Este mecanismo — el <strong>trap</strong> — es la única puerta de
            entrada legal al kernel. Un proceso de usuario JAMÁS puede cambiar su
            propio bit de modo de CPU.
          </p>
        </ExampleBlock>

        <InfoCallout variant="warning" title="Interrupciones vs Traps vs Excepciones">
          <p>
            Tres conceptos relacionados que se confunden frecuentemente:
          </p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>
              <strong>Interrupción de hardware:</strong> generada por un
              dispositivo externo (disco terminó una operación, NIC recibió un
              paquete, timer expiró). Es <em>asíncrona</em> — ocurre en cualquier
              momento.
            </li>
            <li>
              <strong>Trap (syscall):</strong> generada intencionalmente por el
              programa de usuario para solicitar un servicio del SO. Es{" "}
              <em>síncrona</em> — la causa directamente la instrucción en
              ejecución.
            </li>
            <li>
              <strong>Excepción:</strong> error en la instrucción en ejecución
              (división por cero, acceso a memoria inválida). También{" "}
              <em>síncrona</em>.
            </li>
          </ul>
        </InfoCallout>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 2: Historia por Generaciones */}
      {/* ============================================ */}
      <SectionBlock id="historia" title="Historia por Generaciones">
        <p className="text-muted leading-relaxed">
          Los sistemas operativos no aparecieron de un día para otro. Evolucionaron
          durante décadas, y cada generación resolvió el problema de ineficiencia
          dejado por la anterior. Entender la historia es entender{" "}
          <em>por qué</em> el SO moderno tiene las características que tiene.
        </p>

        <ComparisonTable
          headers={[
            "Generación",
            "Período",
            "Tecnología HW",
            "Sistema Operativo",
            "Problema resuelto / dejado",
          ]}
          rows={[
            [
              "1ª",
              "1945-1955",
              "Tubos de vacío",
              "No existía — programación manual por cables y tableros",
              "CPU inactiva durante setup manual → enorme desperdicio",
            ],
            [
              "2ª",
              "1955-1965",
              "Transistores",
              "Batch systems: FMS, IBSYS (IBM 7094)",
              "Resuelve: turnos de operador. Problema: CPU inactiva en I/O",
            ],
            [
              "3ª",
              "1965-1980",
              "Circuitos integrados (IC)",
              "Multiprogramación, time-sharing; OS/360, UNIX, C",
              "Resuelve: CPU ociosa en I/O, interactividad. Problema: complejidad",
            ],
            [
              "4ª",
              "1980-hoy",
              "Microprocesadores VLSI",
              "SO de escritorio: MS-DOS, macOS, Windows, Linux",
              "Resuelve: precio accesible para usuarios. Nuevos retos: seguridad y distribución",
            ],
          ]}
        />

        <div className="grid gap-4 sm:grid-cols-2 mt-6">
          <ConceptCard
            title="1ª Gen: La Era de los Tubos de Vacío"
            icon={Zap}
            color="bg-card text-foreground border-border"
          >
            <p className="text-sm">
              ENIAC (1945) y sus contemporáneos usaban miles de tubos de vacío.
              La programación era <em>física</em>: se reconectaban cables en un
              tablero para cada nuevo programa. No existía el concepto de software
              separado del hardware. Un solo grupo de investigadores usaba la
              máquina completa, y el tiempo de setup podía superar al tiempo de
              cómputo.
            </p>
          </ConceptCard>

          <ConceptCard
            title="2ª Gen: Transistores y Batch Systems"
            icon={Clock}
            color="bg-card text-foreground border-border"
          >
            <p className="text-sm">
              Los transistores (inventados en 1947) reemplazaron los tubos de vacío
              en la década del 50. Las computadoras se volvieron más confiables y
              manejables. Aparecen los primeros lenguajes de alto nivel (FORTRAN,
              COBOL) y los primeros SO batch: el operador acumulaba trabajos en
              tarjetas perforadas, los procesaba en lotes y recogía los resultados
              impresos. No había interactividad alguna.
            </p>
          </ConceptCard>

          <ConceptCard
            title="3ª Gen: IC, Multiprogramación y UNIX"
            icon={Cpu}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <p className="text-sm">
              Los circuitos integrados permitieron computadoras más pequeñas y
              baratas. La gran innovación fue la{" "}
              <strong>multiprogramación</strong>: mientras un proceso espera I/O,
              la CPU ejecuta otro. Esto requería gestión de memoria más sofisticada.
              El <strong>time-sharing</strong> agregó la ilusión de simultaneidad
              para múltiples usuarios interactivos. UNIX (Bell Labs, 1969),
              escrito inicialmente en ensamblador y reescrito en C (1973), se
              convirtió en el SO de referencia de la era.
            </p>
          </ConceptCard>

          <ConceptCard
            title="4ª Gen: Microprocesadores y SO de Escritorio"
            icon={MemoryStick}
            color="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800"
          >
            <p className="text-sm">
              Intel 4004 (1971), 8086 (1978), y la revolución VLSI pusieron una
              computadora en cada escritorio. MS-DOS (1981) fue simple y de un
              solo usuario. Apple Macintosh (1984) introdujo la interfaz gráfica
              de ventanas al público masivo. Windows y Linux (1991, Linus Torvalds)
              llevaron la multiprogramación y la interfaz amigable a la masividad.
              Hoy, SO de 64 bits gestionan terabytes de RAM y miles de CPUs
              virtuales en la nube.
            </p>
          </ConceptCard>
        </div>

        <InfoCallout variant="tip" title="¿Por qué importa la historia?">
          <p>
            Cada característica del SO moderno — multiprogramación, memoria
            virtual, llamadas al sistema, sistemas de archivos — existe porque
            alguien en alguna generación tuvo que resolver un problema real de
            ineficiencia. Cuando entendés la historia, los conceptos modernos
            dejan de ser arbitrarios y tienen sentido causal.
          </p>
        </InfoCallout>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 3: Tipos de Sistemas Operativos */}
      {/* ============================================ */}
      <SectionBlock id="tipos-so" title="Tipos de Sistemas Operativos">
        <p className="text-muted leading-relaxed">
          No todos los SO son iguales. Las distintas categorías de hardware —
          desde servidores de data center hasta tarjetas inteligentes — imponen
          restricciones y objetivos radicalmente diferentes. Conocer los tipos es
          conocer el espacio de diseño de los SO.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ConceptCard
            title="Mainframes"
            icon={Building2}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p className="text-sm">
              Máquinas de sala destinadas a procesar <strong>miles de
              transacciones por segundo</strong> con cientos de usuarios
              simultáneos. IBM z/OS es el SO reinante. Optimizados para{" "}
              <em>throughput masivo</em>, alta disponibilidad (&gt;99.999%) y
              confiabilidad. Los bancos y aerolíneas todavía los usan para
              procesar pagos y reservas.
            </p>
          </ConceptCard>

          <ConceptCard
            title="Servidores"
            icon={Server}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <p className="text-sm">
              Linux y Windows Server dominan este segmento. El objetivo es
              gestionar múltiples servicios concurrentes: web, base de datos,
              correo. El SO debe ser <strong>escalable</strong> (manejar picos de
              carga), confiable (uptime continuo) y eficiente en red. La
              virtualización y los contenedores Docker corren sobre ellos.
            </p>
          </ConceptCard>

          <ConceptCard
            title="Multiprocesadores y Multicore"
            icon={Cpu}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <p className="text-sm">
              Sistemas con varias CPUs físicas (<strong>SMP</strong>) o muchos
              núcleos en un chip. El SO debe gestionar coherencia de caché,
              scheduling consciente de la topología (<strong>NUMA</strong>: Non-
              Uniform Memory Access) y sincronización eficiente entre núcleos.
              Linux, Windows y macOS son SMP-aware.
            </p>
          </ConceptCard>

          <ConceptCard
            title="PCs y Portátiles"
            icon={MemoryStick}
            color="bg-card text-foreground border-border"
          >
            <p className="text-sm">
              Diseñados para <strong>un usuario interactivo</strong> con balance
              entre rendimiento, usabilidad y bajo consumo. Windows, macOS y
              Linux lideran. Deben manejar desde multimedia hasta programación,
              con interfaces gráficas reactivas, gestión de batería y soporte de
              miles de dispositivos periféricos.
            </p>
          </ConceptCard>

          <ConceptCard
            title="Tiempo Real (RTOS)"
            icon={Clock}
            color="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:border-orange-800"
          >
            <p className="text-sm">
              La prioridad es cumplir <strong>deadlines temporales
              garantizados</strong>. Hard real-time (airbags, marcapasos, control
              de vuelo): perder un deadline es un fallo catastrófico. Soft
              real-time (streaming de audio/video): perder un deadline es
              degradación aceptable. VxWorks, FreeRTOS, QNX son ejemplos
              populares.
            </p>
          </ConceptCard>

          <ConceptCard
            title="Embebidos y IoT"
            icon={Microchip}
            color="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800"
          >
            <p className="text-sm">
              Corren en microcontroladores con <strong>recursos extremadamente
              limitados</strong>: kilobytes de RAM, procesadores de 8-32 bits,
              sin disco. FreeRTOS (gratuito), Embedded Linux (Raspberry Pi),
              QNX (auto, BlackBerry) y TinyOS (sensores) representan este espacio.
              El diseño favorece el consumo mínimo de energía.
            </p>
          </ConceptCard>
        </div>

        <InfoCallout variant="info" title="Smart Cards y el límite extremo">
          <p>
            Las tarjetas inteligentes (tarjetas de crédito con chip, DNI
            electrónico) contienen una CPU y un SO embebido en un chip del tamaño
            de una uña. El SO gestiona unos pocos kilobytes de memoria, maneja
            criptografía y controla el acceso a datos sensibles. Java Card es uno
            de los entornos de ejecución más usados. El consumo de energía
            proviene exclusivamente del campo electromagnético del lector.
          </p>
        </InfoCallout>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 4: Conceptos de Hardware */}
      {/* ============================================ */}
      <SectionBlock id="hardware-conceptos" title="Conceptos de Hardware">
        <p className="text-muted leading-relaxed">
          Un sistema operativo no puede diseñarse sin entender el hardware que
          gestiona. Estos son los componentes clave y los conceptos que el SO
          explota diariamente.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-4">
          Estructura de la CPU
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Registros y ALU"
            icon={Cpu}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <p className="text-sm">
              Los <strong>registros</strong> son la memoria más rápida del sistema
              (acceso en 1 ciclo de clock). Hay registros de propósito general
              (datos temporales), el <strong>PC (Program Counter)</strong> que
              apunta a la próxima instrucción, el <strong>SP (Stack Pointer)</strong>{" "}
              y el <strong>PSW (Program Status Word)</strong> que contiene flags de
              condición y el bit de modo kernel/usuario. La{" "}
              <strong>ALU</strong> realiza operaciones aritméticas y lógicas sobre
              los valores en registros.
            </p>
          </ConceptCard>

          <ConceptCard
            title="Pipeline y modos de operación"
            icon={Zap}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p className="text-sm">
              Las CPUs modernas usan <strong>pipelines</strong> para ejecutar
              múltiples instrucciones simultáneamente en distintas etapas (fetch,
              decode, execute, writeback). Esto maximiza el rendimiento pero
              complica el manejo de interrupciones — el hardware debe vaciar el
              pipeline y guardar el estado antes de atender una interrupción o
              trap. El SO es responsable de salvar y restaurar todos los registros
              en cada cambio de contexto.
            </p>
          </ConceptCard>
        </div>

        <h3 className="text-lg font-semibold mt-8 mb-4">
          Jerarquía de Memoria
        </h3>

        <p className="text-muted leading-relaxed mb-4">
          Existe un tradeoff fundamental entre velocidad, capacidad y costo. La
          solución es organizar la memoria en niveles, explotando el principio de
          localidad: los datos accedidos recientemente tienen alta probabilidad de
          ser accedidos de nuevo.
        </p>

        <ComparisonTable
          headers={["Nivel", "Tecnología", "Velocidad acceso", "Capacidad típica", "Manejado por"]}
          rows={[
            ["Registros", "Flip-flops en CPU", "~0.3 ns (1 ciclo)", "Docenas de palabras", "Compilador / HW"],
            ["L1 Cache", "SRAM on-chip", "~1-4 ns", "32-64 KB por núcleo", "Hardware (transparente)"],
            ["L2 Cache", "SRAM on-chip", "~4-12 ns", "256 KB – 1 MB por núcleo", "Hardware (transparente)"],
            ["L3 Cache", "SRAM on-chip", "~12-50 ns", "4-64 MB compartido", "Hardware (transparente)"],
            ["RAM principal", "DRAM", "~60-100 ns", "4-512 GB", "SO (gestor de memoria)"],
            ["SSD NVMe", "Flash NAND", "~50-200 μs", "256 GB – 4 TB", "SO + driver"],
            ["HDD", "Disco magnético", "~3-10 ms", "1-20 TB", "SO + driver"],
          ]}
        />

        <InfoCallout variant="tip" title="Principio de localidad">
          <p>
            Los cachés funcionan porque los programas exhiben{" "}
            <strong>localidad temporal</strong> (si accediste a X, probablemente
            lo accedás de nuevo pronto) y{" "}
            <strong>localidad espacial</strong> (si accediste a X, probablemente
            accedás a X+1, X+2... pronto). El SO explota esto para el
            algoritmo de reemplazo de páginas en memoria virtual, manteniendo
            en RAM las páginas recientemente usadas.
          </p>
        </InfoCallout>

        <h3 className="text-lg font-semibold mt-8 mb-4">
          Buses del Sistema
        </h3>

        <p className="text-muted leading-relaxed">
          Los componentes del sistema se comunican a través de{" "}
          <strong>buses</strong> — conjuntos de líneas conductoras compartidas.
          En la arquitectura x86 moderna se usan buses especializados:
        </p>

        <div className="grid gap-4 sm:grid-cols-3 mt-4">
          <ConceptCard
            title="Bus de Datos"
            icon={Network}
            color="bg-card text-foreground border-border"
          >
            <p className="text-sm">
              Transporta los datos entre CPU, memoria y dispositivos. Su ancho
              (32 o 64 bits) determina cuántos datos se transfieren por ciclo.
            </p>
          </ConceptCard>
          <ConceptCard
            title="Bus de Direcciones"
            icon={Network}
            color="bg-card text-foreground border-border"
          >
            <p className="text-sm">
              Lleva la dirección de memoria o del dispositivo al que se quiere
              acceder. Su ancho determina el espacio de direccionamiento máximo
              (32 bits → 4 GB, 64 bits → 16 EB).
            </p>
          </ConceptCard>
          <ConceptCard
            title="Bus de Control"
            icon={Network}
            color="bg-card text-foreground border-border"
          >
            <p className="text-sm">
              Señales de control: lectura/escritura, interrupciones, bus request/
              grant para DMA. Coordina quién usa el bus en cada momento.
            </p>
          </ConceptCard>
        </div>

        <h3 className="text-lg font-semibold mt-8 mb-4">
          Entrada/Salida: Controladores, Interrupciones y DMA
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Controladores de Dispositivos"
            icon={HardDrive}
            color="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800"
          >
            <p className="text-sm">
              Cada dispositivo tiene un controlador con sus propios registros
              (control, estado, datos). El driver del SO escribe en estos registros
              para comandar al dispositivo. Ejemplo: para leer del disco, el driver
              escribe en los registros del controlador el número de sector, la
              dirección de destino en RAM y el comando de lectura.
            </p>
          </ConceptCard>

          <ConceptCard
            title="DMA: Direct Memory Access"
            icon={Zap}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <p className="text-sm">
              Sin DMA, la CPU debe transferir cada byte del dispositivo a RAM uno
              por uno — un desperdicio enorme. Con DMA, la CPU programa el
              controlador DMA con fuente, destino y tamaño, y luego continúa
              ejecutando código útil. El DMA transfiere autónomamente y al terminar
              interrumpe a la CPU con el resultado.
            </p>
          </ConceptCard>
        </div>

        <h3 className="text-lg font-semibold mt-8 mb-4">
          Discos: Geometría y Tiempos
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Geometría del HDD"
            icon={HardDrive}
            color="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:border-orange-800"
          >
            <ul className="space-y-1 list-disc list-inside text-sm">
              <li>
                <strong>Platos:</strong> discos magnéticos apilados que rotan
                juntos (5400-15000 RPM)
              </li>
              <li>
                <strong>Pistas:</strong> círculos concéntricos en cada cara del
                plato (miles por plato)
              </li>
              <li>
                <strong>Sectores:</strong> arcos de pista, la unidad mínima de
                lectura/escritura (512 B o 4 KB)
              </li>
              <li>
                <strong>Cilindro:</strong> conjunto de pistas en la misma
                posición radial en todos los platos
              </li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="Componentes del Tiempo de Acceso"
            icon={Clock}
            color="bg-card text-foreground border-border"
          >
            <ul className="space-y-1 list-disc list-inside text-sm">
              <li>
                <strong>Seek time:</strong> tiempo de mover el cabezal a la pista
                correcta (~3-10 ms promedio)
              </li>
              <li>
                <strong>Latencia rotacional:</strong> espera a que el sector
                correcto pase bajo el cabezal (~3-6 ms a 7200 RPM)
              </li>
              <li>
                <strong>Tiempo de transferencia:</strong> leer los bytes del
                sector (~0.1 ms)
              </li>
              <li>
                <strong>Total típico:</strong> ~5-15 ms por acceso aleatorio
              </li>
            </ul>
          </ConceptCard>
        </div>

        <ExampleBlock title="Secuencia de arranque (boot): de UEFI al kernel">
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>
              <strong>POST (Power-On Self Test):</strong> BIOS/UEFI verifica la
              integridad del hardware: CPU, RAM, dispositivos de almacenamiento
            </li>
            <li>
              <strong>Localización del bootloader:</strong> UEFI lee la tabla de
              particiones GPT, encuentra la partición EFI y carga el bootloader
              (GRUB en Linux, BOOTMGR en Windows)
            </li>
            <li>
              <strong>Bootloader:</strong> presenta menú de SO (si hay varios),
              carga el kernel del SO seleccionado en RAM y lo descomprime
            </li>
            <li>
              <strong>Inicialización del kernel:</strong> el kernel detecta el
              hardware, inicializa subsistemas (gestión de memoria, scheduler,
              sistema de archivos, red), monta el sistema de archivos raíz
            </li>
            <li>
              <strong>Init/systemd:</strong> el kernel ejecuta el primer proceso
              (PID 1), que inicializa servicios de usuario y presenta el login
            </li>
          </ol>
        </ExampleBlock>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 5: Llamadas al Sistema */}
      {/* ============================================ */}
      <SectionBlock id="llamadas-sistema" title="Llamadas al Sistema">
        <p className="text-muted leading-relaxed">
          Las <strong>llamadas al sistema (syscalls)</strong> son la interfaz
          formal entre los programas de usuario y el SO. Son la única manera legal
          de solicitar servicios privilegiados: acceso a archivos, creación de
          procesos, comunicación de red, y más. Sin ellas, el modo usuario sería
          una jaula sin salida.
        </p>

        <InfoCallout variant="info" title="POSIX: el estándar de llamadas al sistema">
          <p>
            <strong>POSIX</strong> (Portable Operating System Interface) es un
            estándar IEEE que define las syscalls que todo SO Unix-compatible debe
            implementar. Gracias a POSIX, un programa escrito para Linux compila
            y corre sin cambios en macOS o FreeBSD. Windows tiene su propia API
            (Win32) que no es POSIX nativa, aunque el WSL (Windows Subsystem for
            Linux) provee una capa de compatibilidad.
          </p>
        </InfoCallout>

        <h3 className="text-lg font-semibold mt-6 mb-4">
          Categorías de Llamadas al Sistema
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Gestión de Procesos"
            icon={GitMerge}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                <code className="font-mono bg-muted/60 px-1 rounded">fork()</code>{" "}
                — clona el proceso actual, crea un hijo idéntico
              </li>
              <li>
                <code className="font-mono bg-muted/60 px-1 rounded">exec()</code>{" "}
                — reemplaza la imagen del proceso con otro programa
              </li>
              <li>
                <code className="font-mono bg-muted/60 px-1 rounded">exit()</code>{" "}
                — termina el proceso y libera sus recursos
              </li>
              <li>
                <code className="font-mono bg-muted/60 px-1 rounded">wait()</code>{" "}
                — el padre espera a que un hijo termine
              </li>
              <li>
                <code className="font-mono bg-muted/60 px-1 rounded">getpid()</code>{" "}
                — retorna el PID del proceso actual
              </li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="Gestión de Archivos"
            icon={HardDrive}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                <code className="font-mono bg-muted/60 px-1 rounded">open(path, flags)</code>{" "}
                — abre o crea un archivo, retorna un file descriptor
              </li>
              <li>
                <code className="font-mono bg-muted/60 px-1 rounded">read(fd, buf, n)</code>{" "}
                — lee hasta n bytes desde el descriptor fd
              </li>
              <li>
                <code className="font-mono bg-muted/60 px-1 rounded">write(fd, buf, n)</code>{" "}
                — escribe n bytes al descriptor fd
              </li>
              <li>
                <code className="font-mono bg-muted/60 px-1 rounded">close(fd)</code>{" "}
                — cierra el file descriptor y libera recursos
              </li>
              <li>
                <code className="font-mono bg-muted/60 px-1 rounded">lseek(fd, off, whence)</code>{" "}
                — mueve el puntero de posición en el archivo
              </li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="Gestión de Directorios"
            icon={Layers}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                <code className="font-mono bg-muted/60 px-1 rounded">mkdir(path, mode)</code>{" "}
                — crea un directorio
              </li>
              <li>
                <code className="font-mono bg-muted/60 px-1 rounded">rmdir(path)</code>{" "}
                — elimina un directorio vacío
              </li>
              <li>
                <code className="font-mono bg-muted/60 px-1 rounded">opendir() / readdir()</code>{" "}
                — abre y lee entradas de un directorio
              </li>
              <li>
                <code className="font-mono bg-muted/60 px-1 rounded">chdir(path)</code>{" "}
                — cambia el directorio de trabajo del proceso
              </li>
              <li>
                <code className="font-mono bg-muted/60 px-1 rounded">stat(path, buf)</code>{" "}
                — obtiene metadatos del archivo (tamaño, permisos, timestamps)
              </li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="POSIX vs Win32 API"
            icon={Terminal}
            color="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                <code className="font-mono bg-muted/60 px-1 rounded">fork()</code>{" "}
                ↔{" "}
                <code className="font-mono bg-muted/60 px-1 rounded">CreateProcess()</code>
              </li>
              <li>
                <code className="font-mono bg-muted/60 px-1 rounded">open()</code>{" "}
                ↔{" "}
                <code className="font-mono bg-muted/60 px-1 rounded">CreateFile()</code>
              </li>
              <li>
                <code className="font-mono bg-muted/60 px-1 rounded">read()/write()</code>{" "}
                ↔{" "}
                <code className="font-mono bg-muted/60 px-1 rounded">ReadFile()/WriteFile()</code>
              </li>
              <li>
                <code className="font-mono bg-muted/60 px-1 rounded">exit()</code>{" "}
                ↔{" "}
                <code className="font-mono bg-muted/60 px-1 rounded">ExitProcess()</code>
              </li>
              <li>
                <code className="font-mono bg-muted/60 px-1 rounded">wait()</code>{" "}
                ↔{" "}
                <code className="font-mono bg-muted/60 px-1 rounded">WaitForSingleObject()</code>
              </li>
            </ul>
          </ConceptCard>
        </div>

        <ExampleBlock title="Traza de syscalls: ¿qué pasa cuando ejecutás `cat archivo.txt`?">
          <p className="text-sm mb-3">
            Usando <code>strace cat archivo.txt</code> en Linux, podemos observar
            las syscalls reales que emite el programa:
          </p>
          <div className="font-mono text-xs space-y-1 bg-white/60 dark:bg-white/[0.07] rounded p-4 overflow-x-auto">
            <p className="text-muted">
              # El shell hace fork() + exec() para iniciar cat
            </p>
            <p>
              <span className="text-blue-600 dark:text-blue-400">execve</span>
              (&quot;/bin/cat&quot;, [&quot;cat&quot;, &quot;archivo.txt&quot;], envp) = 0
            </p>
            <p className="mt-2 text-muted">
              # cat abre el archivo
            </p>
            <p>
              <span className="text-amber-600 dark:text-amber-400">open</span>
              (&quot;archivo.txt&quot;, O_RDONLY) = 3
            </p>
            <p className="mt-2 text-muted">
              # cat lee bloques hasta EOF
            </p>
            <p>
              <span className="text-emerald-600 dark:text-emerald-400">read</span>
              (3, &quot;Hola mundo\n...&quot;, 4096) = 12
            </p>
            <p className="mt-2 text-muted">
              # cat escribe al stdout (fd=1)
            </p>
            <p>
              <span className="text-emerald-600 dark:text-emerald-400">write</span>
              (1, &quot;Hola mundo\n&quot;, 12) = 12
            </p>
            <p className="mt-2 text-muted">
              # EOF alcanzado
            </p>
            <p>
              <span className="text-emerald-600 dark:text-emerald-400">read</span>
              (3, &quot;&quot;, 4096) = 0
            </p>
            <p className="mt-2 text-muted">
              # cat cierra el archivo y termina
            </p>
            <p>
              <span className="text-orange-600 dark:text-orange-400">close</span>
              (3) = 0
            </p>
            <p>
              <span className="text-red-600 dark:text-red-400">exit_group</span>
              (0) = ?
            </p>
          </div>
          <p className="mt-3 text-sm">
            Cada una de estas líneas representa un trap: el proceso de usuario
            pausa, el kernel ejecuta la operación, y retorna el resultado.
            Aunque parece simple, <code>cat archivo.txt</code> realiza entre 10
            y 30 syscalls dependiendo del tamaño del archivo.
          </p>
        </ExampleBlock>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 6: Estructura del SO */}
      {/* ============================================ */}
      <SectionBlock id="estructura-so" title="Estructura del SO">
        <p className="text-muted leading-relaxed">
          ¿Cómo se organiza internamente el código del SO? Esta pregunta tiene
          varias respuestas posibles, cada una con sus tradeoffs. La arquitectura
          interna del kernel determina su rendimiento, fiabilidad, seguridad y
          mantenibilidad.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Kernel Monolítico"
            icon={Layers}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <p className="text-sm">
              Todo el código del SO — scheduler, gestión de memoria, sistema de
              archivos, drivers de red, drivers de dispositivos — corre en un
              único espacio de memoria en modo kernel privilegiado. Ejemplos:{" "}
              <strong>Linux, Unix original, FreeBSD</strong>.
            </p>
            <ul className="space-y-1 list-disc list-inside text-sm mt-2">
              <li>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  Ventaja:
                </span>{" "}
                rendimiento óptimo — comunicación entre subsistemas es una
                llamada de función directa, sin IPC
              </li>
              <li>
                <span className="text-red-600 dark:text-red-400 font-medium">
                  Desventaja:
                </span>{" "}
                un bug en cualquier driver puede corromper todo el kernel (kernel
                panic)
              </li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="Microkernel"
            icon={Box}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p className="text-sm">
              Solo los servicios absolutamente esenciales corren en modo kernel:
              gestión básica de memoria, IPC y scheduling mínimo. Todo lo demás
              — drivers, sistema de archivos, pila de red — corre como procesos
              en espacio de usuario. Ejemplos:{" "}
              <strong>Mach, Minix 3, L4, QNX</strong>.
            </p>
            <ul className="space-y-1 list-disc list-inside text-sm mt-2">
              <li>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  Ventaja:
                </span>{" "}
                un driver crasheado no tumba el sistema; puede reiniciarse como
                proceso
              </li>
              <li>
                <span className="text-red-600 dark:text-red-400 font-medium">
                  Desventaja:
                </span>{" "}
                mayor overhead por IPC en cada operación; rendimiento inferior
              </li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="Kernel Modular (Linux LKM)"
            icon={GitMerge}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <p className="text-sm">
              El kernel base es monolítico, pero soporta{" "}
              <strong>módulos cargables dinámicamente</strong> (LKMs — Loadable
              Kernel Modules). Los drivers pueden insertarse o removerse en
              ejecución sin reiniciar. <code>insmod</code>, <code>rmmod</code>,{" "}
              <code>lsmod</code> son los comandos de gestión. Ejemplo: cargar el
              driver de una placa de video recién instalada.
            </p>
            <p className="text-sm mt-2 italic">
              Nota: los LKMs corren en modo kernel — un módulo malicioso tiene
              acceso completo al sistema (rootkit).
            </p>
          </ConceptCard>

          <ConceptCard
            title="Máquinas Virtuales / Hipervisores"
            icon={Server}
            color="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800"
          >
            <p className="text-sm">
              Un hipervisor permite correr múltiples SO completos sobre el mismo
              hardware físico. <strong>Tipo 1 (bare-metal):</strong> corre
              directamente sobre el hardware, sin SO host. Ejemplos: VMware ESXi,
              Microsoft Hyper-V, KVM. <strong>Tipo 2 (hosted):</strong> corre como
              aplicación sobre un SO existente. Ejemplos: VirtualBox, VMware
              Workstation.
            </p>
            <p className="text-sm mt-2">
              Tipo 1 es el estándar en producción cloud (AWS, Azure, Google Cloud).
            </p>
          </ConceptCard>
        </div>

        <ConceptCard
          title="Exokernel: exponer el hardware directamente"
          icon={Zap}
          color="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:border-orange-800"
        >
          <p className="text-sm">
            El enfoque más radical: el exokernel expone el hardware directamente a
            las aplicaciones, sin abstracciones. Las aplicaciones implementan sus
            propias políticas de gestión de recursos mediante{" "}
            <strong>libOSes</strong> (librerías de SO en espacio de usuario). El
            kernel solo se encarga de multiplexar el hardware de forma segura. MIT
            Exokernel fue el prototipo de investigación. La idea es que las
            abstracciones genéricas del SO (como el sistema de archivos) no siempre
            son óptimas para todas las aplicaciones — una base de datos podría
            gestionar el disco de forma más eficiente que el SO si tuviera acceso
            directo.
          </p>
        </ConceptCard>

        <ComparisonTable
          headers={[
            "Estructura",
            "Código en kernel",
            "Rendimiento",
            "Fiabilidad",
            "Ejemplo",
          ]}
          rows={[
            [
              "Monolítico",
              "Todo el SO",
              "Excelente — llamadas directas entre subsistemas",
              "Baja — un driver bugueado tumba todo",
              "Linux, Unix, FreeBSD",
            ],
            [
              "Microkernel",
              "Solo IPC, memoria básica, scheduler mínimo",
              "Menor — overhead de IPC en cada operación",
              "Alta — drivers aislados, reiniciables",
              "Mach, Minix 3, L4, QNX",
            ],
            [
              "Modular",
              "Monolítico + módulos dinámicos",
              "Bueno — módulos corren en kernel",
              "Media — módulos corren privilegiados",
              "Linux con LKMs",
            ],
            [
              "Hipervisor Tipo 1",
              "Hipervisor sobre HW desnudo",
              "Bueno — acceso directo al hardware",
              "Alta — VMs aisladas entre sí",
              "VMware ESXi, KVM, Hyper-V",
            ],
            [
              "Hipervisor Tipo 2",
              "Hipervisor como proceso de SO host",
              "Menor — doble capa de indirección",
              "Media — depende del SO host",
              "VirtualBox, VMware Workstation",
            ],
            [
              "Exokernel",
              "Solo multiplexación segura del HW",
              "Máximo — sin abstracciones intermedias",
              "Media — responsabilidad en libOS",
              "MIT Exokernel (investigación)",
            ],
          ]}
        />

        <InfoCallout variant="tip" title="¿Por qué Linux domina si es monolítico?">
          <p>
            El debate monolítico vs. microkernel fue famoso en los 90 entre
            Tanenbaum (Minix, microkernel) y Torvalds (Linux, monolítico).
            Torvalds ganó pragmáticamente: los microkernels de la época eran
            más lentos y complejos de implementar correctamente. Linux compensó
            la menor fiabilidad teórica con revisiones de código exhaustivas,
            testing masivo y el modelo de módulos que permite actualizar drivers
            sin reiniciar. Hoy, el kernel de Linux tiene más de 30 millones de
            líneas de código y soporta prácticamente todo el hardware existente.
          </p>
        </InfoCallout>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 7: Quiz */}
      {/* ============================================ */}
      <SectionBlock id="quiz" title="Quiz del Capítulo 1">
        <p className="text-muted leading-relaxed mb-4">
          Evaluá tu comprensión de los conceptos fundamentales de sistemas
          operativos: definición del SO, dual-mode operation, generaciones
          históricas, tipos de SO, arquitectura de hardware, llamadas al sistema
          y estructuras de kernel. Las preguntas incluyen casos aplicados y
          trampas conceptuales comunes.
        </p>
        <QuizContainer questions={quizSoCh1} chapterTitle={chapter.title} />
      </SectionBlock>
    </ChapterLayout>
  );
}

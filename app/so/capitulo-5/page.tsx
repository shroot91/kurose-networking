import { soChapters } from "@/data/so-chapters";
import { ChapterLayout } from "@/components/layout/chapter-layout";
import { SectionBlock } from "@/components/content/section-block";
import { ConceptCard } from "@/components/content/concept-card";
import { ExampleBlock } from "@/components/content/example-block";
import { ComparisonTable } from "@/components/content/comparison-table";
import { InfoCallout } from "@/components/content/info-callout";
import { QuizContainer } from "@/components/quiz/quiz-container";
import { quizSoCh5 } from "@/data/quiz-so-ch5";
import {
  Cpu,
  Layers,
  Zap,
  HardDrive,
  Clock,
  Settings,
  AlertTriangle,
  Activity,
} from "lucide-react";

const chapter = soChapters[4];

export default function SOCapitulo5() {
  return (
    <ChapterLayout chapter={chapter} allChapters={soChapters}>
      {/* ============================================ */}
      {/* SECCIÓN 1: Hardware de E/S */}
      {/* ============================================ */}
      <SectionBlock id="hardware-io" title="Hardware de E/S">
        <p className="text-muted leading-relaxed">
          Los dispositivos de E/S son el puente entre el mundo digital y el mundo
          físico. Para el SO, todo dispositivo es una abstracción sobre hardware
          real gobernado por un <strong>controlador</strong> con registros que la
          CPU puede leer y escribir.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Dispositivos de Bloque"
            icon={HardDrive}
            color="bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800"
          >
            <p>
              Almacenan datos en <strong>bloques de tamaño fijo</strong> (512
              bytes a 4KB). Soportan acceso aleatorio: se puede leer el bloque
              N sin leer los anteriores. Ejemplos: HDD, SSD, DVD.
            </p>
            <p className="mt-2 text-sm italic">
              El SO puede hacer caché de bloques en RAM (page cache) para
              acelerar lecturas repetidas.
            </p>
          </ConceptCard>

          <ConceptCard
            title="Dispositivos de Carácter"
            icon={Activity}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p>
              Generan o consumen un <strong>flujo secuencial de bytes</strong>.
              No tienen la noción de bloques ni posición; no se puede hacer
              lseek(). Ejemplos: teclado, ratón, impresoras, puertos serie,
              terminales.
            </p>
          </ConceptCard>
        </div>

        <InfoCallout variant="info" title="Controladores de Dispositivo (Device Controllers)">
          <p>
            Cada dispositivo tiene un <strong>controlador</strong> — un chip
            electrónico que implementa el protocolo del dispositivo y expone
            una interfaz más simple a la CPU. El controlador tiene registros de:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Estado:</strong> ¿está ocupado? ¿hubo error? ¿listo?</li>
            <li><strong>Comando:</strong> qué operación ejecutar (leer, escribir, buscar)</li>
            <li><strong>Datos:</strong> buffer de datos a transferir</li>
          </ul>
        </InfoCallout>

        <ComparisonTable
          headers={["Bus / Interfaz", "Ancho de banda típico", "Uso"]}
          rows={[
            ["PCIe 4.0 x16", "32 GB/s", "GPU, NVMe SSD de alta gama"],
            ["PCIe 3.0 x4 (NVMe)", "4 GB/s", "SSD NVMe del sistema"],
            ["SATA III", "600 MB/s", "SSD y HDD SATA"],
            ["USB 3.2 Gen 2", "2 GB/s", "Almacenamiento externo, periféricos"],
            ["USB 2.0", "60 MB/s", "Teclado, ratón, webcam"],
          ]}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Puertos de E/S (I/O Ports)"
            icon={Cpu}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <p>
              En x86, los registros del controlador se mapean a un{" "}
              <strong>espacio de direcciones separado</strong> de la memoria
              (64K puertos de 16 bits). Se accede con instrucciones especiales:{" "}
              <code>in al, 0x60</code> (leer teclado) y{" "}
              <code>out 0x70, al</code> (escribir al CMOS). Hoy casi obsoleto.
            </p>
          </ConceptCard>

          <ConceptCard
            title="Memory-Mapped I/O (MMIO)"
            icon={Layers}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <p>
              Los registros del controlador se mapean en el{" "}
              <strong>espacio de direcciones físico de la RAM</strong>. La CPU
              los accede con instrucciones normales de memoria (MOV). Más
              flexible, soporta cachés y protección de MMU. Dominante en ARM y
              en dispositivos PCIe modernos.
            </p>
          </ConceptCard>
        </div>

        <InfoCallout variant="tip" title="Analogía: el controlador como traductor">
          <p>
            El controlador es como un <strong>intérprete simultáneo</strong> en
            una conferencia internacional. La CPU habla en "registros estándar"
            y el controlador traduce eso al idioma nativo del dispositivo
            (señales eléctricas de SATA, pulsos NVMe, comandos USB HID). Sin
            este traductor, la CPU tendría que conocer el protocolo específico
            de cada modelo de dispositivo.
          </p>
        </InfoCallout>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 2: Software de E/S en Capas */}
      {/* ============================================ */}
      <SectionBlock id="software-io" title="Software de E/S en Capas">
        <p className="text-muted leading-relaxed">
          El software de E/S está organizado en <strong>cuatro capas</strong>,
          cada una con responsabilidades bien delimitadas. Este diseño en capas
          permite que un programa de usuario use{" "}
          <code>read("/dev/sda", ...)</code> sin saber si está leyendo de un HDD
          Samsung o un SSD Kingston.
        </p>

        <div className="space-y-3">
          {[
            {
              num: "4",
              title: "Software de usuario (bibliotecas)",
              desc: "stdio, fread/fwrite, bufferización en espacio de usuario. Llama al SO mediante syscalls (read, write, ioctl). No corre en modo kernel.",
              color: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800",
            },
            {
              num: "3",
              title: "Software independiente del dispositivo (SO)",
              desc: "Buffering, manejo de errores, nomenclatura uniforme (/dev/), asignación de dispositivos, tamaño de bloque uniforme. Interfaz consistente para todos los drivers.",
              color: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800",
            },
            {
              num: "2",
              title: "Drivers de dispositivo",
              desc: "Código específico del hardware. Convierte operaciones abstractas (read bloque N) en comandos del controlador. Uno por tipo de dispositivo.",
              color: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800",
            },
            {
              num: "1",
              title: "Manejadores de interrupciones",
              desc: "Se ejecutan cuando el hardware señaliza que terminó una operación. Despiertan al proceso bloqueado. Código extremadamente breve y rápido.",
              color: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800",
            },
          ].map((layer) => (
            <div key={layer.num} className={`rounded-xl border p-4 ${layer.color}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono font-black text-lg">{layer.num}</span>
                <h3 className="font-semibold">{layer.title}</h3>
              </div>
              <p className="text-sm opacity-90">{layer.desc}</p>
            </div>
          ))}
        </div>

        <InfoCallout variant="tip" title="Double Buffering">
          <p>
            Para E/S continua (streaming de audio, video), se usan{" "}
            <strong>dos buffers alternados</strong>: mientras el hardware llena
            el buffer B, el SO procesa el buffer A. Cuando A termina, se
            intercambian. Así se evitan cortes — el hardware nunca queda
            esperando al SO y viceversa.
          </p>
        </InfoCallout>

        <ComparisonTable
          headers={["Capa", "Ejecuta en", "Función principal", "Ejemplo en Linux"]}
          rows={[
            ["Usuario", "Modo usuario", "Abstracción de alto nivel, bufferización", "glibc stdio, fopen/fread"],
            ["Independiente del dispositivo", "Modo kernel", "Interfaz uniforme, errores, nombres", "VFS, block layer, /dev entries"],
            ["Driver", "Modo kernel", "Comandos específicos del hardware", "ahci.ko (SATA), nvme.ko, e1000e.ko"],
            ["Interrupt handler", "Modo kernel (ISR)", "Notificar finalización de E/S", "irq_handler_t registrado con request_irq()"],
          ]}
        />
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 3: Interrupciones y DMA */}
      {/* ============================================ */}
      <SectionBlock id="interrupciones-dma" title="Interrupciones y DMA">
        <p className="text-muted leading-relaxed">
          La CPU es miles de veces más rápida que los dispositivos de E/S. El
          desafío es: ¿cómo sabe la CPU cuándo el dispositivo terminó su
          operación? Hay tres enfoques, con trade-offs muy distintos.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <ConceptCard
            title="Polling (Busy-Waiting)"
            icon={Cpu}
            color="bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>CPU pregunta repetidamente al registro de estado del controlador</li>
              <li>Simple de implementar</li>
              <li><strong>Desperdicia 100% de la CPU</strong> mientras espera</li>
              <li>Útil solo cuando el dispositivo es muy rápido (NVMe con colas de baja latencia)</li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="Interrupciones"
            icon={Zap}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>Dispositivo notifica a CPU cuando termina (señal eléctrica en línea IRQ)</li>
              <li>CPU ejecuta el Interrupt Service Routine (ISR)</li>
              <li><strong>CPU libre</strong> para hacer otro trabajo mientras espera</li>
              <li>Overhead: salvar/restaurar contexto, ~1-5μs por interrupción</li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="DMA"
            icon={Activity}
            color="bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>Controlador DMA transfiere datos entre dispositivo y RAM <strong>sin involucrar a la CPU</strong></li>
              <li>CPU programa el DMA y se desentiende</li>
              <li>DMA interrumpe CPU solo al <strong>terminar toda la transferencia</strong></li>
              <li>Esencial para transferencias grandes (disco, red)</li>
            </ul>
          </ConceptCard>
        </div>

        <ExampleBlock title="DMA: cómo se transfieren 1MB de disco a RAM sin quemar la CPU">
          <ol className="list-decimal list-inside space-y-1.5">
            <li>El SO programa el controlador DMA: <em>dirección física de destino en RAM, cantidad de bytes (1MB), operación: leer del disco</em></li>
            <li>El controlador DMA toma el <strong>bus del sistema</strong> (bus mastering) y emite comandos de lectura al disco en paralelo con la CPU</li>
            <li>La CPU continúa ejecutando otro proceso. El DMA no la interrumpe durante la transferencia</li>
            <li>El controlador de disco envía los datos al DMA en ráfagas (cycle stealing: roba ciclos del bus sin detener la CPU)</li>
            <li>Cuando el último byte fue escrito en RAM, el DMA <strong>interrumpe la CPU</strong> con un único IRQ</li>
            <li>El ISR marca la operación como completa y despierta el proceso que estaba esperando</li>
          </ol>
          <p className="mt-3 text-sm">
            Sin DMA, leer 1MB a 100MB/s requeriría que la CPU ejecutara ~250.000 instrucciones
            de copia. Con DMA, solo ejecuta las instrucciones de programación inicial (~10 instrucciones)
            y el ISR final (~50 instrucciones). <strong>Ahorro: 99.98% del tiempo de CPU.</strong>
          </p>
        </ExampleBlock>

        <InfoCallout variant="info" title="IOMMU: protección de DMA">
          <p>
            Sin protección, un dispositivo con DMA podría escribir en{" "}
            <em>cualquier</em> dirección física, incluyendo el kernel. La{" "}
            <strong>IOMMU</strong> (Intel VT-d, AMD-Vi) agrega una MMU entre
            los dispositivos PCIe y la RAM: cada dispositivo solo puede acceder
            a las regiones de memoria que el SO le asignó. Crítico para
            virtualización y para dispositivos eGPU externos no confiables.
          </p>
        </InfoCallout>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 4: Discos y Scheduling */}
      {/* ============================================ */}
      <SectionBlock id="discos" title="Discos y Scheduling">
        <p className="text-muted leading-relaxed">
          Los discos duros (HDD) son el cuello de botella clásico del sistema.
          Entender su geometría permite diseñar algoritmos de scheduling que
          reducen dramáticamente el tiempo de acceso promedio.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <ConceptCard
            title="Seek Time"
            icon={HardDrive}
            color="bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800"
          >
            <p>
              Tiempo en mover el brazo a la <strong>pista correcta</strong>.
              El componente más costoso: 3–15ms en HDD modernos.
              Minimizarlo es el objetivo principal del disk scheduling.
            </p>
          </ConceptCard>

          <ConceptCard
            title="Latencia Rotacional"
            icon={Clock}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <p>
              Tiempo en esperar que el <strong>sector correcto</strong> pase
              bajo la cabeza. Para un disco a 7200 RPM: 1 revolución = 8.3ms,
              latencia promedio = 4.2ms.
            </p>
          </ConceptCard>

          <ConceptCard
            title="Transfer Time"
            icon={Activity}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <p>
              Tiempo de leer/escribir los bytes del sector una vez que la
              cabeza está posicionada. Usualmente{" "}
              <strong>microsegundos</strong> — la parte más rápida. Dominado
              por seek + rotación.
            </p>
          </ConceptCard>
        </div>

        <h3 className="text-lg font-semibold mt-8 mb-4">Algoritmos de Scheduling de Disco</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="FCFS — First Come, First Served"
            icon={Settings}
            color="bg-card text-foreground border-border"
          >
            <p>Sirve pedidos en orden de llegada. Simple y justo, pero el brazo puede moverse erráticamente. Alto seek time promedio si los pedidos están dispersos.</p>
          </ConceptCard>

          <ConceptCard
            title="SSTF — Shortest Seek Time First"
            icon={Settings}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p>Sirve siempre el pedido más cercano a la posición actual. Minimiza seeks pero puede causar <strong>inanición</strong> de pedidos en los extremos del disco si siempre llegan pedidos en el centro.</p>
          </ConceptCard>

          <ConceptCard
            title="SCAN (Elevator Algorithm)"
            icon={Settings}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <p>El brazo se mueve en una dirección sirviendo pedidos en el camino. Al llegar al borde, <strong>invierte la dirección</strong>. Como un ascensor. Elimina inanición, distribución más uniforme que SSTF.</p>
          </ConceptCard>

          <ConceptCard
            title="C-SCAN (Circular SCAN)"
            icon={Settings}
            color="bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800"
          >
            <p>Como SCAN pero al llegar al borde <strong>vuelve al inicio sin servir pedidos</strong> en el retorno. Trata al disco como un cilindro circular. Tiempo de espera más uniforme — ningún cilindro espera dos recorridos completos.</p>
          </ConceptCard>
        </div>

        <ExampleBlock title="Comparativa FCFS, SSTF y SCAN para 9 pedidos">
          <p>
            Disco con 200 cilindros (0–199). Cabeza en cilindro <strong>53</strong>.
            Cola de pedidos: <strong>98, 183, 37, 122, 14, 124, 65, 67</strong>.
          </p>
          <div className="font-mono text-xs mt-3 space-y-3 bg-card rounded p-3 border border-border">
            <div>
              <p className="font-bold text-foreground mb-1">FCFS (orden de llegada):</p>
              <p className="text-muted">53→98→183→37→122→14→124→65→67</p>
              <p>Distancia total: 45+85+146+85+108+110+59+2 = <strong className="text-red-600 dark:text-red-400">640 cilindros</strong></p>
            </div>
            <div>
              <p className="font-bold text-foreground mb-1">SSTF (más cercano primero):</p>
              <p className="text-muted">53→65→67→98→122→124→183→37→14</p>
              <p>Distancia total: 12+2+31+24+2+59+146+23 = <strong className="text-amber-600 dark:text-amber-400">299 cilindros</strong></p>
            </div>
            <div>
              <p className="font-bold text-foreground mb-1">SCAN (hacia arriba primero):</p>
              <p className="text-muted">53→65→67→98→122→124→183→199→37→14</p>
              <p>Distancia total: 12+2+31+24+2+59+16+162+23 = <strong className="text-emerald-600 dark:text-emerald-400">331 cilindros</strong></p>
              <p className="text-xs text-muted mt-1">SCAN llega al borde (199) y vuelve sirviendo 37 y 14.</p>
            </div>
          </div>
        </ExampleBlock>

        <InfoCallout variant="info" title="SSDs: distinto modelo, distinto scheduling">
          <p>
            Los SSDs <strong>no tienen partes móviles</strong> — el seek time
            es prácticamente 0 (~0.1ms). El scheduling de disco para HDD es
            irrelevante para SSDs. Lo que importa en SSDs es el{" "}
            <strong>wear leveling</strong> (distribuir escrituras uniformemente
            entre celdas NAND para no agotar las mismas celdas) y gestionar el
            garbage collection. Linux usa el scheduler <em>none</em> (o{" "}
            <em>mq-deadline</em>) para NVMe SSDs.
          </p>
        </InfoCallout>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 5: Relojes y Temporización */}
      {/* ============================================ */}
      <SectionBlock id="relojes" title="Relojes y Temporización">
        <p className="text-muted leading-relaxed">
          El reloj del sistema es uno de los dispositivos más críticos del SO.
          Sin él, no hay scheduling por quantum, no hay timeouts, no hay
          timestamps en archivos, no hay sleep().
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="PIT / HPET (Hardware)"
            icon={Clock}
            color="bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800"
          >
            <p>
              <strong>PIT (Programmable Interval Timer 8253):</strong> chip
              clásico de PC, resolución ~55ns, frecuencia hasta 1.19MHz.
              Genera interrupciones periódicas (IRQ 0).
            </p>
            <p className="mt-2">
              <strong>HPET (High Precision Event Timer):</strong> resolución
              ≥100ns, múltiples comparadores independientes. Reemplaza al PIT
              en sistemas modernos.
            </p>
          </ConceptCard>

          <ConceptCard
            title="TSC (Time Stamp Counter)"
            icon={Activity}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p>
              Registro de 64 bits en cada core x86 que se incrementa cada ciclo
              de reloj. Instrucción <code>rdtsc</code> lo lee en ~nanosegundos.
              El <strong>clocksource más preciso</strong> en Linux para sistemas
              con Invariant TSC (frecuencia constante independientemente de
              C-states y turbo).
            </p>
          </ConceptCard>
        </div>

        <ComparisonTable
          headers={["Función del SO", "Mecanismo", "Frecuencia"]}
          rows={[
            ["Scheduling (timeslice)", "Timer interrupt (APIC timer)", "Linux HZ = 250–1000 ticks/s"],
            ["Timestamps de archivos", "Leer TSC o gettimeofday()", "Por syscall"],
            ["sleep() / nanosleep()", "Insertar proceso en cola de timeout del timer", "Resolución hasta ~1ms"],
            ["TCP retransmission timeout", "Timer del kernel por socket", "Configurable (ms a segundos)"],
            ["Profiling (perf)", "PMU (Performance Monitoring Unit)", "Por evento o muestras periódicas"],
            ["NTP sync", "Ajuste gradual (slewing) del clocksource", "Periódicamente (segundos a minutos)"],
          ]}
        />

        <InfoCallout variant="tip" title="HZ, jiffies y tickless kernel">
          <p>
            Linux configura el timer para interrumpir <strong>HZ veces por segundo</strong>{" "}
            (típicamente 250 en servidores, 1000 en desktops). Cada interrupción
            es un <em>jiffy</em>. Con HZ=1000, la resolución de sleep() es 1ms.
          </p>
          <p className="mt-2">
            El <strong>NO_HZ (tickless) kernel</strong> elimina ticks cuando el
            CPU está idle, reduciendo consumo energético. En lugar de interrumpir
            1000 veces/segundo sin hacer nada útil, programa el próximo timer
            solo cuando hay trabajo real.
          </p>
        </InfoCallout>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 6: Drivers de Dispositivos */}
      {/* ============================================ */}
      <SectionBlock id="drivers" title="Drivers de Dispositivos">
        <p className="text-muted leading-relaxed">
          Un driver es el software que sabe <em>exactamente</em> cómo hablarle
          a un dispositivo específico. Convierte el lenguaje universal del SO
          (&quot;lee el bloque 1234&quot;) al lenguaje privado del hardware
          (secuencia de comandos AHCI o NVMe).
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Drivers en Modo Kernel"
            icon={Settings}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>Acceso directo a hardware y MMIO</li>
              <li>Máximo rendimiento — sin overhead de IPC</li>
              <li>Un bug puede <strong>crashear todo el sistema</strong> (kernel panic)</li>
              <li>Modelo dominante: Linux drivers monolíticos, Windows KMDF</li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="Drivers en Modo Usuario"
            icon={Layers}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>Más seguros: un crash solo mata el proceso del driver</li>
              <li>Más fácil de depurar (gdb, valgrind)</li>
              <li>Mayor latencia por IPC entre driver y kernel</li>
              <li>Frameworks: Linux UIO, VFIO, Windows UMDF, macOS IOKit (parcialmente)</li>
            </ul>
          </ConceptCard>
        </div>

        <InfoCallout variant="info" title="Linux Kernel Modules (LKM)">
          <p>
            Linux permite cargar drivers en tiempo de ejecución sin reiniciar:{" "}
            <code>modprobe nvme</code> carga el driver NVMe,{" "}
            <code>rmmod nvme</code> lo descarga. Los módulos corren en{" "}
            <strong>modo kernel completo</strong> — son parte del kernel aunque
            se carguen dinámicamente. Cada módulo expone:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><code>module_init()</code>: se llama al cargar (insmod/modprobe)</li>
            <li><code>module_exit()</code>: se llama al descargar (rmmod)</li>
            <li>Operaciones de archivo: <code>open</code>, <code>read</code>, <code>write</code>, <code>ioctl</code>, <code>release</code></li>
          </ul>
        </InfoCallout>

        <ExampleBlock title="Ciclo de vida de una operación read() hasta el disco">
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>Proceso de usuario</strong> llama <code>read(fd, buf, 4096)</code>{" "}
              → trap al kernel (syscall)
            </li>
            <li>
              <strong>VFS</strong> identifica el tipo de filesystem y el
              dispositivo de bloque. Busca en page cache. Si es cache miss,
              pide al block layer que traiga el bloque del disco
            </li>
            <li>
              <strong>Block layer</strong> agrega la solicitud a la cola de I/O
              del dispositivo. El scheduler de disco (si es HDD) la reordena
            </li>
            <li>
              <strong>Driver AHCI/NVMe</strong> escribe los registros del
              controlador con el comando de lectura, LBA (dirección del bloque),
              y la dirección DMA del buffer en RAM
            </li>
            <li>
              <strong>Controlador de disco</strong> ejecuta la operación de
              lectura física y transfiere los datos vía DMA a RAM
            </li>
            <li>
              <strong>Interrupción</strong>: el controlador notifica que terminó
              → ISR del driver marca la operación completa
            </li>
            <li>
              <strong>Proceso despertado</strong>: el scheduler corre el proceso
              → <code>read()</code> retorna, copiando los datos del buffer del
              kernel al buffer del usuario
            </li>
          </ol>
        </ExampleBlock>

        <InfoCallout variant="warning" title="Reglas de oro en interrupt handlers">
          <p>Los ISRs tienen restricciones estrictas porque interrumpen código arbitrario:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Nunca dormir</strong> (no mutex, no sleep, no memoria paginable)</li>
            <li><strong>Ser brevísimos</strong>: delegar trabajo pesado a un tasklet o workqueue</li>
            <li><strong>No llamar a código que pueda bloquear</strong></li>
            <li>Usar <strong>spinlocks</strong> (no mutexes) si necesitan sincronización</li>
          </ul>
        </InfoCallout>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 7: Quiz */}
      {/* ============================================ */}
      <SectionBlock id="quiz" title="Quiz del Capítulo 5">
        <p className="text-muted leading-relaxed mb-4">
          Evaluá tu comprensión de E/S, interrupciones, DMA, scheduling de disco
          y drivers. Los conceptos de este capítulo aparecen frecuentemente en
          preguntas de examen sobre rendimiento del sistema.
        </p>
        <QuizContainer questions={quizSoCh5} chapterTitle={chapter.title} />
      </SectionBlock>
    </ChapterLayout>
  );
}

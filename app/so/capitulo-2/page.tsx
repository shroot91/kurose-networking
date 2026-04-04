import { soChapters } from "@/data/so-chapters";
import { ChapterLayout } from "@/components/layout/chapter-layout";
import { SectionBlock } from "@/components/content/section-block";
import { ConceptCard } from "@/components/content/concept-card";
import { ExampleBlock } from "@/components/content/example-block";
import { ComparisonTable } from "@/components/content/comparison-table";
import { InfoCallout } from "@/components/content/info-callout";
import { QuizContainer } from "@/components/quiz/quiz-container";
import { quizSoCh2 } from "@/data/quiz-so-ch2";
import {
  GitBranch,
  Cpu,
  Layers,
  ArrowRightLeft,
  Lock,
  AlertTriangle,
  Clock,
  Database,
  Network,
  Zap,
  Users,
  RefreshCw,
  GitMerge,
  BarChart2,
  Shield,
} from "lucide-react";

const chapter = soChapters[1];

export default function SOCapitulo2() {
  return (
    <ChapterLayout chapter={chapter} allChapters={soChapters}>
      {/* ============================================ */}
      {/* SECCIÓN 1: Modelo de Proceso */}
      {/* ============================================ */}
      <SectionBlock id="modelo-proceso" title="Modelo de Proceso">
        <p className="text-muted leading-relaxed">
          Un <strong>proceso</strong> es la abstracción central de cualquier
          sistema operativo moderno: es un{" "}
          <strong>programa en ejecución</strong>, con su propio espacio de
          direcciones, estado de CPU, y conjunto de recursos del sistema. La
          diferencia entre programa y proceso es la misma que entre una receta
          de cocina y el acto de cocinar: la receta es código estático en disco;
          el proceso es la actividad dinámica que ocurre cuando la CPU la
          ejecuta.
        </p>

        <InfoCallout variant="tip" title="Analogía: El cocinero en su estación">
          <p>
            Pensá en un restaurante de alta cocina. La <strong>CPU</strong> es
            la cocina compartida — el espacio físico donde se cocina. Cada{" "}
            <strong>proceso</strong> es un cocinero en su propia estación, con
            sus ingredientes (datos), su receta (código), sus utensilios
            (archivos abiertos) y su lista de tareas pendientes (pila). Cuando
            el chef ejecutivo (scheduler) decide que es turno de otro cocinero,
            el primero guarda exactamente dónde estaba (context switch) para
            poder retomar después sin perder el hilo.
          </p>
        </InfoCallout>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Espacio de Direcciones"
            icon={Layers}
            color="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:border-orange-800"
          >
            <p>
              Cada proceso tiene su propio espacio de direcciones virtuales,
              dividido en segmentos:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
              <li>
                <strong>Texto (code):</strong> instrucciones del programa, de
                solo lectura
              </li>
              <li>
                <strong>Datos:</strong> variables globales e inicializadas
              </li>
              <li>
                <strong>BSS:</strong> variables globales no inicializadas
              </li>
              <li>
                <strong>Heap:</strong> memoria dinámica (malloc/new), crece
                hacia arriba
              </li>
              <li>
                <strong>Pila (stack):</strong> variables locales y frames de
                función, crece hacia abajo
              </li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="PCB — Process Control Block"
            icon={Database}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p>
              El PCB es la estructura de datos en el kernel que representa un
              proceso. Es su &quot;pasaporte&quot; dentro del SO:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
              <li>
                <strong>PID:</strong> identificador único del proceso
              </li>
              <li>
                <strong>Estado:</strong> New, Ready, Running, Blocked, Terminated
              </li>
              <li>
                <strong>Registros de CPU:</strong> PC, SP, registros de propósito general
              </li>
              <li>
                <strong>Info de memoria:</strong> base/límite o tabla de páginas
              </li>
              <li>
                <strong>Tabla de archivos abiertos</strong>
              </li>
              <li>
                <strong>Señales pendientes</strong>, usuario dueño, prioridad
              </li>
            </ul>
          </ConceptCard>
        </div>

        <h3 className="text-lg font-semibold mt-8 mb-4">
          Árbol de Procesos en Unix/Linux
        </h3>

        <p className="text-muted leading-relaxed">
          En Unix, los procesos forman un <strong>árbol jerárquico</strong>. El
          proceso raíz es <code className="bg-muted/40 px-1 rounded">init</code>{" "}
          (PID 1 en Linux antiguo, o{" "}
          <code className="bg-muted/40 px-1 rounded">systemd</code> en
          distribuciones modernas). Todos los demás procesos son descendientes
          creados mediante <code className="bg-muted/40 px-1 rounded">fork()</code>
          .
        </p>

        <div className="bg-muted/20 rounded-xl p-5 font-mono text-xs space-y-1 border border-border mt-4">
          <p className="text-muted font-sans text-sm font-semibold mb-3">
            Jerarquía típica de procesos en Linux:
          </p>
          <p>
            <span className="text-orange-600 dark:text-orange-400">
              init/systemd
            </span>{" "}
            (PID 1)
          </p>
          <p className="ml-4">
            ├──{" "}
            <span className="text-blue-600 dark:text-blue-400">login</span>{" "}
            (PID 412)
          </p>
          <p className="ml-8">
            └──{" "}
            <span className="text-blue-600 dark:text-blue-400">bash</span>{" "}
            (PID 1023)
          </p>
          <p className="ml-12">
            ├──{" "}
            <span className="text-emerald-600 dark:text-emerald-400">ls</span>{" "}
            (PID 2847) ← proceso hijo creado por fork()+exec()
          </p>
          <p className="ml-12">
            └──{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              grep
            </span>{" "}
            (PID 2848)
          </p>
          <p className="ml-4">
            ├──{" "}
            <span className="text-purple-600 dark:text-purple-400">sshd</span>{" "}
            (PID 891)
          </p>
          <p className="ml-4">
            └──{" "}
            <span className="text-purple-600 dark:text-purple-400">cron</span>{" "}
            (PID 932)
          </p>
        </div>

        <ConceptCard
          title="Context Switch: el costo oculto"
          icon={ArrowRightLeft}
          color="bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800"
        >
          <p>
            Cuando el SO cambia la CPU de un proceso a otro, debe{" "}
            <strong>guardar todo el contexto del proceso saliente</strong> en su
            PCB y <strong>restaurar el contexto del proceso entrante</strong>{" "}
            desde su PCB. Este overhead incluye:
          </p>
          <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
            <li>Guardar/restaurar ~30-40 registros de CPU (x86-64)</li>
            <li>
              Cambiar el espacio de direcciones (CR3 en x86 → invalida TLB)
            </li>
            <li>
              Invalidar cachés (cold cache penaliza los primeros accesos del
              nuevo proceso)
            </li>
          </ul>
          <p className="mt-2 text-sm">
            Un context switch entre procesos tarda entre{" "}
            <strong>1 y 10 microsegundos</strong> en hardware moderno. Parece
            poco, pero con miles de switches por segundo, el overhead se acumula
            rápidamente.
          </p>
        </ConceptCard>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 2: Estados y Ciclo de Vida */}
      {/* ============================================ */}
      <SectionBlock id="estados-proceso" title="Estados y Ciclo de Vida">
        <p className="text-muted leading-relaxed">
          Un proceso no siempre está usando la CPU. A lo largo de su vida,
          atraviesa diferentes <strong>estados</strong> que reflejan su
          relación con los recursos disponibles. El scheduler del SO gestiona
          las transiciones entre estos estados.
        </p>

        <div className="bg-muted/20 rounded-xl p-6 border border-border">
          <p className="text-sm font-semibold text-muted mb-4">
            Diagrama de estados del proceso (5 estados):
          </p>
          <div className="grid grid-cols-5 gap-2 text-center text-xs font-mono items-center">
            <div className="rounded-lg bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 p-2 text-emerald-700 dark:text-emerald-300 font-semibold">
              NUEVO
            </div>
            <div className="text-muted">→ admitido →</div>
            <div className="rounded-lg bg-blue-100 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-700 p-2 text-blue-700 dark:text-blue-300 font-semibold">
              LISTO
            </div>
            <div className="text-muted flex flex-col gap-1">
              <span>← preempt ←</span>
              <span>→ dispatch →</span>
            </div>
            <div className="rounded-lg bg-orange-100 dark:bg-orange-950/40 border border-orange-300 dark:border-orange-700 p-2 text-orange-700 dark:text-orange-300 font-semibold">
              EJECUTANDO
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2 text-center text-xs mt-4 items-center">
            <div></div>
            <div></div>
            <div className="rounded-lg bg-amber-100 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 p-2 text-amber-700 dark:text-amber-300 font-semibold">
              BLOQUEADO
            </div>
            <div className="text-muted flex flex-col gap-1">
              <span>↗ E/S completa ↗</span>
              <span>↙ espera E/S ↙</span>
            </div>
            <div className="rounded-lg bg-red-100 dark:bg-red-950/40 border border-red-300 dark:border-red-700 p-2 text-red-700 dark:text-red-300 font-semibold">
              TERMINADO
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          <ConceptCard
            title="Nuevo (New)"
            icon={GitBranch}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <p className="text-sm">
              El proceso fue creado (PCB asignado) pero aún no está en la cola
              de listos. El SO inicializa sus estructuras de datos.
            </p>
          </ConceptCard>
          <ConceptCard
            title="Listo (Ready)"
            icon={Clock}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p className="text-sm">
              El proceso tiene todos los recursos necesarios EXCEPTO la CPU.
              Está en la <strong>cola de listos</strong>, esperando ser
              despachado por el scheduler.
            </p>
          </ConceptCard>
          <ConceptCard
            title="Ejecutando (Running)"
            icon={Cpu}
            color="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:border-orange-800"
          >
            <p className="text-sm">
              La CPU ejecuta instrucciones del proceso. En un sistema
              monoprocesador, solo puede haber <strong>un proceso</strong> en
              este estado a la vez.
            </p>
          </ConceptCard>
          <ConceptCard
            title="Bloqueado (Blocked)"
            icon={Lock}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <p className="text-sm">
              El proceso espera un evento externo: E/S completada, señal,
              semáforo, resultado de red. No puede ejecutar aunque la CPU esté
              libre.
            </p>
          </ConceptCard>
          <ConceptCard
            title="Terminado (Terminated)"
            icon={Shield}
            color="bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800"
          >
            <p className="text-sm">
              El proceso llamó a <code>exit()</code> o fue terminado por una
              señal. Su PCB persiste hasta que el padre hace{" "}
              <code>wait()</code>. Mientras tanto: <strong>zombie</strong>.
            </p>
          </ConceptCard>
        </div>

        <h3 className="text-lg font-semibold mt-8 mb-4">
          fork(), exec(), exit() y wait(): el ciclo de vida en Unix
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="fork() — Clonar un proceso"
            icon={GitMerge}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p className="text-sm">
              Crea una copia casi exacta del proceso padre. El hijo hereda:
              código, datos, heap, pila, archivos abiertos, señales. Difieren
              en: PID, PPID, y el valor de retorno de fork() (0 en el hijo, PID
              del hijo en el padre). Modernamente usa{" "}
              <strong>Copy-on-Write</strong>: las páginas se comparten hasta
              que alguno las modifica.
            </p>
          </ConceptCard>
          <ConceptCard
            title="exec() — Reemplazar imagen"
            icon={RefreshCw}
            color="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800"
          >
            <p className="text-sm">
              Reemplaza el espacio de direcciones del proceso actual con un
              nuevo programa. El PID no cambia. Los archivos abiertos (salvo
              los marcados con close-on-exec) se heredan. Si exec() tiene
              éxito, <strong>nunca retorna</strong> al código anterior.
            </p>
          </ConceptCard>
        </div>

        <InfoCallout variant="info" title="Señales en Unix">
          <p>
            Las señales son notificaciones asíncronas que el SO envía a un
            proceso. Las más importantes:
          </p>
          <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
            <li>
              <strong>SIGKILL (9):</strong> terminación inmediata, no puede
              ignorarse ni capturarse
            </li>
            <li>
              <strong>SIGTERM (15):</strong> solicitud de terminación, el
              proceso puede limpiar y terminar gracefully
            </li>
            <li>
              <strong>SIGCHLD:</strong> enviado al padre cuando un hijo termina
            </li>
            <li>
              <strong>SIGSEGV:</strong> acceso inválido a memoria (segmentation
              fault)
            </li>
            <li>
              <strong>SIGINT:</strong> interrupción desde teclado (Ctrl+C)
            </li>
          </ul>
        </InfoCallout>

        <ExampleBlock title='¿Qué sucede cuando ejecutás "ls -l" en bash?'>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>bash llama a fork():</strong> se crea un proceso hijo
              con PID nuevo. Ambos procesos continúan desde la instrucción
              siguiente al fork().
            </li>
            <li>
              <strong>El hijo llama a exec(&quot;/bin/ls&quot;, [&quot;ls&quot;, &quot;-l&quot;]):</strong>{" "}
              el espacio de direcciones del hijo se reemplaza con el binario
              de ls. El hijo pasa a ejecutar el código de ls.
            </li>
            <li>
              <strong>bash llama a wait(hijo_pid):</strong> el proceso bash
              padre se bloquea, esperando que ls termine. Su estado cambia a
              Bloqueado.
            </li>
            <li>
              <strong>ls termina (exit(0)):</strong> su estado cambia a
              Terminado/Zombie. El SO envía SIGCHLD a bash.
            </li>
            <li>
              <strong>bash se desbloquea:</strong> wait() retorna con el PID
              y código de salida del hijo. El PCB del hijo se libera. bash
              vuelve a estado Listo/Ejecutando y muestra el prompt.
            </li>
          </ol>
          <p className="mt-3 text-sm italic text-muted">
            El patrón fork() + exec() + wait() es la base de toda la ejecución
            de programas en Unix. Es elegante: fork() copia el contexto del
            padre (incluyendo archivos abiertos y variables de entorno), y
            exec() lo reemplaza con el nuevo programa sin necesitar un API más
            compleja.
          </p>
        </ExampleBlock>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 3: Hilos */}
      {/* ============================================ */}
      <SectionBlock id="hilos" title="Hilos (Threads)">
        <p className="text-muted leading-relaxed">
          Un <strong>hilo</strong> (thread) es la unidad mínima de ejecución
          dentro de un proceso. Mientras que los procesos tienen su propio
          espacio de direcciones, los hilos dentro del mismo proceso{" "}
          <strong>comparten</strong> el espacio de memoria, el heap, los
          archivos abiertos y la mayoría de los recursos. Cada hilo tiene su
          propio stack y sus propios registros (incluyendo el PC).
        </p>

        <InfoCallout variant="tip" title="Analogía: La empresa y sus empleados">
          <p>
            Un <strong>proceso</strong> es como una empresa: tiene su propio
            edificio (espacio de memoria), sus propios activos (archivos
            abiertos), y una identidad legal (PID). Los{" "}
            <strong>hilos</strong> son los empleados que trabajan dentro de esa
            empresa: comparten la oficina, las herramientas comunes (heap,
            código, descriptores de archivo), pero cada uno tiene su propio
            escritorio (stack), su propia libreta de notas (registros), y puede
            estar en diferentes tareas (PC apunta a diferentes instrucciones).
          </p>
        </InfoCallout>

        <ComparisonTable
          headers={["Característica", "Procesos", "Hilos (mismo proceso)"]}
          rows={[
            ["Espacio de memoria", "Separado (aislado)", "Compartido"],
            ["Heap", "Separado", "Compartido"],
            ["Código (texto)", "Separado", "Compartido"],
            ["Archivos abiertos", "Separados (heredados por fork)", "Compartidos"],
            ["Stack", "Separado", "Propio por hilo"],
            ["Registros de CPU", "Separados (en PCB)", "Propios por hilo"],
            ["Context switch", "Costoso (TLB flush)", "Barato (mismo espacio)"],
            ["Comunicación", "IPC explícito", "Memoria compartida directa"],
            ["Aislamiento ante fallos", "Alto (proceso falla solo)", "Bajo (un hilo mata al proceso)"],
            ["Creación", "Costosa (fork)", "Barata (pthread_create)"],
          ]}
        />

        <h3 className="text-lg font-semibold mt-8 mb-4">
          Modelos de implementación de hilos
        </h3>

        <div className="grid gap-4 sm:grid-cols-3">
          <ConceptCard
            title="M:1 — Hilos de usuario"
            icon={Users}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <p className="text-sm">
              Muchos hilos de usuario mapeados a 1 hilo de kernel. La
              biblioteca gestiona los switches sin llamadas al sistema.{" "}
              <strong>Problema crítico:</strong> si un hilo llama a una syscall
              bloqueante, todo el proceso se bloquea.
            </p>
          </ConceptCard>
          <ConceptCard
            title="1:1 — Hilos de kernel"
            icon={Cpu}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p className="text-sm">
              Cada hilo de usuario tiene su propio hilo de kernel. Es el modelo
              de Linux (POSIX pthreads) y Windows. Un hilo bloqueado no afecta
              a los demás. <strong>Desventaja:</strong> mayor overhead de
              creación y switch.
            </p>
          </ConceptCard>
          <ConceptCard
            title="M:N — Híbrido"
            icon={GitMerge}
            color="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800"
          >
            <p className="text-sm">
              M hilos de usuario mapeados a N hilos de kernel (N ≤ M).
              Combina flexibilidad y rendimiento. Complejo de implementar
              correctamente. Usado en Go (goroutines) y Erlang.
            </p>
          </ConceptCard>
        </div>

        <InfoCallout variant="warning" title="El problema de los hilos: compartir es peligroso">
          <p>
            La ventaja de los hilos (memoria compartida) es también su mayor
            riesgo. Cuando dos hilos acceden y modifican la misma variable
            simultáneamente sin sincronización, el resultado es{" "}
            <strong>no determinista</strong>. Esta situación se llama{" "}
            <strong>condición de carrera (race condition)</strong> y es la
            fuente de los bugs más difíciles de reproducir y debuggear en
            software concurrente.
          </p>
        </InfoCallout>

        <ExampleBlock title="Servidor web: hilo por conexión vs proceso por conexión">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold mb-2">
                Modelo multi-proceso (Apache clásico):
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>fork() por cada conexión nueva</li>
                <li>Cada proceso: ~1-2 MB de overhead</li>
                <li>Aislamiento total: un crash no afecta otros</li>
                <li>1000 conexiones = 1-2 GB de memoria</li>
                <li>Context switch costoso (TLB flush)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">
                Modelo multi-hilo (Nginx workers):
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>pthread_create() por conexión</li>
                <li>Cada hilo: ~8-64 KB de stack</li>
                <li>Memoria compartida entre conexiones</li>
                <li>1000 conexiones = ~64 MB de memoria</li>
                <li>Context switch barato (mismo espacio)</li>
              </ul>
            </div>
          </div>
          <p className="mt-3 text-sm italic">
            Nginx va un paso más allá: usa un modelo event-driven con pocos
            hilos (uno por CPU) que manejan miles de conexiones con E/S
            no-bloqueante (epoll), evitando el overhead de crear hilos por
            conexión.
          </p>
        </ExampleBlock>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 4: Comunicación entre Procesos */}
      {/* ============================================ */}
      <SectionBlock
        id="comunicacion-procesos"
        title="Comunicación entre Procesos (IPC)"
      >
        <p className="text-muted leading-relaxed">
          Los procesos tienen espacios de memoria separados — por diseño y
          seguridad. Para comunicarse, necesitan mecanismos provistos por el
          SO. Cada mecanismo de IPC tiene un trade-off entre velocidad,
          complejidad y alcance.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Pipes — Tuberías"
            icon={ArrowRightLeft}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p className="text-sm">
              Canal unidireccional de comunicación entre procesos relacionados
              (padre-hijo o hermanos). Se crea con{" "}
              <code className="bg-muted/40 px-1 rounded">pipe(fd[2])</code>:{" "}
              <code>fd[0]</code> para leer, <code>fd[1]</code> para escribir.
              El SO mantiene un buffer interno (~65 KB). Lectura de pipe vacío
              bloquea; escritura en pipe lleno también bloquea.
            </p>
            <p className="mt-2 text-sm font-mono bg-muted/30 rounded p-2">
              ls -l | grep .txt | wc -l
            </p>
            <p className="text-xs mt-1">
              Tres procesos conectados por dos pipes: stdout de ls → stdin de
              grep → stdin de wc.
            </p>
          </ConceptCard>

          <ConceptCard
            title="Named Pipes (FIFOs)"
            icon={Database}
            color="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/30 dark:text-indigo-300 dark:border-indigo-800"
          >
            <p className="text-sm">
              Similares a pipes pero tienen un nombre en el filesystem, lo que
              permite comunicación entre procesos no relacionados. Se crean con{" "}
              <code className="bg-muted/40 px-1 rounded">mkfifo</code> o la
              syscall <code>mknod</code>. Persisten en el filesystem hasta ser
              eliminados explícitamente. Útiles para comunicación entre
              demonios y aplicaciones.
            </p>
          </ConceptCard>

          <ConceptCard
            title="Message Queues"
            icon={Layers}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <p className="text-sm">
              El SO mantiene una cola de mensajes con tipo y prioridad. Los
              procesos envían (<code>msgsnd</code>) y reciben (
              <code>msgrcv</code>) mensajes de forma asíncrona. Ventaja:
              desacoplamiento temporal — el emisor no necesita esperar a que el
              receptor esté listo. Útil en arquitecturas productor-consumidor.
            </p>
          </ConceptCard>

          <ConceptCard
            title="Memoria Compartida"
            icon={Zap}
            color="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:border-orange-800"
          >
            <p className="text-sm">
              El mecanismo más rápido: dos procesos mapean la misma región
              física de RAM en sus espacios virtuales con{" "}
              <code className="bg-muted/40 px-1 rounded">shmget</code> o{" "}
              <code className="bg-muted/40 px-1 rounded">mmap</code>. No hay
              copia de datos. El acceso es tan rápido como acceder a memoria
              local. <strong>Requiere sincronización explícita</strong> (un
              semáforo o mutex) para evitar race conditions.
            </p>
          </ConceptCard>

          <ConceptCard
            title="Sockets"
            icon={Network}
            color="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800"
          >
            <p className="text-sm">
              Comunicación bidireccional entre procesos en la misma máquina
              (Unix domain sockets) o en máquinas diferentes (TCP/IP sockets).
              Son la base de toda la comunicación en red. Unix domain sockets
              (AF_UNIX) son más rápidos que TCP/localhost al evitar el stack de
              red. Usados por Docker, Postgres, Nginx.
            </p>
          </ConceptCard>

          <ConceptCard
            title="Señales (Signals)"
            icon={AlertTriangle}
            color="bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800"
          >
            <p className="text-sm">
              Notificación asíncrona de eventos. El SO &quot;interrumpe&quot; al
              proceso y ejecuta su handler. No transmiten datos (solo el número
              de señal). Útiles para control (SIGTERM, SIGKILL) y notificaciones
              simples (SIGCHLD, SIGALRM). Los procesos pueden instalar handlers
              con <code>sigaction()</code>.
            </p>
          </ConceptCard>
        </div>

        <ComparisonTable
          headers={[
            "Mecanismo",
            "Velocidad",
            "Dirección",
            "Entre máquinas",
            "Uso típico",
          ]}
          rows={[
            ["Pipe anónimo", "Alta", "Unidireccional", "No", "Shell pipelines, padre-hijo"],
            ["Named Pipe (FIFO)", "Alta", "Unidireccional", "No", "Procesos no relacionados"],
            ["Message Queue", "Media", "Bidireccional", "No", "Productor-consumidor asíncrono"],
            ["Memoria compartida", "Muy alta (0 copias)", "Bidireccional", "No", "Grandes volúmenes de datos"],
            ["Socket TCP/IP", "Media-baja", "Bidireccional", "Sí", "Comunicación en red, microservicios"],
            ["Unix domain socket", "Alta", "Bidireccional", "No", "IPC local de alto rendimiento"],
            ["Señal", "Muy baja (1 bit)", "Unidireccional", "No", "Control, notificaciones simples"],
          ]}
        />
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 5: Sincronización */}
      {/* ============================================ */}
      <SectionBlock
        id="sincronizacion"
        title="Sincronización y Exclusión Mutua"
      >
        <p className="text-muted leading-relaxed">
          Cuando múltiples hilos o procesos comparten datos, necesitan
          coordinarse. Sin sincronización, los resultados son no deterministas
          y dependen de la intercalación exacta de instrucciones —
          prácticamente imposible de testear exhaustivamente.
        </p>

        <ExampleBlock title="Race condition clásica: contador++ con dos hilos">
          <p>
            La operación <code>contador++</code> parece atómica pero NO lo es.
            A nivel de instrucciones de máquina:
          </p>
          <div className="font-mono text-xs bg-muted/30 rounded p-3 mt-2 space-y-1">
            <p className="text-muted">; Las 3 microinstrucciones de contador++:</p>
            <p>
              <span className="text-blue-600 dark:text-blue-400">LOAD</span>{" "}
              R1, [contador] &nbsp;&nbsp;; R1 = valor actual de contador
            </p>
            <p>
              <span className="text-blue-600 dark:text-blue-400">ADD</span>{" "}
              R1, 1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;; R1
              = R1 + 1
            </p>
            <p>
              <span className="text-blue-600 dark:text-blue-400">STORE</span>{" "}
              [contador], R1 &nbsp;; contador = R1
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="font-semibold text-sm mb-1 text-red-600">
                Ejecución con race condition (contador=0 inicial):
              </p>
              <div className="font-mono text-xs space-y-0.5">
                <p>
                  <span className="text-blue-500">Hilo A:</span> LOAD R1 ← 0
                </p>
                <p>
                  <span className="text-purple-500">Hilo B:</span> LOAD R2 ← 0
                  &nbsp; ← context switch!
                </p>
                <p>
                  <span className="text-blue-500">Hilo A:</span> ADD R1 = 1
                </p>
                <p>
                  <span className="text-blue-500">Hilo A:</span> STORE contador = 1
                </p>
                <p>
                  <span className="text-purple-500">Hilo B:</span> ADD R2 = 1
                </p>
                <p>
                  <span className="text-purple-500">Hilo B:</span> STORE contador = 1
                </p>
                <p className="text-red-600 font-semibold mt-1">
                  Resultado: 1 (debería ser 2!)
                </p>
              </div>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1 text-emerald-600">
                Ejecución correcta (secuencial):
              </p>
              <div className="font-mono text-xs space-y-0.5">
                <p>
                  <span className="text-blue-500">Hilo A:</span> LOAD R1 ← 0
                </p>
                <p>
                  <span className="text-blue-500">Hilo A:</span> ADD R1 = 1
                </p>
                <p>
                  <span className="text-blue-500">Hilo A:</span> STORE contador = 1
                </p>
                <p>
                  <span className="text-purple-500">Hilo B:</span> LOAD R2 ← 1
                </p>
                <p>
                  <span className="text-purple-500">Hilo B:</span> ADD R2 = 2
                </p>
                <p>
                  <span className="text-purple-500">Hilo B:</span> STORE contador = 2
                </p>
                <p className="text-emerald-600 font-semibold mt-1">
                  Resultado: 2 (correcto)
                </p>
              </div>
            </div>
          </div>
        </ExampleBlock>

        <h3 className="text-lg font-semibold mt-8 mb-4">
          La Sección Crítica y sus Requisitos
        </h3>

        <p className="text-muted leading-relaxed">
          Una <strong>sección crítica</strong> es una región de código que
          accede a recursos compartidos (variables, archivos, dispositivos).
          Cualquier solución al problema de la sección crítica debe cumplir
          tres propiedades simultáneamente:
        </p>

        <div className="grid gap-4 sm:grid-cols-3 mt-4">
          <ConceptCard
            title="1. Exclusión Mutua"
            icon={Lock}
            color="bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800"
          >
            <p className="text-sm">
              Si el proceso P_i está en su sección crítica, ningún otro proceso
              puede estar en la suya al mismo tiempo. Es la propiedad{" "}
              <strong>fundamental</strong>.
            </p>
          </ConceptCard>
          <ConceptCard
            title="2. Progreso"
            icon={ArrowRightLeft}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p className="text-sm">
              Si ningún proceso está en la sección crítica y hay procesos que
              quieren entrar, la decisión de quién entra no puede postergarse
              indefinidamente.
            </p>
          </ConceptCard>
          <ConceptCard
            title="3. Espera Acotada"
            icon={Clock}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <p className="text-sm">
              Debe existir un límite superior en la cantidad de veces que otros
              procesos pueden entrar a su sección crítica después de que P_i
              solicitó entrar. Previene{" "}
              <strong>starvation</strong>.
            </p>
          </ConceptCard>
        </div>

        <h3 className="text-lg font-semibold mt-8 mb-4">
          Mutex, Semáforos y Variables de Condición
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Mutex (Mutual Exclusion Lock)"
            icon={Lock}
            color="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:border-orange-800"
          >
            <p className="text-sm">
              La primitiva más simple: un lock binario. Solo el hilo que lo
              adquirió puede liberarlo.
            </p>
            <div className="font-mono text-xs bg-muted/30 rounded p-2 mt-2 space-y-1">
              <p>pthread_mutex_lock(&amp;mutex);&nbsp;&nbsp; // bloquea si ocupado</p>
              <p className="text-muted">/* sección crítica */</p>
              <p>contador++;</p>
              <p>pthread_mutex_unlock(&amp;mutex); // libera</p>
            </div>
            <p className="text-sm mt-2">
              <strong>Blocking mutex:</strong> el hilo que no puede adquirir el
              lock se bloquea (estado Bloqueado). El SO lo despertará cuando el
              lock se libere. Más eficiente que busy-waiting para secciones
              críticas largas.
            </p>
          </ConceptCard>

          <ConceptCard
            title="Semáforos de Dijkstra"
            icon={BarChart2}
            color="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800"
          >
            <p className="text-sm">
              Un semáforo es una variable entera con dos operaciones atómicas:
            </p>
            <div className="font-mono text-xs bg-muted/30 rounded p-2 mt-2 space-y-1">
              <p className="text-muted">/* wait() también llamada P() o down() */</p>
              <p>wait(S): S--; if S&lt;0: bloquear</p>
              <p className="mt-1 text-muted">/* signal() también llamada V() o up() */</p>
              <p>signal(S): S++; if S≤0: despertar uno</p>
            </div>
            <p className="text-sm mt-2">
              <strong>Semáforo binario (S=1):</strong> equivalente a un mutex.{" "}
              <strong>Semáforo contador (S=N):</strong> permite hasta N accesos
              simultáneos. Útil para pool de recursos (ej. N conexiones a DB).
            </p>
          </ConceptCard>
        </div>

        <ExampleBlock title="Problema Productor-Consumidor con semáforos (buffer de N posiciones)">
          <p className="text-sm mb-3">
            Tres semáforos: <code>mutex=1</code> (exclusión mutua en el
            buffer), <code>empty=N</code> (posiciones libres),{" "}
            <code>full=0</code> (posiciones ocupadas).
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-sm mb-1">Productor:</p>
              <div className="font-mono text-xs bg-muted/30 rounded p-3 space-y-1">
                <p>while(true) {"{"}</p>
                <p className="ml-4">producir_item();</p>
                <p className="ml-4 text-blue-600 dark:text-blue-400">
                  wait(empty); &nbsp;// ¿hay espacio?
                </p>
                <p className="ml-4 text-orange-600 dark:text-orange-400">
                  wait(mutex); &nbsp;// exclusión mutua
                </p>
                <p className="ml-4">agregar_al_buffer();</p>
                <p className="ml-4 text-orange-600 dark:text-orange-400">
                  signal(mutex);
                </p>
                <p className="ml-4 text-purple-600 dark:text-purple-400">
                  signal(full); &nbsp;&nbsp;// avisar al consumidor
                </p>
                <p>{"}"}</p>
              </div>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Consumidor:</p>
              <div className="font-mono text-xs bg-muted/30 rounded p-3 space-y-1">
                <p>while(true) {"{"}</p>
                <p className="ml-4 text-purple-600 dark:text-purple-400">
                  wait(full); &nbsp;&nbsp;// ¿hay datos?
                </p>
                <p className="ml-4 text-orange-600 dark:text-orange-400">
                  wait(mutex); &nbsp;// exclusión mutua
                </p>
                <p className="ml-4">tomar_del_buffer();</p>
                <p className="ml-4 text-orange-600 dark:text-orange-400">
                  signal(mutex);
                </p>
                <p className="ml-4 text-blue-600 dark:text-blue-400">
                  signal(empty); &nbsp;// avisar al productor
                </p>
                <p className="ml-4">consumir_item();</p>
                <p>{"}"}</p>
              </div>
            </div>
          </div>
          <InfoCallout variant="warning" title="Orden crítico: wait(empty/full) ANTES de wait(mutex)">
            <p className="text-sm">
              Si invertís el orden y hacés wait(mutex) antes que wait(empty),
              podés tener deadlock: el productor adquiere el mutex y luego se
              bloquea en wait(empty) sin liberar el mutex. El consumidor
              necesita el mutex para liberar espacio pero no puede adquirirlo.
              Deadlock clásico.
            </p>
          </InfoCallout>
        </ExampleBlock>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 6: Deadlocks */}
      {/* ============================================ */}
      <SectionBlock id="deadlocks" title="Deadlocks">
        <p className="text-muted leading-relaxed">
          Un <strong>deadlock</strong> (interbloqueo) ocurre cuando un conjunto
          de procesos está bloqueado permanentemente porque cada proceso en el
          conjunto espera un recurso que tiene otro proceso del conjunto. Es una
          situación de espera circular sin salida.
        </p>

        <InfoCallout variant="warning" title="Las 4 Condiciones de Coffman (1971)">
          <p>
            Para que ocurra un deadlock deben cumplirse{" "}
            <strong>simultáneamente</strong> estas cuatro condiciones:
          </p>
          <ol className="list-decimal list-inside mt-2 space-y-2 text-sm">
            <li>
              <strong>Exclusión mutua:</strong> al menos un recurso es de uso
              exclusivo (no compartible simultáneamente).
            </li>
            <li>
              <strong>Hold-and-wait:</strong> un proceso retiene al menos un
              recurso mientras espera adquirir otros que están ocupados.
            </li>
            <li>
              <strong>No preemption:</strong> los recursos no pueden quitarse
              forzosamente a un proceso; solo se liberan voluntariamente.
            </li>
            <li>
              <strong>Espera circular:</strong> existe una cadena P₁→R₁→P₂→R₂→...→Pₙ→Rₙ→P₁
              donde P→R significa &quot;P espera R&quot; y R→P significa &quot;R está asignado
              a P&quot;.
            </li>
          </ol>
          <p className="mt-2 text-sm font-semibold">
            Eliminar CUALQUIERA de las cuatro condiciones previene el deadlock.
          </p>
        </InfoCallout>

        <ExampleBlock title="Deadlock clásico: Proceso A y B con mutex M1 y M2">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-sm mb-1">Proceso A:</p>
              <div className="font-mono text-xs bg-muted/30 rounded p-3 space-y-1">
                <p>lock(M1); &nbsp;&nbsp;&nbsp;// A adquiere M1 ✓</p>
                <p className="text-muted">/* ... hace algo ... */</p>
                <p>lock(M2); &nbsp;&nbsp;&nbsp;// A espera M2 ← BLOQUEADO</p>
                <p className="text-muted">/* sección crítica */</p>
                <p>unlock(M2);</p>
                <p>unlock(M1);</p>
              </div>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Proceso B:</p>
              <div className="font-mono text-xs bg-muted/30 rounded p-3 space-y-1">
                <p>lock(M2); &nbsp;&nbsp;&nbsp;// B adquiere M2 ✓</p>
                <p className="text-muted">/* ... hace algo ... */</p>
                <p>lock(M1); &nbsp;&nbsp;&nbsp;// B espera M1 ← BLOQUEADO</p>
                <p className="text-muted">/* sección crítica */</p>
                <p>unlock(M1);</p>
                <p>unlock(M2);</p>
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm">
            A tiene M1, espera M2. B tiene M2, espera M1.{" "}
            <strong>Ciclo de espera → deadlock.</strong> Solución: imponer un
            orden global en la adquisición de locks (siempre M1 antes que M2).
          </p>
        </ExampleBlock>

        <h3 className="text-lg font-semibold mt-8 mb-4">
          Estrategias ante Deadlocks
        </h3>

        <ComparisonTable
          headers={["Estrategia", "Mecanismo", "Costo", "Práctica"]}
          rows={[
            [
              "Prevención",
              "Viola una de las 4 condiciones de Coffman por diseño",
              "Bajo uso de recursos, posible starvation",
              "Parcial (orden global de locks)",
            ],
            [
              "Evasión (Banquero)",
              "Analiza si el estado post-asignación es seguro antes de asignar",
              "Alto (requiere conocer Maximum a priori, O(n²))",
              "Raro en producción",
            ],
            [
              "Detección y recuperación",
              "Periódicamente busca ciclos en el RAG; mata o revierte procesos",
              "Overhead periódico + pérdida de trabajo al recuperar",
              "Bases de datos (timeouts)",
            ],
            [
              "Ignorar (Política del Avestruz)",
              "No hacer nada; el usuario reinicia si hay deadlock",
              "Sin overhead; riesgo de colgarse",
              "Unix/Linux para la mayoría de recursos",
            ],
          ]}
        />

        <h3 className="text-lg font-semibold mt-8 mb-4">
          Algoritmo del Banquero (Dijkstra)
        </h3>

        <p className="text-muted leading-relaxed">
          El Algoritmo del Banquero calcula si el sistema está en un{" "}
          <strong>estado seguro</strong>: existe al menos una secuencia de
          finalización donde todos los procesos pueden completarse. Si la
          asignación de un recurso lleva a un estado inseguro, se rechaza.
        </p>

        <ExampleBlock title="Ejemplo numérico: 3 procesos, 2 tipos de recursos (A: 10 instancias, B: 5 instancias)">
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-center border-collapse">
              <thead>
                <tr className="bg-muted/30">
                  <th className="border border-border p-2">Proceso</th>
                  <th className="border border-border p-2" colSpan={2}>
                    Assigned (A, B)
                  </th>
                  <th className="border border-border p-2" colSpan={2}>
                    Maximum (A, B)
                  </th>
                  <th className="border border-border p-2" colSpan={2}>
                    Need = Max - Assigned
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">P0</td>
                  <td className="border border-border p-2">2</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">9</td>
                  <td className="border border-border p-2">2</td>
                  <td className="border border-border p-2 text-blue-600 dark:text-blue-400">
                    7
                  </td>
                  <td className="border border-border p-2 text-blue-600 dark:text-blue-400">
                    1
                  </td>
                </tr>
                <tr>
                  <td className="border border-border p-2">P1</td>
                  <td className="border border-border p-2">3</td>
                  <td className="border border-border p-2">2</td>
                  <td className="border border-border p-2">5</td>
                  <td className="border border-border p-2">3</td>
                  <td className="border border-border p-2 text-blue-600 dark:text-blue-400">
                    2
                  </td>
                  <td className="border border-border p-2 text-blue-600 dark:text-blue-400">
                    1
                  </td>
                </tr>
                <tr>
                  <td className="border border-border p-2">P2</td>
                  <td className="border border-border p-2">2</td>
                  <td className="border border-border p-2">2</td>
                  <td className="border border-border p-2">8</td>
                  <td className="border border-border p-2">4</td>
                  <td className="border border-border p-2 text-blue-600 dark:text-blue-400">
                    6
                  </td>
                  <td className="border border-border p-2 text-blue-600 dark:text-blue-400">
                    2
                  </td>
                </tr>
                <tr className="bg-emerald-50 dark:bg-emerald-950/30">
                  <td
                    className="border border-border p-2 font-semibold"
                    colSpan={3}
                  >
                    Disponible (Available): A=3, B=0
                  </td>
                  <td className="border border-border p-2" colSpan={4}></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm">
            <strong>¿Es estado seguro?</strong> Available = (3, 0). ¿Puede P1
            terminar? Need(P1)=(2,1) ≤ Available=(3,0)? No (necesita 1 de B,
            hay 0). ¿Puede P2? Need(P2)=(6,2) ≤ (3,0)? No. ¿Puede P0?
            Need(P0)=(7,1) ≤ (3,0)? No.{" "}
            <strong className="text-red-600 dark:text-red-400">
              Estado inseguro: posible deadlock.
            </strong>
          </p>
          <p className="mt-2 text-sm">
            Si Available fuera (3, 2): P1 podría terminar (Need=(2,1)≤(3,2)),
            liberaría (3,2)+(2,2)=(5,4). Luego P0 y P2 pueden terminar.
            Estado seguro con secuencia P1→P0→P2.
          </p>
        </ExampleBlock>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 7: Scheduling */}
      {/* ============================================ */}
      <SectionBlock id="scheduling" title="Algoritmos de Scheduling">
        <p className="text-muted leading-relaxed">
          El <strong>scheduler de CPU</strong> decide qué proceso de la cola
          de listos ejecuta la CPU a continuación. Es una de las decisiones
          más importantes del SO, con impacto directo en la experiencia del
          usuario y el rendimiento del sistema.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ConceptCard
            title="CPU Utilization"
            icon={Cpu}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p className="text-sm">
              Mantener la CPU ocupada la mayor fracción de tiempo posible.
              En sistemas reales: 40% (leve) a 90% (pesado).
            </p>
          </ConceptCard>
          <ConceptCard
            title="Throughput"
            icon={BarChart2}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <p className="text-sm">
              Procesos completados por unidad de tiempo. Maximizarlo es el
              objetivo en sistemas batch.
            </p>
          </ConceptCard>
          <ConceptCard
            title="Turnaround Time"
            icon={RefreshCw}
            color="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800"
          >
            <p className="text-sm">
              Tiempo total desde que el proceso llega hasta que termina.
              Turnaround = waiting + CPU burst + I/O.
            </p>
          </ConceptCard>
          <ConceptCard
            title="Waiting Time"
            icon={Clock}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <p className="text-sm">
              Tiempo total que el proceso pasa en la cola de listos esperando
              la CPU. La métrica que los algoritmos intentan minimizar.
            </p>
          </ConceptCard>
          <ConceptCard
            title="Response Time"
            icon={Zap}
            color="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:border-orange-800"
          >
            <p className="text-sm">
              Tiempo desde que se somete una request hasta la primera respuesta.
              Crítico en sistemas interactivos y de tiempo real.
            </p>
          </ConceptCard>
        </div>

        <h3 className="text-lg font-semibold mt-8 mb-4">
          Algoritmos principales
        </h3>

        <div className="space-y-6">
          <ConceptCard
            title="FCFS — First-Come, First-Served"
            icon={Layers}
            color="bg-card text-foreground border-border"
          >
            <p className="text-sm">
              El proceso que llega primero se ejecuta primero. Simple de
              implementar (cola FIFO). <strong>No preemptivo.</strong>
            </p>
            <p className="text-sm mt-2">
              <strong className="text-red-600 dark:text-red-400">
                Efecto convoy:
              </strong>{" "}
              un proceso largo bloquea a todos los cortos. P1=24ms llega en
              t=0, P2=3ms en t=1, P3=3ms en t=2. Waiting times: P1=0,
              P2=23, P3=26. Promedio: 16.3ms. Si el orden fuera P2,P3,P1:
              waiting promedio = 3ms. La diferencia es enorme.
            </p>
          </ConceptCard>

          <ConceptCard
            title="SJF — Shortest Job First"
            icon={BarChart2}
            color="bg-card text-foreground border-border"
          >
            <p className="text-sm">
              Ejecuta el proceso con el menor burst time estimado.{" "}
              <strong>Óptimo para minimizar waiting time promedio</strong>{" "}
              entre todos los algoritmos no preemptivos. El problema: hay que
              predecir el próximo burst time. Se estima con aging exponencial:
            </p>
            <div className="font-mono text-xs bg-muted/30 rounded p-2 mt-2">
              τ_{`n+1`} = α × t_n + (1-α) × τ_n
            </div>
            <p className="text-sm mt-2">
              donde t_n = burst CPU anterior real, τ_n = estimación anterior,
              α ∈ [0,1] controla el peso del historial reciente.
            </p>
            <p className="text-sm mt-2">
              <strong>SRTF (Shortest Remaining Time First):</strong> versión
              preemptiva. Si llega un proceso con burst menor que el tiempo
              restante del proceso actual, hay preemption. Óptimo globalmente.
            </p>
          </ConceptCard>

          <ConceptCard
            title="Round Robin (RR)"
            icon={RefreshCw}
            color="bg-card text-foreground border-border"
          >
            <p className="text-sm">
              Cada proceso recibe un <strong>quantum</strong> de tiempo (10-100ms
              típicamente). Al agotarse, el proceso va al final de la cola de
              listos. <strong>Preemptivo, justo, diseñado para tiempo
              compartido.</strong>
            </p>
            <p className="text-sm mt-2">
              Trade-off del quantum:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1 mt-1">
              <li>
                <strong>Quantum muy grande →</strong> degenera en FCFS, alta
                respuesta para procesos cortos
              </li>
              <li>
                <strong>Quantum muy pequeño →</strong> muchos context switches,
                overhead domina (si q=1ms y ctx_switch=0.1ms, 10% del tiempo
                en overhead)
              </li>
              <li>
                <strong>Regla práctica:</strong> el quantum debe ser mayor que
                el 80% de los CPU bursts (Tanenbaum)
              </li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="Priority Scheduling"
            icon={Shield}
            color="bg-card text-foreground border-border"
          >
            <p className="text-sm">
              Cada proceso tiene una prioridad. El scheduler ejecuta el proceso
              de mayor prioridad disponible. Puede ser preemptivo o no.
            </p>
            <p className="text-sm mt-2">
              <strong className="text-red-600 dark:text-red-400">
                Problema: Starvation.
              </strong>{" "}
              Un proceso de baja prioridad puede esperar indefinidamente si
              siempre llegan procesos de mayor prioridad.
            </p>
            <p className="text-sm mt-2">
              <strong>Solución: Aging.</strong> Incrementar gradualmente la
              prioridad de los procesos que llevan mucho tiempo en la cola.
              Garantiza que eventualmente cualquier proceso sea ejecutado.
            </p>
          </ConceptCard>

          <div className="grid gap-4 sm:grid-cols-2">
            <ConceptCard
              title="Multilevel Queue"
              icon={Layers}
              color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
            >
              <p className="text-sm">
                Colas separadas para diferentes tipos de procesos: real-time,
                interactivo, batch. Cada cola tiene su propio algoritmo. Los
                procesos pertenecen{" "}
                <strong>permanentemente</strong> a una cola — no pueden
                moverse.
              </p>
            </ConceptCard>
            <ConceptCard
              title="Multilevel Feedback Queue"
              icon={GitMerge}
              color="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800"
            >
              <p className="text-sm">
                Como MLMQ pero los procesos se <strong>mueven entre colas</strong>{" "}
                según su comportamiento. Un proceso que usa mucho CPU se
                degrada. Un proceso que hace mucha E/S sube. Adaptativo y
                flexible — es el scheduler usado en macOS y Linux (variante
                con Completely Fair Scheduler).
              </p>
            </ConceptCard>
          </div>
        </div>

        <ComparisonTable
          headers={[
            "Algoritmo",
            "Preemptivo",
            "Ventaja",
            "Desventaja",
          ]}
          rows={[
            [
              "FCFS",
              "No",
              "Simple, sin starvation",
              "Efecto convoy, waiting time alto",
            ],
            [
              "SJF",
              "No (SRTF: Sí)",
              "Óptimo en waiting time promedio",
              "Requiere estimar burst time, starvation posible",
            ],
            [
              "Round Robin",
              "Sí (quantum)",
              "Justo, buen response time interactivo",
              "Overhead context switch, peor turnaround que SJF",
            ],
            [
              "Priority",
              "Opcional",
              "Diferenciación por importancia del proceso",
              "Starvation de baja prioridad",
            ],
            [
              "Multilevel Queue",
              "Por cola",
              "Optimizado por tipo de proceso",
              "Procesos atrapados en su cola",
            ],
            [
              "MLFQ",
              "Sí",
              "Adaptativo, no requiere info a priori",
              "Complejo, posible gaming por procesos",
            ],
          ]}
        />

        <ExampleBlock title="Round Robin quantum=3: calcular waiting y turnaround (P1=6ms, P2=8ms, P3=7ms, todos llegan en t=0)">
          <p className="text-sm mb-3">
            Con quantum=3ms, todos los procesos llegan en t=0:
          </p>
          <div className="bg-muted/20 rounded-lg p-4 font-mono text-xs overflow-x-auto">
            <div className="space-y-1">
              <p>
                <span className="text-muted">t=0-3:</span>{" "}
                <span className="text-blue-600 dark:text-blue-400">P1</span>{" "}
                ejecuta 3ms → P1 restante: 3ms
              </p>
              <p>
                <span className="text-muted">t=3-6:</span>{" "}
                <span className="text-purple-600 dark:text-purple-400">P2</span>{" "}
                ejecuta 3ms → P2 restante: 5ms
              </p>
              <p>
                <span className="text-muted">t=6-9:</span>{" "}
                <span className="text-emerald-600 dark:text-emerald-400">P3</span>{" "}
                ejecuta 3ms → P3 restante: 4ms
              </p>
              <p>
                <span className="text-muted">t=9-12:</span>{" "}
                <span className="text-blue-600 dark:text-blue-400">P1</span>{" "}
                ejecuta 3ms → P1 restante: 0 →{" "}
                <strong className="text-blue-600 dark:text-blue-400">
                  P1 TERMINA en t=12
                </strong>
              </p>
              <p>
                <span className="text-muted">t=12-15:</span>{" "}
                <span className="text-purple-600 dark:text-purple-400">P2</span>{" "}
                ejecuta 3ms → P2 restante: 2ms
              </p>
              <p>
                <span className="text-muted">t=15-18:</span>{" "}
                <span className="text-emerald-600 dark:text-emerald-400">P3</span>{" "}
                ejecuta 3ms → P3 restante: 1ms
              </p>
              <p>
                <span className="text-muted">t=18-20:</span>{" "}
                <span className="text-purple-600 dark:text-purple-400">P2</span>{" "}
                ejecuta 2ms → P2 restante: 0 →{" "}
                <strong className="text-purple-600 dark:text-purple-400">
                  P2 TERMINA en t=20
                </strong>
              </p>
              <p>
                <span className="text-muted">t=20-21:</span>{" "}
                <span className="text-emerald-600 dark:text-emerald-400">P3</span>{" "}
                ejecuta 1ms → P3 restante: 0 →{" "}
                <strong className="text-emerald-600 dark:text-emerald-400">
                  P3 TERMINA en t=21
                </strong>
              </p>
            </div>
          </div>
          <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
              <p className="font-semibold text-blue-700 dark:text-blue-300">P1</p>
              <p>Turnaround = 12 - 0 = <strong>12ms</strong></p>
              <p>Waiting = 12 - 6 = <strong>6ms</strong></p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-3 border border-purple-200 dark:border-purple-800">
              <p className="font-semibold text-purple-700 dark:text-purple-300">P2</p>
              <p>Turnaround = 20 - 0 = <strong>20ms</strong></p>
              <p>Waiting = 20 - 8 = <strong>12ms</strong></p>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-3 border border-emerald-200 dark:border-emerald-800">
              <p className="font-semibold text-emerald-700 dark:text-emerald-300">P3</p>
              <p>Turnaround = 21 - 0 = <strong>21ms</strong></p>
              <p>Waiting = 21 - 7 = <strong>14ms</strong></p>
            </div>
          </div>
          <div className="mt-3 bg-muted/20 rounded-lg p-3 text-sm">
            <p>
              <strong>Turnaround promedio:</strong> (12 + 20 + 21) / 3 ={" "}
              <strong>17.67ms</strong>
            </p>
            <p>
              <strong>Waiting time promedio:</strong> (6 + 12 + 14) / 3 ={" "}
              <strong>10.67ms</strong>
            </p>
            <p className="mt-1 text-muted text-xs">
              Comparación: con SJF (P1→P3→P2 dado que P1 tiene el menor
              burst), waiting times serían: P1=0, P3=6, P2=13 → promedio
              6.33ms. SJF es mejor en waiting time pero no es preemptivo y
              requiere conocer los bursts.
            </p>
          </div>
        </ExampleBlock>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 8: Quiz */}
      {/* ============================================ */}
      <SectionBlock id="quiz" title="Quiz del Capítulo 2">
        <p className="text-muted leading-relaxed mb-4">
          Evaluá tu comprensión de procesos, hilos, sincronización, deadlocks
          y scheduling. Las preguntas incluyen problemas numéricos y casos de
          análisis conceptual profundo.
        </p>
        <QuizContainer questions={quizSoCh2} chapterTitle={chapter.title} />
      </SectionBlock>
    </ChapterLayout>
  );
}

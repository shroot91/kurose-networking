import { soChapters } from "@/data/so-chapters";
import { ChapterLayout } from "@/components/layout/chapter-layout";
import { SectionBlock } from "@/components/content/section-block";
import { ConceptCard } from "@/components/content/concept-card";
import { ExampleBlock } from "@/components/content/example-block";
import { ComparisonTable } from "@/components/content/comparison-table";
import { InfoCallout } from "@/components/content/info-callout";
import { QuizContainer } from "@/components/quiz/quiz-container";
import { quizSoCh3 } from "@/data/quiz-so-ch3";
import {
  Layers,
  Grid3X3,
  Zap,
  RefreshCw,
  AlertTriangle,
  Database,
  MemoryStick,
} from "lucide-react";

const chapter = soChapters[2]; // index 2 = capítulo 3

export default function SOCapitulo3() {
  return (
    <ChapterLayout chapter={chapter} allChapters={soChapters}>
      {/* ============================================ */}
      {/* SECCIÓN 1: Espacio de Direcciones           */}
      {/* ============================================ */}
      <SectionBlock id="espacio-direcciones" title="Espacio de Direcciones">
        <p className="text-muted leading-relaxed">
          El problema central de la gestión de memoria es simple pero brutal:
          múltiples procesos deben compartir una sola RAM física, sin que ninguno
          pueda leer o escribir en el espacio del otro. Sin este aislamiento,
          cualquier proceso bugueado (o malicioso) podría corromper el kernel o
          los datos de otro proceso. La solución es darle a cada proceso una
          ilusión: su propio espacio de direcciones privado y exclusivo.
        </p>

        <InfoCallout variant="info" title="Analogía: la casa propia">
          <p>
            Pensá el espacio de direcciones como una <strong>casa propia</strong>
            . Dentro de tu casa, las habitaciones tienen sus propias direcciones
            (dormitorio = habitación 1, cocina = habitación 2, etc.). Pero esas
            son <em>direcciones lógicas</em>. La casa en sí está ubicada en una{" "}
            <strong>dirección física real de la ciudad</strong> — eso es la RAM.
            La MMU hace la traducción entre ambas.
          </p>
        </InfoCallout>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Dirección Lógica vs Física"
            icon={MemoryStick}
            color="bg-lime-50 text-lime-700 border-lime-200 dark:bg-lime-950/30 dark:text-lime-300 dark:border-lime-800"
          >
            <p>
              <strong>Dirección lógica (virtual):</strong> la que genera el
              programa. El proceso cree que empieza en la dirección 0 y tiene
              todo el espacio para él solo.
            </p>
            <p className="mt-2">
              <strong>Dirección física:</strong> la real en los chips de RAM.
              La <strong>MMU</strong> (Memory Management Unit) hace la
              traducción en hardware, transparente al proceso.
            </p>
          </ConceptCard>

          <ConceptCard
            title="Registro Base y Límite"
            icon={Layers}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p>
              La solución más simple: el hardware mantiene dos registros. El{" "}
              <strong>registro base</strong> indica dónde empieza el proceso en
              RAM. El <strong>registro límite</strong> indica el tamaño máximo.
            </p>
            <p className="mt-2">
              Dirección física = base + dirección lógica. Si dirección lógica
              &gt; límite → excepción de segfault. El SO carga estos registros
              en cada context switch.
            </p>
          </ConceptCard>
        </div>

        {/* Diagrama: Base y Límite */}
        <svg viewBox="0 0 500 220" className="w-full max-w-lg mx-auto mt-2">
          {/* RAM física */}
          <rect x={320} y={10} width={140} height={200} rx={6} fill="#f1f5f922" stroke="#64748b" strokeWidth={1.5} />
          <text x={390} y={28} textAnchor="middle" fill="#64748b" fontSize={10} fontWeight="bold">RAM Física</text>

          {/* Proceso A */}
          <rect x={320} y={35} width={140} height={50} rx={0} fill="#84cc1633" stroke="#65a30d" strokeWidth={1.5} />
          <text x={390} y={55} textAnchor="middle" fill="#4d7c0f" fontSize={9} fontWeight="bold">Proceso A</text>
          <text x={390} y={70} textAnchor="middle" fill="#4d7c0f" fontSize={8}>base=0x1000, lím=64KB</text>

          {/* Proceso B */}
          <rect x={320} y={100} width={140} height={55} rx={0} fill="#3b82f633" stroke="#2563eb" strokeWidth={1.5} />
          <text x={390} y={122} textAnchor="middle" fill="#1e40af" fontSize={9} fontWeight="bold">Proceso B</text>
          <text x={390} y={137} textAnchor="middle" fill="#1e40af" fontSize={8}>base=0x11000, lím=96KB</text>

          {/* Fragmentación externa */}
          <rect x={320} y={85} width={140} height={15} rx={0} fill="#ef444433" stroke="#dc2626" strokeWidth={1} strokeDasharray="4,3" />
          <text x={390} y={96} textAnchor="middle" fill="#dc2626" fontSize={8}>fragmentación ext.</text>

          {/* Espacio lógico del Proceso A */}
          <rect x={40} y={35} width={110} height={50} rx={6} fill="#84cc1622" stroke="#65a30d" strokeWidth={1.5} />
          <text x={95} y={55} textAnchor="middle" fill="#4d7c0f" fontSize={9} fontWeight="bold">Proceso A</text>
          <text x={95} y={70} textAnchor="middle" fill="#4d7c0f" fontSize={8}>(ve: 0 … 64KB)</text>

          {/* Espacio lógico del Proceso B */}
          <rect x={40} y={120} width={110} height={55} rx={6} fill="#3b82f622" stroke="#2563eb" strokeWidth={1.5} />
          <text x={95} y={142} textAnchor="middle" fill="#1e40af" fontSize={9} fontWeight="bold">Proceso B</text>
          <text x={95} y={157} textAnchor="middle" fill="#1e40af" fontSize={8}>(ve: 0 … 96KB)</text>

          {/* Flechas MMU */}
          <line x1={150} y1={60} x2={240} y2={60} stroke="#65a30d" strokeWidth={1.5} markerEnd="url(#arr)" strokeDasharray="5,3" />
          <line x1={150} y1={147} x2={240} y2={127} stroke="#2563eb" strokeWidth={1.5} markerEnd="url(#arr)" strokeDasharray="5,3" />

          {/* MMU box */}
          <rect x={210} y={85} width={80} height={35} rx={6} fill="#f59e0b22" stroke="#d97706" strokeWidth={1.5} />
          <text x={250} y={107} textAnchor="middle" fill="#92400e" fontSize={10} fontWeight="bold">MMU</text>

          <defs>
            <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#64748b" />
            </marker>
          </defs>
          <text x={40} y={25} fill="#64748b" fontSize={9} fontStyle="italic">Espacio Lógico</text>
          <text x={330} y={8} fill="#64748b" fontSize={9} fontStyle="italic">Espacio Físico</text>
        </svg>

        <div className="grid gap-4 sm:grid-cols-2 mt-4">
          <ConceptCard
            title="Particionamiento Fijo"
            icon={Grid3X3}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <p>
              La RAM se divide en particiones de tamaño fijo al arrancar el
              sistema. Cada proceso ocupa una partición.
            </p>
            <p className="mt-2">
              <strong>Problema:</strong> fragmentación{" "}
              <em>interna</em> — si el proceso es más pequeño que la partición,
              el espacio sobrante se desperdicia y nadie más puede usarlo.
            </p>
          </ConceptCard>

          <ConceptCard
            title="Particionamiento Dinámico"
            icon={Layers}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <p>
              Las particiones se crean a medida que los procesos lo piden,
              justo del tamaño necesario. Elimina la fragmentación interna.
            </p>
            <p className="mt-2">
              <strong>Problema:</strong> fragmentación{" "}
              <em>externa</em> — con el tiempo quedan huecos pequeños entre
              procesos que, aunque sumen suficiente memoria, no son contiguos.
            </p>
          </ConceptCard>
        </div>

        <ExampleBlock title="Compactación: la solución cara">
          <p>
            La compactación resuelve la fragmentación externa moviendo todos los
            procesos hacia un extremo de la RAM para consolidar el espacio libre.
          </p>
          <div className="font-mono text-sm bg-muted/30 rounded p-3 mt-2 space-y-1">
            <div>Antes: [Proc A | libre | Proc B | libre | Proc C | LIBRE GRANDE]</div>
            <div className="text-muted">         ↕ 8MB           ↕ 12MB</div>
            <div className="mt-2">Después: [Proc A | Proc B | Proc C | LIBRE CONSOLIDADO]</div>
            <div className="text-muted">                                ↕ 20MB contiguo</div>
          </div>
          <p className="mt-2 text-sm text-muted">
            El problema: mover procesos requiere copiar gigabytes de datos y
            actualizar todos los punteros. En sistemas modernos con GBs de RAM y
            decenas de procesos, el costo es prohibitivo. Por eso la paginación
            resuelve el problema de raíz.
          </p>
        </ExampleBlock>

        <InfoCallout variant="warning" title="Swapping: el último recurso">
          <p>
            Cuando no hay RAM suficiente, el SO puede mover un proceso{" "}
            <strong>entero</strong> al disco (swap out) y cargarlo de vuelta
            cuando sea necesario (swap in). El overhead es enorme: copiar
            cientos de MB hacia y desde disco. La memoria virtual con demand
            paging (veremos más adelante) reemplaza al swapping por ser mucho
            más granular y eficiente.
          </p>
        </InfoCallout>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 2: Paginación                       */}
      {/* ============================================ */}
      <SectionBlock id="paginacion" title="Paginación">
        <p className="text-muted leading-relaxed">
          La paginación resuelve la fragmentación externa de raíz. La idea es
          dividir tanto el espacio de direcciones virtual del proceso como la RAM
          física en bloques de <strong>tamaño fijo</strong>. Las porciones
          virtuales se llaman <strong>páginas</strong>; las porciones físicas se
          llaman <strong>frames</strong> (marcos de página). Cualquier página
          puede mapearse a cualquier frame — no hay necesidad de contigüidad
          física.
        </p>

        <InfoCallout variant="info" title="Analogía: la biblioteca dispersa">
          <p>
            Imaginá que los libros de un mismo autor están dispersos en
            distintos estantes de la biblioteca. Vos querés leer la obra
            completa de ese autor, pero sus libros están en los estantes 3, 7,
            12 y 19. El catálogo de la biblioteca (tabla de páginas) te dice
            exactamente en qué estante está cada libro. Para vos (el proceso) la
            obra es continua; la realidad física (los estantes) es dispersa.
          </p>
        </InfoCallout>

        {/* Diagrama de traducción de dirección */}
        <svg viewBox="0 0 520 200" className="w-full max-w-2xl mx-auto">
          {/* Dirección virtual */}
          <rect x={10} y={70} width={140} height={60} rx={8} fill="#84cc1622" stroke="#65a30d" strokeWidth={1.5} />
          <text x={80} y={92} textAnchor="middle" fill="#4d7c0f" fontSize={9} fontWeight="bold">Dirección Virtual</text>
          <text x={80} y={107} textAnchor="middle" fill="#4d7c0f" fontSize={11} fontFamily="monospace" fontWeight="bold">0x3FF5</text>
          <text x={80} y={121} textAnchor="middle" fill="#4d7c0f" fontSize={8}>pág=3, offset=0xFF5</text>

          {/* Flecha 1 */}
          <line x1={150} y1={100} x2={190} y2={100} stroke="#64748b" strokeWidth={1.5} />
          <polygon points="190,95 200,100 190,105" fill="#64748b" />

          {/* Page Table */}
          <rect x={200} y={20} width={120} height={160} rx={6} fill="#f1f5f9" stroke="#94a3b8" strokeWidth={1.5} />
          <text x={260} y={38} textAnchor="middle" fill="#475569" fontSize={9} fontWeight="bold">Tabla de Páginas</text>
          {[
            { pag: 0, frame: "frame 5", color: "#94a3b8" },
            { pag: 1, frame: "frame 1", color: "#94a3b8" },
            { pag: 2, frame: "frame 8", color: "#94a3b8" },
            { pag: 3, frame: "frame 2", color: "#65a30d" },
            { pag: 4, frame: "frame 6", color: "#94a3b8" },
          ].map((row, i) => (
            <g key={row.pag}>
              <rect
                x={208}
                y={45 + i * 26}
                width={104}
                height={22}
                rx={3}
                fill={row.color === "#65a30d" ? "#84cc1622" : "transparent"}
                stroke={row.color}
                strokeWidth={row.color === "#65a30d" ? 1.5 : 0.5}
              />
              <text x={230} y={60 + i * 26} fill={row.color === "#65a30d" ? "#4d7c0f" : "#64748b"} fontSize={8} fontFamily="monospace">
                pág {row.pag} →
              </text>
              <text x={275} y={60 + i * 26} fill={row.color === "#65a30d" ? "#4d7c0f" : "#64748b"} fontSize={8} fontFamily="monospace" fontWeight={row.color === "#65a30d" ? "bold" : "normal"}>
                {row.frame}
              </text>
            </g>
          ))}

          {/* Flecha 2 */}
          <line x1={320} y1={100} x2={360} y2={100} stroke="#64748b" strokeWidth={1.5} />
          <polygon points="360,95 370,100 360,105" fill="#64748b" />

          {/* Dirección física */}
          <rect x={370} y={70} width={140} height={60} rx={8} fill="#3b82f622" stroke="#2563eb" strokeWidth={1.5} />
          <text x={440} y={92} textAnchor="middle" fill="#1e40af" fontSize={9} fontWeight="bold">Dirección Física</text>
          <text x={440} y={107} textAnchor="middle" fill="#1e40af" fontSize={11} fontFamily="monospace" fontWeight="bold">frame2 + 0xFF5</text>
          <text x={440} y={121} textAnchor="middle" fill="#1e40af" fontSize={8}>0x2000 + 0xFF5 = 0x2FF5</text>

          <text x={260} y={195} textAnchor="middle" fill="#64748b" fontSize={8} fontStyle="italic">
            pág = dir_virtual &gt;&gt; 12 | offset = dir_virtual &amp; 0xFFF
          </text>
        </svg>

        <div className="grid gap-4 sm:grid-cols-2 mt-2">
          <ConceptCard
            title="Ventajas de la Paginación"
            icon={Zap}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <ul className="space-y-1 text-sm">
              <li>
                <strong>Sin fragmentación externa:</strong> cualquier frame libre
                sirve para cualquier página.
              </li>
              <li>
                <strong>Memoria no contigua:</strong> el proceso puede crecer sin
                necesitar un bloque libre enorme.
              </li>
              <li>
                <strong>Protección por hardware:</strong> bits de R/W/X en cada
                PTE.
              </li>
              <li>
                <strong>Base para memoria virtual:</strong> las páginas pueden
                estar en disco y cargarse on-demand.
              </li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="Tamaños de Página"
            icon={Grid3X3}
            color="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800"
          >
            <ul className="space-y-1 text-sm">
              <li>
                <strong>4 KB:</strong> tamaño estándar. Equilibrio entre tamaño
                de tabla y fragmentación interna.
              </li>
              <li>
                <strong>2 MB (huge pages):</strong> reduce el tamaño de la tabla
                de páginas y mejora el hit rate de la TLB para procesos grandes.
              </li>
              <li>
                <strong>1 GB (gigantic pages):</strong> usado en bases de datos y
                aplicaciones HPC que manejan gigabytes de datos.
              </li>
            </ul>
          </ConceptCard>
        </div>

        <ExampleBlock title="Traducción de dirección virtual completa">
          <p className="font-semibold">
            Sistema: páginas de 4 KB (2¹² bytes). Tabla de páginas:
          </p>
          <div className="font-mono text-sm bg-muted/30 rounded p-3 mt-2 space-y-1">
            <div>Página 0 → Frame 3   (dirección base física: 0x3000)</div>
            <div>Página 1 → Frame 7   (dirección base física: 0x7000)</div>
            <div>Página 2 → Frame 1   (dirección base física: 0x1000)</div>
            <div>Página 3 → Frame 5   (dirección base física: 0x5000)</div>
          </div>
          <p className="mt-3 font-semibold">
            Traducir la dirección virtual <code>0x3A8C</code>:
          </p>
          <div className="font-mono text-sm bg-muted/30 rounded p-3 mt-2 space-y-1">
            <div>1. 0x3A8C en binario = 0011 1010 1000 1100</div>
            <div>2. Offset (12 bits bajos) = 1010 1000 1100 = 0xA8C</div>
            <div>3. Número de página (bits restantes) = 0011 = 3</div>
            <div>4. Tabla de páginas[3] → Frame 5 → base física = 0x5000</div>
            <div className="text-lime-600 dark:text-lime-400 font-bold">
              5. Dirección física = 0x5000 + 0xA8C = 0x5A8C ✓
            </div>
          </div>
          <p className="mt-2 text-sm text-muted">
            Fragmentación interna: si el proceso solo usa hasta 0x3A8C, el frame 5
            tiene 0x1000 - 0xA8D = 0x573 bytes (1395 bytes) desperdiciados — nadie
            más puede usarlos aunque estén libres.
          </p>
        </ExampleBlock>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 3: Tablas de Páginas y TLB          */}
      {/* ============================================ */}
      <SectionBlock id="tablas-paginas" title="Tablas de Páginas y TLB">
        <p className="text-muted leading-relaxed">
          La tabla de páginas resuelve el aislamiento, pero introduce un problema
          nuevo: <strong>¿dónde guardar la tabla y cómo hacerla eficiente?</strong>{" "}
          Con un espacio de 32 bits y páginas de 4 KB, cada proceso necesita 1M
          entradas × 4 bytes = <strong>4 MB solo para la tabla</strong>. Con 100
          procesos corriendo, serían 400 MB de RAM solo para tablas — un desperdicio
          colosal. Y encima, cada acceso a memoria requeriría <em>dos</em> accesos
          (uno para la tabla, uno para el dato). La solución tiene dos partes:
          tablas multinivel y la TLB.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Page Table Entry (PTE)"
            icon={Database}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p className="text-sm mb-2">Cada entrada en la tabla de páginas contiene:</p>
            <ul className="space-y-1 text-sm">
              <li><strong>Bit de presencia (P):</strong> 1 = en RAM, 0 = en disco (page fault)</li>
              <li><strong>Bit dirty (M):</strong> 1 = fue modificada (hay que escribir a disco al desalojar)</li>
              <li><strong>Bit de referencia (R):</strong> 1 = fue accedida recientemente (para LRU)</li>
              <li><strong>Bits de protección:</strong> Read, Write, Execute por nivel de privilegio</li>
              <li><strong>Page Frame Number (PFN):</strong> el número del frame físico</li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="TLB: Translation Lookaside Buffer"
            icon={Zap}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <p className="text-sm">
              La TLB es una <strong>caché de traducciones</strong> dentro de la
              MMU. Almacena las últimas N traducciones (típicamente 64-1024
              entradas). Si la traducción está en la TLB (hit), la dirección
              física se obtiene en 1-2 ns sin acceder a RAM. Hit rate típico:
              &gt;99% gracias a la localidad de referencia.
            </p>
            <p className="mt-2 text-sm">
              <strong>TLB miss:</strong> x86 → hardware hace el page table walk.
              MIPS/SPARC → trap al SO que lo resuelve por software (más flexible
              pero algo más lento).
            </p>
          </ConceptCard>
        </div>

        {/* Diagrama TLB */}
        <svg viewBox="0 0 520 170" className="w-full max-w-2xl mx-auto mt-2">
          {/* Dirección virtual */}
          <rect x={10} y={65} width={110} height={40} rx={6} fill="#84cc1622" stroke="#65a30d" strokeWidth={1.5} />
          <text x={65} y={82} textAnchor="middle" fill="#4d7c0f" fontSize={9} fontWeight="bold">Dir. Virtual</text>
          <text x={65} y={97} textAnchor="middle" fill="#4d7c0f" fontSize={9} fontFamily="monospace">vpn | offset</text>

          {/* Flecha a TLB */}
          <line x1={120} y1={85} x2={155} y2={85} stroke="#64748b" strokeWidth={1.5} />
          <polygon points="155,80 165,85 155,90" fill="#64748b" />

          {/* TLB */}
          <rect x={165} y={30} width={110} height={110} rx={8} fill="#fef3c722" stroke="#d97706" strokeWidth={2} />
          <text x={220} y={50} textAnchor="middle" fill="#92400e" fontSize={9} fontWeight="bold">TLB</text>
          <text x={220} y={65} textAnchor="middle" fill="#78716c" fontSize={7}>(64-1024 entradas)</text>
          {[
            { vpn: "vpn_a", pfn: "frame_3" },
            { vpn: "vpn_b", pfn: "frame_7" },
            { vpn: "vpn_c", pfn: "frame_1" },
          ].map((e, i) => (
            <g key={e.vpn}>
              <text x={185} y={82 + i * 16} fill="#92400e" fontSize={7} fontFamily="monospace">{e.vpn}→{e.pfn}</text>
            </g>
          ))}
          <text x={220} y={134} textAnchor="middle" fill="#78716c" fontSize={7} fontStyle="italic">…</text>

          {/* Hit path */}
          <line x1={275} y1={65} x2={320} y2={65} stroke="#65a30d" strokeWidth={2} strokeDasharray="4,2" />
          <polygon points="320,60 330,65 320,70" fill="#65a30d" />
          <text x={300} y={58} textAnchor="middle" fill="#4d7c0f" fontSize={8} fontWeight="bold">HIT</text>

          {/* Miss path */}
          <line x1={220} y1={140} x2={220} y2={155} stroke="#dc2626" strokeWidth={1.5} strokeDasharray="4,2" />
          <rect x={160} y={155} width={120} height={12} rx={3} fill="#ef444422" />
          <text x={220} y={165} textAnchor="middle" fill="#dc2626" fontSize={7} fontWeight="bold">MISS → page table walk</text>

          {/* Dir física (TLB hit) */}
          <rect x={330} y={48} width={110} height={34} rx={6} fill="#3b82f622" stroke="#2563eb" strokeWidth={1.5} />
          <text x={385} y={63} textAnchor="middle" fill="#1e40af" fontSize={9} fontWeight="bold">Dir. Física</text>
          <text x={385} y={76} textAnchor="middle" fill="#1e40af" fontSize={8} fontFamily="monospace">pfn | offset</text>

          {/* Labels */}
          <text x={210} y={18} textAnchor="middle" fill="#d97706" fontSize={8} fontWeight="bold">✓ &gt;99% de los accesos terminan aquí</text>
        </svg>

        <ExampleBlock title="Cálculo del Effective Access Time (EAT) con TLB">
          <p className="font-semibold">Datos: hit rate = 95%, t(TLB) = 2 ns, t(memoria) = 100 ns</p>
          <div className="font-mono text-sm bg-muted/30 rounded p-3 mt-2 space-y-2">
            <div className="text-emerald-600 dark:text-emerald-400">
              Caso HIT (95%): TLB (2ns) + 1 acceso RAM al dato (100ns) = 102 ns
            </div>
            <div className="text-rose-600 dark:text-rose-400">
              Caso MISS (5%): TLB (2ns) + RAM page table (100ns) + RAM dato (100ns) = 202 ns
            </div>
            <div className="mt-1 border-t border-border pt-1 font-bold">
              EAT = 0.95 × 102 + 0.05 × 202 = 96.9 + 10.1 = <span className="text-lime-600 dark:text-lime-400">107 ns</span>
            </div>
            <div className="text-muted text-xs mt-1">
              Sin TLB: cada acceso costaría 200 ns (2 accesos a RAM). La TLB reduce el costo un ~46%.
            </div>
          </div>
        </ExampleBlock>

        <InfoCallout variant="tip" title="Context switch y TLB flush">
          <p>
            Al hacer context switch, las entradas de la TLB pertenecen al proceso
            anterior — usarlas para el nuevo proceso daría traducciones incorrectas.
            La solución naïve: vaciar (flush) toda la TLB en cada context switch.
            El problema: el nuevo proceso empieza con TLB fría, pagando misses
            en cada acceso hasta que la TLB se &quot;calienta&quot;. ARM y otros procesadores
            modernos usan <strong>ASID (Address Space Identifier)</strong>: cada
            entrada TLB lleva el ID del proceso propietario. En context switch no
            se hace flush — las entradas del proceso anterior simplemente no
            matchean el ASID del nuevo proceso.
          </p>
        </InfoCallout>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-3">Tablas de Páginas Multinivel</h3>
          <p className="text-muted leading-relaxed">
            La solución al problema de las tablas enormes: no alocar la tabla
            completa de una sola vez. Con dos niveles, se tiene un{" "}
            <strong>directorio de páginas</strong> (tabla de nivel 1) que apunta
            a tablas de páginas de nivel 2. Las tablas de nivel 2 solo se crean
            para los rangos del espacio virtual que el proceso realmente usa.
          </p>
          <ExampleBlock title="Tabla de páginas de 2 niveles en x86 de 32 bits">
            <div className="font-mono text-sm bg-muted/30 rounded p-3 space-y-1">
              <div>Dir. virtual de 32 bits = [10 bits dir1 | 10 bits dir2 | 12 bits offset]</div>
              <div className="mt-2">Nivel 1 (Page Directory): 2^10 = 1024 entradas × 4B = 4 KB (siempre presente)</div>
              <div>Nivel 2 (Page Tables):    1024 tablas × 1024 entradas × 4B = 4 MB si todo usado</div>
              <div className="mt-2 text-muted">Pero: si el proceso usa solo 4 MB de código + 1 MB de datos:</div>
              <div>→ Solo 2 tablas de nivel 2 necesitan existir: 2 × 4KB = 8KB (vs 4MB)</div>
              <div className="text-lime-600 dark:text-lime-400 font-bold">→ Ahorro: 99.8% de memoria para la tabla</div>
            </div>
          </ExampleBlock>
        </div>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 4: Memoria Virtual                  */}
      {/* ============================================ */}
      <SectionBlock id="memoria-virtual" title="Memoria Virtual">
        <p className="text-muted leading-relaxed">
          La memoria virtual lleva la paginación a su conclusión lógica: si las
          páginas pueden estar en cualquier frame físico, ¿por qué no pueden
          estar también en <em>disco</em>? El proceso puede tener un espacio de
          direcciones virtual mayor que la RAM física. Solo las páginas que se
          están usando actualmente necesitan estar en RAM.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Demand Paging"
            icon={Layers}
            color="bg-lime-50 text-lime-700 border-lime-200 dark:bg-lime-950/30 dark:text-lime-300 dark:border-lime-800"
          >
            <p className="text-sm">
              Las páginas se cargan <strong>solo cuando se necesitan</strong>.
              Al iniciar un proceso, ninguna página está en RAM (o solo unas
              pocas). Cuando el proceso accede a una página no presente, la MMU
              genera un <strong>page fault</strong> y el SO la carga desde disco.
            </p>
            <p className="mt-2 text-sm">
              Ventaja: los programas arrancan casi instantáneamente. Solo se
              carga lo que se usa — muchas partes del código (manejo de errores
              rarísimos, funciones nunca llamadas) pueden nunca ser cargadas.
            </p>
          </ConceptCard>

          <ConceptCard
            title="Working Set y Localidad"
            icon={RefreshCw}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p className="text-sm">
              El <strong>working set</strong> W(t, Δ) es el conjunto de páginas
              que el proceso ha referenciado en los últimos Δ segundos. Si el
              working set cabe en RAM, el proceso tiene pocas faults. Si no
              cabe, el proceso genera faults continuamente.
            </p>
            <p className="mt-2 text-sm">
              La <strong>localidad temporal</strong> (pages usadas recientemente
              se usarán de nuevo) y la <strong>localidad espacial</strong> (pages
              adyacentes a las usadas también se usarán) hacen que el working set
              sea predecible.
            </p>
          </ConceptCard>
        </div>

        <ExampleBlock title="Secuencia completa de un page fault">
          <div className="space-y-2 text-sm">
            <div className="flex gap-3">
              <span className="bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">1</span>
              <p>La CPU ejecuta una instrucción que accede a dirección virtual X. La MMU consulta la PTE de la página correspondiente y encuentra el <strong>bit de presencia = 0</strong>.</p>
            </div>
            <div className="flex gap-3">
              <span className="bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">2</span>
              <p>La MMU genera una <strong>excepción de page fault</strong>. El hardware guarda el estado del proceso (PC, registros) y transfiere control al handler del SO.</p>
            </div>
            <div className="flex gap-3">
              <span className="bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">3</span>
              <p>El SO verifica que el acceso sea <strong>válido</strong> (la dirección X está dentro del VMA del proceso — si no, envía SIGSEGV al proceso).</p>
            </div>
            <div className="flex gap-3">
              <span className="bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">4</span>
              <p>El SO busca un <strong>frame libre</strong>. Si no hay, elige una página víctima usando el algoritmo de reemplazo. Si la víctima está dirty, la escribe a disco primero.</p>
            </div>
            <div className="flex gap-3">
              <span className="bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">5</span>
              <p>El SO <strong>lee la página faltante desde disco</strong> (swap o archivo mapeado). Esto tarda ~10 ms en disco rotacional o ~0.1 ms en SSD — millones de veces más lento que RAM.</p>
            </div>
            <div className="flex gap-3">
              <span className="bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">6</span>
              <p>El SO actualiza la PTE con el nuevo frame number, pone bit de presencia = 1, invalida la entrada TLB correspondiente.</p>
            </div>
            <div className="flex gap-3">
              <span className="bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">7</span>
              <p>El proceso se reanuda y la CPU <strong>reinicia la instrucción que causó el fault</strong> (no continúa desde la siguiente). Esta vez la MMU encuentra la página en RAM y el acceso procede normalmente.</p>
            </div>
          </div>
        </ExampleBlock>

        <div className="grid gap-4 sm:grid-cols-2 mt-4">
          <ConceptCard
            title="Copy-on-Write (COW)"
            icon={RefreshCw}
            color="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800"
          >
            <p className="text-sm">
              Cuando un proceso llama a <code>fork()</code>, el SO <em>no</em>{" "}
              copia el espacio de direcciones del padre. En cambio, el proceso
              hijo comparte los mismos frames físicos, todos marcados como{" "}
              <strong>solo lectura</strong>.
            </p>
            <p className="mt-2 text-sm">
              Cuando alguno (padre o hijo) intenta escribir en una página
              compartida, la MMU genera una excepción. El SO copia solo{" "}
              <em>esa página</em> (page splitting) y la marca como escribible
              para el proceso que escribió. Solo se copian las páginas
              realmente modificadas.
            </p>
          </ConceptCard>

          <ConceptCard
            title="Prepaging vs Demand Paging"
            icon={Zap}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <p className="text-sm">
              <strong>Demand paging puro:</strong> carga páginas solo cuando
              se accede por primera vez. Mínimo overhead inicial pero muchos
              faults al arrancar.
            </p>
            <p className="mt-2 text-sm">
              <strong>Prepaging:</strong> carga páginas antes de que se
              necesiten, especulando sobre accesos futuros. Reduce faults
              iniciales pero puede desperdiciar E/S si las páginas precargadas
              nunca se usan. Los kernels modernos usan un híbrido: prefetch
              basado en patrones de acceso detectados.
            </p>
          </ConceptCard>
        </div>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 5: Algoritmos de Reemplazo          */}
      {/* ============================================ */}
      <SectionBlock id="reemplazo-paginas" title="Algoritmos de Reemplazo de Páginas">
        <p className="text-muted leading-relaxed">
          Cuando la RAM está llena y hay un page fault, el SO debe elegir qué
          página desalojar — la <strong>página víctima</strong>. Un algoritmo de
          reemplazo malo puede causar que se expulse una página que se necesitará
          enseguida, generando otro fault inmediatamente. El objetivo es{" "}
          <em>minimizar el número total de page faults</em>.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="FIFO: First-In, First-Out"
            icon={RefreshCw}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p className="text-sm">
              Reemplaza la página que lleva <strong>más tiempo en memoria</strong>
              , sin importar si se está usando activamente. Simple de implementar
              con una cola circular.
            </p>
            <p className="mt-2 text-sm text-rose-600 dark:text-rose-400">
              <strong>Anomalía de Bélády:</strong> con FIFO, añadir más frames
              puede aumentar la cantidad de page faults — un resultado
              contraintuitivo y problemático.
            </p>
          </ConceptCard>

          <ConceptCard
            title="OPT: Algoritmo Óptimo"
            icon={Zap}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <p className="text-sm">
              Reemplaza la página que <strong>no se usará por más tiempo en
              el futuro</strong>. Minimiza los page faults — es el algoritmo
              teóricamente perfecto.
            </p>
            <p className="mt-2 text-sm text-muted">
              <strong>No implementable</strong> en la práctica: requiere conocer
              el futuro. Se usa como benchmark: si un algoritmo real produce 20%
              más faults que OPT, es aceptable.
            </p>
          </ConceptCard>

          <ConceptCard
            title="LRU: Least Recently Used"
            icon={RefreshCw}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <p className="text-sm">
              Reemplaza la página que no se ha usado por más tiempo. Aproxima
              OPT usando el pasado como predictor del futuro (principio de
              localidad temporal).
            </p>
            <p className="mt-2 text-sm">
              <strong>Implementación costosa:</strong> requiere mantener una
              lista enlazada o contadores de timestamp actualizados en cada
              acceso — potencialmente cada instrucción. LRU exacto es costoso;
              se aproxima con Clock.
            </p>
          </ConceptCard>

          <ConceptCard
            title="Clock: Segunda Oportunidad"
            icon={RefreshCw}
            color="bg-lime-50 text-lime-700 border-lime-200 dark:bg-lime-950/30 dark:text-lime-300 dark:border-lime-800"
          >
            <p className="text-sm">
              Organiza frames en un círculo con una manecilla. Cada frame tiene
              un <strong>bit de referencia</strong>. Al necesitar reemplazar: si
              bit = 1, limpia a 0 y avanza (segunda oportunidad). Si bit = 0,
              reemplaza.
            </p>
            <p className="mt-2 text-sm">
              El hardware pone el bit a 1 en cada acceso. Si una página fue
              usada recientemente, se &quot;salva&quot; una vez. Aproxima LRU de
              forma muy eficiente.
            </p>
          </ConceptCard>
        </div>

        <ExampleBlock title="Comparación FIFO vs OPT vs LRU — secuencia: 1,2,3,4,1,2,5,1,2,3,4,5 (3 frames)">
          <div className="overflow-x-auto">
            <table className="text-xs font-mono w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-1.5 border border-border bg-muted/40 text-xs">Acceso</th>
                  {[1,2,3,4,1,2,5,1,2,3,4,5].map((p, i) => (
                    <th key={i} className="p-1.5 border border-border bg-muted/40 text-xs w-8">{p}</th>
                  ))}
                  <th className="p-1.5 border border-border bg-muted/40 text-xs">Faults</th>
                </tr>
              </thead>
              <tbody>
                {/* FIFO */}
                <tr>
                  <td className="p-1.5 border border-border font-bold text-blue-600 dark:text-blue-400">FIFO</td>
                  {["F","F","F","F","F","F","F","H","H","F","F","H"].map((s, i) => (
                    <td key={i} className={`p-1.5 border border-border text-center ${s==="F"?"text-rose-500 font-bold":"text-emerald-600"}`}>{s}</td>
                  ))}
                  <td className="p-1.5 border border-border text-center font-bold text-rose-500">9</td>
                </tr>
                {/* OPT */}
                <tr>
                  <td className="p-1.5 border border-border font-bold text-amber-600 dark:text-amber-400">OPT</td>
                  {["F","F","F","F","H","H","F","H","H","H","F","H"].map((s, i) => (
                    <td key={i} className={`p-1.5 border border-border text-center ${s==="F"?"text-rose-500 font-bold":"text-emerald-600"}`}>{s}</td>
                  ))}
                  <td className="p-1.5 border border-border text-center font-bold text-amber-500">6</td>
                </tr>
                {/* LRU */}
                <tr>
                  <td className="p-1.5 border border-border font-bold text-emerald-600 dark:text-emerald-400">LRU</td>
                  {["F","F","F","F","H","H","F","H","H","F","F","H"].map((s, i) => (
                    <td key={i} className={`p-1.5 border border-border text-center ${s==="F"?"text-rose-500 font-bold":"text-emerald-600"}`}>{s}</td>
                  ))}
                  <td className="p-1.5 border border-border text-center font-bold text-emerald-500">8</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted mt-2">
            F = page fault (miss), H = hit. OPT logra el mínimo teórico (6). LRU (8) se acerca. FIFO (9) es el peor. En la práctica, Clock aproxima LRU con mucho menor overhead de implementación.
          </p>
        </ExampleBlock>

        <InfoCallout variant="warning" title="Thrashing: cuando el sistema se paraliza">
          <div className="space-y-2">
            <p>
              El thrashing ocurre cuando la suma de los working sets de todos los
              procesos activos supera la RAM disponible. Cada proceso tiene menos
              frames de los que necesita. El ciclo es destructivo:
            </p>
            <div className="font-mono text-sm bg-muted/30 rounded p-2 space-y-1">
              <div>Proceso A sufre page fault → SO carga página de A → desaloja página de B</div>
              <div>Proceso B sufre page fault → SO carga página de B → desaloja página de C</div>
              <div>Proceso C sufre page fault → SO carga página de C → desaloja página de A</div>
              <div className="text-rose-500 font-bold">→ CPU utilization cae a ~5% (todo el tiempo esperando disco)</div>
            </div>
            <p>
              <strong>Solución:</strong> reducir el grado de multiprogramación —
              suspender (swap out) algunos procesos completamente hasta que los
              procesos restantes tengan frames suficientes para su working set.
            </p>
          </div>
        </InfoCallout>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 6: Segmentación                     */}
      {/* ============================================ */}
      <SectionBlock id="segmentacion" title="Segmentación">
        <p className="text-muted leading-relaxed">
          La paginación divide la memoria en bloques de tamaño fijo sin ninguna
          semántica lógica — una página puede contener mitad de una función y mitad
          de datos. La segmentación propone un modelo diferente: dividir el espacio
          de direcciones en <strong>segmentos lógicos</strong> que corresponden a
          unidades significativas del programa: código, datos globales, pila, heap,
          librerías compartidas. Cada segmento tiene su propio tamaño variable.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <ConceptCard
            title="Descriptor de Segmento"
            icon={Database}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <ul className="text-sm space-y-1">
              <li><strong>Base:</strong> dirección física de inicio</li>
              <li><strong>Límite:</strong> tamaño del segmento</li>
              <li><strong>Tipo:</strong> código, datos, pila</li>
              <li><strong>DPL:</strong> nivel de privilegio requerido (0-3)</li>
              <li><strong>P:</strong> bit de presencia</li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="Ventajas"
            icon={Zap}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <ul className="text-sm space-y-1">
              <li>
                <strong>Compartición natural:</strong> dos procesos pueden
                compartir el segmento de código de una librería (mismo segmento
                físico, distintos descriptores).
              </li>
              <li>
                <strong>Protección semántica:</strong> marcar el segmento de
                código como solo lectura/ejecución.
              </li>
              <li>Sin fragmentación interna.</li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="Desventajas"
            icon={AlertTriangle}
            color="bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-800"
          >
            <ul className="text-sm space-y-1">
              <li>
                <strong>Fragmentación externa:</strong> huecos entre segmentos
                de tamaños imposibles de predecir.
              </li>
              <li>
                <strong>Compactación necesaria:</strong> para reusar huecos.
              </li>
              <li>
                Tamaño variable dificulta la gestión de memoria libre.
              </li>
            </ul>
          </ConceptCard>
        </div>

        <InfoCallout variant="tip" title="Intel x86: segmentación + paginación (y cómo Linux la ignora)">
          <p>
            El procesador Intel x86 en modo protegido usa <em>obligatoriamente</em>{" "}
            segmentación. La traducción es: dirección lógica → (segmentación) →
            dirección lineal → (paginación) → dirección física. Linux resuelve esto
            configurando <strong>todos los segmentos con base = 0 y límite = 4 GB</strong>.
            La dirección lógica = dirección lineal, haciendo la segmentación
            transparente. Todo el aislamiento real se hace con paginación. En modo de
            64 bits (long mode), los segmentos CS/DS/ES/SS son ignorados por el
            hardware (FS y GS se siguen usando para thread-local storage).
          </p>
        </InfoCallout>

        <ComparisonTable
          headers={["Característica", "Paginación", "Segmentación", "Seg. Paginada"]}
          rows={[
            [
              "Tamaño de bloque",
              "Fijo (e.g. 4 KB)",
              "Variable (bytes a GB)",
              "Variable (segmento) / Fijo (página)",
            ],
            [
              "Fragmentación interna",
              "Sí (último frame)",
              "No",
              "Sí (última página de cada segmento)",
            ],
            [
              "Fragmentación externa",
              "No",
              "Sí",
              "No",
            ],
            [
              "Semántica lógica",
              "No (páginas sin significado)",
              "Sí (código, datos, pila)",
              "Sí (segmentos) + No (páginas)",
            ],
            [
              "Compartición fina",
              "A nivel de página",
              "A nivel de segmento",
              "A nivel de segmento",
            ],
            [
              "Protección",
              "Por página (R/W/X)",
              "Por segmento + nivel de privilegio",
              "Por segmento y por página",
            ],
            [
              "Uso en práctica",
              "Linux, Windows (modo 64 bits)",
              "Casi obsoleta sola",
              "Intel x86 modo protegido (Linux lo aplana)",
            ],
          ]}
        />
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 7: Quiz                             */}
      {/* ============================================ */}
      <SectionBlock id="quiz" title="Quiz del Capítulo 3">
        <QuizContainer questions={quizSoCh3} chapterTitle={chapter.title} />
      </SectionBlock>
    </ChapterLayout>
  );
}

import { soChapters } from "@/data/so-chapters";
import { ChapterLayout } from "@/components/layout/chapter-layout";
import { SectionBlock } from "@/components/content/section-block";
import { ConceptCard } from "@/components/content/concept-card";
import { ExampleBlock } from "@/components/content/example-block";
import { ComparisonTable } from "@/components/content/comparison-table";
import { InfoCallout } from "@/components/content/info-callout";
import { QuizContainer } from "@/components/quiz/quiz-container";
import { quizSoCh4 } from "@/data/quiz-so-ch4";
import {
  HardDrive,
  FileText,
  FolderOpen,
  Link,
  Link2,
  Database,
  Shield,
  Layers,
  RefreshCw,
  Server,
  GitBranch,
  AlertTriangle,
  BookOpen,
  Cpu,
  Archive,
} from "lucide-react";

const chapter = soChapters[3];

export default function SOCapitulo4() {
  return (
    <ChapterLayout chapter={chapter} allChapters={soChapters}>
      {/* ============================================ */}
      {/* SECCIÓN 1: Abstracción de Archivos           */}
      {/* ============================================ */}
      <SectionBlock
        id="abstraccion-archivos"
        title="Abstracción de Archivos"
      >
        <p className="text-muted leading-relaxed">
          Un <strong>archivo</strong> es la abstracción fundamental del
          almacenamiento persistente: una secuencia nombrada de bytes que
          sobrevive más allá del ciclo de vida de cualquier proceso. El sistema
          de archivos es la capa del SO que da forma y significado a los bloques
          físicos del disco, transformando sectores magnéticos o celdas flash en
          objetos con nombre, permisos y semántica de acceso.
        </p>

        <InfoCallout variant="tip" title="Analogía del cuaderno y el cajón">
          <p>
            Pensá en el disco como un armario con cajones. Cada cajón es un{" "}
            <strong>directorio</strong>. Cada cuaderno dentro de un cajón es un{" "}
            <strong>archivo</strong>. El <strong>descriptor de archivo</strong>{" "}
            (file descriptor) es un marcapáginas que recordás dónde quedaste
            leyendo. Podés tener el mismo cuaderno referenciado desde varios
            cajones (hard links), o una nota que dice "el cuaderno real está
            en tal cajón" (symlink).
          </p>
        </InfoCallout>

        <h3 className="font-semibold text-lg mt-6 mb-3">
          Atributos de un archivo
        </h3>
        <p className="text-muted leading-relaxed">
          Cada archivo tiene asociados metadatos que el SO almacena
          independientemente del contenido. En Unix estos viven en el{" "}
          <strong>inodo</strong>:
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Atributos de Identidad"
            icon={FileText}
            color="bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/30 dark:text-teal-300 dark:border-teal-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                <strong>Nombre</strong>: cadena legible para humanos (en el
                directorio, no en el inodo)
              </li>
              <li>
                <strong>Número de inodo</strong>: identificador numérico único
                dentro del FS
              </li>
              <li>
                <strong>Tipo</strong>: regular, directorio, dispositivo,
                symlink, socket, pipe
              </li>
              <li>
                <strong>Tamaño</strong>: bytes de contenido
              </li>
              <li>
                <strong>Dueño/Grupo</strong>: UID y GID del propietario
              </li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="Atributos Temporales"
            icon={RefreshCw}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                <strong>atime</strong>: último acceso (read). Muchos sistemas lo
                desactivan por rendimiento (noatime)
              </li>
              <li>
                <strong>mtime</strong>: última modificación de los{" "}
                <em>datos</em> del archivo
              </li>
              <li>
                <strong>ctime</strong>: último cambio del <em>inodo</em>{" "}
                (metadatos o datos). No es "creation time"
              </li>
              <li>
                <strong>crtime</strong>: tiempo de creación real (solo en ext4 y
                algunos FS modernos)
              </li>
            </ul>
          </ConceptCard>
        </div>

        <h3 className="font-semibold text-lg mt-6 mb-3">Tipos de archivos</h3>
        <p className="text-muted leading-relaxed">
          En Unix, "todo es un archivo" — pero hay distintas clases de objetos
          en el VFS, identificables por el campo de tipo en el inodo:
        </p>

        <ComparisonTable
          headers={["Tipo", "Símbolo ls -l", "Descripción", "Ejemplo"]}
          rows={[
            ["Regular", "-", "Secuencia de bytes ordinaria", "/etc/passwd"],
            ["Directorio", "d", "Mapeo nombre → inodo", "/home/usuario"],
            ["Symlink", "l", "Ruta como contenido del archivo", "/usr/bin/python3"],
            ["Block device", "b", "Dispositivo de almacenamiento por bloques", "/dev/sda"],
            ["Char device", "c", "Dispositivo de flujo byte a byte", "/dev/tty0"],
            ["Socket", "s", "IPC de red entre procesos", "/run/docker.sock"],
            ["Named pipe", "p", "FIFO para IPC local", "/tmp/mi-pipe"],
          ]}
        />

        <h3 className="font-semibold text-lg mt-6 mb-3">
          Operaciones sobre archivos
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Ciclo de vida: open / close"
            icon={FolderOpen}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                <code>open(path, flags, mode)</code> → devuelve un file
                descriptor (fd) entero
              </li>
              <li>
                <strong>Flags</strong>: O_RDONLY, O_WRONLY, O_RDWR, O_CREAT,
                O_TRUNC, O_APPEND, O_EXCL
              </li>
              <li>
                <code>close(fd)</code> libera la entrada en la tabla de fds
                del proceso
              </li>
              <li>
                Al hacer fork(), el hijo hereda todos los fds del padre con el{" "}
                <strong>mismo offset compartido</strong>
              </li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="Lectura, escritura y posicionamiento"
            icon={BookOpen}
            color="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                <code>read(fd, buf, n)</code> / <code>write(fd, buf, n)</code>{" "}
                — acceso <strong>secuencial</strong>: el offset avanza
                automáticamente
              </li>
              <li>
                <code>lseek(fd, offset, whence)</code> — acceso{" "}
                <strong>aleatorio</strong>: SEEK_SET, SEEK_CUR, SEEK_END
              </li>
              <li>
                <code>stat(path, &buf)</code> — obtiene metadatos sin abrir el
                archivo
              </li>
              <li>
                <code>truncate(path, size)</code> — cambia el tamaño;{" "}
                <code>rename</code>, <code>unlink</code> para mover/borrar
              </li>
            </ul>
          </ConceptCard>
        </div>

        <h3 className="font-semibold text-lg mt-6 mb-3">
          Tabla de descriptores de archivo
        </h3>
        <p className="text-muted leading-relaxed">
          Cuando un proceso llama a <code>open()</code>, el kernel construye
          una cadena de tres tablas:
        </p>
        <ExampleBlock title="Tres niveles de indirección para file descriptors">
          <div className="space-y-3 text-sm font-mono">
            <div className="bg-muted/50 rounded p-3">
              <p className="font-semibold mb-1 font-sans">
                Nivel 1 — Tabla de fds del proceso (en PCB):
              </p>
              <p>fd 0 → entrada 17 (stdin)</p>
              <p>fd 1 → entrada 18 (stdout)</p>
              <p>fd 3 → entrada 42 (archivo.txt abierto con O_RDWR)</p>
            </div>
            <div className="bg-muted/50 rounded p-3">
              <p className="font-semibold mb-1 font-sans">
                Nivel 2 — Tabla de archivos abiertos del kernel (global):
              </p>
              <p>entrada 42: offset=1024, flags=O_RDWR, ref_count=1, → inodo 9821</p>
              <p className="text-muted-foreground text-xs mt-1">
                (Si otro proceso hace open() del mismo archivo, crea una entrada
                separada con su propio offset)
              </p>
            </div>
            <div className="bg-muted/50 rounded p-3">
              <p className="font-semibold mb-1 font-sans">
                Nivel 3 — Tabla de inodos en memoria (v-node):
              </p>
              <p>inodo 9821: tamaño=8192, permisos=rw-r--r--, bloques=[101,102,103...]</p>
            </div>
          </div>
          <p className="text-sm text-muted mt-3">
            Con <code>fork()</code>, el hijo hereda copias de la tabla del
            proceso pero apuntando a las <em>mismas</em> entradas del nivel 2 —
            padre e hijo comparten el offset. Con <code>dup2()</code> también se
            comparten entradas del nivel 2.
          </p>
        </ExampleBlock>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 2: Inodos y Estructura Unix          */}
      {/* ============================================ */}
      <SectionBlock id="inodos" title="Inodos y Estructura Unix">
        <p className="text-muted leading-relaxed">
          El <strong>inodo</strong> (index node) es la estructura central del
          filesystem Unix. Cada archivo tiene exactamente un inodo, identificado
          por un número entero único dentro del sistema de archivos. El inodo
          almacena todo sobre el archivo{" "}
          <strong>excepto su nombre</strong> — la separación entre nombre e
          inodo es la clave que permite los hard links y los directorios como
          simples tablas de lookup.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Contenido del inodo"
            icon={Database}
            color="bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/30 dark:text-teal-300 dark:border-teal-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>Modo (tipo + permisos rwxrwxrwx)</li>
              <li>UID / GID del dueño</li>
              <li>Tamaño en bytes</li>
              <li>atime, mtime, ctime, crtime</li>
              <li>Conteo de hard links (nlink)</li>
              <li>12 punteros a bloques directos</li>
              <li>1 puntero indirecto simple (13)</li>
              <li>1 puntero indirecto doble (14)</li>
              <li>1 puntero indirecto triple (15)</li>
              <li>
                <strong>NO contiene el nombre del archivo</strong>
              </li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="Cálculo de tamaño máximo (bloques 4 KB)"
            icon={Cpu}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <div className="space-y-1.5 text-sm font-mono">
              <p>Bloque = 4 KB, puntero = 4 bytes</p>
              <p>→ 4096 / 4 = 1024 punteros por bloque</p>
              <p className="mt-2 font-sans font-semibold">Directo:</p>
              <p>12 × 4 KB = 48 KB</p>
              <p className="font-sans font-semibold">Indirecto simple:</p>
              <p>1024 × 4 KB = 4 MB</p>
              <p className="font-sans font-semibold">Indirecto doble:</p>
              <p>1024² × 4 KB = 4 GB</p>
              <p className="font-sans font-semibold">Indirecto triple:</p>
              <p>1024³ × 4 KB ≈ 4 TB</p>
              <p className="font-sans font-semibold border-t pt-1 mt-1">
                Total ≈ 4 TB
              </p>
            </div>
          </ConceptCard>
        </div>

        <InfoCallout variant="warning" title="El nombre NO está en el inodo">
          <p>
            Esta es la trampa más común. El inodo no sabe cómo se llama el
            archivo. El nombre vive en la entrada de directorio:{" "}
            <code>("doc.txt", inodo_9821)</code>. Esto es lo que hace posibles
            los <strong>hard links</strong>: múltiples entradas en distintos
            directorios pueden apuntar al mismo número de inodo, y el archivo no
            "sabe" cuántos nombres tiene — solo lleva la cuenta en{" "}
            <code>nlink</code>.
          </p>
        </InfoCallout>

        <h3 className="font-semibold text-lg mt-6 mb-3">
          Hard Links vs Soft Links (Symlinks)
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Hard Link"
            icon={Link}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                Nueva entrada de directorio apuntando al{" "}
                <strong>mismo inodo</strong>
              </li>
              <li>
                Incrementa <code>nlink</code> en el inodo
              </li>
              <li>
                El archivo se libera solo cuando{" "}
                <code>nlink == 0</code> Y no hay fds abiertos
              </li>
              <li>
                <strong>No puede cruzar filesystems</strong> (el número de
                inodo no es único entre distintos FS)
              </li>
              <li>
                <strong>No puede apuntar a directorios</strong> (evita ciclos en
                el árbol)
              </li>
              <li>Creado con: <code>ln origen destino</code></li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="Symlink (Soft Link)"
            icon={Link2}
            color="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                Archivo especial de tipo <code>l</code> cuyo contenido es una{" "}
                <strong>ruta de texto</strong>
              </li>
              <li>Tiene su propio inodo separado</li>
              <li>
                Puede <strong>cruzar filesystems</strong> y apuntar a
                directorios
              </li>
              <li>
                <strong>Puede quedar dangling</strong> (roto) si se borra el
                destino
              </li>
              <li>
                El kernel lo resuelve en cada pathname lookup
                (readlink, lstat para no seguirlo)
              </li>
              <li>Creado con: <code>ln -s destino nombre</code></li>
            </ul>
          </ConceptCard>
        </div>

        <ExampleBlock title="Recorrido de pathname: resolución de /home/usuario/doc.txt">
          <ol className="space-y-2 text-sm list-decimal list-inside">
            <li>
              El kernel parte del inodo raíz (siempre inodo #2 en ext4). Lee el
              bloque de datos del directorio <code>/</code> — una lista de
              entradas (nombre, inodo).
            </li>
            <li>
              Busca la entrada <code>"home"</code> en el directorio{" "}
              <code>/</code>. Encuentra: <code>("home", inodo 128)</code>. Lee
              el inodo 128 del disco.
            </li>
            <li>
              Inodo 128 es un directorio. Lee sus bloques de datos. Busca{" "}
              <code>"usuario"</code>. Encuentra: <code>("usuario", inodo 4096)</code>.
            </li>
            <li>
              Lee inodo 4096 (directorio <code>/home/usuario</code>). Lee sus
              bloques. Busca <code>"doc.txt"</code>. Encuentra:{" "}
              <code>("doc.txt", inodo 9821)</code>.
            </li>
            <li>
              Lee inodo 9821 — este es el inodo del archivo. Contiene tamaño,
              permisos, y los punteros a los bloques de datos del archivo.
            </li>
          </ol>
          <p className="text-sm text-muted mt-3">
            Son <strong>4 lecturas de inodo</strong> más las lecturas de los
            bloques de cada directorio. El dcache (directory entry cache) de
            Linux cachea dentries recientes para evitar repetir este traversal
            en cada acceso.
          </p>
        </ExampleBlock>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 3: Directorios y Rutas               */}
      {/* ============================================ */}
      <SectionBlock id="directorios" title="Directorios y Rutas">
        <p className="text-muted leading-relaxed">
          Un <strong>directorio</strong> es, fundamentalmente, un archivo
          especial cuyo contenido es una tabla que mapea nombres a números de
          inodo. El SO le otorga semántica especial: no se puede abrir con{" "}
          <code>open()</code> directamente para leer su contenido raw (se usa{" "}
          <code>opendir/readdir</code>), y las entradas especiales{" "}
          <code>.</code> y <code>..</code> forman el árbol de navegación.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Lista lineal (implementación simple)"
            icon={FileText}
            color="bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/30 dark:text-teal-300 dark:border-teal-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                Entradas de longitud fija o variable en secuencia
              </li>
              <li>
                Búsqueda: O(n) — hay que recorrer hasta encontrar el nombre
              </li>
              <li>
                Inserción: O(1) al final, O(n) si hay que reutilizar huecos
              </li>
              <li>
                Funciona bien para directorios pequeños ({`<`}100 entradas)
              </li>
              <li>
                Problemático en directorios con miles de archivos (ej.
                servidores de mail con una carpeta por usuario)
              </li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="Hash tree (ext4 HTree)"
            icon={Layers}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                Hash del nombre del archivo como clave de búsqueda
              </li>
              <li>
                Lookup: O(1) amortizado (una operación de hash + acceso al
                bloque)
              </li>
              <li>
                ext4 usa una variante de árbol B de dos niveles (htree)
              </li>
              <li>
                Soporta millones de entradas eficientemente
              </li>
              <li>
                Colisiones de hash se resuelven en el bloque hoja con búsqueda
                lineal corta
              </li>
            </ul>
          </ConceptCard>
        </div>

        <h3 className="font-semibold text-lg mt-6 mb-3">
          VFS: Virtual File System
        </h3>
        <p className="text-muted leading-relaxed">
          El <strong>VFS</strong> es la capa de abstracción del kernel de Linux
          que permite que múltiples tipos de filesystem coexistan y sean
          accedidos con la misma interfaz de syscalls. Está basado en cuatro
          objetos principales:
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Objetos VFS"
            icon={GitBranch}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                <strong>superblock</strong>: metadatos del FS montado (tamaño,
                estado, puntero a la raíz)
              </li>
              <li>
                <strong>inode</strong>: representación en memoria de un archivo
                o directorio
              </li>
              <li>
                <strong>dentry</strong>: asociación (nombre, inodo) cacheada en
                el dcache para acelerar lookups
              </li>
              <li>
                <strong>file</strong>: representa un archivo abierto (offset
                actual, flags, puntero al inode)
              </li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="Dispatch polimórfico"
            icon={Server}
            color="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                Cada objeto tiene un conjunto de operaciones:{" "}
                <code>inode_operations</code>, <code>file_operations</code>
              </li>
              <li>
                Cada FS registra su implementación de estas operaciones al
                montarse
              </li>
              <li>
                <code>read(fd,...)</code> → <code>file-&gt;f_op-&gt;read()</code>{" "}
                → implementación de ext4 / FAT / NFS / etc.
              </li>
              <li>
                Transparencia total: <code>cp</code>, <code>ls</code>,{" "}
                <code>mv</code> funcionan igual en cualquier FS
              </li>
            </ul>
          </ConceptCard>
        </div>

        <h3 className="font-semibold text-lg mt-6 mb-3">
          Permisos Unix y bits especiales
        </h3>
        <ExampleBlock title="Sistema de permisos rwxrwxrwx y bits especiales">
          <div className="space-y-3 text-sm">
            <div className="bg-muted/50 rounded p-3 font-mono">
              <p className="font-sans font-semibold mb-2">
                chmod 755 archivo → rwxr-xr-x
              </p>
              <p>
                7 (dueño) = 4+2+1 = r+w+x
              </p>
              <p>
                5 (grupo) = 4+0+1 = r+x
              </p>
              <p>
                5 (otros) = 4+0+1 = r+x
              </p>
            </div>
            <div className="bg-muted/50 rounded p-3">
              <p className="font-semibold mb-2">Bits especiales (dígito extra):</p>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>
                  <strong>SUID (4):</strong> el proceso ejecuta con los permisos
                  del dueño del archivo, no del usuario que lo ejecuta. Usado
                  por <code>sudo</code>, <code>passwd</code>, <code>ping</code>
                </li>
                <li>
                  <strong>SGID (2):</strong> hereda el grupo del directorio
                  padre al crear archivos. Útil para proyectos colaborativos
                </li>
                <li>
                  <strong>Sticky bit (1):</strong> en directorios (ej.{" "}
                  <code>/tmp</code>): solo el dueño del archivo puede borrarlo,
                  aunque el directorio sea escribible por todos
                </li>
              </ul>
            </div>
          </div>
        </ExampleBlock>

        <InfoCallout variant="info" title="Mount points y el árbol de namespaces">
          <p>
            <code>mount /dev/sdb1 /mnt/usb</code> superpone el filesystem de{" "}
            <code>/dev/sdb1</code> sobre el directorio <code>/mnt/usb</code>.
            El VFS marca ese dentry como punto de mount. Cualquier lookup que
            llegue a <code>/mnt/usb</code> es redirigido transparentemente al
            root inode del FS montado. El directorio original queda oculto pero
            no destruido. <code>umount</code> revierte esto.
          </p>
        </InfoCallout>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 4: Implementación FAT y ext4         */}
      {/* ============================================ */}
      <SectionBlock
        id="implementacion-fs"
        title="Implementación: FAT y ext4"
      >
        <p className="text-muted leading-relaxed">
          Hay muchas maneras de implementar un sistema de archivos sobre el
          almacenamiento físico. Las dos implementaciones más representativas
          son <strong>FAT</strong> (simple, universal, legacy) y{" "}
          <strong>ext4</strong> (moderno, robusto, Linux nativo). Entender sus
          diseños internos es fundamental para razonar sobre rendimiento,
          compatibilidad y fiabilidad.
        </p>

        <h3 className="font-semibold text-lg mt-6 mb-3">
          FAT (File Allocation Table)
        </h3>
        <p className="text-muted leading-relaxed">
          FAT representa los archivos como <strong>listas enlazadas de clusters</strong>.
          Un cluster es la unidad de asignación (múltiplo de sectores de 512B).
          Al inicio del volumen hay una tabla con una entrada por cada cluster
          del disco. Cada entrada contiene el número del siguiente cluster, o un
          marcador de fin de cadena, o 0 si el cluster está libre.
        </p>

        <ExampleBlock title="FAT: estructura y funcionamiento">
          <div className="space-y-3 text-sm">
            <div className="bg-muted/50 rounded p-3 font-mono">
              <p className="font-sans font-semibold mb-2">
                Tabla FAT (simplificada, archivo en clusters 3→7→9→EOF):
              </p>
              <p>Cluster 0: [reservado]</p>
              <p>Cluster 1: [reservado]</p>
              <p>Cluster 2: 0x0000 (libre)</p>
              <p>Cluster 3: 7        ← apunta al siguiente</p>
              <p>Cluster 4: 0x0000 (libre)</p>
              <p>Cluster 5: 0x0000 (libre)</p>
              <p>Cluster 6: 0x0000 (libre)</p>
              <p>Cluster 7: 9        ← apunta al siguiente</p>
              <p>Cluster 8: 0x0000 (libre)</p>
              <p>Cluster 9: 0xFFFF (EOF)</p>
            </div>
            <p>
              La entrada de directorio apunta al primer cluster (3). Para leer
              el archivo completo, el SO sigue la cadena: 3 → 7 → 9 → EOF. Esto
              es fragmentación: los datos del archivo están dispersos en el
              disco. Con el tiempo, la desfragmentación reescribe los clusters
              para que sean contiguos.
            </p>
          </div>
        </ExampleBlock>

        <div className="grid gap-4 sm:grid-cols-3 mt-4">
          <ConceptCard
            title="FAT12"
            icon={HardDrive}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <ul className="space-y-1 list-disc list-inside text-sm">
              <li>12 bits por entrada → 4096 clusters máx</li>
              <li>Volúmenes hasta ~32 MB</li>
              <li>Usado en floppy disks</li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="FAT16"
            icon={HardDrive}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <ul className="space-y-1 list-disc list-inside text-sm">
              <li>16 bits → 65536 clusters</li>
              <li>Volúmenes hasta 2 GB</li>
              <li>Nombres: 8.3 (MS-DOS)</li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="FAT32"
            icon={HardDrive}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <ul className="space-y-1 list-disc list-inside text-sm">
              <li>28 bits efectivos → 268M clusters</li>
              <li>Volúmenes hasta 2 TB (práctica)</li>
              <li>Archivo máx: 4 GB - 1</li>
            </ul>
          </ConceptCard>
        </div>

        <h3 className="font-semibold text-lg mt-6 mb-3">
          ext4 (Fourth Extended Filesystem)
        </h3>
        <p className="text-muted leading-relaxed">
          ext4 es la evolución del filesystem estándar de Linux. Su estructura
          central se organiza en <strong>block groups</strong>: regiones del
          disco que agrupan inodos y bloques de datos cercanos para maximizar la
          localidad. Cada block group contiene: superbloque (backup), bitmap de
          bloques, bitmap de inodos, tabla de inodos, y bloques de datos.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Block Groups y Extents"
            icon={Archive}
            color="bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/30 dark:text-teal-300 dark:border-teal-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                <strong>Block groups</strong>: mejoran localidad — el inodo y
                los datos de un archivo suelen estar en el mismo grupo
              </li>
              <li>
                <strong>Extents</strong>: reemplazan los punteros
                directos/indirectos por rangos contiguos{" "}
                <code>{"{start, length}"}</code>
              </li>
              <li>
                Un extent describe hasta 128 MB de bloques contiguos con una
                sola entrada
              </li>
              <li>
                Reduce drasticamente la cantidad de metadatos para archivos
                grandes y secuenciales
              </li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="Características avanzadas de ext4"
            icon={Shield}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                <strong>Delayed allocation</strong>: pospone la asignación de
                bloques hasta el flush, mejorando la contigüidad
              </li>
              <li>
                <strong>48-bit block numbers</strong>: soporta volúmenes de
                hasta 1 EB (exabyte)
              </li>
              <li>
                <strong>Journaling</strong> (ver sección siguiente)
              </li>
              <li>
                <strong>Online resizing</strong>: redimensionar el FS sin
                desmontarlo
              </li>
              <li>
                Archivo máximo: 16 TB; volumen máximo: 1 EB
              </li>
            </ul>
          </ConceptCard>
        </div>

        <ComparisonTable
          headers={["Característica", "FAT32", "ext4", "NTFS"]}
          rows={[
            ["Permisos Unix", "No", "Sí (rwx, ACL)", "ACL de Windows"],
            ["Journaling", "No", "Sí (3 modos)", "Sí ($LogFile)"],
            ["Archivo máximo", "4 GB - 1 B", "16 TB", "16 EB (teórico)"],
            ["Volumen máximo", "2 TB (práctica)", "1 EB", "256 TB (pract.)"],
            ["Compatible con", "Windows/Mac/Linux", "Linux nativo", "Windows nativo"],
            ["Fragmentación", "Alta, necesita defrag", "Baja (extents)", "Baja (log)"],
            ["Inodos", "No (dir entries)", "Sí", "Master File Table"],
            ["Caso de uso", "USBs/SD portátiles", "Servidores Linux", "PC Windows"],
          ]}
        />
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 5: Journaling y Fiabilidad           */}
      {/* ============================================ */}
      <SectionBlock id="journaling" title="Journaling y Fiabilidad">
        <p className="text-muted leading-relaxed">
          Crear un archivo parece una operación atómica desde la perspectiva del
          programador, pero internamente requiere múltiples escrituras
          independientes al disco: actualizar el bitmap de bloques libres,
          inicializar el inodo, escribir los datos, agregar la entrada en el
          directorio padre. Si el sistema se cae a mitad, el filesystem queda en
          un <strong>estado inconsistente</strong>.
        </p>

        <InfoCallout variant="warning" title="El problema de la inconsistencia">
          <p>
            Sin journaling, tras un fallo abrupto hay que ejecutar{" "}
            <strong>fsck</strong> (filesystem check) al reiniciar. fsck recorre
            CADA bloque del disco verificando la consistencia de todas las
            estructuras — en un disco de 4 TB puede tardar{" "}
            <strong>horas</strong>. Y aun así puede declarar bloques como
            perdidos (lost+found) o perder datos. En servidores con arrays de
            decenas de TB, esto es completamente inaceptable.
          </p>
        </InfoCallout>

        <h3 className="font-semibold text-lg mt-6 mb-3">
          Write-Ahead Logging (Journal)
        </h3>
        <p className="text-muted leading-relaxed">
          La solución es el <strong>journaling</strong> (write-ahead log): antes
          de modificar las estructuras reales del filesystem, se escribe un
          registro de la operación en una región especial del disco llamada{" "}
          <strong>journal</strong>. Si el sistema falla, al reiniciar basta con
          revisar el journal (pequeño, O(1) efectivo) y completar o descartar
          las transacciones incompletas.
        </p>

        <ExampleBlock title="Ciclo de una transacción en el journal">
          <ol className="space-y-2 text-sm list-decimal list-inside">
            <li>
              <strong>Begin transaction</strong>: se marca el inicio en el
              journal con un TxB (transaction begin block) incluyendo un ID de
              transacción único.
            </li>
            <li>
              <strong>Write journal</strong>: se escriben al journal todos los
              bloques que van a cambiar (metadatos y/o datos según el modo).
            </li>
            <li>
              <strong>Commit</strong>: se escribe un TxE (transaction end block)
              al journal. A partir de aquí la transacción es{" "}
              <strong>committed</strong>: si hay un fallo, se puede repetir.
            </li>
            <li>
              <strong>Checkpoint</strong>: se aplican los cambios a las
              ubicaciones reales del filesystem. Una vez completo, el espacio
              del journal se puede liberar (circular buffer).
            </li>
          </ol>
          <p className="text-sm text-muted mt-3">
            Si el fallo ocurre antes del commit → la transacción se descarta
            (redo no aplicable, el FS queda como estaba). Si el fallo ocurre
            después del commit pero antes del checkpoint → se repite el
            checkpoint al arrancar (idempotente).
          </p>
        </ExampleBlock>

        <h3 className="font-semibold text-lg mt-6 mb-3">
          Tres modos de journaling en ext4
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <ConceptCard
            title="Writeback (data=writeback)"
            icon={RefreshCw}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>Solo <strong>metadatos</strong> en el journal</li>
              <li>
                Los datos del archivo se escriben al FS en cualquier orden,
                posiblemente <em>después</em> que los metadatos
              </li>
              <li>
                <strong>Más rápido</strong>, pero riesgo de exposer datos
                basura en bloques recién asignados si hay fallo
              </li>
              <li>Útil cuando los datos son transitorios o el SO maneja semántica propia</li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="Ordered (default ext4)"
            icon={Layers}
            color="bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/30 dark:text-teal-300 dark:border-teal-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>Solo <strong>metadatos</strong> en el journal</li>
              <li>
                Los datos se garantizan escritos al FS{" "}
                <strong>antes</strong> de commitear los metadatos
              </li>
              <li>
                Buen balance rendimiento/seguridad
              </li>
              <li>
                Evita revelar datos de bloques anteriores, sin el doble costo de
                full journal
              </li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="Full journal (data=journal)"
            icon={Shield}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                <strong>Datos Y metadatos</strong> van al journal
              </li>
              <li>
                Máxima seguridad: toda la operación es atómica
              </li>
              <li>
                Cada dato se escribe <strong>dos veces</strong>: journal + FS
                real → rendimiento ~50% menor
              </li>
              <li>
                Recomendado para BD críticas o sistemas donde la pérdida de
                datos es inadmisible
              </li>
            </ul>
          </ConceptCard>
        </div>

        <InfoCallout variant="info" title="Analogía: el journal como lista de tareas pendientes">
          <p>
            Imaginá que antes de hacer cualquier cambio en tu agenda (el FS),
            escribís en un post-it (el journal):{" "}
            <em>
              "Voy a: (1) tachar la tarea X, (2) escribir la tarea Y en la
              página 47, (3) actualizar el índice"
            </em>
            . Si te interrumpen a mitad, al volver al escritorio leés el
            post-it y sabés exactamente qué completar o deshacer. No necesitás
            revisar toda la agenda — solo el post-it.
          </p>
        </InfoCallout>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 6: RAID                              */}
      {/* ============================================ */}
      <SectionBlock id="raid" title="RAID">
        <p className="text-muted leading-relaxed">
          <strong>RAID</strong> (Redundant Array of Independent Disks) es una
          tecnología que combina múltiples discos físicos para obtener mayor
          capacidad, mejor rendimiento, y/o tolerancia a fallos. Los distintos
          niveles de RAID hacen diferentes compromisos entre estas tres
          dimensiones.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="RAID 0: Striping puro"
            icon={Layers}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                Los datos se dividen en stripes distribuidos entre N discos
              </li>
              <li>
                Capacidad útil: N × tamaño de disco (100% eficiencia)
              </li>
              <li>
                Rendimiento de lectura y escritura: ×N (I/O en paralelo)
              </li>
              <li>
                <strong>CERO tolerancia a fallos</strong>: si falla 1 disco,
                se pierde toda la información del array
              </li>
              <li>
                Uso: scratch disks, renderizado de video, cuando hay backups
                externos
              </li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="RAID 1: Mirroring"
            icon={RefreshCw}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>Los datos se duplican en 2 discos</li>
              <li>
                Capacidad útil: 50% (1 disco de cada par es redundancia)
              </li>
              <li>
                Lectura: ×2 (puede leer de cualquier disco). Escritura: igual
                (ambos deben escribirse)
              </li>
              <li>Tolera 1 fallo de disco</li>
              <li>
                Uso: datos críticos, logs de base de datos, SO
              </li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="RAID 5: Striping con paridad distribuida"
            icon={Shield}
            color="bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/30 dark:text-teal-300 dark:border-teal-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                Paridad XOR rotada entre todos los discos (no hay disco de
                paridad dedicado)
              </li>
              <li>
                Capacidad útil: (N-1) × tamaño de disco
              </li>
              <li>Tolera 1 fallo de disco</li>
              <li>
                <strong>Write penalty</strong>: escritura aleatoria requiere
                leer-viejo-dato + leer-vieja-paridad + calcular + escribir 2
                bloques → 4 I/Os por cada 1 lógico
              </li>
              <li>Mínimo 3 discos. Uso: NAS, almacenamiento general</li>
            </ul>
          </ConceptCard>
          <ConceptCard
            title="RAID 6: Doble paridad"
            icon={Shield}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>
                Dos bloques de paridad independientes por stripe (P y Q,
                usando Galois Field arithmetic)
              </li>
              <li>
                Capacidad útil: (N-2) × tamaño de disco
              </li>
              <li>
                <strong>Tolera 2 fallos de disco simultáneos</strong>
              </li>
              <li>Write penalty aún mayor que RAID 5 (6 I/Os)</li>
              <li>
                Mínimo 4 discos. Uso: almacenamiento de larga vida donde la
                reconstrucción de RAID 5 es riesgosa
              </li>
            </ul>
          </ConceptCard>
        </div>

        <ConceptCard
          title="RAID 10 (1+0): Mirror de stripes"
          icon={GitBranch}
          color="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800"
        >
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <ul className="space-y-1.5 list-disc list-inside">
              <li>
                Crea pares de mirrors (RAID 1), luego hace stripe entre los
                pares (RAID 0)
              </li>
              <li>
                Capacidad útil: 50% (como RAID 1, pero escalable)
              </li>
              <li>Mínimo 4 discos</li>
            </ul>
            <ul className="space-y-1.5 list-disc list-inside">
              <li>
                Alto rendimiento de lectura Y escritura (sin write penalty de
                RAID 5)
              </li>
              <li>
                Puede tolerar múltiples fallos siempre que no sean los dos
                discos del mismo par mirror
              </li>
              <li>
                Uso: bases de datos OLTP, servidores con muchas escrituras
                aleatorias
              </li>
            </ul>
          </div>
        </ConceptCard>

        <ExampleBlock title="Caso práctico: RAID 5 con 4 discos de 2 TB">
          <div className="space-y-3 text-sm">
            <div className="bg-muted/50 rounded p-3">
              <p className="font-semibold mb-2">Configuración:</p>
              <p>4 discos × 2 TB = 8 TB raw</p>
              <p>RAID 5: (N-1) × tamaño = (4-1) × 2 TB = <strong>6 TB útiles</strong></p>
              <p>1 TB equivalente a paridad distribuida entre los 4 discos</p>
            </div>
            <div className="bg-muted/50 rounded p-3">
              <p className="font-semibold mb-2">Escenario de fallo:</p>
              <p>
                Falla el disco 2. El array entra en <strong>modo degradado</strong>
                : sigue funcionando (con menor rendimiento) reconstruyendo los
                datos del disco fallido usando XOR de los otros 3.
              </p>
              <p className="mt-2">
                Dato en disco 2 = D2 = D1 XOR D3 XOR P (donde P es la paridad
                del stripe)
              </p>
            </div>
            <div className="bg-muted/50 rounded p-3">
              <p className="font-semibold mb-2">Reconstrucción:</p>
              <p>
                Se inserta un nuevo disco (o el hot spare entra automáticamente).
                El controlador reconstruye los datos leyendo todos los otros
                discos. Durante este tiempo el array es VULNERABLE — si falla
                otro disco → pérdida total. Por eso RAID 6 es preferido para
                discos de alta capacidad.
              </p>
            </div>
          </div>
        </ExampleBlock>

        <ComparisonTable
          headers={[
            "Nivel",
            "Mín. discos",
            "Capacidad útil",
            "Fallos tolerados",
            "Lectura",
            "Escritura",
            "Caso de uso",
          ]}
          rows={[
            ["RAID 0", "2", "N × disco", "0", "×N", "×N", "Rendimiento puro, scratch"],
            ["RAID 1", "2", "1 × disco", "1", "×2", "×1", "Datos críticos, boot"],
            ["RAID 5", "3", "(N-1) × disco", "1", "×(N-1)", "Penalidad ×4", "NAS, almacenamiento general"],
            ["RAID 6", "4", "(N-2) × disco", "2", "×(N-2)", "Penalidad ×6", "Arrays grandes, larga vida"],
            ["RAID 10", "4", "50%", "1 por par", "×N", "×(N/2)", "BD OLTP, alto rendimiento"],
          ]}
        />

        <InfoCallout variant="info" title="RAID por hardware vs RAID por software">
          <p>
            <strong>RAID por hardware</strong>: controladora RAID dedicada con
            cache y batería de respaldo. El SO ve un único disco lógico. Más
            rendimiento, más caro, dependencia del hardware para recuperar
            datos.
            <br />
            <strong>RAID por software</strong> (Linux md / mdadm): el kernel
            gestiona el RAID directamente. Sin costo de hardware adicional,
            portable entre máquinas, pero usa CPU del sistema y no tiene cache
            de batería. Perfectamente adecuado para la mayoría de servidores.
          </p>
        </InfoCallout>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 7: Quiz del Capítulo                 */}
      {/* ============================================ */}
      <SectionBlock id="quiz" title="Quiz del Capítulo 4">
        <QuizContainer
          questions={quizSoCh4}
          chapterTitle={chapter.title}
        />
      </SectionBlock>
    </ChapterLayout>
  );
}

import type { QuizQuestion } from "@/types/quiz";

// Correct answers: b d a c b a d c b d a c b a d c b d a c
export const quizSoCh4: QuizQuestion[] = [
  {
    id: "so-ch4-q1",
    question:
      "¿Qué información contiene un inodo de Unix/Linux? Marcá la opción CORRECTA.",
    options: [
      { id: "a", text: "El nombre del archivo, tamaño, permisos y punteros a bloques de datos" },
      { id: "b", text: "Tamaño, timestamps, permisos, dueño, conteo de hard links y punteros a bloques de datos, pero NO el nombre del archivo" },
      { id: "c", text: "El nombre del archivo, la ruta absoluta, timestamps y los datos del archivo directamente" },
      { id: "d", text: "Solo los punteros a bloques de datos y el tamaño del archivo" },
    ],
    correctAnswerId: "b",
    explanation:
      "El inodo almacena todos los metadatos del archivo: tamaño, atime/mtime/ctime, permisos (modo), UID/GID del dueño, conteo de hard links, y punteros a bloques de datos (12 directos, 1 indirecto simple, 1 doble, 1 triple). Lo que NO contiene el inodo es el nombre del archivo — ese mapeo (nombre → número de inodo) vive en el directorio. Esta separación permite que múltiples nombres (hard links) apunten al mismo inodo.",
  },
  {
    id: "so-ch4-q2",
    question:
      "Con bloques de 4 KB y punteros de 4 bytes, ¿cuántos punteros caben en un bloque indirecto simple?",
    options: [
      { id: "a", text: "256 punteros" },
      { id: "b", text: "512 punteros" },
      { id: "c", text: "128 punteros" },
      { id: "d", text: "1024 punteros" },
    ],
    correctAnswerId: "d",
    explanation:
      "Un bloque de 4 KB = 4096 bytes. Cada puntero ocupa 4 bytes. Entonces 4096 / 4 = 1024 punteros por bloque. Esto es clave para el cálculo del tamaño máximo de archivo: el indirecto simple cubre 1024 × 4 KB = 4 MB; el indirecto doble cubre 1024² × 4 KB = 4 GB; el indirecto triple cubre 1024³ × 4 KB ≈ 4 TB.",
  },
  {
    id: "so-ch4-q3",
    question:
      "Un programador crea un archivo con `ln archivo.txt enlace.txt` (hard link) y luego borra `archivo.txt` con `unlink`. ¿Qué sucede con los datos?",
    options: [
      { id: "a", text: "Los datos siguen accesibles a través de enlace.txt; el inodo se libera solo cuando el conteo de links llega a 0" },
      { id: "b", text: "Los datos se borran inmediatamente porque se borró el archivo original" },
      { id: "c", text: "Los datos siguen accesibles, pero el inodo se duplica para enlace.txt" },
      { id: "d", text: "enlace.txt queda apuntando a un inodo inválido (dangling link)" },
    ],
    correctAnswerId: "a",
    explanation:
      "Un hard link es simplemente una segunda entrada de directorio apuntando al mismo inodo. El inodo tiene un campo `nlink` (conteo de referencias). Al crear `enlace.txt`, nlink sube a 2. Al hacer `unlink archivo.txt`, nlink baja a 1 — el inodo NO se libera. Los datos son plenamente accesibles via `enlace.txt`. El kernel libera el inodo y los bloques de datos solo cuando nlink llega a 0. Esto contrasta con un symlink, donde borrar el archivo original SÍ deja un dangling link.",
  },
  {
    id: "so-ch4-q4",
    question:
      "¿Cuál es la diferencia fundamental entre un hard link y un symlink (soft link)?",
    options: [
      { id: "a", text: "El hard link puede cruzar sistemas de archivos; el symlink no puede" },
      { id: "b", text: "Ambos son equivalentes en comportamiento; la diferencia es solo sintáctica" },
      { id: "c", text: "El symlink puede apuntar a directorios y cruzar sistemas de archivos, pero puede quedar inválido si se borra el destino; el hard link comparte el inodo y no puede cruzar FS ni apuntar a directorios (en general)" },
      { id: "d", text: "El symlink siempre es más eficiente que el hard link porque no duplica metadatos" },
    ],
    correctAnswerId: "c",
    explanation:
      "Hard link: apunta directamente al inodo. Solo funciona dentro del mismo filesystem (mismo número de dispositivo). No puede apuntar a directorios (para evitar ciclos). No puede quedar 'roto'. Symlink: es un archivo especial que contiene una ruta como cadena de texto. Puede cruzar filesystems, puede apuntar a directorios, y PUEDE quedar dangling (inválido) si el destino es borrado. El kernel los resuelve en tiempo de pathname lookup.",
  },
  {
    id: "so-ch4-q5",
    question:
      "En ext4, ¿para qué sirven los 'extents' y en qué mejoran respecto a los punteros directos/indirectos clásicos?",
    options: [
      { id: "a", text: "Los extents son punteros indirectos de tres niveles que maximizan el tamaño máximo de archivo" },
      { id: "b", text: "Un extent describe un rango contiguo de bloques {bloque_inicio, longitud}, reduciendo el overhead de metadatos para archivos grandes y mejorando la localidad en disco" },
      { id: "c", text: "Los extents reemplazan el journaling en ext4 para operaciones más rápidas" },
      { id: "d", text: "Los extents son una caché en RAM de los bloques más frecuentemente accedidos" },
    ],
    correctAnswerId: "b",
    explanation:
      "En ext3 (y sistemas clásicos), cada bloque de datos requiere un puntero individual en el inodo. Para un archivo de 1000 bloques contiguos, necesitás 1000 entradas. Con extents, un solo descriptor {bloque_inicio: 1000, longitud: 1000} describe esos 1000 bloques. Esto reduce enormemente la cantidad de metadatos para archivos grandes, mejora la localidad (favorece I/O secuencial), y acelera operaciones como truncate. ext4 soporta extents de hasta 128 MB contiguos.",
  },
  {
    id: "so-ch4-q6",
    question:
      "¿Qué modo de journaling de ext4 es el más seguro ante fallos de energía (máxima protección de datos)?",
    options: [
      { id: "a", text: "Full journal (data=journal): tanto datos como metadatos se escriben al journal antes que al FS" },
      { id: "b", text: "Ordered (data=ordered): los metadatos van al journal, los datos se escriben primero al FS antes de commitear el journal" },
      { id: "c", text: "Writeback (data=writeback): solo metadatos en journal, datos escritos en cualquier orden" },
      { id: "d", text: "No-journal: sin journaling, solo fsck al arrancar" },
    ],
    correctAnswerId: "a",
    explanation:
      "Full journal (data=journal) es el más seguro: antes de cualquier modificación al filesystem real, tanto los datos del archivo como los metadatos se escriben al journal (write-ahead log). Si hay un fallo, el sistema puede repetir o descartar la transacción completa, garantizando consistencia total. El costo es rendimiento: cada dato se escribe dos veces (journal + FS). El modo 'ordered' (default) ofrece un buen balance: protege metadatos, y garantiza que los datos se escriban al FS antes de commitear los metadatos al journal, evitando referencias a bloques con datos basura.",
  },
  {
    id: "so-ch4-q7",
    question:
      "En RAID 5 con 4 discos de 2 TB cada uno, ¿cuál es la capacidad útil total y cuántos fallos de disco simultáneos tolera?",
    options: [
      { id: "a", text: "8 TB útiles, tolera 2 fallos simultáneos" },
      { id: "b", text: "6 TB útiles, tolera 2 fallos simultáneos" },
      { id: "c", text: "8 TB útiles, tolera 1 fallo" },
      { id: "d", text: "6 TB útiles, tolera 1 fallo" },
    ],
    correctAnswerId: "d",
    explanation:
      "RAID 5 con N discos destina el equivalente a 1 disco para paridad (distribuida entre todos los discos). Con 4 discos de 2 TB: capacidad útil = (4 - 1) × 2 TB = 6 TB. Tolera exactamente 1 fallo de disco — si falla un segundo disco antes de reconstruir, se pierde toda la información. Si necesitás tolerar 2 fallos simultáneos, necesitás RAID 6 (doble paridad), que con 4 discos daría (4 - 2) × 2 TB = 4 TB útiles.",
  },
  {
    id: "so-ch4-q8",
    question:
      "¿Qué problema resuelve el journaling en un sistema de archivos? ¿Qué pasaba antes de que existiera?",
    options: [
      { id: "a", text: "Resuelve la fragmentación del disco; antes había que desfragmentar manualmente" },
      { id: "b", text: "Resuelve los permisos de acceso; antes cualquier proceso podía escribir en cualquier archivo" },
      { id: "c", text: "Resuelve la inconsistencia del FS tras un fallo abrupto; antes era necesario ejecutar fsck, que recorría todo el disco en O(tamaño) y podía tardar horas, con riesgo de pérdida de datos" },
      { id: "d", text: "Resuelve la falta de redundancia; antes no había forma de recuperar datos perdidos" },
    ],
    correctAnswerId: "c",
    explanation:
      "Una operación como crear un archivo requiere múltiples escrituras independientes: actualizar el bitmap de bloques, escribir el inodo, escribir la entrada en el directorio. Si el sistema se cae a mitad, el FS queda en estado inconsistente. Sin journal, al reiniciar hay que ejecutar fsck (filesystem check) que recorre cada bloque del disco — en discos de varios TB puede tardar horas. Con journaling, las operaciones se registran atómicamente en un write-ahead log (journal). Al arrancar, basta con revisar el journal (pequeño, O(1) efectivo) y repetir o descartar transacciones incompletas.",
  },
  {
    id: "so-ch4-q9",
    question:
      "¿Cuál es la función de la capa VFS (Virtual File System) en el kernel de Linux?",
    options: [
      { id: "a", text: "Es un sistema de archivos en RAM que reemplaza al disco para máxima velocidad" },
      { id: "b", text: "Es la capa de abstracción del kernel que define una interfaz uniforme (vfs_open, vfs_read, vfs_write) despachada polimórficamente a las implementaciones concretas de cada FS (ext4, FAT32, NFS, etc.)" },
      { id: "c", text: "Es un daemon de usuario que gestiona el montaje y desmontaje de volúmenes" },
      { id: "d", text: "Es el módulo del kernel que implementa únicamente el sistema de archivos ext4" },
    ],
    correctAnswerId: "b",
    explanation:
      "VFS (Virtual File System) es una capa de indirección en el kernel que define operaciones abstractas sobre objetos: superblock, inode, dentry (directory entry) y file. Cada filesystem concreto (ext4, XFS, FAT, NFS, procfs, tmpfs...) registra su implementación de estas operaciones. Cuando un proceso llama a `read()`, el kernel despacha a `file->f_op->read()` que apunta a la implementación del FS montado. Esto permite que ls, cat, etc. funcionen igual en ext4, una USB FAT32 o un share NFS — la misma syscall, distintas implementaciones.",
  },
  {
    id: "so-ch4-q10",
    question:
      "¿Cuál de las siguientes afirmaciones sobre FAT32 es CORRECTA?",
    options: [
      { id: "a", text: "FAT32 soporta permisos Unix (rwxrwxrwx) y journaling nativo" },
      { id: "b", text: "FAT32 puede manejar archivos mayores a 4 GB sin problemas" },
      { id: "c", text: "FAT32 almacena la cadena de clusters de cada archivo en una tabla al inicio del volumen; el tamaño máximo de archivo es 4 GB - 1 byte por la entrada de 32 bits del campo de tamaño" },
      { id: "d", text: "FAT32 usa inodos para almacenar metadatos, similar a ext4" },
    ],
    correctAnswerId: "c" ,
    explanation:
      "FAT32 usa una tabla (la FAT) en el inicio del volumen donde cada entrada corresponde a un cluster. Las entradas forman cadenas enlazadas que representan la secuencia de clusters de cada archivo. El nombre del archivo y sus atributos básicos (tamaño, timestamps) se almacenan en entradas de directorio de 32 bytes — NO en inodos. El campo de tamaño de archivo es un entero de 32 bits sin signo, limitando archivos a 2³² - 1 = 4 GB - 1 byte. FAT32 NO tiene permisos Unix, NO tiene journaling, y la fragmentación es un problema serio.",
  },
  {
    id: "so-ch4-q11",
    question:
      "En la resolución del path `/home/ana/notas.txt`, ¿cuántas lecturas de inodo realiza el kernel como mínimo?",
    options: [
      { id: "a", text: "1 lectura (solo el inodo del archivo final)" },
      { id: "b", text: "2 lecturas (inodo de /home y el del archivo)" },
      { id: "c", text: "3 lecturas (inodo de /, inodo de /home, inodo de /home/ana)" },
      { id: "d", text: "4 lecturas: inodo de /, inodo de /home, inodo de /home/ana, inodo de notas.txt" },
    ],
    correctAnswerId: "d",
    explanation:
      "La resolución de pathname absoluto en Unix requiere recorrer cada componente: (1) leer inodo de / (siempre inodo 2 en ext4), buscar 'home' en el directorio → obtener número de inodo de /home; (2) leer inodo de /home, buscar 'ana' → inodo de /home/ana; (3) leer inodo de /home/ana, buscar 'notas.txt' → número de inodo del archivo; (4) leer inodo de notas.txt para acceder a los datos. Son 4 lecturas de inodo (más las lecturas de los bloques de directorio). Linux mitiga esto con el dcache (directory entry cache) que cachea traversals recientes.",
  },
  {
    id: "so-ch4-q12",
    question:
      "¿Cuál es el propósito del campo `st_nlink` en la estructura `stat` de un archivo?",
    options: [
      { id: "a", text: "Indica la velocidad de acceso al archivo en el disco" },
      { id: "b", text: "Indica el número de bloques de datos asignados al archivo" },
      { id: "c", text: "Indica cuántas entradas de directorio (hard links) apuntan a ese inodo; cuando llega a 0, el inodo y sus bloques se liberan" },
      { id: "d", text: "Indica si el archivo está abierto por algún proceso actualmente" },
    ],
    correctAnswerId: "c",
    explanation:
      "st_nlink (link count) en el inodo cuenta cuántas entradas de directorio referencian ese inodo. Al crear un archivo: nlink = 1. Con `ln a b`: nlink = 2. Con `rm a`: nlink = 1. El sistema libera el inodo y los bloques de datos solo cuando nlink llega a 0 Y ningún proceso tiene el archivo abierto (file descriptor activo). Nótese que un directorio vacío tiene nlink = 2 (la entrada en su padre y la entrada '.' dentro de sí mismo), y cada subdirectorio agrega 1 más por la entrada '..'.",
  },
  {
    id: "so-ch4-q13",
    question:
      "Un sysadmin ejecuta `chmod 4755 /usr/bin/sudo`. ¿Qué efecto tiene el dígito '4' en los permisos octal?",
    options: [
      { id: "a", text: "Activa el sticky bit, que evita que otros usuarios borren el archivo" },
      { id: "b", text: "Da permisos de escritura al grupo propietario del archivo" },
      { id: "c", text: "Activa el SUID bit: cuando cualquier usuario ejecuta el binario, el proceso corre con los privilegios del dueño del archivo (root en este caso), no del usuario que lo ejecuta" },
      { id: "d", text: "Establece que el archivo es de solo lectura para todos los usuarios" },
    ],
    correctAnswerId: "c",
    explanation:
      "En la notación octal de permisos Unix, el primer dígito controla los bits especiales: 4 = SUID (Set User ID), 2 = SGID (Set Group ID), 1 = sticky bit. `chmod 4755` activa SUID (4) y establece rwxr-xr-x (755). Con SUID activo, cuando cualquier usuario ejecuta el binario, el proceso hereda el UID del dueño del archivo en lugar del UID del usuario ejecutante. Es por eso que `sudo`, `passwd`, `ping` pueden hacer operaciones privilegiadas siendo ejecutados por usuarios normales.",
  },
  {
    id: "so-ch4-q14",
    question:
      "¿Qué diferencia hay entre el modo de journaling 'writeback' y el modo 'ordered' en ext4?",
    options: [
      { id: "a", text: "En 'writeback', solo los metadatos van al journal y los datos pueden escribirse al FS en cualquier orden; en 'ordered', los datos se garantizan escritos al FS ANTES de que los metadatos se commiteen al journal" },
      { id: "b", text: "'writeback' escribe datos primero y metadatos después; 'ordered' escribe metadatos primero y datos después" },
      { id: "c", text: "Ambos modos son equivalentes en seguridad; la diferencia es solo rendimiento" },
      { id: "d", text: "'ordered' no usa journal y confía en el orden de escritura del SO" },
    ],
    correctAnswerId: "a",
    explanation:
      "En modo 'writeback': el journal solo registra metadatos (inodos, bitmaps, directorios). Los datos del archivo se escriben al FS en cualquier orden, posiblemente DESPUÉS que los metadatos. Riesgo: si hay un fallo, un inodo puede apuntar a un bloque con datos corruptos o de un archivo anterior. En modo 'ordered' (default de ext4): también solo metadatos en journal, pero el kernel garantiza que los datos del archivo se escriben al FS ANTES de commitear los metadatos correspondientes. Esto evita exponer datos viejos, sin el doble costo de full journal.",
  },
  {
    id: "so-ch4-q15",
    question:
      "Tenés un array RAID 0 con 3 discos de 1 TB. ¿Qué ocurre si falla exactamente 1 de los discos?",
    options: [
      { id: "a", text: "Los datos del disco fallido se reconstruyen a partir de los otros dos usando paridad" },
      { id: "b", text: "El array continúa funcionando en modo degradado con los dos discos restantes" },
      { id: "c", text: "Se activa el hot spare automáticamente para reemplazar el disco fallido" },
      { id: "d", text: "Se pierde TODA la información del array, no solo la del disco fallido, porque los datos están striped entre los 3 discos" },
    ],
    correctAnswerId: "d",
    explanation:
      "RAID 0 (striping puro) divide los datos en stripes distribuidos entre todos los discos. No hay redundancia, ni paridad, ni copia. Cuando un bloque se necesita, debe estar disponible en el disco donde fue escrito. Si falla 1 disco, todos los archivos que tenían algún stripe en ese disco quedan incompletos — lo cual en la práctica es prácticamente TODOS los archivos del array. La probabilidad de pérdida total de datos es alta. RAID 0 solo se usa cuando se prioriza rendimiento y se asume backup externo.",
  },
  {
    id: "so-ch4-q16",
    question:
      "¿Qué implementación de directorio ofrece búsqueda en O(1) amortizado frente a la lista lineal que requiere O(n)?",
    options: [
      { id: "a", text: "Árbol B+ de entradas de directorio" },
      { id: "b", text: "Lista doblemente enlazada con puntero al último elemento" },
      { id: "c", text: "Tabla de hash sobre el nombre del archivo dentro del bloque de directorio" },
      { id: "d", text: "Índice de nombres basado en árbol AVL" },
    ],
    correctAnswerId: "c",
    explanation:
      "La implementación básica de directorio es una lista lineal de entradas (nombre, inodo). La búsqueda de un nombre requiere recorrer toda la lista: O(n). Para directorios con miles de entradas (ej. carpetas con millones de archivos como en servidores), esto es prohibitivo. La alternativa es usar una tabla hash dentro del directorio: se aplica una función hash al nombre y se accede directamente a la entrada, logrando O(1) amortizado. ext4 implementa esto como HTree (una variante de árbol B hash-tree). Los conflictos de hash se resuelven con encadenamiento.",
  },
  {
    id: "so-ch4-q17",
    question:
      "Un descriptor de archivo (file descriptor) en Unix, ¿qué es exactamente y qué información mantiene?",
    options: [
      { id: "a", text: "Es el número de inodo del archivo en el disco" },
      { id: "b", text: "Es un índice en la tabla de descriptores del proceso, que apunta a una entrada en la tabla de archivos abiertos global del kernel, que a su vez referencia el inodo y mantiene el offset de lectura/escritura actual" },
      { id: "c", text: "Es un puntero directo a los bloques de datos del archivo en disco" },
      { id: "d", text: "Es un identificador único global en todo el sistema para cada archivo abierto" },
    ],
    correctAnswerId: "b",
    explanation:
      "Hay tres niveles: (1) Tabla de descriptores por proceso: el fd (0, 1, 2, ...) es un índice en esta tabla. (2) Tabla de archivos abiertos del kernel (open file table): contiene el offset actual de lectura/escritura, los flags de apertura (O_RDONLY, etc.) y un puntero al inodo. Múltiples fds (incluso de diferentes procesos) pueden apuntar a la misma entrada. (3) Tabla de inodos en memoria (v-node table): el inodo con los metadatos del archivo. El fork() duplica la tabla de descriptores del proceso pero comparte las entradas del open file table — por eso padre e hijo comparten el offset si heredan el mismo fd.",
  },
  {
    id: "so-ch4-q18",
    question:
      "¿Cuál es la capacidad útil de RAID 6 con 5 discos de 4 TB y cuántos fallos simultáneos tolera?",
    options: [
      { id: "a", text: "20 TB útiles, tolera 1 fallo" },
      { id: "b", text: "16 TB útiles, tolera 2 fallos" },
      { id: "c", text: "12 TB útiles, tolera 2 fallos" },
      { id: "d", text: "12 TB útiles, tolera 3 fallos" },
    ],
    correctAnswerId: "d",
    explanation:
      "RAID 6 usa doble paridad: el equivalente a 2 discos se destina a información de paridad (distribuida entre todos). Con 5 discos de 4 TB: capacidad útil = (5 - 2) × 4 TB = 12 TB. RAID 6 tolera 2 fallos de disco simultáneos. Esto es crucial en entornos donde los discos son grandes (altas probabilidades de fallo durante la reconstrucción de RAID 5 — el 'RAID 5 rebuild problem'). Requiere mínimo 4 discos.",
  },
  {
    id: "so-ch4-q19",
    question:
      "Al montar un filesystem con `mount /dev/sdb1 /mnt/usb`, ¿qué sucede en el VFS?",
    options: [
      { id: "a", text: "El kernel copia todos los archivos de /dev/sdb1 a /mnt/usb en RAM" },
      { id: "b", text: "Se crea un nuevo directorio /mnt/usb vacío en el FS raíz" },
      { id: "c", text: "El dentry (directory entry cache) de /mnt/usb se marca como mount point y su v-node se reemplaza con el superbloque raíz del FS de /dev/sdb1; cualquier lookup bajo /mnt/usb es redirigido al nuevo FS" },
      { id: "d", text: "Se crea una copia en memoria del filesystem de /dev/sdb1 para acelerar el acceso" },
    ],
    correctAnswerId: "c",
    explanation:
      "El mount en VFS es una operación de superposición (overlay): el kernel lee el superbloque del dispositivo /dev/sdb1, instancia los objetos VFS correspondientes (superblock, root inode), y registra este FS en la tabla de mounts. El dentry de /mnt/usb se marca como DCACHE_MOUNTED. Cualquier pathname lookup que llegue a /mnt/usb es transparentemente redirigido al root inode del FS montado. El directorio /mnt/usb del FS padre queda oculto (pero no borrado) mientras dure el mount. `umount` revierte todo esto.",
  },
  {
    id: "so-ch4-q20",
    question:
      "¿Cuál es la ventaja de RAID 10 (1+0) sobre RAID 5 para bases de datos con muchas escrituras aleatorias?",
    options: [
      { id: "a", text: "RAID 10 tiene mayor capacidad útil que RAID 5 con la misma cantidad de discos" },
      { id: "b", text: "RAID 10 no requiere calcular paridad en escrituras, eliminando el 'write penalty' de RAID 5 que exige leer-modificar-escribir la paridad en cada operación de escritura aleatoria" },
      { id: "c", text: "RAID 10 tolera más fallos simultáneos que RAID 5 en todos los casos" },
      { id: "d", text: "RAID 10 es más barato porque usa menos discos para la misma capacidad" },
    ],
    correctAnswerId: "b",
    explanation:
      "RAID 5 tiene un 'write penalty' severo en escrituras aleatorias: para actualizar un bloque de datos, el controlador debe (1) leer el bloque viejo, (2) leer el bloque de paridad viejo, (3) calcular la nueva paridad, (4) escribir el nuevo bloque de datos, (5) escribir la nueva paridad — 4 operaciones de I/O por cada escritura lógica. RAID 10 (mirror de stripes) simplemente escribe el bloque en dos discos (el original y el espejo), sin cálculo de paridad — 2 operaciones de I/O. Para OLTP, el write penalty de RAID 5 es inaceptable. El costo de RAID 10 es que solo el 50% de la capacidad es útil.",
  },
];

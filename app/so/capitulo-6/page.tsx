import { soChapters } from "@/data/so-chapters";
import { ChapterLayout } from "@/components/layout/chapter-layout";
import { SectionBlock } from "@/components/content/section-block";
import { ConceptCard } from "@/components/content/concept-card";
import { ExampleBlock } from "@/components/content/example-block";
import { ComparisonTable } from "@/components/content/comparison-table";
import { InfoCallout } from "@/components/content/info-callout";
import { QuizContainer } from "@/components/quiz/quiz-container";
import { quizSoCh6 } from "@/data/quiz-so-ch6";
import {
  Shield,
  Lock,
  Key,
  AlertTriangle,
  Eye,
  UserX,
  Layers,
  ShieldAlert,
} from "lucide-react";

const chapter = soChapters[5];

export default function SOCapitulo6() {
  return (
    <ChapterLayout chapter={chapter} allChapters={soChapters}>
      {/* ============================================ */}
      {/* SECCIÓN 1: Fundamentos de Seguridad */}
      {/* ============================================ */}
      <SectionBlock id="conceptos-seguridad" title="Fundamentos de Seguridad">
        <p className="text-muted leading-relaxed">
          La seguridad en sistemas operativos es la disciplina de garantizar que
          los recursos del sistema —CPU, memoria, archivos, red— solo sean
          accedidos por quienes tienen autorización para hacerlo, de la manera
          en que están autorizados, y que el sistema permanezca disponible.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <ConceptCard
            title="Confidencialidad"
            icon={Eye}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p>
              Solo usuarios autorizados pueden <strong>leer</strong> la
              información. Ejemplo: tu historial médico solo lo ves vos y tu
              médico, no cualquier empleado del hospital.
            </p>
          </ConceptCard>

          <ConceptCard
            title="Integridad"
            icon={Shield}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <p>
              Los datos no son <strong>modificados</strong> de forma no
              autorizada. Si alguien modifica un archivo, se puede detectar.
              Ejemplo: un contrato firmado digitalmente no puede alterarse sin
              invalidar la firma.
            </p>
          </ConceptCard>

          <ConceptCard
            title="Disponibilidad"
            icon={Lock}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <p>
              El sistema está <strong>accesible cuando se necesita</strong>.
              Un ataque DDoS que tumba un servidor viola disponibilidad aunque
              no robe ni modifique datos.
            </p>
          </ConceptCard>
        </div>

        <InfoCallout variant="info" title="Autenticación vs Autorización">
          <p>
            <strong>Autenticación:</strong> verificar <em>quién sos</em>. Factores:
            algo que sabés (contraseña), algo que tenés (token OTP, llave física),
            algo que sos (huella dactilar, reconocimiento facial). MFA combina al
            menos dos factores.
          </p>
          <p className="mt-2">
            <strong>Autorización:</strong> verificar <em>qué podés hacer</em>.
            Una vez que el SO sabe quién sos, consulta la política de control de
            acceso para decidir si podés leer ese archivo, ejecutar ese comando,
            o abrir ese puerto de red.
          </p>
        </InfoCallout>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Principio de Mínimo Privilegio"
            icon={UserX}
            color="bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-800"
          >
            <p>
              Cada proceso y usuario debe tener <strong>solo los permisos
              mínimos</strong> necesarios para su función. Si un servidor web
              es comprometido y corre como <code>www-data</code> (no root), el
              atacante no puede leer <code>/etc/shadow</code> ni instalar
              rootkits.
            </p>
          </ConceptCard>

          <ConceptCard
            title="Defensa en Profundidad"
            icon={Layers}
            color="bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800"
          >
            <p>
              Múltiples capas de seguridad independientes. Si una falla, las
              otras siguen activas. Ejemplo: firewall perimetral + IDS + SELinux
              + contraseñas fuertes + MFA + auditoría de logs. Ninguna capa
              sola es suficiente.
            </p>
          </ConceptCard>
        </div>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 2: Criptografía */}
      {/* ============================================ */}
      <SectionBlock id="criptografia" title="Criptografía">
        <p className="text-muted leading-relaxed">
          La criptografía es la herramienta matemática que hace posible la
          seguridad digital. No es solo &quot;codificar mensajes&quot; — provee
          confidencialidad, integridad, autenticación y no repudio.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Criptografía Simétrica"
            icon={Key}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li><strong>Misma clave</strong> para cifrar y descifrar</li>
              <li>Muy rápida: AES en hardware (AES-NI) ~1 byte/ciclo de CPU</li>
              <li><strong>AES-256</strong>: estándar actual. Bloques de 128 bits, clave de 256 bits</li>
              <li>Problema: ¿cómo compartir la clave de forma segura?</li>
              <li>DES (56 bits) y 3DES: obsoletos, no usar</li>
              <li>Modos: GCM (autenticado, recomendado), CBC, CTR. <strong>Nunca ECB</strong> (patrones visibles)</li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="Criptografía Asimétrica"
            icon={Lock}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>Par de claves: <strong>pública</strong> (para cifrar/verificar) y <strong>privada</strong> (para descifrar/firmar)</li>
              <li>RSA: seguridad basada en dificultad de factorizar números primos grandes. Clave mínima: 2048 bits</li>
              <li>ECDSA / Ed25519: curvas elípticas — igual seguridad que RSA con claves más cortas</li>
              <li>Lenta: ~1000× más lenta que AES. Solo se usa para intercambiar claves simétricas</li>
              <li>Protocolo Diffie-Hellman: intercambiar secreto compartido sobre canal público</li>
            </ul>
          </ConceptCard>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Funciones Hash Criptográficas"
            icon={Shield}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>One-way: dado H(x), no se puede obtener x</li>
              <li>Resistente a colisiones: difícil encontrar x≠y con H(x)=H(y)</li>
              <li><strong>SHA-256</strong>: output 256 bits, estándar actual. SHA-3 también seguro</li>
              <li>MD5 y SHA-1: <strong>rotos para seguridad</strong> — no usar</li>
              <li><strong>bcrypt/Argon2</strong>: hash lento para contraseñas. El factor de costo hace fuerza bruta impractical</li>
              <li>HMAC: hash con clave secreta para autenticación de mensajes</li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="Firmas Digitales"
            icon={Eye}
            color="bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>Emisor: H(documento) → cifrar con clave <strong>privada</strong> = firma</li>
              <li>Receptor: descifrar firma con clave <strong>pública</strong> → comparar con H(documento)</li>
              <li>Si coincide: el documento no fue alterado y vino de quien tiene esa clave privada</li>
              <li>Certificados X.509: firma digital de una CA sobre la clave pública de una entidad</li>
              <li>Casos de uso: HTTPS, commits de Git firmados, paquetes de software</li>
            </ul>
          </ConceptCard>
        </div>

        <ExampleBlock title="TLS 1.3: cómo se combinan todos los primitivos criptográficos">
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>ClientHello</strong>: cliente envía versión TLS, cipher suites soportados,
              y su <em>clave pública efímera Diffie-Hellman</em> (ECDH)
            </li>
            <li>
              <strong>ServerHello</strong>: servidor elige cipher suite (ej: TLS_AES_256_GCM_SHA384),
              envía su clave pública ECDH efímera y su <em>certificado X.509</em> (clave pública RSA/ECDSA firmada por CA)
            </li>
            <li>
              <strong>Key derivation</strong>: ambos lados calculan el secreto compartido con Diffie-Hellman
              y derivan claves de sesión con HKDF-SHA384
            </li>
            <li>
              <strong>Autenticación del servidor</strong>: servidor firma el handshake con su clave privada
              → cliente verifica con la clave pública del certificado → cadena de confianza hasta CA raíz
            </li>
            <li>
              <strong>Datos cifrados</strong>: todo el tráfico HTTP/2 va cifrado con <strong>AES-256-GCM</strong>
              (confidencialidad + integridad). Forward secrecy: si roban la clave del servidor, no descifran tráfico pasado
            </li>
          </ol>
        </ExampleBlock>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 3: Control de Acceso */}
      {/* ============================================ */}
      <SectionBlock id="control-acceso" title="Control de Acceso">
        <p className="text-muted leading-relaxed">
          El control de acceso es el mecanismo que hace cumplir la política de
          autorización: dado un sujeto (proceso/usuario) y un objeto (archivo,
          socket, dispositivo), ¿está permitida esta operación?
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <ConceptCard
            title="DAC — Discretionary"
            icon={Key}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p>
              El <strong>dueño del recurso</strong> decide quién tiene acceso.
              Modelo Unix: rwx para dueño, grupo, otros. ACL POSIX para
              permisos granulares por usuario. Flexible pero el dueño puede
              equivocarse y dar demasiado acceso.
            </p>
          </ConceptCard>

          <ConceptCard
            title="MAC — Mandatory"
            icon={Shield}
            color="bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-800"
          >
            <p>
              El <strong>SO impone la política</strong>, el usuario no puede
              relajarla. Modelo Bell-LaPadula: clasificaciones (secreto, top
              secret). &quot;No read up, no write down&quot;. Implementado en
              SELinux y AppArmor en Linux.
            </p>
          </ConceptCard>

          <ConceptCard
            title="RBAC — Role-Based"
            icon={Layers}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <p>
              Permisos asignados a <strong>roles</strong>, no a usuarios.
              Usuario → Rol → Permisos. Ejemplo: rol &quot;enfermero&quot; puede
              leer historiales, rol &quot;médico&quot; puede modificarlos.
              Más manejable en organizaciones grandes.
            </p>
          </ConceptCard>
        </div>

        <ComparisonTable
          headers={["Modelo", "Quién define permisos", "Flexibilidad", "Caso de uso", "Ejemplo"]}
          rows={[
            ["DAC", "El dueño del recurso", "Alta", "SO de uso general", "Unix chmod, Windows NTFS ACL"],
            ["MAC", "El administrador del SO (política)", "Baja (intencional)", "Sistemas militares, alta seguridad", "SELinux, AppArmor, Android"],
            ["RBAC", "El administrador (roles)", "Media", "Empresas, sistemas hospitalarios", "Active Directory, AWS IAM"],
          ]}
        />

        <InfoCallout variant="tip" title="SUID, SGID y Sticky Bit en Unix">
          <p>
            <strong>SUID (Set User ID):</strong> cuando un ejecutable tiene
            este bit, corre con los privilegios del <em>dueño</em> del archivo,
            no del usuario que lo ejecuta. Ejemplo: <code>/usr/bin/passwd</code>{" "}
            es SUID root para que cualquier usuario pueda cambiar su contraseña
            (escribe en <code>/etc/shadow</code> que solo root puede tocar).
          </p>
          <p className="mt-2">
            <strong>Sticky bit en directorios</strong> (como <code>/tmp</code>):
            solo el dueño de un archivo puede eliminarlo, aunque el directorio
            tenga permisos de escritura para todos.
          </p>
        </InfoCallout>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 4: Vulnerabilidades Comunes */}
      {/* ============================================ */}
      <SectionBlock id="vulnerabilidades" title="Vulnerabilidades Comunes">
        <p className="text-muted leading-relaxed">
          Conocer las vulnerabilidades es el primer paso para defenderse.
          La mayoría de los ataques reales explotan errores de programación
          conocidos y bien documentados.
        </p>

        <InfoCallout variant="warning" title="Contexto educativo y defensivo">
          <p>
            El análisis de vulnerabilidades tiene como único objetivo{" "}
            <strong>entender cómo funcionan para poder defenderse</strong>.
            Este material está orientado al diseño de software seguro,
            revisión de código, y comprensión de las mitigaciones del SO.
          </p>
        </InfoCallout>

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Buffer Overflow"
            icon={AlertTriangle}
            color="bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>C no verifica límites de arrays. <code>gets(buf)</code>, <code>strcpy()</code> son inseguros</li>
              <li>Escribir más allá del buffer sobreescribe el stack: variables locales, saved registers, <strong>return address</strong></li>
              <li>El atacante redirige la ejecución a código malicioso inyectado o a funciones del sistema</li>
              <li><strong>Mitigaciones</strong>: ASLR, NX/DEP, Stack Canaries, compilar con <code>-fstack-protector</code>, usar <code>snprintf</code>/<code>strncpy</code></li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="TOCTOU (Race Condition)"
            icon={AlertTriangle}
            color="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li><strong>T</strong>ime-<strong>O</strong>f-<strong>C</strong>heck <strong>T</strong>o <strong>T</strong>ime-<strong>O</strong>f-<strong>U</strong>se</li>
              <li>Verificar condición y actuar no es atómico → ventana de oportunidad</li>
              <li>Ejemplo: verificar permisos del archivo y luego abrirlo. Un atacante puede reemplazar el archivo con un symlink entre los dos pasos</li>
              <li>Solución: usar operaciones atómicas (open con O_NOFOLLOW, fstat sobre el fd abierto)</li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="Integer Overflow"
            icon={AlertTriangle}
            color="bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li>Aritmética de enteros no detecta overflow en C</li>
              <li><code>size_t size = n * sizeof(int)</code>: si n es muy grande, size puede ser 0 o pequeño</li>
              <li>Luego <code>malloc(size)</code> asigna muy poca memoria y el buffer overflow sigue</li>
              <li>Solución: verificar overflow antes de la operación o usar <code>__builtin_mul_overflow</code></li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="Format String Attack"
            icon={AlertTriangle}
            color="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:border-orange-800"
          >
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              <li><code>printf(user_input)</code> interpreta user_input como formato</li>
              <li>Input <code>"%x %x %x"</code> lee valores del stack</li>
              <li><code>%n</code> <strong>escribe</strong> en memoria — lectura/escritura arbitraria</li>
              <li>Solución trivial: <code>printf("%s", user_input)</code></li>
            </ul>
          </ConceptCard>
        </div>

        <ExampleBlock title="Buffer Overflow: anatomía del ataque en el stack">
          <p>
            Función vulnerable: <code>void f() {"{"} char buf[8]; gets(buf); {"}"}</code>
          </p>
          <div className="font-mono text-xs mt-3 bg-card border border-border rounded p-3 space-y-1">
            <p className="text-muted">--- Stack frame de f() (crece hacia abajo) ---</p>
            <p>[ return address  ] ← atacante sobrescribe esto</p>
            <p>[ saved EBP       ]</p>
            <p>[ buf[4..7]       ]</p>
            <p>[ buf[0..3]       ] ← inicio del buffer legítimo</p>
          </div>
          <p className="mt-3">
            Con input de 20 bytes, los últimos 4 sobrescriben el{" "}
            <strong>return address</strong>. Al hacer <code>ret</code>, la CPU
            salta a la dirección controlada por el atacante. Con{" "}
            <strong>ASLR activo</strong>, el atacante no sabe a qué dirección
            apuntar — la dirección de la pila es aleatoria. Con{" "}
            <strong>Stack Canary</strong>, un valor secreto entre el buffer y
            el return address es verificado antes del ret — si fue sobreescrito,
            el programa termina en vez de ejecutar código malicioso.
          </p>
        </ExampleBlock>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 5: Malware */}
      {/* ============================================ */}
      <SectionBlock id="malware" title="Malware">
        <p className="text-muted leading-relaxed">
          El malware (software malicioso) es cualquier programa diseñado para
          dañar, robar información, o comprometer sistemas sin el consentimiento
          del usuario. Conocer los tipos ayuda a diseñar defensas efectivas.
        </p>

        <ComparisonTable
          headers={["Tipo", "Propagación", "Objetivo", "Ejemplo real", "Defensa clave"]}
          rows={[
            ["Virus", "Se inserta en archivos ejecutables; el usuario lo activa", "Dañar datos, proliferar", "ILOVEYOU (2000), Melissa", "Antivirus, no ejecutar adjuntos desconocidos"],
            ["Gusano", "Autónoma por red, explota vulnerabilidades", "Propagación masiva, payload", "Morris Worm (1988), WannaCry (2017)", "Parches de seguridad, firewall"],
            ["Troyano", "Disfrazado de software legítimo", "Acceso remoto, robo de datos", "Zeus (banking), njRAT", "Descargar solo de fuentes confiables"],
            ["Ransomware", "Gusano o adjunto malicioso", "Cifrar archivos y pedir rescate", "WannaCry, LockBit, Petya", "Backups offline, parches, MFA"],
            ["Rootkit", "Post-explotación, modifica el kernel", "Persistencia y ocultamiento", "Necurs, TDL4", "Secure Boot, integridad del kernel"],
            ["Spyware/Keylogger", "Bundle con software gratuito", "Robar contraseñas, datos personales", "FinFisher, DarkComet", "Antimalware, MFA"],
            ["Botnet", "Gusano o troyano", "DDoS, spam, criptomonedas", "Mirai (IoT), Emotet", "Parches, monitoreo de red"],
          ]}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <ConceptCard
            title="Ransomware: el ciclo del ataque"
            icon={ShieldAlert}
            color="bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800"
          >
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Entrada: phishing, RDP expuesto, vulnerabilidad sin parche</li>
              <li>Escalada de privilegios: obtener acceso de administrador</li>
              <li>Movimiento lateral: comprometer más máquinas en la red</li>
              <li>Exfiltración de datos (para doble extorsión)</li>
              <li>Cifrado de archivos con AES + RSA (clave privada en C&amp;C)</li>
              <li>Nota de rescate en Bitcoin/Monero</li>
            </ol>
          </ConceptCard>

          <ConceptCard
            title="Rootkits: persistencia en el kernel"
            icon={AlertTriangle}
            color="bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-800"
          >
            <p>
              Un rootkit <strong>modifica el propio SO</strong> para ocultarse.
              Puede: ocultar procesos de <code>ps</code>, ocultar archivos de
              <code>ls</code>, interceptar syscalls, modificar la tabla de
              interrupciones. Los rootkits de nivel kernel son extremadamente
              difíciles de detectar desde el SO comprometido.
            </p>
            <p className="mt-2 text-sm italic">
              Detección: arrancar desde un medio externo y analizar el disco,
              comparar hashes del kernel con valores conocidos buenos.
            </p>
          </ConceptCard>
        </div>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 6: Firewalls y Defensa */}
      {/* ============================================ */}
      <SectionBlock id="defensa" title="Firewalls y Defensa">
        <p className="text-muted leading-relaxed">
          La defensa de un sistema no es un producto único sino una{" "}
          <strong>estrategia en capas</strong>. Cada mecanismo tiene un alcance
          y un punto ciego; juntos crean una postura de seguridad robusta.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <ConceptCard
            title="Packet Filter (Stateless)"
            icon={Shield}
            color="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
          >
            <p>
              Acepta/rechaza paquetes por IP de origen/destino, puerto y
              protocolo. No recuerda conexiones. Rápido y simple. Ejemplo:
              bloquear todo excepto TCP puerto 443 y 22.
            </p>
            <p className="mt-2 text-sm italic">Linux: iptables/nftables</p>
          </ConceptCard>

          <ConceptCard
            title="Stateful Firewall"
            icon={Shield}
            color="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
          >
            <p>
              Mantiene una tabla de <strong>conexiones TCP activas</strong>.
              Permite automáticamente respuestas a conexiones iniciadas
              internamente. Bloquea paquetes TCP con SYN sin una conexión
              establecida. El firewall más común hoy.
            </p>
          </ConceptCard>

          <ConceptCard
            title="Application Firewall (DPI)"
            icon={Eye}
            color="bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800"
          >
            <p>
              Inspecciona el <strong>contenido</strong> del tráfico, no solo
              cabeceras. Puede detectar SQL injection en HTTP, bloquear
              exfiltración de datos, o inspeccionar TLS (MITM con CA corporativa).
              Más costoso computacionalmente.
            </p>
          </ConceptCard>
        </div>

        <ComparisonTable
          headers={["Mecanismo", "Qué detecta/previene", "Dónde vive", "Ejemplo"]}
          rows={[
            ["Firewall stateful", "Conexiones no autorizadas", "Perímetro de red", "iptables, pf, Windows Firewall"],
            ["IDS (detección)", "Tráfico sospechoso, firmas de ataques", "Red o host", "Snort, Suricata, OSSEC"],
            ["IPS (prevención)", "Bloquea ataques detectados automáticamente", "Red", "Suricata en modo inline"],
            ["SELinux / AppArmor", "Acceso no autorizado del proceso a recursos", "SO (MAC)", "Políticas por proceso/etiqueta"],
            ["ASLR + NX/DEP", "Explotación de buffer overflows", "SO (hardware)", "Kernel Linux, Windows DEP"],
            ["Secure Boot", "Bootloader/kernel malicioso", "Firmware (UEFI)", "TPM 2.0 + UEFI Secure Boot"],
            ["Actualizaciones", "Vulnerabilidades conocidas con parche", "Todo el stack", "apt upgrade, Windows Update"],
          ]}
        />

        <InfoCallout variant="info" title="Zero Trust Architecture">
          <p>
            El modelo tradicional asume que lo que está <em>dentro</em> de la
            red corporativa es confiable. Zero Trust invierte esto:{" "}
            <strong>&quot;nunca confiar, siempre verificar&quot;</strong>.
            Cada acceso a cada recurso requiere autenticación y autorización
            explícita, independientemente de si el cliente está en la red
            interna o en Internet. Popularizado tras el ataque a Google (Aurora,
            2010) que llevó al desarrollo de BeyondCorp.
          </p>
        </InfoCallout>

        <ExampleBlock title="Checklist de hardening para un servidor Linux">
          <ol className="list-decimal list-inside space-y-1.5">
            <li>Desactivar todos los servicios no necesarios (<code>systemctl disable</code>)</li>
            <li>Firewall: solo abrir puertos 22 (SSH) y 443 (HTTPS) desde IPs autorizadas</li>
            <li>SSH: deshabilitar login con contraseña, usar solo claves ED25519. Deshabilitar root login</li>
            <li>Actualizar el sistema semanalmente. Activar <code>unattended-upgrades</code> para parches de seguridad</li>
            <li>Activar SELinux o AppArmor en modo enforcing</li>
            <li>Correr cada servicio con usuario propio, sin privilegios de root</li>
            <li>Monitorear logs con <code>fail2ban</code> para bloquear ataques de fuerza bruta</li>
            <li>Backups cifrados en ubicación separada (regla 3-2-1)</li>
            <li>Auditar con <code>lynis</code> para detectar configuraciones inseguras</li>
          </ol>
        </ExampleBlock>
      </SectionBlock>

      {/* ============================================ */}
      {/* SECCIÓN 7: Quiz */}
      {/* ============================================ */}
      <SectionBlock id="quiz" title="Quiz del Capítulo 6">
        <p className="text-muted leading-relaxed mb-4">
          Evaluá tu comprensión de seguridad en sistemas operativos: CIA,
          criptografía, control de acceso, vulnerabilidades y defensas.
        </p>
        <QuizContainer questions={quizSoCh6} chapterTitle={chapter.title} />
      </SectionBlock>
    </ChapterLayout>
  );
}

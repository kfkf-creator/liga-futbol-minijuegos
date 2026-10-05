# Plan y decisiones

Ultima actualizacion: 2026-09-30.

## Vision

Web instalable (PWA) con minijuegos diarios de futbol en castellano, con ligas privadas y ranking global. Cada juego devuelve una nota de 0 a 100. El contenido del dia se elige por fecha. Todo tiene identificadores estables.

## Decisiones tomadas

| Tema | Decision |
| --- | --- |
| Estructura | Un solo sitio con menu y datos compartidos, alojado en GitHub Pages (repositorio publico) |
| Juegos de rellenar | Escritura libre con sugerencias tolerantes a errores. Las sugerencias salen de toda la base de nombres, nunca solo de las respuestas del nivel |
| Juegos de elegir | Mantienen sus opciones (Quiz de momentos clave, El intruso, Verdadero o falso, Conexiones) |
| Trampas | Temporizador como bonus solo en modo diario, y confianza entre jugadores. El Top 10 no tiene tiempo |
| Web o app | Web instalable (PWA) primero |
| Coincidir en el futuro Puente | Aparcado: necesita un grafo completo de relaciones |
| Datos por reto | Trayectoria, Rejilla y Wordle guardan solo los datos de cada reto, revisados a mano |
| Wordle | Solo jugadores actuales |
| Contenido diario | Tandas revisadas por Marc, con memoria de temas y preguntas para no repetir |
| Boton de rendirse | Pide confirmacion, muestra todas las respuestas y cuenta como nivel fallido (no guarda estrellas); se puede repetir |
| Base de nombres | Amplia: cinco grandes ligas, otras ligas europeas, selecciones, equipos, entrenadores y estadios |

## Orden de trabajo

1. Top 10 perfecto (CERRADO 2026-09-30): boton de rendirse (HECHO), base de nombres amplia con sugerencias al escribir (HECHO: Reep v0 CC0 + capa propia en src/entities, ~110.000 nombres), revision de dificultad de los 100 niveles (HECHO: 25 por tramo, ordenados por tramo; el progreso se migra de v2 a v3).
   Mejoras futuras del Top 10: regenerar la base desde Reep v1 (alias y relaciones) con Claude Code en el ordenador de Marc; ampliar `src/entities/alias_manual.py` con nombres populares de estadios; anadir jugadores recientes a PATCH.
2. Base comun y minijuegos de datos cerrados: Verdadero o falso, Linea del tiempo (arrastrar), Reconstruye la tabla (arrastrar), Quiz de momentos clave, Marcador exacto, El intruso (con modo inverso), Bingo con preguntas variadas, Conexiones, Mas o menos.
3. Minijuegos con escritura libre: Trayectoria (con variante de traspasos solo con cantidades), Rejilla de clubes, Wordle de actuales, Once oculto, Camino a la final (partidos que salen uno a uno, escritura libre, 10 puntos menos 1 por partido destapado mas 3 por el ano).
4. Modo diario en beta cerrada, sin servidor.
5. Ligas privadas con servidor ligero.
6. Ranking global con validacion en servidor.

## Aparcado o descartado

- Aparcado: Puente, Camiseta misteriosa (rediseno de dificultad), Duelo para dos, automatizacion diaria de contenido.
- Descartado: Fantasy de carreras, Ficha misteriosa, Mapa de estadios, Once ideal por ano.

## Decisiones abiertas

- Minijuegos por dia (1 a 3) y peso del bonus de tiempo.
- Que pasa con un dia no jugado.
- Cuentas con correo o alias y codigo de liga.
- Nombre del producto (evitar marcas de competiciones).
- Cuando retomar la automatizacion de contenido.

## Filtro de epocas (HECHO 2026-09-30)
- Casillas que se suman: Mediados s. XX (hasta 1979), Finales s. XX (1980-1999), Primera decada s. XXI (2000-2009), Segunda decada s. XXI (2010-2019), Actualidad (2020 en adelante). Sin nada marcado = todos.
- Regla: un nivel se ve si todo su rango de anos queda cubierto por las epocas marcadas. Rangos en `src/top10/data/years.js` (clave = titulo del nivel); obligatorio para cada nivel nuevo (build.js falla si falta).
- Reparto con la regla estricta: 3 / 3 / 5 / 15 / 29 niveles por epoca y 45 que abarcan varias. Pendiente: crear niveles de las epocas flojas (sobre todo mediados y finales s. XX, primera decada s. XXI).

## Tanda 2: +30 niveles de epocas flojas (HECHO 2026-09-30)
- Ficheros `src/top10/data/b5a.js` (mediados s. XX), `b5b.js` (finales s. XX), `b5c.js` (2000-2009). Total 130 niveles. Cada nivel trae `yrs` (rango de anos); `years.js` solo cubre los 100 primeros.
- Datos verificados en fuentes web por agentes; revision propia de las 30 respuestas de cada alineacion contra memoria: sin discrepancias.
- Progreso guardado por clave estable (`key` = titulo del nivel en minusculas sin tildes): NO cambiar titulos de niveles ya publicados o se pierde su progreso. Se migra de v3 (numeros) a v4 (claves).
- Reparto de epocas (una sola marcada): mediados 13, finales 13, 2000s 15, 2010s 15, actualidad 29.

## Mejoras de uso (HECHO 2026-09-30)
- Reportar un problema: boton en cada nivel; prepara un texto (nivel, tipo de problema, lo que se escribio y como lo juzgo el juego) y lo comparte con el menu de compartir del movil o lo copia. Canal C (formulario de Google) pendiente para cuando se abra a mas gente.
- Copia de seguridad por codigo de texto (`T1.<niveles>.<racha>.<control>`): guarda estrellas y racha, se recupera sumando y quedandose con lo mejor. Los ids de nivel son un hash de 5 caracteres de `key` (build.js comprueba que no haya repetidos).
- Estadisticas en el menu: niveles superados, estrellas, perfectos, racha actual y mejor racha (dias seguidos con algun nivel superado).
- Pendientes de la lista: PWA instalable (mejora 2), pistas opcionales, medir dificultad real con datos (necesita servidor).

## Pistas y video con recompensa (pistas HECHAS 2026-09-30, video PENDIENTE)
- Pista: boton en cada nivel, cuesta 1 vida, descubre la primera letra de una respuesta (la primera sin acertar ni pista), nunca con la ultima vida. Las estrellas salen de los errores, asi que una pista cuenta como un fallo (una pista y nada mas sigue dando 3 estrellas).
- Punto de enganche para video: `canPayHint`/`payHint` en template.html. Cuando haya video con recompensa: ofrecer "ver video" en lugar de gastar vida, y anadir vida extra (maximo 1 por nivel, solo sin vidas, estrellas por errores reales).
- Requisitos a confirmar antes: programa H5 Games Ads de Google (requisitos sin confirmar), probable dominio propio (~10 EUR/ano), alta de autonomo si se cobra en Espana (consultar gestor). Ingreso orientativo: ~30 EUR/mes por cada 1.000 jugadores diarios (4 USD CPM, 25% ve 1 video). No integrar hasta tener audiencia.

## App instalable / PWA (HECHO 2026-09-30)
- Logo de Marc en `src/top10/pwa/logo-original.png`; `pwa/make-icons.py` genera los iconos (192, 512, maskable, apple-touch, favicon) en `top10/`.
- `pwa/manifest.webmanifest` y `pwa/sw.template.js` (build.js genera `top10/sw.js` con version = hash del juego). Pagina y juego: red primero con 4 s de limite y cache si no hay conexion; `entidades/*.json`: cache primero y refresco por detras. Funciona sin conexion tras la primera carga.
- Menu: barra "Instalar" (Android/Chrome, via beforeinstallprompt) y explicacion del gesto en iPhone; aviso "Hay una version nueva, Recargar" cuando el service worker cambia.
- Pendiente de comprobar en moviles reales: instalacion en Android y en iPhone.

## App de minijuegos, fase 1 (HECHO 2026-09-30, publicada en /app/)
- `src/app/` (template.html + build.js) genera `app/index.html`: menu con pestanas Hoy / Juegos / Ligas / Perfil, diseno nuevo (azul noche), Top 10 enlazado en `../top10/` (comparten origen, sin tocar su progreso).
- Juegos: Mas o menos (16 conjuntos en `data/mm1.js`, `mm2.js`; fuentes por item; duelo diario de 10, nota 0-100; modo racha) y Once oculto (46 alineaciones tomadas de los niveles del Top 10 + `data/formaciones.json`; 5 vidas; nota = aciertos x10).
- Diario: contenido elegido por fecha (semilla), primer resultado del dia cuenta, racha de dias, texto para compartir.
- Ligas: interfaz `Backend` con `LocalBackend` (modo prueba) y `SupabaseBackend` (REST + RPC). `supabase/schema.sql` crea tablas con RLS sin politicas y funciones security definer. Se activa rellenando `src/app/config.js` (`supabaseUrl`, `supabaseKey`, clave anon publica) y activando el inicio de sesion anonimo. Sin probar contra un servidor real (solo contra un simulado: `tests/sb-mock-test.js`).
- Limite conocido: las notas las envia el cliente, asi que un jugador puede falsearlas. Validacion en servidor queda para el ranking global.
- Pendiente: PWA de la app, sus propios iconos, Trayectoria, Cuadricula, Wordle.

## Tanda 3: +32 niveles (HECHO 2026-09-30, publicada)
32 niveles nuevos (b6a-b6d): mediados s. XX, finales s. XX, 2000-2009 y 2010-2019. Total 162. build/check/tests OK. Publicada en main.

## App de minijuegos: PWA y menu (HECHO 2026-09-30)
- `src/app/pwa/`: manifest, service worker (version = hash de la pagina, red primero con 4 s, cache de `entidades/`), iconos PROVISIONALES generados por `make-icons.py` (balon dorado sobre azul noche; sustituir cuando haya logo propio). Barra de instalar en la pestana Hoy y aviso de nueva version.
- Menu raiz (`index.html`) enlaza `app/`; el Top 10 dice 162 niveles.
- Tests en `src/app/tests/`: app-test (modo local), pwa-test, sb-mock-test (servidor simulado). Para usarlos: servidor http en la raiz del repo, `URL=http://localhost:8123/app/index.html`.
- Ligas: probado contra Supabase real por Marc y un amigo (2026-10-05): crear liga, unirse con codigo y clasificacion funcionan.

## Dos apps: minijuegos y Top 10 suelto (HECHO 2026-09-30)
- Decision de Marc: app de minijuegos (con el Top 10 como uno de sus juegos) y Top 10 instalable aparte. En iOS cada app instalada tiene su propio almacen: los progresos NO se comparten entre ambas (solo con el codigo de copia de seguridad del Top 10).
- El manifest de minijuegos tiene `scope: "../"`, asi `/top10/?from=app` se abre dentro de la app (hay que reinstalarla para que iOS lea el scope nuevo). El Top 10 muestra "‹ Minijuegos" si se llega con `?from=app` (flag en sessionStorage). Tarjeta y Perfil de minijuegos leen `top10futbol.v4` del almacen de esa app.

## Sin practica libre + archivo de retos (HECHO 2026-09-30)
- Decision de Marc: quitar la practica libre (incluida la racha de Mas o menos) porque gasta contenido. Los retos diarios se guardan y se pueden repetir desde la pestana Juegos > Archivo de retos (desde el dia siguiente al lanzamiento, `LAUNCH` en template.html; maximo 30 dias visibles).
- Lo jugado el mismo dia esta en `S.days` (cuenta para racha y ligas); lo jugado despues va a `S.arch` (no cuenta). `scoreOf` da prioridad a `S.days`.
- Idea futura de Marc: si el juego engancha, ofrecer una tercera app "estilo Top 10" con niveles exclusivos. Ojo: cada app instalada tiene su propio almacen de datos (no comparten progreso).
- Reintento cerrado (HECHO): la partida en curso se guarda tras cada jugada (`S.prog`, clave `dia|juego`); cerrar y reabrir continua donde estabas. Test: `tests/resume-test.js`.

## Cuenta atras y bonus de velocidad (HECHO 2026-09-30)
- Decision de Marc: cuenta atras en los dos juegos del dia, el tiempo restante se convierte en puntos, pero se puede sumar yendo lento si se acierta. Al llegar a 0 el reto termina y cuenta lo respondido.
- Formula (reto del dia): nota = aciertos x 9 + round(10 x (aciertos/10) x restante/total). Total: Mas o menos 120 s, Once oculto 480 s (`T_MM`, `T_ONCE`). Un reto perfecto y lento da 90. Archivo: sin reloj, aciertos x 10.
- El reloj usa la hora real desde el primer inicio (`t0` guardado en `S.prog`): cerrar a medias no lo detiene. Al reabrir con el tiempo agotado se cierra el reto con lo respondido.
- Las notas del reto del dia de antes de este cambio usaban aciertos x 10 sin bonus. Test: `tests/timer-test.js`.

## Seis juegos mas (HECHO 2026-09-30, contenido de prueba)
- Nuevos: Trayectoria (`tray`, 12 jugadores), Jugador misterioso (`mist`, 60 jugadores activos, 6 intentos, notas 100/85/70/55/40/25), Linea del tiempo (`line`, 12 retos de 6 hechos), Verdadero o falso (`vf`, 40), El intruso (`odd`, 30), Conexiones (`con`, 12). Datos en `src/app/data/`, logica en `src/app/games.js` (se inserta en template.html al compilar).
- Nota: aciertos x 9 + bonus de velocidad hasta 10 en vf, odd, line y con (cuenta atras 90/150/150/300 s); tray y mist se puntuan por intentos y pistas (sin reloj).
- Liga: `supabase/patch-02-mas-juegos.sql` (permite los ids nuevos y devuelve las notas por juego). Hasta ejecutarlo, las notas de los juegos nuevos quedan pendientes en el movil y se reintentan.
- Pendiente de verificar en fuentes: Cannavaro (inicio Napoli 1991/92/93), Iniesta (Barcelona B), Torres y Laudrup en Trayectoria; clubes de 2026 en Jugador misterioso (Joan Garcia, Kimmich puesto); "Espana campeona 2026" en Linea del tiempo.
- Cuadricula no se ha hecho: exige listar todos los jugadores validos de cada casilla.

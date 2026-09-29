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

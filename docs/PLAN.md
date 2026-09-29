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

## Orden de trabajo

1. Top 10 perfecto: boton de rendirse, base de nombres amplia con sugerencias al escribir, revision de dificultad de los 100 niveles.
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

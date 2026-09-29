# Liga de minijuegos de futbol

Juegos de futbol en castellano. Por ahora hay uno publicado:

- **Top 10 Futbol** (`top10/`): 100 niveles al estilo Tenable, con 5 vidas y sin tiempo.

## Estructura

| Ruta | Contenido |
| --- | --- |
| `index.html` | Menu de juegos |
| `top10/index.html` | Juego construido (generado, no se edita a mano) |
| `src/top10/` | Codigo fuente: `template.html`, datos por lotes en `data/`, `build.js` y validador `check.js` |
| `docs/PLAN.md` | Plan, decisiones tomadas e ideas aparcadas |

## Reconstruir el Top 10

```
cd src/top10
node build.js   # genera ../../top10/index.html
node check.js   # valida los 100 niveles
```

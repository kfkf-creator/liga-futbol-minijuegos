# Anuncios recompensados: estado y siguientes pasos

## Estado en el codigo
- `Rewards.request(etiqueta)` en `src/app/template.html` es la unica puerta. Hoy muestra un anuncio SIMULADO de 5 s (`ADS.secs`).
- Hay un proveedor real preparado pero desactivado: Google Publisher Tag con formato rewarded (`showGpt`). Se activa poniendo `ADS.provider="gpt"` y `ADS.gptUnit="/CODIGO_RED/unidad"`. No esta probado contra Ad Manager real.
- Si el anuncio no carga en 9 s o falla, se concede la recompensa para no bloquear al jugador.
- Tope de 6 videos al dia (`ADS.cap`).

## Que dice la investigacion (octubre 2026, a verificar antes de decidir)
- Un articulo especializado indica que AdSense no admite anuncios recompensados en webs; los recompensados de Google viven en AdMob (apps) y en Google Ad Manager (web, formato `OutOfPageFormat.REWARDED` de Google Publisher Tag). Hay que confirmarlo en la ayuda oficial de Google antes de decidir.
- Redes especializadas en web (por ejemplo AppLixir) piden un minimo de usuarios diarios: AppLixir cita 5.000 DAU. Su propia cifra de CPM es de unos 4 dolares de media, sin dato especifico de Espana, y la dan como estimacion propia.
- En la UE hace falta un banner de consentimiento (CMP, TCF) para anuncios personalizados.
- Aplicando la formula `ingresos/dia = DAU x videos por usuario x CPM / 1000` con CPM 4: 1.000 DAU con 1 video cada uno serian unos 4 euros al dia; 100 DAU, unos 0,40.

## Opciones
| Opcion | Pros | Contras |
|---|---|---|
| Google Ad Manager (GPT rewarded) | Mismo ecosistema de Google, control total | Requiere cuenta de Ad Manager aprobada, configuracion mas compleja y CMP |
| Red especializada en web (AppLixir u otras) | Integracion sencilla con SDK | Minimo de usuarios, CPM propio de cada red |
| App nativa con AdMob | Mejor rentabilidad del recompensado | Tiendas, mucho mas trabajo |
| Sin anuncios: suscripcion o cosmeticos | Estable, sin consentimiento publicitario | Hay que convencer de pagar |

## Antes de conectar un anuncio real
1. Tener usuarios reales y medir cuantos pulsan los botones de video con el anuncio simulado (anadir contador en servidor si interesa).
2. Dominio propio y politica de privacidad.
3. CMP de consentimiento (TCF) para la UE.
4. Elegir red y completar su alta.
Fuentes consultadas: simonkrain.com (guia de rewarded en AdSense y Ad Manager), applixir.com (CPM y requisitos), developers.google.com/publisher-tag (formato rewarded).

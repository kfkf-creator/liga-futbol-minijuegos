# Política de cookies y almacenamiento local de Falso Nueve

BORRADOR para revisar con un profesional antes de publicar. No es asesoramiento jurídico.

## Estado actual (sin publicidad)
La app no instala cookies de seguimiento. Usa el almacenamiento local del navegador (localStorage) y el caché de la aplicación web (service worker). Son elementos técnicos necesarios para que funcione, para guardar tu progreso y para que cargue sin conexión. No requieren consentimiento según la normativa de cookies y almacenamiento (art. 22.2 LSSI), porque son estrictamente necesarios para el servicio que pides.

| Elemento | Qué guarda | Duración |
|---|---|---|
| localStorage de la app | Resultados, racha, medallas, alias, icono, ajustes y datos de ligas | Hasta que borres los datos del navegador |
| Caché de la app (service worker) | Archivos de la app y de los nombres de jugadores, para uso sin conexión | Se actualiza con cada versión |
| Sesión anónima de ligas (almacenada en localStorage) | Identificador de usuario y credenciales de sesión | Hasta que cierres sesión o borres datos |

## Cuando se active la publicidad
Los anuncios de terceros sí usan cookies o identificadores, que requieren consentimiento previo, informado y revocable. Antes de activarlos hay que:
1. Integrar una plataforma de gestión del consentimiento (CMP) certificada, por ejemplo la que ofrece el propio proveedor del anuncio.
2. Bloquear cualquier carga publicitaria hasta que haya consentimiento.
3. Mostrar un botón "Gestionar cookies" siempre accesible.
4. Actualizar este documento con la lista de cookies de cada proveedor, su finalidad y su duración.
5. Revisar la política de privacidad (sección de publicidad y destinatarios).

[PENDIENTE: elegir CMP y proveedor publicitario. Hasta entonces, no activar anuncios reales.]

## Cómo borrar los datos
- Desde Perfil puedes exportar tu copia de seguridad con un código antes de borrar nada.
- Para borrar los datos locales, usa los ajustes de tu navegador (borrar datos del sitio) o desinstala la app.

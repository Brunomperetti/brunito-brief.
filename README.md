# brunito. / Brief estratégico de Meta Ads y Google Ads

Sitio web estático responsive listo para **GitHub Pages**. No requiere Streamlit, React, Render, servidor ni instalación de dependencias.

## ¿Qué incluye?

- Identidad visual brunito: blanco, negro, rojo, tipografía editorial, diseño adaptable a celular.
- Brief por **6 secciones** con revisión final.
- Preguntas estratégicas de **negocio, oferta, rentabilidad, público objetivo, geografía, objetivos, presupuesto, operaciones, medición y creatividades**.
- Preguntas específicas de **Meta Ads** y **Google Ads**, visibles solo cuando se seleccionan esas plataformas.
- Pregunta específica de **Google Merchant Center** solo para Google Ads con tienda online / negocio mixto.
- Secciones y campos opcionales para evitar cansar al cliente. Nunca pide contraseñas.
- Validación de campos obligatorios, progreso, guardado automático del borrador en `localStorage` del dispositivo.
- Revisión final y exportación a TXT / JSON; impresión o Guardar como PDF desde el navegador.
- Envío online mediante **Google Apps Script**: guarda cada brief en Sheets y envía una notificación a `brunitomkt@gmail.com`.

## Publicar gratis con GitHub Pages

1. Crear un repositorio de GitHub, por ejemplo: `brunito-brief`.
2. Subir **los archivos de esta carpeta a la raíz** del repositorio (no la carpeta contenedora).
3. Ir a **Settings → Pages → Build and deployment**.
4. Seleccionar **Deploy from a branch**, rama `main`, carpeta `/ (root)`; guardar.
5. La URL será similar a `https://TU-USUARIO.github.io/brunito-brief/`.

El repositorio debe ser **público** para usar GitHub Pages en una cuenta gratuita estándar. No subas datos reales de clientes ni claves privadas al repositorio.

## Recepción automática: Google Sheets y correo

La web de GitHub Pages envía el brief mediante un **POST HTML estándar** a Google Apps Script, sin depender de CORS de `fetch()`. Una aplicación web de Apps Script asociada a una hoja de cálculo recibe los datos, los registra y avisa por email. La pantalla final de confirmación la muestra Apps Script, **no el frontend**.

- Planilla: **BRUNITO | Briefs de campañas**, pestaña **Briefs recibidos**.
- Correo de aviso: **brunitomkt@gmail.com**.
- `app.js` contiene la URL pública de la implementación de Apps Script (`FORM_ENDPOINT`).
- El frontend manda un campo `payload` con JSON: `source`, `submission_id`, `consent`, datos del cliente, `report`, `answers` y `website` (campo trampa vacío).
- El script registra la fila antes de intentar el correo, y marca el aviso como `ENVIADO` o `PENDIENTE`.
- Los identificadores de envío reducen el riesgo de duplicados por reintento.

**Para comprobar la conexión:** completar el formulario público con datos de prueba, aceptar el consentimiento y presionar **Enviar brief**. Esperar el mensaje de confirmación de Google Apps Script. Verificar una fila nueva en **Briefs recibidos** y un email en la bandeja de destino (revisar Spam si hace falta). Solo después compartirlo con clientes.

**Si modificás `Código.gs`:** guardá y actualizá la implementación existente desde **Implementar → Administrar implementaciones → Editar → Nueva versión**; editar el código por sí solo no actualiza la versión pública.

### Seguridad

No solicitar ni compartir contraseñas o secretos. El endpoint público admite solicitudes anónimas, por lo que puede recibir intentos de spam; para volumen de producción conviene agregar rate limiting, verificación antispam y políticas de retención. Google Sheets y Gmail operan bajo la autorización de la cuenta que implementó el script. La confirmación del envío no implica que las campañas ya estén configuradas.

## Probar localmente

Abrí `index.html` en un navegador moderno. Para pruebas más fieles al sitio publicado, ejecutá un servidor estático desde esta carpeta:

```bash
python -m http.server 8000
```

Luego abrí `http://localhost:8000/`.

## Configuración y mantenimiento

- `index.html`: estructura base / SEO.
- `styles.css`: diseño, mobile y estilos de impresión.
- `app.js`: preguntas, lógica, validaciones, exportación y envío.
- `favicon.svg`: ícono brunito.
- `.nojekyll`: desactiva el procesamiento innecesario de Jekyll.

Las preguntas están agrupadas en el array `steps` dentro de `app.js`, con opciones `required`, `wide` y `when` para las condiciones de visibilidad. Si modificás etiquetas, hacé pruebas antes de compartir el enlace.

### Confidencialidad y seguridad

El borrador se guarda **en el navegador/dispositivo** mediante localStorage y se conserva para recuperarlo si el envío falla; no funciona como almacenamiento central ni copia de seguridad. Evitá completar datos confidenciales en dispositivos compartidos. Si un cliente desea borrar su borrador, puede borrar los datos locales del sitio en el navegador. El envio usa HTTPS únicamente si se configura un endpoint HTTPS. Los accesos Meta / Google se conceden mediante permisos, **sin compartir contraseñas**.

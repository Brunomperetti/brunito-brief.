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
- Envío online opcional mediante un servicio de formularios externo (por ejemplo Formspree).

## Publicar gratis con GitHub Pages

1. Crear un repositorio de GitHub, por ejemplo: `brunito-brief`.
2. Subir **los archivos de esta carpeta a la raíz** del repositorio (no la carpeta contenedora).
3. Ir a **Settings → Pages → Build and deployment**.
4. Seleccionar **Deploy from a branch**, rama `main`, carpeta `/ (root)`; guardar.
5. La URL será similar a `https://TU-USUARIO.github.io/brunito-brief/`.

El repositorio debe ser **público** para usar GitHub Pages en una cuenta gratuita estándar. No subas datos reales de clientes ni claves privadas al repositorio.

## Activar recepción automática de respuestas

**Importante:** GitHub Pages sirve el formulario, pero por sí solo no guarda ni entrega las respuestas.

Para recibir briefs en tu correo, creá un formulario en un proveedor como Formspree y obtené el endpoint (ejemplo: `https://formspree.io/f/abcdefgh`). Luego abrí `app.js` y reemplazá:

```js
const FORM_ENDPOINT = '';
```

por:

```js
const FORM_ENDPOINT = 'https://formspree.io/f/TU_IDENTIFICADOR';
```

Subí ese cambio al repositorio y probá un envío completo. El endpoint es una URL pública de recepción; **nunca coloques claves secretas** en archivos visibles del sitio. Revisá los límites, términos y política de privacidad del proveedor elegido.

Mientras `FORM_ENDPOINT` esté vacío, la web deja explícito que **NO envía los datos** y permite compartir respuestas por archivo TXT, PDF o JSON. No se declara ningún envío exitoso en modo offline.

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

El borrador se guarda **solo en el navegador/dispositivo** mediante localStorage hasta su envío confirmado; no funciona como almacenamiento central ni copia de seguridad. Evitá completar datos confidenciales en dispositivos compartidos. Si un cliente desea borrar su borrador, puede borrar los datos locales del sitio en el navegador. El envio usa HTTPS únicamente si se configura un endpoint HTTPS. Los accesos Meta / Google se conceden mediante permisos, **sin compartir contraseñas**.

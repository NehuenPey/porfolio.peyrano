# Nehuén Peyrano — Portfolio

Portfolio personal para presentar mi perfil profesional, tecnologías, proyectos de software, formación y medios de contacto.

**Sitio web:** https://nehuenpeyranodev.vercel.app/

## Contenido

- Presentación profesional y áreas de trabajo.
- Stack tecnológico organizado por especialidad.
- Proyectos destacados y proyectos complementarios.
- Formación académica e idiomas.
- Contacto y descarga del currículum en español, inglés o portugués.

## Tecnologías

- HTML5
- CSS3
- JavaScript (Vanilla)
- JSON para los diccionarios de traducción
- Google Fonts

## Estructura

```text
.
├── Assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── main.js
│   │   └── i18n.js
│   ├── locales/
│   │   ├── es.json
│   │   ├── en.json
│   │   └── pt.json
│   ├── img/
│   └── pdf/
│       ├── PeyranoNehuen_CV_ES.pdf.pdf
│       ├── PeyranoNehuen_CV_EN.pdf.pdf
│       └── PeyranoNehuen_CV_PT.pdf.pdf
├── index.html
└── README.md
```

## Internacionalización

La web ofrece español, inglés y portugués. El módulo `Assets/js/i18n.js` carga los diccionarios JSON, actualiza el contenido y los metadatos, conserva la preferencia de idioma en `localStorage` y selecciona el CV correspondiente.

El idioma predeterminado es español. No se utilizan frameworks ni dependencias de internacionalización.

## Desarrollo local

No requiere instalación de dependencias. Como los diccionarios se cargan mediante `fetch()`, el sitio debe ejecutarse desde un servidor HTTP local; no alcanza con abrir `index.html` directamente mediante `file://`.

Por ejemplo, con Visual Studio Code se puede utilizar la extensión Live Server y abrir la dirección local que proporciona.

## Publicación

El sitio está publicado en Vercel. Si el repositorio está vinculado al proyecto, los cambios integrados en la rama configurada para producción pueden desplegarse automáticamente.

## Contacto

- **LinkedIn:** https://www.linkedin.com/in/nehuenpeyrano/
- **GitHub:** https://github.com/NehuenPey
- **Email:** nehuenpeyrano@gmail.com

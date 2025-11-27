# 📚 APA Fácil - Generador de Referencias APA 7ª Edición

![Nuxt](https://img.shields.io/badge/Nuxt-3.16.2-00DC82?style=flat&logo=nuxt.js&logoColor=white)
![Vue](https://img.shields.io/badge/Vue-3-4FC08D?style=flat&logo=vue.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-Source_Available-orange.svg)

Generador gratuito de referencias bibliográficas en formato APA 7ª edición. Herramienta web diseñada para estudiantes, investigadores y académicos que necesitan crear citas precisas y profesionales de manera rápida y sencilla.

🌐 **[https://apafacil.cl](https://apafacil.cl)**

---

## ✨ Características

- ✅ **18 tipos de fuentes diferentes** soportadas
- 📖 **Formato APA 7ª edición** actualizado
- 🎨 **Interfaz moderna y responsive**
- 🌓 **Modo oscuro/claro**
- 📋 **Copiar al portapapeles** con un clic
- 🚀 **Sin necesidad de registro**
- 💯 **100% gratuito**
- 🔍 **Optimizado para SEO**
- ♿ **Accesible** (ARIA labels)

---

## 📋 Tipos de Fuentes Soportadas

### 📚 Libros
- Libro completo
- Capítulo de libro editado

### 📰 Artículos
- Artículo científico (revista académica)
- Artículo de periódico o revista popular
- Entrada de blog

### 🎓 Académicos
- Tesis o disertación
- Conferencia o presentación
- Material educativo o diapositivas

### 🌐 Digitales
- Página web
- Redes sociales
- Foro o comentario
- Podcast
- Transmisión en vivo

### 📄 Documentos
- Reporte o documento oficial
- Ley, decreto o norma

### 🎬 Multimedia
- Película o video
- Software

### 👥 Otros
- Entrevista personal

---

## 🚀 Tecnologías Utilizadas

- **[Nuxt 3](https://nuxt.com/)** - Framework Vue.js para aplicaciones web
- **[Vue 3](https://vuejs.org/)** - Framework JavaScript progresivo
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Vite](https://vitejs.dev/)** - Build tool y dev server
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático

---

## 📦 Instalación

### Prerrequisitos

- Node.js 18.x o superior
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tuusuario/apafacil.git
cd apafacil
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Acceder a la aplicación**
```
http://localhost:3000
```

---

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Construye la aplicación para producción
npm run preview      # Previsualiza la build de producción

# Utilidades
npm run generate     # Genera sitio estático
npm run postinstall  # Prepara tipos de Nuxt
```

---

## 📁 Estructura del Proyecto

```
apafacil/
├── assets/
│   └── css/
│       └── main.css              # Estilos globales y Tailwind
├── components/
│   ├── GeneradorLibro.vue        # Generador para libros
│   ├── GeneradorRevista.vue      # Generador para artículos
│   ├── GeneradorWeb.vue          # Generador para páginas web
│   ├── GeneradorTesis.vue        # Generador para tesis
│   ├── GeneradorConferencia.vue  # Generador para conferencias
│   ├── GeneradorPelicula.vue     # Generador para películas
│   ├── GeneradorPodcast.vue      # Generador para podcasts
│   └── ...                       # Otros generadores
├── pages/
│   └── index.vue                 # Página principal
├── public/
│   ├── bookfavicon.ico          # Favicon
│   ├── robots.txt               # Configuración para crawlers
│   ├── sitemap.xml              # Mapa del sitio
│   └── _redirects               # Reglas de redirección (SPA)
├── nuxt.config.ts               # Configuración de Nuxt
├── tailwind.config.js           # Configuración de Tailwind
└── package.json                 # Dependencias del proyecto
```

---

## 🎨 Paleta de Colores

El proyecto utiliza una paleta de colores personalizada:

```css
--apa-dark: #111c22    /* Azul petróleo muy oscuro */
--apa-black: #06090b   /* Negro con matiz azul grisáceo */
--apa-teal: #1c696c    /* Verde azulado intenso (teal) */
```

---

## 🌐 Deployment

### Netlify / Render / Vercel

La aplicación está configurada como SPA (`ssr: false`) y incluye el archivo `_redirects` necesario para el correcto funcionamiento del enrutamiento.

1. **Build command**: `npm run build`
2. **Publish directory**: `.output/public`

### Variables de entorno

No se requieren variables de entorno para el funcionamiento básico de la aplicación.

---

## 📝 Uso de la Aplicación

1. **Selecciona el tipo de fuente** desde el menú desplegable
2. **Completa los campos requeridos** del formulario
3. **Haz clic en "Generar referencia"**
4. **Copia la referencia** generada con el botón "Copiar"
5. **Pega la referencia** en tu documento

---

## 🔍 SEO y Optimización

La aplicación incluye:

- ✅ Meta tags optimizados
- ✅ Open Graph tags para redes sociales
- ✅ Twitter Cards
- ✅ Schema.org JSON-LD
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ Atributos lang correctos

---

## ♿ Accesibilidad

- Etiquetas ARIA apropiadas
- Navegación por teclado
- Contraste de colores WCAG AA
- Textos alternativos para iconos
- Estructura semántica HTML5

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

**Copyright © 2025 Gianluca Bernasconi. Todos los derechos reservados.**

Este proyecto está bajo una **Licencia de Código Fuente Visible (Source Available License)**. 

### ✅ Puedes:

- ✅ **Ver y estudiar** el código fuente
- ✅ **Usar** la aplicación web en https://apafacil.cl
- ✅ **Aprender** de las técnicas implementadas
- ✅ **Reportar bugs** y sugerir mejoras
- ✅ **Hacer fork** para estudio personal

### ❌ No Puedes:

- ❌ **Copiar** el código para usar en otros proyectos
- ❌ **Uso comercial** sin autorización escrita
- ❌ **Redistribuir** el código o trabajos derivados
- ❌ **Plagiar** o hacer pasar el código como tuyo
- ❌ **Crear servicios competidores** basados en este código

### 💼 Uso Comercial

Para solicitudes de licencias comerciales o permisos especiales, contacta a: **contacto@apafacil.cl**

Ver el archivo `LICENSE` para los términos completos y condiciones de uso.


---

## 👨‍💻 Autor

**Gianluca Bernasconi**

- Website: [gianlucabernasconi.cl](https://www.gianlucabernasconi.cl)
- GitHub: [@gianlucabernasconi](https://github.com/gianlucabernasconi)
- Instagram: [@gianlucabernasconi_](https://www.instagram.com/gianlucabernasconi_/)

---

<div align="center">

**⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub ⭐**

Hecho con ❤️ por Gianluca Bernasconi

</div>

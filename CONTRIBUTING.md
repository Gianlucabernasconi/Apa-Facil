# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a APA Fácil! Este documento te guiará a través del proceso de contribución.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo puedo contribuir?](#cómo-puedo-contribuir)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Guía de Estilo](#guía-de-estilo)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Mejoras](#sugerir-mejoras)

## 📜 Código de Conducta

Este proyecto se adhiere a un código de conducta. Al participar, se espera que mantengas este código. Por favor reporta comportamientos inaceptables.

## 🚀 ¿Cómo puedo contribuir?

### Reportar Bugs

Los bugs se rastrean como issues de GitHub. Antes de crear un issue:

1. **Verifica** que el bug no haya sido reportado anteriormente
2. **Incluye** detalles específicos sobre tu configuración
3. **Describe** los pasos exactos para reproducir el problema
4. **Proporciona** ejemplos específicos

**Template para reportar bugs:**

```markdown
**Descripción del bug**
Una descripción clara y concisa del bug.

**Pasos para reproducir**
1. Ve a '...'
2. Haz clic en '...'
3. Desplázate hasta '...'
4. Observa el error

**Comportamiento esperado**
Descripción clara de lo que esperabas que sucediera.

**Screenshots**
Si aplica, agrega screenshots para ayudar a explicar el problema.

**Entorno:**
 - OS: [e.g. Windows 11, macOS 14]
 - Navegador: [e.g. Chrome 120, Firefox 121]
 - Versión: [e.g. 1.0.0]
```

### Sugerir Mejoras

Las sugerencias de mejora también se rastrean como issues de GitHub.

**Template para sugerencias:**

```markdown
**¿Tu sugerencia está relacionada con un problema?**
Una descripción clara del problema. Ej: Siempre me frustra cuando [...]

**Describe la solución que te gustaría**
Una descripción clara y concisa de lo que quieres que suceda.

**Describe alternativas que hayas considerado**
Una descripción clara de cualquier solución o característica alternativa.

**Contexto adicional**
Agrega cualquier otro contexto o screenshots sobre la sugerencia.
```

## 💻 Proceso de Desarrollo

### 1. Fork y Clone

```bash
# Fork el repositorio en GitHub
# Luego clona tu fork
git clone https://github.com/TU_USUARIO/apafacil.git
cd apafacil
```

### 2. Crear una Rama

```bash
# Crea una rama desde main
git checkout -b feature/nombre-de-tu-feature

# O para bugs
git checkout -b fix/nombre-del-bug
```

### 3. Configurar el Entorno

```bash
# Instala las dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev
```

### 4. Hacer Cambios

- Escribe código limpio y bien documentado
- Sigue las convenciones de estilo del proyecto
- Agrega comentarios cuando sea necesario
- Mantén los commits atómicos y descriptivos

### 5. Commit

Usa mensajes de commit descriptivos siguiendo [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Formato
<tipo>(<alcance>): <descripción>

# Ejemplos
feat(generador): agregar soporte para citas de YouTube
fix(ui): corregir alineación en modo oscuro
docs(readme): actualizar instrucciones de instalación
style(css): mejorar espaciado en formularios
refactor(components): simplificar lógica de GeneradorLibro
```

**Tipos de commit:**
- `feat`: Nueva característica
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (no afectan el código)
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Tareas de mantenimiento

### 6. Push y Pull Request

```bash
# Push a tu fork
git push origin feature/nombre-de-tu-feature
```

Luego crea un Pull Request en GitHub:

1. Ve a tu fork en GitHub
2. Haz clic en "Compare & pull request"
3. Completa la descripción del PR
4. Espera la revisión

## 🎨 Guía de Estilo

### Vue/JavaScript

- Usa **composición API** (setup script)
- Nombres de componentes en **PascalCase**
- Props y eventos en **camelCase**
- Constantes en **UPPER_SNAKE_CASE**
- Usa **const** por defecto, **let** solo cuando sea necesario
- Evita **var**

```vue
<script setup>
import { ref, computed } from 'vue'

const userName = ref('')
const isValid = computed(() => userName.value.length > 0)

function handleSubmit() {
  // ...
}
</script>
```

### CSS/Tailwind

- Usa **clases de utilidad de Tailwind** cuando sea posible
- Para estilos repetitivos, crea **clases de componente** en `main.css`
- Mantén las clases ordenadas: layout → espaciado → tipografía → colores → otros
- Usa las **variables de color personalizadas** (`apa-dark`, `apa-black`, `apa-teal`)

```vue
<template>
  <div class="flex items-center justify-between p-4 bg-apa-dark text-white rounded-lg">
    <!-- contenido -->
  </div>
</template>
```

### Estructura de Componentes

```vue
<script setup>
// 1. Imports
import { ref } from 'vue'

// 2. Props/Emits
const props = defineProps({
  title: String
})

// 3. Reactive state
const isOpen = ref(false)

// 4. Computed
const displayTitle = computed(() => props.title.toUpperCase())

// 5. Methods
function toggle() {
  isOpen.value = !isOpen.value
}

// 6. Lifecycle hooks
onMounted(() => {
  // ...
})
</script>

<template>
  <!-- Template -->
</template>

<style scoped>
/* Estilos específicos del componente (si es necesario) */
</style>
```

## 🧪 Testing

Antes de enviar tu PR:

1. **Prueba manualmente** todas las funcionalidades afectadas
2. **Verifica** que la aplicación funcione en modo desarrollo y producción
3. **Prueba** en diferentes navegadores (Chrome, Firefox, Safari)
4. **Verifica** la responsividad en diferentes tamaños de pantalla
5. **Asegúrate** de que no haya errores en la consola

```bash
# Build de producción
npm run build

# Preview de la build
npm run preview
```

## 📝 Documentación

Si tu contribución incluye nuevas características:

- Actualiza el **README.md** si es necesario
- Agrega **comentarios** en el código para explicar lógica compleja
- Documenta **props, eventos y métodos públicos**

## ✅ Checklist antes de enviar PR

- [ ] El código sigue las guías de estilo del proyecto
- [ ] He realizado una auto-revisión de mi código
- [ ] He comentado mi código, especialmente en áreas difíciles de entender
- [ ] He realizado los cambios correspondientes en la documentación
- [ ] Mis cambios no generan nuevas advertencias
- [ ] He probado que mi solución funciona correctamente
- [ ] Los commits siguen el formato de Conventional Commits

## 🎯 Áreas donde puedes contribuir

### Prioridad Alta
- Mejorar la precisión de las referencias APA
- Corregir bugs reportados
- Mejorar la accesibilidad
- Optimización de rendimiento

### Prioridad Media
- Agregar nuevos tipos de fuentes
- Mejorar la UI/UX
- Agregar tests
- Internacionalización (i18n)

### Prioridad Baja
- Refactorización de código
- Mejoras en la documentación
- Agregar ejemplos

## 📧 Contacto

Si tienes preguntas sobre cómo contribuir:

- Abre un **issue** con la etiqueta `question`
- Contacta al mantenedor: contacto@apafacil.cl

---

¡Gracias por contribuir a APA Fácil! 🎉

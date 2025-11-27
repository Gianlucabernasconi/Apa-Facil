<script setup>
import { ref } from 'vue'

const lastname = ref('')
const initials = ref('')
const fechaRaw = ref('')
const tituloPost = ref('')
const nombreBlog = ref('')
const url = ref('')
const resultado = ref('')

const getFechaFormateada = () => {
  if (!fechaRaw.value) return ''
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
  const date = new Date(fechaRaw.value)
  const dia = date.getDate()
  const mes = meses[date.getMonth()]
  const anio = date.getFullYear()
  return `${anio}, ${dia} de ${mes}`
}

const generar = () => {
  const authorsArray = lastname.value.split(",").map(a => a.trim()).filter(Boolean)
  const initialsArray = initials.value.split(",").map(i => i.trim().toUpperCase())

  let formattedAuthors = authorsArray.map((author, index) => {
    const parts = author.split(" ").map(w => w[0].toUpperCase() + w.slice(1).toLowerCase())
    const name = parts.join(" ")
    return initialsArray[index] ? `${name}, ${initialsArray[index]}.` : name
  })

  if (formattedAuthors.length > 20) {
    formattedAuthors = formattedAuthors.slice(0, 19).join(", ") + ", ..., & " + formattedAuthors.at(-1).replace(/\.$/, '')
  } else if (formattedAuthors.length > 2) {
    formattedAuthors = formattedAuthors.slice(0, -1).join(", ") + ", & " + formattedAuthors.at(-1).replace(/\.$/, '')
  } else if (formattedAuthors.length === 2) {
    formattedAuthors = `${formattedAuthors[0]}, & ${formattedAuthors[1].replace(/\.$/, '')}`
  } else {
    formattedAuthors = formattedAuthors[0] || ""
  }

  resultado.value = `${formattedAuthors} (${getFechaFormateada()}). ${tituloPost.value}. <i>${nombreBlog.value}</i>. ${url.value}`
}

const copiarUrl = () => {
  const div = document.getElementById('copy')
  const textoPlano = div.innerText 
  navigator.clipboard.writeText(textoPlano)
  const button = document.getElementById('botonCopy')
  button.textContent = '✓ Copiado'
  setTimeout(() => {
    button.textContent = '📋 Copiar'
  }, 2000)
}

</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Referencia para Entrada de Blog</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="lastname" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Apellidos del autor
        </label>
        <input 
          id="lastname"
          v-model="lastname" 
          placeholder="Ej: García, López (separados por coma)"
          class="form-input"
        />
      </div>
      
      <div>
        <label for="initials" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Iniciales
        </label>
        <input 
          id="initials"
          v-model="initials" 
          placeholder="Ej: A, B, C (separados por coma)"
          class="form-input"
        />
      </div>
      
      <div>
        <label for="fecha" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Fecha de publicación
        </label>
        <input 
          id="fecha"
          type="date" 
          v-model="fechaRaw"
          class="form-input"
        />
      </div>
      
      <div>
        <label for="titulo" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Título del post
        </label>
        <input 
          id="titulo"
          v-model="tituloPost" 
          placeholder="Ej: Cómo escribir referencias APA"
          class="form-input"
        />
      </div>
      
      <div>
        <label for="blog" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Nombre del blog
        </label>
        <input 
          id="blog"
          v-model="nombreBlog" 
          placeholder="Ej: Blog Académico"
          class="form-input"
        />
      </div>
      
      <div>
        <label for="url" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          URL del post
        </label>
        <input 
          id="url"
          v-model="url" 
          placeholder="https://ejemplo.com/post"
          class="w-full px-4 py-3 text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-200 outline-none"
        />
      </div>
    </div>

    <button 
      @click="generar"
      class="mt-6 btn-primary"
    >
      Generar referencia
    </button>

    <div v-if="resultado" class="result-container" id="copy" v-html="resultado"></div>
    
    <button 
      v-if="resultado" 
      id="botonCopy" 
      @click="copiarUrl"
      class="mt-8 btn-secondary"
    >
      📋 Copiar
    </button>
  </div>
</template>

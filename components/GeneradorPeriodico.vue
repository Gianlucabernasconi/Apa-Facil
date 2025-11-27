<script setup>
import { ref } from 'vue'

const lastname = ref('')
const initials = ref('')
const title = ref('')
const newspaper = ref('')
const pages = ref('')
const url = ref('')
const resultado = ref('')
const fechaRaw = ref('')

const generar = () => {
  const authorsArray = lastname.value.split(",").map(a => a.trim()).filter(Boolean)
  const initialsArray = initials.value.split(",").map(i => i.trim().toUpperCase())

  const getFechaFormateada = () => {
    if (!fechaRaw.value) return ''
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
    const date = new Date(fechaRaw.value)
    const dia = date.getDate()
    const mes = meses[date.getMonth()]
    const anio = date.getFullYear()
    return `${anio}, ${dia} de ${mes}`
  }

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
    formattedAuthors = formattedAuthors?.[0] || ''
  }

  const cleanPages = pages.value.trim().replace(/\.*$/, '')
  const cleanUrl = url.value.trim().replace(/\.*$/, '')

  let result = `${formattedAuthors} (${getFechaFormateada()}). ${title.value}. <i>${newspaper.value}</i>`

  if (cleanPages) {
    result += `, ${cleanPages}.`
  } else {
    result += `.`
  }

  if (cleanUrl) {
    result += ` ${cleanUrl}`
  }

  resultado.value = result
}

const copiarUrl = () => {
  const div = document.getElementById('copy')
  const textoPlano = div.innerText 
  navigator.clipboard.writeText(textoPlano)
  const button = document.getElementById('botonCopy')
  button.textContent = 'Copiado'
}
</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Referencia para Artículo de Periódico o Revista Popular</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="lastname" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Apellidos de los autores
        </label>
        <input 
          id="lastname"
          v-model="lastname" 
          placeholder="Apellidos separados por coma"
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
          placeholder="A, B, C..."
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
        <label for="title" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Título del artículo
        </label>
        <input 
          id="title"
          v-model="title" 
          placeholder="Ej: Nuevos descubrimientos en..."
          class="form-input"
        />
      </div>

      <div>
        <label for="newspaper" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Nombre del periódico o revista
        </label>
        <input 
          id="newspaper"
          v-model="newspaper" 
          placeholder="Ej: El País, National Geographic"
          class="form-input"
        />
      </div>

      <div>
        <label for="pages" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Páginas
        </label>
        <input 
          id="pages"
          v-model="pages" 
          placeholder="Ej: p. A4 o pp. B1–B2"
          class="form-input"
        />
      </div>

      <div class="md:col-span-2">
        <label for="url" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          URL (opcional)
        </label>
        <input 
          id="url"
          v-model="url" 
          placeholder="https://..."
          class="form-input"
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

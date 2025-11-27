<script setup>
import { ref } from 'vue'

const lastname = ref('')
const initials = ref('')
const year = ref('')
const articleTitle = ref('')
const magazineName = ref('')
const volume = ref('')
const number = ref('')
const pages = ref('')
const url = ref('') // URL o DOI
const resultado = ref('')

const generar = () => {
  const authorsArray = lastname.value.split(",").map(a => a.trim()).filter(Boolean)
  const initialsArray = initials.value.split(",").map(i => i.trim().toUpperCase())

  const formattedMagazine = `<i>${magazineName.value
    .split(" ")
    .map(w => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join(" ")}</i>`

  const article = articleTitle.value.trim()
    ? articleTitle.value.trim().charAt(0).toUpperCase() + articleTitle.value.trim().slice(1)
    : ''

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

  const vol = volume.value.trim()
  const num = number.value.trim()
  const pags = pages.value.trim()

  let volYNum = ''
  if (vol) {
    // APA 7: Volumen en cursiva
    volYNum += `<i>${vol}</i>`
    if (num) {
      // Número en paréntesis (texto normal) pegado al volumen
      volYNum += `(${num})`
    }
  }

  let result = ''

  if (formattedAuthors) {
    result = `${formattedAuthors} (${year.value}). ${article}. ${formattedMagazine}`
    if (volYNum) result += `, ${volYNum}`
    if (pags) result += `, ${pags}`
    result += `.`
  } else {
    result = `(${year.value}). ${article}. ${formattedMagazine}`
    if (volYNum) result += `, ${volYNum}`
    if (pags) result += `, ${pags}`
    result += `.`
  }

  if (url.value.trim()) {
    result += ` ${url.value.trim()}`
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
    <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Referencia para Artículo Científico</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="lastname" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Autores
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
        <label for="year" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Año
        </label>
        <input 
          id="year"
          v-model="year" 
          placeholder="Ej: 2023"
          class="form-input"
        />
      </div>

      <div>
        <label for="articleTitle" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Título del artículo
        </label>
        <input 
          id="articleTitle"
          v-model="articleTitle" 
          placeholder="Ej: Impacto de la IA en la educación"
          class="form-input"
        />
      </div>

      <div>
        <label for="magazineName" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Nombre de la revista
        </label>
        <input 
          id="magazineName"
          v-model="magazineName" 
          placeholder="Ej: Revista de Tecnología Educativa"
          class="form-input"
        />
      </div>

      <div class="grid grid-cols-3 gap-4 md:col-span-2">
        <div>
          <label for="volume" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            Volumen
          </label>
          <input 
            id="volume"
            v-model="volume" 
            placeholder="Ej: 15"
            class="w-full px-4 py-3 text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-200 outline-none"
          />
        </div>
        <div>
          <label for="number" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            Número
          </label>
          <input 
            id="number"
            v-model="number" 
            placeholder="Ej: 2"
            class="w-full px-4 py-3 text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-200 outline-none"
          />
        </div>
        <div>
          <label for="pages" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            Páginas
          </label>
          <input 
            id="pages"
            v-model="pages" 
            placeholder="Ej: 45-60"
            class="w-full px-4 py-3 text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-200 outline-none"
          />
        </div>
      </div>

      <div class="md:col-span-2">
        <label for="url" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          DOI o URL (opcional)
        </label>
        <input 
          id="url"
          v-model="url" 
          placeholder="https://doi.org/... o URL"
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

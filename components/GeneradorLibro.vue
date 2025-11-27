<script setup>
import { ref } from 'vue'

const lastname = ref('')
const initials = ref('')
const year = ref('')
const bookTitle = ref('')
const editorial = ref('')
const edition = ref('')
const url = ref('') // URL o DOI
const resultado = ref('')

const generar = () => {
  let authorsArray = lastname.value.split(",").map(a => a.trim()).filter(Boolean)
  let initialsArray = initials.value.split(",").map(i => i.trim().toUpperCase())

  let formatedEditorial = editorial.value
  .trim()
  .replace(/\.*$/, '')
  .split(" ")
  .map(w => w[0].toUpperCase() + w.slice(1).toLowerCase())
  .join(" ")


  let formattedAuthors = authorsArray.map((author, index) => {
    let parts = author.split(" ").map(w => w[0].toUpperCase() + w.slice(1).toLowerCase())
    let name = parts.join(" ")
    return initialsArray[index] ? `${name}, ${initialsArray[index]}.` : name
  })

  let result = ""

  if (formattedAuthors.length === 1) {
    result = `${formattedAuthors[0]} (${year.value}). <i>${bookTitle.value}</i>`
  } else if (formattedAuthors.length === 2) {
    result = `${formattedAuthors[0]}, & ${formattedAuthors[1].replace(/\.$/, '')}. (${year.value}). <i>${bookTitle.value}</i>`
  } else if (formattedAuthors.length > 2 && formattedAuthors.length <= 20) {
    result = formattedAuthors.slice(0, -1).join(", ") + ", & " + formattedAuthors.at(-1).replace(/\.$/, '') + `. (${year.value}). <i>${bookTitle.value}</i>`
  } else if (formattedAuthors.length > 20) {
    result = formattedAuthors.slice(0, 19).join(", ") + ", ..., & " + formattedAuthors.at(-1).replace(/\.$/, '') + `. (${year.value}). <i>${bookTitle.value}</i>`
  }

  if (edition.value.trim()) {
    result += ` (${edition.value}ª ed.)`
  }

  result += `. ${formatedEditorial}.`

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
  button.textContent = '✓ Copiado'
  setTimeout(() => {
    button.textContent = '📋 Copiar'
  }, 2000)
}


</script>


<template>
  <div>
    <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Referencia para Libro</h2>

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
        <label for="year" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Año de publicación
        </label>
        <input 
          id="year"
          v-model="year" 
          placeholder="Ej: 2023"
          class="form-input"
        />
      </div>
      
      <div>
        <label for="bookTitle" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Título del libro
        </label>
        <input 
          id="bookTitle"
          v-model="bookTitle" 
          placeholder="Ej: Introducción a la Psicología"
          class="form-input"
        />
      </div>
      
      <div>
        <label for="editorial" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Editorial
        </label>
        <input 
          id="editorial"
          v-model="editorial" 
          placeholder="Ej: McGraw-Hill"
          class="form-input"
        />
      </div>
      
      <div>
        <label for="edition" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Edición (opcional)
        </label>
        <input 
          id="edition"
          v-model="edition" 
          placeholder="Ej: 3"
          class="form-input"
        />
      </div>

      <div class="md:col-span-2">
        <label for="url" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          DOI o URL (opcional)
        </label>
        <input 
          id="url"
          v-model="url" 
          placeholder="https://doi.org/... o URL"
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
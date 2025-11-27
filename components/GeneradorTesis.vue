<script setup>
import { ref } from 'vue'

const lastname = ref('')
const initials = ref('')
const year = ref('')
const title = ref('')
const type = ref('')
const institution = ref('')
const url = ref('')
const resultado = ref('')

const generar = () => {
  const authorsArray = lastname.value.split(",").map(a => a.trim()).filter(Boolean)
  const initialsArray = initials.value.split(",").map(i => i.trim().toUpperCase())

  const formattedAuthors = authorsArray.map((author, index) => {
    const parts = author.split(" ").map(w => w[0].toUpperCase() + w.slice(1).toLowerCase())
    const name = parts.join(" ")
    return initialsArray[index] ? `${name}, ${initialsArray[index]}.` : name
  })

  // APA 7: [Tipo de tesis, Nombre de la institución].
  const tipo = type.value.trim()
  const inst = institution.value.trim().replace(/\.*$/, '')
  
  let bracketContent = ''
  if (tipo && inst) {
    bracketContent = ` [${tipo}, ${inst}]`
  } else if (tipo) {
    bracketContent = ` [${tipo}]`
  } else if (inst) {
    bracketContent = ` [${inst}]`
  }

  const cleanUrl = url.value.trim().replace(/\.*$/, '')

  let result = ''

  if (formattedAuthors.length === 1) {
    result = `${formattedAuthors[0]} (${year.value}). <i>${title.value}</i>${bracketContent}.`
  } else if (formattedAuthors.length === 2) {
    result = `${formattedAuthors[0]}, & ${formattedAuthors[1].replace(/\.$/, '')}. (${year.value}). <i>${title.value}</i>${bracketContent}.`
  } else if (formattedAuthors.length > 2 && formattedAuthors.length <= 20) {
    result = formattedAuthors.slice(0, -1).join(", ") + ", & " + formattedAuthors.at(-1).replace(/\.$/, '') + `. (${year.value}). <i>${title.value}</i>${bracketContent}.`
  } else if (formattedAuthors.length > 20) {
    result = formattedAuthors.slice(0, 19).join(", ") + ", ..., & " + formattedAuthors.at(-1).replace(/\.$/, '') + `. (${year.value}). <i>${title.value}</i>${bracketContent}.`
  } else {
    result = `(${year.value}). <i>${title.value}</i>${bracketContent}.`
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
    <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Referencia para Tesis o Disertación</h2>

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
        <label for="title" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Título de la tesis o disertación
        </label>
        <input 
          id="title"
          v-model="title" 
          placeholder="Ej: Análisis de..."
          class="form-input"
        />
      </div>

      <div>
        <label for="type" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Tipo
        </label>
        <input 
          id="type"
          v-model="type" 
          placeholder="Ej: Tesis de maestría, doctorado"
          class="form-input"
        />
      </div>

      <div>
        <label for="institution" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Nombre de la institución
        </label>
        <input 
          id="institution"
          v-model="institution" 
          placeholder="Ej: Universidad Nacional"
          class="form-input"
        />
      </div>

      <div class="md:col-span-2">
        <label for="url" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          URL o base de datos (si aplica)
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

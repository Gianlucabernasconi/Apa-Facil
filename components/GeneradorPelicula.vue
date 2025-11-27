<script setup>
import { ref } from 'vue'

const lastname = ref('')
const initials = ref('')
const rol = ref('Director') 
const year = ref('')
const title = ref('')
const company = ref('')
const url = ref('')
const resultado = ref('')

const generar = () => {
  const namesArray = lastname.value.split(",").map(a => a.trim()).filter(Boolean)
  const initialsArray = initials.value.split(",").map(i => i.trim().toUpperCase())

  let formattedNames = namesArray.map((name, index) => {
    const parts = name.split(" ").map(w => w[0].toUpperCase() + w.slice(1).toLowerCase())
    const lastName = parts.join(" ")
    return initialsArray[index] ? `${lastName}, ${initialsArray[index]}.` : lastName
  })

  if (formattedNames.length > 20) {
    formattedNames = formattedNames.slice(0, 19).join(", ") + ", ..., & " + formattedNames.at(-1).replace(/\.$/, '')
  } else if (formattedNames.length > 2) {
    formattedNames = formattedNames.slice(0, -1).join(", ") + ", & " + formattedNames.at(-1).replace(/\.$/, '')
  } else if (formattedNames.length === 2) {
    formattedNames = `${formattedNames[0]}, & ${formattedNames[1].replace(/\.$/, '')}`
  } else {
    formattedNames = formattedNames?.[0] || ''
  }

  const cleanCompany = company.value.trim().replace(/\.*$/, '')
  const cleanUrl = url.value.trim().replace(/\.*$/, '')
  const rolFinal = rol.value.trim() ? `(${rol.value})` : ''

  resultado.value = `${formattedNames} ${rolFinal}. (${year.value}). <i>${title.value}</i> [Película].`
  if (cleanCompany) {
    resultado.value += ` ${cleanCompany}.`
  }
  if (cleanUrl) {
    resultado.value += ` ${cleanUrl}`
  }
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
    <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Referencia para Película o Video</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="lastname" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Apellidos del director o productor
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
        <label for="rol" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Rol
        </label>
        <select 
          id="rol"
          v-model="rol"
          class="w-full px-4 py-3 text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-200 outline-none"
        >
          <option>Director</option>
          <option>Productor</option>
        </select>
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
          Título de la película o video
        </label>
        <input 
          id="title"
          v-model="title" 
          placeholder="Ej: El Padrino"
          class="form-input"
        />
      </div>

      <div>
        <label for="company" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Compañía productora
        </label>
        <input 
          id="company"
          v-model="company" 
          placeholder="Ej: Warner Bros"
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

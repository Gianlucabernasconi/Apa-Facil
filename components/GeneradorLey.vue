<script setup>
import { ref } from 'vue'

const organismo = ref('')
const year = ref('')
const month = ref('')
const day = ref('')
const nombreLey = ref('')
const numero = ref('') // Número de ley, decreto, etc.
const url = ref('')
const resultado = ref('')

const generar = () => {
  let result = ''

  if (organismo.value && nombreLey.value) {
    const cleanUrl = url.value.trim().replace(/\.*$/, '')
    
    let fecha = year.value
    if (month.value) fecha += `, ${month.value}`
    if (day.value) fecha += ` ${day.value}`

    result = `${organismo.value} (${fecha}). <i>${nombreLey.value}</i>`
    
    if (numero.value.trim()) {
      result += ` (No. ${numero.value.trim()})`
    }

    if (cleanUrl) {
      result += `. ${cleanUrl}`
    } else {
      result += `.`
    }
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
    <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Referencia para Ley, Decreto o Norma</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="organismo" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Nombre del organismo
        </label>
        <input 
          id="organismo"
          v-model="organismo" 
          placeholder="Ej: República de Chile"
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
        <label for="month" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Mes (opcional)
        </label>
        <input 
          id="month"
          v-model="month" 
          placeholder="Ej: Mayo"
          class="form-input"
        />
      </div>

      <div>
        <label for="day" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Día (opcional)
        </label>
        <input 
          id="day"
          v-model="day" 
          placeholder="Ej: 15"
          class="form-input"
        />
      </div>

      <div>
        <label for="nombreLey" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Nombre de la ley o norma
        </label>
        <input 
          id="nombreLey"
          v-model="nombreLey" 
          placeholder="Ej: Ley de Protección de Datos"
          class="form-input"
        />
      </div>

      <div>
        <label for="numero" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Número
        </label>
        <input 
          id="numero"
          v-model="numero" 
          placeholder="Ej: 19.628"
          class="form-input"
        />
      </div>

      <div class="md:col-span-2">
        <label for="url" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          URL oficial
        </label>
        <input 
          id="url"
          v-model="url" 
          placeholder="https://..."
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

<script setup>
import { ref } from 'vue'

const desarrollador = ref('') // Nombre del autor, empresa o equipo
const year = ref('')
const nombreSoftware = ref('')
const version = ref('')
const empresa = ref('')
const url = ref('')
const resultado = ref('')

const generar = () => {
  const versionTexto = version.value.trim() ? ` (${version.value.trim()})` : ''
  const empresaTexto = empresa.value.trim() ? `. ${empresa.value.trim().replace(/\.*$/, '')}` : ''
  const urlTexto = url.value.trim() ? `. ${url.value.trim().replace(/\.*$/, '')}` : ''

  resultado.value = `${desarrollador.value} (${year.value}). <i>${nombreSoftware.value}</i>${versionTexto}${empresaTexto}${urlTexto}.`
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
    <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Referencia para Software o Aplicación</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="desarrollador" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Desarrollador o autor
        </label>
        <input 
          id="desarrollador"
          v-model="desarrollador" 
          placeholder="Nombre del autor, empresa o equipo"
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
        <label for="nombreSoftware" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Nombre del software o app
        </label>
        <input 
          id="nombreSoftware"
          v-model="nombreSoftware" 
          placeholder="Ej: SPSS, Duolingo"
          class="form-input"
        />
      </div>

      <div>
        <label for="version" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Versión
        </label>
        <input 
          id="version"
          v-model="version" 
          placeholder="Ej: 3.1.4"
          class="form-input"
        />
      </div>

      <div>
        <label for="empresa" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Empresa (opcional)
        </label>
        <input 
          id="empresa"
          v-model="empresa" 
          placeholder="Ej: IBM, Microsoft"
          class="form-input"
        />
      </div>

      <div>
        <label for="url" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          URL (sitio oficial o descarga)
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
      class="mt-8 btn-secondary">
      📋 Copiar
    </button>
  </div>
</template>

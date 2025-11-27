<script setup>
import { ref } from 'vue'

const nombre = ref('')
const fechaRaw = ref('')
const titulo = ref('')
const plataforma = ref('')
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
  const cleanPlataforma = plataforma.value.trim().replace(/\.*$/, '')
  const cleanUrl = url.value.trim().replace(/\.*$/, '')

  resultado.value = `${nombre.value}. (${getFechaFormateada()}). <i>${titulo.value}</i> [Transmisión en vivo]. ${cleanPlataforma}. ${cleanUrl}.`
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
    <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Referencia para Transmisión en Vivo</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="canal" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Nombre del canal o creador
        </label>
        <input 
          id="canal"
          v-model="nombre" 
          placeholder="Ej: NASA"
          class="form-input"
        />
      </div>

      <div>
        <label for="fecha" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Fecha de la transmisión
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
          Título de la transmisión
        </label>
        <input 
          id="titulo"
          v-model="titulo" 
          placeholder="Ej: Lanzamiento del telescopio James Webb"
          class="form-input"
        />
      </div>

      <div>
        <label for="plataforma" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Plataforma
        </label>
        <input 
          id="plataforma"
          v-model="plataforma" 
          placeholder="Ej: YouTube, Twitch"
          class="form-input"
        />
      </div>

      <div class="md:col-span-2">
        <label for="url" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          URL del video (si queda guardado)
        </label>
        <input 
          id="url"
          v-model="url" 
          placeholder="https://www.youtube.com/watch?v=..."
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

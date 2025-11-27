<script setup>
import { ref } from 'vue'

const usuario = ref('')
const fechaRaw = ref('')
const contenido = ref('')
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

const primeras20Palabras = (texto) => {
  return texto.trim().split(/\s+/).slice(0, 20).join(' ')
}

const generar = () => {
  const fecha = getFechaFormateada()
  const texto = primeras20Palabras(contenido.value)

  resultado.value = `${usuario.value}. (${fecha}). ${texto} [Comentario en ${plataforma.value}]. ${plataforma.value}. ${url.value}`
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
    <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Referencia para Comentario en Foro, Blog o Página</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="usuario" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Nombre de usuario
        </label>
        <input 
          id="usuario"
          v-model="usuario" 
          placeholder="Ej: @usuario123"
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

      <div class="md:col-span-2">
        <label for="contenido" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Contenido del comentario
        </label>
        <textarea 
          id="contenido"
          v-model="contenido" 
          placeholder="Contenido del comentario (se tomarán solo las primeras 20 palabras)" 
          rows="3"
          class="w-full px-4 py-3 text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-200 outline-none"
        ></textarea>
      </div>

      <div>
        <label for="plataforma" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Nombre de la plataforma
        </label>
        <input 
          id="plataforma"
          v-model="plataforma" 
          placeholder="Ej: YouTube, Reddit, Blog X"
          class="form-input"
        />
      </div>

      <div>
        <label for="url" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          URL directa al comentario
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

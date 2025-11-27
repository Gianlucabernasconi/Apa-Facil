<script setup>
import { ref } from 'vue'

const usuario = ref('')
const fechaRaw = ref('')
const contenido = ref('')
const tipo = ref('Tweet') 
const red = ref('')
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

  const cleanRed = red.value.trim().replace(/\.*$/, '')
  const cleanUrl = url.value.trim().replace(/\.*$/, '')


  resultado.value = `${usuario.value}. (${fecha}). <i>${texto}</i> [${tipo.value}]. ${cleanRed}. ${cleanUrl}`

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
    <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Referencia para Publicación en Redes Sociales</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="usuario" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Nombre de usuario
        </label>
        <input 
          id="usuario"
          v-model="usuario" 
          placeholder="Ej: @APA_Style"
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
          Contenido del post
        </label>
        <textarea 
          id="contenido"
          v-model="contenido" 
          placeholder="Contenido completo (se tomarán solo las primeras 20 palabras)" 
          rows="3"
          class="w-full px-4 py-3 text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-200 outline-none"
        ></textarea>
      </div>

      <div>
        <label for="tipo" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Tipo de publicación
        </label>
        <input 
          id="tipo"
          v-model="tipo" 
          placeholder="Ej: Tweet, Post de Facebook"
          class="form-input"
        />
      </div>

      <div>
        <label for="red" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Red social
        </label>
        <input 
          id="red"
          v-model="red" 
          placeholder="Ej: Twitter, Facebook"
          class="form-input"
        />
      </div>

      <div class="md:col-span-2">
        <label for="url" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          URL del post
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

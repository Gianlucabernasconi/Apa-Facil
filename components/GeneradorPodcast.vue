<script setup>
import { ref } from 'vue'

const anfitrion = ref('')
const initials = ref('')
const fechaRaw = ref('')
const tituloEpisodio = ref('')
const numeroEpisodio = ref('')
const tituloPodcast = ref('')
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
  const anfitrionesArray = anfitrion.value.split(",").map(a => a.trim()).filter(Boolean)
  const initialsArray = initials.value.split(",").map(i => i.trim().toUpperCase())

  let formattedAnfitriones = anfitrionesArray.map((name, index) => {
    const parts = name.split(" ").map(w => w[0].toUpperCase() + w.slice(1).toLowerCase())
    const lastName = parts.join(" ")
    return initialsArray[index] ? `${lastName}, ${initialsArray[index]}.` : lastName
  })

  if (formattedAnfitriones.length > 20) {
    formattedAnfitriones = formattedAnfitriones.slice(0, 19).join(", ") + ", ..., & " + formattedAnfitriones.at(-1).replace(/\.$/, '')
  } else if (formattedAnfitriones.length > 2) {
    formattedAnfitriones = formattedAnfitriones.slice(0, -1).join(", ") + ", & " + formattedAnfitriones.at(-1).replace(/\.$/, '')
  } else if (formattedAnfitriones.length === 2) {
    formattedAnfitriones = `${formattedAnfitriones[0]}, & ${formattedAnfitriones[1].replace(/\.$/, '')}`
  } else {
    formattedAnfitriones = formattedAnfitriones?.[0] || ''
  }

  const cleanPlataforma = plataforma.value.trim().replace(/\.*$/, '')
  const cleanUrl = url.value.trim().replace(/\.*$/, '')
  const podcastNombre = tituloPodcast.value.trim() ? ` En <i>${tituloPodcast.value}</i>.` : ''
  const numEp = numeroEpisodio.value.trim() ? ` (No. ${numeroEpisodio.value.trim()})` : ''

  resultado.value = `${formattedAnfitriones} (Anfitrión). (${getFechaFormateada()}). ${tituloEpisodio.value}${numEp} [Episodio de podcast].${podcastNombre} ${cleanPlataforma}. ${cleanUrl}`
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
    <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Referencia para Episodio de Podcast</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="anfitrion" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Apellidos del anfitrión
        </label>
        <input 
          id="anfitrion"
          v-model="anfitrion" 
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
        <label for="tituloEpisodio" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Título del episodio
        </label>
        <input 
          id="tituloEpisodio"
          v-model="tituloEpisodio" 
          placeholder="Ej: El futuro de la IA"
          class="form-input"
        />
      </div>

      <div>
        <label for="numeroEpisodio" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Número de episodio (opcional)
        </label>
        <input 
          id="numeroEpisodio"
          v-model="numeroEpisodio" 
          placeholder="Ej: 42"
          class="form-input"
        />
      </div>

      <div>
        <label for="tituloPodcast" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Nombre del podcast (opcional)
        </label>
        <input 
          id="tituloPodcast"
          v-model="tituloPodcast" 
          placeholder="Ej: Tech Talks"
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
          placeholder="Ej: Spotify, Apple Podcasts"
          class="form-input"
        />
      </div>

      <div class="md:col-span-2">
        <label for="url" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          URL del episodio
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

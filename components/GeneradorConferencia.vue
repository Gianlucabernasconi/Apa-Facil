<script setup>
import { ref } from 'vue'

const lastname = ref('')
const initials = ref('')
const year = ref('')
const month = ref('')
const presentationTitle = ref('')
const organizerInitials = ref('')
const organizerLastname = ref('')
const eventTitle = ref('')
const format = ref('')
const place = ref('')
const url = ref('')
const resultado = ref('')

const generar = () => {
  const authorsArray = lastname.value.split(",").map(a => a.trim()).filter(Boolean)
  const initialsArray = initials.value.split(",").map(i => i.trim().toUpperCase()).filter(Boolean)

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
    formattedAuthors = formattedAuthors[0] || ""
  }

  // Lógica para simposio vs conferencia simple
  let result = ''
  const cleanUrl = url.value.trim().replace(/\.*$/, '')
  const cleanPlace = place.value.trim().replace(/\.*$/, '')

  if (organizerLastname.value.trim()) {
    // Es un simposio o libro de actas con editor
    result = `${formattedAuthors} (${year.value}, ${month.value}). <i>${presentationTitle.value}</i>. En ${organizerInitials.value}. ${organizerLastname.value} (Presidencia), <i>${eventTitle.value}</i> [${format.value}]. ${cleanPlace}.`
  } else {
    // Conferencia simple
    // Autor. (Fecha). Título [Formato]. Nombre Conferencia, Lugar. URL.
    result = `${formattedAuthors} (${year.value}, ${month.value}). <i>${presentationTitle.value}</i> [${format.value}]. ${eventTitle.value}, ${cleanPlace}.`
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
    <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Referencia para Presentación o Ponencia</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="lastname" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Apellidos de los autores
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
        <label for="month" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Mes (y días si aplica)
        </label>
        <input 
          id="month"
          v-model="month" 
          placeholder="Ej: Enero, 15-18 de mayo"
          class="form-input"
        />
      </div>

      <div>
        <label for="presentationTitle" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Título de la presentación
        </label>
        <input 
          id="presentationTitle"
          v-model="presentationTitle" 
          placeholder="Ej: Avances en..."
          class="form-input"
        />
      </div>

      <div>
        <label for="eventTitle" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Nombre del simposio o conferencia
        </label>
        <input 
          id="eventTitle"
          v-model="eventTitle" 
          placeholder="Ej: Congreso Internacional de..."
          class="form-input"
        />
      </div>

      <div>
        <label for="format" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Formato
        </label>
        <input 
          id="format"
          v-model="format" 
          placeholder="Ej: Conferencia, Póster, Simposio"
          class="form-input"
        />
      </div>

      <div>
        <label for="place" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Lugar del evento
        </label>
        <input 
          id="place"
          v-model="place" 
          placeholder="Ej: Madrid, España"
          class="form-input"
        />
      </div>

      <div>
        <label for="organizerLastname" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Apellido del organizador (Solo para Simposios)
        </label>
        <input 
          id="organizerLastname"
          v-model="organizerLastname" 
          placeholder="Ej: Pérez (Opcional)"
          class="form-input"
        />
      </div>

      <div>
        <label for="organizerInitials" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Iniciales del organizador (Solo para Simposios)
        </label>
        <input 
          id="organizerInitials"
          v-model="organizerInitials" 
          placeholder="A, B... (Opcional)"
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

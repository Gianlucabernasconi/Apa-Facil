<script setup>
import { ref } from 'vue'

const lastname = ref('')
const initials = ref('')
const year = ref('')
const pageTitle = ref('')
const websiteName = ref('')
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

  const cleanUrl = url.value.trim().replace(/\.*$/, '')
  const cleanWebsiteName = websiteName.value.trim().replace(/\.*$/, '')
  // APA 7: Título de la página en cursiva
  const formattedTitle = pageTitle.value.trim() ? `<i>${pageTitle.value.trim()}</i>.` : ''
  // APA 7: Nombre del sitio en texto normal
  const formattedWebsite = cleanWebsiteName ? `${cleanWebsiteName}.` : ''

  let result = ""

  if (!lastname.value && cleanWebsiteName) {
    // Organización como autor (el nombre del sitio es el autor)
    // APA 7: Si el autor y el nombre del sitio son iguales, se omite el nombre del sitio.
    result = `${cleanWebsiteName} (${year.value}). ${formattedTitle} ${cleanUrl}.`
  } else if (!lastname.value && !initials.value && !cleanWebsiteName) {
    // Sin autor ni sitio claro (Título mueve a posición de autor)
    // Si el título está en posición de autor, va en cursiva? En web, el título de la obra va en cursiva.
    // Pero si mueve a posición de autor, suele ir normal y luego (Fecha).
    // Sin embargo, para simplificar y seguir APA 7 web: Título. (Fecha). Sitio. URL.
    result = `${formattedTitle} (${year.value}). ${formattedWebsite} ${cleanUrl}.`
  } else {
    // Autor personal
    result = `${formattedAuthors} (${year.value}). ${formattedTitle} ${formattedWebsite} ${cleanUrl}.`
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
    <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Referencia para Página Web</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="lastname" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Autores (opcional)
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
          Iniciales (opcional)
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
        <label for="pageTitle" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Título de la página o artículo
        </label>
        <input 
          id="pageTitle"
          v-model="pageTitle" 
          placeholder="Ej: Historia de la computación"
          class="form-input"
        />
      </div>

      <div>
        <label for="websiteName" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Nombre del sitio web
        </label>
        <input 
          id="websiteName"
          v-model="websiteName" 
          placeholder="Ej: Wikipedia"
          class="form-input"
        />
      </div>

      <div>
        <label for="url" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          URL
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

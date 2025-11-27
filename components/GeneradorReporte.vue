<script setup>
import { ref } from 'vue'

const lastname = ref('')
const initials = ref('')
const year = ref('')
const title = ref('')
const organization = ref('')
const publicationNumber = ref('')
const url = ref('')
const documentType = ref('')
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
    formattedAuthors = formattedAuthors.slice(0, 19).join(", ") + ", ..., " + formattedAuthors.at(-1)
  } else if (formattedAuthors.length > 1) {
    formattedAuthors = formattedAuthors.slice(0, -1).join(", ") + ", & " + formattedAuthors.at(-1)
  } else {
    formattedAuthors = formattedAuthors?.[0] || ""
  }

  const docType = documentType.value.trim()
  const pubNumber = publicationNumber.value.trim()
  
  let formattedPublication = ""
  if (docType && pubNumber) {
    formattedPublication = `(${docType} No. ${pubNumber})`
  } else if (docType) {
    formattedPublication = `(${docType})`
  } else if (pubNumber) {
    formattedPublication = `(No. ${pubNumber})`
  }

  const cleanUrl = url.value.trim().replace(/\.*$/, '')
  const cleanOrg = organization.value.trim()

  let result = ""

  if (formattedAuthors) {
    // Autor personal: Autor. (Año). Título (Informe No. x). Organización. URL.
    result = `${formattedAuthors} (${year.value}). <i>${title.value}</i>${formattedPublication ? " " + formattedPublication : ""}`
    if (cleanOrg) result += `. ${cleanOrg}`
  } else if (cleanOrg) {
    // Organización como autor: Organización. (Año). Título (Informe No. x). URL.
    result = `${cleanOrg} (${year.value}). <i>${title.value}</i>${formattedPublication ? " " + formattedPublication : ""}`
  } else {
    // Sin autor: Título (Informe No. x). (Año). URL.
    result = `<i>${title.value}</i>${formattedPublication ? " " + formattedPublication : ""} (${year.value})`
    if (cleanOrg) result += `. ${cleanOrg}`
  }

  if (cleanUrl) {
    result += `. ${cleanUrl}`
  } else {
    result += "."
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
    <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Referencia para Reporte o Documento Oficial</h2>

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
        <label for="title" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Título del documento
        </label>
        <input 
          id="title"
          v-model="title" 
          placeholder="Ej: Informe anual..."
          class="form-input"
        />
      </div>

      <div>
        <label for="organization" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Organización (si aplica)
        </label>
        <input 
          id="organization"
          v-model="organization" 
          placeholder="Ej: OMS, UNESCO"
          class="form-input"
        />
      </div>

      <div>
        <label for="publicationNumber" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Número de publicación (si aplica)
        </label>
        <input 
          id="publicationNumber"
          v-model="publicationNumber" 
          placeholder="Ej: 123-45"
          class="form-input"
        />
      </div>

      <div>
        <label for="documentType" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Tipo de documento
        </label>
        <input 
          id="documentType"
          v-model="documentType" 
          placeholder="Ej: Ley, Informe"
          class="form-input"
        />
      </div>

      <div>
        <label for="url" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          URL (si aplica)
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

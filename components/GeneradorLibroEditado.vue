<script setup>
import { ref } from 'vue'

const lastname = ref('')
const initials = ref('')
const year = ref('')
const chapterTitle = ref('')
const editorInitials = ref('')
const editorLastnames = ref('')
const bookTitle = ref('')
const pageRange = ref('')
const editorial = ref('')
const edition = ref('')
const url = ref('') // URL o DOI
const resultado = ref('')

const generar = () => {
  const authorsArray = lastname.value.split(",").map(a => a.trim()).filter(Boolean)
  const initialsArray = initials.value.split(",").map(i => i.trim().toUpperCase())

  const editorsArray = editorLastnames.value.split(",").map(e => e.trim()).filter(Boolean)
  const editorsInitialsArray = editorInitials.value.split(",").map(i => i.trim().toUpperCase())

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
    formattedAuthors = formattedAuthors[0] || ''
  }

  let formattedEditors = editorsArray.map((editor, index) => {
    const parts = editor.split(" ").map(w => w[0].toUpperCase() + w.slice(1).toLowerCase())
    const name = parts.join(" ")
    return editorsInitialsArray[index] ? `${editorsInitialsArray[index]}, ${name}` : name
  })

  if (formattedEditors.length > 20) {
    formattedEditors = formattedEditors.slice(0, 19).join(", ") + ", ..., " + formattedEditors.at(-1) + " (Eds.)"
  } else if (formattedEditors.length > 1) {
    formattedEditors = formattedEditors.slice(0, -1).join(", ") + ", & " + formattedEditors.at(-1) + " (Eds.)"
  } else if (formattedEditors.length === 1) {
    formattedEditors = `${formattedEditors[0]} (Ed.)`
  } else {
    formattedEditors = ''
  }

  const formattedEdition = edition.value.trim() ? `${edition.value.trim()}ª ed.` : ''
  const paginas = pageRange.value.trim()
  const editorialClean = editorial.value.trim().replace(/\.*$/, '')

  let result = `${formattedAuthors} (${year.value}). ${chapterTitle.value}. En ${formattedEditors}, <i>${bookTitle.value}</i>`

  if (formattedEdition || paginas) {
    // APA 7: pp. xx-xx (con espacio)
    const seccion = [formattedEdition, paginas ? `pp. ${paginas}` : ''].filter(Boolean).join(', ')
    result += ` (${seccion})`
  }

  if (editorialClean) {
    result += `. ${editorialClean}.`
  } else {
    result += `.`
  }

  if (url.value.trim()) {
    result += ` ${url.value.trim()}`
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
    <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Referencia para capítulo de libro editado</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="lastname" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Autores del capítulo
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
          Iniciales de autores
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
        <label for="chapterTitle" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Título del capítulo
        </label>
        <input 
          id="chapterTitle"
          v-model="chapterTitle" 
          placeholder="Ej: Metodología de investigación"
          class="form-input"
        />
      </div>

      <div>
        <label for="editorLastnames" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Apellidos del editor
        </label>
        <input 
          id="editorLastnames"
          v-model="editorLastnames" 
          placeholder="Apellidos separados por coma"
          class="form-input"
        />
      </div>

      <div>
        <label for="editorInitials" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Iniciales del editor
        </label>
        <input 
          id="editorInitials"
          v-model="editorInitials" 
          placeholder="A, B, C..."
          class="form-input"
        />
      </div>

      <div>
        <label for="bookTitle" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Título del libro
        </label>
        <input 
          id="bookTitle"
          v-model="bookTitle" 
          placeholder="Ej: Manual de Psicología"
          class="form-input"
        />
      </div>

      <div>
        <label for="pageRange" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Páginas
        </label>
        <input 
          id="pageRange"
          v-model="pageRange" 
          placeholder="Ej: 120-145"
          class="form-input"
        />
      </div>

      <div>
        <label for="editorial" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Editorial
        </label>
        <input 
          id="editorial"
          v-model="editorial" 
          placeholder="Ej: McGraw-Hill"
          class="form-input"
        />
      </div>

      <div>
        <label for="edition" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Edición (opcional)
        </label>
        <input 
          id="edition"
          v-model="edition" 
          placeholder="Ej: 3"
          class="form-input"
        />
      </div>

      <div class="md:col-span-2">
        <label for="url" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          DOI o URL (opcional)
        </label>
        <input 
          id="url"
          v-model="url" 
          placeholder="https://doi.org/... o URL"
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

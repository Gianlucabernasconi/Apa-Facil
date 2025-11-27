<script setup>
import { ref } from 'vue'

const lastname = ref('')
const initials = ref('')
const fechaRaw = ref('')
const resultado = ref('')

const generar = () => {
  const intervieweeArray = lastname.value.split(",").map(a => a.trim()).filter(Boolean)
  const initialsArray = initials.value.split(",").map(i => i.trim().toUpperCase())

  const getFechaFormateada = () => {
    if (!fechaRaw.value) return ''
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
    const date = new Date(fechaRaw.value)
    const dia = date.getDate()
    const mes = meses[date.getMonth()]
    const anio = date.getFullYear()
    return `${dia} de ${mes} de ${anio}`
  }

  let formattedInterviewee = intervieweeArray.map((name, index) => {
    const parts = name.split(" ").map(w => w[0].toUpperCase() + w.slice(1).toLowerCase())
    const lastName = parts.join(" ")
    return initialsArray[index] ? `${initialsArray[index]}. ${lastName}` : lastName
  })

  if (formattedInterviewee.length > 20) {
    formattedInterviewee = formattedInterviewee.slice(0, 19).join(", ") + ", ..., & " + formattedInterviewee.at(-1).replace(/\.$/, '')
  } else if (formattedInterviewee.length > 2) {
    formattedInterviewee = formattedInterviewee.slice(0, -1).join(", ") + ", & " + formattedInterviewee.at(-1).replace(/\.$/, '')
  } else if (formattedInterviewee.length === 2) {
    formattedInterviewee = `${formattedInterviewee[0]}, & ${formattedInterviewee[1].replace(/\.$/, '')}`
  } else {
    formattedInterviewee = formattedInterviewee[0] || ""
  }

  resultado.value = `(${formattedInterviewee}, comunicación personal, ${getFechaFormateada()})`
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
    <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Referencia para Entrevista Personal</h2>
    <p class="mb-6 text-sm text-gray-600 dark:text-gray-400 italic">
      Nota: Las entrevistas personales no se incluyen en la lista de referencias, solo se citan en el texto. Esta herramienta genera la cita parentética.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="lastname" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Apellidos del entrevistado
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
        <label for="fecha" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Fecha de la entrevista
        </label>
        <input 
          id="fecha"
          type="date" 
          v-model="fechaRaw"
          class="form-input"
        />
      </div>
    </div>

    <button 
      @click="generar"
      class="mt-6 btn-primary"
    >
      Generar cita
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

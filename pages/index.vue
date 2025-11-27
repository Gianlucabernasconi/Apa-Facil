<script setup>
  import { ref, computed, onMounted } from 'vue'
  import GeneradorLibro from '@/components/GeneradorLibro.vue'
  import GeneradorWeb from '@/components/GeneradorWeb.vue'
  import GeneradorRevista from '@/components/GeneradorRevista.vue'
  import GeneradorTesis from '@/components/GeneradorTesis.vue'
  import GeneradorReporte from '@/components/GeneradorReporte.vue'
  import GeneradorLibroEditado from '@/components/GeneradorLibroEditado.vue'
  import GeneradorConferencia from '@/components/GeneradorConferencia.vue'
  import GeneradorPeriodico from '~/components/GeneradorPeriodico.vue'
  import GeneradorEntrevista from '~/components/GeneradorEntrevista.vue'
  import GeneradorPelicula from '~/components/GeneradorPelicula.vue'
  import GeneradorRedesSociales from '~/components/GeneradorRedesSociales.vue'
  import GeneradorMaterialEducativo from '~/components/GeneradorMaterialEducativo.vue'
  import GeneradorBlog from '~/components/GeneradorBlog.vue'
  import GeneradorLey from '~/components/GeneradorLey.vue'
  import GeneradorForo from '~/components/GeneradorForo.vue'
  import GeneradorPodcast from '~/components/GeneradorPodcast.vue'
  import GeneradorTransmision from '~/components/GeneradorTransmision.vue'
  import GeneradorSoftware from '~/components/GeneradorSoftware.vue'

  const tipoSeleccionado = ref('')
  const nombre = ref('')
  const año = ref('')
  const resultado = ref('')
  const isDark = ref(false)

  function generarCita() {
  resultado.value = apaQuote(nombre.value, año.value).value
}

  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }

  onMounted(() => {
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode === 'true') {
      isDark.value = true
      document.documentElement.classList.add('dark')
    }
  })
  
 
  const componentes = {
  libro: GeneradorLibro,
  libroEditado: GeneradorLibroEditado,
  revista: GeneradorRevista,
  tesis: GeneradorTesis,
  reporte: GeneradorReporte,
  web: GeneradorWeb,
  conferencia: GeneradorConferencia,
  periodico: GeneradorPeriodico,
  entrevista: GeneradorEntrevista,
  pelicula: GeneradorPelicula,
  redesSociales: GeneradorRedesSociales,
  materialEducativo: GeneradorMaterialEducativo,
  blog: GeneradorBlog,
  ley: GeneradorLey,
  foro: GeneradorForo,
  podcast: GeneradorPodcast,
  transmision: GeneradorTransmision,
  software: GeneradorSoftware,

  }

 

  
  const componenteActual = computed(() => {
    return tipoSeleccionado.value ? componentes[tipoSeleccionado.value] : null
  })

  // SEO Meta Tags
  useHead({
    title: 'APA Fácil - Generador de Referencias APA 7ª Edición',
    meta: [
      { 
        name: 'description', 
        content: 'Generador gratuito de referencias bibliográficas en formato APA 7ª edición. Crea citas para libros, artículos, páginas web, tesis, conferencias y más de forma rápida y precisa.' 
      },
      { 
        name: 'keywords', 
        content: 'APA, referencias bibliográficas, citas APA, formato APA 7, generador APA, bibliografía, citas académicas, referencias académicas, APA 7ª edición, generador de citas' 
      }
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          'name': 'APA Fácil',
          'description': 'Generador gratuito de referencias bibliográficas en formato APA 7ª edición',
          'url': 'https://apafacil.cl',
          'applicationCategory': 'EducationalApplication',
          'operatingSystem': 'Web',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'CLP'
          },
          'featureList': [
            'Generador de referencias para libros',
            'Generador de referencias para artículos de revista',
            'Generador de referencias para páginas web',
            'Generador de referencias para tesis',
            'Generador de referencias para conferencias',
            'Generador de referencias para películas',
            'Generador de referencias para podcasts',
            'Formato APA 7ª edición'
          ],
          'inLanguage': 'es'
        })
      }
    ]
  })


  
  </script>
  


<template>
  <main class="min-h-screen py-12 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Dark Mode Toggle -->
      <div class="flex justify-end mb-6">
        <button 
          @click="toggleDarkMode"
          class="p-3 rounded-lg bg-gray-200 dark:bg-apa-dark hover:bg-gray-300 dark:hover:bg-apa-teal/20 transition-all duration-200 shadow-md hover:shadow-lg"
          aria-label="Toggle dark mode"
        >
          <svg v-if="!isDark" class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else class="w-6 h-6 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
      </div>


      <!-- Hero Section -->
      <header class="text-center mb-16">
        <h1 class="mb-6">Generador de Referencias: APA Fácil</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-4">
          Genera tus referencias bibliográficas en formato APA 7ª edición de manera fácil y rápida 😎. 
          Herramienta gratuita para estudiantes, investigadores y académicos.
        </p>
        <p class="text-base text-gray-500 dark:text-gray-500 max-w-2xl mx-auto">
          Selecciona el tipo de fuente y completa los campos requeridos para crear citas precisas y profesionales.
        </p>
      </header>


      
      <!-- Main Card -->
      <div class="bg-white dark:bg-apa-dark rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-apa-teal/30 hover:shadow-xl transition-all duration-300">
        <label for="tipo" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Selecciona el tipo de fuente
        </label>
        <select 
          id="tipo" 
          v-model="tipoSeleccionado"
          class="form-input mb-4 cursor-pointer"
        >
          <option disabled value="">-- Elige una opción --</option>

          <!-- Libros -->
          <option value="libro">📚 Libro</option>
          <option value="libroEditado">📖 Capítulo de Libro Editado</option>

          <!-- Artículos -->
          <option value="revista">🧪 Artículo Científico</option>
          <option value="periodico">📰 Artículo de Periódico o Revista Popular</option>
          <option value="blog">✍️ Entrada de Blog</option>
          <option value="web">🌐 Página Web</option>
          <option value="foro">💬 Comentario en Foro, Blog o Página</option>

          <!-- Documentos académicos -->
          <option value="tesis">🎓 Tesis o Disertación</option>
          <option value="reporte">📄 Reporte o Documento Oficial</option>
          <option value="ley">⚖️ Ley, Decreto o Normativa</option>

          <!-- Presentaciones y conferencias -->
          <option value="conferencia">🎤 Presentación o Ponencia en Conferencia</option>
          <option value="materialEducativo">📚 Material Educativo o Diapositivas</option>

          <!-- Medios y audiovisuales -->
          <option value="pelicula">🎬 Película o Video</option>
          <option value="transmision">💻 Transmisión en Vivo</option>
          <option value="podcast">🎙️ Podcast</option>

          <!-- Redes y software -->
          <option value="redesSociales">📱 Publicación en Redes Sociales</option>
          <option value="entrevista">🗣️ Entrevista Personal</option>
          <option value="software">💾 Software o Aplicación</option>
        </select>

        <!-- Dynamic Component -->
        <div v-if="componenteActual" class="mt-8 animate-fade-in">
          <component :is="componenteActual" />
        </div>
      </div>

      <!-- Citation Generator Section -->
      <div class="bg-white dark:bg-apa-dark rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-apa-teal/30 mt-16 pt-16 border-t-4 border-t-gray-200 dark:border-t-apa-teal/30">
        <h2 class="mb-4">Genera una cita en APA</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-8">
          Crea citas en texto para incluir en tu documento académico.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="nombre" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              Nombre de los autores
            </label>
            <input 
              id="nombre"
              type="text" 
              v-model="nombre" 
              placeholder="Ej: García, López"
              class="form-input"
            />
          </div>
          <div>
            <label for="año" class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              Año de publicación
            </label>
            <input 
              id="año"
              type="text" 
              v-model="año" 
              placeholder="Ej: 2023"
              class="form-input"
            />
          </div>
        </div>

        <button 
          @click="generarCita"
          class="mt-6 btn-primary"
        >
          Generar Cita
        </button>

        <div v-if="resultado" class="result-container">
          ({{ resultado }}, {{ año }})
        </div>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="bg-white dark:bg-apa-dark border-t border-gray-200 dark:border-apa-teal/20 mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex justify-center items-center space-x-6">
        <!-- GitHub -->
        <a 
          href="https://github.com/Gianlucabernasconi" 
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          aria-label="GitHub"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
          </svg>
        </a>

        <!-- Website -->
        <a 
          href="https://www.gianlucabernasconi.cl" 
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          aria-label="Website"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </a>

        <!-- Instagram -->
        <a 
          href="https://www.instagram.com/gianlucabernasconi_/" 
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          aria-label="Instagram"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
      
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
          © 2025 APA Fácil. Desarrollado por Gianluca Bernasconi
        </p>
        <p class="text-xs text-gray-400 dark:text-gray-500 max-w-2xl mx-auto">
          Generador de referencias bibliográficas en formato APA 7ª edición. 
          Herramienta gratuita para crear citas académicas de libros, artículos científicos, 
          páginas web, tesis, conferencias y más. Compatible con las normas APA actualizadas.
        </p>
      </div>
    </div>
  </footer>
</template>
  
  
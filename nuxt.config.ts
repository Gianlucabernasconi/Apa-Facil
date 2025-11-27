// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  ssr: false,



  app: {
    head: {
      htmlAttrs: {
        lang: 'es'
      },
      title: 'APA Fácil - Generador de Referencias APA 7ª Edición',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Generador gratuito de referencias bibliográficas en formato APA 7ª edición. Crea citas para libros, artículos, páginas web, tesis y más de forma rápida y precisa.'
        },
        {
          name: 'keywords',
          content: 'APA, referencias bibliográficas, citas APA, formato APA 7, generador APA, bibliografía, citas académicas, referencias académicas, APA 7ª edición'
        },
        { name: 'author', content: 'APA Fácil' },
        { name: 'robots', content: 'index, follow' },

        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'APA Fácil - Generador de Referencias APA 7ª Edición' },
        {
          property: 'og:description',
          content: 'Generador gratuito de referencias bibliográficas en formato APA 7ª edición. Crea citas para libros, artículos, páginas web, tesis y más.'
        },
        { property: 'og:locale', content: 'es_ES' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'APA Fácil - Generador de Referencias APA 7ª Edición' },
        {
          name: 'twitter:description',
          content: 'Generador gratuito de referencias bibliográficas en formato APA 7ª edición.'
        },

        // Mobile
        { name: 'theme-color', content: '#1c696c' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/bookfavicon.ico' },
        { rel: 'canonical', href: 'https://apafacil.cl' }
      ]
    }
  },

  tailwindcss: {
    config: {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
          },
          colors: {
            apa: {
              dark: '#111c22', // Azul petróleo muy oscuro
              black: '#06090b', // Negro con matiz azul grisáceo
              teal: '#1c696c', // Verde azulado intenso
            }
          }
        },
      },
    },
  },
})

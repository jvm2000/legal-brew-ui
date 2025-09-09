// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      apiBase: 'https://http://restaurolegalservices-api.com', // Laravel API
    },
    head: {
      meta: [{ name: 'csrf-token', content: '' }],
    },
  }
})
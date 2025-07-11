// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000', // Laravel API
    },
    head: {
      meta: [{ name: 'csrf-token', content: '' }],
    },
  }
})
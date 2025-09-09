// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      apiBase: 'http://128.199.156.88', // Laravel API
    },
    head: {
      meta: [{ name: 'csrf-token', content: '' }],
    },
  }
})
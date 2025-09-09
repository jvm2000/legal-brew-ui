export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  nuxtApp.provide('useCustomFetch', <T>(url: string, options: any = {}) => {
    const tokenValue = token.value?.token

    const mergedOptions = {
      ...options,
      baseURL: 'laravel.restaurolegalservices.com', // e.g. 'http://localhost:8000'
      credentials: options.credentials ?? 'include',
      headers: {
        ...(options.headers || {}),
        ...(tokenValue ? { Authorization: `Bearer ${tokenValue}` } : {}),
      },
    }

    return useFetch<T>(url, mergedOptions)
  })
})

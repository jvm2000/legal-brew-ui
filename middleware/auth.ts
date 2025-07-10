export default defineNuxtRouteMiddleware(async () => {
  const user = useState('user')
  const config = useRuntimeConfig()

  if (!user.value) {
    try {
      const fetchedUser = await $fetch('/api/user', {
        baseURL: config.public.apiBase,
        credentials: 'include',
      })
      user.value = fetchedUser

      return navigateTo('/dashboard')
    } catch {
      return navigateTo('')
    }
  }
})
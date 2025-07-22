export default defineNuxtRouteMiddleware(async () => {
  const { user: authUser, token } = useAuth()

  if (import.meta.client) {
    try {
      if (!authUser.value) {
        const user = await $fetch<any>('/api/user', {
          baseURL: 'http://localhost:8000',
          headers: {
            Authorization: `Bearer ${token.value.token}`,
          },
          credentials: 'include',
        })

        authUser.value = user
      }
    } catch (error) {
      authUser.value = null
      token.value = null
      
      return navigateTo('/')
    }
  }
})
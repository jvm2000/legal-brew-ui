export default defineNuxtRouteMiddleware(async () => {
  const { loggedIn, user: authUser } = useAuth()

  if (authUser.value && import.meta.client) {
    return navigateTo('/dashboard')
  }
})
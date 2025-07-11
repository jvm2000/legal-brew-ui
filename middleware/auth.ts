export default defineNuxtRouteMiddleware(async () => {
  const { loggedIn } = useAuth()

  if (!loggedIn.value && import.meta.client) {
    return navigateTo('')
  }
})
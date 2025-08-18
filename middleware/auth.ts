export default defineNuxtRouteMiddleware(async () => {
  const { loggedIn, getAuth } = useAuth()
  const route = useRoute()

  if (import.meta.client) {
    await getAuth()

    if (!loggedIn.value && route.path !== "/") {
      return navigateTo("/", { replace: true })
    }
  }
})
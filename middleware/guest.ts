export default defineNuxtRouteMiddleware(async () => {
  const { getAuth, loggedIn } = useAuth()
  const route = useRoute()

  if (import.meta.client) {
    await getAuth()

    if (loggedIn.value && route.path === "/") {
      return navigateTo("/dashboard", { replace: true })
    }
  }
})
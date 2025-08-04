import type { User } from "~/types/general"

export default defineNuxtRouteMiddleware(async () => {
  const { user: authUser, token } = useAuth()
  const { $useCustomFetch } = useNuxtApp()

  if (import.meta.client) {
    try {
      if (!authUser.value) {
        const user = $useCustomFetch<User>('/api/user')

        authUser.value = user?.data
      }
    } catch (error) {
      authUser.value = null
      token.value = null
      
      return navigateTo('/')
    }
  }
})
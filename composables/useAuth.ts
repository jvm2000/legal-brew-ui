import type { User } from "~/types/general"

export const useAuth = () => {
  const errors = ref<string[] | null>(null)
  const loading = ref(false)
  const user = useState<User | null>('fetchedUser', () => null)
  const token = useCookie<any>('token')
  const config = useRuntimeConfig()
  const formLogin = ref({
    email: '',
    password: ''
  })

  async function login() {
    errors.value = null

    loading.value = true

    await $fetch('/sanctum/csrf-cookie', {
      baseURL: 'laravel.restaurolegalservices.com',
      credentials: 'include',
    })

    try {
      const response = await $fetch<any>('/api/login', {
        baseURL: 'laravel.restaurolegalservices.com',
        method: 'POST',
        credentials: 'include',
          body: { 
            login: formLogin.value.email,
            password: formLogin.value.password
        },
      })
      
      token.value = response

      navigateTo('/dashboard')
    } catch (err: any) {
      errors.value = err?.data?.message || err.message || 'Login failed'
    }

    loading.value = false
  }

  async function getAuth() {
    const { $useCustomFetch } = useNuxtApp()

    const { data } = await $useCustomFetch<User>('/api/user')

    user.value = data.value ?? null
  }

  const loggedIn = computed(() => !!user.value)

  return {
    user,
    token,
    errors,
    formLogin,
    loggedIn,
    loading,
    login,
    getAuth
  }
}
import { useSessionStorage } from '@vueuse/core'

export const useAuth = () => {
  const errors = ref([])
  const user = useSessionStorage<any>('auth.user', null)
  const config = useRuntimeConfig()
  const formLogin = ref({
    email: '',
    password: ''
  })

  async function login (email: string, password: string) {
    await $fetch('/sanctum/csrf-cookie', {
      baseURL: config.public.apiBase,
      credentials: 'include',
    })

    try {
      const response = await $fetch('/api/login', {
        baseURL: config.public.apiBase,
        method: 'POST',
        credentials: 'include',
          body: { 
            email: formLogin.value.email,
            password: formLogin.value.password
        },
      })
      
      user.value = response

      navigateTo('/dashboard')
    } catch (err: any) {
    errors.value = err?.data?.message || err.message || 'Login failed'
    }
  }

  const loggedIn = computed((): boolean => {
    return !!user.value
  });

  return {
    user,
    formLogin,
    loggedIn,
    login
  }
}
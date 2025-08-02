type User = {
  id: string,
  username: string,
  full_name: string,
  contact_no: string,
  role: string,
  images: any[]
}

type Auth = {
  message: string,
  token: string,
  user: User
}

export const useAuth = () => {
  const errors = ref([])
  const loading = ref(false)
  const user = useState<User | null>('fetchedUser', () => null)
  const token = useCookie('token')

  const config = useRuntimeConfig()
  const formLogin = ref({
    email: '',
    password: ''
  })

  async function login() {
    errors.value = []

    loading.value = true

    await $fetch('/sanctum/csrf-cookie', {
      baseURL: config.public.apiBase,
      credentials: 'include',
    })

    try {
      const response = await $fetch<any>('/api/login', {
        baseURL: config.public.apiBase,
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

  const loggedIn = computed((): boolean => {
    return !!user.value
  });

  return {
    user,
    token,
    errors,
    formLogin,
    loggedIn,
    loading,
    login
  }
}
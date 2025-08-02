<script setup lang="ts">
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'
import type { Cart, Services } from '~/types/general'

type ServiceForm = {
  cart_id: string,
  name: string,
  description: string,
  price: number
}

const showToast = ref(false)
const toastMessage = ref('')
const { user: authUser } = useAuth()
const cartData = ref<Cart[]>([])
const serviceForm = ref<ServiceForm>({
  cart_id: '',
  name: '',
  description: '',
  price: 0
})
const services = ref<Services[]>([
  {
    name: 'Latte Legalizations',
    price: 500,
    description: 'Drafting of documents such as letters, special power of attorneys, promissory notes, compromise agreements, and others.',
    image: '/images/services/latte-legalization.svg'
  }, {
    name: 'Espresso Advise',
    price: 500,
    description: 'Online consultations with the lawyer.',
    image: '/images/services/espress-advise.svg'
  }, {
    name: 'Americano Agreements',
    price: 1000,
    description: 'Drafting of contracts; review of existing contracts and drafting of revised contract.',
    image: '/images/services/americano-agreements.svg'
  }, {
    name: 'Barista Grind',
    price: 2000,
    description: 'Thorough research and analysis of legal issues, study of applicable laws and statutes, and provision of legal documentation and research services.',
    image: '/images/services/barista-grind.svg'
  }, {
    name: 'Capuccino Case Files',
    price: 20000,
    description: 'Assistance with litigation of cases, including court representation and preparation of pleadings in the areas of: Labor law, Marriage and family relations, Property law, Corporate law, Immigration law.',
    image: '/images/services/cappucino-case-files.svg'
  }
])

async function fetchCart() {
  const { data } = await useFetch<Cart[]>(`/api/cart/${authUser.value?.id}`, {
    baseURL: useRuntimeConfig().public.apiBase,
    method: 'GET',
    credentials: 'include',
  })

  cartData.value = data.value ?? []
}

async function addToCart(service: Services) {
  showToast.value = true
  toastMessage.value = 'Added to cart successfully!'

  await fetchCart()

  serviceForm.value.name = service.name ?? ''
  serviceForm.value.description = service.description ?? ''
  serviceForm.value.price = service.price ?? ''

  if (!cartData.value.length) {
    const { data } = await useFetch('/api/carts', {
      baseURL: useRuntimeConfig().public.apiBase,
      method: 'POST',
      body: {
        user_id: authUser.value?.id
      },
      credentials: 'include',
    })

    serviceForm.value.cart_id = data.value?.id ?? ''

    await submitToAddToCartService()

    showToast.value = false

    return
  }

  serviceForm.value.cart_id = cartData.value[0].id ?? ''

  showToast.value = false

  await submitToAddToCartService()
}

function submitToAddToCartService() {
  const { error } = useFetch('/api/services', {
    baseURL: useRuntimeConfig().public.apiBase,
    method: 'POST',
    body: serviceForm.value,
    credentials: 'include',
  })

  serviceForm.value = {}
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).format(price)
}

await fetchCart()
</script>

<template>
  <link href="https://fonts.googleapis.com/css2?family=Merriweather&display=swap" rel="stylesheet">

  <div class="space-y-4 items-start py-4">
    <div 
      v-for="(service, index) in services"
      :key="index"
      class="flex flex-col items-start space-y-6 border-b border-custom-brown-500 pb-6"
    >
      <div class="flex items-center space-x-2">
        <div class="w-12 h-12 bg-custom-brown-300 rounded-md grid place-items-center">
          <img :src="service.image" class="w-full h-9" />
        </div>

        <div>
          <p class="text-base font-bold text-custom-brown-500 landing-login">{{ service.name }}</p>

          <p class="text-sm font-medium text-custom-brown-500">Starts at {{ formatPrice(service.price) }}</p>
        </div>
      </div>

      <p class="text-sm text-custom-brown-500 max-w-4xl w-full">{{ service.description }}</p>

      <button 
        class="bg-custom-brown-300 py-2 text-sm text-white text-center w-full rounded-md flex flex-col items-center"
      >
        <div class="flex items-center space-x-2" @click="addToCart(service)">
          <ShoppingCartIcon class="w-4 h-4 stroke-white"/>

          <span>Add to Cart</span>
        </div>
      </button>
    </div>
  </div>

  <BaseToast :show="showToast" :message="toastMessage" />
</template>

<style scoped>
.landing-login {
  font-family: 'Merriweather', serif;
}
</style>
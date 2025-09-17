<script setup lang="ts">
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'
import type { Cart, Services } from '~/types/general'
import { formatPrice } from '~/utils/price'

type ServiceForm = {
  cart_id: string,
  name: string,
  description: string,
  price: number
}

const { user: authUser } = useAuth()
const { $useCustomFetch } = useNuxtApp()

const cartData = ref<Cart[]>([])
const servicesData = ref<Services[]>([])
const serviceForm = ref<ServiceForm>({
  cart_id: '',
  name: '',
  description: '',
  price: 0
})
const services = ref<Services[]>([])
const loading = ref(false)

async function fetchMenuServices() {
  await fetchServices()

  const { data } = await $useCustomFetch<Services[]>('/api/menuservices', { 
    method: 'GET',
  })

  services.value = data.value ?? []
}

async function fetchCart() {
  const { data } = await $useCustomFetch<Cart[]>(`/api/cart/${authUser.value?.id}`, { 
    method: 'GET',
  })

  cartData.value = data.value ?? []

  if (!data.value) {
    const { data } = await $useCustomFetch('/api/carts', { 
      method: 'POST',
      body: {
        user_id: authUser.value?.id
      },
    })

    serviceForm.value.cart_id = data.value?.id ?? ''

    return
  }
}

async function fetchServices() {
  if (!cartData.value) return

  const { data } = await $useCustomFetch<Services[]>(`/api/cart/${cartData.value[0]?.id}/services`, { 
    method: 'GET',
  })

  servicesData.value = data.value ?? []
}

function isServiceInList(service: Services): boolean {
  return servicesData.value.some(s => s.name === service.name)
}

async function addToCart(service: Services) {
  await fetchCart()

  serviceForm.value.name = service.name ?? ''
  serviceForm.value.description = service.description ?? ''
  serviceForm.value.price = service.price ?? ''

  serviceForm.value.cart_id = cartData.value[0].id ?? ''

  await submitToAddToCartService()

  await fetchMenuServices()
}

async function submitToAddToCartService() {
  const { error } = await $useCustomFetch('/api/services', { 
    method: 'POST',
    body: serviceForm.value,
  })

  serviceForm.value = {
    cart_id: '',
    name: '',
    description: '',
    price: 0
  }
}

function getImage(name: string) {
  if (name === 'Latte Legalizations') return '/images/services/latte-legalization.svg'

  if (name === 'Espresso Advise') return '/images/services/espress-advise.svg'

  if (name === 'Americano Agreements') return '/images/services/americano-agreements.svg'

  if (name === 'Barista Grind') return '/images/services/barista-grind.svg'

  if (name === 'Capuccino Case Files') return '/images/services/cappucino-case-files.svg'
}

onMounted(async () => {
  loading.value = true

  await fetchCart()
  await fetchMenuServices()

  loading.value = false
})
</script>

<template>
  <link href="https://fonts.googleapis.com/css2?family=Merriweather&display=swap" rel="stylesheet">

  <div v-if="!loading" class="space-y-4 items-start py-4 px-6 sm:px-0">
    <div 
      v-for="service in services"
      :key="service.name"
      class="flex flex-col items-start space-y-6 border-b border-custom-brown-500 pb-6"
    >
      <div class="flex items-center space-x-2">
        <div class="w-12 h-12 bg-custom-brown-300 rounded-md grid place-items-center">
          <img :src="getImage(service.name)" class="w-full h-9" />
        </div>

        <div>
          <p class="text-base font-bold text-custom-brown-500 landing-login">{{ service.name }}</p>

          <p class="text-sm font-medium text-custom-brown-500">Starts at {{ formatPrice(service.price) }}</p>
        </div>
      </div>

      <p class="text-sm text-custom-brown-500 max-w-4xl w-full">{{ service.description }}</p>

      <button 
        class="py-2 text-sm text-center w-full rounded-md flex flex-col items-center"
        :class="[isServiceInList(service) ? 'bg-transparent border border-custom-brown-300 text-custom-brown-500' : 'bg-custom-brown-300 text-white']"
        @click="addToCart(service)"
        :disabled="isServiceInList(service)"
      >
        <div class="flex items-center space-x-2">
          <ShoppingCartIcon 
            class="w-4 h-4"
            :class="[isServiceInList(service) ? 'hidden' : 'stroke-white block']"
          />

          <span>{{ isServiceInList(service) ? 'Added' : 'Add to Cart'}}</span>
        </div>
      </button>
    </div>
  </div>

  <BaseLoading :isLoading="loading" />
</template>

<style scoped>
.landing-login {
  font-family: 'Merriweather', serif;
}
</style>
<script setup lang="ts">
import { ShoppingCartIcon, PencilIcon } from '@heroicons/vue/24/outline'
import type { Cart, Services, SubService } from '~/types/general'

type ServiceForm = {
  cart_id: string,
  menu_services_id: string,
  details: string,
}

const { user: authUser } = useAuth()
const { openEditModal } = useMenuServices()
const { $useCustomFetch } = useNuxtApp()

const cartData = ref<Cart[]>([])
const servicesData = ref<Services[]>([])
const serviceForm = ref<ServiceForm>({
  cart_id: '',
  menu_services_id: '',
  details: '',
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

  if (!cartData.value.length) {
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

function isServiceInList(service: SubService): boolean {
  return servicesData.value.some(s => s.details === service.details)
}

async function addToCart(service: SubService, parentServiceId: string) {
  await fetchCart()

  serviceForm.value.menu_services_id = parentServiceId ?? ''
  serviceForm.value.details = service.details ?? ''
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
    menu_services_id: '',
    details: '',
  }
}

function formatPesos(text: string): string {
  // Replace peso amounts with a span having font-medium
  return text.replace(/(₱[\d,]+(?:\.\d{2})?)/g, '<span class="font-medium">$1</span>')
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
      <div>
        <p class="text-base font-bold text-custom-brown-500 landing-login">{{ service.description }}</p>
      </div>

      <div v-for="item in service.sub_services" class="space-y-6 w-full">
        <p class="text-sm text-custom-brown-500">
          <span class="w-1.5 h-1.5 rounded-full bg-custom-brown-500 mt-1 mr-2 inline-block"></span>
          <span v-html="formatPesos(item.details)"></span>
        </p>

        <button 
          v-if="authUser?.role === 'admin'"
          class="py-2 text-sm text-center w-full rounded-md flex flex-col items-center bg-custom-brown-300 text-white"
          @click="openEditModal(item)"
        >
          <div class="flex items-center space-x-2">
            <PencilIcon 
              class="w-4 h-4 stroke-white block"
            />

            <span>Edit</span>
          </div>
        </button>

        <button 
          v-if="authUser?.role === 'client'"
          class="py-2 text-sm text-center w-full rounded-md flex flex-col items-center"
          :class="[isServiceInList(item) ? 'bg-transparent border border-custom-brown-300 text-custom-brown-500' : 'bg-custom-brown-300 text-white']"
          @click="addToCart(item, service?.id)"
          :disabled="isServiceInList(item)"
        >
          <div class="flex items-center space-x-2">
            <ShoppingCartIcon 
              class="w-4 h-4"
              :class="[isServiceInList(item) ? 'hidden' : 'stroke-white block']"
            />

            <span>{{ isServiceInList(item) ? 'Added' : 'Add to Cart'}}</span>
          </div>
        </button>
      </div>
    </div>
  </div>

  <BaseLoading :isLoading="loading" />
  <ModalEditMenuServices @success="fetchMenuServices" />
</template>

<style scoped>
.landing-login {
  font-family: 'Merriweather', serif;
}
</style>
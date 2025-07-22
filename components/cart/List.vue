<script setup lang="ts">
import { ArrowLongLeftIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import type { Cart, Post, Services } from '~/types/general'

const { user: authUser } = useAuth()
const cartData = ref<Cart[]>([])
const servicesData = ref<Services[]>([])

async function fetchCart() {
  const { data } = await useFetch<Cart[]>(`/api/cart/${authUser.value?.id}`, {
    baseURL: useRuntimeConfig().public.apiBase,
    method: 'GET',
    credentials: 'include',
  })  

  cartData.value = data.value ?? []

  await fetchServices()
}

async function fetchServices() {
  const { data } = await useFetch<Services[]>(`/api/cart/${cartData.value[0].id}/services`, {
    baseURL: useRuntimeConfig().public.apiBase,
    method: 'GET',
    credentials: 'include',
  })

  servicesData.value = data.value ?? []
}

function getImage(name: string) {
  if (name === 'Latte Legalizations') return '/images/services/latte-legalization.svg'

  if (name === 'Espresso Advise') return '/images/services/espress-advise.svg'

  if (name === 'Americano Agreements') return '/images/services/americano-agreements.svg'

  if (name === 'Barista Grind') return '/images/services/barista-grind.svg'

  if (name === 'Capuccino Case Files') return '/images/services/cappucino-case-files.svg'
}

await fetchCart()
</script>

<template>
  <div class="max-w-6xl w-full bg-white rounded-md p-6">
    <div class="grid grid-cols-2">
      <div class="flex flex-col items-start space-y-6">
        <div class="flex items-center space-x-2 cursor-pointer" @click="navigateTo('dashboard')">
          <ArrowLongLeftIcon class="w-6 h-6 stroke-custom-brown-500" />

          <p class="text-sm text-custom-brown-500 font-medium">Back</p>
        </div>

        <div class="w-full px-4">
          <p class="text-2xl font-semibold">Your Cart</p>
        </div>

        <div v-for="service in servicesData" class="flex items-center w-full justify-between px-4 pb-6 border-b border-b-custom-brown-200">
          <div class="flex items-center space-x-2">
            <div class="w-14 h-14 bg-custom-brown-300 rounded-md grid place-items-center">
              <img :src="getImage(service.name)" class="w-full h-9" />
            </div>

            <div class="space-y-0.5">
              <p class="text-base text-custom-brown-500 font-medium">{{ service.name }}</p>

              <p class="text-sm font-medium">Starts at P{{ service.price }}</p>
            </div>
          </div>

          <XMarkIcon class="w-6 h-6 stroke-custom-brown-500" />
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>
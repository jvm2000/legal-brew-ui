<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/24/outline'
import type { Cart, Services } from '~/types/general'

const { isOpenSuccessModal, appointmentForm } = usePayment()
const cartData = ref<Cart[]>([])
const servicesData = ref<Services[]>([])
const { $useCustomFetch } = useNuxtApp()
const { user: authUser } = useAuth()
const showToast = ref(false)
const toastMessage = ref('')

async function submitPayment() {
  showToast.value = true
  toastMessage.value = 'Added Appointment Successfully!'

  servicesData.value.forEach((service: Services) => {
    appointmentForm.value.services.push(service?.id)
  })

  const { data } = await $useCustomFetch('/api/appointments', { 
    method: 'POST',
    body: appointmentForm
  })

  appointmentForm.value = {}

  await $useCustomFetch('/api/carts', { 
    method: 'DELETE',
  })

  showToast.value = false
  isOpenSuccessModal.value = false

  navigateTo('/dashboard')
}

async function fetchCart() {
  const { data } = await $useCustomFetch<Cart[]>(`/api/cart/${authUser.value?.id}`, { 
    method: 'GET',
  })

  cartData.value = data.value ?? []

  if (data.value) await fetchServices()
}

async function fetchServices() {
  const { data } = await $useCustomFetch<Services[]>(`/api/cart/${cartData.value[0].id}/services`, { 
    method: 'GET',
  })

  servicesData.value = data.value ?? []
}
</script>

<template>
  <BaseModal
    :open="isOpenSuccessModal"
    size="lg"
    @before-enter="fetchCart"
    @close="isOpenSuccessModal = false"
  >
    <template #header></template>

    <div class="w-full flex flex-col items-center space-y-6">
      <div class="bg-green-400 grid place-items-center w-16 h-16 rounded-full">
        <CheckIcon class="w-6 h-6 stroke-white" />
      </div>

      <p class="text-2xl font-semibold text-custom-brown-500">Payment Successful</p>

      <div class="w-24">
        <BaseButton @click="submitPayment">Close</BaseButton>
      </div>
    </div>
  </BaseModal>

  <BaseToast :show="showToast" :message="toastMessage" />
</template>
<script setup lang="ts">
import { ArrowLongLeftIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import type { Cart, Services } from '~/types/general'
import { usePayment } from '~/composables/usePayment'

const { user: authUser } = useAuth()
const cartData = ref<Cart[]>([])
const servicesData = ref<Services[]>([])
const loading = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const { appointmentForm, isAlreadyExistedModal } = usePayment()
const selectedTime = ref<string>('')
const consultationType = ref<string>('office')
const officeTimeSlots = [
  { label: '10:00 AM', value: '10:00' },
  { label: '11:00 AM', value: '11:00' },
  { label: '1:00 PM', value: '13:00' },
  { label: '2:00 PM', value: '14:00' },
  { label: '3:00 PM', value: '15:00' }
]
const onlineTimeSlots = [
  { label: '10:00 AM', value: '10:00' },
  { label: '11:00 AM', value: '11:00' },
  { label: '1:00 PM', value: '13:00' },
  { label: '2:00 PM', value: '14:00' },
  { label: '3:00 PM', value: '15:00' },
  { label: '4:00 PM', value: '16:00' },
  { label: '5:00 PM', value: '17:00' }
]
const checkList = ref<any>(null)
const { $useCustomFetch } = useNuxtApp()

async function fetchCart() {
  const { data } = await $useCustomFetch<Cart[]>(`/api/cart/${authUser.value?.id}`, { 
    method: 'GET',
  })

  cartData.value = data.value ?? []

  if (data.value) await fetchServices()
}

async function fetchServices() {
  if (!cartData.value.length) return

  const { data } = await $useCustomFetch<Services[]>(`/api/cart/${cartData.value[0].id}/services`, { 
    method: 'GET',
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

function selectConsultationType(type: string) {
  consultationType.value = type
}

const timeSlots = computed(() => {
  if (consultationType.value === 'office') return officeTimeSlots

  if (consultationType.value === 'online') return onlineTimeSlots
})

function selectTime(value: string) {
  selectedTime.value = value
}

async function proceedToPayment() {
  const { formatDateString } = useFormat()
  loading.value = true

  appointmentForm.value.scheduledTime = selectedTime.value
  appointmentForm.value.setup = consultationType.value

  const { data } = await $useCustomFetch('/api/appointments/check-availability', { 
    method: 'POST',
    body: {
      scheduledDay: formatDateString(appointmentForm.value.scheduledDay),
      scheduledTime: selectedTime.value
    },
  })

  checkList.value = data.value

  loading.value = false

  if (checkList.value.exists) {
    isAlreadyExistedModal.value = true

    return
  }

  await navigateTo('/cart/payment')
}

async function deleteService(service: Services) {
  showToast.value = true
  toastMessage.value = 'Removed Service Successfully!'

  const { error } = await $useCustomFetch(`/api/services/${service.id}`, { 
    method: 'DELETE',
  })

  showToast.value = false

  await fetchServices()
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).format(price)
}

const isButtonDisabled = computed<boolean>(() => {
  if (!appointmentForm.value.scheduledDay || !selectedTime.value) return true

  return false
})

await fetchCart()
</script>

<template>
  <div class="max-w-6xl w-full bg-white rounded-md p-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 sm:divide-x-2 divide-custom-brown-200">
      <div class="flex flex-col items-start space-y-6 px-2 sm:px-0 sm:pl-4 sm:pr-14">
        <div class="flex items-center space-x-2 cursor-pointer" @click="navigateTo('dashboard')">
          <ArrowLongLeftIcon class="w-6 h-6 stroke-custom-brown-500" />

          <p class="text-sm text-custom-brown-500 font-medium">Back</p>
        </div>

        <div class="w-full">
          <p class="text-2xl font-semibold">Your Cart</p>
        </div>

        <div v-for="service in servicesData" class="flex items-center w-full justify-between pb-6 border-b border-b-custom-brown-200">
          <div class="flex items-center space-x-2">
            <div class="w-14 h-14 bg-custom-brown-300 rounded-md grid place-items-center">
              <img :src="getImage(service.name)" class="w-full h-9" />
            </div>

            <div class="space-y-0.5">
              <p class="text-base text-custom-brown-500 font-medium">{{ service.name }}</p>

              <p class="text-sm font-medium">Starts at {{ formatPrice(service.price) }}</p>
            </div>
          </div>

          <XMarkIcon class="w-6 h-6 stroke-custom-brown-500 cursor-pointer" @click="deleteService(service)" />
        </div>
      </div>

      <div class="py-6 sm:py-2 px-2 sm:px-8 flex flex-col items-start space-y-4">
        <p class="text-lg text-custom-brown-500 font-medium">Setup</p>

        <div class="grid grid-cols-2 gap-x-2 w-full">
          <button 
            class="text-center w-full rounded-md py-1.5 text-sm"
            :class="[consultationType === 'office' ? 'bg-custom-brown-300 text-white' : 'bg-transparent text-custom-brown-500 border border-custom-brown-500']"
            @click="selectConsultationType('office')"
          >Office</button>

          <button 
            class="text-center w-full rounded-md py-1.5 text-sm"
            :class="[consultationType === 'online' ? 'bg-custom-brown-300 text-white' : 'bg-transparent text-custom-brown-500 border border-custom-brown-500']"
            @click="selectConsultationType('online')"
          >Online</button>
        </div>

        <p class="text-sm text-custom-brown-500 font-medium">Available Day</p>

        <BaseCalendar v-model="appointmentForm.scheduledDay" :type="consultationType" />

        <p class="text-sm text-custom-brown-500 font-medium">Available Time</p>

        <div class="flex flex-wrap gap-2">
          <button
            v-for="(slot, index) in timeSlots"
            :key="index"
            class="border rounded-lg px-8 py-1.5 text-sm border-custom-brown-300"
            :class="[
              'border rounded-lg px-8 py-1.5 text-sm border-custom-brown-300',
              selectedTime === slot.value
                ? 'bg-custom-brown-300 text-white'
                : 'text-custom-brown-300  '
            ]"
            @click="selectTime(slot.value)"
          >
            {{ slot.label }}
          </button>
        </div>

        <div class="w-full">
          <BaseButton
            :isLoading="loading"
            @click="proceedToPayment"
            :disabled="isButtonDisabled"
          >Proceed to payment</BaseButton>
        </div>
      </div>
    </div>
  </div>

  <CartAlreadyExistedModal />
  
  <BaseToast :show="showToast" :message="toastMessage" />
</template>
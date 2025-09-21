<script setup lang="ts">
import { ArrowLongLeftIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import type { Cart, Services, SubService } from '~/types/general'

const { appointmentForm, isAlreadyExistedModal } = usePayment()
const { user: authUser } = useAuth()
const { $useCustomFetch } = useNuxtApp()
const { isOpenSuccessModal } = usePayment()

const cartData = ref<Cart[]>([])
const servicesData = ref<Services[]>([])
const loading = ref(false)
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

async function proceedToAppointment() {
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

  isOpenSuccessModal.value = true
}

async function deleteService(service: SubService) {
  if (loading.value) return
  
  loading.value = true

  const { error } = await $useCustomFetch(`/api/services/${service.id}`, { 
    method: 'DELETE',
  })

  loading.value = false

  await fetchServices()
}

const isButtonDisabled = computed<boolean>(() => {
  if (!appointmentForm.value.scheduledDay || !selectedTime.value) return true

  return false
})

const servicesCategorized = computed<Services[]>(() =>
  Object.values(
    servicesData.value.reduce((acc, service) => {
      const { menu_service, id, details, cart_id, appointment_id, created_at, updated_at } = service;
      if (!menu_service) return acc

      const menuServiceId = menu_service.id
      acc[menuServiceId] ??= { ...menu_service, sub_services: [] }
      acc[menuServiceId].sub_services.push({ id, details, cart_id, appointment_id, created_at, updated_at })

      return acc
    }, {} as Record<string, any>)
  )
)

function formatPesos(text: string): string {
  // Replace peso amounts with a span having font-medium
  return text.replace(/(₱[\d,]+(?:\.\d{2})?)/g, '<span class="font-medium">$1</span>')
}

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

        <div v-for="service in servicesCategorized" class="flex items-center w-full justify-between pb-6 border-b border-b-custom-brown-200">
          <div class="space-y-2 w-full">
            <div class="flex items-center space-x-2">
              <div class="space-y-0.5 w-full">
                <div class="flex items-center justify-between w-full">
                  <p class="text-base text-custom-brown-500 font-medium">{{ service.name }}</p>
                </div>

                <p class="text-sm">{{ service.description }}</p>
              </div>
            </div>

            <div v-for="item in service.sub_services" class="space-y-6 w-full">
              <p class="text-sm text-custom-brown-500 flex items-start">
                <span class="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-custom-brown-500 mt-2 mr-2 inline-block"></span>
                
                <span class="flex-1 flex items-center">
                  <span v-html="formatPesos(item.details)" class="whitespace-pre-line"></span>
                  <button @click="deleteService(item)" class="ml-2">
                    <XMarkIcon class="w-4 h-4 stroke-custom-brown-500" />
                  </button>
                </span>
              </p>
            </div>
          </div>
        </div>

        <div v-if="!servicesData.length" class="flex flex-col items-center w-full space-y-4">
          <img src="/images/empty-cart.svg" />

          <p claas="text-sm text-custom-brown-500 font-medium">Your cart is empty</p>
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
            @click="proceedToAppointment"
            :disabled="isButtonDisabled"
          >Make Appointment</BaseButton>
        </div>
      </div>
    </div>
  </div>

  <CartAlreadyExistedModal />
  <ModalSuccessPayment />
</template>
<script setup lang="ts">
import { ArrowLongLeftIcon } from '@heroicons/vue/24/outline'
import type { Cart, Services } from '~/types/general'
import { loadStripe } from '@stripe/stripe-js'

const showToast = ref(false)
const toastMessage = ref('')
const { user: authUser } = useAuth()
const { appointmentForm } = usePayment()
const { isOpenSuccessModal } = usePayment()
const cartData = ref<Cart[]>([])
const servicesData = ref<Services[]>([])

const stripePromise = loadStripe('pk_test_51RnrvXIz34glyNofqQSAhcHQlTZGg9fDRHyQKcQ0KspR5k6Awot9YT7PCzuLr4R5MtN0Oe2wUzuTGddXcFWPqoij00rLsvPKYt')
const cardElement = ref(null)
let stripe: any = null
let elements: any = null
let card: any = null
const cardNumberElement = ref<HTMLElement | null>(null)
const cardExpiryElement = ref<HTMLElement | null>(null)
const cardCvcElement = ref<HTMLElement | null>(null)
const cardholderName = ref('')
let cardNumber: any = null
let cardExpiry: any = null
let cardCvc: any = null
const style = {
  base: {
    fontSize: '14px',
    color: '#1a202c',
    '::placeholder': {
      color: '#a0aec0',
    },
  },
  invalid: {
    color: '#e53e3e',
  },
}
const { formatDate, formatTime } = useFormat()
const { $useCustomFetch } = useNuxtApp()

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

async function pay() {
  const { data } = await $fetch<any>('/api/create-payment-intent', {
    method: 'POST',
    body: { amount: 100 },
  })

  const result = await stripe.confirmCardPayment(data.clientSecret, {
    payment_method: {
      card: card,
    },
  })

  if (result.error) {
    console.error(result.error.message)
  } else if (result.paymentIntent.status === 'succeeded') {
    alert('Payment succeeded!')
  }
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).format(price)
}

async function payWithGCash() {
  showToast.value = true
  toastMessage.value = 'Transaction on progress'

  try {
    const { data } = await $useCustomFetch('/api/pay/gcash', { 
      method: 'POST',
      body: {
        amount: totalPrice,
        description: 'gcash-pay',
        remarks: 'gcash-pay',
      }
    })

    const popup = window.open(data.value.checkout_url, '_blank')

    if (popup) {
      const popupChecker = setInterval(() => {
        if (popup.closed) {
          clearInterval(popupChecker)
          isOpenSuccessModal.value = true
        }
      }, 500)
    }
  } catch (error) {
    console.error('GCash Payment Failed:', error)
  }

  showToast.value = false
}

const totalPrice = computed<number>(() => {
  return servicesData.value.reduce((total, service) => {
    return total + (service.price || 0)
  }, 0)
})

onMounted(async () => {
  stripe = await stripePromise
  elements = stripe.elements()

  cardNumber = elements.create('cardNumber', { style })
  cardExpiry = elements.create('cardExpiry', { style })
  cardCvc = elements.create('cardCvc', { style })

  cardNumber.mount(cardNumberElement.value!)
  cardExpiry.mount(cardExpiryElement.value!)
  cardCvc.mount(cardCvcElement.value!)

  if (cardElement.value) {
    card.mount(cardElement.value)
  } else {
    console.error('cardElement is not mounted yet.')
  }
})

await fetchCart()
</script>

<template>
  <div class="max-w-6xl w-full bg-white rounded-md p-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 sm:divide-x-2 divide-custom-brown-200">
      <div class="flex flex-col items-start space-y-6 pl-4 pr-14">
        <div class="flex items-center space-x-2 cursor-pointer" @click="navigateTo('/cart')">
          <ArrowLongLeftIcon class="w-6 h-6 stroke-custom-brown-500" />

          <p class="text-sm text-custom-brown-500 font-medium">Back</p>
        </div>

        <p class="text-2xl font-semibold">Order Summary</p>

        <div>
          <p class="text-base text-custom-brown-500">Date: <span class="font-medium">{{ formatDate(appointmentForm.scheduledDay) }}</span></p>

          <p class="text-base text-custom-brown-500">Time: <span class="font-medium">{{ formatTime(appointmentForm.scheduledTime) }}</span></p>

          <p class="text-base text-custom-brown-500">Setup: <span class="font-medium capitalize">{{ appointmentForm.setup }}</span></p>
        </div>

        <div class="w-full">
          <div 
            v-for="(service, index) in servicesData"
            class="w-full justify-between flex items-center pb-2.5"
            :class="[index === servicesData.length - 1 ? 'border-b border-gray-300' : '']"
          >
            <p class="text-sm font-semibold text-custom-brown-500">{{ service.name }}</p>

            <p class="text-sm font-semibold text-custom-brown-500">{{ formatPrice(service.price) }}</p>
          </div>

          <div class="justify-end w-full flex">
            <div class="flex items-center space-x-4 py-2.5">
              <p class="text-sm font-semibold text-custom-brown-500">Total:</p>

              <p class="text-sm font-semibold text-custom-brown-500">{{ formatPrice(totalPrice) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="py-2 px-8 flex flex-col items-start space-y-6 w-full">
        <p class="text-custom-brown-500 text-lg font-medium">Enter payment details</p>

        <div class="w-full">
          <label class="block text-sm font-medium text-custom-brown-500 mb-1">Name on Card</label>
          <input
            type="text"
            placeholder="Enter Name"
            class="w-full border rounded-md p-2 text-sm"
          />
        </div>

        <div class="w-full">
          <label class="block text-sm font-medium text-custom-brown-500 mb-1">Card Number</label>
          <div ref="cardNumberElement" class="w-full border rounded-md p-2 text-sm"></div>
        </div>

        <div class="grid grid-cols-2 gap-4 w-full">
          <div>
            <label class="block text-sm font-medium text-custom-brown-500 mb-1">Expiration Date</label>
            <div ref="cardExpiryElement" class="w-full border rounded-md p-2 text-sm"></div>
          </div>

          <div>
            <label class="block text-sm font-medium text-custom-brown-500 mb-1">CVC</label>
            <div ref="cardCvcElement" class="w-full border rounded-md p-2 text-sm"></div>
          </div>
        </div>

        <div class="p-4 flex items-center justify-between bg-custom-brown-200 w-full rounded-md">
          <p class="text-sm font-medium text-custom-brown-500">Total: {{ formatPrice(totalPrice) }}</p>

          <div class="w-24">
            <BaseButton @click="submitPayment">
              Proceed
            </BaseButton>
          </div>
        </div>

        <div class="w-full justify-between space-x-2 flex items-center">
          <div class="h-[1px] w-full bg-custom-brown-200"></div>

          <p class="text-sm text-custom-brown-300 whitespace-nowrap">Or pay with</p>

          <div class="h-[1px] w-full bg-custom-brown-200"></div>
        </div>

        <div class="grid grid-cols-2 gap-4 w-full">
          <button 
            class="border border-blue-300 p-4 w-full flex items-center space-x-4 rounded-lg"
            @click="payWithGCash"
          >
            <img src="/images/payments/gcash.svg" />

            <p class="text-custom-brown-500 font-bold">Gcash</p>
          </button>

          <button 
            class="border border-blue-300 p-4 w-full flex items-center space-x-4 rounded-lg"
            @click="payWithGCash"
          >
            <img src="/images/payments/paymaya.svg" />

            <p class="text-custom-brown-500 font-bold">Maya</p>
          </button>
        </div>
      </div>
    </div>
  </div>

  <BaseToast :show="showToast" :message="toastMessage" />

  <ModalSuccessPayment />
</template>
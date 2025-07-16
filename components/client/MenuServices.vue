<script setup lang="ts">
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'

type Services = {
  label: string,
  price: string,
  description: string,
  image: string
}

const services = ref<Services[]>([
  {
    label: 'Latte Legalizations',
    price: '500',
    description: 'Drafting of documents such as letters, special power of attorneys, promissory notes, compromise agreements, and others.',
    image: '/images/services/latte-legalization.svg'
  }, {
    label: 'Espresso Advise',
    price: '500',
    description: 'Online consultations with the lawyer.',
    image: '/images/services/espress-advise.svg'
  }, {
    label: 'Americano Agreements',
    price: '1,000',
    description: 'Drafting of contracts; review of existing contracts and drafting of revised contract.',
    image: '/images/services/americano-agreements.svg'
  }, {
    label: 'Barista Grind',
    price: '2,000',
    description: 'Thorough research and analysis of legal issues, study of applicable laws and statutes, and provision of legal documentation and research services.',
    image: '/images/services/barista-grind.svg'
  }, {
    label: 'Capuccino Case Files',
    price: '20,000',
    description: 'Assistance with litigation of cases, including court representation and preparation of pleadings in the areas of: Labor law, Marriage and family relations, Property law, Corporate law, Immigration law.',
    image: '/images/services/cappucino-case-files.svg'
  }
])
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
          <p class="text-base font-bold text-custom-brown-500 landing-login">{{ service.label }}</p>

          <p class="text-sm font-medium text-custom-brown-500">Starts at P {{ service.price }}</p>
        </div>
      </div>

      <p class="text-sm text-custom-brown-500 max-w-4xl w-full">{{ service.description }}</p>

      <button 
        class="bg-custom-brown-300 py-2 text-sm text-white text-center w-full rounded-md flex flex-col items-center"
      >
        <div class="flex items-center space-x-2">
          <ShoppingCartIcon class="w-4 h-4 stroke-white"/>

          <span>Add to Cart</span>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.landing-login {
  font-family: 'Merriweather', serif;
}
</style>
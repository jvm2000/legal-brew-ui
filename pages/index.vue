<script setup lang="ts">
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'

type Services = {
  label: string,
  price: string,
  description: string,
  image: string
}

const { container, startDrag, endDrag, handleDrag, data } = useScroll()
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

const events = ref([
  { label: 'Webinars', image: '/images/events/webinars.svg' },
  { label: 'Seminars and Trainings', image: '/images/events/seminars.svg' },
  { label: 'Online Discussions', image: '/images/events/discussions.svg' }
])

const materials = ref([
  { 
    description: 'Yorem ipsum dolor sit amet, consectetur adipiscing elit.',
    author: 'Author Name',
    date: 'July 07, 2025',
    image: '/images/materials/1.svg'
  }, { 
    description: 'Yorem ipsum dolor sit amet, consectetur adipiscing elit.',
    author: 'Author Name',
    date: 'July 07, 2025',
    image: '/images/materials/2.svg'
  }, { 
    description: 'Yorem ipsum dolor sit amet, consectetur adipiscing elit.',
    author: 'Author Name',
    date: 'July 07, 2025',
    image: '/images/materials/3.svg'
  }, { 
    description: 'Yorem ipsum dolor sit amet, consectetur adipiscing elit.',
    author: 'Author Name',
    date: 'July 07, 2025',
    image: '/images/materials/4.svg'
  }
])
const { user, errors, formLogin, login } = useAuth()

definePageMeta({
  layout: 'landing',
  middleware: 'guest'
})
</script>

<template>
  <link rel="preconnect" href="https://rsms.me/" />
  <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
  <link href="https://fonts.googleapis.com/css2?family=Merriweather&display=swap" rel="stylesheet">

  <div class="app-container overflow-x-hidden">
    <div class="w-full bg-[#EDE0D4] flex items-center justify-between drop-shadow-sm px-44">
      <div class="flex items-center space-x-4 py-6">
        <img src="/images/logo-landing.svg" />

        <div class="space-y-2">
          <img src="/images/logo-landing-text1.svg" />

          <div class="w-28 h-[2px] bg-black" />

          <img src="/images/logo-landing-text2.svg" />
        </div>
      </div>

      <div class="flex items-center space-x-10">
        <p class="text-sm text-[#3A1F09] font-medium">Home</p>
        <p class="text-sm text-[#3A1F09] font-medium">About Us</p>
        <p class="text-sm text-[#3A1F09] font-medium">Menu of Services</p>
        <p class="text-sm text-[#3A1F09] font-medium">Events</p>
        <p class="text-sm text-[#3A1F09] font-medium">Resource Materials</p>
        <p class="text-sm text-[#3A1F09] font-medium">Contact Us</p>
        <p class="text-sm text-[#3A1F09] font-medium">Donate</p>

        <button>
          <img src="/images/shop-icon-landing.svg" />
        </button>
      </div>
    </div>

    <div class="pt-36 pb-24 flex items-center relative pl-64 max-w-full">
      <div class="space-y-6">
        <div class="border-b pb-6 border-custom-brown-500 space-y-1 w-[466px]">
          <p class="text-[48px] landing-login font-bold text-border-custom-brown-500">The Legal Brew</p>

          <p class="text-2xl font-medium text-border-custom-brown-500">Justice Brewed Right</p>
        </div>

        <div class="space-y-4 w-72">
          <BaseInput 
            v-model="formLogin.email" 
            label="Username or email" 
            placeholder="Enter username or email" 
          />

          <BaseInput 
            v-model="formLogin.password" 
            type="password"
            label="Password"
            placeholder="Enter password"
            :error="errors"
          />
        </div>

        <button @click="login" class="bg-custom-brown-500 py-2 text-sm text-white text-center w-24 rounded-md">Login</button>

        <p class="text-sm">
          <span class="text-custom-brown-400">Don't have an account?</span> <span class="text-custom-brown-500">Sign Up</span>
        </p>
      </div>

        <img src="/images/woman.svg" alt="" class="absolute right-64 bottom-0 z-[3]">
        <img src="/images/shape-elipse-landing.svg" class="absolute z-[2] top-48 right-[340px]">
        <img src="/images/shape-rectangle-landing.svg" class="absolute z-[0] bottom-0 right-60">
    </div>

    <div class="flex flex-col items-center py-8 bg-custom-brown-500">
      <div class="max-w-5xl w-full flex items-center space-x-20">
        <img src="/images/about-us.svg" />

        <div class="space-y-6">
          <p class="text-2xl landing-login text-white font-bold">About Us</p>

          <p class="text-sm text-white">
            At The Legal Brew, we're driven to shatter barriers and democratize access to justice.
          </p>

          <p class="text-sm text-white">
            By harnessing the power of digital technology, we're committed to bridging the gap in legal services, reaching underserved individuals, areas and communities, and empowering individuals with our flexible scheduling and remote consultations for legal assistance.
          </p>

          <p class="text-sm text-white">
            All information shared in this site are treated with utmost confidentiality.
          </p>
        </div>
      </div>
    </div>1

    <div class="flex flex-col items-center py-24">
      <div class="space-y-6 max-w-5xl w-full">
        <p class="text-xl landing-login text-custom-brown-500 font-bold">Menu of Services</p>

        <div>
          <p class="text-sm text-custom-brown-500">*Services can be bundled or served ala carte.</p>
          <p class="text-sm text-custom-brown-500">*All rates depend on the duration, novelty and difficulty of the client’s legal needs.</p>
        </div>

        <div 
          v-for="(service, index) in services"
          :key="index"
          class="flex items-center justify-between border-b border-custom-brown-500 pb-8"
        >
          <div class="flex items-center space-x-8">
            <div class="w-24 h-24 bg-custom-brown-300 rounded-md grid place-items-center">
              <img :src="service.image" />
            </div>

            <div class="space-y-4">
              <p class="text-xl font-bold text-custom-brown-500 landing-login">{{ service.label }}</p>

              <p class="text-sm font-bold text-custom-brown-500">Starts at P {{ service.price }}</p>

              <p class="text-sm text-custom-brown-500 max-w-2xl w-full">{{ service.description }}</p>
            </div>
          </div>

          <button 
            class="bg-[#7F5539] py-2 text-sm text-white flex flex-col items-center w-40 h-10 rounded-md"
          >
            <div class="flex items-center space-x-2">
              <ShoppingCartIcon class="w-4 h-4 stroke-white" /> 
              <span class="text-sm mt-0.5">Add to Cart</span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center pb-24">
      <div class="space-y-10 max-w-5xl w-full">
        <p class="text-2xl landing-login text-custom-brown-500 w-full text-center font-bold">Events</p>

        <div class="grid grid-cols-3 gap-x-16">
          <div v-for="event in events" class="rounded-md overflow-hidden justify-center bg-custom-brown-200 shadow-lg">
            <img :src="event.image" class="object-fill" />

            <p class="text-base text-custom-brown-500 text-center w-full py-4">{{ event.label }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center py-24">
      <div class="w-full flex items-center relative justify-between">
        <div></div>
        <div class="w-[615px] h-[529px] bg-custom-brown-400 rounded-l-md"></div>

        <div 
          ref="container"
          @mousedown="startDrag" 
          @mousemove="handleDrag" 
          @mouseup="endDrag" 
          @mouseleave="endDrag"
          class="absolute top-12 left-64 horizontal z-20 cursor-pointer prevent-select" 
        >
          <div
            :style="{ transform: `translateX(${data.scrollX}px)` }"
            class="flex flex-col space-y-10"
          >
            <div class="flex items-center space-x-4">
              <p class="text-2xl text-custom-brown-500 font-bold landing-login">Resource Materials</p>
            </div>

            <div class="flex items-center space-x-6">
              <div 
                v-for="material in materials" 
                class="bg-white w-[356px] rounded-xl drop-shadow-xl overflow-hidden" aria-readonly="true"
              >
                 <img :src="material.image" class="object-fit">

                 <div class="p-4 space-y-4">
                  <p class="text-custom-brown-500 text-base">{{ material.description }}</p>

                  <div>
                    <p class="text-custom-brown-500 font-medium text-xs">By {{ material.author }}</p>
                    <p class="text-custom-brown-500 text-[12px]">{{ material.date }}</p>
                  </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  background-color: #FAF1E9;
  min-height: 100vh;
}

.landing-login {
  font-family: 'Merriweather', serif;
}

.container {
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
}

.content {
  display: inline-block;
}

.prevent-select {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}
</style>
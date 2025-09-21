<script setup lang="ts">
import { HeartIcon } from '@heroicons/vue/24/outline'
import type { Post } from '~/types/general'

type Services = {
  label: string,
  price: string,
  description: string,
  image: string
}

const { getPosts, landingPosts: post } = useAuth()
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
const { errors, formLogin, login, loading } = useAuth()
const loginFirstError = ref<string | null>(null)
const { isOpenGCashModal, isOpenMayaModal } = useLanding()
const { $useCustomFetch } = useNuxtApp()
const contactForm = ref({
  email: '',
  subject: '',
  message: ''
})
const contactLoading = ref(false)
const { formatDate } = useFormat()

const basicPosts = computed(() : Post[] => post.value.slice(0,5))

function scrollToTop() {
  loginFirstError.value = null

  window.scrollTo({
    top: 0,
    behavior: 'smooth' // smooth scrolling effect
  })

  loginFirstError.value = 'Logging in is required'
}

function handleInput() {
  loginFirstError.value = null
}

async function submitContact() {
  contactLoading.value = true

  const { data } = await $useCustomFetch(`/api/send-message`, { 
    method: 'POST',
    body: contactForm.value
  })

  contactForm.value = {
    email: '',
    subject: '',
    message: ''
  }

  contactLoading.value = false
}

definePageMeta({
  layout: 'landing',
  middleware: 'guest'
})

onBeforeMount(async() => { await getPosts() })
</script>

<template>
  <div class="flex flex-col items-center">
    <div id="home" class="pt-20 sm:pt-36 pb-24 flex items-center relative max-w-6xl w-full px-6 md:px-6 sm:lg:px-10">
      <div class="space-y-6">
        <div class="border-b pb-6 border-custom-brown-500 space-y-1 z-[1]">
          <p class="text-3xl sm:text-[48px] landing-login font-bold text-border-custom-brown-500 md:pb-4 sm:pb-0">Restauro Legal Services</p>

          <p class="text-sm text-border-custom-brown-500">THE GOOD OF THE PEOPLE IS THE GREATEST LAW</p>
        </div>

        <form method="post" @submit="login" class="space-y-4 w-72">
          <BaseInput 
            v-model="formLogin.email" 
            label="Username/Email" 
            placeholder="Enter username or email"
            :error="loginFirstError ?? null"
            @input="handleInput"
          />

          <BaseInput 
            v-model="formLogin.password" 
            type="password"
            label="Password"
            placeholder="Enter password"
            :error="errors ?? null"
          />

          <div class="w-24">
            <BaseButton type="submit" @click="login" :isLoading="loading">Login</BaseButton>
          </div>
        </form>


        <p class="text-sm">
          <span class="text-custom-brown-400">Don't have an account?</span> <span class="text-custom-brown-500 cursor-pointer" @click="navigateTo('/register')">Sign Up</span>
        </p>
      </div>

        <img src="/images/woman.svg" alt="" class="absolute right-0 bottom-0 z-[3] hidden sm:lg:block">
        <img src="/images/shape-elipse-landing.svg" class="absolute z-[2] top-48 right-24 hidden sm:lg:block">
        <img src="/images/shape-rectangle-landing.svg" class="absolute z-[0] bottom-0 right-0 hidden sm:lg:block">
    </div>
  </div>

  <div id="about-us" class="flex flex-col items-center py-8 bg-custom-brown-500">
    <div class="max-w-5xl w-full flex flex-col sm:flex-row items-center sm:space-x-20 px-6 sm:px-0 space-y-6 sm:space-y-0">
      <img src="/images/about-us.svg" />

      <div class="space-y-6">
        <p class="text-2xl landing-login text-white font-bold">About Us</p>

        <p class="text-sm text-white">
          At Restauro Legal Services, we're driven to shatter barriers and democratize access to justice.
        </p>

        <p class="text-sm text-white">
          By harnessing the power of digital technology, we're committed to bridging the gap in legal services, reaching underserved individuals, areas and communities, and empowering individuals with our flexible scheduling and remote consultations for legal assistance.
        </p>

        <p class="text-sm text-white">
          All information shared in this site are treated with utmost confidentiality.
        </p>

        <p 
          class="text-sm text-white font-bold underline underline-offset-2 cursor-pointer"
          @click="navigateTo('/learn-more')"
        >Learn More</p>
      </div>
    </div>
  </div>

  <div id="services" class="flex flex-col items-center py-12 sm:py-24 px-4 md:px-10 sm:px-0">
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
        <div @click="scrollToTop" class="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-8 space-y-8 sm:space-y-0 cursor-pointer">
          <div class="w-24 h-24 bg-custom-brown-300 rounded-md grid place-items-center whitespace-nowrap">
            <img :src="service.image" />
          </div>

          <div class="space-y-4">
            <p class="text-xl font-bold text-custom-brown-500 landing-login">{{ service.label }}</p>

            <p class="text-sm font-bold text-custom-brown-500">Starts at P {{ service.price }}</p>

            <p class="text-sm text-custom-brown-500 max-w-4xl w-full">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="events" class="flex flex-col items-center pb-24">
    <div class="space-y-10 max-w-5xl w-full sm:xl:px-0">
      <p class="text-2xl landing-login text-custom-brown-500 w-full text-center font-bold">Events</p>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-x-16 gap-y-10 sm:gap-y-0">
        <div 
          v-for="event in events" 
          @click="scrollToTop" 
          class="rounded-md overflow-hidden justify-center bg-custom-brown-200 shadow-lg cursor-pointer"
        >
          <img :src="event.image" class="object-cover sm:object-fill w-full sm:w-auto" />

          <p class="text-base text-custom-brown-500 text-center w-full py-4">{{ event.label }}</p>
        </div>
      </div>
    </div>
  </div>

  <div id="materials" class="flex flex-col items-center py-24">
    <div class="w-full flex items-center relative justify-between">
      <div></div>
      <div class="w-full max-w-full h-[529px] bg-custom-brown-400 sm:xl:rounded-l-md"></div>

      <div 
        ref="container"
        @mousedown="startDrag" 
        @mousemove="handleDrag" 
        @mouseup="endDrag" 
        @mouseleave="endDrag"
        @touchstart="startDrag"
        @touchmove="handleDrag"
        @touchend="endDrag"
        class="absolute top-12 lg:left-36 sm:xl:left-64 horizontal z-20 cursor-pointer prevent-select" 
      >
        <div
          :style="{ transform: `translateX(${data.scrollX}px)` }"
          class="flex flex-col space-y-10"
        >
          <div class="flex items-center space-x-4">
            <p class="text-2xl text-white pl-4 sm:xl:pl-0 font-bold landing-login">Resource Materials</p>
          </div>

          <div class="flex items-center space-x-6">
            <div 
              v-for="material in basicPosts" 
              class="bg-white w-[356px] rounded-xl drop-shadow-xl overflow-hidden" aria-readonly="true"
              @click="scrollToTop"
            >
                <div class="w-full h-36 overflow-hidden">
                  <img :src="getImage(material.images[0])" class="object-cover w-full h-full">
                </div>

                <div class="p-4 space-y-4">
                <p class="text-custom-brown-500 text-base line-clamp-3">{{ material.description }}</p>

                <div>
                  <p class="text-custom-brown-500 font-medium text-xs">By {{ material.user.full_name }}</p>
                  <p class="text-custom-brown-500 text-[12px]">{{ formatDate(material.updated_at) }}</p>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="contact" class="flex flex-col items-center py-10 lg:py-24">
    <div class="max-w-full sm:max-w-3xl w-full grid lg:grid-cols-2 items-center px-10 sm:xl:px-0 gap-y-6 lg:gap-y-0">
      <div class="flex flex-col items-start space-y-6 pb-16">
        <p class="landing-login text-custom-brown-500 text-2xl font-bold">Send us a message</p>

        <p class="text-sm text-custom-brown-500 w-48">
          If your matter is urgent, please contact us directly at
        </p>

        <div class="space-y-2 flex flex-col items-start">
          <div class="flex items-center space-x-4">
            <img src="/images/phone-icon.svg" alt="" />

            <p class="text-base font-medium text-custom-brown-500">09457123972</p>
          </div>

          <div class="flex items-center space-x-4">
            <img src="/images/email-icon.svg" alt="" />

            <p class="text-base font-medium text-custom-brown-500">ruth.restauro2018@gmail.com</p>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-start space-y-4">
        <div class="w-full">
          <BaseInput v-model="contactForm.email" placeholder="Email" type="email" />
        </div>

        <div class="w-full">
          <BaseInput v-model="contactForm.subject" placeholder="Subject" />
        </div>

        <div class="w-full">
          <textarea
            v-model="contactForm.message"
            class="bg-custom-brown-200 text-sm p-3 rounded-md placeholder-custom-brown-300 w-full text-custom-brown-500 h-44"
            placeholder="Enter message here"
          ></textarea>
        </div>

        <div class="w-24">
          <BaseButton 
            :isLoading="contactLoading" 
            @click="submitContact"
          >Send</BaseButton>
        </div>
      </div>
    </div>
  </div>

  <div id="donate" class="flex flex-col items-center py-24">
    <div class="max-w-3xl w-full flex flex-col items-start space-y-6 p-8 bg-custom-brown-200 rounded-lg">
      <div class="flex items-center space-x-4">
        <p class="text-2xl landing-login font-bold">Make a donation</p>

        <HeartIcon class="w-5 h-5 fill-black" />
      </div>

      <p class="text-sm text-custom-brown-500">
        Every contribution, big or small, makes a difference. Thank you for helping us grow and serve better!
      </p>

      <div class="w-full grid grid-cols-2 gap-x-6">
        <div @click="isOpenGCashModal = true" class="w-full rounded-lg bg-custom-brown-100 flex items-center p-6 cursor-pointer">
          <img class="h-8" src="/images/gcash-logo.png" />
        </div>

        <div @click="isOpenMayaModal = true" class="w-full rounded-lg bg-custom-brown-100 flex items-center p-6 cursor-pointer">
          <img class="h-5" src="/images/BPI-logo.png" />
        </div>
      </div>
    </div>
  </div>

  <footer class="w-full lg:px-44 flex flex-col lg:flex-row items-center justify-between bg-custom-brown-200 pb-6 lg:pb-0">
    <div class="flex items-center space-x-4 py-6">
      <img src="/images/logo-landing.svg" />

      <div class="space-y-2">
        <img src="/images/logo-landing-text1.svg" />

        <div class="w-28 h-[2px] bg-black" />

        <img src="/images/logo-landing-text2.svg" />
      </div>
    </div>

    <div class="flex items-center space-x-6">
      <p class="text-sm font-bold text-custom-brown-500">Follow Us</p>

      <div class="w-8 h-8 grid place-items-center border border-custom-brown-500 rounded-full">
        <img src="/images/follow/fb.svg" alt="">
      </div>

      <div class="w-8 h-8 grid place-items-center border border-custom-brown-500 rounded-full">
        <img src="/images/follow/x.svg" alt="">
      </div>

      <div class="w-8 h-8 grid place-items-center border border-custom-brown-500 rounded-full">
        <img src="/images/follow/tiktok.svg" alt="">
      </div>

      <div class="w-8 h-8 grid place-items-center border border-custom-brown-500 rounded-full">
        <img src="/images/follow/ig.svg" alt="">
      </div>
    </div>
  </footer>

  <ModalGCashDonation />
  <ModalMayaDonation />
</template>

<style scoped>
.landing-login {
  font-family: 'Merriweather', serif;
}

.container {
  width: 100%;
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
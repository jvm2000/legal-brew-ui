<script setup lang="ts">
import { ShoppingCartIcon, ArrowLeftEndOnRectangleIcon, Cog6ToothIcon, CalendarDaysIcon } from '@heroicons/vue/24/outline'
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import { getImage } from '~/utils/image'
import { useToast } from 'vue-toastification'

const { user: authUser } = useAuth()
const { $useCustomFetch } = useNuxtApp()
const toast = useToast()

async function logout() {
  navigateTo('/')
  toast.success('Logging out kindly wait.')

  $useCustomFetch('/api/logout', { method: 'POST' })
}
</script>

<template>
  <div class="app-container">
    <div class="w-full bg-custom-brown-200 flex items-center justify-between drop-shadow-sm px-4 md:px-12 lg:px-20 sm:xl:px-44 fixed top-0 z-[100]">
      <div class="flex items-center space-x-4 py-6 cursor-pointer" @click="navigateTo('/dashboard')">
        <img src="/images/logo-landing.svg" />

        <div class="space-y-2">
          <img src="/images/logo-landing-text1.svg" />

          <div class="w-28 h-[2px] bg-black" />

          <img src="/images/logo-landing-text2.svg" />
        </div>
      </div>

      <div class="flex items-center space-x-8">
        <CalendarDaysIcon 
          v-if="authUser?.role === 'admin'"
          class="w-8 h-8 stroke-custom-brown-500 cursor-pointer hidden sm:block"
          @click="navigateTo('/appointment')"
        />

        <ShoppingCartIcon 
          v-if="authUser?.role === 'client'"
          class="w-8 h-8 stroke-custom-brown-500 cursor-pointer hidden sm:block"
          @click="navigateTo('/cart')"
        />

        <div>
          <Menu>
            <MenuButton>
              <button class="flex justify-start items-center space-x-4 rounded-lg hover:bg-custom-brown-100 p-2">
                <div class="w-8 h-8 rounded-full overflow-hidden relative">
                  <img :src="getImage(authUser?.images)" class="w-full h-full object-cover">
                </div>

                <div class="flex flex-col items-start">
                  <p class="text-sm font-medium custom-brown-500 hidden sm:block">{{ authUser?.full_name }}</p>
                  <p class="text-sm font-medium custom-brown-500 block sm:hidden">{{ authUser?.username }}</p>

                  <p class="text-xs text-custom-brown-500">{{ authUser?.role }}</p>
                </div>
              </button>
            </MenuButton>

            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="absolute right-6 md:right-12 lg:right-20 sm:xl:right-44 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none px-4 py-2"
              >
                <button v-if="authUser?.role === 'admin'" @click="navigateTo('/appointment')" class="py-2 flex items-center space-x-4 hover:bg-custom-brown-100 w-full rounded-lg px-4">
                  <CalendarDaysIcon class="w-6 h-6 stroke-custom-brown-500" />

                  <p class="text-sm text-custom-brown-500 font-medium">Appointments</p>
                </button>

                <button v-if="authUser?.role === 'client'" @click="navigateTo('/cart')" class="py-2 flex sm:hidden items-center space-x-4 hover:bg-custom-brown-100 w-full rounded-lg px-4">
                  <ShoppingCartIcon class="w-6 h-6 stroke-custom-brown-500" />

                  <p class="text-sm text-custom-brown-500 font-medium">Cart</p>
                </button>

                <button @click="navigateTo('/account/settings')" class="py-2 flex items-center space-x-4 hover:bg-custom-brown-100 w-full rounded-lg px-4">
                  <Cog6ToothIcon class="w-6 h-6 stroke-custom-brown-500" />

                  <p class="text-sm text-custom-brown-500 font-medium">Account Settings</p>
                </button>

                <button @click="logout" class="py-2 flex items-center space-x-4 hover:bg-custom-brown-100 w-full rounded-lg px-4">
                  <ArrowLeftEndOnRectangleIcon class="w-6 h-6 stroke-custom-brown-500" />

                  <p class="text-sm text-custom-brown-500 font-medium">Logout</p>
                </button>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <div class="w-full flex flex-col items-center py-32 sm:py-36">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  background-color: #FAF1E9;
  min-height: 100vh;
}
</style>
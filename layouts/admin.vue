<script setup lang="ts">
import { BellIcon, ChevronUpDownIcon } from '@heroicons/vue/24/outline'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

const { user: authUser } = useAuth()
const config = useRuntimeConfig()

async function logout() {
  await $fetch('/sanctum/csrf-cookie', {
      baseURL: config.public.apiBase,
      credentials: 'include',
    })

  await useFetch('/api/logout', {
    baseURL: config.public.apiBase,
    method: 'POST',
    credentials: 'include',
  })

  authUser.value = null

  navigateTo('')
}

function getImage(path: any) {
  return `${ useRuntimeConfig().public.apiBase }/storage/${path}`
}
</script>

<template>
  <div class="app-container">
    <div class="w-full bg-custom-brown-200 flex items-center justify-between drop-shadow-sm px-44 fixed top-0 z-[100]">
      <div class="flex items-center space-x-4 py-6">
        <img src="/images/logo-landing.svg" />

        <div class="space-y-2">
          <img src="/images/logo-landing-text1.svg" />

          <div class="w-28 h-[2px] bg-black" />

          <img src="/images/logo-landing-text2.svg" />
        </div>
      </div>

      <div class="flex items-center space-x-8">
        <BellIcon class="w-8 h-8 stroke-custom-brown-500" />

        <div class="flex items-center space-x-4">
          <div class="w-8 h-8 rounded-full overflow-hidden relative">
            <img :src="getImage(authUser?.user.images)" class="w-full h-full object-cover">
          </div>

          <div>
            <p class="text-sm font-medium custom-brown-500">{{ authUser?.user.full_name }}</p>

            <p class="text-xs text-custom-brown-500">{{ authUser?.user.role }}</p>
          </div>
        </div>

        <div>
          <Menu>
            <MenuButton>
              <ChevronUpDownIcon class="w-6 h-6 stroke-custom-brown-500" />
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
                class="absolute right-44 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
              >
                <p @click="logout">Logout</p>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <div class="w-full flex flex-col items-center py-36">
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
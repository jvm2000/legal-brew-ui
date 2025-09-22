<script setup lang="ts">
import { Bars4Icon } from '@heroicons/vue/24/outline'
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
</script>

<template>
  <link href="https://fonts.googleapis.com/css2?family=Merriweather&display=swap" rel="stylesheet">
  
  <div class="app-container">
    <div class="w-full bg-custom-brown-200 flex items-center justify-between drop-shadow-sm px-4 md:px-12 lg:px-20 sm:xl:px-44 relative z-[1]">
      <div class="flex items-center space-x-4 py-6">
        <img src="/images/logo-landing.svg" />

        <div class="space-y-2">
          <img src="/images/logo-landing-text1.svg" />

          <div class="w-28 h-[2px] bg-black" />

          <img src="/images/logo-landing-text2.svg" />
        </div>
      </div>

      <div class="items-center lg:space-x-6 sm:xl:space-x-10 hidden lg:flex">
        <router-link :to="{ path: '/', hash: '#home' }" class="text-sm text-[#3A1F09] font-medium">Home</router-link>
        <router-link :to="{ path: '/', hash: '#about-us' }" class="text-sm text-[#3A1F09] font-medium">About Us</router-link>
        <router-link :to="{ path: '/', hash: '#services' }" class="text-sm text-[#3A1F09] font-medium">Menu of Services</router-link>
        <router-link :to="{ path: '/', hash: '#events' }" class="text-sm text-[#3A1F09] font-medium">Events</router-link>
        <router-link :to="{ path: '/', hash: '#materials' }" class="text-sm text-[#3A1F09] font-medium">Resource Materials</router-link>
        <router-link :to="{ path: '/', hash: '#contact' }" class="text-sm text-[#3A1F09] font-medium">Contact Us</router-link>
        <router-link :to="{ path: '/', hash: '#donate' }" class="text-sm text-[#3A1F09] font-medium">Donate</router-link>
      </div>

      <Menu as="div" class="relative inline-block text-left lg:hidden">
        <MenuButton>
          <Bars4Icon 
            class="w-8 h-8 stroke-custom-brown-500 cursor-pointer"
          />
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
            class="fixed right-4 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none p-4 z-[999]"
          >
            <router-link 
              :to="{ path: '/', hash: '#home' }" 
              class="py-2 flex items-center space-x-4 hover:bg-custom-brown-100 w-full rounded-lg px-4"
            >
              <p class="text-sm text-custom-brown-500 font-medium">Home</p>
            </router-link>

            <router-link 
              :to="{ path: '/', hash: '#about-us' }" 
              class="py-2 flex items-center space-x-4 hover:bg-custom-brown-100 w-full rounded-lg px-4"
            >
              <p class="text-sm text-custom-brown-500 font-medium">About Us</p>
            </router-link>

            <router-link 
              :to="{ path: '/', hash: '#services' }" 
              class="py-2 flex items-center space-x-4 hover:bg-custom-brown-100 w-full rounded-lg px-4"
            >
              <p class="text-sm text-custom-brown-500 font-medium">Menu of Services</p>
            </router-link>

            <router-link 
              :to="{ path: '/', hash: '#events' }" 
              class="py-2 flex items-center space-x-4 hover:bg-custom-brown-100 w-full rounded-lg px-4"
            >
              <p class="text-sm text-custom-brown-500 font-medium">Events</p>
            </router-link>

            <router-link 
              :to="{ path: '/', hash: '#materials' }" 
              class="py-2 flex items-center space-x-4 hover:bg-custom-brown-100 w-full rounded-lg px-4"
            >
              <p class="text-sm text-custom-brown-500 font-medium">Resource Materials</p>
            </router-link>

            <router-link 
              :to="{ path: '/', hash: '#contact' }" 
              class="py-2 flex items-center space-x-4 hover:bg-custom-brown-100 w-full rounded-lg px-4"
            >
              <p class="text-sm text-custom-brown-500 font-medium">Contact Us</p>
            </router-link>

            <router-link 
              :to="{ path: '/', hash: '#donate' }" 
              class="py-2 flex items-center space-x-4 hover:bg-custom-brown-100 w-full rounded-lg px-4"
            >
              <p class="text-sm text-custom-brown-500 font-medium">Donate</p>
            </router-link>
          </MenuItems>
        </transition>
      </Menu>
    </div>

    <div class="relative z-0 mt-6">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  background-color: #fffafa;
  min-height: 100vh;
  overflow: hidden;
}
</style>
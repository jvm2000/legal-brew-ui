<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { twMerge } from 'tailwind-merge'

const props = withDefaults(defineProps<{
  images?: string[],
  maxHeight?: 'h-lg' | 'h-xl',
}>(), {
  images: () => [],
  maxHeight: 'h-lg'
})

const current = ref(0)

function next() {
  current.value = (current.value + 1) % props.images.length
}

function prev() {
  current.value = (current.value - 1 + props.images.length) % props.images.length
}

function getImage(path: string) {
  return `${ useRuntimeConfig().public.apiBase }/storage/${path}`
}
</script>

<template>
  <div class="space-y-4 w-full flex flex-col items-center">
    <div 
      :class="[twMerge(
        'relative w-full h-80 overflow-hidden',
        props.maxHeight === 'h-lg' && 'h-80',
        props.maxHeight === 'h-xl' && 'h-[500px]'
      )]"
    >
      <img
        :src="getImage(images[current])"
        class="w-full h-full object-cover transition-all duration-300"
      />

      <button 
        v-if="props.images.length > 1"
        @click="prev" 
        class="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-500/50 bg-opacity-50 p-2 rounded-full"
      >
        <ChevronLeftIcon class="w-4 h-4 stroke-gray-800" />
      </button>

      <button 
        v-if="props.images.length > 1"
        @click="next" 
        class="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-500/50 bg-opacity-50 text-white p-2 rounded-full"
      >
        <ChevronRightIcon class="w-4 h-4 stroke-gray-800" />
      </button>
    </div>

    <div v-if="props.images.length > 1" class="w-full flex flex-col items-center">
      <div class="flex items-center space-x-1">
        <div 
          v-for="(dot, index) in props.images" 
          class="w-1 h-1 rounded-full"
          :key="index"
          :class="[index === current ? 'bg-slate-950' : 'bg-slate-400']"
        />
      </div>
    </div>
  </div>
</template>
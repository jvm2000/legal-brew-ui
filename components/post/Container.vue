<script setup lang="ts">
import { EllipsisHorizontalIcon, HeartIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/vue/24/outline'
import type { Post } from '~/types/general';
import CarouselImages from './CarouselImages.vue';

const props = withDefaults(defineProps<{
  post: Post | null,
}>(), {
  post: null,
})
</script>

<template>
  <div class="w-full p-6 space-y-4 bg-white rounded-md">
    <div class="w-full flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <div class="w-8 h-8 rounded-full overflow-hidden bg-custom-brown-500 border border-custom-brown-300"></div>

        <div class="justify-start">
          <p class="text-sm font-bold text-custom-brown-500">{{ props.post?.user.full_name }}</p>

          <p class="text-xs text-gray-500">10 hours ago</p>
        </div>
      </div>

      <EllipsisHorizontalIcon class="w-6 h-6 stroke-gray-500 cursor-pointer" />
    </div>

    <p class="text-custom-brown-500 text-sm">
      {{ props.post?.description }}
    </p>

    <div v-if="props.post?.images.length">
      <CarouselImages :images="props.post?.images" />
    </div>

    <div class="flex items-center space-x-8">
      <div class="flex items-center space-x-2">
        <HeartIcon class="w-6 h-6 stroke-custom-brown-500 cursor-pointer" />

        <p class="text-sm text-custom-brown-500">{{ props.post?.reactions.length ?? '0' }}</p>
      </div>

      <div class="flex items-center space-x-2">
        <ChatBubbleOvalLeftEllipsisIcon class="w-6 h-6 stroke-custom-brown-500 cursor-pointer" />

        <p class="text-sm text-custom-brown-500">{{ props.post?.comments.length ?? '0' }}</p>
      </div>
    </div>
  </div>
</template>
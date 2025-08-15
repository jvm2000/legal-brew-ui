<script setup lang="ts">
import type { Post } from '~/types/general';

const { user: authUser } = useAuth()
const { openClosePostModal } = usePost()
const posts = ref<Post[]>([])
const { $useCustomFetch } = useNuxtApp()

async function getPosts() {
  const { data } = await $useCustomFetch<Post[]>('/api/posts', {
    method: 'GET',
  })

  if (data.value) {
    posts.value = data.value
  }
}

function getImage(path: any) {
  if (!path) return '/images/admin-icon.svg'

  return `${ useRuntimeConfig().public.apiBase }/storage/${path}`
}

onMounted(async() => {
  await getPosts()
})
</script>

<template>
  <div class="max-w-xl w-full space-y-6">
    <div class="text-4xl text-custom-brown-500 px-6 sm:px-0">
      <p>Good Morning,</p>
      <p class="capitalize">{{ authUser?.full_name }}</p>
    </div>

    <div class="w-full flex items-center p-6 space-x-4 bg-white rounded-md">
      <div class="w-8 h-8 rounded-full overflow-hidden whitespace-nowrap">
        <img
          :src="authUser?.images?.[0] ? getImage(authUser.images[0]) : ''"
          class="w-full h-full object-cover"
        />
      </div>
      
      <div 
        class="px-4 py-2 border border-gray-500 w-full sm:rounded-md cursor-pointer whitespace-normal"
        @click="openClosePostModal"
      >
        <p class="text-base text-gray-500">Create Post</p>
      </div>
    </div>

    <div v-for="post in posts">
      <PostContainer :post @success="getPosts" />
    </div>
  </div>

  <ModalCreateEditPost @success="getPosts" />

  <ModalViewPost @success="getPosts" />
</template>
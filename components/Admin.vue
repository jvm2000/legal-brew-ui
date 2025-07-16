<script setup lang="ts">
import type { Post } from '~/types/general';

const { user: authUser } = useAuth()
const { openClosePostModal } = usePost()
const posts = ref<Post[]>([])

async function getPosts() {
  const { data } = await useFetch<Post[]>('/api/posts', {
    baseURL: useRuntimeConfig().public.apiBase,
    method: 'GET',
    credentials: 'include',
  })

  if (data.value) {
    posts.value = data.value
  }
}

await getPosts()
</script>

<template>
  <div class="max-w-xl w-full space-y-6">
    <div class="text-4xl text-custom-brown-500">
      <p>Good Morning,</p>
      <p class="capitalize">{{ authUser?.user.full_name }}</p>
    </div>

    <div class="w-full flex items-center p-6 space-x-4 bg-white rounded-md">
      <div class="w-8 h-8 rounded-full overflow-hidden bg-custom-brown-500 border border-custom-brown-300"></div>
      
      <div 
        class="px-4 py-2 border border-gray-500 w-full rounded-md cursor-pointer"
        @click="openClosePostModal"
      >
        <p class="text-base text-gray-500">Create Post</p>
      </div>
    </div>

    <div v-for="post in posts">
      <PostContainer :post @success="getPosts" />
    </div>
  </div>

  <ModalCreatePost @success="getPosts" />
</template>
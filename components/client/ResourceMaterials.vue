<script setup lang="ts">
import type { Post } from '~/types/general';

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
    <div v-for="post in posts">
      <PostContainer :post @success="getPosts" />
    </div>

    <ModalViewPost />
  </div>
</template>
<script setup lang="ts">
import type { Post } from '~/types/general';

const posts = ref<Post[]>([])
const { $useCustomFetch } = useNuxtApp()

async function getPosts() {
  const { data } = await $useCustomFetch('/api/posts', { 
    method: 'GET',
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

    <ModalViewPost @success="getPosts" />
  </div>
</template>
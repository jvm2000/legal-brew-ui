<script setup lang="ts">
import type { Post } from '~/types/general';

const props = defineProps<{
  type?: string,
  post?: Post[]
}>()

const { getPosts } = usePost()
</script>

<template>
  <div class="max-w-xl w-full space-y-6 py-6">
    <div v-for="post in props.post">
      <PostContainer :post @success="getPosts" />
    </div>

    <ModalViewPost @success="getPosts" />
  </div>
</template>
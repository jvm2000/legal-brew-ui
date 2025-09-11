<script setup lang="ts">
import type { Post } from '~/types/general'

const props = defineProps<{
  type?: string,
  post?: Post[]
}>()

const { getPosts } = usePost()
const route = useRoute()
const page = ref(1)

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function loadPosts() {
  await delay(200)
  await getPosts(page.value)
  
  page.value++
}

async function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement

  if (scrollTop + clientHeight >= scrollHeight - 10) {
    await loadPosts()
  }
}

onMounted(async () => {
  if (route.name === 'dashboard' && (route.query.tab === 'resource_materials' || !route.query.tab)) {
    await delay(200)
    window.addEventListener('scroll', handleScroll)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="max-w-xl w-full space-y-6 py-6">
    <div v-for="post in props.post">
      <PostContainer :post @success="getPosts(page)" />
    </div>

    <ModalViewPost @success="getPosts(page)" />
  </div>
</template>
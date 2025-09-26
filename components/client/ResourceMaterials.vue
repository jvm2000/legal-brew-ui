<script setup lang="ts">
import type { Post } from '~/types/general'

const props = defineProps<{
  type?: string,
  post?: Post[]
}>()

const { user: authUser } = useAuth()
const { getPosts, openClosePostModal } = usePost()
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
    <div v-if="authUser?.role === 'admin'" class="w-full flex items-center p-6 space-x-4 bg-white rounded-md">
      <div class="w-8 h-8 rounded-full overflow-hidden whitespace-nowrap">
        <img
          :src="getImage(authUser?.images)"
          class="w-full h-full object-cover"
        />
      </div>
      
      <div 
        class="px-4 py-2 border border-gray-500 w-full rounded-full cursor-pointer whitespace-normal"
        @click="openClosePostModal"
      >
        <p class="text-base text-gray-500">Create Post</p>
      </div>
    </div>

    <div v-for="post in props.post">
      <PostContainer :post @success="getPosts(page)" />
    </div>

    <ModalCreateEditPost @success="getPosts(page)" />
    <ModalViewPost @success="getPosts(page)" />
  </div>
</template>
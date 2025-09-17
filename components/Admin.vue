<script setup lang="ts">
import { getImage } from '~/utils/image'

const { user: authUser } = useAuth()
const { openClosePostModal, getPosts, post } = usePost()

const loading = ref(false)
const page = ref(1)

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function loadPosts() {
  if (loading.value) return

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
  loading.value = true

  await delay(200)
  await getPosts()

  loading.value = false
  window.addEventListener('scroll', handleScroll)
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

    <div v-if="post.length" class="space-y-6">
      <div v-for="post in post">
        <PostContainer :post @success="loadPosts" />
      </div>
    </div>
    
    <div v-if="loading">
      <BaseLoading :isLoading="loading" />
    </div>
  </div>

  <ModalCreateEditPost @success="loadPosts" />
  <ModalViewPost @success="loadPosts" />
</template>

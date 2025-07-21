<script setup lang="ts">
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { Post, Comment } from '~/types/general'
import { XMarkIcon, EllipsisHorizontalIcon, PaperAirplaneIcon, HeartIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/vue/24/outline'

const { user: authUser } = useAuth()
const comments = ref<Comment[]>([])
const loading = ref(false)
const { isViewPostModal, openCloseViewPostModal, selectedPost } = usePost()
const inputText = ref('')
const commentForm = ref({
  content: '',
  post_id: '',
  user_id: ''
})

function getRemainingTime(date: any) {
  return dayjs(date).fromNow() // returns "in 3 days" or "2 hours ago"
}

async function getComments() {
  const { data } = await useFetch<Comment[]>(`/api/posts/${selectedPost.value.id}/comments`, {
    baseURL: useRuntimeConfig().public.apiBase,
    method: 'GET',
    credentials: 'include',
  })

  if (data.value) {
    comments.value = data.value
  }
}

async function submitComment() {
  if (loading.value || !inputText.value) return 

  loading.value = true

  commentForm.value.content = inputText.value
  commentForm.value.post_id = selectedPost.value?.id ?? ''
  commentForm.value.user_id = authUser.value?.user.id ?? ''

  const { error } = await useFetch('/api/comments', {
    baseURL: useRuntimeConfig().public.apiBase,
    method: 'POST',
    body: commentForm,
    credentials: 'include',
  })

  commentForm.value = {}

  await getComments()

  loading.value = false
}

const hasImages = computed<boolean>(() => {
  if (selectedPost.value?.images && selectedPost.value?.images.length) return true

  return false
})
</script>

<template>
  <BaseModal
    :open="isViewPostModal"
    title="Create Post"
    :size="[hasImages ? '6xl' : 'xl']"
    shape="straight"
    noPadding
    @before-enter="getComments"
    @close="openCloseViewPostModal"
  >
    <template #header></template>

    <div :class="[hasImages ? 'w-full grid grid-cols-11' : 'w-full']">
      <div v-if="hasImages" class="w-full bg-black col-span-6 flex items-center">
        <PostCarouselImages max-height="h-xl" :images="selectedPost?.images" />
      </div>

      <div 
        class="h-[650px] space-y-6"
        :class="[hasImages ? 'w-full col-span-5' : 'w-full']"
      >
        <div class="flex items-center justify-between py-4 border-b border-gray-300">
          <p class="text-base font-medium pl-6 text-custom-brown-500">Post Details</p>

          <XMarkIcon class="w-6 h-6 stroke-brown-500 cursor-pointer mr-6" @click="isViewPostModal = false" />
        </div>

        <div class="space-y-4 px-6 pb-6 border-b border-gray-300">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 rounded-full bg-custom-brown-500 overflow-hidden">
              </div>

              <div class="flex flex-col items-start">
                <p class="text-base font-medium capitalize">{{ selectedPost?.user.full_name }}</p>
                
                <p class="text-xs text-custom-brown-300">{{ getRemainingTime(selectedPost?.updated_at) }}</p>
              </div>
            </div>
          </div>

          <p class="text-sm text-custom-brown-500 text-left">
            {{ selectedPost?.description }}
          </p>

          <div class="flex items-center space-x-8">
            <div class="flex items-center space-x-2">
              <HeartIcon class="w-6 h-6 stroke-custom-brown-500 cursor-pointer" />

              <p class="text-sm text-custom-brown-500">{{ selectedPost?.reactions.length ?? '0' }}</p>
            </div>

            <div class="flex items-center space-x-2">
              <ChatBubbleOvalLeftEllipsisIcon 
                class="w-6 h-6 stroke-custom-brown-500" 
              />

              <p class="text-sm text-custom-brown-500">{{ selectedPost?.comments.length ?? '0' }}</p>
            </div>
          </div>
        </div>

        <div class="space-y-6 px-6 pb-4 items-start flex flex-col w-full max-h-[400px] overflow-auto">
          <p class="text-base text-custom-brown-500">Comments({{ comments?.length ?? '0' }})</p>

          <div class="grid grid-cols-10 w-full items-center">
            <div class="w-8 h-8 rounded-full bg-custom-brown-500 overflow-hidden col-span-1">
            </div>
            
            <div class="col-span-9 relative flex items-center">
              <input 
                v-model="inputText"
                type="text" 
                class="w-full ring-0 focus:ring-0 outline-none px-4 py-2 rounded-md border border-gray-300"
                placeholder="Leave a comment"
              />

              <button class="absolute right-4" @click="submitComment" :disabled="loading">
                <PaperAirplaneIcon class="stroke-custom-brown-500 w-5 h-5" />
              </button>
            </div>
          </div>

          <div v-for="comment in comments" class="grid grid-cols-10 w-full items-center">
            <div class="w-8 h-8 rounded-full bg-custom-brown-500 overflow-hidden col-span-1">
            </div>

            <div class="space-y-1 flex flex-col items-start col-span-9">
              <div class="flex items-center space-x-3">
                <p class="text-base font-medium capitalize">{{ comment.user?.full_name }}</p>

                <div class="w-1 h-1 bg-custom-brown-500 rounded-full" />

                <p class="text-sm text-custom-brown-500">{{ getRemainingTime(comment.created_at) }}</p>
              </div>

              <p class="text-sm text-custom-brown-500 text-left">
                {{ comment.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import type { Comment, Post, Reaction } from '~/types/general'
import { XMarkIcon, PaperAirplaneIcon, HeartIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/vue/24/outline'

type CommentForm = {
  content: string,
  post_id: string,
  user_id: string
}

type ReactionForm = {
  post_id: string,
  user_id: string,
  type: string
}

const emit = defineEmits<{
  success: [void]
}>()

const { user: authUser } = useAuth()
const comments = ref<Comment[]>([])
const loading = ref(false)
const { isViewPostModal, openCloseViewPostModal, selectedPost } = usePost()
const commentForm = ref<CommentForm>({
  content: '',
  post_id: '',
  user_id: ''
})
const reactionForm = ref<ReactionForm>({
  post_id: '',
  user_id: '',
  type: ''
})
const { $useCustomFetch } = useNuxtApp()
const inputRef = ref<HTMLTextAreaElement | null>(null)
const showToast = ref(false)
const toastMessage = ref('')

function getRemainingTime(date: any) {
  return dayjs(date).fromNow() // returns "in 3 days" or "2 hours ago"
}

async function getComments() {
  const { data } = await $useCustomFetch(`/api/posts/${selectedPost.value.id}/comments`, { 
    method: 'GET' 
  })

  if (data.value) {
    comments.value = data.value
  }
}

async function submitComment() {
  if (loading.value) return 

  loading.value = true

  commentForm.value.post_id = selectedPost.value?.id ?? ''
  commentForm.value.user_id = authUser.value?.id ?? ''

  const { error } = await $useCustomFetch('/api/comments', { 
    method: 'POST',
    body: commentForm.value,
  })

  commentForm.value = {}

  await getComments()

  loading.value = false
}

function getImage(path: any) {
  if (!path) return '/images/admin-icon.svg'

  return `${ useRuntimeConfig().public.apiBase }/storage/${path}`
}

function autoResize() {
  const el = inputRef.value

  if (el) {
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }
}

function handleClose() {
  commentForm.value.content = ''
  commentForm.value.post_id = ''
  commentForm.value.user_id = ''
}

async function submitReaction() {
  showToast.value = true
  toastMessage.value = 'Like Submitted!'

  reactionForm.value.post_id = selectedPost.value?.id ?? ''
  reactionForm.value.user_id =  authUser.value?.id ?? ''
  reactionForm.value.type = 'heart'

  const { error } = await $useCustomFetch<Post[]>('/api/reactions', {
    method: 'POST',
    body: reactionForm.value,
  })

  emit('success')

  showToast.value = false
}

async function unsubmitReaction(reaction: Reaction[]) {
  showToast.value = true
  toastMessage.value = 'Unlike Submitted!'

  const reactionObject = reaction?.find(
    (reaction: any) => reaction.user_id === authUser?.value?.id
  )

  const { error } = await $useCustomFetch<Post[]>(`/api/reactions/${reactionObject?.id}`, {
    method: 'DELETE',
  })

  emit('success')

  showToast.value = false
}

function checkIfAlreadyReacted(reaction: Reaction[]) {
  return reaction?.some((reaction: any) => reaction.user_id === authUser?.value?.id)
}

const hasImages = computed<boolean>(() => {
  if (selectedPost.value?.images && selectedPost.value?.images.length) return true

  return false
})

onMounted(() => {
  autoResize()
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
    @after-leave="handleClose"
    @close="openCloseViewPostModal"
  >
    <template #header></template>

    <div :class="[hasImages ? 'w-full grid grid-cols-1 sm:grid-cols-11' : 'w-full']">
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
              <div class="w-10 h-10 rounded-full overflow-hidden">
                <img :src="getImage(selectedPost?.user.images[0])" class="w-full h-full object-cover">
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
              <HeartIcon 
                class="w-6 h-6 stroke-custom-brown-500 cursor-pointer" 
                :class="[checkIfAlreadyReacted(selectedPost?.reactions ?? []) ? 'fill-custom-brown-500' : 'stroke-custom-brown-500']"
                @click="checkIfAlreadyReacted(selectedPost?.reactions ?? []) ? unsubmitReaction(selectedPost?.reactions ?? []) : submitReaction()"
              />

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
            <div class="w-8 h-8 rounded-full overflow-hidden col-span-1">
              <img
                :src="getImage(authUser?.images?.length ? authUser.images[0] : null)"
                class="w-full h-full object-cover"
              />
            </div>
            
            <div class="col-span-9 relative flex items-center">
              <textarea
                ref="inputRef"
                class="w-full text-sm text-custom-brown-500 ring-0 focus:ring-0 bg-inherit outline-none h-auto max-h-56  overflow-hidden resize-none px-4 py-2 border border-gray-300"
                placeholder="Write your post here"
                v-model="commentForm.content"
                @input="autoResize"
              ></textarea>

              <button class="absolute bottom-4 right-4" @click="submitComment" :disabled="loading">
                <PaperAirplaneIcon class="stroke-custom-brown-500 w-5 h-5" />
              </button>
            </div>
          </div>

          <div v-for="comment in comments" class="grid grid-cols-10 w-full items-center">
            <div class="w-8 h-8 rounded-full overflow-hidden col-span-1">
              <img :src="getImage(comment.user?.images?.length ? comment.user.images[0] : null)" class="w-full h-full object-cover" />
            </div>

            <div class="space-y-1 flex flex-col items-start col-span-9">
              <div class="flex items-center space-x-3">
                <p class="text-base font-medium capitalize">{{ comment.user?.full_name }}</p>

                <div class="w-1 h-1 bg-custom-brown-500 rounded-full"/>

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

  <BaseToast :show="showToast" :message="toastMessage" />
</template>
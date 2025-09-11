<script setup lang="ts">
import dayjs from 'dayjs'
import type { Comment } from '~/types/general'
import { XMarkIcon, PaperAirplaneIcon, HeartIcon, ChatBubbleOvalLeftEllipsisIcon, EllipsisHorizontalIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { getImage } from '~/utils/image'
import { Combobox, Menu, MenuButton, MenuItems } from '@headlessui/vue'

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

async function deleteComment(comment: Comment) {
  const { data } = await $useCustomFetch(`/api/comments/${comment.id}`, { 
    method: 'DELETE' 
  })

  await getComments()
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

function commentOwnUser(comment: Comment) {
  return comment.user.id === authUser?.value?.id
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
                <img :src="getImage(selectedPost?.user.images)" class="w-full h-full object-cover">
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
                class="w-6 h-6 stroke-custom-brown-500"
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

        <div class="space-y-6 px-6 pb-4 items-start flex flex-col w-full h-[350px] overflow-auto">
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

          <div v-for="comment in comments" class="flex items-center justify-between w-full">
            <div class="flex items-center space-x-4">
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
            
            <Menu as="div" class="relative inline-block text-left" v-if="commentOwnUser(comment)">
              <MenuButton>
                <EllipsisHorizontalIcon class="w-6 h-6 stroke-gray-500 cursor-pointer z-0" />
              </MenuButton>

              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="absolute right-0 mt-0 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none p-4 z-[999]"
                >
                  <div @click="deleteComment(comment)" class="p-2 flex items-center space-x-4 cursor-pointer hover:bg-slate-100">
                    <TrashIcon class="w-4 h-4 stroke-custom-brown-500" />

                    <p class="text-sm text-custom-brown-500">Delete</p>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  </BaseModal>

  <BaseToast :show="showToast" :message="toastMessage" />
</template>
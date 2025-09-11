<script setup lang="ts">
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useToast } from 'vue-toastification'
import { EllipsisHorizontalIcon, HeartIcon, ChatBubbleOvalLeftEllipsisIcon, TrashIcon, PencilIcon } from '@heroicons/vue/24/outline'
import type { Post, Reaction } from '~/types/general'
import CarouselImages from './CarouselImages.vue'
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import { getImage } from '~/utils/image'

type ReactionForm = {
  post_id: string,
  user_id: string,
  type: string
}

dayjs.extend(relativeTime)

const props = defineProps<{
  post: Post,
}>()

const emit = defineEmits<{
  success: [void]
}>()

const toast = useToast()
const { openCloseViewPostModal, openCloseEditPostModal } = usePost()
const { user: authUser } = useAuth()
const { $useCustomFetch } = useNuxtApp() 

const reactionForm = ref<ReactionForm>({
  post_id: '',
  user_id: '',
  type: ''
})

function getRemainingTime(date: Date | string) {
  return dayjs(date).fromNow()
}

async function submitReaction() {
  reactionForm.value.post_id = props.post?.id ?? ''
  reactionForm.value.user_id =  authUser.value?.id ?? ''
  reactionForm.value.type = 'heart'

  $useCustomFetch<Post[]>('/api/reactions', {
    method: 'POST',
    body: reactionForm.value,
  })

  emit('success')
}

async function unsubmitReaction(reaction: Reaction[]) {
  const reactionObject = reaction?.find(
    (reaction: any) => reaction.user_id === authUser?.value?.id
  )

  $useCustomFetch<Post[]>(`/api/reactions/${reactionObject?.id}`, {
    method: 'DELETE',
  })

  emit('success')
}

async function deletePost() {
  const { error } = await $useCustomFetch<Post[]>(`/api/posts/${props.post?.id}`, {
    method: 'DELETE',
  })

  toast.success('Post deleted Successfully!')

  emit('success')
}

function checkIfAlreadyReacted(reaction: Reaction[]) {
  return reaction?.some((reaction: any) => reaction.user_id === authUser?.value?.id)
}
</script>

<template>
  <div class="w-full py-6 sm:px-6 space-y-4 bg-white rounded-md">
    <div class="w-full px-6 sm:px-0 flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <div class="w-8 h-8 rounded-full overflow-hidden">
          <img
            :src="getImage(props.post?.user.images)"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="justify-start">
          <p class="text-sm font-bold text-custom-brown-500">{{ props.post?.user.full_name }}</p>

          <p class="text-xs text-gray-500">{{ getRemainingTime(props.post?.updated_at ) }}</p>
        </div>
      </div>

      <div v-if="authUser?.role === 'admin'">
        <Menu as="div" class="relative inline-block text-left z-50">
          <MenuButton>
            <EllipsisHorizontalIcon class="w-6 h-6 stroke-gray-500 cursor-pointer" />
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
              class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none p-4 z-[999]"
            >
              <div 
                class="p-2 flex items-center space-x-4 cursor-pointer hover:bg-slate-100"
                @click="openCloseEditPostModal(props.post)"
              >
                <PencilIcon class="w-4 h-4 stroke-custom-brown-500" />

                <p class="text-sm text-custom-brown-500">Edit</p>
              </div>

              <div @click="deletePost" class="p-2 flex items-center space-x-4 cursor-pointer hover:bg-slate-100">
                <TrashIcon class="w-4 h-4 stroke-custom-brown-500" />

                <p class="text-sm text-custom-brown-500">Delete</p>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>

    <p class="text-custom-brown-500 text-sm px-6 sm:px-0">
      {{ props.post?.description }}
    </p>

    <div v-if="props.post?.images.length">
      <CarouselImages :images="props.post?.images" />
    </div>

    <div class="flex items-center space-x-8 px-6 sm:px-0">
      <div class="flex items-center space-x-2">
        <HeartIcon 
          class="w-6 h-6 cursor-pointer"
          :class="[checkIfAlreadyReacted(props.post?.reactions ?? []) ? 'fill-custom-brown-500' : 'stroke-custom-brown-500']"
          @click="checkIfAlreadyReacted(props.post?.reactions ?? []) ? unsubmitReaction(props.post?.reactions ?? []) : submitReaction()"
        />

        <p class="text-sm text-custom-brown-500">{{ props.post?.reactions.length ?? '0' }}</p>
      </div>

      <div class="flex items-center space-x-2">
        <ChatBubbleOvalLeftEllipsisIcon 
          class="w-6 h-6 stroke-custom-brown-500 cursor-pointer" 
          @click="openCloseViewPostModal(props.post)"
        />

        <p class="text-sm text-custom-brown-500">{{ props.post?.comments.length ?? '0' }}</p>
      </div>
    </div>
  </div>
</template>
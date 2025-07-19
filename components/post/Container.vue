<script setup lang="ts">
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { EllipsisHorizontalIcon, HeartIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/vue/24/outline'
import type { Post, Reaction } from '~/types/general'
import CarouselImages from './CarouselImages.vue'
import auth from '~/middleware/auth'

type ReactionForm = {
  post_id: string,
  user_id: string,
  type: string
}
dayjs.extend(relativeTime)

const props = withDefaults(defineProps<{
  post: Post | null,
}>(), {
  post: null,
})

const emit = defineEmits<{
  success: [void]
}>()

const inputRef = ref<HTMLTextAreaElement | null>(null)
const { openCloseViewPostModal } = usePost()
const { user: authUser } = useAuth()
const reactionForm = ref<ReactionForm>({
    post_id: '',
    user_id: '',
    type: ''
})

function autoResize() {
  const el = inputRef.value

  if (el) {
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }
}

function getRemainingTime(date: Date | string) {
  return dayjs(date).fromNow() // returns "in 3 days" or "2 hours ago"
}

async function submitReaction() {
  reactionForm.value.post_id = props.post?.id ?? ''
  reactionForm.value.user_id =  authUser.value?.user.id ?? ''
  reactionForm.value.type = 'heart'

  const { error } = await useFetch('/api/reactions', {
    baseURL: useRuntimeConfig().public.apiBase,
    method: 'POST',
    body: reactionForm.value,
    credentials: 'include',
  })

  emit('success')
}

function checkIfAlreadyReacted(reaction: Reaction[]) {
  return reaction?.some((reaction: any) => reaction.user_id === authUser.value?.user.id)
}

onMounted(() => {
  autoResize()
})
</script>

<template>
  <div class="w-full p-6 space-y-4 bg-white rounded-md overflow-hidden">
    <div class="w-full flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <div class="w-8 h-8 rounded-full overflow-hidden bg-custom-brown-500 border border-custom-brown-300"></div>

        <div class="justify-start">
          <p class="text-sm font-bold text-custom-brown-500">{{ props.post?.user.full_name }}</p>

          <p class="text-xs text-gray-500">{{ getRemainingTime(props.post?.updated_at ) }}</p>
        </div>
      </div>

      <EllipsisHorizontalIcon class="w-6 h-6 stroke-gray-500 cursor-pointer" />
    </div>

    <p class="text-custom-brown-500 text-sm">
      {{ props.post?.description }}
    </p>

    <div v-if="props.post?.images.length">
      <CarouselImages :images="props.post?.images" />
    </div>

    <div class="flex items-center space-x-8">
      <div class="flex items-center space-x-2">
        <HeartIcon 
          class="w-6 h-6 cursor-pointer"
          :class="[checkIfAlreadyReacted(props.post?.reactions ?? []) ? 'fill-custom-brown-500' : 'stroke-custom-brown-500']"
          @click="submitReaction"
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
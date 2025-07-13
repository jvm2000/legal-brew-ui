<script setup lang="ts">
import { EllipsisHorizontalIcon, HeartIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/vue/24/outline'
import { PaperAirplaneIcon } from '@heroicons/vue/20/solid'
import type { Post, Comment } from '~/types/general';
import CarouselImages from './CarouselImages.vue';

const props = withDefaults(defineProps<{
  post: Post | null,
}>(), {
  post: null,
})

const emit = defineEmits<{
  success: [void]
}>()

const inputRef = ref<HTMLTextAreaElement | null>(null)
const comments = ref<Comment[]>([])
const { user: authUser } = useAuth()
const isCommenting = ref(false)
const commentForm = ref({
  content: '',
  post_id: props.post?.id,
  user_id: authUser.value?.user.id
})

async function openCommentSection() {
  isCommenting.value = !isCommenting.value

  await getComments()
}

function autoResize() {
  const el = inputRef.value

  if (el) {
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }
}

async function submit() {
  const { error } = await useFetch('/api/comments', {
    baseURL: useRuntimeConfig().public.apiBase,
    method: 'POST',
    body: commentForm.value,
    credentials: 'include',
  })

  await getComments()
}

async function getComments() {
  const { data } = await useFetch<Comment[]>(`/api/posts/${props.post?.id}/comments`, {
    baseURL: useRuntimeConfig().public.apiBase,
    method: 'GET',
    credentials: 'include',
  })

  if (data.value) {
    comments.value = data.value
  }

  commentForm.value.content = ''
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

          <p class="text-xs text-gray-500">10 hours ago</p>
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
        <HeartIcon class="w-6 h-6 stroke-custom-brown-500 cursor-pointer" />

        <p class="text-sm text-custom-brown-500">{{ props.post?.reactions.length ?? '0' }}</p>
      </div>

      <div class="flex items-center space-x-2">
        <ChatBubbleOvalLeftEllipsisIcon 
          class="w-6 h-6 stroke-custom-brown-500 cursor-pointer" 
          @click="openCommentSection"
        />

        <p class="text-sm text-custom-brown-500">{{ props.post?.comments.length ?? '0' }}</p>
      </div>
    </div>

    <div v-if="isCommenting" class="space-y-4 max-h-80 relative">
      <div class="max-h-56 space-y-4 overflow-auto">
        <div v-for="comment in comments" class="flex items-center space-x-4">
          <div class="w-8 h-8 rounded-full overflow-hidden bg-custom-brown-500 border border-custom-brown-300"></div>

          <div>
            <p class="text-custom-brown-500 font-bold text-sm">{{ comment.user.full_name }}</p>

            <p class="text-custom-brown-500 text-sm">{{ comment.content }}</p>
          </div>
        </div>
      </div>

      <div class="flex space-x-4 sticky bottom-0">
        <div class="w-8 h-8 rounded-full overflow-hidden bg-custom-brown-500 border border-custom-brown-300"></div>

        <div class="relative w-full">
          <textarea
            ref="inputRef"
            v-model="commentForm.content"
            class="border-2 border-custom-brown-500 w-full focus:ring-0 outline-none px-4 py-2 rounded-md text-sm h-auto max-h-56 resize-none  overflow-hidden"
            :placeholder="`Comment as ${authUser?.user.full_name}`"
            @input="autoResize"
          ></textarea>

          <PaperAirplaneIcon class="fill-custom-brown-500 absolute right-4 bottom-4 w-4 h-4" @click="submit" />
        </div>
      </div>
    </div>
  </div>
</template>
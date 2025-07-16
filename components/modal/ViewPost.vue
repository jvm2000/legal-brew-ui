<script setup lang="ts">
import type { Post } from '~/types/general';
import { XMarkIcon, EllipsisHorizontalIcon, PaperAirplaneIcon, HeartIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/vue/24/outline'

const props = withDefaults(defineProps<{
  post?: Post | null,
}>(), {
  post: null,
})

const inputRef = ref<HTMLTextAreaElement | null>(null)
const { isViewPostModal, openCloseViewPostModal } = usePost()
const inputText = ref('')

function autoResize() {
  const el = inputRef.value

  if (el) {
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }
}
</script>

<template>
  <BaseModal
    :open="isViewPostModal"
    title="Create Post"
    size="6xl"
    shape="straight"
    noPadding
    @close="openCloseViewPostModal"
  >
    <template #header></template>

    <div class="w-full grid grid-cols-11">
      <div class="w-full bg-black col-span-6"></div>

      <div class="w-full space-y-6 col-span-5 h-[650px]">
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
                <p class="text-base font-medium">Amin underserved</p>
                
                <p class="text-xs text-custom-brown-300">10 hours ago</p>
              </div>
            </div>
          </div>

          <p class="text-sm text-custom-brown-500 text-left">
            Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          </p>

          <div class="flex items-center space-x-8">
            <div class="flex items-center space-x-2">
              <HeartIcon class="w-6 h-6 stroke-custom-brown-500 cursor-pointer" />

              <p class="text-sm text-custom-brown-500">{{ props.post?.reactions.length ?? '0' }}</p>
            </div>

            <div class="flex items-center space-x-2">
              <ChatBubbleOvalLeftEllipsisIcon 
                class="w-6 h-6 stroke-custom-brown-500 cursor-pointer" 
                @click="openCloseViewPostModal()"
              />

              <p class="text-sm text-custom-brown-500">{{ props.post?.comments.length ?? '0' }}</p>
            </div>
          </div>
        </div>

        <div class="space-y-6 px-6 pb-4 items-start flex flex-col w-full">
          <p class="text-base text-custom-brown-500">Comments(15)</p>

          <div class="grid grid-cols-10 w-full items-center">
            <div class="w-8 h-8 rounded-full bg-custom-brown-500 overflow-hidden col-span-1">
            </div>
            
            <div class="col-span-9 relative flex items-center">
              <input 
                type="text" 
                class="w-full ring-0 focus:ring-0 outline-none px-4 py-2 rounded-md border border-gray-300"
                placeholder="Leave a comment"
              />

              <PaperAirplaneIcon class="stroke-custom-brown-500 absolute right-4 w-5 h-5" />
            </div>
          </div>

          <div class="grid grid-cols-10 w-full items-start">
            <div class="w-8 h-8 rounded-full bg-custom-brown-500 overflow-hidden col-span-1">
            </div>

            <div class="space-y-1 flex flex-col items-start col-span-9">
              <div class="flex items-center space-x-3">
                <p class="text-base font-medium">Yaha</p>

                <div class="w-1 h-1 bg-custom-brown-500 rounded-full" />

                <p class="text-sm text-custom-brown-500">10 hours ago</p>
              </div>

              <p class="text-sm text-custom-brown-500 text-left">
                Nunc tempor interdum ex, sed cursus nunc egestas aliquet. Pellentesque interdum vulputate elementum. Donec erat diam, pharetra nec enim ut, bibendum pretium tellus. Vestibulum et turpis nibh. Cras vel ornare velit, ac pretium arcu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>
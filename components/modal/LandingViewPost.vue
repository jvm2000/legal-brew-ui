<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { getImage } from '~/utils/image'

const { isViewLandingPostModal, selectedPost } = usePost()
const inputRef = ref<HTMLTextAreaElement | null>(null)
const showToast = ref(false)
const toastMessage = ref('')
const expanded = ref(false)

function autoResize() {
  const el = inputRef.value

  if (el) {
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }
}

function toggleExpand() {
  expanded.value = !expanded.value
}

const needsTruncate = computed(() => {
  return selectedPost?.value.description?.split(/\r\n|\r|\n/).length > 4 || selectedPost?.value.description?.length > 200
})

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
    :open="isViewLandingPostModal"
    title="View Post"
    :size="[hasImages ? '6xl' : 'xl']"
    shape="straight"
    noPadding
    closeOnDialogClick
  >
    <template #header></template>

    <div :class="[hasImages ? 'w-full grid grid-cols-1 sm:grid-cols-11' : 'w-full']">
      <div v-if="hasImages" class="w-full bg-black col-span-6 flex items-center">
        <PostCarouselImages max-height="h-xl" :images="selectedPost?.images" />
      </div>

      <div 
        class="space-y-6"
        :class="[hasImages ? 'w-full col-span-5' : 'w-full']"
      >
        <div class="flex items-center justify-between py-4 border-b border-gray-300">
          <p class="text-base font-medium pl-6 text-custom-brown-500">Post Details</p>

          <XMarkIcon class="w-6 h-6 stroke-brown-500 cursor-pointer mr-6" @click="isViewLandingPostModal = false" />
        </div>

        <div class="space-y-4 px-6 pb-6 border-b border-gray-300">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 rounded-full overflow-hidden">
                <img :src="getImage(selectedPost?.user.images)" class="w-full h-full object-cover">
              </div>

              <div class="flex flex-col items-start">
                <p class="text-base font-medium capitalize">{{ selectedPost?.user.full_name }}</p>
              </div>
            </div>
          </div>

          <p v-if="selectedPost?.title" class="font-medium w-full text-left">{{ selectedPost?.title }}</p>

          <p class="text-sm text-custom-brown-500 text-left whitespace-pre-line">
            <span :class="!expanded ? 'line-clamp-4' : ''">{{ selectedPost?.description }} &nbsp;</span>

            <span
              v-if="needsTruncate"
              @click="toggleExpand"
              class="text-blue-500 text-sm hover:underline cursor-pointer"
            >
              {{ expanded ? 'See less' : 'See more' }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </BaseModal>

  <BaseToast :show="showToast" :message="toastMessage" />
</template>
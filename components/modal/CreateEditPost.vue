<script setup lang="ts">
import { PhotoIcon, LinkIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import type { Post } from '~/types/general';

type PostForm = {
  description: string,
  hyperlink: string,
  images: any[],
  user_id: string
}

const emit = defineEmits<{
  success: [void]
}>()

const { $useCustomFetch } = useNuxtApp()
const loading = ref(false)
const { user: authUser } = useAuth()
const { isOpenPostModal, isPostEditing, selectedPost } = usePost()
const textareaRef = ref<HTMLTextAreaElement  | null>(null)
const images = ref<File[]>([])
const previews = ref<string[]>([]) 
const form = ref<PostForm>({
  description: '',
  hyperlink: '',
  images: [],
  user_id: ''
})

function handleOpen() {
  if (!isPostEditing.value) return

  form.value.description = selectedPost.value.description
  images.value = selectedPost.value.images ?? []
  previews.value = selectedPost.value.images ?? []
}

function autoResize() {
  const el = textareaRef.value

  if (el) {
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }
}

function handleFiles(event: Event) {
  const target = event.target as HTMLInputElement
  const files = target.files

  if (!files) return

  for (let i = 0; i < files.length; i++) {
    const file = files[i]

    images.value.push(file)

    const reader = new FileReader()
    reader.onload = (e) => {
      previews.value.push(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  target.value = ''
}

function removeImage(index: number) {
  images.value.splice(index, 1)
  previews.value.splice(index, 1)
}

function uploadImage() {
  document.getElementById('profile-photo')?.click()
} 

async function submit() {
  const { isOpenPostModal } = usePost()

  loading.value = true

  const formData = new FormData()

  formData.append('description', form.value.description || '')
  formData.append('hyperlink', form.value.hyperlink || '')
  formData.append('user_id', authUser.value?.id || '')

  if (form.value.images && form.value.images.length > 0) {
    for (let i = 0; i < form.value.images.length; i++) {
      formData.append('images[]', form.value.images[i])
    }
  }

  const { error } = await $useCustomFetch<Post>('/api/posts', {
    method: 'POST',
    body: formData
  })

  emit('success')

  loading.value = false

  isOpenPostModal.value = false
}

async function submitUpdate() {
  const { isOpenPostModal } = usePost()

  loading.value = true

  const formData = new FormData()

  formData.append('description', form.value.description || '')
  formData.append('hyperlink', form.value.hyperlink || '')
  formData.append('user_id', authUser.value?.id || '')

  if (form.value.images && form.value.images.length > 0) {
    for (let i = 0; i < form.value.images.length; i++) {
      formData.append('images[]', form.value.images[i])
    }
  }

  const { error } = await $useCustomFetch(`/api/posts/${selectedPost.value.id}`, { 
    method: 'PUT',
    body: formData,
  })

  emit('success')

  loading.value = false

  isOpenPostModal.value = false
}

function submitUpdateOrCreate() {
  if (!isPostEditing.value) return submit()

  if (isPostEditing.value) return submitUpdate()
}

function resetForm() {
  form.value.description = ''
  form.value.hyperlink = ''
  form.value.images = []

  images.value = []
  previews.value = []
}

function getImage(path: string) {
  return `${ useRuntimeConfig().public.apiBase }/storage/${path}`
}

onMounted(() => {
  autoResize()
})
</script>

<template>
  <BaseModal
    :open="isOpenPostModal"
    :title="isPostEditing ? 'Edit Post' : 'Create Post'"
    size="lg"
    @before-enter="handleOpen"
    @close="isOpenPostModal = false"
    @after-leave="resetForm"
  >
    <div class="space-y-2">
      <div class="flex items-center space-x-4">
        <div class="w-8 h-8 rounded-full overflow-hidden bg-custom-brown-500 border border-custom-brown-300"></div>

        <p class="text-base font-medium text-custom-brown-500">{{ authUser?.full_name }}</p>
      </div>

      <textarea
        ref="textareaRef"
        class="w-full text-sm text-custom-brown-500 ring-0 focus:ring-0 bg-inherit outline-none py-3 h-auto max-h-56  overflow-hidden resize-none"
        placeholder="Write your post here"
        v-model="form.description"
        @input="autoResize"
      ></textarea>

      <div class="flex items-center space-x-2">
        <div 
          v-for="(src, index) in previews"
          :key="index"
          class="w-24 h-24 relative overflow-hidden"
        >
          <img :src="isPostEditing ? getImage(src) : src" class="w-full h-full object-cover">

          <XMarkIcon class="w-4 h-4 absolute top-1 right-1 cursor-pointer" @click="removeImage(index)" />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="relative">
            <input 
              id="profile-photo"
              type="file" 
              accept="image/*" 
              multiple 
              @change="handleFiles" class="hidden absolute" 
            />

            <PhotoIcon
              @click="uploadImage"
              class="w-6 h-6 stroke-gray-500 cursor-pointer"
            />
          </div>
        </div>

        <div class="w-24">
          <BaseButton
            :isLoading="loading"
            @click="submitUpdateOrCreate"
          >Post</BaseButton>
        </div>
      </div>
    </div>
  </BaseModal>
</template>
<script setup lang="ts">
import { ArrowLongLeftIcon } from '@heroicons/vue/24/outline'
import { getImage } from '~/utils/image'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

useHead({ title: 'Settings' })

type UserForm = {
  username: string,
  full_name: string,
  email: string,
  contact_no: string,
  birthdate: string,
  images: any[],
}

const { user: authUser } = useAuth()
const { $useCustomFetch } = useNuxtApp()
const userForm = ref<UserForm>({
  username: '',
  full_name: '',
  email: '',
  contact_no: '',
  birthdate: '',
  images: [],
})
const images = ref<File[]>([])
const preImage = ref<string[]>([]) 
const previews = ref<string[]>([]) 
const loading = ref(false)

async function handleOpen() {
  userForm.value.username = authUser.value?.username ?? ''
  userForm.value.full_name = authUser.value?.full_name ?? ''
  userForm.value.email = authUser.value?.email ?? ''
  userForm.value.contact_no = authUser.value?.contact_no ?? ''
  userForm.value.birthdate = authUser.value?.birthdate ?? ''

  if (authUser.value?.images) return preImage.value = authUser.value?.images ?? []
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

  userForm.value.images = [...images.value]
}

function uploadImage() {
  document.getElementById('profile-photo')?.click()
}

function clearImage() {
  if (!preImage.value) preImage.value = []
  
  images.value = []
  previews.value = []
}

async function submit() {
  loading.value = true
  const formData = new FormData()

  formData.append('username', userForm.value.username || '')
  formData.append('full_name', userForm.value.full_name || '')
  formData.append('email', userForm.value.email || '')
  formData.append('contact_no', userForm.value.contact_no || '')
  formData.append('birthdate', userForm.value.birthdate || '')

  if (userForm.value.images && userForm.value.images.length > 0) {
    for (let i = 0; i < userForm.value.images.length; i++) {
      formData.append('images[]', userForm.value.images[i])
    }
  }

  formData.append('_method', 'PUT')

  const { error } = await $useCustomFetch('/api/userUpdate', {
    method: 'POST',
    body: formData
  })

  loading.value = false

  if (!error.value) {
    await window.location.reload()
  } else {
    console.error(error.value)
  }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

onMounted(async () => {
  await delay(500)
  await handleOpen()
})
</script>

<template>
  <div class="max-w-xl w-full space-y-8 bg-white py-6 px-10 rounded-md">
    <div class="flex items-center space-x-2 cursor-pointer" @click="navigateTo('/dashboard')">
      <ArrowLongLeftIcon class="w-6 h-6 stroke-custom-brown-500" />

      <p class="text-sm text-custom-brown-500 font-medium">Back</p>
    </div>

    <p class="text-2xl font-semibold text-custom-brown-500">Account Settings</p>

    <div class="w-full flex flex-col items-center space-y-4">
      <div class="w-28 h-28 rounded-full relative overflow-hidden">
        <img :src="previews[0] ?? getImage(preImage)" class="w-full h-full object-cover">
      </div>

      <div class="flex items-center space-x-4 relative">
        <p 
          class="text-sm text-custom-brown-500 font-medium cursor-pointer"
          @click="uploadImage"
        >Upload</p>

        <p class="text-sm text-custom-brown-500 font-medium cursor-pointer" @click="clearImage">Remove</p>

        <input 
          id="profile-photo"
          type="file" 
          accept="image/*" 
          multiple
          @change="handleFiles" class="hidden absolute" 
        />
      </div>

      <div class="w-full">
        <label class="block text-sm font-medium text-custom-brown-500 mb-1">Full Name</label>
        <input
          type="text"
          v-model="userForm.full_name"
          placeholder="Enter Name"
          class="w-full border rounded-md p-2 text-sm"
        />
      </div>

      <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div class="w-full">
          <label class="block text-sm font-medium text-custom-brown-500 mb-1">Email</label>
          <input
            type="email"
            v-model="userForm.email"
            placeholder="Enter Email"
            class="w-full border rounded-md p-2 text-sm"
          />
        </div>

        <div class="w-full">
          <label class="block text-sm font-medium text-custom-brown-500 mb-1">Username</label>
          <input
            type="text"
            v-model="userForm.username"
            placeholder="Enter Username"
            class="w-full border rounded-md p-2 text-sm"
          />
        </div>
      </div>

      <div class="w-full">
        <label class="block text-sm font-medium text-custom-brown-500 mb-1">Birthdate</label>
        <input
          type="date"
          v-model="userForm.birthdate"
          class="w-full border rounded-md p-2 text-sm"
        />
      </div>

      <div class="w-full">
        <label class="block text-sm font-medium text-custom-brown-500 mb-1">Contact No</label>
        <input
          type="number"
          v-model="userForm.contact_no"
          class="w-full border rounded-md p-2 text-sm"
        />
      </div>

      <div class="w-full">
        <label class="block text-sm font-medium text-custom-brown-500 mb-1">Password</label>
        <input
          type="password"
          value="****************"
          class="w-full border rounded-md p-2 text-sm"
        />
      </div>

      <div class="w-full flex sm:justify-end">
        <div class="w-full sm:w-36">
          <BaseButton :isLoading="loading" @click="submit">Save Changes</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>
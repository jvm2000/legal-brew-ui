<script setup lang="ts">
import { CameraIcon} from '@heroicons/vue/24/outline'

useHead({ title: 'Sign Up' })

type RegisterForm = {
  username: string,
  full_name: string,
  email: string,
  birthdate: string,
  password: string,
  contact_no: string,
  role: 'client' | 'admin'
  images: any[]
}

const showToast = ref(false)
const toastMessage = ref('')
const images = ref<File[]>([])
const previews = ref<string[]>([]) 
const loading = ref(false)
const form = ref<RegisterForm>({
  username: '',
  full_name: '',
  email: '',
  birthdate: '',
  password: '',
  contact_no: '',
  role: 'client',
  images: images.value
})

async function submit() {
  showToast.value = true
  toastMessage.value = 'Registered Successfully!'

  loading.value = true

  const formData = new FormData()

  formData.append('full_name', form.value.full_name || '')
  formData.append('username', form.value.username || '')
  formData.append('email', form.value.email || '')
  formData.append('birthdate', form.value.birthdate || '')
  formData.append('password', form.value.password || '')
  formData.append('contact_no', form.value.contact_no || '')
  formData.append('role', form.value.role || '')

  if (form.value.images && form.value.images.length > 0) {
    for (let i = 0; i < form.value.images.length; i++) {
      formData.append('images[]', form.value.images[i])
    }
  }

  const { error } = await useFetch('/api/register', {
    baseURL: 'laravel.restaurolegalservices.com',
    method: 'POST',
    body: formData,
    credentials: 'include',
  })

  await useFetch('/api/verification/send', {
    baseURL: 'laravel.restaurolegalservices.com',
    method: 'POST',
    body: {
      email: form.value.email
    },
    credentials: 'include',
  })

  showToast.value = false

  if (!error.value) {
    loading.value = false

    await navigateTo('/')
    return
  }

  return
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

const isDisabled = computed(() => {
  if (!form.value.birthdate || !form.value.contact_no || !form.value.email || !form.value.full_name || !form.value.images || !form.value.password || !form.value.username) return true

  return false
})

definePageMeta({
  middleware: 'guest'
})
</script>

<template>
  <div class="app-container overflow-x-hidden">
    <div class="w-full bg-custom-brown-200 flex items-center justify-between drop-shadow-sm px-44 fixed-0">
      <div class="flex items-center space-x-4 py-6">
        <img src="/images/logo-landing.svg" />

        <div class="space-y-2">
          <img src="/images/logo-landing-text1.svg" />

          <div class="w-28 h-[2px] bg-black" />

          <img src="/images/logo-landing-text2.svg" />
        </div>
      </div>
    </div>

    <div class="w-full flex flex-col items-center py-12">
      <div class="max-w-xl w-full space-y-6 bg-white p-6 rounded-md">
        <div class="space-y-1.5">
          <p class="text-2xl font-medium text-custom-brown-500">Registration Form</p>

          <p class="text-sm text-custom-brown-500">Vorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        <div class="py-2 flex flex-col items-center space-y-2">
          <div 
            v-if="!previews.length" class="w-28 h-28 rounded-full border border-gray-400 grid place-items-center relative cursor-pointer"
            @click="uploadImage"
          >
            <CameraIcon class="w-6 h-6 stroke-gray-400" />

            <input 
              id="profile-photo"
              type="file" 
              accept="image/*" 
              multiple
              @change="handleFiles" class="hidden absolute" 
            />
          </div>

          <div v-if="previews.length" class="w-28 h-28 rounded-full border border-gray-400 grid place-items-center relative overflow-hidden">
            <img :src="previews[0]" class="w-full h-full object-fill">
          </div>

          <p class="text-sm text-custom-brown-500 font-medium">Add Picture</p>
        </div>

        <div class="flex flex-col space-y-1.5">
          <label for="" class="text-sm font-medium text-custom-brown-500">Full Name</label>

          <input 
            v-model="form.full_name"
            type="text"
            class="text-sm ring-0 focus:ring-0 outline-none px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Full Name"
          >
        </div>

        <div class="flex flex-col space-y-1.5">
          <label for="" class="text-sm font-medium text-custom-brown-500">Username</label>

          <input 
            v-model="form.username"
            type="text"
            class="text-sm ring-0 focus:ring-0 outline-none px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Username"
          >
        </div>

        <div class="flex flex-col space-y-1.5">
          <label for="" class="text-sm font-medium text-custom-brown-500">Birthdate</label>

          <input 
            v-model="form.birthdate"
            type="date"
            class="text-sm ring-0 focus:ring-0 outline-none px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Month/Day/Year"
          >
        </div>

        <div class="flex flex-col space-y-1.5">
          <label for="" class="text-sm font-medium text-custom-brown-500">Email</label>

          <input 
            v-model="form.email"
            type="text"
            class="text-sm ring-0 focus:ring-0 outline-none px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter email"
          >
        </div>

        <div class="flex flex-col space-y-1.5">
          <label for="" class="text-sm font-medium text-custom-brown-500">Contact No.</label>

          <input 
            v-model="form.contact_no"
            type="text"
            class="text-sm ring-0 focus:ring-0 outline-none px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter contact number"
          >
        </div>

        <div class="flex flex-col space-y-1.5">
          <label for="" class="text-sm font-medium text-custom-brown-500">Password</label>

          <input 
            v-model="form.password"
            type="password"
            class="text-sm ring-0 focus:ring-0 outline-none px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter password"
          >
        </div>

        <div class="w-full flex justify-end">
          <div class="w-24">
            <BaseButton :disabled="isDisabled" @click="submit">
              Done
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>

  <BaseToast :show="showToast" :message="toastMessage" />
</template>

<style scoped>
.app-container {
  background-color: #FAF1E9;
  min-height: 100vh;
}
</style>
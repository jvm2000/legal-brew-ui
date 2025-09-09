<script setup lang="ts">
type Form = {
  email: string,
  code: string
}

const { user: authUser } = useAuth()
const loading = ref(false)
const verifyForm = ref<Form>({
  email: authUser.value?.email ?? '',
  code: ''
})
const { $useCustomFetch } = useNuxtApp()
const errors = ref([])

async function resendCode() {
  loading.value = true

  await useFetch('/api/verification/send', {
    baseURL: 'laravel.restaurolegalservices.com',
    method: 'POST',
    body: {
      email: authUser.value?.email
    },
    credentials: 'include',
  })

  loading.value = false
}

async function submitCode() {
  loading.value = true

  const { error } = await $useCustomFetch('/api/verification/check', { 
    method: 'POST',
    body: verifyForm.value,
  })

  loading.value = false

  if (error?.value) {
    errors.value = error.value?.data?.message ?? 'Invalid code'

    return
  }

  window.location.reload()
}

function handleInput() {
  errors.value = []
}
</script>

<template>
  <div class="max-w-xl w-full space-y-6 p-6 bg-white">
    <p class="text-2xl font-medium">Verify First</p>

    <p class="text-sm text-custom-brown-500">
      Please verify your email address to complete your registration and activate your account on our website.
    </p>

    <div class="space-y-2">
      <div>
        <input 
          v-model="verifyForm.code"
          class="w-full text-sm text-custom-brown-500 ring-0 focus:ring-0 bg-inherit outline-none overflow-hidden resize-none px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Input your code here"
          @input="handleInput"
        />

        <span v-if="errors.length" class="text-xs text-red-500">{{ errors }}</span>
      </div>

      <p class="text-xs text-custom-brown-500">
        Didn’t receive the code? Click <span class="text-blue-400 font-medium cursor-pointer" @click="resendCode">here</span> to resend your verification code.
      </p>
    </div>

    <BaseButton :isLoading="loading" @click="submitCode">Submit</BaseButton>
  </div>
</template>
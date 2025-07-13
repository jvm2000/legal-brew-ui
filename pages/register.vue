<script setup lang="ts">
useHead({ title: 'Sign Up' })

type RegisterForm = {
  username: string,
  full_name: string,
  email: string,
  password: string,
  contact_no: string
}

const form = ref<RegisterForm>({
  username: '',
  full_name: '',
  email: '',
  password: '',
  contact_no: ''
})

async function submit() {
  const { error } = await useFetch('/api/register', {
    baseURL: useRuntimeConfig().public.apiBase,
    method: 'POST',
    body: form.value,
    credentials: 'include',
  })
}

definePageMeta({
  layout: 'landing',
  middleware: 'guest'
})
</script>

<template>
  <div class="w-full py-24 flex flex-col items-center">
    <div class="w-full max-w-lg space-y-4">
      <BaseInput
        type="email"
        v-model="form.email"
        label="Email"
        placeholder="Enter email"
      />

      <BaseInput
        v-model="form.username"
        label="Username"
        placeholder="Enter username"
      />

      <BaseInput
        v-model="form.full_name"
        label="Full name"
        placeholder="Enter full name"
      />

      <BaseInput
        type="Password"
        v-model="form.password"
        label="Password"
        placeholder="Enter password"
      />

      <BaseInput
        v-model="form.contact_no"
        label="Contact Number"
        placeholder="Enter contact number"
      />

      <BaseButton @click="submit">Sign Up</BaseButton>
    </div>
  </div>
</template>
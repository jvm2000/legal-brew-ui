<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

useHead({ title: 'Dashboard' })

const { user: authUser } = useAuth()
</script>

<template>
  <Admin v-if="authUser?.role === 'admin'" />

  <Client v-if="authUser?.role === 'client'" />
</template>
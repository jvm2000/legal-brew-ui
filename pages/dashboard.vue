<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

useHead({ title: 'Dashboard' })

const { user: authUser } = useAuth()
</script>

<template>
  <Client />
</template>
<script setup lang="ts">
import type { Post } from '~/types/general'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

useHead({ title: 'Dashboard' })

const { user: authUser } = useAuth()
</script>

<template>
  <Admin v-if="authUser?.user.role === 'admin'" />
</template>
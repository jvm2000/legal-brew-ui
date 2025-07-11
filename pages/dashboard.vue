<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useHead({ title: 'Dashboard' })

const { user } = useAuth()
</script>

<template>

</template>
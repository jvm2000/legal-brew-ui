<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

useHead({ title: 'Cart' })
</script>

<template>
  <CartList />
</template>
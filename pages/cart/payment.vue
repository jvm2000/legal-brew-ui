<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

useHead({ title: 'Payment' })
</script>

<template>
  <CartPayment />
</template>
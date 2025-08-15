<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const { isAlreadyExistedModal } = usePayment()

const breakpoints = useBreakpoints(breakpointsTailwind)
const xse = breakpoints.smallerOrEqual('sm')
</script>

<template>
  <BaseModal
    :open="isAlreadyExistedModal"
    :size="xse ? 'sm' : 'xs'"
    @close="isAlreadyExistedModal = false"
  >
    <template #header></template>

    <div class="flex flex-col items-center space-y-6">
      <div class="w-24 h-24 bg-red-500 rounded-full grid place-items-center">
        <XMarkIcon class="w-12 h-12 stroke-white" />
      </div>

      <p class="text-sm text-custom-brown-500">This time slot is unavailable. Kindly choose another.</p>

      <BaseButton @click="isAlreadyExistedModal = false">Confirm</BaseButton>
    </div>
  </BaseModal>
</template>
<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

type ButtonProps = {
  /**
   * If the input is required.
   */
  isLoading?: boolean,

  /**
   * If the input is required.
   */
  disabled?: boolean,
}

const props = withDefaults(
  defineProps<{
    isLoading?: ButtonProps['isLoading'],
    disabled?: ButtonProps['disabled'],
  }>(),
  {
    isLoading: false,
    disabled: false,
  }
)
</script>

<template>  
  <button 
    class="bg-custom-brown-500 py-2 text-sm text-white text-center w-full rounded-md"
    :disabled="props.isLoading || props.disabled"
  >
    <div class="flex flex-col items-center w-full">
      <ClientOnly>
        <svg
          class="animate-spin h-5 w-5 sm:h-4 sm:w-4"
          :class="[twMerge(
            $slots.default && '-ml-1 mr-3',
            'text-white'
          )]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          v-if="isLoading"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </ClientOnly>
    </div>

    <div v-if="!props.isLoading">
      <slot />
    </div>
  </button>
</template>
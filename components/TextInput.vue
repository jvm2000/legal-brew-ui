<script setup lang="ts">
defineOptions({ inheritAttrs: false })

type InputProps = {
  /**
   * The placeholder to display for the input.
   */
  placeholder?: string,

  /**
   * The label to display for the input.
   */
  label?: string

  /**
   * An error message or messages value indicating whether the input is in an error state.
   */
  error?: string | string[] | null,
}
const model = defineModel({ required: false })
const props = withDefaults(
  defineProps<{
    placeholder?: InputProps['placeholder'],
    label?: InputProps['label'],
    error?: InputProps['error'],
  }>(),
  {
    type: 'text',
    error: '',
    info: ''
  }
)

const errorMessage = ref<string[] | string | null>('')

watch(
  () => props.error,
  (value) => {
    errorMessage.value = value
  }
)

function handleInput(event: Event) {
  errorMessage.value = ''
}
</script>

<template>
  <div class="flex flex-col space-y-1.5 w-full">
    <label for="" class="text-sm font-medium text-custom-brown-500">{{ props.label }}</label>

    <input 
      v-model="model"
      type="text"
      class="text-sm ring-0 focus:ring-0 outline-none px-4 py-2 border rounded-md w-full"
      :class="[errorMessage ? 'ring-1 ring-red-500 placeholder-red-500' : 'border-gray-300']"
      :placeholder="props.placeholder"
      @input="handleInput"
    >
    
    <p v-if="errorMessage" class="text-xs text-red-500">{{ errorMessage }}</p>
  </div>
</template>
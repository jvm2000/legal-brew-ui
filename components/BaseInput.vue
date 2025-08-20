<script setup lang="ts">
import { EyeIcon, EyeSlashIcon, InformationCircleIcon } from '@heroicons/vue/24/outline';
import { twMerge } from 'tailwind-merge'

defineOptions({ inheritAttrs: false })

type InputProps = {
  /**
   * The form input identifier.
   */
  id?: string

  /**
   * The placeholder to display for the input.
   */
  placeholder?: string,

  /**
   * The label to display for the input.
   */
  label?: string

  /**
   * The type of input.
   */
  type: string,

  /**
   * An error message or messages value indicating whether the input is in an error state.
   */
  error?: string | string[] | null,

  /**
   * If the input is required.
   */
  required?: boolean,
}
const model = defineModel({ required: false })
const props = withDefaults(
  defineProps<{
    id?: InputProps['id'],
    placeholder?: InputProps['placeholder'],
    label?: InputProps['label'],
    type?: InputProps['type'],
    error?: InputProps['error'],
    required?: InputProps['required']
  }>(),
  {
    type: 'text',
    error: '',
    info: ''
  }
)

const isPlainText = ref(false)
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

function toggle() {
  isPlainText.value = !isPlainText.value
}
</script>

<template>  
  <div class="flex flex-col space-y-2">
    <label :for="props.id" class="text-sm text-custom-brown-300 font-medium">{{ props.label }}</label>

    <div class="flex items-center relative">
      <input 
        :id="props.id"
        :type="props.type === 'password' && isPlainText ? 'text' : props.type"
        v-model="model"
        v-bind="$attrs"
        class="bg-custom-brown-200 text-sm p-3 rounded-md placeholder-custom-brown-300 w-full text-custom-brown-500"
        :placeholder="props.placeholder ?? 'Enter value'"
        @input="handleInput"
      />

      <EyeIcon
        v-if="props.type === 'password' && !isPlainText"
        class="w-4 h-4 stroke-custom-brown-300 cursor-pointer absolute right-3 z-[1]"
        @click="toggle"
      />

      <EyeSlashIcon
        v-if="props.type === 'password' && isPlainText"
        class="w-4 h-4 stroke-custom-brown-300 cursor-pointer absolute right-3 z-[1]"
        @click="toggle"
      />
    </div>

    <p v-if="errorMessage" class="text-xs text-red-500">{{ errorMessage }}</p>
  </div>
</template>
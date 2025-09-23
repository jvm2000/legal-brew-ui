<script setup lang="ts">
import { useMenuServices } from '~/composables/useMenuServices';

const emit = defineEmits<{
  success: [void]
}>()

const { isOpenEditModal, menuServicesForm, selectedService } = useMenuServices()
const { $useCustomFetch } = useNuxtApp()
const loading = ref(false)

async function submit() {
  loading.value = true

  const { error } = await $useCustomFetch(`/api/menuservices/${selectedService.value?.id}`, {
    method: 'PUT',
    body: {
      details: menuServicesForm.value.details
    }
  })

  emit('success')

  isOpenEditModal.value = false
  loading.value = false
}

function handleOpen() {
  menuServicesForm.value.details = selectedService.value?.details ?? ''
}
</script>

<template>
  <BaseModal
    title="Edit Service"
    :open="isOpenEditModal"
    @close="isOpenEditModal = false"
    @before-enter="handleOpen"
    size="md"
  >
    <div class="space-y-6 flex flex-col items-start">
      <div class="flex flex-col items-start space-y-1.5 w-full">
        <p class="text-sm font-medium text-custom-brown-500">Details</p>

        <textarea 
          v-model="menuServicesForm.details"
          class="w-full text-sm text-custom-brown-500 ring-custom-brown-500 bg-inherit outline-none py-3 overflow-y-auto h-36 resize-none"
        />
      </div>

      <div class="grid grid-cols-2 gap-x-4 w-full">
        <div class="w-full">
          <BaseButton :isLoading="loading" @click="submit">Yes</BaseButton>
        </div>

        <div class="w-full">
          <BaseButton isCancel @click="isOpenEditModal = false">Cancel</BaseButton>
        </div>
      </div>
    </div>
  </BaseModal>
</template>
<script setup lang="ts">
const { isOpenDeleScheduleModal, selectedAppointment } = useAppointment()

const emit = defineEmits<{
  success: [void]
}>()

const { $useCustomFetch } = useNuxtApp()
const loading = ref(false)

async function submit() {
  loading.value = true

  const { error } = await $useCustomFetch(`/api/appointments/${selectedAppointment.value?.id}`, {
    method: 'DELETE',
  })

  emit('success')

  loading.value = false
}
</script>

<template>
  <BaseModal
    :open="isOpenDeleScheduleModal"
    size="xs"
    @close="isOpenDeleScheduleModal = false"
  >
    <template #header></template>

    <div class="flex flex-col items-start space-y-6">
      <p class="text-base text-custom-brown-500">Are you sure you want to cancel this appointment?</p>

      <div class="grid grid-cols-2 gap-x-4 w-full">
        <div class="w-full">
          <BaseButton :isLoading="loading" @click="submit">Yes</BaseButton>
        </div>

        <div class="w-full">
          <BaseButton isCancel @click="isOpenDeleScheduleModal = false">No</BaseButton>
        </div>
      </div>
    </div>
  </BaseModal>
</template>
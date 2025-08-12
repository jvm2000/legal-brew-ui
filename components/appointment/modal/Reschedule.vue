<script setup lang="ts">
const emit = defineEmits<{
  success: [void]
}>()

const { $useCustomFetch } = useNuxtApp()
const { isOpenRescheduleModal, selectedAppointment } = useAppointment()
const { formatToLocalDate, formatDateString } = useFormat()
const selectedTime = ref<string>('')
const form = ref({
  scheduledDate: '',
  time: '',
})
const loading = ref(false)

const officeTimeSlots = [
  { label: '10:00 AM', value: '10:00' },
  { label: '11:00 AM', value: '11:00' },
  { label: '1:00 PM', value: '13:00' },
  { label: '2:00 PM', value: '14:00' },
  { label: '3:00 PM', value: '15:00' }
]
const onlineTimeSlots = [
  { label: '10:00 AM', value: '10:00' },
  { label: '11:00 AM', value: '11:00' },
  { label: '1:00 PM', value: '13:00' },
  { label: '2:00 PM', value: '14:00' },
  { label: '3:00 PM', value: '15:00' },
  { label: '4:00 PM', value: '16:00' },
  { label: '5:00 PM', value: '17:00' }
]

function selectTime(value: string) {
  selectedTime.value = value
}

function handleOpen() {
  form.value.scheduledDate = formatToLocalDate(selectedAppointment.value?.scheduledDay) ?? ''
  selectedTime.value = selectedAppointment.value?.scheduledTime ?? ''
}

const timeSlots = computed(() => {
  if (selectedAppointment.value?.setup === 'office') return officeTimeSlots

  if (selectedAppointment.value?.setup === 'online') return onlineTimeSlots
})

async function update() {
  loading.value = true

  const scheduledDate = formatDateString(form.value.scheduledDate)
  form.value.time = selectedTime.value

  const { error } = await $useCustomFetch(`/api/appointments/${selectedAppointment.value?.id}`, { 
    method: 'PUT',
    body: {
      scheduledDay: scheduledDate,
      scheduledTime: form.value.time
    }
  })

  emit('success')

  isOpenRescheduleModal.value = false
  loading.value = false
}
</script>

<template>
  <BaseModal
    :open="isOpenRescheduleModal"
    title="Reschedule Appointment"
    size="lg"
    @before-enter="handleOpen"
    @close="isOpenRescheduleModal = false"
  >
    <div class="space-y-6 flex flex-col items-start">
      <div class="w-full">
        <BaseCalendar v-model="form.scheduledDate" />
      </div>

      <p class="text-base text-custom-brown-500 font-medium">Available Time</p>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="(slot, index) in timeSlots"
          :key="index"
          class="border rounded-lg px-8 py-1.5 text-sm border-custom-brown-300"
          :class="[
            'border rounded-lg px-8 py-1.5 text-sm border-custom-brown-300',
            selectedTime === slot.value
              ? 'bg-custom-brown-300 text-white'
              : 'text-custom-brown-300  '
          ]"
          @click="selectTime(slot.value)"
        >
          {{ slot.label }}
        </button>
      </div>

      <div class="w-full">
        <BaseButton :isLoading="loading" @click="update">Reschedule</BaseButton>
      </div>
    </div>
  </BaseModal>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

useHead({ title: 'Appointment' })

const { scheduledForToday } = useAppointment()
const appointmentsData = ref([])
const { $useCustomFetch } = useNuxtApp()
const { formatDateString } = useFormat()

async function fetchAppointments() {
  const dateParam = formatDateString(scheduledForToday.value)

  const { data } = await $useCustomFetch('/api/appointments', {
    method: 'GET',
    query: {
      scheduledDay: dateParam
    }
  })

  appointmentsData.value = data.value ?? []
}

await fetchAppointments()
</script>

<template>
  <div class="w-full max-w-6xl grid grid-cols-2 gap-x-10">
    <div>
      <AppointmentCalendar v-model="scheduledForToday" @update:modelValue="fetchAppointments" />
    </div>

    <div class="flex flex-col items-start space-y-6">
      <div class="w-full flex items-center justify-between">
        <p class="text-2xl text-custom-brown-500 font-medium">Your schedule for today</p>

        <p class="text-sm text-custom-brown-500 font-medium">See previous</p>
      </div>

      
    </div>
  </div>
</template>
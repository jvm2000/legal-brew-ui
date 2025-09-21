<script setup lang="ts">
import { ArrowLongLeftIcon } from '@heroicons/vue/24/outline'
import type { Appointment } from '~/types/general'
import { EllipsisHorizontalIcon } from '@heroicons/vue/24/outline'
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

useHead({ title: 'Appointment' })

const { $useCustomFetch } = useNuxtApp()
const { formatDateString, formatAppointmentDate, formatNextDateString, formatTime } = useFormat()
const { scheduledForToday, openAppointmentModal, openDeleteModal, openMarkAsDoneModal } = useAppointment()

const allAppointments = ref<Appointment[]>([])
const appointmentsData = ref<Appointment[]>([])
const appointmentsUpcomingData = ref<Appointment[]>([])

async function fetchAllAppointments() {
  const { data } = await $useCustomFetch<Appointment[]>('/api/appointments/getAll', {
    method: 'GET',
  })

  allAppointments.value = data.value ?? []
}

async function fetchTodayAppointments() {
  const { data } = await $useCustomFetch<Appointment[]>('/api/appointments', {
    method: 'GET',
    query: {
      scheduledDay: formatDateString(scheduledForToday.value)
    }
  })

  appointmentsData.value = data.value ?? []
}

async function fetchUpcomingAppointments() {
  const { data } = await $useCustomFetch<Appointment[]>('/api/appointments', {
    method: 'GET',
    query: {
      scheduledDay: formatNextDateString(scheduledForToday.value)
    }
  })

  appointmentsUpcomingData.value = data.value ?? []
}

async function fetchAppointments() {
  await fetchTodayAppointments()
  await fetchUpcomingAppointments()
}

onMounted(async () => {
  await fetchAppointments()
  await fetchAllAppointments()
})
</script>

<template>
  <div class="space-y-6 w-full max-w-6xl ">
    <div class="flex items-center space-x-2 cursor-pointer pl-4 sm:pl-0" @click="navigateTo('/dashboard')">
      <ArrowLongLeftIcon class="w-6 h-6 stroke-custom-brown-500" />

      <p class="text-sm text-custom-brown-500 font-medium">Back</p>
    </div>

    <div class="grid grid-cols-1 sm:xl:grid-cols-2 gap-10">
      <div>
        <AppointmentCalendar 
          v-model="scheduledForToday"
          :appointments="allAppointments"
          @update:modelValue="fetchAppointments" 
        />
      </div>

      <div class="flex flex-col items-start space-y-6 px-6 sm:xl:px-0">
        <div class="w-full flex items-center justify-between">
          <p class="text-2xl text-custom-brown-500 font-medium">Your schedule for today</p>
        </div>

        <div v-for="appointment in appointmentsData" class="flex flex-col sm:flex-row items-center sm:justify-between w-full  space-y-6 sm:space-y-0">
          <div class="flex items-start">
            <div class="flex flex-col items-start space-y-0.5 pr-6">
              <p class="text-2xl font-bold text-custom-brown-500">{{ formatAppointmentDate(appointment.scheduledDay) }}</p>
              <p class="text-sm text-custom-brown-500">{{ formatTime(appointment.scheduledTime) }}</p>

              <p 
                class="text-sm text-black capitalize"
                :class="[appointment.setup === 'online' ? 'text-lime-500' : 'text-custom-brown-300']"
              >{{ appointment.setup }}</p>
            </div>

            <div class="flex flex-col items-start space-y-1 pl-6 border-l-2 border-custom-brown-500">
              <p class="text-base text-custom-brown-500 font-medium">
                {{ appointment.user.full_name }} - {{ appointment.user.contact_no }}
              </p>

              <div v-for="service in appointment.services" class="flex flex-col items-start">
                <p class="text-sm text-custom-brown-500">
                  <span class="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-custom-brown-500 mr-2 inline-block"></span>

                  {{ service.details }}
                </p>
              </div>
            </div>
          </div>

          <div class="flex items-center">
            <Menu>
              <MenuButton>
                <button>
                  <EllipsisHorizontalIcon class="w-6 h-6 stroke-custom-brown-500" />
                </button>
              </MenuButton>

              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="absolute right-44 mt-24 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none px-4 py-2"
                >
                  <button 
                    class="py-2 hover:bg-custom-brown-100 w-full rounded-lg px-2 flex items-start"
                    @click="openMarkAsDoneModal(appointment)"
                  >
                    <p class="text-sm text-custom-brown-500 font-medium">Mark as Done</p>
                  </button>
                  
                  <button 
                    class="py-2 hover:bg-custom-brown-100 w-full rounded-lg px-2 flex items-start" 
                    @click="openAppointmentModal(appointment)"
                  >
                    <p class="text-sm text-custom-brown-500 font-medium">Reschedule</p>
                  </button>

                  <button 
                    class="py-2 hover:bg-custom-brown-100 w-full rounded-lg px-2 flex items-start"
                    @click="openDeleteModal(appointment)"
                  >
                    <p class="text-sm text-custom-brown-500 font-medium">Cancel</p>
                  </button>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>

        <p class="text-2xl text-custom-brown-500 font-medium">Upcoming</p>

        <div v-for="appointment in appointmentsUpcomingData" class="flex items-center justify-between w-full">
          <div class="flex items-start">
            <div class="flex flex-col items-start space-y-0.5 pr-6">
              <p class="text-2xl font-bold text-custom-brown-500">{{ formatAppointmentDate(appointment.scheduledDay) }}</p>
              <p class="text-sm text-custom-brown-500">{{ formatTime(appointment.scheduledTime) }}</p>

              <p 
                class="text-sm text-black capitalize"
                :class="[appointment.setup === 'online' ? 'text-lime-500' : 'text-custom-brown-300']"
              >{{ appointment.setup }}</p>
            </div>

            <div class="flex flex-col items-start space-y-1 pl-6 border-l-2 border-custom-brown-500">
              <p class="text-base text-custom-brown-500 font-medium">
                {{ appointment.user.full_name }} - {{ appointment.user.contact_no }}
              </p>

              <div v-for="service in appointment.services" class="flex flex-col items-start">
                <p class="text-sm text-custom-brown-500">
                  <span class="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-custom-brown-500 mt-2 mr-2 inline-block"></span>

                  {{ service.details }}
                </p>
              </div>
            </div>
          </div>

          <div class="flex items-start">
            <Menu>
              <MenuButton>
                <button>
                  <EllipsisHorizontalIcon class="w-6 h-6 stroke-custom-brown-500" />
                </button>
              </MenuButton>

              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="absolute right-44 mt-24 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none px-4 py-2"
                >
                  <button 
                    class="py-2 hover:bg-custom-brown-100 w-full rounded-lg px-2 flex items-start"
                    @click="openMarkAsDoneModal(appointment)"
                  >
                    <p class="text-sm text-custom-brown-500 font-medium">Mark as Done</p>
                  </button>

                  <button 
                    class="py-2 hover:bg-custom-brown-100 w-full rounded-lg px-2 flex items-start"
                    @click="openAppointmentModal(appointment)"
                  >
                    <p class="text-sm text-custom-brown-500 font-medium">Reschedule</p>
                  </button>

                  <button 
                    class="py-2 hover:bg-custom-brown-100 w-full rounded-lg px-2 flex items-start"
                    @click="openDeleteModal(appointment)"
                  >
                    <p class="text-sm text-custom-brown-500 font-medium">Cancel</p>
                  </button>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  </div>

  <AppointmentModalDelete @success="fetchAppointments(), fetchAllAppointments()" />
  <AppointmentModalMarkAsDone @success="fetchAppointments(), fetchAllAppointments()" />
  <AppointmentModalReschedule @success="fetchAppointments(), fetchAllAppointments()" />
</template>
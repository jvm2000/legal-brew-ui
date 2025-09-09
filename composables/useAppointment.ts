import type { Appointment } from "~/types/general"

const scheduledForToday = ref(new Date().toLocaleDateString('en-CA'))
const isOpenRescheduleModal = ref(false)
const isOpenDeleScheduleModal = ref(false)
const isOpenMarkDoneModal = ref(false)
const selectedAppointment = ref<Appointment | null>(null)

export const useAppointment = () => {
  function openAppointmentModal(appointment: Appointment) {
    selectedAppointment.value = appointment

    isOpenRescheduleModal.value = true
  }

  function openDeleteModal(appointment: Appointment) {
    selectedAppointment.value = appointment

    isOpenDeleScheduleModal.value = true
  }

  function openMarkAsDoneModal(appointment: Appointment) {
    selectedAppointment.value = appointment

    isOpenMarkDoneModal.value = true

    console.log(isOpenMarkDoneModal.value, 'open?')
  }

  return {
    scheduledForToday,
    isOpenRescheduleModal,
    isOpenDeleScheduleModal,
    isOpenMarkDoneModal,
    selectedAppointment,
    openAppointmentModal,
    openDeleteModal,
    openMarkAsDoneModal
  }
}
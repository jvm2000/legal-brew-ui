import type { Appointment } from "~/types/general"

const scheduledForToday = ref(new Date().toLocaleDateString('en-CA'))
const isOpenRescheduleModal = ref(false)
const isOpenDeleScheduleModal = ref(false)
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

  return {
    scheduledForToday,
    isOpenRescheduleModal,
    isOpenDeleScheduleModal,
    selectedAppointment,
    openAppointmentModal,
    openDeleteModal
  }
}
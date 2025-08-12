import type { Appointment } from "~/types/general"

const scheduledForToday = ref(new Date().toLocaleDateString('en-CA'))
const isOpenRescheduleModal = ref(false)
const selectedAppointment = ref<Appointment | null>(null)

export const useAppointment = () => {
  function openAppointmentModal(appointment: Appointment) {
    selectedAppointment.value = appointment

    isOpenRescheduleModal.value = true
  }

  return {
    scheduledForToday,
    isOpenRescheduleModal,
    selectedAppointment,
    openAppointmentModal
  }
}
import type { Services } from "~/types/general"

type AppointmentForm = {
  services: Services[],
  setup: string,
  scheduledDay: string,
  scheduledTime: string
}

const appointmentForm = ref<AppointmentForm>({
  services: [],
  setup: '',
  scheduledDay: '',
  scheduledTime: '',
})
const isOpenSuccessModal = ref(false)

export const usePayment = () => {
  return {
    appointmentForm,
    isOpenSuccessModal
  }
}
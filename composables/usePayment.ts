import type { Services } from "~/types/general"

type AppointmentForm = {
  services: Services[],
  setup: string,
  scheduledDay: string,
  scheduledTime: string
}

export const usePayment = () => {
  const appointmentForm = ref<AppointmentForm>({
    services: [],
    setup: '',
    scheduledDay: '',
    scheduledTime: '',
  })

  return {
    appointmentForm
  }
}
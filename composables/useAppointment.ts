import type { Services } from "~/types/general"

const scheduledForToday = ref(new Date() ?? '')

export const useAppointment = () => {
  return {
    scheduledForToday
  }
}
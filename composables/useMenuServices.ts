import type { SubService } from "~/types/general"

type MenuServicesForm = {
  details: string
}

const menuServicesForm = ref<MenuServicesForm>({
  details: '',
})
const isOpenEditModal = ref(false)
const selectedService = ref<SubService | null>(null)

function openEditModal(services: SubService) {
  selectedService.value = services

  isOpenEditModal.value = true
}

export const useMenuServices = () => {
  return {
    menuServicesForm,
    isOpenEditModal,
    selectedService,
    openEditModal
  }
}
const isOpenGCashModal = ref(false)
const isOpenMayaModal = ref(false)

export const useLanding = () => {
  return {
    isOpenGCashModal,
    isOpenMayaModal
  }
}
const state = reactive({
  isOpenPostModal: false
})

export default function () { 
  function openClosePostModal() {
    state.isOpenPostModal = !state.isOpenPostModal
  }

  return {
    ...toRefs(state),
    openClosePostModal,
  }
}
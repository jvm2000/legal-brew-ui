const state = reactive({
  isOpenPostModal: false,
  isViewPostModal: false
})

export default function () { 
  function openClosePostModal() {
    state.isOpenPostModal = !state.isOpenPostModal
  }

  function openCloseViewPostModal() {
    state.isViewPostModal = !state.isViewPostModal
  }

  return {
    ...toRefs(state),
    openClosePostModal,
    openCloseViewPostModal,
  }
}
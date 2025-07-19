import type { Post } from "~/types/general"

const state = reactive({
  isOpenPostModal: false,
  isViewPostModal: false,
  selectedPost: {} as Post
})

export default function () { 
  function openClosePostModal() {
    state.isOpenPostModal = !state.isOpenPostModal
  }

  function openCloseViewPostModal(post: Post) {
    state.selectedPost = post
    
    state.isViewPostModal = !state.isViewPostModal
  }

  return {
    ...toRefs(state),
    openClosePostModal,
    openCloseViewPostModal,
  }
}
import type { Post } from "~/types/general"

const state = reactive({
  isOpenPostModal: false,
  isViewPostModal: false,
  isPostEditing: false,
  selectedPost: {} as Post
})

export default function () { 
  function openClosePostModal() {
    state.isPostEditing = false

    state.isOpenPostModal = !state.isOpenPostModal
  }

  function openCloseEditPostModal(post: Post) {
    state.selectedPost = post

    state.isPostEditing = true

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
    openCloseEditPostModal,
  }
}
import type { Post } from "~/types/general"

const state = reactive({
  post: [],
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

  async function getPosts() {
    const { $useCustomFetch } = useNuxtApp()

    const { data } = await $useCustomFetch('/api/posts', { 
      method: 'GET',
    })

    if (data.value) {
      state.post = data.value
    }
  }

  return {
    ...toRefs(state),
    openClosePostModal,
    openCloseViewPostModal,
    openCloseEditPostModal,
    getPosts
  }
}
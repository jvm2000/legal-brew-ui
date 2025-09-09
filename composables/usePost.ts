import type { Post } from "~/types/general"

const state = reactive({
  post: [],
  isOpenPostModal: false,
  isViewPostModal: false,
  isPostEditing: false,
  selectedPost: {} as Post,
  pagination: {
    currentPage: 1,
    lastPage: 1,
  }
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

  async function getPosts(page = 1) {
    const { $useCustomFetch } = useNuxtApp()

    const { data } = await $useCustomFetch(`/api/posts?page=${page}`, { method: 'GET' })

    state.post = data.value ?? []
    state.pagination = {
      currentPage: data.value.current_page,
      lastPage: data.value.last_page,
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
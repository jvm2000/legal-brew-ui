import { reactive, toRefs } from "vue"

const state = reactive({
  container: null as HTMLElement | null,
  data: {
    isDragging: false,
    startX: 0,
    scrollX: 0,
  }
})

export default function () {
  function getClientX(event: MouseEvent | TouchEvent): number {
    if (event instanceof MouseEvent) {
      return event.clientX
    } else if (event.touches && event.touches.length > 0) {
      return event.touches[0].clientX
    } else if (event.changedTouches && event.changedTouches.length > 0) {
      return event.changedTouches[0].clientX
    }
    return 0
  }

  function startDrag(event: MouseEvent | TouchEvent) {
    state.data.isDragging = true
    const clientX = getClientX(event)
    state.data.startX = clientX - (state.container?.getBoundingClientRect().left || 0)
  }

  function handleDrag(event: MouseEvent | TouchEvent) {
    if (!state.data.isDragging) return

    const clientX = getClientX(event)
    const mouseX = clientX - (state.container?.getBoundingClientRect().left || 0)
    const delta = mouseX - state.data.startX
    const newScrollX = state.data.scrollX + delta

    state.data.scrollX = Math.max(-1390, Math.min(0, newScrollX))
    state.data.startX = mouseX
  }

  function endDrag() {
    state.data.isDragging = false
  }

  return {
    ...toRefs(state),
    startDrag,
    handleDrag,
    endDrag,
  }
}
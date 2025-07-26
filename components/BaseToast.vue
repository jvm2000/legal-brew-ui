<script setup lang="ts">
const props = defineProps({
  message: String,
  duration: {
    type: Number,
    default: 3000,
  },
  show: Boolean,
})

const visible = ref(false)

watch(
  () => props.show,
  (val) => {
    if (val) {
      visible.value = true
      setTimeout(() => {
        visible.value = false
      }, props.duration)
    }
  }
)
</script>

<template>
  <transition
    name="slide-in"
    enter-active-class="transition transform duration-300 ease-out"
    leave-active-class="transition transform duration-300 ease-in"
    enter-from-class="translate-x-full opacity-0"
    enter-to-class="translate-x-0 opacity-100"
    leave-from-class="translate-x-0 opacity-100"
    leave-to-class="translate-x-full opacity-0"
  >
    <div
      v-if="visible"
      class="fixed bottom-5 right-5 z-50 bg-green-500 text-white px-4 py-2 rounded shadow"
    >
      {{ message }}
    </div>
  </transition>
</template>
<script setup lang="ts">
const { isOpenGCashModal } = useLanding()
</script>

<template>
  <BaseModal
    :open="isOpenGCashModal"
    @close="isOpenGCashModal = false"
    closeOnDialogClick
    size="xs"
  >
    <template #header>
      <div class="flex w-full flex-col items-center justify-between border-b border-slate-200 px-8 py-[15.5px]">
        <h3 class=" text-lg leading-6 font-medium capitalize">Scan QR Code</h3>
      </div>
    </template>

    <div class="flex flex-col items-center">
      <img class="h-48" src="/images/qr-sample.svg" alt="">
    </div>
  </BaseModal>
</template>
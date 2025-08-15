<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { twMerge } from 'tailwind-merge'

defineOptions({ inheritAttrs: false })

type ModalProps = {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl',
  shape: 'straight' | 'rounded' | 'curved' | 'roundedTop',
  footerAlign: 'start' | 'end' | 'center' | 'between' | 'center-single',
}

const emit = defineEmits(['close', 'open', 'before-enter', 'after-enter', 'before-leave', 'after-leave']);

const sizeClasses: Record<ModalProps['size'], string> = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl' : 'max-w-4xl',
  '5xl' : 'max-w-5xl',
  '6xl' : 'max-w-6xl',
}

const shapeClasses: Record<ModalProps['shape'], string> = {
  straight: '',
  curved: 'rounded-xl',
  rounded: 'rounded-lg',
  roundedTop: 'rounded-t-lg',
}

const props = withDefaults(
  defineProps<{
    /**
     * Whether the modal is open.
     */
    open?: boolean;

    /**
     * Whether the modal is open.
     */
    noPadding?: boolean;

    isDarkBackground?: boolean;

    /**
     * Whether to show or hide close button of modal.
     */
    showCloseButton?: boolean;

    /**
     * The size of the modal.
     */
    size?: ModalProps['size'];

    /**
     * The shape of the modal.
     */
    shape?: ModalProps['shape'];

    /**
     * The alignment of the footer content.
     */
    footerAlign?: ModalProps['footerAlign'];

    classes?: {
      wrapper?: string | string[];
      dialog?: string | string[];
      header?: string | string[];
    };

    title?: string;

    closeOnDialogClick?: boolean;
  }>(),
  {
    size: "md",
    shape: "curved",
    footerAlign: "end",
    closeOnDialogClick: false,
    isDarkBackground: false,
    showCloseButton: true,
    classes: () => ({
      wrapper: "",
      dialog: "",
    }),
    noPadding: false
  }
);

const breakpoints = useBreakpoints(breakpointsTailwind)
const xse = breakpoints.smallerOrEqual('sm')
const shape = computed(() => xse.value ? 'rounded-none' : '')
</script>

<template>
  <TransitionRoot appear :show="props.open" as="template" @afterEnter="emit('open')">
    <div class="fixed inset-0 z-[100] flex items-center justify-center">
      <Dialog class="relative z-[100]" as="div" @close="props.closeOnDialogClick ? emit('close') : null">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div 
          :class="[twMerge(
            'fixed inset-0 bg-blue-950/30 transition-opacity',
            props.isDarkBackground && 'bg-slate-950/85'
          )]"
          ></div>
        </TransitionChild>

        <div class="fixed inset-0 w-screen overflow-y-auto">
          <div
            :class="[twMerge(
              'flex min-h-full items-end justify-center p-0 text-center sm:items-center sm:p-4',
              props.classes.wrapper
            )]"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-full sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-full sm:translate-y-0 sm:scale-95"
              @beforeEnter="emit('before-enter')"
              @afterEnter="emit('after-enter')"
              @beforeLeave="emit('before-leave')"
              @afterLeave="emit('after-leave')"
            >
              <DialogPanel
                :class="[twMerge(
                  'pointer-events-auto w-full bg-white align-middle shadow-smtransition-all font-inter',
                  sizeClasses[props.size],
                  shapeClasses[shape || props.shape],
                  props.classes.dialog
                )]"
              >

                <div 
                  v-if="!('header' in $slots)" 
                  :class="[twMerge(
                    'flex w-full items-center justify-between border-b border-slate-200',
                    !$slots.icon && 'px-8 py-[15.5px]',
                    $slots.icon && 'px-8 py-[11.5px]',
                    props.classes.header
                  )]"
                >
                  <div class="flex items-center space-x-6">
                    <slot name="icon"></slot>
                    <h3 class=" text-lg leading-6 font-medium capitalize">
                      {{ props.title }}
                    </h3>
                  </div>

                  <XMarkIcon 
                    class="w-5 h-5 stroke-gray-500 cursor-pointer"
                    @click="emit('close')" 
                    v-if="props.showCloseButton" 
                  />
                </div>
                <slot name="header"></slot>

                <div :class="[props.noPadding ? '' : 'py-4 px-8']">
                  <slot></slot>
                </div>

                <div
                  v-if="'footer' in $slots"
                  class="w-full sm:items-center"
                  :class="[
                    props.footerAlign === 'center' && 'sm:flex justify-center',
                    props.footerAlign === 'end' && 'sm:flex justify-end',
                    props.footerAlign === 'between' && 'sm:flex justify-between',
                  ]"
                >
                  <slot name="footer"></slot>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </div>
  </TransitionRoot>
</template>
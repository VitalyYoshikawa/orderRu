<script setup lang="ts">
const props = defineProps<{
  open: boolean,
  fullscreen?: boolean
}>()

const modalRef = ref<HTMLElement | null>(null)
const emit = defineEmits(['close'])

let scrollPosition: number = 0

const fixedBody = (val: boolean): void => {
  const html = document.documentElement
  if (!html) return

  if (val) {
    scrollPosition = window.scrollY
    html.style.position = 'fixed'
    html.style.top = `-${scrollPosition}px`
  } else {
    html.style.position = ''
    html.style.top = ''
    window.scrollTo(0, scrollPosition)
  }
}

onClickOutside(modalRef, () => emit('close'))

onMounted(() => {
  fixedBody(props.open)
})

watch(props, (newVal) => {
  fixedBody(newVal.open)
})
</script>

<template>
  <Teleport to="body">
    <div class="modal"
         v-if="open">
      <div
          :class="['modal__body', {'modal__body--fill-screen' : fullscreen}]"
          ref="modalRef"
      >
        <button
            class="modal__close"
            @click="emit('close')"
        >
          <Icon
              class="modal__close-icon"
              name="mage:multiply-circle-fill"/>
        </button>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<style lang="sass">
.modal
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  display: flex
  flex-direction: column
  overflow: auto
  background: var(--color-opacity-2)
  z-index: 10

.modal__body
  position: relative
  width: max-content
  height: max-content
  margin: auto
  background: var(--color-white)
  border-radius: var(--border-radius)
  padding: 20px
  box-sizing: border-box

.modal__close-icon
  position: absolute
  top: 10px
  left: auto
  right: 10px
  width: 32px
  height: 32px
  background-color: var(--color-dark-gray)
  transition: var(--transition)

  &:hover
    background-color: var(--color-blue)

.modal__body--fill-screen
  display: flex
  flex-direction: column
  width: 100vw
  height: 100vh
  border-radius: 0
</style>

<script setup lang="ts">
const props = defineProps({
  length: { type: Number, default: 4 },
  type: { type: String, default: 'text' },
})

const model = defineModel<string[]>({ default: () => [] })
const inputs = ref<HTMLInputElement[]>([])
const error = ref<boolean>(false)


onMounted(() => {
  if (model.value.length !== props.length) {
    model.value = Array(props.length).fill('')
  }
})

const handleInput = (e: Event, index: number) => {
  error.value = false
  const target = e.target as HTMLInputElement
  model.value[index] = target.value

  if (target.value && index < props.length - 1) {
    inputs.value[index + 1]?.focus()
  }
}

const handleBackspace = (e: KeyboardEvent, index: number) => {
  if (e.key === 'Backspace' && !model.value[index] && index > 0) {
    inputs.value[index - 1]?.focus()
  }
}

const handlePaste = (e: ClipboardEvent, index: number) => {
  e.preventDefault()
  error.value = false
  const pasteData = e.clipboardData?.getData('text').slice(0, props.length - index) || ''

  pasteData.split('').forEach((char, i) => {
    if (index + i < props.length) {
      model.value[index + i] = char
      nextTick(() => inputs.value[index + i]?.focus())
    }
  })
}

const validate = () => {
  const isValid = model.value.every(val => val.trim() !== '')
  error.value = !isValid
  return isValid
}

defineExpose({
  focus: () => inputs.value[0]?.focus(),
  clear: () => {
    model.value = Array(props.length).fill('')
    error.value = false
    inputs.value[0]?.focus()
  },
  validate
})
</script>

<template>
  <div class="pin-input">
    <input
        v-for="(_, i) in length"
        :key="i"
        ref="inputs"
        v-model="model[i]"
        :type="type === 'password' ? 'password' : 'text'"
        :maxlength="1"
        :autofocus="i === 0"
        @input="handleInput($event, i)"
        @keydown="handleBackspace($event, i)"
        @paste="handlePaste($event, i)"
        :class="['pin-input__digit', {'pin-input__digit--error': error}]"
    />
  </div>
</template>

<style lang="sass">
.pin-input
  display: flex
  justify-content: center
  gap: 10px
.pin-input__digit
  width: 40px
  height: 40px
  font-weight: 700
  font-size: var(--fs-24)
  box-sizing: border-box
  border-radius: var(--border-radius)
  border: var(--border-black)
  color: var(--color-black)
  transition: var(--transition)
  text-align: center
  &::placeholder
    color: var(--color-dark-gray)
  &:focus
    border: var(--border-blue)
</style>

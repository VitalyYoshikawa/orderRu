<script setup lang="ts">
interface Props {
  type?: 'text' | 'number',
  value?: string | number,
  placeholder?: string,
  required?: boolean,
  error?: boolean,
  errorMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  value: '',
  placeholder: '' ,
  required: false,
  error: false,
  errorMessage: 'error'
})

const typeNumber = (): string | number => {
    if (typeof props.value === 'number') {
      return formatNumber(props.value)
    }
    return 'не число'
}

</script>

<template>
  <div class="custom-input">
    <input
        class="custom-input__input"
        type="text"
        :value="type === 'number' ? typeNumber() : value"
        :placeholder="`${required ? placeholder + '*' : placeholder}`"
        :required="required"
        @blur=""
    >
    <span v-if="error" class="custom-input__msg-error">{{ errorMessage }}</span>
  </div>
</template>

<style lang="sass">
.custom-input
  display: flex
  flex-direction: column
  gap: 3px
.custom-input__input
  width: 100%
  font-weight: 400
  font-size: var(--fs-16)
  padding: var(--padding-xxl)
  box-sizing: border-box
  border-radius: var(--border-radius)
  border: var(--border-black)
  color: var(--color-black)
  transition: var(--transition)
  &::placeholder
    color: var(--color-dark-gray)
  &:focus
    border: var(--border-blue)
.custom-input__msg-error
  font-weight: 400
  color: var(--color-red)
</style>

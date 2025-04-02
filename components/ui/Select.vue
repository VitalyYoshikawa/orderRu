<script setup lang="ts">
type option = {
  label: string,
  value: string
}

interface Props {
  options: option[],
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Выберите значение'
})

const elementRef = ref<HTMLElement | null>(null)
const isOpenRef = ref<boolean>(false)
const selectedOptionRef = ref<string | null>(null)

const emit = defineEmits<{
  'update:modelValue': [option: option]
}>()

const handleToggleDropdown = (): void => {
  isOpenRef.value = !isOpenRef.value
}

const handleSelectOption = (option: option): void => {
  selectedOptionRef.value = option.label
  emit('update:modelValue', option)
  isOpenRef.value = false
}

onClickOutside(elementRef, () => {
  isOpenRef.value = false
})
</script>

<template>
  <div class="custom-select" ref="elementRef">
    <div
        :class="['custom-select__trigger', {'custom-select__trigger--open' : isOpenRef}]"
        @click="handleToggleDropdown"
    >
      <span>{{ selectedOptionRef ? selectedOptionRef : placeholder }}</span>
      <div class="custom-select__arrow"></div>
    </div>
    <div
        class="custom-select__dropdown"
        v-if="isOpenRef">
      <div
          class="custom-select__option"
          v-for="option in options"
          :key="option.value"
          @click="handleSelectOption(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.custom-select
  position: relative
  width: max-content
  min-width: 250px

.custom-select__trigger
  display: flex
  align-items: center
  justify-content: space-between
  gap: 10px
  padding: 10px
  border: var(--border-black)
  border-radius: var(--border-radius)
  background-color: var(--color-white)
  cursor: pointer
  transition: var(--transition)
  &:hover
    border: var(--border-blue)

.custom-select__trigger--open
  border: var(--border-blue)
  .custom-select__arrow
    transform: rotate(180deg)

.custom-select__arrow
  border-left: 5px solid transparent
  border-right: 5px solid transparent
  border-top: 5px solid var(--color-black)
  transition: var(--transition)

.custom-select__dropdown
  position: absolute
  top: calc(100% + 5px)
  left: 0
  right: 0
  border: var(--border-black)
  border-radius: var(--border-radius)
  background-color: var(--color-white)
  max-height: 200px
  overflow: auto
  z-index: 10

.custom-select__option
  padding: 10px
  cursor: pointer
  transition: var(--transition)
  &:hover
    background-color: var(--color-light-gray)

</style>

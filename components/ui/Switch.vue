<script setup lang="ts">
defineProps<{
  label: string | null | undefined
}>()
</script>

<template>
  <label class="switch">
    <input class="switch__input" type="checkbox">
    <span class="switch__checkmark"></span>
    <span class="switch__label">{{label}}</span>
  </label>
</template>

<style lang="sass">
.switch
  display: flex
  gap: 5px
  cursor: pointer
  width: max-content
.switch__input
  display: none
  &:checked ~ .switch__checkmark
    border: var(--border-blue)
    background-color: var(--color-blue)
    &:before
      background-color: var(--color-white)
      left: calc(100% - 14px - 3px)

.switch__checkmark
  position: relative
  display: block
  flex: 0 0 auto
  width: 44px
  height: 22px
  border-radius: 22px
  border: var(--border-black)
  box-sizing: border-box
  transition: var(--transition)
  &:before
    position: absolute
    top: 50%
    left: 3px
    transform: translateY(-50%)
    content: ''
    width: 14px
    height: 14px
    border-radius: 15px
    background: var(--color-blue)
    transition: var(--transition)
.switch__label
  margin: 3px 0 0 0
</style>

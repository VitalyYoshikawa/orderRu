<script setup lang="ts">
defineProps<{
  value: string | number,
  label: string,
  name?: string,
  checked?: boolean,
}>()
</script>

<template>
  <label class="custom-checkbox">
    <input class="custom-checkbox__input" type="checkbox" :value="value" :name="name" :checked="checked" />
    <span class="custom-checkbox__checkmark">
      <Icon class="custom-checkbox__marker" name="material-symbols:check" />
    </span>
    <span class="custom-checkbox__label">{{label}}</span>
  </label>
</template>

<style lang="sass">
.custom-checkbox
  display: flex
  gap: 5px
  cursor: pointer
  width: max-content
.custom-checkbox__input
  display: none
  &:checked ~ .custom-checkbox__checkmark
    background: var(--color-blue)
    border: var(--border-blue)
    .custom-checkbox__marker
      background-color: var(--color-white)

.custom-checkbox__checkmark
  position: relative
  display: block
  flex: 0 0 auto
  width: 22px
  height: 22px
  border-radius: 5px
  border: var(--border-black)
  box-sizing: border-box
  transition: var(--transition)
.custom-checkbox__marker
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  content: ''
  width: 18px
  height: 18px
  background-color: transparent
  transition: var(--transition)
.custom-checkbox__label
  margin: 3px 0 0 0
</style>

<script setup lang="ts">
defineProps<{
  name?: string,
  value: string | number,
  label: string,
  checked?: boolean,
}>()
</script>

<template>
<label class="custom-radio" v-if="value">
  <input class="custom-radio__input" type="radio" :value="value" :name="name" :checked="checked" />
  <span class="custom-radio__checkmark"></span>
  <span class="custom-radio__label">{{ label }}</span>
</label>
</template>

<style lang="sass">
.custom-radio
  display: flex
  gap: 5px
  cursor: pointer
  width: max-content
.custom-radio__input
  display: none
  &:checked ~ .custom-radio__checkmark
    border: var(--border-blue)
    background-color: var(--color-blue)
    &:before
      opacity: 1

.custom-radio__checkmark
  position: relative
  display: block
  flex: 0 0 auto
  width: 22px
  height: 22px
  border-radius: 22px
  border: var(--border-black)
  box-sizing: border-box
  transition: var(--transition)
  &:before
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    content: ''
    width: 11px
    height: 11px
    border-radius: 11px
    background: var(--color-white)
    opacity: 0
    transition: var(--transition)
.custom-radio__label
  margin: 3px 0 0 0
</style>

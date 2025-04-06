<script setup lang="ts">

</script>

<template>
  <button class="button">
    <slot />
  </button>
</template>

<style lang="sass">
.button
  display: flex
  align-items: center
  justify-content: center
  background-color: var(--color-blue)
  padding: var(--padding-xxl)
  box-sizing: border-box
  border-radius: var(--border-radius)
  color: var(--color-white)
  transition: var(--transition)
  &:hover
    opacity: var(--opacity)
  .iconify
    width: 24px
    height: 24px
.button--border
  background-color: var(--color-white)
  border: var(--border-blue)
  color: var(--color-blue)
  &:hover
    background: var(--color-blue)
    color: var(--color-white)
.button--favorite
  span
    background-color: var(--color-red)
  &:hover
    background: var(--color-white)
</style>

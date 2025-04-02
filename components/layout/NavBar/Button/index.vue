<script setup lang="ts">
defineProps<{
  iconName: string,
  label: string,
}>()
</script>

<template>
  <button class="nav-bar-button">
    <Icon :name="iconName" class="nav-bar-button__icon"/>
    <span class="nav-bar-button__label">{{ label }}</span>
  </button>
</template>

<style lang="sass">
.nav-bar-button
  display: flex
  flex-direction: column
  align-items: center
  gap: 5px
  max-width: 71px
  &:hover
    .nav-bar-button__icon
      background-color: var(--color-blue)
    .nav-bar-button__label
      color: var(--color-blue)
.nav-bar-button__icon
  width: 24px
  height: 24px
  transition: var(--transition)
  background-color: var(--color-black)
.nav-bar-button__label
  font-size: var(--fs-14)
  transition: var(--transition)

</style>

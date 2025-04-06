<script setup lang="ts">
defineProps<{
  iconName: string,
  label: string,
  indicator?: number
}>()
</script>

<template>
  <button class="nav-bar-button">
    <Icon :name="iconName" class="nav-bar-button__icon"/>
    <span class="nav-bar-button__label">{{ label }}</span>
    <span class="nav-bar-button__indicator" v-if="indicator">{{indicator > 99 ? '+99' : indicator}}</span>
  </button>
</template>

<style lang="sass">
.nav-bar-button
  position: relative
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
.nav-bar-button__indicator
  position: absolute
  top: 0
  left: auto
  right: 0
  background-color: var(--color-red)
  color: var(--color-white)
  font-size: 12px
  border-radius: 5px
  padding: 2px 3px
  box-sizing: border-box
</style>

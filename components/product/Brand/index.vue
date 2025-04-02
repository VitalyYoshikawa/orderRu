<script setup lang="ts">
defineProps<{
  image?: string,
  name: string,
  label?: string
}>()
</script>

<template>
  <NuxtLink class="brand" to="/">
    <img class="brand__image" :src="image" alt="two">
    <div class="brand__inner">
      <span class="brand__name">{{ name }}</span>
      <span class="brand__label">{{ label }}</span>
    </div>
  </NuxtLink>
</template>

<style lang="sass">
.brand
  display: flex
  align-items: center
  gap: 5px
  &:hover
    .brand__name
      color: var(--color-blue)
.brand__image
  width: 40px
  height: 40px
  object-fit: contain
  background-color: var(--color-mid-gray)
.brand__inner
  display: flex
  flex-direction: column
.brand__label
  color: var(--color-black)
  font-size: var(--fs-14)
.brand__name
  color: var(--color-dark-gray)
  font-size: var(--fs-14)
  transition: var(--transition)
</style>

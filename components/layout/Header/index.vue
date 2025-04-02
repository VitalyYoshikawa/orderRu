<script setup lang="ts">
import type { CategoryLink } from '~/interfaces/category'

const popularCategories = await useCustomFetch<CategoryLink[]>('/api/category/popular')
</script>

<template>
  <header class="header">
    <UiLogo class="header__logo" />
    <LayoutHeaderPopularCategories :list="popularCategories" />
    <LayoutHeaderAddress />
  </header>
</template>

<style lang="sass">
.header
  display: flex
  align-items: center
  justify-content: space-between
  width: 100%
  max-width: var(--width-xxl)
  border-radius: var(--border-radius)
  padding: 20px 0
  margin: 20px auto 20px auto
  box-sizing: border-box

.header__logo
  width: 200px

@media (max-width: 1480px)
  .header
    max-width: var(--width-xl)
</style>

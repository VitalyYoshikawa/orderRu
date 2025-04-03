<script setup lang="ts">
import type {CategoryLink} from "~/interfaces/category"

defineProps<{
  name?: string,
  url?: string,
  subcategories: CategoryLink[]
}>()
</script>

<template>
  <div class="category-list" v-if="name && subcategories.length">
    <NuxtLink :to="url" class="category-list__title">{{ name }}</NuxtLink>
    <NuxtLink
        class="category-list__item"
        v-for="(item, index) in subcategories"
        :key="index"
        :to="`/categories/${item.url}`"
    >
      {{item.name}}
    </NuxtLink>
  </div>
</template>

<style lang="sass">
.category-list
  display: flex
  width: 265px
  flex-direction: column
  gap: 7px
.category-list__item
  width: max-content
.category-list__title
  color: var(--color-black)
</style>

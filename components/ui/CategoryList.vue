<script setup lang="ts">
import type {CategoryLink} from "~/interfaces/category"

defineProps<{
  title?: string,
  items: CategoryLink[]
}>()
</script>

<template>
  <div class="category-list" v-if="title && items.length">
    <span class="category-list__title">{{ title }}</span>
    <NuxtLink
        class="category-list__item"
        v-for="(item, index) in items"
        :key="index"
        :to="item.url"
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
</style>

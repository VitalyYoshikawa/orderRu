<script setup lang="ts">
import type {CategoryLink} from "~/interfaces/category";

defineProps<{
  list: CategoryLink[] | null | undefined
}>()
</script>

<template>
  <div class="header__popular-categories popular-categories" v-if="list && list.length">
    <NuxtLink
        class="popular-categories__item"
        v-for="(item, index) in list"
        :key="index"
        :to="item.url"
    >
      {{ item.name }}
    </NuxtLink>
  </div>
</template>

<style lang="sass">
.popular-categories
  display: flex
  align-items: center
  gap: 24px
</style>

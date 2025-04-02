<script setup lang="ts">
interface Item {
  url: string,
  name: string,
}

defineProps<{
  items: Item[]
}>()
</script>

<template>
  <ul class="bread-crumbs">
    <li
        class="bread-crumbs__item"
        v-for="(item, index) in items"
        :key="index"
    >
      <span
          class="bread-crumbs__name"
          v-if="index === 1"
      >
        {{item.name}}
      </span>
      <NuxtLink
          v-else
          class="bread-crumbs__link"
          :to="item.url"
      >
        {{item.name}}
      </NuxtLink>
    </li>
  </ul>
</template>

<style lang="sass">
.bread-crumbs
  display: flex
  align-items: center
  padding: 0
  margin: 0
  gap: 30px
  color: var(--color-dark-gray)
.bread-crumbs__item
  &:first-child
    list-style: none
.bread-crumbs__name
  cursor: default
  color: var(--color-black)
</style>

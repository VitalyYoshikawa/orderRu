<script setup lang="ts">
defineProps<{
  number: number | string | undefined
}>()
</script>

<template>
  <div class="product-rating">
    <Icon
        class="product-rating__icon"
        name="mage:star-fill"
    ></Icon>
    <span class="product-rating__num">{{number}}</span>
  </div>
</template>

<style lang="sass">
.product-rating
  display: flex
  gap: 2px
.product-rating__icon
  width: 16px
  height: 16px
  background-color: var(--color-yellow)
.product-rating__num
  font-size: var(--fs-14)
  height: 16px
  color: var(--color-black)
</style>

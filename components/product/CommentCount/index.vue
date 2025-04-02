<script setup lang="ts">
defineProps<{
  number: number | string | undefined
}>()
</script>

<template>
  <div class="product-comment-count" v-if="number">
    <Icon
        class="product-comment-count__icon"
        name="mage:message-round-fill" />
    <span class="product-rating__num">{{ formatNumber(Number(number)) }}</span>
  </div>
</template>

<style lang="sass">
.product-comment-count
  display: flex
  gap: 2px
.product-comment-count__icon
  width: 16px
  height: 16px
  background-color: var(--color-dark-gray)
.product-comment-count__num
  font-size: var(--fs-14)
  height: 16px
  color: var(--color-black)
</style>

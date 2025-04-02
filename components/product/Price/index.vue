<script setup lang="ts">
defineProps<{
  number: number | string
}>()
</script>

<template>
  <span class="product-price">{{ formatNumber(Number(number)) }} ₽</span>
</template>

<style lang="sass">
.product-price
  width: max-content
  color: var(--color-blue)
  font-weight: 900
  font-size: var(--fs-20)
  text-wrap: nowrap
.product-price--original
  position: relative
  font-size: var(--fs-16)
  font-weight: 700
  color: var(--color-dark-gray)
  &:after
    position: absolute
    top: 50%
    left: 0
    width: 100%
    height: 2px
    content: ''
    background: var(--color-dark-gray)
    transform: rotate(-5deg) translateY(-50%)
    z-index: 1
.product-price--big
  font-size: var(--fs-28)
</style>

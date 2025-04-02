<script setup lang="ts">
defineProps<{
  active?: false | undefined,
}>()
</script>

<template>
  <button
      :class="['product-favorite', {'product-favorite--active' : active}]"
  >
    <svg
        class="product-favorite__icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24">
      <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0"
      />
    </svg>
  </button>
</template>

<style lang="sass">
.product-favorite
  width: 35px
  height: 35px
  &:hover
    path
      fill: var(--color-red)
      stroke: var(--color-red)

.product-favorite__icon
  width: 100%
  height: 100%
  path
    fill: var(--color-white)
    stroke: var(--color-black)
    transition: var(--transition)

.product-favorite--active
    path
      fill: var(--color-red)
      stroke: var(--color-red)
</style>

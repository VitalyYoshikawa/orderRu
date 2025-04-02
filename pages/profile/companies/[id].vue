<script setup lang="ts">

definePageMeta({
  layout: 'profile'
})
</script>

<template>
  <div class="company-product">
    <div class="company-product__inner">
      <h1 class="company-product__title">Ваши товары</h1>
      <ProductAdd />
    </div>
    <div class="company-product__list">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  </div>
</template>

<style lang="sass">
.company-product
  display: flex
  flex-direction: column
  gap: 20px
  width: 100%
.company-product__inner
  display: flex
  align-items: center
  justify-content: space-between
.company-product__list
  display: flex
  flex-wrap: wrap
  gap: 25px
</style>

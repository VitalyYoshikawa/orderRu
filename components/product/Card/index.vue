<script setup lang="ts">
defineProps<{
  id: number | string,
  name: string,
  images: string[],
  price?: number | string,
  originalPrice?: number | string,
  url: string,
  rating: number | string | undefined,
  commentCount: number | string | undefined,
  favorite?: boolean | null | undefined,
  buy?: boolean | null | undefined,
}>()
</script>

<template>
  <div class="product-card">
    <NuxtLink class="product-card__link" :to="`/product/${url}`">
      <ProductCardSlider :images="images"/>
      <div class="product-card__price">
        <ProductPrice v-if="price" :number="price"/>
        <ProductPrice v-if="originalPrice" :number="originalPrice" class="product-price--original"/>
      </div>
      <span class="product-card__name">{{name}}</span>
      <div class="product-card__inner">
        <ProductRating :number="rating"/>
        <ProductCommentCount :number="commentCount"/>
      </div>
    </NuxtLink>
    <ProductFavorite :class="['product-card__product-favorite', {'product-favorite--active' : favorite}]"/>
    <UiButton v-if="buy">Купить</UiButton>
  </div>
</template>

<style lang="sass">
.product-card
  display: flex
  flex-direction: column
  position: relative
  width: 265px
  gap: 7px

.product-card__link
  display: flex
  flex-direction: column
  gap: 7px
  &:hover
    .product-card__name
      color: var(--color-blue)

.product-card__price
  display: flex
  align-items: flex-end
  gap: 5px
  overflow: hidden

.product-card__name
  height: 38px
  display: -webkit-box
  -webkit-line-clamp: 2
  -webkit-box-orient: vertical
  overflow: hidden
  font-size: var(--fs-16)
  color: var(--color-black)
  transition: var(--transition)

.product-card__inner
  display: flex
  gap: 10px

.product-card__product-favorite
  position: absolute
  top: 10px
  left: auto
  right: 10px
</style>

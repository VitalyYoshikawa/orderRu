<script setup lang="ts">
import type {Card} from "~/interfaces/product"

const almostForFree = await useCustomFetch<Card[]>('/api/products/almost-for-free')
const specialOffers = await useCustomFetch<Card[]>('/api/products/special-offers')
const recommendations = await useCustomFetch<Card[]>('/api/products/recommendations')
</script>

<template>
  <div class="main">
    <div class="main__container">
      <h2 class="main__title">Почти даром</h2>
      <div class="main__content">
        <ProductCard
            v-for="(item, index) in almostForFree"
            :key="index"
            :id="item.id"
            :name="item.name"
            :images="item.images"
            :price="item.price"
            :originalPrice="item.originalPrice"
            :url="item.url"
            :rating="item.rating"
            :commentCount="item.commentCount"
            :favorite="item.favorite"
        />
      </div>
    </div>

    <div class="main__container">
      <h2 class="main__title">Специальные предложения!</h2>
      <div class="main__content">
        <ProductCard
            v-for="(item, index) in specialOffers"
            :key="index"
            :id="item.id"
            :name="item.name"
            :images="item.images"
            :price="item.price"
            :originalPrice="item.originalPrice"
            :url="item.url"
            :rating="item.rating"
            :commentCount="item.commentCount"
            :favorite="item.favorite"
        />
      </div>
    </div>

    <div class="main__container">
      <h2 class="main__title">Специально для вас</h2>
      <div class="main__content">
        <ProductCard
            v-for="(item, index) in recommendations"
            :key="index"
            :id="item.id"
            :name="item.name"
            :images="item.images"
            :price="item.price"
            :originalPrice="item.originalPrice"
            :url="item.url"
            :rating="item.rating"
            :commentCount="item.commentCount"
            :favorite="item.favorite"
        />
      </div>
    </div>

  </div>
</template>

<style lang="sass">
.main
  display: flex
  flex-direction: column
  gap: 40px
.main__content
  display: flex
  flex-wrap: wrap
  gap: 40px 28px
.main__title
  margin: 0 0 40px 0
</style>

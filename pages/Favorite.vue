<script setup lang="ts">
import type {Card} from "~/interfaces/product"
import favorite from "~/store/favorite"

const favoriteStore = favorite()

const favoritesRef = ref(await useCustomFetch<Card[]>('/api/favorite-and-basket', {
  method: 'POST',
  body: {
    ids: favoriteStore.favorites
  }
}))

const updateFavorite= async () => {
  favoritesRef.value = await $fetch<Card[]>('/api/favorite-and-basket', {
    method: 'POST',
    body: {
      ids: favoriteStore.favorites
    }
  })
}
</script>

<template>
  <div class="favorite">
    <h1 class="favorite__title">Избранное</h1>
    <div class="favorite__content">
      <ProductCard
          v-for="(item, index) in favoritesRef"
          :key="index"
          :id="item.id"
          :name="item.name"
          :images="item.images"
          :price="item.price"
          :originalPrice="item.originalPrice"
          :url="item.url"
          :rating="3.5"
          :commentCount="123"
          @onClickFavorite="updateFavorite"
      />
    </div>
  </div>
</template>

<style lang="sass">
.favorite
  display: flex
  flex-direction: column
  gap: 40px

.favorite__content
  display: flex
  gap: 40px
</style>

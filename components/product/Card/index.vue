<script setup lang="ts">
import basket from "~/store/basket"
import favorite from "~/store/favorite"

const props = defineProps<{
  id: string,
  name: string,
  images: string[],
  price?: number | string,
  originalPrice?: number | string,
  url: string,
  rating: number | string | undefined,
  commentCount: number | string | undefined,
  buy?: boolean | null | undefined,
  count?: number | undefined,
}>()

const emit = defineEmits(['onClickFavorite', 'updateProductCount'])

const basketStore = basket()
const favoriteStore = favorite()

const showCounterRef = ref(!!basketStore.findObject(props?.id))
const toggleFavoriteRef = ref(favoriteStore?.favorites?.includes(props?.id))

const handleCounterMinus = (val: number) => {
  showCounterRef.value = val > 0
  basketStore.handleCounterMinus()
  basketStore.removeFromBasket({
    id: props?.id,
    count: val
  })
  emit('updateProductCount')
}
const handleCounterPlus = (val: number) => {
  showCounterRef.value = val > 0
  basketStore.handleCounterPlus()
  basketStore.addToBasket({
    id: props?.id,
    count: val
  })
  emit('updateProductCount')
}
const handleClickFavorite = () => {
  if (!toggleFavoriteRef.value) {
    favoriteStore.handleCounterPlus()
    favoriteStore.addToFavorites(props.id)
  } else {
    favoriteStore.handleCounterMinus()
    favoriteStore.removeFromFavorites(props.id)
  }
  toggleFavoriteRef.value = !toggleFavoriteRef.value
  emit('onClickFavorite')
}
</script>

<template>
  <div class="product-card">
    <NuxtLink class="product-card__link" :to="`/products/${url}`">
      <ProductCardSlider :images="images"/>
      <div class="product-card__price">
        <ProductPrice v-if="price" :number="price"/>
        <ProductPrice v-if="originalPrice" :number="originalPrice" class="product-price--original"/>
      </div>
      <span class="product-card__name">{{ name }}</span>
      <div class="product-card__inner">
        <ProductRating :number="rating"/>
        <ProductCommentCount :number="commentCount"/>
      </div>
    </NuxtLink>
    <ProductFavorite @click="handleClickFavorite()"
                     :class="['product-card__product-favorite', {'product-favorite--active' : toggleFavoriteRef}]"/>
    <UiCounter v-if="showCounterRef && buy" :count="basketStore.findObject(props?.id)?.count" :max="count" @counterMinus="handleCounterMinus" @counterPlus="handleCounterPlus"/>
    <UiButton @click="handleCounterPlus(1)" v-if="buy && !showCounterRef">Купить</UiButton>
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

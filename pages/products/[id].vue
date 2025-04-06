<script setup lang="ts">
import type {Card, Product} from "~/interfaces/product"
import getSeo from "~/utils/getSeo"
import favorite from "~/store/favorite"
import basket from "~/store/basket";

const favoriteStore = favorite()
const paramId = useRouter().currentRoute.value.params.id

const seo = await getSeo()
const recommendations = await useCustomFetch<Card[]>('/api/products/recommendations')
const data = await useCustomFetch<Product>(`/api/products/${paramId}`)

const basketStore = basket()

const showCounterRef = ref(!!basketStore.findObject(data?.documentId))

const toggleFavoriteRef = ref(favoriteStore?.favorites?.includes(<string>data?.documentId))

const handleCounterMinus = (val: number) => {
  if (!data?.documentId) return

  showCounterRef.value = val > 0
  basketStore.handleCounterMinus()
  basketStore.removeFromBasket({
    id: data?.documentId,
    count: val
  })
}
const handleCounterPlus = (val: number) => {
  if (!data?.documentId) return

  showCounterRef.value = val > 0
  basketStore.handleCounterPlus()
  basketStore.addToBasket({
    id: data?.documentId,
    count: val
  })
}

const handleClickFavorite = () => {
  if (!data?.documentId) return

  if (!toggleFavoriteRef.value) {
    favoriteStore.handleCounterPlus()
    favoriteStore.addToFavorites(data?.documentId)
  } else {
    favoriteStore.handleCounterMinus()
    favoriteStore.removeFromFavorites(data?.documentId)
  }
  toggleFavoriteRef.value = !toggleFavoriteRef.value
}
</script>

<template>
  <div class="product" v-if="data">
    <UiBreadCrumbs :items="seo?.breadcrumbs"/>
    <div class="product__container">
      <div class="product__sticky">
        <ProductGallery :images="data.media"/>
      </div>
      <div class="product__info">
        <div class="product__header">
          <h1 class="product__title">{{ data.name }}</h1>
          <UiButton class="button--border">
            <Icon name="mage:share"/>
          </UiButton>
        </div>
        <div class="product__additional-info">
          <ProductBrand image="/_nuxt/assets/image/46921_01.jpg" name="Two" label="Бренд"/>
          <ProductRating :number="3.5"/>
          <ProductCommentCount :number="123"/>
        </div>
        <div class="product__purchase purchase">
          <div class="purchase__price">
            <ProductPrice :number="data.price" class="product-price--big"/>
            <ProductPrice :number="data.original_price" class="product-price--original"/>
          </div>
          <div class="purchase__actions">
            <UiButton @click="handleClickFavorite" class="button--border button--favorite">
              <Icon :name="favoriteStore?.favorites?.includes(data.documentId) ? 'mage:heart-fill' : 'mage:heart'"/>
            </UiButton>
            <UiCounter
                class="purchase__counter--width"
                v-if="showCounterRef"
                :count="basketStore.findObject(data?.documentId)?.count"
                :max="data.count"
                @counterMinus="handleCounterMinus"
                @counterPlus="handleCounterPlus"/>
            <UiButton
                @click="handleCounterPlus(1)"
                v-if="!showCounterRef"
            >Купить</UiButton>
          </div>
          <span class="purchase__delivery">Доставим 1 апреля</span>
        </div>
        <div class="product__group">
          <h2 class="product__subtitle">Описание</h2>
          <p class="product__description">{{ data.description }}</p>
        </div>
        <div class="product__group">
          <h2 class="product__subtitle">Характеристики</h2>
          <ProductCharacteristic label="Размеры" :characteristic="data.attribute_values"/>
        </div>
      </div>
    </div>
    <div class="product__recommendation recommendation">
      <h2 class="product__section-title">Рекомендуем также</h2>
      <div class="recommendation__items">
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
            :favorite="favoriteStore?.favorites?.includes(item.id)"
        />
      </div>
    </div>
    <div class="product__reviews">
      <h2 class="product__section-title">Отзывы о товаре</h2>
      <div class="product__inner">
        <ProductReviews/>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.product
  display: flex
  flex-direction: column
  gap: 40px

.product__container
  display: flex
  gap: 40px

.product__title
  font-size: var(--fs-32)

.product__info
  display: flex
  flex-direction: column
  gap: 20px
  width: 100%

.product__additional-info
  display: flex
  align-items: center
  gap: 20px

.product__subtitle
  font-size: var(--fs-20)

.product__description
  font-weight: 400

.product__header
  display: flex
  gap: 10px
  align-items: flex-start
  justify-content: space-between

.product__purchase
  display: grid
  grid-template-rows: auto auto
  grid-template-columns: auto
  grid-gap: 10px
  width: max-content

.purchase__price
  grid-row: 1

.purchase__actions
  grid-row: 1
  display: flex
  gap: 10px

.purchase__delivery
  grid-row: 2
  font-weight: 900

.product__group
  display: flex
  flex-direction: column
  gap: 10px

.product__recommendation
  display: flex
  flex-direction: column
  gap: 40px

.recommendation__items
  display: flex
  flex-wrap: wrap
  gap: 40px 28px

.product__reviews
  display: flex
  flex-direction: column
  gap: 20px

.product__sticky
  position: sticky
  top: 20px
  height: max-content

.product__modifier-group
  display: flex
  gap: 10px

.product__modifier-item
  border: var(--border-black)
  padding: 10px
  border-radius: var(--border-radius)

.product__modifier-item--active
  border: var(--border-blue)
  color: var(--color-blue)

.product__color
  display: block
  width: 20px
  height: 20px

.purchase__counter--width
  width: 180px
</style>

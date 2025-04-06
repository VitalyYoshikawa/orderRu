<script setup lang="ts">
import type {Card} from "~/interfaces/product"
import basket from "~/store/basket"

const basketStore = basket()
const calcPrice = ref(0)

const ids = basketStore.basket.reduce((acc: Array<string>, item) => {
  return [...acc, item.id]
}, [])


const basketData = await useCustomFetch<Card[]>('/api/favorite-and-basket', {
  method: 'POST',
  body: {
    ids: ids
  }
})


const handleUpdatePrice = () => {
  if (!basketData && !basketStore.basket) return

  calcPrice.value = 0
  basketStore.basket.forEach(item => {
    const price = basketData?.find((itemData) => {
      return item.id === itemData.id
    })?.price
    calcPrice.value += price ? price * item.count  : 0
  })
}

handleUpdatePrice()
</script>

<template>
<div class="basket">
  <h1 class="basket__title">Корзина</h1>
  <div class="basket__container">
    <div class="basket__content">
      <ProductCard
          v-for="(item, index) in basketData"
          :key="index"
          :id="item.id"
          :name="item.name"
          :images="item.images"
          :price="item.price"
          :originalPrice="item.originalPrice"
          :url="item.url"
          :rating="3.5"
          :commentCount="123"
          :buy="true"
          @updateProductCount="handleUpdatePrice"
      />
    </div>
    <div class="basket__sticky">
      <div class="basket__card">
        <div class="basket__card-inner">
          <span class="basket__message">Цена за весь товар: </span>
          <ProductPrice :number="calcPrice" />
        </div>
        <span>Доставим 1 апреля</span>
        <UiButton>Купить</UiButton>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="sass">
.basket
  display: flex
  flex-direction: column
  gap: 40px

.basket__container
  display: flex
  gap: 28px

.basket__content
  display: flex
  flex-wrap: wrap
  gap: 40px 28px
  width: 100%

.basket__sticky
  position: sticky
  top: 20px
  flex: 0 0 auto

.basket__card
  display: flex
  flex-direction: column
  width: 268px
  height: auto
  gap: 20px

</style>

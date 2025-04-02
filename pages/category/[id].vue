<script setup lang="ts">
import type {Card} from "~/interfaces/product"
import type {Filter} from "~/interfaces/category"

const paramId = useRouter().currentRoute.value.params.id

const listFilter = await useCustomFetch<Filter[]>(`/api/category/filter/${paramId}`)
const listProduct = await useCustomFetch<Card[]>(`/api/category/list-product/${paramId}`)

</script>

<template>
  <div class="category">
    <h1 class="category__title">Категория</h1>
    <UiBreadCrumbs :items="[{name: 'Что-то', url: '/'}]"/>
    <div class="category__container">
      <CategoryFilter :filters="listFilter" />
      <div class="category__content">
        <ProductCard
            v-for="(item, index) in listProduct"
            :key="index"
            :id="item.id"
            :name="item.name"
            :images="item.images"
            :price="item.price"
            :originalPrice="item.originalPrice"
            :url="item.url"
            :rating="3.5"
            :commentCount="123"
            :favorite="item.favorite"
            :buy="true"
        />
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.category
  display: flex
  flex-direction: column
  gap: 40px

.category__container
  display: flex
  gap: 28px

.category__content
  display: flex
  flex-wrap: wrap
  gap: 40px 28px
</style>

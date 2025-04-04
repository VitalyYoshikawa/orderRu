<script setup lang="ts">
import type {Card} from "~/interfaces/product"
import type {Filter} from "~/interfaces/category"
import getSeo from "~/utils/getSeo"

const router = useRouter().currentRoute.value

const seo = await getSeo()
const listFilter = await useCustomFetch<Filter[]>(`/api/categories/filter/${router.params.id}`)
const listProduct = ref(await useCustomFetch<Card[]>(`/api/categories/list-product/${router.params.id}`, {
  method: "POST",
  body: router.query
}))

const updateFilter = async () => {
  const router = useRouter().currentRoute.value
  listProduct.value = await $fetch<Card[]>(`/api/categories/list-product/${router.params.id}`, {
    method: "POST",
    body: router.query
  })
}
</script>

<template>
  <div class="category">
    <h1 class="category__title">{{seo?.title}}</h1>
    <UiBreadCrumbs :items="seo?.breadcrumbs"/>
    <div class="category__container">
      <CategoryFilter @updateFiltres="updateFilter" :filters="listFilter" />
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

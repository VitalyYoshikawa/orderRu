<script setup lang="ts">
import type {CategoryListLink} from "~/interfaces/category";

const categoryList = await useCustomFetch<CategoryListLink[]>('/api/categories/list')
</script>

<template>
  <footer class="footer">
    <div class="footer__inner footer__inner--col">
      <UiLogo class="footer__logo"/>
      <div class="footer__social-links">
        <UiSocLink type="telegram"/>
        <UiSocLink type="whatsapp" />
        <UiSocLink type="pinterest" />
      </div>
      <p class="footer__copyright">
        © 2025
        <br>
        ООО "order ru"
        <br>
        Все права защищены.
      </p>
    </div>
    <div class="footer__inner">
      <UiCategoryList
          v-for="(item, index) in categoryList"
          :key="index"
          :name="item.name"
          :url="`/categories/${item.url}`"
          :subcategories="item.subcategories"
      />
    </div>
  </footer>
</template>

<style lang="sass">
  .footer
    display: flex
    width: 100%
    max-width: var(--width-xxl)
    padding: 20px 0 112px 0
    margin: 80px auto 0 auto
    gap: 40px
    box-sizing: border-box
.footer__logo
  width: 200px
.footer__inner
  display: flex
  flex-wrap: wrap
  gap: 25px
.footer__inner--col
  width: 265px
  flex-direction: column
.footer__copyright
  max-width: 300px
.footer__social-links
  display: flex
  flex-wrap: wrap
  max-width: 300px
  gap: 20px
@media (max-width: 1480px)
  .footer
    max-width: var(--width-xl)
</style>

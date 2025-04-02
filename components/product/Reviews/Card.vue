<script setup lang="ts">

</script>

<template>
  <div class="reviews-card">
    <div class="reviews-card__inner">
      <div class="reviews-card__user">
        <UiAvatar name="Вася" image="/_nuxt/assets/image/7364513132.webp"/>
        <span class="reviews-card__name">Вася</span>
      </div>
      <div class="reviews-card__date-rating">
        <span class="reviews-card__date">{{ formatDate(new Date()) }}</span>
        <UiRating :value="3"/>
      </div>
    </div>
    <NuxtLink to="/" class="reviews-card__type">Название цвета: Черный, Цвет товара: черный, Оперативная память: 8 ГБ, Встроенная память: 256 ГБ</NuxtLink>
    <span class="reviews-card__reviews">отличный телефон за эти деньги </span>
    <ProductReviewsGalleryPreview/>
  </div>
</template>

<style lang="sass">
.reviews-card
  display: flex
  flex-direction: column
  gap: 20px
  padding: 0 0 20px 0
  border-bottom: var(--border-dark-gray)

.reviews-card__inner
  display: flex
  align-items: center
  justify-content: space-between

.reviews-card__user
  display: flex
  align-items: center
  gap: 10px

.reviews-card__date-rating
  display: flex
  align-items: center
  gap: 10px

</style>

<script setup lang="ts">

</script>

<template>
  <div class="reviews">
    <div class="reviews__inner reviews__inner--max-width">
      <div class="reviews__filter">
        <UiButton>Все отзывы</UiButton>
        <UiButton class="button--border">Этот вариант товара</UiButton>
      </div>
      <div class="reviews__list">
        <ProductReviewsCard v-for="index in 5" :key="index" />
      </div>
    </div>
    <div class="reviews__inner">
      <div class="reviews__sticky">
        <div class="reviews__reviews-info reviews-info">
          <div class="reviews-info__inner">
            <UiRating :value="3"/>
            <span class="reviews-info__rating-num">4.9</span>
            <span class="reviews-info__reviews-quantity">250 отзывов</span>
          </div>
          <div class="reviews__statistic">
            <UiStatistic class="reviews__statistic--width" leftText="5 звезд" rightText="1222" :progress="74"/>
            <UiStatistic class="reviews__statistic--width" leftText="4 звезды" rightText="220" :progress="33"/>
            <UiStatistic class="reviews__statistic--width" leftText="3 звезды" rightText="22" :progress="5"/>
            <UiStatistic class="reviews__statistic--width" leftText="2 звезды" rightText="2" :progress="1"/>
            <UiStatistic class="reviews__statistic--width" leftText="1 звезда" rightText="0" :progress="0"/>
          </div>
          <span class="reviews-info__msg">Отзывы могут оставлять только те, кто купил товар. Так мы формируем честный рейтинг</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.reviews
  display: flex
  gap: 40px

.reviews__inner
  display: flex
  flex-direction: column
  gap: 20px

.reviews__inner--max-width
  width: 100%

.reviews__sticky
  position: sticky
  top: 20px

.reviews-info
  display: flex
  flex-direction: column
  width: 350px
  gap: 20px

.reviews__filter
  display: flex
  gap: 10px

.reviews__list
  width: 100%

.reviews-info__inner
  display: flex
  align-items: center
  gap: 5px

.reviews-info__reviews-quantity
  margin: 0 0 0 auto

.reviews__statistic
  display: flex
  flex-direction: column
  gap: 10px

.reviews__statistic--width
  .statistic__label
    width: 62px
  .statistic__value
    width: 40px

.reviews-info__msg
  font-size: var(--fs-14)

.reviews__list
  display: flex
  flex-direction: column
  gap: 20px
</style>

<script setup lang="ts">
defineProps<{
  images: string[] | undefined
}>()

const countRef = ref<number>(0)

const handleSwitchImg = (index: number): void => {
  countRef.value = index
}
</script>

<template>
  <div class="product-card__slider" v-if="images">
    <div
        class="product-card__slider-container"
        @mouseleave="handleSwitchImg(0)"
    >
      <img
          class="product-card__slider-img"
          :src="images[countRef]"
          alt="Описание изображения"
      >
      <div class="product-card__slider-segments">
        <div
            class="product-card__slider-segment"
            v-for="(item, index) in images.length"
            :key="index"
            @mouseover="handleSwitchImg(index)"
        ></div>
      </div>
    </div>
    <div class="product-card__slider-dots">
      <div
          :class="['product-card__slider-dot', { 'product-card__slider-dot--active' : index  === countRef }]"
          v-for="(item, index) in images.length"
          :key="index"
      ></div>
    </div>
  </div>
</template>

<style lang="sass">
.product-card__slider
  position: relative
  width: max-content
  height: auto
  margin: 0 0 20px 0
.product-card__slider-container
  width: 265px
  height: 354px
  overflow: hidden
  border-radius: var(--border-radius)
  background: var(--color-light-gray)
.product-card__slider-img
  width: 100%
  height: 100%
  object-fit: contain
.product-card__slider-segments
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  display: flex
.product-card__slider-segment
  flex: 1 1 auto
  height: 100%
.product-card__slider-dots
  position: absolute
  top: auto
  left: 50%
  bottom: -15px
  transform: translateX(-50%)
  display: flex
  gap: 3px
.product-card__slider-dot
  width: 5px
  height: 5px
  border-radius: 5px
  background: var(--color-dark-gray)
  &--active
    background: var(--color-blue)
</style>

<script setup lang="ts">
const data = {
  previews: [
    {
      img: '/_nuxt/assets/image/7364513132.webp',
      type: 'video',
    },
    {
      img: '/_nuxt/assets/image/7364513132.webp',
      type: 'img',
    }
  ],
  quantity: 136,
}
</script>

<template>
  <div class="reviews-gallery-preview">
    <button
        class="reviews-gallery-preview__container"
        v-for="(item, index) in data.previews"
    >
      <img class="reviews-gallery-preview__preview" :src="item?.img" alt="">
      <span class="reviews-gallery-preview__tinting"></span>
      <Icon v-if="item?.type === 'video'" class="reviews-gallery-preview__icon" name="mage:play" />
      <span v-if="index === data?.previews?.length - 1" class="reviews-gallery-preview__quantity">+{{ data.quantity }}</span>
    </button>
  </div>
</template>

<style lang="sass">
.reviews-gallery-preview
  display: flex
  gap: 10px
.reviews-gallery-preview__container
  position: relative
  width: 86px
  height: 86px
  border-radius: var(--border-radius)
  overflow: hidden
.reviews-gallery-preview__preview
  width: 100%
  height: 100%
  object-fit: cover
.reviews-gallery-preview__tinting
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-color: var(--color-opacity-2)
.reviews-gallery-preview__icon
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  width: 46px
  height: 46px
  background-color: var(--color-white)
.reviews-gallery-preview__quantity
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  font-size: var(--fs-24)
  font-weight: 700
  color: var(--color-white)
</style>

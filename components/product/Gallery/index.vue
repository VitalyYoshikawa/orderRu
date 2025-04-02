<script setup lang="ts">
defineProps<{
  images: string[],
}>()

const countRef = ref<number>(0)
const isOpenModalRef = ref<boolean>(false)
const previewContainerRef = ref<Element | null>(null)
const previewModalContainerRef = ref<Element | null>(null)

const scrollPreview = (index: number): void => {
  previewContainerRef.value?.querySelector(`[data-index="${index}"]`)?.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
  })
  previewModalContainerRef.value?.querySelector(`[data-index="${index}"]`)?.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
  })
}

const handleSwitchImg = (index: number): void => {
  countRef.value = index
  scrollPreview(index)
}
</script>

<template>
<div class="gallery">
  <div
      class="gallery__preview"
      ref="previewContainerRef"
  >
    <img
        :class="['gallery__preview-item', {'gallery__preview-item--active' : index === countRef}]"
        v-for="(item, index) in images"
        :key="index"
        :data-index="index"
        :src="item"
        @click="handleSwitchImg(index)"
    >
  </div>
  <img
      class="gallery__img"
      :src="images[countRef]"
      alt=""
      @click="isOpenModalRef = true"
  >
  <UiModal
      :fullscreen="true"
      :open="isOpenModalRef"
      @close="isOpenModalRef = false"
  >
    <div class="gallery__modal-gallery modal-gallery">
      <div
          class="modal-gallery__preview"
          ref="previewModalContainerRef"
      >
        <img
            :class="['modal-gallery__preview-item', {'modal-gallery__preview-item--active' : index === countRef}]"
            v-for="(item, index) in images"
            :key="index"
            :data-index="index"
            :src="item"
            @click="handleSwitchImg(index)"
        >
      </div>
      <img
          class="modal-gallery__img"
          :src="images[countRef]"
          @click="isOpenModalRef = true"
      >
    </div>
  </UiModal>
</div>
</template>

<style lang="sass">
.gallery
  display: flex
  gap: 20px
.gallery__preview
  display: flex
  width: 67px
  flex-direction: column
  flex: 0 0 auto
  gap: 5px
  overflow: auto
  max-height: 660px
  &::-webkit-scrollbar-thumb
    border-radius: 7px
    background: transparent
    pointer-events: none
    cursor: none
    &:hover
      background: transparent
.gallery__preview-item
  flex: 0 0 auto
  width: 48px
  height: 64px
  padding: 5px
  border-radius: var(--border-radius)
  cursor: pointer
  object-fit: contain
.gallery__preview-item--active
  border: var(--border-blue)
.gallery__img
  width: 500px
  height: 660px
  object-fit: contain
  border-radius: var(--border-radius)
  cursor: pointer

.modal-gallery
  display: flex
  width: 100%
  height: 100%

.modal-gallery__preview
  display: flex
  flex-direction: column
  flex: 0 0 auto
  gap: 5px
  overflow: auto
  max-height: 100%
  padding: 0 10px 0 0
.modal-gallery__preview-item
  flex: 0 0 auto
  width: 48px
  height: 64px
  padding: 5px
  border-radius: var(--border-radius)
  cursor: pointer
  object-fit: contain
.modal-gallery__preview-item--active
  border: var(--border-blue)
.modal-gallery__img
  width: 100%
  height: 100%
  object-fit: contain
  border-radius: var(--border-radius)
  padding: 0 100px
  box-sizing: border-box
</style>

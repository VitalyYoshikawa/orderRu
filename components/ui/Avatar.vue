<script setup lang="ts">
const props = defineProps<{
  name: string,
  image?: string,
  upload?: boolean | undefined
}>()

const nameCut = computed(() => {
  return props.name[0].toUpperCase()
})
</script>

<template>
  <div :class="['avatar', {'avatar--upload' : upload}]">
    <span v-if="!image" class="avatar__symbol">{{ nameCut }}</span>
    <img v-else class="avatar__image" :src="image">
    <span v-if="upload" class="avatar__hover">
      <Icon class="avatar__icon" name="mage:camera" />
    </span>
  </div>
</template>

<style lang="sass">
.avatar
  display: flex
  align-items: center
  justify-content: center
  width: 46px
  height: 46px
  border-radius: 46px
  background-color: var(--color-light-gray)
  overflow: hidden
.avatar--upload
  position: relative
  width: 120px
  height: 120px
  border-radius: 120px
  cursor: pointer
  .avatar__symbol
    font-size: var(--fs-42)
  &:hover
    .avatar__hover
      opacity: 1
.avatar__symbol
  color: var(--color-black)
  font-size: var(--fs-20)
  font-weight: 900
.avatar__image
  width: 100%
  height: 100%
  object-fit: cover
.avatar__hover
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  content: ''
  display: flex
  align-items: center
  justify-content: center
  background: var(--color-opacity-4)
  opacity: 0
  transition: var(--transition)
.avatar__icon
  width: 60px
  height: 60px
  background-color: var(--color-white)
</style>

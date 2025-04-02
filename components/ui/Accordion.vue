<script setup lang="ts">
const isShowRef = ref<boolean>(false)
</script>

<template>
  <div class="accordion">
    <UiInput
        v-if="isShowRef"
        class="accordion__search"
        placeholder="Поиск"
    />
    <div class="accordion__container">
      <slot></slot>
    </div>
    <button class="accordion__button">{{ isShowRef ? 'свернуть' : 'еще' }}</button>
  </div>
</template>

<style lang="sass">
.accordion__container
  display: flex
  flex-direction: column
  gap: 7px
  max-height: 300px
  overflow: auto
.accordion__button
  margin: 5px 0 0 0
  color: var(--color-blue)
  transition: var(--transition)
  &:hover
    opacity: var(--opacity)
.accordion__search
  margin: 0 0 10px 0
</style>

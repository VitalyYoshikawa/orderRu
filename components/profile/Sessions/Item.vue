<script setup lang="ts">
defineProps<{
  current?: boolean | undefined
}>()

</script>

<template>
  <div class="session-item">
    <div class="session-item__inner">
      <Icon class="session-item__icon-device" name="mage:mobile-phone"/>
      <span class="session-item__device">Mobile Android 10</span>
      -
      <span class="session-item__method">Chrome Mobile 130.0.0</span>
    </div>
    <div
        class="session-item__inner"
        v-if="!current"
    >
      <span class="session-item__location">Москва</span>
      -
      <span class="session-item__ip">94.25.180.206</span>
    </div>
    <div
        class="session-item__inner"
        v-if="!current"
    >
      <span class="session-item__date">21.02.2025</span>
      <button
          class="session-item__complete"
      >
        <Icon class="session-item__complete-icon" name="mage:multiply" />
      </button>
    </div>
  </div>
</template>

<style lang="sass">
.session-item
  display: flex
  align-items: center
  justify-content: space-between
  span
    display: block
    font-weight: 400

.session-item__inner
  display: flex
  align-items: center
  gap: 10px

.session-item__icon-device
  width: 24px
  height: 24px
  background-color: var(--color-dark-gray)

.session-item__complete-icon
  width: 24px
  height: 24px
  background-color: var(--color-dark-gray)
  transition: var(--transition)
  &:hover
    background-color: var(--color-red)
</style>

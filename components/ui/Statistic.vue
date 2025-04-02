<script setup lang="ts">
defineProps<{
  leftText?: string,
  rightText?: string,
  progress?: number,
}>()
</script>

<template>
  <div class="statistic">
      <span class="statistic__label" v-if="leftText">{{leftText}}</span>
      <div class="statistic__line">
        <span class="statistic__progress" :style="`width: ${progress}%`"></span>
      </div>
      <span class="statistic__value" v-if="rightText">{{rightText}}</span>
  </div>
</template>

<style lang="sass">
.statistic
  display: grid
  grid-template-columns: auto 1fr auto
  grid-gap: 5px
  width: 100%
.statistic__line
  grid-column: 2
  width: 100%
  height: 10px
  border-radius: 5px
  overflow: hidden
  background: var(--color-light-gray)
.statistic__progress
  display: block
  height: 100%
  background: var(--color-yellow)
.statistic__label,
.statistic__value
  font-size: var(--fs-14)
.statistic__label
  grid-column: 1
.statistic__value
  grid-column: 3
</style>

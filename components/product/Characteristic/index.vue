<script setup lang="ts">
defineProps<{
  label?: string
  characteristic: {
    name: string,
    value: string | number
  }[]
}>()
</script>

<template>
  <div class="characteristic">
    <div class="characteristic__inner">
      <span class="characteristic__name-group" v-if="label">{{label}}</span>
      <ul class="characteristic__list">
        <li
            class="characteristic__item"
            v-for="(item, index) in characteristic"
            :key="index">
          <div class="characteristic__item-inner">
            <span class="characteristic__name">{{ item.name }}</span>
          </div>
          <span class="characteristic__value">{{ item.value }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="sass">
.characteristic__list
  padding: 0
  list-style: none
  column-count: 2
  width: 100%
.characteristic__item
  display: grid
  grid-template-columns: 1fr 1fr
  grid-gap: 10px
  overflow: hidden
  margin: 0 0 10px 0
.characteristic__item-inner
  position: relative
  flex: 1 1 auto
  &:after
    position: absolute
    top: 1em
    left: 0
    display: block
    width: 100%
    height: 1px
    background-color: var(--color-dark-gray)
    content: ''
    z-index: -1
.characteristic__name
  font-weight: 400
  color: var(--color-dark-gray)
  background-color: var(--color-white)
.characteristic__value
  font-weight: 400
  flex: 1 1 auto
</style>

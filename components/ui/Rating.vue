<script setup lang="ts">
interface Props {
  type?: 'static' | 'action',
  value?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'static',
  value: 0
})

const ratingRef = ref<number>(props.value)

</script>

<template>
  <div class="rating">
    <Icon
        :class="['rating__icon', {'rating__icon--action' : type === 'action'}]"
        :name="item <= ratingRef ? 'mage:star-fill' : 'mage:star'"
        v-for="item in 5"
        :key="item"
        v-bind="type === 'action' ? { onClick: () => ratingRef = item } : {}"
    ></Icon>
  </div>
</template>

<style lang="sass">
.rating
  display: flex
  gap: 5px

.rating__icon
  width: 24px
  height: 24px
  background-color: var(--color-yellow)
  cursor: default
  transition: var(--transition)
.rating__icon--action
  cursor: pointer
  &:hover
    background-color: var(--color-blue)
    opacity: var(--opacity)
</style>

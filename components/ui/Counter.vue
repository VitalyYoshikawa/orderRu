<script setup lang="ts">
interface Props {
  count: number,
  max?: number,
}

const props = withDefaults(defineProps<Props>(), {
  count: 1,
  max: 10
})

const emit = defineEmits(['counterMinus', 'counterPlus'])

const counterRef = ref<number>(props.count)

const handleCounterMinus = () => {
  if (counterRef.value > 0) {
    counterRef.value--
    emit('counterMinus', counterRef.value)
  }
}

const handleCounterPlus = () => {
  if (counterRef.value < props.max) {
    counterRef.value++
    emit('counterPlus', counterRef.value)
  }
}
</script>

<template>
<div class="counter">
  <UiButton class="counter__button" @click="handleCounterMinus()">-</UiButton>
  <span class="counter__value">{{ counterRef }}</span>
  <UiButton :class="['counter__button', {'counter--opacity' : max === counterRef}]" @click="handleCounterPlus()">+</UiButton>
</div>
</template>

<style lang="sass">
.counter
  display: flex
  align-items: center
  justify-content: space-between
.counter--opacity
  opacity: .5
  pointer-events: none
</style>

<script setup lang="ts">
interface Props {
  type?: 'telegram' | 'whatsapp' | 'pinterest'
}

withDefaults(defineProps<Props>(), {
  type: 'telegram',
})
</script>

<template>
  <a class="soc-link" href="/public" target="_blank">
    <Icon class="soc-link__icon" :name="`mage:${type}`"></Icon>
  </a>
</template>

<style lang="sass">
.soc-link
  display: flex
  align-items: center
  justify-content: center
  width: 50px
  height: 50px
  border-radius: var(--border-radius)
  border: var(--border-black)
  &:hover
    .soc-link__icon
      background-color: var(--color-blue)
.soc-link__icon
  width: 24px
  height: 24px
  background-color: var(--color-black)
  transition: var(--transition)

</style>

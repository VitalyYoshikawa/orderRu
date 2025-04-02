<script setup lang="ts">

</script>

<template>
  <div class="company">
    <NuxtLink to="/profile/companies/1" class="company__name">ООО Солнышко</NuxtLink>
    <div class="company__actions">
      <UiButton>Добавить товар</UiButton>
      <UiButton>Удалить</UiButton>
    </div>
  </div>
</template>

<style lang="sass">
.company
  display: flex
  align-items: center
  justify-content: space-between
  gap: 10px
  border-bottom: var(--border-dark-gray)
  padding: 10px 0
.company__name
  width: 100%
.company__actions
  display: flex
  align-items: center
  gap: 10px
  flex: 0 0 auto
</style>

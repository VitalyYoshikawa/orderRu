<script setup lang="ts">

</script>

<template>
  <div class="add-company">
    <div class="add-company__inner">
      <span class="add-company__title">Добавьте компанию</span>
      <span class="add-company__description">Укажите ИНН компании, которая будет оплачивать / продавать заказы</span>
    </div>
    <UiInput class="add-company__input" placeholder="ИНН"/>
    <UiButton>Добавить</UiButton>
  </div>
</template>

<style lang="sass">
.add-company
  display: flex
  align-items: center
  gap: 20px
.add-company__inner
  width: max-content
  flex: 0 0 auto
.add-company__title
  display: block
  font-size: var(--fs-24)
.add-company__description
  font-size: var(--fs-14)
.add-company__input
  width: 100%
</style>

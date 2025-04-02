<script setup lang="ts">
const isOpenModalRef = ref<boolean>(false)
</script>

<template>
  <div class="product-add">
    <UiButton @click="isOpenModalRef = true">Добавить товар</UiButton>
    <UiModal :open="isOpenModalRef" @close="isOpenModalRef = false">
      <div class="product-add__info">
        <span class="product-add__title">Информация о товаре</span>
        <UiInput placeholder="Название"/>
        <UiSelect
            class="product-add__select"
            placeholder="Категория и тип"
            :options="[{
              label: 'Бытовая техника',
              value: '1',
            }]"
        />

        <div class="product-add__inner">
          <span class="product-add__name-group">Основные параметры</span>
          <div class="product-add__group">
            <UiInput required placeholder="Длина упаковки, мм"/>
            <UiInput required placeholder="Ширина упаковки, мм"/>
            <UiInput required placeholder="Высота упаковки, мм"/>
            <UiInput required placeholder="Вес с упаковкой, г"/>
          </div>
        </div>
        <div class="product-add__actions">
          <UiButton @click="isOpenModalRef = false">Отмена</UiButton>
          <UiButton>Больше параметров</UiButton>
          <UiButton class="product-add__btn---left">Сохранить</UiButton>
        </div>
      </div>
    </UiModal>
  </div>
</template>

<style lang="sass">
.product-add__info
  display: flex
  flex-direction: column
  width: 650px
  gap: 20px

.product-add__title
  font-size: var(--fs-24)
  text-align: center

.product-add__name-group
  display: block
  font-size: var(--fs-20)
  margin: 0 0 20px 0

.product-add__group
  display: grid
  grid-template-columns: 1fr 1fr
  grid-gap: 10px

.product-add__group--3-col
  grid-template-columns: 1fr 1fr 1fr

.product-add__select
  width: 100%

.product-add__actions
  display: flex
  gap: 10px
.product-add__btn---left
  margin: 0 0 0 auto
</style>

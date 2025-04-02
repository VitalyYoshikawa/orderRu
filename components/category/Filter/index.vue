<script setup lang="ts">
import type { Filter } from '~/interfaces/category'

defineProps<{
  filters: Filter[] | null | undefined
}>()

</script>



<template>
  <div class="category-filter" v-if="filters">
    <div class="category-filter__inner">
      <template v-for="(filter, index) in filters" :key="index">
        <div class="category-filter__group" v-if="filter.type === 'price'">
          <span class="category-filter__name">{{ filter.label }}</span>
          <div class="category-filter__price">
            <UiInput
                class="category-filter__price-item"
                type="number"
                :value="filter?.price?.min"
            />
            <UiInput
                class="category-filter__price-item"
                type="number"
                :value="filter?.price?.max"
            />
          </div>
        </div>

        <div class="category-filter__group" v-else-if="filter.type === 'radio'">
          <span class="category-filter__name">{{ filter.label }}</span>
          <UiRadioButton
              v-for="(option, i) in filter.options"
              :key="i"
              :name="filter.name"
              :value="option.value"
              :label="option.label"
          />
        </div>

        <div class="category-filter__group" v-else-if="filter.type === 'checkbox'">
          <span class="category-filter__name">{{ filter.label }}</span>
          <UiAccordion>
            <UiCheckBox
                v-for="(option, i) in filter.options"
                :key="i"
                :value="option.value"
                :name="filter.name"
                :label="option.label"
            />
          </UiAccordion>
        </div>

        <div class="category-filter__group" v-else-if="filter.type === 'switch'">
          <UiSwitch
              :label="filter.label"
          />
        </div>

        <div class="category-filter__group" v-else-if="filter.type === 'input'">
          <span class="category-filter__name">{{ filter.label }}</span>
          <UiInput
              :placeholder="filter.placeholder"
          />
        </div>
      </template>

      <UiButton>Очистить</UiButton>
    </div>
  </div>
</template>


<style lang="sass">
.category-filter
  display: flex
  flex-direction: column
  width: 265px
  flex: 0 0 auto

.category-filter__inner
  position: sticky
  top: 20px
  display: flex
  flex-direction: column
  gap: 20px

.category-filter__name
  display: block
  margin: 0 0 10px 0
  color: var(--color-black)

.category-filter__group
  display: flex
  flex-direction: column
  gap: 7px

.category-filter__price
  display: flex
  gap: 10px

.category-filter__price-item
  flex: 1 1 auto
</style>

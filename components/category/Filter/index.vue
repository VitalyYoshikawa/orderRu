<script setup lang="ts">
import type { Filter } from '~/interfaces/category'

defineProps<{
  filters: Filter[] | null | undefined
}>()

const emit = defineEmits(['updateFiltres'])

const router = useRouter()
const routerQuery = router.currentRoute.value.query

let query: any = {}

if (routerQuery) {
  Object.entries(routerQuery).forEach(([key, value]) => {
    query[key] = value.includes('%') ? value.split('%') : value
  })
}

function handleFilterChange(filterName: string | undefined, value: string | number | undefined, type: string = ''): void {
  if (!filterName || !value) return

  if (type === 'checkbox') {
    if (typeof query[filterName!] === 'string') {
      query[filterName!] = [query[filterName!]]
    }
    if (!query[filterName!]) {
      query[filterName!] = []
    }

    const index = query[filterName!].indexOf(value as string | number)
    index === -1 ? query[filterName!].push(value) : query[filterName!].splice(index, 1)
    if (query[filterName!].length === 0) delete query[filterName!]
  } else {
    query[filterName!] = value
  }

  router.push({
    query: Object.fromEntries(Object.entries(query).map(([key, val]) => {
      return [key, Array.isArray(val) ? val.join('%') : val]
    }))
  }).then(() => emit('updateFiltres'))
}

function clearFilters() {
  query = {}
  router.push({ query }).then(() =>window.location.reload())
}
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
                @input="handleFilterChange(`${filter.name}_min`, $event.target.value)"
            />
            <UiInput
                class="category-filter__price-item"
                type="number"
                :value="filter?.price?.max"
                @input="handleFilterChange(`${filter.name}_max`, $event.target.value)"
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
              @change="handleFilterChange(filter.name, option.value)"
              :checked="query[filter?.label] === option.value"
          />
        </div>

        <div class="category-filter__group" v-else-if="filter.type === 'checkbox'">
          <span class="category-filter__name">{{ filter.label }}</span>
            <UiCheckBox
                v-for="(option, i) in filter.options"
                :key="i"
                :value="option.value"
                :name="filter.name"
                :label="option.label"
                @change="handleFilterChange(filter.name, option.value, filter.type)"
                :checked="query[filter?.label]?.includes(option.value)"
            />
        </div>

        <div class="category-filter__group" v-else-if="filter.type === 'switch'">
          <UiSwitch
              :label="filter.label"
              @change="handleFilterChange(filter.name, $event)"
          />
        </div>

        <div class="category-filter__group" v-else-if="filter.type === 'input'">
          <span class="category-filter__name">{{ filter.label }}</span>
          <UiInput
              :placeholder="filter.placeholder"
              @input="handleFilterChange(filter.name, $event.target.value)"
          />
        </div>
      </template>

      <UiButton @click="clearFilters">Очистить</UiButton>
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

<script setup lang="ts">
import basket from "~/store/basket"

const basketStore = basket()
const router = useRouter()
</script>

<template>
  <LayoutNavBarButton @click="router.push('/basket')" :indicator="basketStore.counterAddProduct" iconName="mage:basket" label="Корзина" />
</template>

<style lang="sass">
</style>

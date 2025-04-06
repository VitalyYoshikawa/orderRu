<script setup lang="ts">
import favorite from "~/store/favorite"

const favoriteStore = favorite()
const router = useRouter()
</script>

<template>
  <LayoutNavBarButton @click="router.push('/favorite')" :indicator="favoriteStore.counterAddFavorite" iconName="mage:heart" label="Избранное" />
</template>

<style lang="sass">

</style>

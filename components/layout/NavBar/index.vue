<script setup lang="ts">


</script>

<template>
  <div class="nav-bar">
    <UiLogo
        class="nav-bar__logo"
        :onlyIcon="true"
    />
    <LayoutNavBarButtonCatalog />
    <LayoutNavBarButtonSearch />
    <LayoutNavBarButtonFavorites />
    <LayoutNavBarButtonBasket />
    <LayoutNavBarButtonLoginLk />
  </div>
</template>

<style lang="sass">
.nav-bar
  position: fixed
  top: auto
  left: 50%
  bottom: 20px
  transform: translateX(-50%)
  z-index: 2
  display: flex
  align-items: center
  gap: 15px
  padding: var(--padding-xxl)
  border: var(--border-black)
  border-radius: var(--border-radius)
  background: var(--color-white)
  box-sizing: border-box

.nav-bar__logo
  width: 50px
  height: 50px
</style>

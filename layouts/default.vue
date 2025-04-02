<script setup lang="ts">

</script>

<template>
  <div class="layout">
    <LayoutHeader />
    <LayoutNavBar />
    <div class="container">
      <slot />
    </div>
    <LayoutFooter/>
  </div>
</template>

<style lang="sass">
.layout
  display: flex
  flex-direction: column
  width: 100%
  height: 100%

.container
  display: flex
  flex-direction: column
  width: 100%
  max-width: var(--width-xxl)
  margin: 0 auto
</style>

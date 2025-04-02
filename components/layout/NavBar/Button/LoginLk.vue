<script setup lang="ts">
const isOpenModalRef = ref<boolean>(false)

</script>

<template>
  <LayoutNavBarButton
      iconName="mage:user"
      label="Войти"
      @click="isOpenModalRef = true"
  />
  <UiModal
      :open="isOpenModalRef"
      @close="isOpenModalRef = false"
  >
  <ProfileLoginForm />
  </UiModal>
</template>

<style lang="sass">

</style>

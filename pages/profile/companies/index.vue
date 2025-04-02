<script setup lang="ts">

definePageMeta({
  layout: 'profile'
})
</script>

<template>
  <div class="companies">
    <ProfileAddCompany />
    <span class="companies__title">Ваши компании</span>
    <ProfileCompany />
    <ProfileCompany />
    <ProfileCompany />
  </div>
</template>

<style lang="sass">
.companies
  display: flex
  flex-direction: column
  width: 100%
  gap: 20px
.companies__title
  font-size: var(--fs-20)
</style>

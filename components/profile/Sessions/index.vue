<script setup lang="ts">

</script>

<template>
  <div class="sessions">
    <span class="sessions__name">Текущий сеанс</span>
    <ProfileSessionsItem :current="true" />
    <span class="sessions__name">Другие сеансы</span>
    <ProfileSessionsItem  />
    <UiButton class="sessions__complete">Завершить другие сеансы</UiButton>
  </div>
</template>

<style lang="sass">
.sessions
  display: flex
  flex-direction: column
  gap: 20px
.sessions__complete
  width: max-content
  margin: 0 0 0 auto
</style>

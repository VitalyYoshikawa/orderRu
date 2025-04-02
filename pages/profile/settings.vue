<script setup lang="ts">
definePageMeta({
  layout: 'profile'
})
</script>

<template>
  <div class="profile-settings">
    <ProfileEditForm/>
    <ProfileSessions/>
  </div>
</template>

<style lang="sass">
.profile-settings
  display: flex
  flex-direction: column
  gap: 40px
  width: 100%

</style>

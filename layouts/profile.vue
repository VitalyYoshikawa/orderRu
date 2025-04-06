<script setup lang="ts">

</script>

<template>
  <NuxtLayout name="default">
    <div class="profile">
      <div class="profile__col">
        <div class="profile__sticky">
          <div class="profile__navigate">
            <NuxtLink class="profile__navigate-item" to="/profile/settings">Профиль</NuxtLink>
          </div>
        </div>
      </div>
      <slot/>
    </div>
  </NuxtLayout>
</template>

<style lang="sass">
.profile
  display: flex
  gap: 40px

.profile__sticky
  position: sticky
  top: 20px

.profile__navigate
  display: flex
  width: 265px
  flex-direction: column
  gap: 10px

.profile__navigate-item
  width: max-content

.profile__navigate-item--active
  color: var(--color-black)
  pointer-events: none
</style>

<script setup lang="ts">

</script>

<template>
  <div class="edit-form">
    <div class="edit-form__info">
      <UiAvatar
          class="edit-form__avatar"
          name="Виталий"
          :upload="true"
      />
      <span class="edit-form__name">Виталий</span>
    </div>
    <div class="edit-form__inputs-form">
      <UiInput placeholder="Имя"/>
      <UiInput placeholder="Фамилия"/>
      <UiInput placeholder="Телефон"/>
      <UiInput placeholder="Электронная почта"/>
      <UiInput placeholder="Дата рождения"/>
    </div>
    <div class="edit-form__actions">
      <UiButton>Выйти</UiButton>
      <UiButton>Сменить пароль</UiButton>
      <UiButton class="edit-form__delete--mla">Удалить профиль</UiButton>
    </div>
  </div>
</template>

<style lang="sass">
.edit-form
  display: flex
  flex-direction: column
  gap: 20px
.edit-form__info
  display: flex
  align-items: center
  gap: 20px
.edit-form__name
  font-size: var(--fs-42)
.edit-form__inputs-form
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 16px
.edit-form__actions
  display: flex
  align-items: center
  gap: 10px
.edit-form__delete--mla
  margin: 0 0 0 auto
</style>

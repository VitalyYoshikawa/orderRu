<script setup lang="ts">

</script>

<template>
  <div class="login-form">
    <span class="login-form__label">Введите номер телефона</span>
    <span class="login-form__msg">Мы отправим код. Код придет в СМС</span>
    <UiInput  placeholder="+7 999 999 999"/>
    <UiButton>Войти</UiButton>
  </div>
</template>

<style lang="sass">
.login-form
  display: flex
  flex-direction: column
  gap: 20px
  width: 350px
.login-form__label
  font-size: var(--fs-24)
  text-align: center
.login-form__msg
  font-weight: 400
  text-align: center
</style>

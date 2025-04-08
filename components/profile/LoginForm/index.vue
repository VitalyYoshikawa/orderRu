<script setup lang="ts">
import type {UiPininput} from "#components"

const pinRef = ref([])
const pinInputRef = ref<InstanceType<typeof UiPininput> | null>(null)
const toggleInputRef = ref<boolean>(false)


const sendPhone = async () => {
  const { success }  = await $fetch(`/api/auth/send`, {
    method: "POST",
    body: {
      phone: '+79999999999'
    }
  })
  if (success) {
    toggleInputRef.value = true
  }
}

const verifyPhone = async () => {
  if (pinInputRef?.value?.validate()) {
    const { success }  = await $fetch(`/api/auth/verify`, {
      method: "POST",
      body: {
        phone: '+79999999999',
        code: '1234'
      }
    })
    if (success) {
      window.location.reload()
    }
  }
}

</script>

<template>
  <div class="login-form">
    <span class="login-form__label">Введите номер телефона</span>
    <span class="login-form__msg">Мы отправим код. Код придет в СМС</span>
    <UiInput v-if="!toggleInputRef" placeholder="+7 999 999 99 99"/>
    <UiPininput v-else v-model="pinRef" ref="pinInputRef" />
    <UiButton @click="!toggleInputRef ? sendPhone() : verifyPhone()">Войти</UiButton>
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

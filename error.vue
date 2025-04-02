<script setup lang="ts">
import type { NuxtError } from '#app'

interface CodeMessage {
  [key: number]: string
}

const props = defineProps<{
  error: NuxtError
}>()

const router = useRouter()

const codeMessage: CodeMessage = {
  400: "Неверный запрос",
  401: "Неавторизованно",
  403: "Запрещено",
  404: "Не найдено",
  405: "Метод запрещён",
  408: "Истекло время ожидания",
  409: "Конфликт",
  410: "Ресурс недоступен",
  413: "Слишком большой запрос",
  414: "Слишком длинный URI",
  415: "Неподдерживаемый формат",
  422: "Необрабатываемый запрос",
  500: "Внутренняя ошибка сервера",
  501: "Не реализовано",
  502: "Неверный шлюз",
  503: "Сервис недоступен",
  504: "Шлюз не отвечает",
  505: "Версия HTTP не поддерживается",
}

const errorMessage = computed(() => {
  const statusCode = props.error?.statusCode
  return statusCode ? codeMessage[statusCode] : "Неизвестная ошибка"
})

</script>

<template>
  <div class="error-page">
    <span class="error-page__code">{{ error?.statusCode }}</span>
    <span class="error-page__msg">{{ errorMessage }}</span>
    <UiButton @click="router.push('/')">На главную</UiButton>
  </div>
</template>

<style lang="sass">
.error-page
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  width: 100vw
  height: 100vh
  gap: 10px
.error-page__code
  font-size: var(--fs-42)
.error-page__msg
  font-size: var(--fs-24)
</style>

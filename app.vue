<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="sass">
@use "./assets/sass/color" as *
@use "./assets/sass/variables" as *
@use "./assets/sass/fonts" as *

\:root
  @include color
  @include variables

::-webkit-scrollbar
  width: 7px

::-webkit-scrollbar-track
  background: transparent

::-webkit-scrollbar-thumb
  border-radius: 7px
  background: var(--color-dark-gray)
  cursor: pointer
  &:hover
    background: var(--color-blue)

html, body
  width: 100%
  margin: 0
  padding: 0

body
  background: var(--pure-white)
  font-family: "Roboto", sans-serif
  font-size: var(--fs-16)
  font-weight: 500
  color: var(--color-black)

a
  margin: 0
  padding: 0
  text-decoration: none
  color: var(--color-dark-gray)
  transition: var(--transition)
  &:hover
    color: var(--color-blue)

button
  margin: 0
  padding: 0
  border: none
  outline: none
  cursor: pointer
  background: none
  font-family: "Roboto", sans-serif
  font-size: var(--fs-16)
  font-weight: 500
  color: var(--color-black)

p, span
  margin: 0

h1
  font-size: var(--fs-42)
  margin: 0

h2
  font-size: var(--fs-32)
  margin: 0

input
  font-family: "Roboto", sans-serif
  outline: none

@media (max-width: 1480px)
  .container
    max-width: var(--width-xl)
</style>
<script setup lang="ts">
</script>

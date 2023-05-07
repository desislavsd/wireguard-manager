<script lang="ts" setup>
import '@total-typescript/ts-reset'
const themeDD = templateRef('theme-dd')
async function onThemeChange() {
  await nextTick()
  await nextTick()
  // @ts-ignore
  themeDD.value.updatePosition()
}
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
    <q-ajax-bar ref="bar" position="top" color="accent" size="5px" />
  </NuxtLayout>
  <q-btn
    icon="palette"
    class="-fixed -right-0 -bottom-0 -z-50 -m-2"
    rounded
    padding="3px"
    size="10px"
    unelevated
    color="dark"
  >
    <q-menu
      ref="theme-dd"
      :offset="[-0, 10]"
      anchor="top right"
      self="bottom right"
    >
      <AppThemeEditor @change="onThemeChange"></AppThemeEditor>
    </q-menu>
  </q-btn>
</template>
<style>
:root {
  --c-primary: 193.3, 43.4%, 67.5%;
  --c-secondary: 178.7, 25.1%, 64.9%;
  --c-accent: 213.1, 32%, 52.2%;

  --c-dark-page: 221.3, 16.3%, 19.2%;
  --c-dark: 220, 16.4%, 21.6%;

  --c-positive: 92.4, 27.8%, 64.7%;
  --c-negative: 354.3, 42.3%, 56.5%;
  --c-info: 311.1, 20.2%, 63.1%;
  --c-warning: 40, 70.6%, 73.3%;
}

.q-card--dark,
.q-menu--dark,
.q-table__card--dark/* ,
.q-table--dark */ {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
}
.q-btn-group > :nth-child(n + 2) {
  margin-left: -1px;
}

.q-table__grid-content {
  padding-left: 12px;
  padding-right: 12px;
}
.q-field--with-bottom {
  transition: padding-bottom 0.3s ease;
}
.q-field--with-bottom:has(.q-field__messages:empty) {
  padding-bottom: 0 !important;
}
.q-field.input-small,
.q-field.input-small .q-field__append,
.q-field.input-small input,
.q-field.input-small .q-field__control,
.q-field.input-small .q-field__control-container {
  height: 24px !important;
  font-size: 0.8rem;
}
</style>

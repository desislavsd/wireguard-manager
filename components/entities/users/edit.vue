<script lang="tsx" setup>
import { z } from 'zod'
import { Users, schemeAdd, schemeUpdate } from './index'
const props = defineProps<{
  item: Users
}>()

const model = props.item.$model

const scheme = props.item.exists() ? schemeUpdate : schemeAdd

const form = ref({ ...scheme.$default(props.item) } as z.infer<typeof scheme>)

async function submit() {
  return props.item.exists()
    ? model.update(props.item, form.value)
    : model.add(form.value)
}
</script>
<template>
  <AppDialog @submit="submit">
    <q-input
      v-model.trim="form.email"
      type="email"
      label="E-mail"
      :autofocus="!props.item.exists()"
      :rules="scheme.shape.email.$rules"
    />
    <q-input
      v-model.trim="form.password"
      label="Password"
      :rules="scheme.shape.password.$rules"
    />
  </AppDialog>
</template>
<style></style>

<script lang="tsx" setup>
import { z } from 'zod'
import { Users, schemaAdd, schemaUpdate } from './index'
const props = defineProps<{
  item: Users
}>()

const model = props.item.$model

const schema = props.item.exists() ? schemaUpdate : schemaAdd

const form = ref({ ...schema.$default(props.item) } as z.infer<typeof schema>)

async function submit() {
  return props.item.exists()
    ? model.update(props.item, form.value as z.infer<typeof schemaUpdate>)
    : model.add(form.value as z.infer<typeof schemaAdd>)
}
</script>
<template>
  <AppDialog @submit="submit">
    <q-input
      v-model.trim="form.email"
      type="text"
      label="E-mail"
      :autofocus="!props.item.exists()"
      :rules="schema.shape.email.$rules"
    />
    <q-input
      v-model.trim="form.password"
      label="Password"
      :rules="schema.shape.password.$rules"
    />
  </AppDialog>
</template>
<style></style>

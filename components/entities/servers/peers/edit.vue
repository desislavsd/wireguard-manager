<script lang="tsx" setup>
import { object } from 'zod'
import { z } from 'zod'
import { Peers, schemaAdd, schemaUpdate } from './'
const props = defineProps<{
  item: Peers
}>()

const model = props.item.$model

const schema = props.item.exists() ? schemaUpdate : schemaAdd

const form = ref({
  ...schema.$default(props.item as any),
  name: props.item.name,
} as z.infer<typeof schema> & { name: string })

async function submit() {
  const res = await (props.item.exists()
    ? model.update(props.item, form.value)
    : model.add(form.value))

  res.edit()

  return res
}

const privateKey = ref('')
</script>
<template>
  <AppDialog @submit="submit" card-classes="-w-500px">
    <q-input
      v-model.trim="form.name"
      label="Name"
      :readonly="props.item.exists()"
      :autofocus="!props.item.exists()"
      :rules="(schema.shape as any)?.name?.$rules || undefined"
      class="-flex-1"
    />
    <q-input
      v-model.trim="form.description"
      label="Description"
      :rules="schema.shape.description.$rules"
      autogrow
      type="textarea"
    />
    <q-input
      v-model.trim="form.endpoint"
      label="Endpoint"
      :rules="schema.shape.endpoint.$rules"
      autogrow
    />
    <q-input
      v-model.trim.number="form.persistentKeepalive"
      type="number"
      label="Persistent keepalive"
      :rules="schema.shape.persistentKeepalive.$rules"
    />
    <q-select
      v-model.trim="form.allowedIPs"
      label="Allowed IPs"
      :rules="schema.shape.allowedIPs.$rules"
      new-value-mode="add-unique"
      multiple
      use-input
      use-chips
      hide-dropdown-icon
      hint="Tap Enter to create a new Allowed IP"
    />
    <KeypairWidget
      v-model:public="form.publicKey"
      v-model:private="privateKey"
      v-model:preshared="form.presharedKey"
      :schema="schema.shape"
      class="-mt-3"
      label="Keys"
    ></KeypairWidget>
    <app-btn
      color="secondary"
      class="-w-full -my-3"
      @click="
        item.clone().assign(form).assign({ privateKey }).promptConfigure()
      "
      >Get client config</app-btn
    >
  </AppDialog>
</template>
<style></style>

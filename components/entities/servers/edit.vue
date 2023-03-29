<script lang="tsx" setup>
import { z } from 'zod'
import { Servers, schemaAdd, schemaUpdate } from './index'
import wireguard from '~~/utils/wireguard'
import { Notify } from 'quasar'

const props = defineProps<{
  item: Servers
}>()

const model = props.item.$model

const schema = props.item.exists() ? schemaUpdate : schemaAdd

const peersModel = computed(() => props.item.exists() && props.item.$peersModel)

const keyPairSchema = {
  publicKey: schema.shape.publicKey,
  privateKey: schema.shape.privateKey,
}

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
</script>
<template>
  <AppDialog @submit="submit" card-classes="-w-full">
    <div class="-flex -gap-4 -justify-end">
      <q-input
        v-model.trim="form.name"
        label="Name"
        :readonly="props.item.exists()"
        :autofocus="!props.item.exists()"
        :rules="'name' in schema.shape ? schema.shape.name?.$rules : undefined"
        class="-flex-1"
      />
      <q-checkbox
        v-model="form.enabled"
        label="Enabled"
        left-label
        :rules="schema.shape.enabled.$rules"
      />
    </div>
    <q-input
      v-model.trim="form.description"
      label="Description"
      :rules="schema.shape.description.$rules"
      autogrow
      type="textarea"
    />
    <div class="-flex -gap-4">
      <q-input
        v-model.trim="form.address"
        label="Address"
        :rules="schema.shape.address.$rules"
        class="-flex-1"
      />
      <q-input
        v-model.trim.number="form.listenPort"
        type="number"
        label="Port"
        :rules="schema.shape.listenPort.$rules"
        hint="Defaults to random"
        class="-flex-1"
      />
    </div>
    <q-select
      v-model.trim="form.dns"
      label="DNS"
      :rules="schema.shape.dns.$rules"
      new-value-mode="add-unique"
      multiple
      use-input
      use-chips
      hide-dropdown-icon
      hint="Tap Enter to create a new DNS"
    />
    <div class="-grid -grid-fit-100px -gap-4 -mt-16px">
      <q-input
        v-model.trim.number="form.firewallMark"
        type="number"
        label="Firewall Mark"
        :rules="schema.shape.firewallMark.$rules"
      />
      <q-input
        v-model.trim.number="form.mtu"
        type="number"
        label="MTU"
        :rules="schema.shape.mtu.$rules"
      />
    </div>
    <div class="-flex -gap-4">
      <q-input
        v-model.trim.number="form.natInterface"
        type="number"
        label="NAT Interface"
        :rules="schema.shape.natInterface.$rules"
        class="-flex-1"
      />
      <q-checkbox
        v-model="form.natEnabled"
        label="NAT Enabled"
        :rules="schema.shape.natEnabled.$rules"
      />
    </div>
    <KeypairWidget
      label="Key"
      v-model:public="form.publicKey"
      v-model:private="form.privateKey"
      :schema="keyPairSchema"
      class="-mt-3"
    />
    <AppModelList
      v-if="peersModel"
      :model="peersModel"
      class="-my-4"
      :columns="
        peersModel.columns?.filter((e) =>
          ['name', 'createdAt'].includes(e.name || e)
        )
      "
    />
  </AppDialog>
</template>
<style></style>

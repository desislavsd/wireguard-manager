<script lang="tsx" setup>
import { getFormatter } from '~/utils/formatters'
import { ForeignServers } from './index'
const props = defineProps<{
  item: ForeignServers
}>()

async function submit() {
  return props.item.promptImport()
}

const tableConfig = {
  rows: props.item.peers,
  columns: ['name'].map(toColumn),
}
</script>
<template>
  <AppDialog
    @submit="submit"
    :title="`${item.$model.title(1)} ${item.name}`"
    :action="{ label: 'import', icon: 'post_add' }"
    card-classes="-w-full"
  >
    <div class="-grid -gap-3">
      <div>
        <div class="-text-lg">Info</div>
        <q-input label="Name" readonly v-model="item.name" />
        <q-input label="Type" readonly v-model="item.type" />
        <q-input label="Port" readonly v-model="item.listenPort" />
        <q-input label="Public key" readonly v-model="item.publicKey">
          <template v-slot:append>
            <q-btn
              dense
              size="sm"
              outline
              color="secondary"
              icon="content_copy"
              @click="() => copyToClipboard(item.publicKey)"
            />
          </template>
        </q-input>
      </div>
      <q-card class="-bg-black/7">
        <q-card-section>
          <div class="-text-lg">Interface</div>
          <VWith :ifc="item.foreignInterface" #default="{ ifc }">
            <q-input label="Name" readonly v-model="ifc.name" />
            <q-input label="MTU" readonly v-model="ifc.mtu" />
            <q-select
              label="Addresses"
              readonly
              multiple
              use-chips
              hide-dropdown-icon
              v-model="ifc.addresses"
            ></q-select>
          </VWith>
        </q-card-section>
      </q-card>
      <AppList
        title="Peers"
        :columns="['endpoint', 'publicKey']"
        :rows="item.peers || []"
        class="-bg-black/7 -mb-2"
      />
    </div>
  </AppDialog>
</template>
<style></style>

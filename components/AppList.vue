<script lang="tsx" setup>
import {
  MinimalColumnDefinition,
  BtnModelTableActionsDefinition,
  BtnActionsDefinition,
} from '@/types'

const props = defineProps<{
  columns?: MinimalColumnDefinition[]
  actions?: BtnActionsDefinition
  rowActions?: BtnModelTableActionsDefinition
  title: string
}>()

const columns = computed(() => props.columns?.map(toColumn) || [])
</script>
<template>
  <q-table v-bind="{ columns, title }">
    <template #top>
      <div class="q-table__control">
        <div class="q-table__title">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
      </div>
      <q-space />
      <slot name="actions">
        <slot name="secondary-actions"></slot>
        <AppActionBtns :actions="actions || []"></AppActionBtns>
      </slot>
    </template>
    <template #body-cell="scope">
      <q-td :props="scope"> <VNode :node="scope.value" /> </q-td>
    </template>
  </q-table>
</template>
<style></style>

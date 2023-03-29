<script lang="tsx">
import { QBtnProps } from 'quasar'
import { getFormatter } from '~~/utils/formatters'
import AppActionBtns from '@/components/AppActionBtns.vue'
import {
  Model,
  MinimalColumnDefinition,
  BtnModelTableActionsDefinition,
  BtnActionsDefinition,
} from '@/types'

function toColumn(e: MinimalColumnDefinition) {
  const definition = typeof e == 'string' ? { name: e } : e

  const { name, field = name, label = titleCase(name) } = definition

  return {
    align: 'left',
    format: getFormatter(name),
    ...definition,
    field,
    label,
  }
}

export default defineComponent({
  inheritAttrs: false,
})
</script>

<script lang="tsx" setup>
const props = defineProps<{
  model: typeof Model
  columns?: MinimalColumnDefinition[]
  actions?: BtnModelTableActionsDefinition
}>()

const columns = computed(() =>
  (props.columns || props.model.columns || []).map(toColumn).concat(
    toColumn({
      name: 'actions',
      classes: '-w-0',
      align: 'center',
      format(val, row: Model) {
        const actions = row.tableActions
        return <AppActionBtns scope={row} actions={actions} />
      },
    })
  )
)

const title = computed(() => props.model.title(Infinity))

const config = reactive({
  grid: useLocalStorage(`list-view-${props.model.slug}`, false),
})

const { data, refresh, pending, error } = props.model.useList()

// TODO: should reuse same logic as in ModelTableActions but with
// more general purpose type for actions. ModelTableAction type
// should be derived from that.
const tableActions = computed<BtnActionsDefinition>(() => [
  [
    'grid',
    {
      icon: config.grid ? 'table_rows' : 'grid_view',
      // label: 'refresh',
      color: 'secondary',
      round: true,
      size: 'sm',
      outline: true,
      dense: true,
      onClick: () => (config.grid = !config.grid),
    },
  ],
  [
    'refresh',
    {
      icon: 'refresh',
      // label: 'refresh',
      color: 'secondary',
      round: true,
      size: 'sm',
      outline: true,
      dense: true,
      onClick: () => refresh(),
    },
  ],
  undefined,
  [
    'add',
    {
      icon: 'add',
      color: 'primary',
      size: 'md',
      outline: false,
      onClick: () => props.model.new().edit(),
      round: true,
    },
  ],
])
</script>

<template>
  <!-- <q-card> -->
  <q-table
    v-bind="{ ...$attrs as any, columns, title, ...config }"
    :rows="data?.data || []"
    :loading="pending"
  >
    <template #top>
      <div class="q-table__control">
        <div class="q-table__title">{{ title }}</div>
      </div>
      <q-space />
      <AppActionBtns :actions="tableActions"></AppActionBtns>
      <!-- <div class="-flex -gap-4 items-center">
          <q-btn v-for="btn in tableActions" v-bind="btn"></q-btn>
        </div> -->
    </template>
    <template #body-cell="scope">
      <q-td :props="scope"> <VNode :node="scope.value" /> </q-td>
    </template>
  </q-table>
  <!-- </q-card> -->
</template>
<style></style>

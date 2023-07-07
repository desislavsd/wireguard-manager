<script lang="tsx">
import { toColumn } from '@/utils'
import AppActionBtns from '@/components/AppActionBtns.vue'
import {
  Model,
  MinimalColumnDefinition,
  BtnModelTableActionsDefinition,
  BtnActionsDefinition,
} from '@/types'

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

const supportsSearch = computed(() =>
  props.model.docs.list?.definitions.some(
    (d: any) =>
      d.kind == 'OperationDefinition' &&
      d.variableDefinitions.some((e: any) => e.variable.name.value == 'query')
  )
)

const columns = computed(() =>
  (props.columns || props.model.columns || []).map(toColumn).concat(
    toColumn({
      name: 'actions',
      classes: '-w-0',
      align: 'center',
      sortable: false,
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

const variables = reactive({ query: '' })

const {
  result: data,
  refetch: refresh,
  loading: pending,
  error,
} = props.model.useList(variables)

// TODO: should reuse same logic as in ModelTableActions but with
// more general purpose type for actions. ModelTableAction type
// should be derived from that.
const tableActions = computed<BtnActionsDefinition>(() => [
  ...(props.actions || []),
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
  <AppList
    row-key="$id"
    v-bind="{ ...$attrs as any, columns, title, ...config }"
    :rows="data?.data || []"
    :loading="pending"
    :actions="tableActions"
  >
    <template #secondary-actions>
      <q-input
        v-if="supportsSearch"
        v-model="variables.query"
        debounce="250"
        outlined
        dense
        placeholder="Search.."
        class="input-small -mr-4 -w-[120px]"
      >
        <template v-slot:append> <q-icon name="search" /> </template
      ></q-input>
    </template>
  </AppList>
</template>
<style></style>

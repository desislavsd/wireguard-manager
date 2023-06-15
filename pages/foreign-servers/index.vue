<script lang="tsx" setup>
import model from '@/components/entities/externals'
const selected = ref([])
const actions = computed(() => {
  const len = selected.value.length

  if (!len) return []

  return [
    [
      'batchImport',
      {
        label: `import ${len}`,
        icon: 'post_add',
        color: 'positive',
        outline: false,
        onClick: () => model.importBatch(selected.value),
      },
      [],
    ],
    undefined,
  ]
})
</script>
<template>
  <div>
    <AppModelList
      :model="model"
      :actions="actions"
      selection="multiple"
      v-model:selected="selected"
      row-key="name"
    />
  </div>
</template>
<style></style>

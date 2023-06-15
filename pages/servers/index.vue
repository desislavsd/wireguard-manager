<script lang="tsx" setup>
import model from '@/components/entities/servers'
import externalsModel from '@/components/entities/externals'

const externals = externalsModel.useList()

const actions = computed(() => {
  if (!externals.result.value?.data?.length) return []
  return [
    [
      'externals',
      {
        icon: 'post_add',
        label: `import ${externals.result.value?.data?.length || '?'}`,
        loading: externals.loading.value,
        color: 'positive',
        outline: false,
        to: '/foreign-servers',
      },
    ],
    undefined,
  ]
})
</script>
<template>
  <div>
    <AppModelList :model="model" :actions="actions" />
  </div>
</template>
<style></style>

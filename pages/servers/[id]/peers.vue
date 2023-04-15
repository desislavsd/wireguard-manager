<script lang="tsx">
import { Servers } from '@/components/entities/servers'
export default defineComponent({
  setup() {
    const route = useRoute()
    const serverId = computed(() => [route.params.id].flat()[0])

    const { result: server, error } = Servers.useFind(unref(serverId))

    const peersModel = computed(() => server.value?.$peersModel)

    return {
      server,
      peersModel,
      error,
      route,
    }
  },
})
</script>
<template>
  <div>
    <AppErrorBanner :value="error"></AppErrorBanner>
    <AppModelList v-if="peersModel" :model="peersModel" />
  </div>
</template>
<style></style>

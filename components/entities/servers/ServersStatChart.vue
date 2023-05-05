<script lang="tsx" setup>
const numberFormatter = Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 3,
})
import { Chart, ChartProps } from 'vue-chartjs'
import { default as model, useServerStatsList } from './index'

const props = defineProps<{
  serverId?: model['$id']
}>()

const { data: items } = useServerStatsList()

const data = computed(() =>
  props.serverId
    ? items.value.filter((e) => e.item.data.node.id === props.serverId)
    : items.value
)

const options = computed(() => {
  const get = (
    prop: keyof Exclude<
      (typeof data)['value'][number]['item']['data']['node']['interfaceStats'],
      null | undefined
    >,
    item: (typeof data)['value'][number]
  ) => item.item.data.node.interfaceStats?.[prop]
  const gets = (prop: Parameters<typeof get>[0]) =>
    data.value.map(get.bind(null, prop))

  const options: ChartProps = {
    options: {
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: 'Rx',
          },
          ticks: {
            callback: function (label, index, labels) {
              return numberFormatter.format(+label)
            },
          },
          // scaleLabel: {
          //   display: true,
          //   labelString: '1k = 1000',
          // },
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
          title: {
            display: true,
            text: 'Tx',
          },
          ticks: {
            callback: function (label, index, labels) {
              return numberFormatter.format(+label)
            },
          },
        },
      },
    },
    type: 'line',
    data: {
      labels: data.value.map((item) => item.time.toLocaleTimeString()),
      datasets: [
        {
          label: 'txBytes',
          data: gets('txBytes') as number[],
          backgroundColor: 'hsla(150, 50%, 50%, 0.2)',
          borderColor: 'hsla(130, 50%, 50%, 1)',
        },
        {
          label: 'txPackets',
          data: gets('txPackets') as number[],
          backgroundColor: 'hsla(130, 50%, 50%, 0.2)',
          borderColor: 'hsla(130, 50%, 40%, 1)',
          yAxisID: 'y1',
        },
        {
          label: 'rxBytes',
          data: gets('rxBytes') as number[],
          backgroundColor: 'hsla(0, 50%, 50%, 0.2)',
          borderColor: 'hsla(0, 50%, 50%, 1)',
        },
        {
          label: 'rxPackets',
          data: gets('rxPackets') as number[],
          backgroundColor: 'hsla(30, 50%, 50%, 0.2)',
          borderColor: 'hsla(30, 50%, 50%, 1)',
          yAxisID: 'y1',
        },
      ].map((e) => ({
        ...e,
        borderWidth: 1,
        tension: 0.1,
        ...(data.value.length > 50 ? { pointRadius: 0 } : {}),
      })),
    },
  }
  return options
})
</script>
<template>
  <Chart v-bind="options" />
</template>
<style></style>

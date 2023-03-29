<script lang="tsx">
// @ts-ignore
import { toString } from 'qrcode'
export default defineComponent({
  props: {
    value: String,
  },
  setup(props, {}) {
    const image = ref('')

    // used to cancel previous requests for svg generation
    let requestId: number

    watchEffect(() => {
      image.value = ''
      if (!props.value) return
      const id = (requestId = Math.random() + 1)
      toString(props.value, { type: 'svg' }, (err: any, svg: string) => {
        if (id !== requestId) return
        if (err) return console.log(err)
        image.value = svg
        // .replace(/#000000/g, 'currentColor')
        // .replace(/#ffffff/g, 'transparent')
      })
    })

    return () => <div v-html={image.value}></div>
  },
})
</script>
<template>
  <div></div>
</template>
<style></style>

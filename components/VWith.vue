<script lang="tsx">
export default defineComponent({
  inheritAttrs: false,
  setup(props, { slots, attrs }) {
    return () => slots.default?.(attrs)
  },
})
</script>
<style></style>

<script lang="ts">
export default defineComponent({
  props: ['node'],
  setup(props) {
    return () => props.node
  },
})
</script>

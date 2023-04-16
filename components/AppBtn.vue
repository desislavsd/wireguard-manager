<script lang="tsx">
import { QBtn, QBtnProps } from 'quasar'

export default defineComponent({
  props: {
    ...QBtn.props,
    onClick: Function,
  },
  setup(props: QBtnProps, { slots }) {
    const busy = useBusy()

    const newProps = computed(() => {
      const p = {
        ...props,
        loading: props.loading || busy.value,
      }

      if (props.onClick)
        p.onClick = (...args) =>
          Promise.resolve((busy.value = props.onClick?.(...args))).catch(
            Boolean
          )

      return p
    })

    return () => {
      return <QBtn {...newProps.value}>{slots}</QBtn>
    }
  },
})
</script>
<style></style>

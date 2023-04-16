<script lang="tsx">
import {
  defineComponent,
  ComponentInternalInstance,
  ExtractPropTypes,
} from 'vue'
import {
  QBtn,
  QSpace,
  QDialog,
  QCard,
  QCardSection,
  QCardActions,
  useDialogPluginComponent,
  QBtnProps,
  useQuasar,
} from 'quasar'
import AppForm from '~~/components/AppForm.vue'
import AppErrorBanner from '~~/components/AppErrorBanner.vue'
import { Pretty, Model } from '~~/types'
import AppBtn from '@/components/AppBtn.vue'

type ActionProp =
  | QBtnProps['label']
  | Pretty<
      (Required<Pick<QBtnProps, 'label'>> | Required<Pick<QBtnProps, 'icon'>>) &
        Partial<QBtnProps>
    >

const propsDefinition = {
  title: {},
  content: {
    default: '',
  },
  onSubmit: {} as PropType<(ev: SubmitEvent | Event) => void>,
  actions: {} as PropType<ActionProp[]>,
  action: {} as PropType<QBtnProps>,
  cardClasses: {},
}
export default defineComponent({
  props: propsDefinition,
  emits: [...useDialogPluginComponent.emits],
  inheritAttrs: false,
  setup(props, { attrs, slots }) {
    const $q = useQuasar()
    const dialog = useDialogPluginComponent()

    const isForm = computed(() => !!props.onSubmit)

    const { item, model, title } = useModelDialog(props)

    const actions = computed<QBtnProps[]>(
      () =>
        props.actions?.map((e) =>
          typeof e != 'object' ? { label: e } : e
        ) || [
          {
            label: item.value
              ? item.value.exists()
                ? 'Update'
                : 'Create'
              : 'OK',
            color: 'primary',
            type: isForm.value ? 'submit' : 'button',
            onClick: isForm.value ? undefined : dialog.onDialogOK,
            ...props.action,
          },
        ]
    )

    const delItem = computed(() => {
      const el = unref(item)

      if (!el?.exists()) return

      return async () => {
        dialog.onDialogOK(await item.value?.promptDel())
      }
    })

    async function submit(ev: SubmitEvent | Event) {
      const res = await props.onSubmit?.(ev)

      dialog.onDialogOK(res)
    }

    return () => {
      const content = (
        <>
          <QCardSection
            class={[
              `-sticky -top-0 -z-10 -relative`,
              $q.dark.isActive ? '-bg-dark' : '-bg-white',
            ]}
          >
            <div class="text-h6">{title.value}</div>
          </QCardSection>
          {isForm.value && (
            <QCardSection class="-empty:hidden">
              <AppErrorBanner />
            </QCardSection>
          )}
          <QCardSection>
            {slots.default?.({ dialog }) || props.content || ''}
          </QCardSection>
          <QCardActions
            class={[
              `-p-16px --mt-16px -sticky -bottom-0`,
              $q.dark.isActive ? '-bg-dark' : '-bg-white',
            ]}
          >
            {delItem.value && (
              <AppBtn
                color="negative"
                size="xs"
                onClick={delItem.value}
                icon="delete"
                round={true}
              />
            )}

            <QSpace />
            <AppBtn flat outline onClick={dialog.onDialogCancel}>
              cancel
            </AppBtn>
            {slots.secondaryActions?.({ dialog })}
            {slots.action?.({ dialog }) ||
              actions.value.map((e) => <AppBtn {...e} />)}
          </QCardActions>
        </>
      )
      const passSlots = {
        error() {
          return ''
        },
        default() {
          return content
        },
      }

      const passAttrs = {
        ...attrs,
        onSubmit: isForm.value ? submit : undefined,
      }

      return (
        <QDialog
          ref={((el: QDialog) => (dialog.dialogRef.value = el)) as any}
          onHide={dialog.onDialogHide}
        >
          <QCard class={['q-dialog-plugin', props.cardClasses]}>
            {isForm.value ? (
              <AppForm {...passAttrs}>{passSlots}</AppForm>
            ) : (
              <div {...passAttrs}>{content}</div>
            )}
          </QCard>
        </QDialog>
      )
    }
  },
})

/**
 * Detects the model and item from the parent component
 * and generates the title for the dialog.
 */
function useModelDialog(props: ExtractPropTypes<typeof propsDefinition>) {
  const item = computed<Model | undefined>(() => {
    let vm: ComponentInternalInstance | null | undefined = getCurrentInstance()
    while ((vm = vm?.parent))
      if ('item' in vm?.props) return vm.props.item as Model
  })

  const model = computed(() => unref(item)?.$model)

  const title = computed(() => {
    if (props.title) return props.title
    if (unref(item) && unref(model))
      return `${unref(item)?.exists() ? 'Edit' : 'Create'} ${unref(
        model
      )?.title(1)}`
    return 'Dialog'
  })

  return { item, model, title }
}
</script>
<style scoped>
.q-form > .q-banner:first-child {
  margin: 0 16px;
}
</style>

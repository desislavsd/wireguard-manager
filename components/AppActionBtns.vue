<script lang="tsx">
import { ClosePopup } from 'quasar'
import { AppBtnAction, AppBtnSubAction, BtnActionsDefinition } from '@/types'
import { objectPick } from '@vueuse/core'
import AppBtn from '@/components/AppBtn.vue'

export const SubActionMenu = defineComponent({
  name: 'SubActionMenu',
  directives: { ClosePopup },
  props: {
    actions: {} as PropType<AppBtnSubAction[] | undefined>,
    scope: {},
    level: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const attrs = computed(() => {
      const { level } = props
      if (!level) return { offset: [0, 10] }

      return {
        anchor: 'top start',
        self: 'top end',
      }
    })
    return () => {
      if (!props.actions?.length) return null

      return (
        <q-menu {...attrs.value}>
          <q-list dense style="min-width: 100px">
            {props.actions?.map(([label, opts, subActions]) => (
              <q-item
                {...{
                  ...opts,
                  clickable: !!opts.onClick || !!subActions?.length,
                  onClick: opts.onClick?.bind(null, props.scope),
                }}
              >
                <q-item-section> {label}</q-item-section>
                {subActions?.length && (
                  <q-item-section side>
                    <q-icon name="keyboard_arrow_right" />
                  </q-item-section>
                )}
                {
                  <SubActionMenu
                    actions={subActions}
                    scope={props.scope}
                    level={props.level + 1}
                  />
                }
              </q-item>
            ))}
          </q-list>
        </q-menu>
      )
    }
  },
})

function normalizeRootSubactions(actions: BtnActionsDefinition) {
  return actions.map((e) =>
    e && Array.isArray(e[0]) && Array.isArray(e[0][0])
      ? [
          'more',
          {
            icon: 'more_vert',
            color: 'secondary',
            size: 'xs',
            outline: true,
            dense: true,
          },
          e[0],
        ]
      : e
  )
}

function normalizeClickActionsWithSubActions(actions: BtnActionsDefinition) {
  return actions
    .map((e) => {
      if (!e) return [e]
      const [name, opts, subActions] = e
      if (!opts?.onClick) return [e]
      if (!subActions?.length) return [e]
      return [
        [name, opts],
        [
          'more',
          {
            // icon: 'expand_more',
            ...objectPick(opts, ['color', 'size', 'outline']),
            dense: true,
          },
          subActions,
        ],
      ]
    })
    .flat() as AppBtnAction[]
}

export default defineComponent({
  name: 'AppActionBtns',
  props: {
    scope: {},
    actions: {
      type: Array as PropType<BtnActionsDefinition>,
      required: true,
    },
  },
  setup(props) {
    const actions = computed(() => {
      return normalizeClickActionsWithSubActions(
        normalizeRootSubactions(props.actions) as AppBtnAction[]
      ) as AppBtnAction[]
    })

    const groups = computed(() =>
      actions.value.reduce(
        (groups, action) => {
          if (!action) groups.push([])
          else groups.at(-1)?.push(action)
          return groups
        },
        [[]] as typeof actions.value[]
      )
    )

    return () => (
      <div class="-flex -gap-4 -items-center">
        {groups.value.map((actions) => {
          const btns = actions.map(([name, opts, subActions]) => (
            <AppBtn
              {...{
                size: 'sm',
                outline: true,
                ...opts,
                onClick: opts.onClick?.bind(null, props.scope),
              }}
              {...(!!subActions?.length && { iconRight: 'expand_more' })}
            >
              {opts.label || ''}
              <SubActionMenu actions={subActions} scope={props.scope} />
            </AppBtn>
          ))
          // single buttons are not wrapped in a group
          if (btns.length === 1) return btns[0]

          return <q-btn-group>{btns}</q-btn-group>
        })}
      </div>
    )
  },
})
</script>
<style></style>

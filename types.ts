import { QTableColumn, QBtnProps, QItemProps } from 'quasar'
import { Model } from '~~/utils/model'
export { Model } from '~~/utils/model'
export type PartialPick<
  T extends object,
  K extends string & keyof T
> = Partial<T> & Pick<T, K>

export type PartialDeep<T extends object> = Pretty<{
  [Key in keyof T]?: T[Key] extends object ? PartialDeep<T[Key]> : T[Key]
}>

export type Pretty<T> = {
  [K in keyof T]: T[K]
} & {}

export type Loose<T> = T extends object
  ? Pretty<T & { [key: string]: unknown }>
  : T

export type LooseDeep<T extends object> = Loose<{
  [key in keyof T]: Loose<T[key]>
}>

export type Fn<R = unknown> = (...args: any[]) => R

type IdAccessors<Item> = {
  getItemId(e: Item): string | number | undefined
  setItemId(e: Item, id: unknown): any
}
type NameAccessors<Item> = {
  getItemName(e: Item): string | number | undefined
  setItemName(e: Item, id: unknown): any
}

export type ModelConfig<Item> = Pretty<
  {
    slug: string
    columns?: MinimalColumnDefinition[]
    list?: Fn<Promise<Item[]>>
    find?: Fn<Promise<Item | {} | null | undefined>>
    update?: Fn<Promise<Item>>
    add?: Fn<Promise<Item>>
    delete?: Fn<void>
  } & ('id' extends keyof Item
    ? Partial<IdAccessors<Partial<Item>>>
    : IdAccessors<Partial<Item>>) &
    ('name' extends keyof Item
      ? Partial<NameAccessors<Partial<Item>>>
      : NameAccessors<Partial<Item>>)
>

export type MinimalColumnDefinition<T = unknown> =
  | string
  | Pretty<
      Partial<Omit<QTableColumn, 'format'>> &
        Pick<QTableColumn, 'name'> & {
          format?(value: unknown, item: T): string | JSX.Element
        }
    >

export type BtnActionHandler<T = unknown> = (scope?: any) => void

export type AppBtnAction<
  PropsModifier extends object = Pretty<
    QBtnProps & {
      label?: QBtnProps['label'] | JSX.Element
      onClick?: BtnActionHandler
    }
  >,
  Children extends object = AppBtnSubAction
> = [name: string, opts: PropsModifier, children?: Children[]]

export type AppBtnSubAction<
  Opts extends object = Pretty<
    QBtnProps & {
      label?: QBtnProps['label'] | JSX.Element
      onClick?: BtnActionHandler
    }
  >
> = [name: string, opts: Opts, children?: AppBtnSubAction<Opts>[]]

export type BtnActionsDefinition<
  Action = AppBtnAction,
  SubAction = AppBtnSubAction
> = (AppBtnAction | [[AppBtnSubAction]] | undefined)[]

export type ModelTableAction = AppBtnAction<
  Omit<QBtnProps, 'onClick'> & {
    label?: QBtnProps['label'] | JSX.Element
    onClick?: ModelTableActionHandler
  },
  ModelTableSubAction
>

export type ModelTableActionHandler = (item: Model) => void

export type ModelTableSubAction = AppBtnSubAction<
  Omit<QItemProps, 'onClick'> & {
    onClick?: ModelTableActionHandler
  }
>

export type BtnModelTableActionsDefinition = BtnActionsDefinition<
  ModelTableAction,
  ModelTableSubAction
>

export type UnPromise<T> = T extends Promise<infer U> ? U : T
export type UnArray<T> = T extends Array<infer U> ? U : T
export type MaybeArray<T> = T[] | T
export type MaybePromise<T> = Promise<T> | T

export type Filter<T, Filter> = T extends Filter ? never : T

import { QDialogOptions } from 'quasar'
import {
  Pretty,
  MinimalColumnDefinition,
  BtnModelTableActionsDefinition,
} from '~~/types'
import * as gql from '@/gql'
import openDialog from './openDialog'
import { UseQueryReturn } from '@vue/apollo-composable'
import { client } from '@/plugins/gql'
import { ZodTypeAny, z } from 'zod/lib'
import { callMutation } from '@/utils'
import { Fn } from '~~/types'

type ModelGenericFromChild<child> = child extends Model<infer T> ? T : unknown

type Constructor<T> = new (...args: any[]) => T

/**
 * Class with static methods for __CRUD__ operations.
 * Instances are the items returned by those.
 * There are methods and properties to help with relations & presentation.
 * Currently the type parameter `T` is not in use.
 */
export class Model<T = unknown> {
  get $id() {
    return 'id' in this ? this.id : undefined
  }

  set $id(id) {
    this.assign({ id })
  }

  get $model() {
    return this.constructor as typeof Model
  }

  get $name() {
    return 'name' in this ? this.name : undefined
  }

  assign<data>(data: data): data extends object ? Pretty<this & data> : this {
    // @ts-ignore
    return typeof data == 'object' ? Object.assign(this, data) : this
  }

  clone(): this {
    return this.$model.new(this) as this
  }

  exists(): this is Required<this> {
    return !!this.$id
  }

  promptDel() {
    const item = this
    return openDialog({
      componentProps: {
        action: {
          color: 'negative',
          label: 'Delete',
        },
        content: (
          <>
            Are you sure you want to{' '}
            <span class="-text-negative -uppercase -font-bold">DELETE</span>{' '}
            <span class={!!this.$name && '-text-primary -font-bold'}>
              {this.$name || 'this item'}
            </span>{' '}
            from{' '}
            <span class="-text-primary -font-bold">{this.$model.title()}</span>?
          </>
        ),
        async onSubmit() {
          return item.$model.del(item.$id)
        },
      },
    })
  }

  edit(opts?: QDialogOptions) {
    return openDialog({
      ...opts,
      componentProps: {
        ...opts?.componentProps,
        item: this,
      },
    })
  }

  static schemaAdd?: ZodTypeAny
  static schemaUpdate?: ZodTypeAny

  static slug: string

  static get slugOne() {
    return this.slug.slice(0, -1)
  }

  static get operations() {
    const many = pascalCase(this.slug)
    const one = many.slice(0, -1)
    return [
      (gql.namedOperations.Query as any)[`${many}`],
      (gql.namedOperations.Query as any)[`${one}`],
    ]
  }

  static get docs() {
    const many = pascalCase(this.slug)
    const one = many.slice(0, -1)

    return {
      list: (gql as any)[`${many}Document`],
      find: (gql as any)[`${one}Document`],
      add: (gql as any)[`Create${one}Document`],
      update: (gql as any)[`Update${one}Document`],
      delete: (gql as any)[`Delete${one}Document`],
    }
  }

  static title(count: number = Infinity, long = false): string {
    const title = getModelTitle(this.slug, count)
    return [
      title,
      this.ref?.$name,
      long && this.ref?.$model.title(undefined, long),
    ]
      .filter(Boolean)
      .reverse()
      .join(' ')
  }

  static columns?: MinimalColumnDefinition[]

  get tableActions(): BtnModelTableActionsDefinition {
    const item = this
    return [
      [
        'edit',
        {
          icon: 'edit',
          color: 'primary',
          size: 'xs',
          outline: true,
          onClick: () => item.edit(),
        },
      ],
      [
        'delete',
        {
          icon: 'delete',
          color: 'negative',
          size: 'xs',
          outline: true,
          onClick: () => item.promptDel(),
        },
      ],
    ] as BtnModelTableActionsDefinition
  }

  static new<T extends typeof Model, D extends Model>(
    this: T,
    data?: Partial<D>
  ) {
    return new this().assign(data)
  }

  static ref: Model<unknown> | undefined

  static get refs(): Model<unknown>[] {
    return [this.ref, ...(this.ref?.$model.refs ?? [])].filter(Boolean)
  }

  static of<Ref extends Model<unknown>>(ref: Ref) {
    return class extends this<ModelGenericFromChild<typeof this>> {
      static ref = ref
    }
  }

  static useList<T extends typeof Model<unknown>>(
    this: T,
    variables?: any,
    options: { parse: Fn<InstanceType<T>[]> } = {
      parse: (res) => res?.data || [],
    }
  ) {
    const res = useQuery(this.docs.list, variables)

    const result = computed(() => {
      let data = options.parse(res.result.value)

      return {
        ...res.result.value,
        data: data?.map((e: any) => this.new(e)),
      }
    })

    return {
      ...res,
      result,
    } as unknown as UseQueryReturn<{ data: InstanceType<T>[] }, any>
  }

  static useFind<T extends typeof Model<unknown>>(
    this: T,
    id: string | number
  ) {
    const res = useQuery(this.docs.find, {
      id,
    })

    return {
      ...res,
      result: computed(
        () => res.result.value?.data && this.new(res.result.value.data)
      ),
    } as UseQueryReturn<InstanceType<T>, any>
  }

  static async update<
    T extends typeof Model<unknown>,
    Item extends InstanceType<T>,
    TData extends T['schemaUpdate'] extends ZodTypeAny
      ? z.infer<T['schemaUpdate']>
      : object
  >(this: T, item: Item, input: TData) {
    return callMutation(this.docs.update, {
      input: {
        ...(this.schemaUpdate?.parse(input) ?? input),
        id: item.$id,
      },
    }).then((res) => {
      this.flush()
      return this.new(res?.data?.mutation.data)
    })
  }

  static async add<
    T extends typeof Model<unknown>,
    TData extends T['schemaAdd'] extends ZodTypeAny
      ? z.infer<T['schemaAdd']>
      : object
  >(this: T, input: TData) {
    const ids = Object.fromEntries(
      this.refs.map((e) => [`${e.$model.slugOne}Id`, e.$id])
    )
    input = { ...(this.schemaAdd?.parse(input) ?? input), ...ids }
    return callMutation(this.docs.add, { input }).then((res) => {
      this.flush()
      return this.new(res?.data?.mutation.data)
    })
  }

  static async del<
    T extends typeof Model<unknown>,
    Item extends InstanceType<T>
  >(this: T, id: Item['$id']) {
    return callMutation(this.docs.delete, {
      input: {
        id,
      },
    }).then((res) => {
      this.flush()
      return res
    })
  }

  static flush() {
    return client.refetchQueries({ include: 'all' })
    // return client.refetchQueries({ include: this.operations })
  }

  static async mutate(...args: Parameters<typeof callMutation>) {
    const [doc, input] = args
    const res = await callMutation(doc, { input })
    this.flush()
    return res
  }
}

export default Model

export function getModelTitle(
  model: string | { slug: string },
  count = Infinity
) {
  let title = titleCase(typeof model == 'string' ? model : model.slug)
  return count == Infinity
    ? title
    : title.replace(/ies$/, 'y').replace(/s$/, '')
}

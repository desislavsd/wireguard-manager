import { QDialogOptions } from 'quasar'
import {
  Pretty,
  MinimalColumnDefinition,
  UnPromise,
  UnArray,
  MaybePromise,
  BtnModelTableActionsDefinition,
} from '~~/types'
import openDialog from './openDialog'

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

  static slug: string

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

  // CRUD functions
  static listFn<T extends typeof Model>(
    this: T,
    ...args: any[]
  ): MaybePromise<{ data: object[]; [key: string]: any }> {
    return { data: [] }
  }

  static async list<
    T extends typeof Model<unknown>,
    Fn extends T['listFn'] = T['listFn'],
    Params extends unknown[] = Parameters<Fn>
  >(this: T, ...args: Params) {
    const res = await this.listFn.call(this, ...args)
    return {
      ...res,
      data: res.data.map((e) => this.new(e)) as FnReturnToInstance<T, 'listFn'>,
    }
  }

  /**
   * useAsyncData wrapper for listFn
   * data is an array of instances of the model
   */
  static useList<
    T extends typeof Model<unknown>,
    Fn extends T['listFn'] = T['listFn'],
    Params extends unknown[] = Parameters<Fn>
  >(this: T, ...args: Params) {
    const res = useAsyncData(this.slug, async () =>
      this.listFn.call(this, ...args)
    )
    return {
      ...res,
      data: computed(() => ({
        ...res.data.value,
        data: (res.data.value?.data?.map((e: any) => this.new(e)) ||
          []) as FnReturnToInstance<T, 'listFn'>,
      })),
    }
  }

  static findFn(...args: any[]): MaybePromise<object | undefined | null> {
    return null
  }

  static async find<
    T extends typeof Model<unknown>,
    Fn extends T['findFn'] = T['findFn'],
    Params extends unknown[] = Parameters<Fn>
  >(this: T, ...args: Params) {
    const res = await this.findFn.call(this, ...args)
    if (!isset(res)) return undefined
    return this.new(res) as Required<FnReturnToInstance<T, 'findFn'>>
  }

  static useFind<
    T extends typeof Model<unknown>,
    Fn extends T['findFn'] = T['findFn'],
    Params extends unknown[] = Parameters<Fn>
  >(this: T, ...args: Params) {
    const res = useAsyncData(`${this.slug}-detail`, async () =>
      this.findFn.call(this, ...args)
    )
    return {
      ...res,
      data: computed(
        () =>
          res.data.value &&
          (this.new(res.data.value as any) as Required<
            FnReturnToInstance<T, 'findFn'>
          >)
      ),
    }
  }

  static updateFn(...args: any[]): MaybePromise<object> {
    return {}
  }

  static async update<
    T extends typeof Model<unknown>,
    Fn extends T['updateFn'] = T['updateFn'],
    Params extends unknown[] = Parameters<Fn>
  >(this: T, ...args: Params) {
    const res = await this.updateFn(...args)
    const slugs = this.refs.map((e) => e.$model.slug).concat(this.slug)
    refreshNuxtData(slugs)
    return this.new(res) as FnReturnToInstance<T, 'updateFn'>
  }

  static addFn(...args: any[]): MaybePromise<object> {
    return {}
  }

  static async add<
    T extends typeof Model<unknown>,
    Fn extends T['addFn'] = T['addFn'],
    Params extends unknown[] = Parameters<Fn>
  >(this: T, ...args: Params) {
    const res = await this.addFn(...args)
    const slugs = this.refs.map((e) => e.$model.slug).concat(this.slug)
    refreshNuxtData(slugs)
    return this.new(res) as Required<FnReturnToInstance<T, 'addFn'>>
  }

  static delFn(...args: any[]): MaybePromise<object> {
    return {}
  }

  static async del<
    T extends typeof Model<unknown>,
    Fn extends T['delFn'] = T['delFn'],
    Params extends unknown[] = Parameters<Fn>
  >(this: T, ...args: Params) {
    const res = await this.delFn(...args)
    const slugs = this.refs.map((e) => e.$model.slug).concat(this.slug)
    refreshNuxtData(slugs)
    if (!isset(res)) return undefined
    return this.new(res) as Required<FnReturnToInstance<T, 'delFn'>>
  }
}

export default Model

type crudFnKeys = 'listFn' | 'findFn' | 'updateFn' | 'addFn' | 'delFn'

type FnReturnToInstance<
  M extends typeof Model,
  FnName extends crudFnKeys
> = ExtractFnItem<M[FnName], InstanceType<M>>

type ExtractFnItem<
  Fn extends (...args: any[]) => any,
  M = unknown,
  R = UnPromise<ReturnType<Fn>>,
  I = Pretty<M & UnArray<R>>
> = R extends unknown[] ? I[] : I

export function getModelTitle(
  model: string | { slug: string },
  count = Infinity
) {
  let title = titleCase(typeof model == 'string' ? model : model.slug)
  return count == Infinity
    ? title
    : title.replace(/ies$/, 'y').replace(/s$/, '')
}

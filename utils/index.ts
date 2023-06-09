import { ServerFragment, PeerFragment } from '@/gql'
import { Notify } from 'quasar'
import { DocumentNode } from '@apollo/client'
import { MutateResult } from '@vue/apollo-composable'
import { MinimalColumnDefinition } from '@/types'
import { getFormatter } from '@/utils/formatters'

export function cammelCase(s: string) {
  return s
    .replace(/^(?:[^\wа-яА-Я]|_)+/, '')
    .split(/(?:[^\wа-яА-Я]|_)+/g)
    .map((e, i) => (i ? (e[0] || '').toUpperCase() + e.slice(1) : e))
    .join('')
}

export function pascalCase(s: string) {
  return s
    .split(/[^\wа-яА-Я]|_/g)
    .map((e) => e[0].toUpperCase() + e.slice(1))
    .join('')
}

export function cebabCase(s: string) {
  return s
    .split(/\W+|(?=[A-Z])/g)
    .filter(Boolean)
    .join('-')
    .toLowerCase()
}

export function titleCase(s: string) {
  return s
    .split(/[^\wа-яА-Я]|_|(?=[A-ZА-Я])/)
    .filter(Boolean)
    .map((e, i) => (i ? e.toLowerCase() : pascalCase(e)))
    .join(' ')
}

export function sleep(t = 0) {
  return new Promise((rs) => setTimeout(rs, t))
}

/**
 * Check if given value is primitive
 */
export function isPrimitive(value: unknown) {
  return value !== Object(value)
}

const Unsets = [null, '', undefined, NaN] as const

export function isset<T>(
  val: T
): val is T extends object
  ? keyof T extends never
    ? never
    : T extends { length: 0 }
    ? never
    : Exclude<NonNullable<T>, ''>
  : Exclude<NonNullable<T>, ''> {
  return val && typeof val === 'object'
    ? !!Object.keys(val).length
    : !Unsets.includes(val as any)
}

export async function copyToClipboard(text: string, note = 'Copied') {
  const res = await globalThis.navigator?.clipboard.writeText(text)
  if (note)
    Notify.create({
      message: note,
      color: 'positive',
      icon: 'assignment_turned_in',
    })
  return res
}

export function parseGqlErrors(
  ex: any,
  { skipHandled = false }: { skipHandled?: boolean } = {}
): string {
  const errs = [ex, ex?.gqlErrors, ex?.graphQLErrors, ex?.networkError]

  const message = [
    ...new Set(
      errs
        .flat()
        .map((e) =>
          typeof e == 'string' ? e : (!skipHandled || !e?.HANDLED) && e?.message
        )
        .filter(Boolean)
    ),
  ].join('\n')

  return message.trim()
}

export function objectPick<T extends object, K extends keyof T>(
  obj: T,
  fn: (key: K, value: T[K]) => boolean
) {
  return Object.fromEntries(
    (Object.entries(obj) as [K, T[K]][]).filter(([key, value]) =>
      fn(key, value)
    )
  )
}

export function generateWireguardClientConfig(
  {
    server,
    peer,
    address,
    allowedIPs,
  }: {
    address: string
    allowedIPs: string[]
    server: ServerFragment
    peer: PeerFragment & { privateKey?: string }
  },
  options: { keepEmpty?: boolean | string[] } = {}
) {
  const config = {
    Interface: {
      PrivateKey: peer.privateKey,
      Address: address,
      MTU: server.mtu,
      DNS: server.dns?.join(','),
    },
    Peer: {
      PublicKey: server.publicKey,
      AllowedIPs: allowedIPs?.join(','),
      Endpoint: peer.endpoint,
      PersistentKeepalive: peer.persistentKeepalive,
    },
  }

  return Object.entries(config)
    .map(([name, config]) =>
      [
        `[${name}]`,
        Object.entries(config)
          .filter(
            ([_, value]) =>
              options.keepEmpty === true ||
              (Array.isArray(options.keepEmpty) &&
                options.keepEmpty.includes(_)) ||
              isset(value)
          )
          .map(([key, value]) => `${key} = ${value}`)
          .join('\n'),
        '',
      ].join('\n')
    )
    .join('\n')
}

export function callMutation<TDoc extends DocumentNode>(
  doc: TDoc,
  ...args: any[]
) {
  let promise: MutateResult<any>

  const scope = effectScope()

  scope.run(() => {
    const { mutate } = useMutation(doc)
    promise = mutate(...args)
  })

  scope.stop()

  // @ts-ignore
  return promise
}

export function toColumn(e: MinimalColumnDefinition) {
  const definition = typeof e == 'string' ? { name: e } : e

  const { name, field = name, label = titleCase(name) } = definition

  return {
    align: 'left',
    format: getFormatter(name),
    sortable: true,
    ...definition,
    field,
    label,
  }
}

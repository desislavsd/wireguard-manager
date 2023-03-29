import { ServerFragment, PeerFragment } from '#gql'
import { Notify } from 'quasar'

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

export function parseGqlErrors(ex: any): string {
  if (typeof ex === 'string') return ex

  return (
    ex?.gqlErrors?.map((e: any) => e.message).join('\n') || ex?.message || ''
  )
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

export function generateWireguardClientConfig({
  server,
  peer,
  address,
  allowedIPs,
}: {
  address: string
  allowedIPs: string[]
  server: ServerFragment
  peer: PeerFragment & { privateKey?: string }
}) {
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
          .filter(([_, value]) => isset(value))
          .map(([key, value]) => `${key} = ${value}`)
          .join('\n'),
        '',
      ].join('\n')
    )
    .join('\n')
}

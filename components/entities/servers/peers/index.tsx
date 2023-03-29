import { PeerFragment } from '#gql'
import { z, ZodSchema } from 'zod'
import EditDialog from './edit.vue'
import ConfigureWireguardClient from '@/components/ConfigureWireguardClient.vue'
import Model from '@/utils/model'
import { MinimalColumnDefinition } from '~~/types'
import openDialog from '~~/utils/openDialog'
import { Servers } from '../'
import { QBtn, Notify } from 'quasar'
export type Item = PeerFragment & { privateKey?: string }

export const schemaAdd = z.object({
  name: z.string(),
  allowedIPs: z.string().array().min(1),
  description: z.string().optional(),
  endpoint: z.string().optional(),
  publicKey: z.string(),
  persistentKeepalive: z.number().optional(),
  presharedKey: z.string().optional(),
})

export const schemaUpdate = schemaAdd.omit({ name: true })

export interface Peers extends Item {}

export class Peers extends Model {
  static slug = 'peers'
  static ref: Servers
  static columns: MinimalColumnDefinition<Peers>[] = [
    {
      name: 'name',
      format: (v, item) => (
        <div>
          <div>{item.name}</div>
          <div class="-opacity-70">{item.endpoint}</div>
        </div>
      ),
    },
    'description',
    {
      name: 'publicKey',
      format(v: string) {
        if (!v) return ''
        return (
          <QBtn
            color="secondary"
            dence
            flat
            size="xs"
            class="-overflow-hidden -text-ellipsis -min-w-0 -gap-2 -pl-0"
            onClick={() => copyToClipboard(v)}
            icon="content_copy"
          >
            {v}
          </QBtn>
        )
      },
    },
    'createdAt',
  ]
  static schemeAdd = schemaAdd
  static schemeUpdate = schemaUpdate
  static listFn: typeof Model['listFn'] = async function () {
    const serverId = this.ref?.$id as string

    if (!serverId) throw new Error('serverId is required')

    const { data } = await gqlPeers({ serverId })

    return {
      ...data,
      data: ((data && 'data' in data && data.data) || []) as PeerFragment[],
    }
  }
  static async findFn(id: Item['id']) {
    const res = await gqlPeer({ id })
    return res.data
  }
  static async updateFn(item: Item, input: z.infer<typeof schemaUpdate>) {
    input = schemaUpdate.parse(input)

    const res = await gqlUpdatePeer({
      input: {
        ...input,
        id: item.id,
      },
    })
    return res.mutation.data
  }
  static async addFn(input: z.infer<typeof schemaAdd>) {
    input = schemaAdd.parse(input)

    const res = await gqlCreatePeer({
      input: { ...input, serverId: this.ref?.$id as string },
    })
    return res.mutation.data
  }
  static async delFn(id: Item['id']) {
    const res = await gqlDeletePeer({ input: { id } })
    return res.mutation
  }
  get $model(): typeof Peers {
    return super.$model as typeof Peers
  }
  edit() {
    return super.edit({ component: EditDialog })
  }

  promptConfigure() {
    if (!this.privateKey)
      return void Notify.create('Generate a private key first')
    return openDialog({
      component: ConfigureWireguardClient,
      componentProps: {
        peer: this,
        server: this.$model.ref,
      },
    })
  }
}

export default Peers

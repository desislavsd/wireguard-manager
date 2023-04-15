import { PeerFragment } from '@/gql'
import { z } from 'zod'
import EditDialog from './edit.vue'
import ConfigureWireguardClient from '@/components/ConfigureWireguardClient.vue'
import Model from '@/utils/model'
import { MinimalColumnDefinition } from '~~/types'
import openDialog from '~~/utils/openDialog'
import { Servers } from '../'
import { QBtn, Notify } from 'quasar'
import { UseQueryReturn } from '@vue/apollo-composable'
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
            dense
            flat
            size="xs"
            class="-overflow-hidden -text-ellipsis -min-w-0 -gap-2 -pl-0"
            onClick={() => copyToClipboard(v)}
          >
            {v}
          </QBtn>
        )
      },
    },
    'createdAt',
  ]
  static schemaAdd = schemaAdd
  static schemaUpdate = schemaUpdate
  static useList<T extends typeof Model<unknown>>(
    this: T
  ): UseQueryReturn<{ data: InstanceType<T>[] }, any> {
    const serverId = this.ref?.$id as string
    if (!serverId) throw new Error('serverId is required')
    // @ts-ignore
    return super.useList.call(
      this,
      { serverId },
      {
        parse: (res) => res?.data?.data || [],
      }
    )
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

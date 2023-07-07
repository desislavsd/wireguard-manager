import { z } from 'zod'
import { Model } from '@/utils/model'
import EditDialog from './edit.vue'
import { ForeignServer, ImportForeignServerDocument } from '@/gql'
import {
  BtnModelTableActionsDefinition,
  MinimalColumnDefinition,
} from '~/types'
import ServersModel from '@/components/entities/servers'
import openDialog from '~/utils/openDialog'
import { QChip, QBtn } from 'quasar'

export type Item = ForeignServer

export const schemaImport = z.object({
  name: z.string(),
})

export interface ForeignServers extends Item {}

export class ForeignServers extends Model {
  static slug = 'foreign-servers'
  static columns: MinimalColumnDefinition<ForeignServers>[] = [
    {
      name: 'name',
      format(name, item) {
        return (
          <>
            {name}{' '}
            {item.foreignInterface.addresses?.slice(0, 3).map((e) => (
              <p class="-opacity-70">{e}</p>
            ))}
          </>
        )
      },
    },
    { name: 'listenPort', label: 'Port' },
    { name: 'publicKey' },
    {
      name: 'peers',
      format(v, item) {
        const { peers } = item
        return peers?.length ? (
          <QBtn color="secondary" size="xs" rounded onClick={() => item.edit()}>
            {peers.length}
          </QBtn>
        ) : (
          ''
        )
      },
    },
  ]
  get tableActions(): BtnModelTableActionsDefinition {
    let item = this
    return [
      [
        'preview',
        {
          icon: 'visibility',
          color: 'primary',
          onClick: () => item.edit(),
        },
      ],
      [
        'import',
        {
          icon: 'post_add',
          color: 'positive',
          onClick: () => item.promptImport(),
        },
      ],
    ]
  }
  get $model(): typeof ForeignServers {
    return super.$model as typeof ForeignServers
  }
  get $id() {
    return this.name
  }
  set $id(v) {
    this.name = v
  }

  edit() {
    return super.edit({ component: EditDialog })
  }

  async promptImport() {
    return await openDialog({
      componentProps: {
        content: (
          <>
            Are you sure you want to{' '}
            <b class="-uppercase -text-positive">import</b>{' '}
            <b class="-text-primary">{this.name}</b> to servers?
          </>
        ),
        action: {
          icon: 'post_add',
          label: 'Import',
          color: 'positive',
        },
        onSubmit: () => this.import(),
      },
    })
  }

  async import(opts: Partial<{ noflush: boolean }> = {}) {
    const res = await callMutation(
      ImportForeignServerDocument,
      {
        input: schemaImport.parse(this),
      },
      { refetchQueries: ['Servers', 'ForeignServers'] }
    )
    if (!opts.noflush) {
      this.$model.flush()
      ServersModel.flush()
    }
    return res
  }

  static async importBatch(items: ForeignServers[]) {
    await openDialog({
      componentProps: {
        content: (
          <>
            Import <b class="-text-warning">{items.length}</b> items?
          </>
        ),
      },
    })
    await Promise.allSettled(
      items.map((item) => item.import({ noflush: true }))
    )
    this.flush()
    ServersModel.flush()
  }
}

export default ForeignServers

import { z } from 'zod'
import { Model } from '@/utils/model'
import EditDialog from './edit.vue'
import { UserFragment } from '@/gql'

export type Item = UserFragment

export const schemaAdd = z.object({
  email: z.string().email(),
  password: z.string().min(4),
})

export const schemaUpdate = z.object({
  email: z.string().email().or(z.string().max(0).optional()),
  password: z.string().min(4).or(z.string().max(0).optional()),
})

export interface Users extends Item {}

export class Users extends Model {
  static slug = 'users'
  static columns = ['email', 'createdAt']
  static schemaAdd = schemaAdd
  static schemaUpdate = schemaUpdate
  get $name() {
    return this.email
  }
  get $model(): typeof Users {
    return super.$model as typeof Users
  }
  edit() {
    return super.edit({ component: EditDialog })
  }
}

export default Users

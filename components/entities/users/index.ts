import { UserFragment } from '#gql'
import { z, ZodSchema } from 'zod'
import { Model } from '~~/utils/model'
import EditDialog from './edit.vue'

export type Item = UserFragment

export const schemeAdd = z.object({
  email: z.string().email(),
  password: z.string().min(4),
})

export const schemeUpdate = z.object({
  email: z.string().email().or(z.string().max(0).optional()),
  password: z.string().min(4).or(z.string().max(0).optional()),
})

async function listFn() {
  return await gqlUsers()
}

async function findFn(id: Item['id']) {
  const res = await gqlUser({ id })
  return res.data
}

async function updateFn(item: Item, input: z.infer<typeof schemeUpdate>) {
  input = schemeUpdate.parse(input)

  const res = await gqlUpdateUser({
    input: {
      ...input,
      id: item.id,
    },
  })
  return res.mutation.data
}

async function addFn(input: z.infer<typeof schemeAdd>) {
  input = schemeAdd.parse(input)

  const res = await gqlCreateUser({ input })
  return res.mutation.data
}

async function delFn(id: Item['id']) {
  const res = await gqlDeleteUser({ input: { id } })
  return res.mutation
}

export interface Users extends Item {}

export class Users extends Model {
  static slug = 'users'
  static columns = ['email', 'createdAt']
  static schemeAdd = schemeAdd
  static schemeUpdate = schemeUpdate
  static listFn = listFn
  static findFn = findFn
  static updateFn = updateFn
  static addFn = addFn
  static delFn = delFn
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

import { z, ZodType, ZodSchema } from 'zod'
import { toFieldValidator } from '@vee-validate/zod'
import { ValidationRule } from 'quasar'
import { PartialDeep } from '~~/types'

Object.defineProperties(ZodSchema.prototype, {
  $rule: {
    enumerable: false,
    get: zodToRule,
  },
  $rules: {
    enumerable: false,
    get() {
      return [this.$rule]
    },
  },
  $default: {
    enumerable: false,
    value(defaults: any) {
      return getDefaults(this, defaults)
    },
  },
})

declare module 'zod' {
  interface ZodSchema {
    get $rule(): ValidationRule
    get $rules(): ValidationRule[]
    $default<
      T extends z.ZodTypeAny = this,
      D extends SchemaSeed<T> = undefined
    >(
      defaults?: D
    ): SchemaShape<T, D>
  }
}

function getDefaults<
  T extends z.ZodTypeAny | undefined,
  D extends SchemaShape<T>
>(schema: T, seed?: D): SchemaShape<T, D> {
  if (schema instanceof z.ZodArray) return seed || ([] as SchemaShape<T, D>)

  if (schema instanceof z.ZodObject)
    return Object.fromEntries(
      (Object.entries(schema.shape) as any[][])
        .map(([key, value]) => {
          if (value instanceof z.ZodDefault)
            return [key, seed?.[key] ?? value._def.defaultValue()]

          return [key, getDefaults(value, seed?.[key])]
        })
        .filter(([key, value]) => value !== undefined)
    )
  return (seed || undefined) as SchemaShape<T, D>
}

function zodToRule<T extends ZodType>(this: T) {
  return toRule(this)
}

function toRule(s: any) {
  const validator = toFieldValidator(s)

  return async (val: any) => {
    const { errors } = await validator.parse(val)

    return (
      errors
        .map((e) => e.errors)
        .flat()
        .filter(Boolean)
        .join(' ') || true
    )
  }
}

export default defineNuxtPlugin(() => {})

type SchemaSeed<Schema extends z.ZodTypeAny | undefined> =
  | (Schema extends z.ZodTypeAny ? PartialDeep<z.infer<Schema>> : undefined)
  | undefined

type SchemaShape<
  Schema extends z.ZodTypeAny | undefined,
  Defaults extends SchemaSeed<Schema> = undefined
> = Schema extends z.ZodArray<any>
  ? Defaults extends undefined
    ? z.infer<Schema>
    : Defaults
  : Schema extends z.ZodDefault<any>
  ? ReturnType<Schema['_def']['defaultValue']>
  : Schema extends z.ZodObject<any>
  ? {
      [Key in keyof Schema['shape']]: SchemaShape<
        Schema['shape'][Key],
        Defaults extends object ? Defaults[Key] : undefined
      >
    }
  : Defaults
/* 
const target = z.object({
  email: z.string(),
  name: z.string().default('123'),
  foo: z.object({
    bar: z.string(),
    servers: z.string().array(),
  }),
})

type RR = SchemaSeed<typeof target>

const a = {} as PartialDeep<z.infer<typeof target>>
const b = {} as SchemaSeed<typeof target>

const test = { name: 'deso', foo: { servers: ['one'] }, more: 123 }

type RRR = typeof test extends SchemaSeed<typeof target> ? true : false
//   ^?

const R = target.$default()

const R2 = target.$default(test)
 */

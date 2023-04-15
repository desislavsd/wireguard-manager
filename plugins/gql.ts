import { Notify } from 'quasar'
import { ApolloClient } from '@apollo/client'

export let apollo: ReturnType<typeof useApollo>
export let client: ApolloClient<any>

export default defineNuxtPlugin((nuxt) => {
  if (import.meta.env.DEV) {
    // @ts-ignore
    globalThis.nuxt = nuxt
  }
  apollo = useApollo()

  client = apollo.clients!.default

  nuxt.hook('apollo:error', (err) => {
    const message = parseGqlErrors(err)

    // access denied is handled by the auth plugin
    if (message.includes('access denied')) return

    Notify.create({
      type: 'negative',
      message,
      position: 'top-right',
    })
  })
})

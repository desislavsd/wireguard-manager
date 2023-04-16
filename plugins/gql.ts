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
    // this global error handler runs before the error is handled by the component
    // so we wait to see if errors will potentially be marked as handled
    // only non handled errors will be shown
    setTimeout(() => {
      const message = parseGqlErrors(err, { skipHandled: true })

      // access denied is handled by the auth plugin
      if (!message || message.includes('access denied')) return

      Notify.create({
        type: 'negative',
        message,
        position: 'top-right',
      })
    })
  })
})

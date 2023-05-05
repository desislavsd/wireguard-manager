import { Notify } from 'quasar'
import { ApolloClient } from '@apollo/client'
import { createHttpLink, from, split } from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import { createClient } from 'graphql-ws'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'

export let apollo: ReturnType<typeof useApollo>
export let client: ApolloClient<any>

export default defineNuxtPlugin((nuxt) => {
  const config = useRuntimeConfig()

  const httpEndpoint = `${
    config.public.gqlHost || `${globalThis.location.origin || ''}/query`
  }`

  const wsEndpoint = httpEndpoint.replace(/^http(s)?/, 'ws$1')

  apollo = useApollo()

  client = apollo.clients!.default

  client.setLink(makeLink())

  nuxt.hook('apollo:error', globalErrorHandler)

  function makeLink() {
    const authLink = setContext(async (_, { headers }) => {
      return {
        headers: await getAuthHeaders(headers),
      }
    })

    const httpLink = createHttpLink({
      uri: httpEndpoint,
    })

    const errorLink = onError((err) => {
      nuxt.callHook('apollo:error', err)
    })

    const wsLink = new GraphQLWsLink(
      createClient({
        url: wsEndpoint,

        connectionParams: async () => {
          return await getAuthHeaders()
        },
      })
    )

    return split(
      ({ query }) => {
        const definition = getMainDefinition(query)
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        )
      },
      // custom http Link or client.link
      wsLink,
      from([errorLink, authLink, httpLink])
    )
  }

  async function globalErrorHandler(err: any) {
    // this global error handler runs before the error is handled by the component
    // so we wait to see if errors will potentially be marked as handled
    // only non handled errors will be shown
    await sleep()

    const message = parseGqlErrors(err, { skipHandled: true })

    // access denied is handled by the auth plugin
    if (!message || message.includes('access denied')) return

    Notify.create({
      type: 'negative',
      message,
      position: 'top-right',
    })
  }

  async function getAuthHeaders(headers?: any) {
    let token = await apollo.getToken()

    if (!token) return headers

    return {
      ...headers,
      Authorization: `Bearer ${token}`,
    }
  }
})

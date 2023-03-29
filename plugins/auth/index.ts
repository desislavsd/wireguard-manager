import useAuthStore from './store'
export default defineNuxtPlugin(async (nuxtApp) => {
  const auth = useAuthStore()

  // add global auth guard
  addRouteMiddleware((to) => {
    const toLogin = to.name == 'login'
    const logged = auth.is('logged')

    if (logged && toLogin) return '/'

    if (!logged && !toLogin) return auth.redirect401
  })

  // hook into graphql client to set the current token
  nuxtApp.hook('gql:auth:init', ({ token }) => {
    token.value = auth.token
  })

  // let the app lifecycle continue only after the
  // user's auth state is resolved
  await auth.load().catch(console.log)

  return {
    provide: {
      auth,
    },
  }
})

import useAuthStore from './store'

export default defineNuxtPlugin(async (nuxt) => {
  const auth = useAuthStore()

  // add global auth guard
  addRouteMiddleware((to) => {
    const toLogin = to.name == 'login'
    const logged = auth.is('logged')

    if (logged && toLogin) return '/'

    if (!logged && !toLogin) return auth.redirect401
  })

  nuxt.hook('apollo:error', (err) => {
    const { $router } = nuxt.vueApp.$nuxt
    // @ts-ignore
    const loginPage = $router.currentRoute.value.name?.includes?.('login')

    const message = parseGqlErrors(err)

    const isAccessDenied = message.includes('access denied')

    if (loginPage || !isAccessDenied) return

    auth.setLogout()

    auth.promptLogin().catch(() => $router.push(auth.redirect401))
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

import { Notify } from 'quasar'
export default defineNuxtPlugin((nuxt) => {
  useGqlError(async (err: any) => {
    const { $auth, $router } = nuxt.vueApp.$nuxt
    const logged = $auth.is('logged')
    const message = parseGqlErrors(err)
    const isAccessDenied = message.includes('access denied')

    if (!logged && isAccessDenied) return

    Notify.create({
      type: 'negative',
      message,
      position: 'top-right',
    })

    if (!isAccessDenied) return

    $auth.setLogout()
    $auth.promptLogin().catch(() => $router.push($auth.redirect401))
  })
})

import { Notify } from 'quasar'
export default defineNuxtPlugin((nuxt) => {
  useGqlError(async (err: any) => {
    Notify.create({
      type: 'negative',
      message: parseGqlErrors(err),
      position: 'top-right',
    })

    if (
      err?.gqlErrors?.some?.((e: any) => e.message?.includes?.('access denied'))
    ) {
      const { $auth, $router } = nuxt.vueApp.$nuxt

      $auth.setLogout()

      if ($router.currentRoute.value.path === $auth.redirect401) return

      $auth.promptLogin().catch(() => $router.push($auth.redirect401))
    }
  })
})

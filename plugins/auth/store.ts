import { SignInInput, ViewerQuery } from '#gql'
import LoginPrompt from '@/components/LoginPrompt.vue'
import { Dialog } from 'quasar'

type User = ViewerQuery['viewer']

let activePrompt: Promise<User> | undefined

const useAuthStore = defineStore('auth', () => {
  const remember = useLocalStorage('remember', false)

  const state = reactive({
    user: null as User | null,
    logged: false,
    remember,
    token: useLocalStorage('token', ''),
    redirect401: '/login',
    redirect403: '/',
  })

  const flags = computed(() => {
    const flags = {
      logged: !!state.logged,
    }

    Object.entries(flags).forEach(
      // @ts-ignore
      ([flag, value]) => (flags[`!${flag}`] = !value)
    )

    type keys = keyof typeof flags

    return flags as { [key in keys | `!${keys}`]: boolean }
  })

  const setLogin = (user: User) => Object.assign(state, { user, logged: true })

  const setLogout = () => Object.assign(state, { logged: false })

  async function login(payload: SignInInput) {
    try {
      state.token = ''
      const { signIn: res } = await gqlSignIn({ input: payload })

      state.token = res?.token ? res.token : ''

      return await reload()
    } catch (ex) {
      setLogout()
      throw ex
    }
  }

  async function logout() {
    setLogout()
  }

  async function reload() {
    const { viewer: user } = await gqlViewer()
    setLogin(user)
    return user
  }

  async function update(payload: Partial<User>) {
    // const { data: user } = await reload()
    // setLogin(user)
    // return user
  }

  async function deleteAccount() {
    // await context.http.delete('user')
    setLogout()
  }

  const actions = ['create', 'update', 'read', 'delete']

  return {
    ...toRefs(state),
    flags,
    setLogout,
    login,
    logout,
    reload,
    load: reload,
    update,
    deleteAccount,
    promptLogin,

    // checks for a given set of auth states according to `flags`
    is: withAndOrString((states: string[]) => {
      if (!states?.length) return true
      return states.every(
        (state) => flags.value[state as keyof typeof flags.value]
      )
    }),

    // checks if user satisfies the given set of permissions and/or roles
    can: withAndOrString((perms: string[]) => {
      return true
    }),
  }
})

export default useAuthStore

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}

function withAndOrString(cb: Function) {
  return function (conditions?: string) {
    const parsed =
      conditions
        ?.split(/,\s*/)
        .map((e) => e.split(/\s+/).filter(isset))
        .filter(isset) || []

    return parsed.length ? parsed.some((e) => cb(e)) : cb()
  }
}

function isset(val: any) {
  return val && typeof val === 'object'
    ? Object.keys(val).length
    : ![NaN, null, '', undefined].includes(val)
}

function promptLogin() {
  activePrompt ??= new Promise((rs, rj) => {
    Dialog.create({ component: LoginPrompt })
      .onOk(rs)
      .onCancel(rj)
      .onDismiss(() => (activePrompt = undefined))
  })

  return activePrompt
}

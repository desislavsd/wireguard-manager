import { Dark } from 'quasar'

export default defineNuxtPlugin(() => {
  const value = useLocalStorage('dark', false)
  Dark.set(value.value)
  watchEffect(() => (value.value = Dark.isActive))
})

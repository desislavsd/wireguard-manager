export function useBusy() {
  const state = ref<undefined | Promise<unknown>>()

  return computed({
    get() {
      return Boolean(state.value)
    },
    async set(val: any) {
      await (state.value = val = Promise.allSettled([val]))

      if (state.value == val) state.value = undefined
    },
  })
}

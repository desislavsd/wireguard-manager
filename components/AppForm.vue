<script lang="tsx">
const contextKey: InjectionKey<{ error: Ref<string>; busy: Ref<boolean> }> =
  Symbol('FormContext')
export function useFormContext() {
  return inject(contextKey, null)
}
</script>
<script lang="tsx" setup>
import { ApolloError } from '@apollo/client'

const props = defineProps<{
  onSubmit?: (ev: SubmitEvent | Event) => any
}>()

const busy = useBusy()

const error = ref<any>('')

async function exec(ev: SubmitEvent | Event): Promise<unknown> {
  error.value = ''

  try {
    return await props.onSubmit?.call(null, ev)
  } catch (ex: any) {
    // mark errors as handled so they don't get shown in toast
    ex.graphQLErrors?.forEach?.((e: any) => (e.HANDLED = true))
    error.value = ex
  }
}

const onSubmit = computed(() => (ev: SubmitEvent | Event) => {
  if (busy.value) return

  return (busy.value = exec(ev))
})

const formContext = { error, busy }
provide(contextKey, formContext)
</script>
<template>
  <q-form v-bind="{ onSubmit }">
    <slot name="error"><AppErrorBanner /></slot>
    <slot />

    <q-inner-loading :showing="busy">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
  </q-form>
</template>
<style></style>

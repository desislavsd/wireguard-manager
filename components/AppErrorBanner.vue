<script lang="tsx">
import { useFormContext } from '@/components/AppForm.vue'
export default defineComponent({
  props: {
    error: {},
    onClear: {} as PropType<undefined | (() => void)>,
  },
  setup(props, {}) {
    const form = useFormContext()

    const error = computed(() => props.error || form?.error.value)

    const message = ref('')

    watch(
      () => parseGqlErrors(error.value),
      (msg) => (message.value = msg)
    )

    function clear() {
      if (props.onClear) return props.onClear()

      if (form) return (form.error.value = '')

      message.value = ''
    }
    return {
      clear,
      message,
    }
  },
})
</script>
<template>
  <transition
    appear
    enter-active-class="-animate-bounce-in -animate-duration-300"
  >
    <q-banner
      v-if="message"
      rounded
      inline-actions
      class="-bg-negative/100 -border-solid -border -border-negative -text-white -text-left -sticky -top-0 -z-1"
    >
      {{ message }}
      <template v-slot:action>
        <q-btn flat @click="clear" round size="sm" icon="close" />
      </template>
    </q-banner>
  </transition>
</template>
<style></style>

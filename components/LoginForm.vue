<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { z } from 'zod'
const Credentials = z.object({
  email: z.string().email(),
  password: z.string().min(4),
})

export default defineComponent({
  emits: ['resolve'],
  setup(props, { emit }) {
    const form = ref({} as z.infer<typeof Credentials>)

    const { $auth } = useNuxtApp()

    return {
      // auth,
      form,
      rules: {
        email: Credentials.shape.email.$rules,
        password: Credentials.shape.password.$rules,
      },

      async submit(ev: any) {
        // await new Promise((rs) => setTimeout(rs, 1000))

        const payload = Credentials.parse(form.value)

        const user = await $auth.login(payload)

        emit('resolve', user)
      },
    }
  },
})
</script>
<template>
  <app-form @submit="submit">
    <q-input
      v-model.trim="form.email"
      type="email"
      label="E-mail"
      :rules="rules.email"
    />
    <q-input
      v-model.trim="form.password"
      type="password"
      label="Password"
      :rules="rules.password"
    />
    <q-btn color="primary" label="Login" type="submit" class="-w-full" />
  </app-form>
</template>
<style></style>

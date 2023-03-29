<script lang="tsx">
import { PropType } from 'vue'
import { Notify } from 'quasar'
import wireguard from '~~/utils/wireguard'
import { z } from 'zod'

export default defineComponent({
  props: {
    schema: {} as PropType<{
      publicKey?: z.Schema
      privateKey?: z.Schema
      presharedKey?: z.Schema
    }>,
    public: {} as PropType<string>,
    private: {} as PropType<string>,
    preshared: {} as PropType<string>,
    'onUpdate:public': {} as PropType<(value: string) => void>,
    'onUpdate:private': {} as PropType<(value: string) => void>,
    'onUpdate:preshared': {} as PropType<(value: string) => void>,
    label: String,
  },

  setup(props) {
    const form = reactive({
      publicKey: useVModel(props, 'public'),
      privateKey: useVModel(props, 'private'),
      presharedKey: useVModel(props, 'preshared'),
    })

    function copyKey(key: string = form.privateKey || '') {
      const name =
        (Object.keys(form) as (keyof typeof form)[])
          .find((e) => form[e] == key)
          ?.replace('Key', '') || ''
      return copyToClipboard(key, `${titleCase(name)} key copied to clipboard`)
    }

    function generateKeypair() {
      const { publicKey, privateKey } = wireguard.generateKeypair()
      Object.assign(form, { publicKey, privateKey })
      copyKey(privateKey)
    }

    function generatePublicKey() {
      const publicKey = wireguard.generatePublicKey(form.privateKey)
      Object.assign(form, {
        publicKey,
      })
    }
    function generatePresharedKey() {
      const presharedKey = wireguard.generatePresharedKey()
      Object.assign(form, {
        presharedKey,
      })
    }
    return {
      form,
      generateKeypair,
      generatePublicKey,
      copyKey,
      generatePresharedKey,
      schema: {
        // privateKey: z.string().min(3).optional(),
        ...props.schema,
      },
    }
  },
})
</script>
<template>
  <div class="-grid -p-3 -pt-0 -bg-black/7 -rounded-4px">
    <div v-if="label" class="-pt-3">{{ label }}</div>
    <q-input
      dense
      v-model.trim="form.privateKey"
      label="Private"
      :rules="schema?.privateKey?.$rules"
      @update:model-value="generatePublicKey"
    >
      <template v-slot:append>
        <q-btn
          dense
          size="sm"
          outline
          color="secondary"
          icon="cached"
          @click="() => generateKeypair()"
        />
        <q-btn
          size="sm"
          outline
          color="secondary"
          dense
          icon="content_copy"
          :disable="!form.privateKey"
          @click="() => copyKey()"
        />
      </template>
    </q-input>
    <q-input
      dense
      v-model.trim="form.publicKey"
      label="Public"
      :rules="schema?.publicKey?.$rules"
      readonly
    >
      <template v-slot:append>
        <q-btn
          dense
          size="sm"
          outline
          color="secondary"
          icon="cached"
          @click="() => generatePublicKey()"
        />
        <q-btn
          dense
          size="sm"
          outline
          color="secondary"
          icon="content_copy"
          :disabled="!form.publicKey"
          @click="() => copyKey(form.publicKey)"
        />
      </template>
    </q-input>
    <q-input
      dense
      v-if="$props['onUpdate:preshared']"
      v-model.trim="form.presharedKey"
      label="Preshared"
      :rules="schema?.presharedKey?.$rules"
    >
      <template v-slot:append>
        <q-btn
          dense
          size="sm"
          outline
          color="secondary"
          icon="cached"
          @click="() => generatePresharedKey()"
        />
        <q-btn
          dense
          size="sm"
          outline
          color="secondary"
          icon="content_copy"
          :disabled="!form.presharedKey"
          @click="() => copyKey(form.presharedKey)"
        />
      </template>
    </q-input>
  </div>
</template>
<style></style>

<script lang="tsx">
import { defineComponent } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import LoginForm from './LoginForm.vue'
export default defineComponent({
  components: { LoginForm },
  emits: [...useDialogPluginComponent.emits],
  setup() {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent()
    return { dialogRef, onDialogHide, onDialogOK, onDialogCancel }
  },
})
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin -p-4">
      <q-card-section>
        <h2
          class="-m-0 -leading-none -text-2xl -font-bold -text-center -mb-4 -py-2"
        >
          Login
        </h2>
        <LoginForm @resolve="onDialogOK" />
        <footer class="-text-center -mt-4">
          <a
            @click="onDialogCancel"
            class="-cursor-pointer -text-secondary -no-underline -hover:underline"
            >Cancel</a
          >
        </footer>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

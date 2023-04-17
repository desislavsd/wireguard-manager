<script lang="tsx" setup>
import { Fn } from '@/types'
import openDialog from '~~/utils/openDialog'
const { dark } = useQuasar()
const { $theme } = useNuxtApp()
const options = computed(() => Object.keys($theme.themes))

function createTheme(val: string, done: Fn) {
  val = val?.trim() || ''
  if (!val || val in $theme.themes) return
  $theme.themes[val] = []
  done(val)
}

async function removeTheme() {
  const current = $theme.theme
  const action = current == 'custom' ? 'reset' : 'delete'
  await openDialog({
    componentProps: {
      content: (
        <span>
          Are you sure you want to{' '}
          <b class="-text-negative -uppercase">{action}</b> the{' '}
          <b class="-text-primary">{current}</b> theme?`
        </span>
      ),
      action: {
        color: 'negative',
        label: action,
      },
    },
  })

  if (!current) return
  if (current == 'custom') return ($theme.themes[current] = [])
  $theme.theme = ''
  $theme.themes = objectPick($theme.themes, (k, v) => k != current)
}
</script>
<template>
  <q-card>
    <q-card-section class="-grid -gap-4">
      <div class="-flex -gap-2">
        <q-select
          v-model="$theme.theme"
          :options="options"
          clearable
          use-input
          label="Themes"
          class="-flex-1"
          dense
          @new-value="createTheme"
        ></q-select>
        <app-btn
          icon="delete"
          unelevated
          color="negative"
          :disabled="!$theme.theme"
          @click="removeTheme()"
        />
        <q-btn
          :icon="dark.isActive ? 'light_mode' : 'dark_mode'"
          unelevated
          @click="dark.toggle()"
        />
      </div>

      <div class="-grid -grid-cols-3 -gap-2" v-if="$theme.theme">
        <label
          v-for="(color, i) in $theme.colors"
          class="-flex -items-center -gap-2"
        >
          <input type="color" :key="color" v-model="$theme.selected[i]" />
          {{ titleCase(color) }}
        </label>
      </div>
    </q-card-section>
  </q-card>
</template>
<style></style>

<script lang="ts">
function useDrawerState() {
  const states = [
    { modelValue: true, mini: false },
    { modelValue: true, mini: true },
    { modelValue: false, mini: false },
  ]

  const stateIndex = useLocalStorage('drawer', 0)

  function toggle() {
    stateIndex.value = (stateIndex.value + 1) % states.length
  }

  const active = computed(() => ({
    ...states[unref(stateIndex)],
    'onUpdate:modelValue': onUpdate,
  }))

  function onUpdate(v: boolean) {
    stateIndex.value = states.findIndex((s) => s.modelValue === v)
  }

  return {
    active,
    toggle,
  }
}

export default {
  setup() {
    const { dark } = useQuasar()
    const { $auth, $router } = useNuxtApp()
    const drawerStates = reactive(useDrawerState())

    const nav = computed(() => [
      { to: '/servers', name: 'Servers', icon: 'storage' },
      { to: '/users', name: 'Users', icon: 'people' },
      true,
      {
        onClick: () => dark.toggle(),
        name: 'Toggle theme',
        icon: dark.isActive ? 'light_mode' : 'dark_mode',
      },
      undefined,
      {
        onClick: () => $auth.logout().then(() => $router.push('/login')),
        name: 'Logout',
        icon: 'logout',
      },
    ])

    return {
      nav,
      drawerStates,
      titleCase,
    }
  },
}
</script>
<template>
  <q-layout view="lHh lpr fFf">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="drawerStates.toggle()" />

        <q-toolbar-title
          ><span class="-font-bold">Wireguard manager</span></q-toolbar-title
        >
      </q-toolbar>
    </q-header>

    <q-drawer v-bind="drawerStates.active" side="left" bordered>
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: '0' }">
        <q-list class="-flex-1 -flex -flex-col">
          <q-item clickable to="/" class="-bg-dark -text-white -sticky -top-0">
            <q-item-section avatar class="-h-[34px]">
              <i class="i-app-wireguard -text-5xl --mx-3 -text-primary"></i>
            </q-item-section>
            <q-item-section class="-font-bold">
              Wireguard Manager
            </q-item-section>
          </q-item>
          <template v-for="item in nav">
            <q-separator v-if="!item" />
            <div class="-flex-1" v-else-if="item === true" />
            <q-item
              v-else="item"
              clickable
              v-ripple
              :to="item.to"
              @click="item.onClick"
            >
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>

              <q-item-section> {{ item.name }} </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <NuxtPage class="-p-4" />
    </q-page-container>
  </q-layout>
</template>

<style>
.q-drawer__content .q-scrollarea__content {
  height: 100%;
  display: flex;
}
</style>

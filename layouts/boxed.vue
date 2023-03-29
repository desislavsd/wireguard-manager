<script></script>
<template>
  <q-layout
    view="hHh lpR fFf"
    class="-bg-gradient-to-br -from-primary -to-secondary -min-h-screen -grid -place-items-center -text-center"
  >
    <q-card
      class="-w-full -max-w-sm -p-2"
      @contextmenu.prevent="$q.dark.toggle()"
    >
      <q-card-section class="-grid -gap-4">
        <div>
          <i class="i-app-wireguard -text-5xl -text-primary"></i>
          <h1 class="-text-6 -text-primary -font-bold -leading-0">
            <span
              class="-bg-gradient-to-r -from-primary -to-secondary -bg-clip-text -text-transparent"
            >
              Wireguard Manager
            </span>
          </h1>
        </div>
        <NuxtPage />

        <a href="mailto:" class="-app-link">Contact us</a>
      </q-card-section>
    </q-card>
  </q-layout>
</template>

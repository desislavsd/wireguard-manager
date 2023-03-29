<script lang="tsx">
definePageMeta({
  layout: 'boxed',
})
export default defineComponent({
  props: {},
  layout: 'boxed',
  setup(props, {}) {},
})
</script>
<template>
  <LoginForm @resolve="$router.push('/')" />
</template>
<style></style>

export default defineNuxtPlugin(async (nuxt) => {
  if (import.meta.env.DEV) {
    // @ts-ignore
    globalThis.nuxt = nuxt
  }
})

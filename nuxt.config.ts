import { readFileSync } from 'fs'
import path from 'path'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Wireguard Manager',
      meta: [
        {
          name: 'theme-color',
          content: '#88c0d0',
        },
      ],
      link: [
        {
          rel: 'icon',
          href: '/favicon.svg',
          type: 'image/svg+xml',
        },
      ],
    },
  },
  modules: [
    '@vueuse/nuxt',
    'nuxt-quasar-ui',
    'nuxt-graphql-client',
    '@unocss/nuxt',
    '@pinia/nuxt',
  ],
  components: {
    dirs: ['~/components', '~/components/entities'],
  },
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },
  'graphql-client': {
    functionPrefix: 'gql',
  },
  quasar: {
    // string[]: https://quasar.dev/quasar-plugins
    plugins: ['Dialog', 'Notify'],
    // boolean | string: Truthy values requires `sass@1.32.12`, same behaviour as `@quasar/vite-plugin`
    sassVariables: './quasar.scss',
    // Requires `@quasar/extras` package
    extras: {
      // string | null: Auto-import roboto font. https://quasar.dev/style/typography#default-font
      font: 'roboto-font',
      // string[]: Auto-import webfont icons. Usage: https://quasar.dev/vue-components/icon#webfont-usage
      fontIcons: ['material-icons'],
      // string[]: Auto-import svg icon collections. Usage: https://quasar.dev/vue-components/icon#svg-usage
      // svgIcons: [],
      // string[]: Auto-import animations from 'animate.css'. Usage: https://quasar.dev/options/animations#usage
      // animations: [],
    },
  },
  unocss: {
    shortcuts: {
      'app-link': 'text-secondary no-underline hover:underline',
    },
    rules: [
      [
        /^grid-(fit|fill)(\S+)?/,
        ([, type, v]) => {
          const [v1 = 'min-content', v2 = '1fr'] = v
            .replace(/^-/, '')
            .split('_')
            .filter(Boolean)
            .map((e) => (!e || /\D/.test(e) ? e : `${e / 4}rem`))

          return {
            'grid-template-columns': `repeat(auto-${type}, minmax(${v1}, ${v2}) )`,
          }
        },
      ],
    ],
    theme: {
      colors: {
        primary: 'hsl(var(--c-primary))',
        secondary: 'hsl(var(--c-secondary))',
        accent: 'hsl(var(--c-accent))',
        // used by dark mode
        'dark-page': 'hsl(var(--c-dark-page))',
        dark: 'hsl(var(--c-dark))',

        positive: 'hsl(var(--c-positive))',
        negative: 'hsl(var(--c-negative))',
        info: 'hsl(var(--c-info))',
        warning: 'hsl(var(--c-warning))',
      },
    },
    preprocess(matcher) {
      const PREFIX = '-'
      if (matcher.startsWith('i-')) return matcher
      return matcher.startsWith(PREFIX)
        ? matcher.slice(PREFIX.length)
        : undefined
    },
    icons: {
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
      collections: {
        app: {
          wireguard: readFileSync(
            path.resolve(__dirname, 'public/favicon.svg')
          ).toString(),
        },
      },
    },
  },
  ssr: false,
})

function getColorsNamesFromCSSVariables() {
  return (
    Object.values(
      [...(document.styleSheets as any)]
        .map((e) => [...e.cssRules])
        .flat()
        .find((e) => e.style?.[0]?.startsWith('--c-'))?.style
    )
      ?.filter((e: any) => e.startsWith('--c-'))
      ?.map((e: any) => e.replace('--c-', '')?.trim()) || {}
  )
}

type Theme = {
  name: string
  colors: {
    [key: string]: string
  }
}

export default defineNuxtPlugin(() => {
  const colors = getColorsNamesFromCSSVariables()

  const themes = useLocalStorage('themes', { custom: [] } as Record<
    string,
    string[]
  >)

  const theme = useLocalStorage('theme', '')

  const style = document.createElement('style')

  document.body.appendChild(style)

  watchEffect(() => {
    const css = Object.entries(themes.value)
      .map(
        ([name, values]) =>
          `[data-theme="${name}"] {${values
            .map(
              (value, key) =>
                value && `--c-${colors[key]}: ${hexToHSLVar(value)};`
            )
            .filter(Boolean)
            .join('')}}`
      )
      .filter(Boolean)
      .join('\n')

    style.innerHTML = css
  })

  useHead({
    htmlAttrs: {
      'data-theme': theme,
    },
  })

  return {
    provide: {
      theme: reactive({
        colors,
        themes,
        theme,
        selected: computed(() => themes.value[theme.value]),
      }),
    },
  }
})

function hexToHSLVar(hex: string) {
  const [h, s, l] = hexToHSL(hex)
  return `${h}, ${s}%, ${l}%`
}

function hexToHSL(H: any) {
  // Convert hex to RGB first
  let r = (('0x' + H[1] + H[2]) as any) / 255,
    g = (('0x' + H[3] + H[4]) as any) / 255,
    b = (('0x' + H[5] + H[6]) as any) / 255

  // Then to HSL
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0

  if (delta == 0) h = 0
  else if (cmax == r) h = ((g - b) / delta) % 6
  else if (cmax == g) h = (b - r) / delta + 2
  else h = (r - g) / delta + 4

  h = Math.round(h * 60)

  if (h < 0) h += 360

  l = (cmax + cmin) / 2
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
  s = +(s * 100).toFixed(1)
  l = +(l * 100).toFixed(1)

  return [h, s, l]
}

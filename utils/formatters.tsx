import { QIcon } from 'quasar'
type Tester = RegExp | ((key: string) => boolean)
type Formatter = Function
type FormattersRecord = Record<string, [Tester, Formatter]>

const dateFormatter = Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})

const formatters: FormattersRecord = {
  email: [
    /email/,
    (v: unknown) =>
      v && (
        <a
          class="-text-primary  -no-underline -hover:underline"
          href={`mailto:${v}`}
        >
          {v}
        </a>
      ),
  ],
  date: [/At$/, (d: string) => dateFormatter.format(new Date(d))],
}

export function getFormatter(key: string) {
  return (
    Object.values(formatters).find(([test]) =>
      normalizeTester(test)(key)
    )?.[1] || defaultFormatter
  )
}

function normalizeTester(rx: RegExp | Function) {
  if (typeof rx == 'function') return rx
  return rx.test.bind(rx)
}

function defaultFormatter(v: unknown) {
  if (typeof v == 'boolean')
    return v ? (
      <QIcon name="check_circle" color="positive" />
    ) : (
      <QIcon name="remove_circle" color="negative" />
    )
  return v?.toString()
}

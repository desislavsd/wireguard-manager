import { QIcon, QBtn } from 'quasar'
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
  sshKey: [
    /(?:public|private)Key/,
    (v: string) =>
      v && (
        <QBtn
          color="secondary"
          dense
          flat
          size="xs"
          // @ts-ignore
          class="-overflow-hidden -text-ellipsis -min-w-0 -gap-2 -pl-0"
          onClick={() => copyToClipboard(v)}
        >
          {v}
        </QBtn>
      ),
  ],
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

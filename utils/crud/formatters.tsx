type Formatter = {
  testValue: RegExp | ((v: unknown) => boolean)
  testKey: RegExp | ((v: string) => boolean)
  toString?: (v: unknown) => string
  toNode: (v: unknown) => string | JSX.Element | null
}

const formatters: Record<string, Formatter> = {
  email: {
    testKey: /email/i,
    testValue: /&\S+@\S+$/,
    toNode: (v: unknown) =>
      v ? (
        <a
          class="-text-primary  -no-underline -hover:underline"
          href={`mailto:${v}`}
        >
          {v}
        </a>
      ) : (
        ''
      ),
  },
}

function getFormatterByKey(key: string) {
  return (
    Object.values(formatters).find((e) => normalizeTester(e.testKey)(e)) ||
    defaultFormatter
  )
}
function normalizeTester(rx: RegExp | Function) {
  if (typeof rx == 'function') return rx
  return rx.test.bind(rx)
}

function defaultFormatter(v: unknown) {
  return v?.toString() || ''
}

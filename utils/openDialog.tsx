import { Dialog, QDialogOptions } from 'quasar'
import AppDialog from '@/components/AppDialog.vue'

const defaults: QDialogOptions = {
  component: AppDialog,
  componentProps: { title: 'Confirm' },
}

export function openDialog(opts?: QDialogOptions) {
  const component = opts?.component || defaults.component

  opts = {
    ...defaults,
    ...opts,
    componentProps: {
      ...(component == AppDialog ? defaults.componentProps : {}),
      ...opts?.componentProps,
    },
  }

  return new Promise((rs, rj) =>
    Dialog.create(opts || {})
      .onOk(rs)
      .onCancel(rj)
      .onDismiss(rj)
  )
}

export default openDialog

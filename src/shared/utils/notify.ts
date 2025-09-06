import type { Options } from 'toastify-js'
import Toastify from 'toastify-js'

export function notify(
  message: string,
  options: Options = {
    duration: 3000,
    gravity: 'top',
    position: 'center',
  },
) {
  Toastify({
    text: message,
    ...options,
  }).showToast()
}

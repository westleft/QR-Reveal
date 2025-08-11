import type { createPinia } from 'pinia'
import { createApp } from 'vue'
import Modal from '../Modal.vue'

export function createVueApp(store: ReturnType<typeof createPinia>) {
  const el = document.createElement('div')
  el.id = 'qr-code-modal'
  document.body.appendChild(el)

  const app = createApp(Modal)
  app.use(store)
  app.mount(el)
}

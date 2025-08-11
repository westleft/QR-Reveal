import type { NotifyRequest } from '@/types'
import { createPinia, setActivePinia } from 'pinia'
import Toastify from 'toastify-js'
import { vaildIsImage } from '@/utils/vaild'
import { useStore } from './store'
import { createVueApp } from './utils'
import 'toastify-js/src/toastify.css'

const pinia = createPinia()

// 監聽來自 background script 的消息
chrome.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
  const { action } = request

  if (action === 'openModal') {
    createVueApp(pinia)
  }

  if (action === 'notify') {
    const { data: { message } } = request as NotifyRequest

    Toastify({
      text: message,
      duration: 3000,
      gravity: 'top',
      position: 'right',
      style: {
        background: 'red',
      },
    }).showToast()
  }
})

document.addEventListener('contextmenu', (event) => {
  const element = event.target as HTMLElement
  const isImage = vaildIsImage(element)

  if (isImage) {
    setActivePinia(pinia)
    const store = useStore()
    store.data = element
  }

  chrome.runtime.sendMessage({
    type: 'updateContextMenu',
    show: isImage,
  })
})

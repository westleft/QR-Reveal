import type { ContentRequest, NotifyRequest } from '@/shared/types'
import { createPinia } from 'pinia'
import { ContentMessageAction } from '@/shared/types'
import { createVueApp, notify } from '@/shared/utils'
import { useContextMenu, useSelectArea } from './composables'
import 'toastify-js/src/toastify.css'

const pinia = createPinia()
useContextMenu(pinia)

// 監聽來自 background script 的消息
chrome.runtime.onMessage.addListener((request: ContentRequest) => {
  const { action } = request

  if (action === ContentMessageAction.OpenModal) {
    createVueApp(pinia)
  }

  if (action === ContentMessageAction.Notify) {
    const { data: { message } } = request as NotifyRequest
    notify(message)
  }

  if (action === ContentMessageAction.SelectArea) {
    useSelectArea()
  }
})

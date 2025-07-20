import Modal from './Modal.vue'
import { createApp } from 'vue'
import { validateQRCode } from '@/utils'
import type { VaildQRCodeRequest, OpenModalRequest, NotifyRequest } from '@/types'
import "toastify-js/src/toastify.css"
import Toastify from "toastify-js"
// 監聽來自 background script 的消息
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {  
  const { action } = request

  if (action === 'vaildQRCode') {
    const { data: { imageUrl } } = request as VaildQRCodeRequest
    validateQRCode(imageUrl).then(sendResponse)

    return true
  }

  if (action === 'openModal') {
    const { data } = request as OpenModalRequest
    const modal = document.createElement('div')
    modal.id = 'qr-code-modal'
    document.body.appendChild(modal)
    const app = createApp(Modal)
    app.provide('data', data)
    app.mount(modal)
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
      }
    }).showToast()
  }
})


import type { NotifyRequest, OpenModalRequest, VaildQRCodeRequest } from '@/types'
import Toastify from 'toastify-js'
import { createApp } from 'vue'
import { validateQRCode } from '@/utils'
import Modal from './Modal.vue'
import 'toastify-js/src/toastify.css'

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
      },
    }).showToast()
  }
})

document.addEventListener('contextmenu', (event) => {
  const el = event.target
  let hasImage = false

  // 1. <img>
  if (el.tagName.toLowerCase() === 'img' && el.src) {
    hasImage = true
  }

  // 2. background-image
  const style = window.getComputedStyle(el)
  if (style.backgroundImage && style.backgroundImage !== 'none') {
    hasImage = true
  }

  // 3. canvas
  if (el.tagName.toLowerCase() === 'canvas') {
    hasImage = true
  }

  console.log(hasImage)

  chrome.runtime.sendMessage({
    type: 'updateContextMenu',
    show: hasImage,
  })
})

import Modal from './Modal.vue'
import { createApp } from 'vue'
import { validateQRCode } from '../../utils'

// 監聽來自 background script 的消息
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {  
  const { action } = request

  if (action === 'vaildQRCode') {
    validateQRCode(request.imageUrl).then(sendResponse)

    return true
  }

  if (action === 'openModal') {
    console.log('openModal：', request)
  }

  // if (action === 'detectQRCode') {
  //   // 檢測 QR code 並獲取結果
  //   const hasQRCode = await validateQRCode(request.imageUrl);

  //   const modal = document.createElement('div')
  //   modal.id = 'qr-code-modal'
  //   document.body.appendChild(modal)
  //   const app = createApp(Modal)
  //   app.provide('hasQRCode', hasQRCode)
  //   app.mount(modal)
    
  //   // 返回檢測結果
  //   sendResponse({ hasQRCode: hasQRCode });
  // } 


});


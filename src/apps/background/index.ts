import type { NotifyRequest, OpenModalRequest } from '@/types'
import { ContentMessageAction } from '@/types'
import { fetchWebsite } from '@/utils'
import { createMenu } from './menu'

const { sendMessage } = chrome.tabs

createMenu()

async function imageUrlToBase64(url: string): Promise<string> {
  console.log('url', url)
  const res = await fetch(url)
  const blob = await res.blob()
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

// update context menu by message
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  const { action } = message

  if (action === 'updateContextMenu') {
    chrome.contextMenus.update('detectQRcode', {
      enabled: message.show,
    })
  }

  if (action === 'fetchWebsite') {
    const { url } = message
    fetchWebsite(url).then(sendResponse)
    return true
  }

  if (action === 'convertImageToBase64') {
    const { url } = message
    console.log(url)
    imageUrlToBase64(url).then(sendResponse)
    return true
  }
})

/**
 * 發送通知訊息給指定分頁
 * @param tabId 分頁 ID
 * @param message 通知內容，預設為 'QR Code 偵測失敗'
 */
// function notifyFailure(tabId: number, message = 'QR Code 偵測失敗') {
//   sendMessage<NotifyRequest>(tabId, {
//     action: ContentMessageAction.Notify,
//     data: { message },
//   })
// }

/**
 * 開啟 modal 視窗
 * @param tabId 分頁 ID
 * @param data modal 內容
 */
function openModal(tabId: number, data: OpenModalRequest) {
  sendMessage<OpenModalRequest>(tabId, data)
}

/**
 * 右鍵選單點擊事件，偵測 QR Code 並處理
 */
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'detectQRcode') {
    openModal(tab!.id!, {
      action: ContentMessageAction.OpenModal,
    })
  }
})

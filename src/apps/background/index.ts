import type { NotifyRequest, OpenModalRequest } from '@/types'
import { ContentMessageAction } from '@/types'
import { fetchWebsite } from '@/utils'
import { createMenu } from './menu'

const { sendMessage } = chrome.tabs

createMenu()

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
    console.log(url)
    fetchWebsite(url).then(sendResponse)
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
      action: ContentMessageAction.OpenModal
    })
  }
})

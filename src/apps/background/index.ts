import type { NotifyRequest, OpenModalRequest } from '@/types'
import { ContentMessageAction } from '@/types'
import { fetchWebsite } from '@/utils'
import { createMenu } from './menu'

const { sendMessage } = chrome.tabs

createMenu()

// update context menu by message
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'updateContextMenu') {
    chrome.contextMenus.update('detectQRcode', {
      enabled: message.show,
    })
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

// 監聽來自 content script 的消息
chrome.runtime.onMessage.addListener(async (request, _sender, sendResponse) => {
  const { action } = request

  if (action === 'qrCodeDetected') {
    const { url } = request
    fetchWebsite(url).then((data) => {
      sendResponse({ data })
    })
  }
})

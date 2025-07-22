import type { NotifyRequest, OpenModalRequest } from '@/types'
import { ContentMessageAction } from '@/types'
import { fetchWebsite, vaildIsURL } from '@/utils'

const { sendMessage } = chrome.tabs

// 創建右鍵選單
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'detectQRcode',
    title: '偵測 QR Code',
    contexts: ['image'],
  })
})

// 處理右鍵選單點擊
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const { id: tabId } = tab || {}

  if (info.menuItemId === 'detectQRcode' && tabId) {
    sendMessage(tabId, {
      action: 'vaildQRCode',
      data: {
        imageUrl: info.srcUrl,
      },
    }, (response) => {
      if (!response.success) {
        console.error('這不是 QR Code')
        chrome.tabs.sendMessage<NotifyRequest>(tabId, {
          action: ContentMessageAction.Notify,
          data: {
            message: 'QR Code 偵測失敗',
          },
        })
        return
      }

      const isURL = vaildIsURL(response.data)

      if (!isURL) {
        console.error('這不是 QR Code')
        chrome.tabs.sendMessage<OpenModalRequest>(tabId, {
          action: ContentMessageAction.OpenModal,
          data: {
            type: 'text',
            text: response.data,
          },
        })
        return
      }

      fetchWebsite(response.data).then((data) => {
        chrome.tabs.sendMessage<OpenModalRequest>(tabId, {
          action: ContentMessageAction.OpenModal,
          data: {
            type: 'website',
            ...data,
            qrcodeUrl: info.srcUrl,
            url: response.data,
          },
        })
      }).catch((error) => {
        console.error('QR Code 偵測失敗', error)
        chrome.tabs.sendMessage<NotifyRequest>(tabId, {
          action: ContentMessageAction.Notify,
          data: { message: '取得網站資料失敗' },
        })
      })
    })
  }
})

// 監聽來自 content script 的消息
// chrome.runtime.onMessage.addListener(async (request, _sender, sendResponse) => {
//   const { action, imageUrl } = request

//   if (action === 'qrCodeDetected') {
//     sendResponse({ status: 'received' });
//   }
// });

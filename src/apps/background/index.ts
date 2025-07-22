import { fetchWebsite } from '@/utils'

// 創建右鍵選單
chrome.runtime.onInstalled.addListener(() => {
  // 創建圖片右鍵選單
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
    chrome.tabs.sendMessage(tabId, {
      action: 'vaildQRCode',
      data: {
        imageUrl: info.srcUrl,
      },
    }, (response) => {
      if (!response.success) {
        console.error('這不是 QR Code')
        chrome.tabs.sendMessage(tabId, {
          action: 'notify',
          data: {
            message: 'QR Code 偵測失敗',
          },
        })
        return
      }

      fetchWebsite(response.data).then((data) => {
        chrome.tabs.sendMessage(tabId, {
          action: 'openModal',
          data: {
            ...data,
            qrcodeUrl: info.srcUrl,
            url: response.data,
          },
        })
      }).catch((error) => {
        console.error('QR Code 偵測失敗', error)
        chrome.tabs.sendMessage(tabId, {
          action: 'notify',
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

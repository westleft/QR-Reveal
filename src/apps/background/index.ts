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

/**
 * 發送通知訊息給指定分頁
 * @param tabId 分頁 ID
 * @param message 通知內容，預設為 'QR Code 偵測失敗'
 */
function notifyFailure(tabId: number, message = 'QR Code 偵測失敗') {
  sendMessage<NotifyRequest>(tabId, {
    action: ContentMessageAction.Notify,
    data: { message },
  })
}

/**
 * 開啟 modal 視窗
 * @param tabId 分頁 ID
 * @param data modal 內容
 */
function openModal(tabId: number, data: OpenModalRequest) {
  sendMessage<OpenModalRequest>(tabId, data)
}

/**
 * 處理 QR Code 偵測結果
 * @param tabId 分頁 ID
 * @param qrcodeSrc 圖片網址
 * @param response 偵測回應
 */
async function handleQRCode(tabId: number, qrcodeSrc: string, response: any) {
  if (!response.success) {
    console.error('這不是 QR Code')
    notifyFailure(tabId)
    return
  }

  const qrData = response.data
  const isURL = vaildIsURL(qrData)

  if (!isURL) {
    console.error('這不是 QR Code')
    openModal(tabId, {
      action: ContentMessageAction.OpenModal,
      data: {
        type: 'text',
        image: qrcodeSrc,
        text: qrData,
      },
    })
    return
  }

  try {
    const websiteData = await fetchWebsite(qrData)
    openModal(tabId, {
      action: ContentMessageAction.OpenModal,
      data: {
        type: 'website',
        qrcodeUrl: qrcodeSrc,
        url: qrData,
        ...websiteData,
      },
    })
  } catch (error) {
    console.error('QR Code 偵測失敗', error)
    notifyFailure(tabId, '取得網站資料失敗')
  }
}

/**
 * 右鍵選單點擊事件，偵測 QR Code 並處理
 */
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const { id: tabId } = tab || {}
  if (info.menuItemId !== 'detectQRcode' || !tabId) {
    return
  }

  sendMessage(tabId, {
    action: 'vaildQRCode',
    data: {
      imageUrl: info.srcUrl,
    },
  }, (response) => {
    const qrcodeSrc = info.srcUrl!
    handleQRCode(tabId, qrcodeSrc, response)
  })
})

// 監聽來自 content script 的消息
// chrome.runtime.onMessage.addListener(async (request, _sender, sendResponse) => {
//   const { action, imageUrl } = request
//   if (action === 'qrCodeDetected') {
//     sendResponse({ status: 'received' });
//   }
// });

interface QRCodeResult {
  success: boolean
  data:  string
}

// 創建右鍵選單
chrome.runtime.onInstalled.addListener(() => {
  // 創建圖片右鍵選單
  chrome.contextMenus.create({
    id: 'detect-qr-code',
    title: '偵測 QR 碼',
    contexts: ['image']
  });
})

// 處理右鍵選單點擊
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const { id: tabId } = tab || {}

  if (info.menuItemId === 'detect-qr-code' && tabId) {
    chrome.tabs.sendMessage(tabId, {
        action: 'vaildQRCode',
        imageUrl: info.srcUrl
      },(response: QRCodeResult) => {
        if (!response.success) {
          console.error('這不是 QR Code')
          return
        }

        fetchWebsite(response.data).then((data) => {
          chrome.tabs.sendMessage(tabId, {
            action: 'openModal',
            data
          })
        })
      }
    )
  }
})

// 監聽來自 content script 的消息
// chrome.runtime.onMessage.addListener(async (request, _sender, sendResponse) => {  
//   const { action, imageUrl } = request
  
//   if (action === 'qrCodeDetected') {
//     sendResponse({ status: 'received' });
//   }
// });

// 獲取網站標題的函數
async function fetchWebsite(url: string) {
  try {
    const response = await fetch(url, {
      method: 'GET',
    });

    const html = await response.text();
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const descriptionMatch = html.match(/<meta name="description" content="([^"]+)"/i);
    const imageMatch = html.match(/<meta property="og:image" content="([^"]+)"/i);

    return {
      title: titleMatch?.[1]?.trim(),
      description: descriptionMatch?.[1]?.trim(),
      image: imageMatch?.[1]?.trim()
    }
  } catch (error) {
    console.error('error：', error)
    throw error;
  }
}

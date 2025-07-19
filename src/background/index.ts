// Background script for QR Reveal extension
console.log('QR Reveal background script loaded');

// 創建右鍵選單
chrome.runtime.onInstalled.addListener(() => {
  // 創建圖片右鍵選單
  chrome.contextMenus.create({
    id: 'detect-qr-code',
    title: '偵測 QR 碼',
    contexts: ['image']
  });
});

// 處理右鍵選單點擊
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'detect-qr-code' && tab?.id) {
    console.log('QR code detection requested for image:', info.srcUrl);
    
    // 發送消息給 content script 來處理圖片
    chrome.tabs.sendMessage(tab.id, {
      action: 'detectQRCode',
      imageUrl: info.srcUrl
    });
  }
});

// 監聽來自 content script 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Background received message:', request);
  
  if (request.action === 'qrCodeDetected') {
    // 可以在這裡處理 QR 碼檢測結果
    console.log('QR code content:', request.content);
  } else {
    console.log('Unknown action:', request.action);
  }
  
  sendResponse({ status: 'received' });
});

// Content script for QR Reveal extension
console.log('QR Reveal content script loaded');

// 這裡可以添加檢測和處理 QR 碼的邏輯
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, ready to detect QR codes');
});

// 監聽來自 popup 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request);
  sendResponse({ status: 'received' });
}); 
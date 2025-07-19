// Content script for QR Reveal extension
console.log('QR Reveal content script loaded');

// 監聽來自 background script 的消息
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  console.log('Content script received message:', request);
  
  if (request.action === 'detectQRCode') {
    detectQRCodeFromImage(request.imageUrl);
  }
  
  sendResponse({ status: 'received' });
});

// QR 碼檢測函數
async function detectQRCodeFromImage(imageUrl: string) {
  try {
    console.log('Detecting QR code from image:', imageUrl);
    
    // 創建一個 canvas 來處理圖片
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      console.error('Could not get canvas context');
      return;
    }
    
    // 載入圖片
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      // 設置 canvas 尺寸
      canvas.width = img.width;
      canvas.height = img.height;
      
      // 繪製圖片到 canvas
      ctx.drawImage(img, 0, 0);
      
      // 獲取圖片數據
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      // 這裡可以集成 QR 碼檢測庫
      // 目前先模擬檢測結果
      simulateQRCodeDetection(imageUrl);
    };
    
    img.onerror = () => {
      console.error('Failed to load image:', imageUrl);
      showNotification('無法載入圖片', 'error');
    };
    
    img.src = imageUrl;
    
  } catch (error) {
    console.error('Error detecting QR code:', error);
    showNotification('QR 碼檢測失敗', 'error');
  }
}

// 模擬 QR 碼檢測（實際使用時需要集成真實的 QR 碼檢測庫）
function simulateQRCodeDetection(imageUrl: string) {
  // 模擬檢測延遲
  setTimeout(() => {
    // 檢查圖片 URL 是否包含 QR 碼相關關鍵字
    const isQRCode = imageUrl.toLowerCase().includes('qr') || 
                    imageUrl.toLowerCase().includes('qrcode') ||
                    Math.random() > 0.7; // 30% 機率模擬檢測到 QR 碼
    
    if (isQRCode) {
      const mockContent = 'https://example.com/qr-code-content';
      showQRCodeResult(mockContent, imageUrl);
      
      // 發送結果給 background script
      chrome.runtime.sendMessage({
        action: 'qrCodeDetected',
        content: mockContent,
        imageUrl: imageUrl
      });
    } else {
      showNotification('未檢測到 QR 碼', 'info');
    }
  }, 1000);
}

// 顯示 QR 碼檢測結果
function showQRCodeResult(content: string, imageUrl: string) {
  // 創建結果彈窗
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    font-family: Arial, sans-serif;
  `;
  
  const contentDiv = document.createElement('div');
  contentDiv.style.cssText = `
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  `;
  
  contentDiv.innerHTML = `
    <h3 style="margin: 0 0 15px 0; color: #333;">QR 碼內容</h3>
    <p style="margin: 0 0 15px 0; word-break: break-all; color: #666;">${content}</p>
    <div style="display: flex; gap: 10px; justify-content: center;">
      <button id="copy-btn" style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">複製</button>
      <button id="close-btn" style="padding: 8px 16px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;">關閉</button>
    </div>
  `;
  
  modal.appendChild(contentDiv);
  document.body.appendChild(modal);
  
  // 添加事件監聽器
  document.getElementById('copy-btn')?.addEventListener('click', () => {
    navigator.clipboard.writeText(content);
    showNotification('已複製到剪貼簿', 'success');
  });
  
  document.getElementById('close-btn')?.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
  
  // 點擊背景關閉
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
}

// 顯示通知
function showNotification(message: string, type: 'success' | 'error' | 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 4px;
    color: white;
    font-family: Arial, sans-serif;
    z-index: 10001;
    animation: slideIn 0.3s ease-out;
  `;
  
  // 根據類型設置顏色
  switch (type) {
    case 'success':
      notification.style.background = '#28a745';
      break;
    case 'error':
      notification.style.background = '#dc3545';
      break;
    case 'info':
      notification.style.background = '#17a2b8';
      break;
  }
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // 3秒後自動移除
  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
  }, 3000);
}

// 添加 CSS 動畫
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

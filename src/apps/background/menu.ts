export function createMenu() {
// create context menu by right click
  chrome.contextMenus.create({
    id: 'detectQRcode',
    title: '偵測 QR Code',
    contexts: ['all'],
    type: 'normal',
  })

  chrome.contextMenus.create({
    id: 'separator',
    type: 'separator',
    contexts: ['all'],
  })

  chrome.contextMenus.create({
    id: 'setting',
    title: '進階設定（開發中）',
    contexts: ['all'],
    type: 'normal',
    enabled: false,
  })
}

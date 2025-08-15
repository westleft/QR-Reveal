export function createMenu() {
  const { getMessage } = chrome.i18n

  // create context menu by right click
  chrome.contextMenus.create({
    id: 'detectQRcode',
    title: getMessage('detect_qr_code'),
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
    title: getMessage('setting'),
    contexts: ['all'],
    type: 'normal',
    enabled: false,
  })
}

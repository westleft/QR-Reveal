import { ClickedMessageAction } from '@/shared/types'

/**
 * 開啟 modal 視窗
 */
function openModal(tabId: number) {
  chrome.tabs.sendMessage(tabId, {
    action: ClickedMessageAction.OpenModal,
  })
}

function selectArea(tabId: number) {
  chrome.tabs.sendMessage(tabId, {
    action: ClickedMessageAction.SelectArea,
  })
}

export const clickedHandlerMap = {
  detectQRcode: openModal,
  selectArea,
}

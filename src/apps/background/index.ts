import type { BackgroundRequest } from '@/shared/types'
import { BackgroundMessageAction } from '@/shared/types'
import { clickedHandlerMap } from './clicked-handler'
import { createMenu } from './menu'
import { handleCaptureVisibleTab, handleConvertImageToBase64, handleFetchWebsite, handleUpdateContextMenu } from './message-handler'

createMenu()

chrome.runtime.onMessage.addListener((message: BackgroundRequest, _sender, sendResponse) => {
  const { action } = message

  if (action === BackgroundMessageAction.ConvertImageToBase64) {
    handleConvertImageToBase64(message, sendResponse)
  }

  if (action === BackgroundMessageAction.FetchWebsite) {
    handleFetchWebsite(message, sendResponse)
  }

  if (action === BackgroundMessageAction.UpdateContextMenu) {
    handleUpdateContextMenu(message)
  }

  if (action === BackgroundMessageAction.CaptureVisibleTab) {
    handleCaptureVisibleTab(sendResponse)
  }

  return true
})

chrome.contextMenus.onClicked.addListener((message, tab) => {
  const { menuItemId } = message
  const handler = clickedHandlerMap[menuItemId as keyof typeof clickedHandlerMap]

  if (handler) {
    handler(tab!.id!)
  }
})

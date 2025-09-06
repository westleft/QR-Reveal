import type { ConvertImageToBase64Request, FetchWebsiteRequest, UpdateContextMenuRequest } from '@/shared/types'
import { backgroundFetchWebsite, imageUrlToBase64 } from '@/core/services'

type SendResponse = (response: any) => void

export function handleUpdateContextMenu(message: UpdateContextMenuRequest) {
  chrome.contextMenus.update('detectQRcode', {
    enabled: message.data.show,
  })
}

export function handleFetchWebsite(message: FetchWebsiteRequest, sendResponse: SendResponse) {
  backgroundFetchWebsite(message.data.url).then(sendResponse)
}

export function handleConvertImageToBase64(message: ConvertImageToBase64Request, sendResponse: SendResponse) {
  imageUrlToBase64(message.data.url).then(sendResponse)
}

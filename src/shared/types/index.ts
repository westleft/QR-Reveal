export { BackgroundMessageAction } from './action/background'
export type { ConvertImageToBase64Request, FetchWebsiteRequest, UpdateContextMenuRequest } from './action/background'
export type { BackgroundRequest } from './action/background'
export type { ContentRequest, NotifyRequest } from './action/content'
export { ClickedMessageAction, ContentMessageAction } from './action/content'

export interface QrCodeInfo {
  type: 'website' | 'text'
  title?: string
  description?: string
  image?: string
  text?: string
  url?: string
}

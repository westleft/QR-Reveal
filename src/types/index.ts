enum ContentMessageAction {
  OpenModal = 'openModal',
  VaildQRCode = 'vaildQRCode',
  Notify = 'notify',
}

interface WebsiteInfo {
  type: 'website' | 'text'
  title?: string
  description?: string
  image?: string
  qrcodeUrl?: string
  url?: string
  text?: string
}

interface MessageWrapper<U, T> {
  action: U
  data: T
}

type VaildQRCodeRequest = MessageWrapper<
  ContentMessageAction.VaildQRCode,
  { imageUrl: string }
>

type OpenModalRequest = MessageWrapper<
  ContentMessageAction.OpenModal,
  WebsiteInfo
>

type NotifyRequest = MessageWrapper<
  ContentMessageAction.Notify,
  { message: string }
>

export type { MessageWrapper, NotifyRequest, OpenModalRequest, VaildQRCodeRequest, WebsiteInfo }
export { ContentMessageAction }

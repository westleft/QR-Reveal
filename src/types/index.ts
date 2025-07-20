enum ContentMessageAction {
  OpenModal = 'openModal',
  VaildQRCode = 'vaildQRCode',
  Notify = 'notify',
}

interface WebsiteInfo {
  title?: string
  description?: string
  image?: string
  qrcodeUrl?: string
  url?: string
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

export type { MessageWrapper, VaildQRCodeRequest, OpenModalRequest, WebsiteInfo, NotifyRequest }

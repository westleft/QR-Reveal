enum ContentMessageAction {
  OpenModal = 'openModal',
  VaildQRCode = 'vaildQRCode',
  Notify = 'notify',
}

interface QrCodeInfo {
  type: 'website' | 'text'
  title?: string
  description?: string
  image?: string
  qrcodeUrl?: string
  url?: string
  text?: string
}

interface MessageWrapper<U, T = undefined> {
  action: U
  data: T
}

type OpenModalRequest = MessageWrapper<
  ContentMessageAction.OpenModal
>

type NotifyRequest = MessageWrapper<
  ContentMessageAction.Notify,
  { message: string }
>

export type { MessageWrapper, NotifyRequest, OpenModalRequest, QrCodeInfo }
export { ContentMessageAction }

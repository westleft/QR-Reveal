export enum ContentMessageAction {
  OpenModal = 'openModal',
  VaildQRCode = 'vaildQRCode',
  Notify = 'notify',
}

export enum ClickedMessageAction {
  OpenModal = 'openModal',
}

export type NotifyRequest = {
  action: ContentMessageAction.Notify
  data: { message: string }
}

export type OpenModalRequest = {
  action: ContentMessageAction.OpenModal
}

export type ContentRequest = NotifyRequest | OpenModalRequest

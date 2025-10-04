export enum ContentMessageAction {
  OpenModal = 'openModal',
  VaildQRCode = 'vaildQRCode',
  Notify = 'notify',
  SelectArea = 'selectArea',
}

export enum ClickedMessageAction {
  OpenModal = 'openModal',
  SelectArea = 'selectArea',
  OpenSidePanel = 'openSidePanel',
}

export type NotifyRequest = {
  action: ContentMessageAction.Notify
  data: { message: string }
}

export type OpenModalRequest = {
  action: ContentMessageAction.OpenModal
}

export type SelectAreaRequest = {
  action: ContentMessageAction.SelectArea
}

export type ContentRequest = NotifyRequest | OpenModalRequest | SelectAreaRequest

export enum BackgroundMessageAction {
  UpdateContextMenu = 'updateContextMenu',
  FetchWebsite = 'fetchWebsite',
  ConvertImageToBase64 = 'convertImageToBase64',
}

export type UpdateContextMenuRequest = {
  action: BackgroundMessageAction.UpdateContextMenu
  data: { show: boolean }
}

export type FetchWebsiteRequest = {
  action: BackgroundMessageAction.FetchWebsite
  data: { url: string }
}

export type ConvertImageToBase64Request = {
  action: BackgroundMessageAction.ConvertImageToBase64
  data: { url: string }
}

export type BackgroundRequest = UpdateContextMenuRequest | FetchWebsiteRequest | ConvertImageToBase64Request

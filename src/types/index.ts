enum ContentMessageAction {
  OpenModal = 'openModal',
  FetchWebsiteTitle = 'fetchWebsiteTitle',
}

enum BackgroundMessageAction {
  DetectQRCode = 'detectQRCode',
}

interface MessageWrapper<U, T> {
  action: U
  data: T
}



export type { MessageWrapper }

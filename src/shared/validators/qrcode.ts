import { BrowserQRCodeReader } from '@zxing/browser'

interface QRCodeResult {
  success: boolean
  data?: string
  error?: string
}

export async function vaildIsQRCode(
  imageUrl: string,
): Promise<QRCodeResult> {
  try {
    const codeReader = new BrowserQRCodeReader()
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.src = imageUrl

    const result = await codeReader.decodeFromImageElement(image)
    const data = result.getText()

    if (data) {
      return {
        success: true,
        data,
      }
    }

    return {
      success: false,
      error: chrome.i18n.getMessage('no_qr_code_found'),
    }
  } catch (e: unknown) {
    console.error('error', e)
    return {
      success: false,
      error: chrome.i18n.getMessage('no_qr_code_found'),
    }
  }
}

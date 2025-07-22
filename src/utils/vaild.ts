import { BrowserQRCodeReader } from '@zxing/library'

interface QRCodeResult {
  success: boolean
  data?: string
  error?: string
}

async function validateQRCode(
  imageUrl: string,
): Promise<QRCodeResult> {
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
    error: 'No QR code found',
  }
}

export { validateQRCode }

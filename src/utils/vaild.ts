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

function vaildIsURL(value: string): boolean {
  const pattern = /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/\S*)?$/
  return pattern.test(value.trim())
}

export { vaildIsURL, validateQRCode }

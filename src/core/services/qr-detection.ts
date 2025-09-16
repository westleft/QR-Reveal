import type { ConvertImageToBase64Request } from '@/shared/types'
import { BrowserQRCodeReader } from '@zxing/browser'
import { BackgroundMessageAction } from '@/shared/types'

function isBase64Image(url: string): boolean {
  return /^data:image\/[a-zA-Z]+;base64,/.test(url)
}

async function getImageBase64(src: string): Promise<string> {
  if (isBase64Image(src)) {
    return src // 已經是 base64
  }

  const result = await chrome.runtime.sendMessage<ConvertImageToBase64Request>({
    action: BackgroundMessageAction.ConvertImageToBase64,
    data: { url: src },
  })

  return result
}

export async function detectQRCodeFromCanvas(canvas: HTMLCanvasElement) {
  const dataUrl = canvas.toDataURL('image/png')

  const codeReader = new BrowserQRCodeReader()
  try {
    const result = await codeReader.decodeFromImageUrl(dataUrl)
    return result.getText()
  } catch (err) {
    console.error('No QR code found:', err)
    return null
  }
}

export async function detectQRCodeFromImage(image: HTMLImageElement) {
  try {
    const base64url = await getImageBase64(image.src)
    const codeReader = new BrowserQRCodeReader()
    const result = await codeReader.decodeFromImageUrl(base64url)
    return result.getText()
  } catch (err) {
    console.error('No QR code found:', err)
    return null
  }
}

export async function detectQRCodeFromBackgroundImage(element: HTMLElement) {
  try {
    const style = window.getComputedStyle(element)
    const backgroundImage = style.backgroundImage
    const imageUrl = backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '')
    const codeReader = new BrowserQRCodeReader()
    const result = await codeReader.decodeFromImageUrl(imageUrl)
    return result.getText()
  } catch (err) {
    console.error('No QR code found:', err)
    return null
  }
}

export async function detectQRCodeFromBase64(base64: string) {
  try {
    const codeReader = new BrowserQRCodeReader()
    const result = await codeReader.decodeFromImageUrl(base64)
    return result.getText()
  } catch (err) {
    console.error('No QR code found:', err)
    return null
  }
}

// 組合函數：根據元素類型自動選擇檢測方法
export async function detectQRFromElement(element: HTMLElement) {
  const tag = element.tagName.toLowerCase()

  const detectors = {
    img: () => detectQRCodeFromImage(element as HTMLImageElement),
    canvas: () => detectQRCodeFromCanvas(element as HTMLCanvasElement),
    default: () => detectQRCodeFromBackgroundImage(element),
  }

  const detector = detectors[tag as keyof typeof detectors] || detectors.default
  return detector()
}

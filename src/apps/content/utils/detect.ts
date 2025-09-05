import { BrowserQRCodeReader } from '@zxing/browser'

function isBase64Image(url: string): boolean {
  return /^data:image\/[a-zA-Z]+;base64,/.test(url)
}

async function getImageBase64(src: string): Promise<string> {
  if (isBase64Image(src)) {
    return src // 已經是 base64
  }

  const result = await chrome.runtime.sendMessage({
    action: 'convertImageToBase64',
    url: src,
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
    console.log('No QR code found:', err)
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

export async function detectQRCodeFromSvg(svg: SVGSVGElement) {
  try {
    const dataUrl = svg.toDataURL('image/svg+xml')
    const codeReader = new BrowserQRCodeReader()
    const result = await codeReader.decodeFromImageUrl(dataUrl)
    return result.getText()
  } catch (err) {
    console.error('No QR code found:', err)
    return null
  }
}

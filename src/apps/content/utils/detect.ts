import { BrowserQRCodeReader } from '@zxing/browser'

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
    const codeReader = new BrowserQRCodeReader()
    const result = await codeReader.decodeFromImageElement(image)
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
    const codeReader = new BrowserQRCodeReader()
    const result = await codeReader.decodeFromImageUrl(backgroundImage)
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

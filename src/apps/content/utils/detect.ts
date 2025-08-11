import { BrowserQRCodeReader } from '@zxing/library'

export async function detectQRCodeFromCanvas(canvas: HTMLCanvasElement) {
  const dataUrl = canvas.toDataURL('image/png')

  const codeReader = new BrowserQRCodeReader()
  try {
    const result = await codeReader.decodeFromImageUrl(dataUrl)
    console.log('QR code text:', result.getText())
  } catch (err) {
    console.log('No QR code found:', err)
  }
}

export async function detectQRCodeFromImage(image: HTMLImageElement) {
  const dataUrl = image.src
  const codeReader = new BrowserQRCodeReader()
  const result = await codeReader.decodeFromImageUrl(dataUrl)
  console.log('QR code text:', result.getText())
}

export async function detectQRCodeFromBackgroundImage(element: HTMLElement) {
  const style = window.getComputedStyle(element)
  const backgroundImage = style.backgroundImage
  const codeReader = new BrowserQRCodeReader()
  const result = await codeReader.decodeFromImageUrl(backgroundImage)
  console.log('QR code text:', result.getText())
}

export async function detectQRCodeFromSvg(svg: HTMLImageElement) {
  const dataUrl = svg.src
  const codeReader = new BrowserQRCodeReader()
  const result = await codeReader.decodeFromImageUrl(dataUrl)
  console.log('QR code text:', result.getText())
}

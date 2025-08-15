import { BrowserQRCodeReader } from '@zxing/browser'

interface QRCodeResult {
  success: boolean
  data?: string
  error?: string
}

async function validateQRCode(
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

function vaildIsURL(value: string): boolean {
  const pattern = /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/\S*)?$/
  return pattern.test(value.trim())
}

/**
 * valid parent element is image.
 * include img, canvas, svg, background-image.
 * @param el element
 */
function vaildIsImage(el: HTMLElement): boolean {
  let isImage = false

  const tag = el.tagName.toLowerCase()
  const imageTags = new Set(['img', 'canvas', 'svg'])

  isImage = imageTags.has(tag) && (tag !== 'img' || !!(el as HTMLImageElement).src)

  if (!isImage) {
    const bgi = getComputedStyle(el).backgroundImage
    isImage = !!bgi && bgi !== 'none'
  }

  return isImage
}

// type ImageType = 'img' | 'canvas' | 'svg' | 'background-image'

// function checkImageType(el: HTMLElement): ImageType {
//   const tag = el.tagName.toLowerCase()
//   const imageTags = new Set(['img', 'canvas', 'svg'])

//   if (imageTags.has(tag)) {
//     return tag as ImageType
//   }

//   const bgi = getComputedStyle(el).backgroundImage
//   return !!bgi && bgi !== 'none' ? 'background-image' : 'img'
// }

export { vaildIsImage, vaildIsURL, validateQRCode }

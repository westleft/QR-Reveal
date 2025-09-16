import type { QrCodeInfo } from '@/shared/types'
import { ref } from 'vue'
import { detectQRCodeFromBase64, detectQRFromElement, fetchWebsite } from '@/core/services'
import { vaildIsURL } from '@/shared/validators'

export function useQRProcess() {
  const data = ref<QrCodeInfo | null>(null)

  async function handleUrl(result: string): Promise<QrCodeInfo> {
    const websiteInfo = await fetchWebsite(result)
    return {
      ...websiteInfo,
      type: 'website',
      url: result,
    }
  }

  function handleText(result: string): QrCodeInfo {
    return {
      type: 'text',
      text: result,
    }
  }

  async function handleDetect(detectTarget: HTMLElement | string): Promise<string | null> {
    const isElement = detectTarget instanceof HTMLElement

    if (isElement) {
      return await detectQRFromElement(detectTarget)
    }
    return await detectQRCodeFromBase64(detectTarget)
  }

  async function processQRCode(target: (HTMLElement | string)): Promise<boolean> {
    const result = await handleDetect(target)
    if (!result) {
      return false
    }

    try {
      if (vaildIsURL(result)) {
        data.value = await handleUrl(result)
      } else {
        data.value = handleText(result)
      }
      return true
    } catch (err) {
      console.error('QR processing error:', err)
      return false
    }
  }

  return {
    data,
    processQRCode,
  }
}

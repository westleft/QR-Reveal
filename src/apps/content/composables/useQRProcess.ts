import type { QrCodeInfo } from '@/shared/types'
import { ref } from 'vue'
import { detectQRFromElement, fetchWebsite } from '@/core/services'
import { vaildIsURL } from '@/shared/validators'

export function useQRProcess() {
  const data = ref<QrCodeInfo | null>(null)

  async function detect(element: HTMLElement): Promise<string | null> {
    try {
      return await detectQRFromElement(element)
    } catch (err) {
      console.error('QR detect error:', err)
      return null
    }
  }

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

  async function processQRCode(element: HTMLElement): Promise<boolean> {
    const result = await detect(element)
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

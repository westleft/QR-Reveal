import type { QrCodeInfo } from '@/shared/types'
import { ref } from 'vue'
import { detectQRFromElement, fetchWebsite } from '@/core/services'
import { vaildIsURL } from '@/shared/validators'

export function useQRProcess() {
  const data = ref<QrCodeInfo | null>(null)

  async function processQRCode(element: HTMLElement) {
    try {
      // 檢測 QR 碼
      const result = await detectQRFromElement(element)

      if (!result) {
        return false
      }

      // 判斷是否為 URL
      const isUrl = vaildIsURL(result)

      if (isUrl) {
        // 獲取網站資訊
        const websiteInfo = await fetchWebsite(result)
        data.value = {
          ...websiteInfo,
          type: 'website',
          url: result,
        }
      } else {
        // 純文字內容
        data.value = {
          type: 'text',
          text: result,
        }
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

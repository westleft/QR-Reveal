import { onBeforeMount, ref } from 'vue'
import { notify } from '@/shared/utils'

export function useShare() {
  const isSupportShare = ref(false)

  const vaildSupportShare = () => {
    if ('share' in navigator) {
      isSupportShare.value = true
    }
  }

  const share = async (data: ShareData) => {
    try {
      await navigator.share(data)
      notify('Share successfully')
    } catch (error) {
      console.error('Error sharing:', error)
      notify('Share failed')
    }
  }

  onBeforeMount(() => {
    vaildSupportShare()
  })

  return {
    isSupportShare,
    share,
  }
}

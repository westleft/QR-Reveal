import type { Pinia } from 'pinia'
import type { UpdateContextMenuRequest } from '@/shared/types'
import { setActivePinia } from 'pinia'
import { BackgroundMessageAction } from '@/shared/types'
import { vaildIsImage } from '@/shared/validators'
import { useStore } from '../store'

export function useContextMenu(pinia: Pinia) {
  document.addEventListener('contextmenu', (event) => {
    const element = event.target as HTMLElement
    const isImage = vaildIsImage(element)

    if (isImage) {
      setActivePinia(pinia)
      const store = useStore()
      store.element = element
    }

    chrome.runtime.sendMessage<UpdateContextMenuRequest>({
      action: BackgroundMessageAction.UpdateContextMenu,
      data: {
        show: isImage,
      },
    })
  })
}

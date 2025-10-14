import type { QrCodeInfo } from '@/shared/types'
import dayjs from 'dayjs'
import { onBeforeMount, onUnmounted, ref } from 'vue'

type StorageData = QrCodeInfo & {
  timestamp?: string
}

export function useChromeStorage() {
  const historyData = ref<StorageData[]>([])

  const _createUniqueKey = () => {
    return Date.now().toString()
  }

  const _createTimestamp = () => {
    return dayjs().format('YYYY-MM-DD hh:mm:ss A')
  }

  const getAllStorage = async () => {
    const result = await chrome.storage.local.get<StorageData[]>()
    return result
  }

  const setStorage = (value: StorageData) => {
    const key = _createUniqueKey()
    value.timestamp = _createTimestamp()

    return chrome.storage.local.set({ [key]: value })
  }

  const clearStorage = (key: number) => {
    delete historyData.value[key as keyof typeof historyData.value]
    chrome.storage.local.remove(key)
  }

  const clearAllStorage = () => {
    chrome.storage.local.clear()
    historyData.value = []
  }

  onBeforeMount(async () => {
    const result = await getAllStorage()
    historyData.value = result
  })

  onUnmounted(() => {
    historyData.value = []
  })

  return {
    getAllStorage,
    setStorage,
    clearStorage,
    clearAllStorage,
    historyData,
  }
}

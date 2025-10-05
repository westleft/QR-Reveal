import type { QrCodeInfo } from '@/shared/types'
import dayjs from 'dayjs'

export type StorageData = QrCodeInfo & {
  timestamp?: string
}

export function useChromeStorage() {
  const _createUniqueKey = () => {
    return Date.now().toString()
  }

  const _createTimestamp = () => {
    return dayjs().format('YYYY-MM-DD hh:mm:ss A')
  }

  const getStorage = (key: string) => {
    return chrome.storage.local.get(key)
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
    return chrome.storage.local.remove(key)
  }

  const clearAllStorage = () => {
    return chrome.storage.local.clear()
  }

  return { getStorage, getAllStorage, setStorage, clearStorage, clearAllStorage }
}

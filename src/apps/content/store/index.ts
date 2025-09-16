import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('store', () => {
  const detectTarget = ref<HTMLElement | string | null>(null)

  function setDetectTarget(val: HTMLElement | string) {
    detectTarget.value = val
  }

  return { detectTarget, setDetectTarget }
})

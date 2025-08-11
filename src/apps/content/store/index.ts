import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('store', () => {
  const element = ref<HTMLElement | null>(null)

  return { element }
})

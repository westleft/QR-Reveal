import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('store', () => {
  const data = ref<HTMLElement | null>(null)

  return { data }
})

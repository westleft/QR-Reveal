import { onMounted, ref } from 'vue'

export function useTransition() {
  const isTransitioning = ref(false)

  function handleTransition(value: boolean) {
    isTransitioning.value = value
  }

  onMounted(() => {
    handleTransition(true)
  })

  return {
    isTransitioning,
    handleTransition,
  }
}

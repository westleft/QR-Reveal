import { onMounted, ref } from 'vue'

export function useTransition() {
  const isTransitioning = ref(false)

  function handleTransition(value: boolean) {
    isTransitioning.value = value
  }

  onMounted(() => {
    isTransitioning.value = true
  })

  return {
    isTransitioning,
    handleTransition,
  }
}

import { ref } from 'vue'

export function useModalLoading() {
  const isModalLoading = ref<boolean>(true)

  function setModalLoading(value: boolean) {
    isModalLoading.value = value
  }

  function closeModal() {
    const modal = document.getElementById('qr-code-modal')
    if (modal) {
      modal.remove()
    }
  }

  return {
    isModalLoading,
    setModalLoading,
    closeModal,
  }
}

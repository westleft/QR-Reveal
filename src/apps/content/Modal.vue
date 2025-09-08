<script setup lang="ts">
import { onMounted } from 'vue'
import Loading from '@/shared/components/Loading.vue'
import { notify } from '@/shared/utils'
import Content from './components/Content.vue'
import { useModalLoading, useQRProcess, useTransition } from './composables'
import { useStore } from './store'

const store = useStore()
const { data, processQRCode } = useQRProcess()
const { isModalLoading, setModalLoading, closeModal } = useModalLoading()
const { isTransitioning, handleTransition } = useTransition()

onMounted(async () => {
  const hasQRCode = await processQRCode(store.element as HTMLElement)

  if (hasQRCode) {
    setModalLoading(false)
    return
  }

  handleTransition(false)
  notify(chrome.i18n.getMessage('no_qr_code_found'))
})
</script>

<template>
  <Transition name="fade" @after-leave="closeModal">
    <div v-if="isTransitioning" class="modal" @click.self="handleTransition(false)">
      <div class="modal-content">
        <Loading v-if="isModalLoading" />
        <Content v-else :data="data" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999;
}

.modal-content {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  color: #666;
  overflow: hidden;
  gap: 12px;
  max-width: 600px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import Loading from '@/shared/components/Loading.vue'
import Content from './components/Content.vue'
import { useModalLoading, useQRProcess } from './composables'
import { useStore } from './store'

const store = useStore()
const { data, processQRCode } = useQRProcess()
const { isModalLoading, setModalLoading, closeModal } = useModalLoading()

onBeforeMount(async () => {
  await processQRCode(store.element as HTMLElement)
  setModalLoading(false)
})
</script>

<template>
  <div class="modal" @click.self="closeModal">
    <div class="modal-content">
      <Loading v-if="isModalLoading" />
      <Content v-else :data="data" />
    </div>
  </div>
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
</style>

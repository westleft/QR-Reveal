<script setup lang="ts">
import { onBeforeMount, inject, ref } from 'vue'
import type { QRCodeResult } from '../../utils'

const hasQRCode = inject<QRCodeResult>('hasQRCode')
const websiteTitle = ref<string>('')
const websiteUrl = ref<string>('')
const isLoading = ref<boolean>(false)
const error = ref<string>('')

function closeModal() {
  const modal = document.getElementById('qr-code-modal')
  if (modal) {
    modal.remove()
  }
}

function fetchWebsiteTitle(url: string) {
  chrome.runtime.sendMessage({
    action: 'fetchWebsiteTitle',
    url: url
  })
}

onBeforeMount(async () => {
  const title = await fetchWebsiteTitle(hasQRCode?.data || '')
  console.log('Fetched title:', title)
})

</script>

<template>
  <div @click.self="closeModal" class="modal">
    <div class="modal-content">
      <h1>QR Code Website</h1>
      <div class="website-info">
        <div class="info-item">
          <p><strong>URL:</strong></p>
          <p class="url-text">{{ websiteUrl || 'No URL found' }}</p>
        </div>

        <div v-if="isLoading" class="loading">
          <p>Loading website title...</p>
        </div>

        <div v-else-if="websiteTitle" class="info-item">
          <p><strong>Title:</strong></p>
          <p class="title-text">{{ websiteTitle }}</p>
        </div>

        <div v-if="error" class="error-message">
          <p>{{ error }}</p>
        </div>

      </div>
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
  border-radius: 12px !important;
  padding: 20px;
  color: #666;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.website-info {
  margin-top: 15px;
}

.info-item {
  margin-bottom: 15px;
}

.title-text {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 6px;
  word-break: break-all;
  margin: 5px 0;
  font-weight: 500;
}

.url-text {
  background-color: #f0f8ff;
  padding: 10px;
  border-radius: 6px;
  word-break: break-all;
  margin: 5px 0;
  font-family: monospace;
  font-size: 12px;
}

.loading {
  text-align: center;
  color: #666;
  margin: 15px 0;
}

.error-message {
  color: #dc3545;
  margin-top: 15px;
  background-color: #f8d7da;
  padding: 10px;
  border-radius: 6px;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.copy-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  flex: 1;
}

.copy-btn:hover {
  background-color: #0056b3;
}
</style>
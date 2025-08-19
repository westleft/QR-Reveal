<script setup lang="ts">
import type { QrCodeInfo } from '@/types'
import Toastify from 'toastify-js'
import { onBeforeMount, ref } from 'vue'
import { vaildIsURL } from '@/utils'
import Loading from './components/Loading.vue'
import { useStore } from './store'
import {
  detectQRCodeFromBackgroundImage,
  detectQRCodeFromCanvas,
  detectQRCodeFromImage,
  detectQRCodeFromSvg,
} from './utils/detect'

const { getMessage } = chrome.i18n

const store = useStore()
const data = ref<QrCodeInfo | null>(null)
const isLoading = ref(true)

function closeModal() {
  const modal = document.getElementById('qr-code-modal')
  if (modal) {
    modal.remove()
  }
}

function checkElementType(element: HTMLElement) {
  const tag = element.tagName.toLowerCase()

  if (tag === 'img') {
    return detectQRCodeFromImage(element as HTMLImageElement)
  }
  if (tag === 'canvas') {
    return detectQRCodeFromCanvas(element as HTMLCanvasElement)
  }
  if (tag === 'svg') {
    return detectQRCodeFromSvg(element as unknown as SVGSVGElement)
  }

  return detectQRCodeFromBackgroundImage(element)
}

async function fetchWebsite(url: string) {
  const data = await chrome.runtime.sendMessage({
    action: 'fetchWebsite',
    url,
  })
  return data as QrCodeInfo
}

onBeforeMount(async () => {
  const result = await checkElementType(store.element as HTMLElement)
  if (!result) {
    Toastify({
      text: chrome.i18n.getMessage('no_qr_code_found'),
      duration: 3000,
      gravity: 'top',
      position: 'center',
    }).showToast()
    closeModal()
    return
  }

  const isUrl = vaildIsURL(result)
  if (isUrl) {
    const websiteInfo = await fetchWebsite(result)
    data.value = {
      ...websiteInfo,
      type: 'website',
      url: result,
    }
  } else {
    data.value = {
      type: 'text',
      text: result,
    }
  }

  isLoading.value = false
})
</script>

<template>
  <div
    class="modal"
    @click.self="closeModal"
  >
    <div class="modal-content">
      <div class="modal-info">
        <Loading v-if="isLoading" />
        <!-- <img :src="data?.qrcodeUrl" class="modal-info__qrcode" alt="QR Code Image"> -->
        <a
          v-if="data?.type === 'website'"
          target="_blank"
          class="modal-info__content"
          :href="data?.url"
        >
          <img v-if="data?.image" :src="data?.image" alt="" class="modal-info__image">
          <div v-else class="image__placeholder">
            <p>image not found</p>
          </div>
          <p class="modal-info__title">
            {{ data?.title || 'No title' }}
          </p>
          <p class="modal-info__description">{{ data?.description || 'No description' }}</p>
          <div class="modal-info__btn">
            <button>{{ getMessage('open_in_new_tab') }}</button>
          </div>
        </a>

        <div
          v-if="data?.type === 'text'"
          class="modal-info__content"
        >
          <p class="modal-info__title">
            {{ data?.text || 'No content' }}
          </p>
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
  overflow: hidden;
  gap: 12px;
  max-width: 600px !important;
}

.modal-info {
  display: flex;
  width: 100%;

  .modal-info__content {
    display: flex;
    flex-direction: column;
    gap: 10px !important;
    min-width: 300px;
  }

  .modal-info__qrcode {
    width: 200px;
    height: 200px;
    object-fit: cover;
    object-position: center;
    margin-right: 12px;
  }

  .modal-info__title {
    font-size: 20px;
    font-weight: 600;
    margin: 0px !important;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
  }

  .modal-info__description {
    font-size: 14px;
    color: #666;
    padding: 0px !important;
    margin: 0px !important;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
  }

  .modal-info__image {
    width: 100%;
    height: 140px;
    object-fit: cover;
    object-position: center;
  }

  .modal-info__btn {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 12px;
    button {
      border: none;
      background-color: #000;
      color: #fff;
      padding: 8px 24px !important;
      border-radius: 12px;
      cursor: pointer;
    }
  }
}

.image__placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 140px !important;
  background-color: #f0f0f0;
  border-radius: 12px;
  color: #666 !important;
}
</style>

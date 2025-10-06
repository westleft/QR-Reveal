<script setup lang="ts">
import type { QrCodeInfo } from '@/shared/types'
import { useShare } from '@/shared/composables'
import { copyText } from '@/shared/utils'

const { data } = defineProps<{
  data: QrCodeInfo | null
}>()

const { share, isSupportShare } = useShare()

const { getMessage } = chrome.i18n
</script>

<template>
  <div class="modal-info">
    <div v-if="data?.type === 'website'" class="modal-info__content" :href="data?.url">
      <img v-if="data?.image" :src="data?.image" alt="" class="modal-info__image">
      <div v-else class="image__placeholder">
        <p>image not found</p>
      </div>
      <div class="modal-info__wrapper">
        <p class="modal-info__title">
          {{ data?.title || 'No title' }}
        </p>
        <p class="modal-info__description">
          {{ data?.description || 'No description' }}
        </p>
        <a class="modal-info__btn" target="_blank" :href="data?.url">
          {{ getMessage('open_in_new_tab') }}
        </a>

        <p class="modal-info__url">
          URL
        </p>
        <div class="modal-info__url-wrapper">
          <p class="modal-info__url-text">
            {{ data?.url }}
          </p>
          <div class="modal-info__url-copy" @click="copyText(data?.url || '')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z" /></svg>
          </div>
          <div
            v-if="isSupportShare"
            class="modal-info__share" @click="share({
              title: data?.title || 'No title',
              text: data?.url || 'No url',
              url: data?.url || 'No url',
            })"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path d="M448 256C501 256 544 213 544 160C544 107 501 64 448 64C395 64 352 107 352 160C352 165.4 352.5 170.8 353.3 176L223.6 248.1C206.7 233.1 184.4 224 160 224C107 224 64 267 64 320C64 373 107 416 160 416C184.4 416 206.6 406.9 223.6 391.9L353.3 464C352.4 469.2 352 474.5 352 480C352 533 395 576 448 576C501 576 544 533 544 480C544 427 501 384 448 384C423.6 384 401.4 393.1 384.4 408.1L254.7 336C255.6 330.8 256 325.5 256 320C256 314.5 255.5 309.2 254.7 304L384.4 231.9C401.3 246.9 423.6 256 448 256z" /></svg>
          </div>
        </div>
      </div>
    </div>

    <div v-if="data?.type === 'text'" class="modal-info__text">
      <h3 class="modal-info__text-title">
        {{ getMessage('content_copy_text_title') }}
      </h3>
      <p class="modal-info__text-description">
        {{ getMessage('content_copy_text_description') }}
      </p>
      <p class="modal-info__text-content">
        {{ data?.text || 'No content' }}
      </p>
      <div class="modal-btns">
        <div class="modal-btn" @click="copyText(data?.text || '')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="#137fec" viewBox="0 0 448 512"><path d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z" /></svg>
          <p class="modal-btn">
            {{ getMessage('content_copy_text') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-info {
  display: flex;
  width: 100%;

  ::selection {
    color: white;
    background: #007bff;
  }

  .modal-info__content {
    display: flex;
    flex-direction: column;
    width: 480px;
  }

  .modal-info__image {
    width: 100%;
    height: 180px;
    object-fit: contain;
    object-position: center;
  }

  .image__placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 140px !important;
    background-color: #f0f0f0;
    color: #666 !important;
  }

  .modal-info__wrapper {
    padding: 20px;
  }

  .modal-info__title {
    font-size: 20px;
    font-weight: 600;
    margin: 0px !important;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: normal;
    margin-bottom: 12px !important;
  }

  .modal-info__description {
    font-size: 14px;
    color: #666;
    padding: 0px !important;
    margin: 0px !important;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    white-space: normal;
    margin-bottom: 20px !important;
  }

  .modal-info__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #5080e1;
    color: #fff;
    padding: 12px 24px !important;
    text-align: center;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
    font-size: 16px;
    transition: 0.2s;
    margin-bottom: 20px !important;
    &:hover {
      background-color: #4070d1;
    }
  }

  .modal-info__url {
    color: #666;
    margin: 0 0 4px 0;
    font-size: 14px;
  }

  .modal-info__url-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    gap: 4px;
    font-size: 14px;
    color: #666;
    overflow: hidden;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    padding: 4px 12px;

    .modal-info__url-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      margin-right: 60px;
      ::selection {
        color: white;
        background: #007bff;
      }
    }

    .modal-info__share {
      width: 20px;
      height: 20px;
      position: absolute;
      right: 40px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;

      svg {
        width: 90%;
        opacity: 0.8;
      }
    }

    .modal-info__url-copy {
      width: 20px;
      height: 20px;
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      background-color: #fff;

      svg {
        width: 80%;
        opacity: 0.8;
      }
    }
  }
}

.modal-info__text {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  width: 480px;

  .modal-info__text-title {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 12px 0;
  }

  .modal-info__text-content {
    font-size: 14px;
    color: #666;
    margin: 0 0 20px 0;
    border: 1px solid #e0e0e0;
    padding: 12px;
    border-radius: 8px;
    word-break: break-all;
    overflow: auto;
    max-height: 200px;
    line-height: 140%;
    scrollbar-width: thin !important;
    scrollbar-color: #999 #f5f5f5 !important;
  }

  .modal-btns {
    display: flex;
    justify-content: flex-end;
    gap: 12px;

    .modal-btn {
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      font-size: 14px;
      color: #137fec;
      background-color: #dfeaf6;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;

      p {
        margin: 0;
        padding: 0;
      }

      svg {
        color: #137fec;
        width: 16px;
        opacity: 0.8;
        margin-right: 4px;
      }
    }
  }

  .modal-info__text-description {
    font-size: 14px;
    color: #666;
    margin: 0px !important;
  }
}
</style>

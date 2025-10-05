<script setup lang="ts">
import type { StorageData } from '@/shared/composables'
import { onBeforeMount, ref } from 'vue'
import { useChromeStorage, useShare } from '@/shared/composables'
import { copyText } from '@/shared/utils'
import '@/assets/style/reset.css'

const { getMessage } = chrome.i18n
const { getAllStorage, clearAllStorage, clearStorage } = useChromeStorage()
const { isSupportShare, share } = useShare()
const history = ref<StorageData[]>([])

function clearAllHistory() {
  clearAllStorage()
  history.value = []
}

function clearHistory(timestamp: number) {
  clearStorage(timestamp)
  delete history.value[timestamp as keyof typeof history.value]
}

onBeforeMount(async () => {
  chrome.tabs.onActivated.addListener(() => window.close())
  const result = await getAllStorage()
  history.value = result
})
</script>

<template>
  <div id="qr-side-panel">
    <div class="panel-title">
      <h1>
        <img src="@/assets/images/icon.png" alt="logo">
        {{ getMessage('side_panel_title') }}
      </h1>
      <button @click="clearAllHistory">
        {{ getMessage('side_panel_clear_all_history') }}
      </button>
    </div>
    <TransitionGroup name="list" tag="ul" class="panel-list">
      <li v-for="(item, key) in history" :key="key" class="panel-list__item">
        <a v-if="item.type === 'website'" class="link-wrapper" target="_blank" href="https://www.google.com">
          <svg class="link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M119.7 263.7L150.6 294.6C156.6 300.6 164.7 304 173.2 304L194.7 304C203.2 304 211.3 307.4 217.3 313.4L246.6 342.7C252.6 348.7 256 356.8 256 365.3L256 402.8C256 411.3 259.4 419.4 265.4 425.4L278.7 438.7C284.7 444.7 288.1 452.8 288.1 461.3L288.1 480C288.1 497.7 302.4 512 320.1 512C337.8 512 352.1 497.7 352.1 480L352.1 477.3C352.1 468.8 355.5 460.7 361.5 454.7L406.8 409.4C412.8 403.4 416.2 395.3 416.2 386.8L416.2 352.1C416.2 334.4 401.9 320.1 384.2 320.1L301.5 320.1C293 320.1 284.9 316.7 278.9 310.7L262.9 294.7C258.7 290.5 256.3 284.7 256.3 278.7C256.3 266.2 266.4 256.1 278.9 256.1L313.6 256.1C326.1 256.1 336.2 246 336.2 233.5C336.2 227.5 333.8 221.7 329.6 217.5L309.9 197.8C306 194 304 189.1 304 184C304 178.9 306 174 309.7 170.3L327 153C332.8 147.2 336.1 139.3 336.1 131.1C336.1 123.9 333.7 117.4 329.7 112.2C326.5 112.1 323.3 112 320.1 112C224.7 112 144.4 176.2 119.8 263.7zM528 320C528 285.4 519.6 252.8 504.6 224.2C498.2 225.1 491.9 228.1 486.7 233.3L473.3 246.7C467.3 252.7 463.9 260.8 463.9 269.3L463.9 304C463.9 321.7 478.2 336 495.9 336L520 336C522.5 336 525 335.7 527.3 335.2C527.7 330.2 527.8 325.1 527.8 320zM64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320z" /></svg>

          <div class="link-content">
            <h3>{{ item.title || 'No title' }}</h3>
            <p>{{ item.url || 'No url' }}</p>
            <p>{{ item.timestamp }}</p>
          </div>

          <div class="link-actions">
            <svg
              v-if="isSupportShare"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              @click.stop.prevent="share({
                title: item.title || 'No title',
                text: item.url || 'No url',
                url: item.url || 'No url',
              })"
            >
              <path d="M448 256C501 256 544 213 544 160C544 107 501 64 448 64C395 64 352 107 352 160C352 165.4 352.5 170.8 353.3 176L223.6 248.1C206.7 233.1 184.4 224 160 224C107 224 64 267 64 320C64 373 107 416 160 416C184.4 416 206.6 406.9 223.6 391.9L353.3 464C352.4 469.2 352 474.5 352 480C352 533 395 576 448 576C501 576 544 533 544 480C544 427 501 384 448 384C423.6 384 401.4 393.1 384.4 408.1L254.7 336C255.6 330.8 256 325.5 256 320C256 314.5 255.5 309.2 254.7 304L384.4 231.9C401.3 246.9 423.6 256 448 256z" /></svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              @click.stop.prevent="clearHistory(key)"
            ><path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" /></svg>
          </div>
        </a>
        <div v-else class="link-wrapper" @click="copyText(item.text || '')">
          <svg class="link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 240 336 229.3 336 216L336 122.5L453.5 240z" /></svg>

          <div class="link-content">
            <h3 class="text">
              {{ item.text || 'No text' }}
            </h3>
            <p>{{ item.timestamp }}</p>
          </div>

          <div class="link-actions">
            <svg
              v-if="isSupportShare"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              @click.stop.prevent="share({
                title: item.text || 'No title',
                text: item.text || 'No text',
              })"
            >
              <path d="M448 256C501 256 544 213 544 160C544 107 501 64 448 64C395 64 352 107 352 160C352 165.4 352.5 170.8 353.3 176L223.6 248.1C206.7 233.1 184.4 224 160 224C107 224 64 267 64 320C64 373 107 416 160 416C184.4 416 206.6 406.9 223.6 391.9L353.3 464C352.4 469.2 352 474.5 352 480C352 533 395 576 448 576C501 576 544 533 544 480C544 427 501 384 448 384C423.6 384 401.4 393.1 384.4 408.1L254.7 336C255.6 330.8 256 325.5 256 320C256 314.5 255.5 309.2 254.7 304L384.4 231.9C401.3 246.9 423.6 256 448 256z" /></svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              @click.stop="clearHistory(key)"
            ><path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" /></svg>
          </div>
        </div>
      </li>
    </TransitionGroup>

    <div v-if="history.length === 0" class="panel-list-empty">
      <img src="@/assets/images/icon.png" alt="logo">
      <p>No Scan History</p>
    </div>
  </div>
</template>

<style scoped>
#qr-side-panel {
  padding: 12px;
  font-family: "Noto Sans TC";
  overflow-x: hidden;
}

.panel-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 0 16px 0;
  border-bottom: 1px solid #dddddd;
  margin-bottom: 16px;

  h1 {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    font-size: 20px;
    font-weight: 800;
    color: #333333;
    img {
      width: 28px;
    }
  }
  button {
    background-color: #5080e1;
    color: #ffffff;
    padding: 8px 16px;
    border-radius: 40px;
    border: none;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
  }
}

.panel-list {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  list-style: none;

  .panel-list__item {
    position: relative;
    width: 100%;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      background-color: #ededed;
    }

    .link-wrapper {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      text-decoration: none;
      color: #333333;
      padding: 12px 8px;
      cursor: pointer;

      .link-icon {
        width: 28px;
        opacity: 0.8;
        path {
          fill: rgb(55, 121, 243);
        }
      }

      .link-content {
        width: 75%;
        h3 {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
          &.text {
            -webkit-line-clamp: 3;
            line-height: 140%;
          }
        }

        p {
          font-size: 14px;
          color: #666666;
          margin-bottom: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }

      .link-actions {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        svg {
          width: 20px;
          opacity: 0.8;
        }
      }
    }
  }
}

.panel-list-empty {
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  img {
    width: 64px;
  }
  p {
    font-size: 20px;
    font-weight: 600;
    color: #666666;
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

<script setup lang="ts">
import { ref } from 'vue'

const qrResults = ref<Array<{content: string, timestamp: Date}>>([])
const isDetecting = ref(false)

// 模擬 QR 碼檢測
const detectQRCode = async () => {
  isDetecting.value = true
  
  // 模擬檢測延遲
  setTimeout(() => {
    const mockContent = 'https://example.com/qr-code-' + Date.now()
    qrResults.value.unshift({
      content: mockContent,
      timestamp: new Date()
    })
    isDetecting.value = false
  }, 2000)
}

const copyToClipboard = async (content: string) => {
  try {
    await navigator.clipboard.writeText(content)
    alert('已複製到剪貼簿')
  } catch (err) {
    console.error('複製失敗:', err)
  }
}
</script>

<template>
  <div class="qr-reveal-app">
    <header>
      <h1>🔍 QR Reveal</h1>
      <p>右鍵點擊網頁上的圖片來偵測 QR 碼</p>
    </header>
    
    <main>
      <div class="detection-section">
        <button 
          @click="detectQRCode" 
          :disabled="isDetecting"
          class="detect-btn"
        >
          {{ isDetecting ? '檢測中...' : '手動檢測 QR 碼' }}
        </button>
      </div>
      
      <div class="results-section" v-if="qrResults.length > 0">
        <h3>檢測結果</h3>
        <div class="result-list">
          <div 
            v-for="(result, index) in qrResults" 
            :key="index"
            class="result-item"
          >
            <div class="result-content">
              <span class="content-text">{{ result.content }}</span>
              <span class="timestamp">{{ result.timestamp.toLocaleTimeString() }}</span>
            </div>
            <button 
              @click="copyToClipboard(result.content)"
              class="copy-btn"
            >
              複製
            </button>
          </div>
        </div>
      </div>
      
      <div class="instructions" v-else>
        <h3>使用說明</h3>
        <ol>
          <li>在網頁上找到包含 QR 碼的圖片</li>
          <li>右鍵點擊圖片</li>
          <li>選擇「偵測 QR 碼」選項</li>
          <li>查看檢測結果</li>
        </ol>
      </div>
    </main>
  </div>
</template>

<style scoped>
.qr-reveal-app {
  width: 350px;
  min-height: 400px;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

header {
  text-align: center;
  margin-bottom: 20px;
}

header h1 {
  margin: 0 0 8px 0;
  font-size: 24px;
  color: #333;
}

header p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.detection-section {
  margin-bottom: 20px;
}

.detect-btn {
  width: 100%;
  padding: 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.detect-btn:hover:not(:disabled) {
  background: #0056b3;
}

.detect-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.results-section h3,
.instructions h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #333;
}

.result-list {
  max-height: 200px;
  overflow-y: auto;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 8px;
  background: #f8f9fa;
  border-radius: 4px;
  border-left: 3px solid #007bff;
}

.result-content {
  flex: 1;
  margin-right: 10px;
}

.content-text {
  display: block;
  font-size: 12px;
  color: #333;
  word-break: break-all;
  margin-bottom: 4px;
}

.timestamp {
  font-size: 10px;
  color: #666;
}

.copy-btn {
  padding: 4px 8px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 3px;
  font-size: 11px;
  cursor: pointer;
}

.copy-btn:hover {
  background: #218838;
}

.instructions ol {
  margin: 0;
  padding-left: 20px;
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}

.instructions li {
  margin-bottom: 8px;
}
</style>

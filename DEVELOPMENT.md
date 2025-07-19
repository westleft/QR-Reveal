# Chrome Extension 開發指南

## 快速開始

### 1. 安裝依賴
```bash
pnpm install
```

### 2. 開發模式（支持熱更新）
```bash
pnpm run dev:extension
```

### 3. 構建生產版本
```bash
pnpm run build:extension
```

## 開發流程

### 熱更新開發
1. 運行 `pnpm run dev:extension`
2. 打開 Chrome 瀏覽器
3. 進入 `chrome://extensions/`
4. 開啟「開發者模式」
5. 點擊「載入未封裝項目」
6. 選擇項目的 `dist` 目錄
7. 現在你可以在 `src` 目錄中修改代碼，變更會自動重新載入

### 文件結構
- `src/App.vue` - 主要的 Vue 組件（popup 界面）
- `src/content.ts` - Content script（在網頁中執行）
- `src/main.ts` - 應用入口點
- `manifest.json` - Chrome Extension 配置
- `vite.config.ts` - Vite 構建配置

### 開發技巧
- 修改 Vue 組件會自動熱更新
- 修改 content script 需要重新載入 extension
- 使用 Chrome DevTools 調試 popup 和 content script
- 在 `chrome://extensions/` 頁面可以查看錯誤日誌

## 注意事項
- 確保 manifest.json 中的權限設置正確
- Content script 只能訪問網頁 DOM，不能訪問 extension 的其他部分
- 使用 `chrome.runtime.sendMessage` 在 popup 和 content script 之間通信 
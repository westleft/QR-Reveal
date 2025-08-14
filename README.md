# QR Reveal - Chrome Extension

![](https://lh3.googleusercontent.com/eN_V7CsXSkUdgfbaDC2Sqa8te6pOKNMwLsQW5CKXDORt05ftLKkUyKylXJcWc19QDBVnNQDZe43vtT4Is2S-OBZM3g)

一個用於檢測和顯示網頁中 QR 碼的 Chrome Extension。

安裝連結：[點我](https://chromewebstore.google.com/detail/%E6%8E%83%E7%A2%BC%E5%BF%AB%E8%AE%80-qr-reveal/mkgfigepghcfkgnhlpjlijodchlohhep)

## 技術棧

- Vue 3 + TypeScript + Vite
- Chrome Extension Manifest V3
- 熱更新開發環境

## 快速開始

### 安裝依賴
```bash
pnpm install
```

### 開發模式（支持熱更新）
```bash
pnpm run dev:extension
```

### 構建生產版本
```bash
pnpm run build:extension
```

## 開發指南

詳細的開發指南請參考 [DEVELOPMENT.md](./DEVELOPMENT.md)

## 功能特性

- 🔍 自動檢測網頁中的 QR 碼
- 🖱️ 點擊顯示 QR 碼內容
- ⚡ 熱更新開發環境
- 🎨 現代化的 Vue 3 界面

## github action 測試

```shell
act release -e .github/test_events/release_event.json
```

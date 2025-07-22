// /// <reference types="chrome"/>

// // Chrome Extension 消息類型
// export interface ChromeMessage<T = any> {
//   action: string;
//   data?: T;
// }

// // QR Code 檢測相關類型
// export interface QRCodeResult {
//   success: boolean;
//   data?: string;
//   error?: string;
// }

// // 網站信息類型
// export interface WebsiteInfo {
//   title?: string;
//   description?: string;
//   image?: string;
// }

// // 消息動作類型
// export type MessageAction =
//   | 'vaildQRCode'
//   | 'openModal'
//   | 'fetchWebsiteTitle'
//   | 'qrCodeDetected';

// // 擴展 Chrome API 類型
// declare global {
//   interface Window {
//     chrome: typeof chrome;
//   }
// }

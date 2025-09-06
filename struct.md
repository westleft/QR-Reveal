src/
├── core/                    # 核心業務邏輯
│   ├── services/           # 純函數服務
│   │   ├── qr-detection.ts
│   │   ├── website-fetching.ts
│   │   └── image-processing.ts
│   ├── domain/             # 領域模型
│   │   ├── qr-code.ts
│   │   └── website-info.ts
│   └── ports/              # 介面定義
│       ├── qr-detector.port.ts
│       └── message.port.ts
├── shared/                 # 共享模組
│   ├── utils/             # 純函數工具
│   ├── constants/         # 常數定義
│   ├── types/            # 型別定義
│   ├── validators/       # 驗證函數
│   └── fp/               # FP 工具函數
│       ├── pipe.ts
│       ├── compose.ts
│       └── either.ts
├── apps/                  # 應用程式入口
│   ├── background/
│   ├── content/
│   └── popup/
└── assets/               # 靜態資源

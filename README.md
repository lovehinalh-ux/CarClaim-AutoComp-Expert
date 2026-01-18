# 車禍求償小幫手 (Car Claim Expert)

功能強大的車禍賠償清單試算工具，協助使用者快速計算並產製專業的求償文件。

## 🎯 專案功能

*   **求償項目試算**：即時計算醫療費、維修費、財物損失、精神慰撫金等九大類別。
*   **醫療明細管理**：獨立的醫療費用輸入介面，支援多筆記錄與自動加總。
*   **專業 PDF 產製**：一鍵生成排版精美的 PDF 求償清單，方便列印或傳送。
*   **響應式設計**：完美支援手機、平板與桌機操作。
*   **隱私保護**：所有數據僅在瀏覽器端運算，不儲存任何個人資料。

## 🚀 快速開始

### 環境需求

*   Node.js 20+
*   npm

### 安裝專案

1.  複製專案到本地端：
    ```bash
    git clone https://github.com/your-username/car-claim-autocomp-expert.git
    cd car-claim-autocomp-expert
    ```

2.  安裝依賴套件：
    ```bash
    npm install
    ```

### 環境變數設定

複製範本檔案並根據需求調整：

```bash
cp .env.example .env
```

### 啟動開發伺服器

```bash
npm run dev
```

瀏覽器打開 `http://localhost:3000` 即可看到畫面。

## 🛠️ 開發指令

*   `npm run dev`: 啟動開發伺服器
*   `npm run build`: 建置生產環境版本 (產出位於 `dist/`)
*   `npm run lint`: 執行程式碼檢查 (包含 ESLint 與 Security 規則)
*   `npm run preview`: 預覽建置後的版本

## 📦 部署

本專案已設定 GitHub Actions 自動化部署流程。

1.  將程式碼推送到 GitHub 的 `main` 分支。
2.  GitHub Actions 會自動執行安裝、測試與建置。
3.  建置完成的檔案將自動部署至 GitHub Pages (需在 Repo Settings > Pages 中將 Source 設定為 `gh-pages` 分支)。

## 🔒 安全性說明

*   本專案定期執行 `npm audit` 確保依賴套件安全。
*   已配置 `eslint-plugin-security` 進行靜態代碼分析。
*   敏感資料 (如 API Keys) 請務必放在 `.env` 檔案中，切勿提交到版控系統。

## 授權

MIT License

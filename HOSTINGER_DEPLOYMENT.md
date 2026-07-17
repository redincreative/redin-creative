# Hostinger 部署指南

## 概述
Redin Creative 是一個全端 Node.js 應用（React 19 + Express 4 + tRPC 11 + MySQL），已優化用於 Hostinger 部署。

## 前置需求
- Hostinger 帳戶（推薦使用 Premium 或更高級別的主機方案）
- Node.js 18+ 和 pnpm 10.15.1+
- MySQL 資料庫（Hostinger 通常提供）
- GitHub 帳戶（用於自動部署）

## 部署步驟

### 1. 修復 pnpm 版本衝突（已完成 ✅）
- `package.json` 中的 `packageManager` 已更新至 `pnpm@10.15.1`
- `.pnpmfile.cjs` 已建立以遷移 pnpm 配置
- 這解決了之前的 Hostinger 部署失敗問題

### 2. 環境變數配置

在 Hostinger 的部署環境中設定以下環境變數：

```bash
# 資料庫
DATABASE_URL=mysql://username:password@localhost:3306/redin_creative

# OAuth & 認證
JWT_SECRET=your-jwt-secret-key
VITE_APP_ID=your-manus-app-id
OAUTH_SERVER_URL=https://oauth.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im

# Manus 內建 API
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=your-forge-api-key
VITE_FRONTEND_FORGE_API_KEY=your-frontend-forge-api-key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im

# 應用配置
OWNER_NAME=Your Name
OWNER_OPEN_ID=your-open-id
VITE_APP_TITLE=Redin Creative 紅人創
VITE_APP_LOGO=https://your-domain.com/logo.png

# 分析
VITE_ANALYTICS_ENDPOINT=https://analytics.manus.im
VITE_ANALYTICS_WEBSITE_ID=your-website-id
```

### 3. 建置與部署

#### 選項 A：使用 Hostinger 的 Git 部署（推薦）

1. 在 Hostinger 控制面板中連接 GitHub 倉庫
2. 設定分支為 `main`
3. 設定建置命令：
   ```bash
   pnpm install && pnpm build
   ```
4. 設定啟動命令：
   ```bash
   NODE_ENV=production node dist/index.js
   ```
5. 設定 Node.js 版本為 18 或更高

#### 選項 B：手動部署

1. 克隆倉庫：
   ```bash
   git clone https://github.com/redincreative/redin-creative.git
   cd redin-creative
   ```

2. 安裝依賴：
   ```bash
   pnpm install
   ```

3. 建置應用：
   ```bash
   pnpm build
   ```

4. 推送 `dist/` 目錄到 Hostinger

5. 在 Hostinger 上啟動應用：
   ```bash
   NODE_ENV=production node dist/index.js
   ```

### 4. 資料庫遷移

首次部署時，執行資料庫遷移：

```bash
pnpm db:push
```

此命令將：
- 生成 Drizzle 遷移文件
- 應用所有遷移到 MySQL 資料庫

### 5. 驗證部署

部署完成後，驗證以下功能：

- [ ] 主頁加載正常
- [ ] 暗/亮色模式切換正常
- [ ] AI 企劃產生器可正常調用 Gemini API
- [ ] ROI 計算器正常運作
- [ ] 聯繫表單可提交並存入資料庫
- [ ] 所有 SEO Meta 標籤正確設定
- [ ] 圖片和資源加載正常

### 6. 故障排除

#### 問題：pnpm 版本衝突
**解決方案：** 確保 `package.json` 中的 `packageManager` 為 `pnpm@10.15.1`

#### 問題：資料庫連接失敗
**解決方案：** 
- 驗證 `DATABASE_URL` 格式正確
- 確保 MySQL 服務正在運行
- 檢查防火牆設定允許連接

#### 問題：API 調用失敗
**解決方案：**
- 驗證所有環境變數已正確設定
- 檢查 API 端點的有效性
- 查看應用日誌了解詳細錯誤信息

#### 問題：建置失敗
**解決方案：**
- 清除 `node_modules` 和 `pnpm-lock.yaml`
- 重新執行 `pnpm install`
- 檢查 Node.js 版本是否為 18+

### 7. 效能優化

- 啟用 Gzip 壓縮
- 配置 CDN 用於靜態資源
- 設定適當的快取策略
- 監控資料庫查詢效能

### 8. 監控與日誌

- 在 Hostinger 控制面板中設定應用日誌
- 監控錯誤率和性能指標
- 定期檢查資料庫備份

## 支援資源

- [Hostinger 文檔](https://support.hostinger.com/)
- [Node.js 部署最佳實踐](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [Drizzle ORM 文檔](https://orm.drizzle.team/)
- [tRPC 文檔](https://trpc.io/)

## 聯繫支援

如遇到部署問題，請聯繫 Hostinger 支援或查看應用日誌以獲取詳細錯誤信息。

# Hostinger 部署檢查清單

## 部署前準備

### 1. Hostinger 帳戶設定
- [ ] 登入 Hostinger 帳戶
- [ ] 確認主機方案為 Premium 或更高級別
- [ ] 確認 Node.js 版本支援 18+
- [ ] 建立 MySQL 資料庫

### 2. GitHub 連接
- [ ] 倉庫已推送到 https://github.com/redincreative/redin-creative
- [ ] 倉庫設為 Public
- [ ] GitHub Personal Access Token 已生成（具有 `repo` 權限）

### 3. 環境變數準備
- [ ] 複製 `.env.hostinger.example` 為 `.env`
- [ ] 填入所有必需的環境變數
- [ ] 驗證 `DATABASE_URL` 格式正確
- [ ] 驗證所有 API 金鑰有效

## 部署步驟

### 1. Git 部署配置
- [ ] 在 Hostinger 控制面板連接 GitHub 倉庫
- [ ] 選擇分支：`main`
- [ ] 設定建置命令：`pnpm install && pnpm build`
- [ ] 設定啟動命令：`NODE_ENV=production node dist/index.js`
- [ ] 設定 Node.js 版本：18 或更高

### 2. 環境變數配置
- [ ] 在 Hostinger 部署設定中新增所有環境變數
- [ ] 驗證敏感資訊（API 金鑰、密碼）已正確設定
- [ ] 確認 `NODE_ENV=production`

### 3. 資料庫設定
- [ ] MySQL 資料庫已建立
- [ ] 資料庫使用者已建立並授予權限
- [ ] `DATABASE_URL` 指向正確的資料庫
- [ ] 防火牆允許應用連接資料庫

### 4. 首次部署
- [ ] 觸發 Hostinger 的自動部署
- [ ] 監控建置日誌，確保無錯誤
- [ ] 等待應用啟動完成
- [ ] 驗證應用在 Hostinger 域名上可訪問

### 5. 資料庫遷移
- [ ] 通過 SSH 連接到 Hostinger
- [ ] 執行 `pnpm db:push` 進行資料庫遷移
- [ ] 驗證所有表格已正確建立

## 部署後驗證

### 功能測試
- [ ] 主頁在 https://your-domain.com 加載正常
- [ ] 暗/亮色模式切換正常
- [ ] 所有導航連結正常工作
- [ ] 圖片和資源正常加載

### 互動功能測試
- [ ] AI 企劃產生器可正常調用 Gemini API
- [ ] ROI 計算器滑塊正常運作
- [ ] 聯繫表單可提交
- [ ] 提交的諮詢記錄已存入資料庫

### SEO & 性能測試
- [ ] 所有 Meta 標籤正確設定（檢查頁面源碼）
- [ ] Schema.org JSON-LD 結構正確
- [ ] `robots.txt` 和 `sitemap.xml` 可訪問
- [ ] `llms.txt` 可訪問（用於 AI 爬蟲）

### 安全性檢查
- [ ] HTTPS 已啟用
- [ ] 敏感資訊未洩露到日誌
- [ ] 資料庫連接使用安全憑證
- [ ] API 金鑰未在前端代碼中硬編碼

## 常見問題解決

### 建置失敗
```bash
# 檢查 pnpm 版本
pnpm --version  # 應為 10.15.1+

# 清除快取並重新安裝
rm -rf node_modules pnpm-lock.yaml
pnpm install

# 驗證建置
pnpm build
```

### 資料庫連接失敗
```bash
# 驗證 DATABASE_URL 格式
# mysql://username:password@host:port/database

# 測試連接
mysql -h host -u username -p database
```

### API 調用失敗
- 驗證所有環境變數已設定
- 檢查 API 端點可訪問性
- 查看應用日誌了解詳細錯誤

### 應用無法啟動
- 檢查 Node.js 版本是否為 18+
- 驗證 `dist/index.js` 存在
- 查看 Hostinger 應用日誌

## 監控與維護

### 日誌監控
- [ ] 定期檢查 Hostinger 應用日誌
- [ ] 監控錯誤率和異常
- [ ] 設定日誌告警

### 性能監控
- [ ] 監控頁面加載時間
- [ ] 監控資料庫查詢性能
- [ ] 監控 API 響應時間

### 備份與恢復
- [ ] 啟用 Hostinger 自動備份
- [ ] 定期測試備份恢復流程
- [ ] 保留至少 7 天的備份

## 後續優化

### 性能優化
- [ ] 啟用 Gzip 壓縮
- [ ] 配置 CDN 用於靜態資源
- [ ] 實施快取策略
- [ ] 優化資料庫查詢

### 安全加固
- [ ] 啟用 WAF（Web Application Firewall）
- [ ] 配置 DDoS 防護
- [ ] 定期更新依賴
- [ ] 進行安全審計

### 可擴展性規劃
- [ ] 監控資源使用情況
- [ ] 計劃升級主機方案
- [ ] 考慮使用 CDN
- [ ] 評估負載均衡需求

## 支援資源

- [Hostinger 文檔](https://support.hostinger.com/)
- [Node.js 最佳實踐](https://nodejs.org/en/docs/guides/)
- [MySQL 文檔](https://dev.mysql.com/doc/)
- [Drizzle ORM 指南](https://orm.drizzle.team/)

---

**部署日期：** _______________  
**部署人員：** _______________  
**部署狀態：** ☐ 成功 ☐ 待完成 ☐ 失敗  
**備註：** _______________________________________________

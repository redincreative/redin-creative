FROM node:22-alpine

WORKDIR /usr/src/app

# 複製 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# 安裝 pnpm
RUN npm install -g pnpm

# 預先下載依賴（可選，用於快取）
RUN pnpm fetch || true

# 複製整個項目
COPY . .

# 安裝依賴，跳過 build scripts 檢查
RUN CI=true pnpm install --prefer-offline --prod=false --ignore-scripts

# 建置應用
RUN pnpm build

# 暴露端口
EXPOSE 3000

# 啟動應用
CMD ["node", "dist/index.js"]

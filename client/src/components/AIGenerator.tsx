import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Sparkles, Loader2, RefreshCw, Copy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const industries = [
  { id: "tech", label: "科技", labelEn: "Technology" },
  { id: "fashion", label: "時尚餐飲", labelEn: "Fashion & F&B" },
  { id: "finance", label: "金融", labelEn: "Finance" },
  { id: "startup", label: "新創", labelEn: "Startup" },
  { id: "beauty", label: "美妝護膚", labelEn: "Beauty" },
  { id: "health", label: "健康保健", labelEn: "Health" },
  { id: "realestate", label: "地產", labelEn: "Real Estate" },
  { id: "education", label: "教育", labelEn: "Education" },
  { id: "travel", label: "旅遊", labelEn: "Travel" },
  { id: "ecommerce", label: "電商", labelEn: "E-commerce" },
];

const objectives = [
  { id: "brand", label: "品牌建立", labelEn: "Brand Building" },
  { id: "crisis", label: "危機處理", labelEn: "Crisis Management" },
  { id: "exposure", label: "產品曝光", labelEn: "Product Exposure" },
  { id: "conversion", label: "受眾轉化", labelEn: "Audience Conversion" },
];

// Offline fallback templates
const fallbackPlans: Record<string, Record<string, any>> = {
  tech: {
    brand: {
      theme: "「科技賦能・未來已來」品牌建立計劃",
      audience: "25-45 歲科技愛好者、企業決策者、早期採用者",
      prAxis: "以「技術創新引領行業變革」為核心敘事，建立品牌技術領導力形象",
      phases: [
        "第一階段（1-2 週）：KOL 科技評測矩陣啟動，在小紅書/YouTube 發佈深度評測內容",
        "第二階段（3-4 週）：舉辦線上科技論壇，邀請行業領袖背書，媒體專訪報導",
        "第三階段（5-8 週）：用戶 UGC 活動引爆，打造品牌社群生態，持續口碑沉澱",
      ],
      expectedResults: "品牌認知度提升 200%，社交媒體粉絲增長 150%，媒體曝光量達 1000 萬+",
    },
    exposure: {
      theme: "「全網引爆・科技新品首發」曝光計劃",
      audience: "18-35 歲數碼原住民、科技媒體從業者、極客社群",
      prAxis: "以「顛覆性產品體驗」為傳播核心，製造社交話題與討論熱度",
      phases: [
        "第一階段（1-2 週）：懸念式預熱，在各平台釋放產品線索，引發猜測討論",
        "第二階段（3-4 週）：KOL 開箱矩陣 + 直播首發，搭配限時優惠引流電商",
        "第三階段（5-6 週）：用戶口碑擴散，素人 KOC 真實體驗分享，長尾流量收割",
      ],
      expectedResults: "首發日曝光量突破 5000 萬，電商搜索量增長 500%，首周銷量超預期 200%",
    },
  },
  fashion: {
    brand: {
      theme: "「潮流定義者・品味新標準」品牌塑造計劃",
      audience: "20-35 歲都市時尚人群、美食愛好者、生活方式追求者",
      prAxis: "以「引領潮流生活方式」為品牌主張，建立時尚品味標桿",
      phases: [
        "第一階段（1-2 週）：時尚 KOL 穿搭/探店內容矩陣，小紅書種草引爆",
        "第二階段（3-4 週）：聯名限定活動 + 線下快閃店，製造稀缺感與話題",
        "第三階段（5-8 週）：品牌自有內容沉澱，建立忠實粉絲社群，持續轉化",
      ],
      expectedResults: "品牌搜索量增長 300%，社交互動率提升至 12%+，月銷售額增長 180%",
    },
  },
  finance: {
    brand: {
      theme: "「穩健致遠・智慧理財」品牌信任計劃",
      audience: "30-55 歲中高收入專業人士、企業主、投資者",
      prAxis: "以「專業可信賴的財富管理夥伴」為品牌定位，強化專業形象與信任感",
      phases: [
        "第一階段（1-3 週）：財經 KOL 專業內容背書，權威媒體專訪報導",
        "第二階段（4-6 週）：線上投資講座系列，建立思想領導力",
        "第三階段（7-10 週）：客戶成功案例傳播，口碑裂變獲客",
      ],
      expectedResults: "品牌信任度指數提升 85%，高淨值客戶諮詢量增長 250%，AUM 增長 30%",
    },
  },
  startup: {
    brand: {
      theme: "「從 0 到 1・創業品牌加速」計劃",
      audience: "22-40 歲創業者、投資人、科技從業者、早期用戶",
      prAxis: "以「解決真實痛點的創新方案」為核心故事，快速建立市場認知",
      phases: [
        "第一階段（1-2 週）：創始人 IP 打造，在 LinkedIn/小紅書分享創業故事",
        "第二階段（3-4 週）：產品體驗官招募，種子用戶口碑引爆",
        "第三階段（5-8 週）：媒體報導矩陣 + 行業活動曝光，吸引投資人關注",
      ],
      expectedResults: "品牌從零建立市場認知，獲取 10,000+ 種子用戶，媒體報導 50+ 篇",
    },
  },
  beauty: {
    exposure: {
      theme: "「美力覺醒・全網種草」產品曝光計劃",
      audience: "18-35 歲愛美女性、美妝達人、護膚成分黨",
      prAxis: "以「科學護膚 × 真實效果」為傳播主軸，打造口碑爆品",
      phases: [
        "第一階段（1-2 週）：200+ KOC 素人鋪量，小紅書/抖音真實體驗分享",
        "第二階段（3-4 週）：頭部美妝 KOL 深度評測，專業背書引爆關注",
        "第三階段（5-6 週）：品牌自播 + 信息流投放，高效轉化收割",
      ],
      expectedResults: "筆記曝光量 3000 萬+，店鋪搜索量增長 600%，ROI 達 1:4.5",
    },
  },
  health: {
    brand: {
      theme: "「健康生活・品質之選」品牌建立計劃",
      audience: "28-50 歲注重健康的都市人群、養生愛好者、運動人士",
      prAxis: "以「科學養生・品質保障」為品牌核心價值，建立專業健康品牌形象",
      phases: [
        "第一階段（1-3 週）：健康 KOL + 營養師專業內容矩陣，建立專業認知",
        "第二階段（4-6 週）：線下健康講座 + 體驗活動，深度互動建立信任",
        "第三階段（7-10 週）：用戶見證 + 口碑裂變，持續獲客與品牌沉澱",
      ],
      expectedResults: "品牌專業認知度提升 180%，月度新客增長 200%，復購率達 45%",
    },
  },
  realestate: {
    brand: {
      theme: "「尊貴居所・品質生活」地產品牌塑造計劃",
      audience: "30-55 歲高淨值人群、投資者、改善型置業家庭、海外買家",
      prAxis: "以「頂級生活方式的締造者」為品牌定位，結合地段優勢與設計美學打造高端形象",
      phases: [
        "第一階段（1-3 週）：高端生活方式 KOL 內容矩陣，在小紅書/Instagram 展示樓盤設計美學與周邊配套",
        "第二階段（4-6 週）：舉辦私人品鑒會與 VIP 看房活動，邀請財經媒體與地產 KOL 深度體驗",
        "第三階段（7-10 週）：業主故事 UGC 傳播 + 跨境推廣觸達海外買家，建立口碑長效機制",
      ],
      expectedResults: "項目知名度提升 250%，預約看房量增長 180%，成交轉化率提升 35%",
    },
    exposure: {
      theme: "「城市地標・全城矚目」新盤曝光計劃",
      audience: "25-50 歲有置業需求人群、地產投資者、地產經紀",
      prAxis: "以「城市新地標」為傳播核心，製造全城話題與期待感",
      phases: [
        "第一階段（1-2 週）：懸念式預熱，釋放項目概念片與地段優勢信息，引發市場猜測",
        "第二階段（3-4 週）：盛大開放日 + KOL 直播看房，搭配媒體專題報導全方位曝光",
        "第三階段（5-8 週）：口碑擴散 + 精準廣告投放，持續引流至銷售中心",
      ],
      expectedResults: "開盤首日到訪量突破 2000 組，社交媒體話題曝光量達 3000 萬+，首月去化率達 60%",
    },
    conversion: {
      theme: "「精準觸達・高效轉化」地產數位營銷計劃",
      audience: "28-45 歲剛需及改善型買家、投資客、跨境置業人群",
      prAxis: "以「數據驅動精準獲客」為核心，打通線上引流到線下成交的完整鏈路",
      phases: [
        "第一階段（1-2 週）：搭建精準人群畫像，在朋友圈/抖音/小紅書進行信息流廣告測試",
        "第二階段（3-5 週）：優化投放素材與落地頁，結合 AI 智能出價提升轉化效率",
        "第三階段（6-8 週）：線上預約到線下帶看的閉環運營，搭配限時優惠促成成交",
      ],
      expectedResults: "獲客成本降低 40%，有效來電量增長 300%，線上預約到訪轉化率達 25%",
    },
  },
  education: {
    brand: {
      theme: "「啟迪未來・卓越教育」品牌建立計劃",
      audience: "25-45 歲家長群體、18-30 歲進修人士、教育行業從業者",
      prAxis: "以「改變人生的教育力量」為品牌核心敘事，建立專業可信賴的教育品牌形象",
      phases: [
        "第一階段（1-3 週）：教育 KOL + 名師IP內容矩陣，在小紅書/抖音分享教學理念與學員成果",
        "第二階段（4-6 週）：舉辦免費公開課/教育論壇，邀請行業專家背書，媒體深度報導",
        "第三階段（7-10 週）：學員成功故事傳播 + 口碑裂變活動，建立長期品牌信任",
      ],
      expectedResults: "品牌搜索量增長 350%，試聽報名量增長 200%，品牌信任度指數提升 75%",
    },
    exposure: {
      theme: "「全城招生・教育新選擇」曝光引流計劃",
      audience: "28-42 歲中產家長、大學生、職場進修人群",
      prAxis: "以「優質教育資源觸手可及」為傳播主軸，快速建立市場認知與招生引流",
      phases: [
        "第一階段（1-2 週）：家長社群 KOC 種草 + 教育類帳號矩陣發佈，覆蓋目標家長群",
        "第二階段（3-4 週）：免費體驗課活動 + 限時優惠，搭配精準朋友圈廣告投放",
        "第三階段（5-6 週）：學員見證視頻 + 轉介紹獎勵機制，實現口碑裂變增長",
      ],
      expectedResults: "招生諮詢量增長 400%，體驗課轉化率達 35%，獲客成本降低 50%",
    },
    conversion: {
      theme: "「精準招生・高效轉化」教育數位營銷計劃",
      audience: "目標學齡段家長、職業進修人群、企業培訓決策者",
      prAxis: "以「用數據說話的教育成果」為核心，打造從認知到報名的高效轉化漏斗",
      phases: [
        "第一階段（1-2 週）：精準人群定向 + A/B 測試廣告素材，找到最優獲客路徑",
        "第二階段（3-5 週）：自動化營銷漏斗搭建，從免費資源下載到試聽預約的完整鏈路",
        "第三階段（6-8 週）：社群運營 + 限時促銷，推動猶豫期家長完成報名決策",
      ],
      expectedResults: "報名轉化率提升至 18%，單個獲客成本降低 45%，續費率達 80%",
    },
  },
  travel: {
    brand: {
      theme: "「探索無界・旅途有你」旅遊品牌塑造計劃",
      audience: "22-45 歲都市白領、旅行愛好者、家庭出遊群體、商務旅客",
      prAxis: "以「創造難忘旅行記憶」為品牌承諾，建立有溫度、有品質的旅遊品牌形象",
      phases: [
        "第一階段（1-3 週）：旅行 KOL 深度體驗內容矩陣，在小紅書/抖音/Instagram 發佈沉浸式旅行 Vlog",
        "第二階段（4-6 週）：主題旅行活動策劃 + 媒體邀請體驗，打造品牌專屬旅行 IP",
        "第三階段（7-10 週）：用戶 UGC 旅行故事徵集 + 社群運營，建立旅行愛好者社群",
      ],
      expectedResults: "品牌認知度提升 280%，社交媒體粉絲增長 200%，用戶自發分享率達 25%",
    },
    exposure: {
      theme: "「限時特惠・說走就走」旅遊產品曝光計劃",
      audience: "20-40 歲衝動型旅行者、價格敏感型消費者、節假日出遊家庭",
      prAxis: "以「限時稀缺 + 視覺衝擊」為傳播策略，製造搶購氛圍與出行衝動",
      phases: [
        "第一階段（1-2 週）：目的地美景短視頻矩陣投放，在抖音/小紅書引發嚮往感",
        "第二階段（3-4 週）：限時閃購活動 + KOL 直播帶貨，搭配倒計時營造緊迫感",
        "第三階段（5-6 週）：用戶出行後分享激勵 + 二次傳播，形成口碑長尾效應",
      ],
      expectedResults: "活動期間訂單量增長 500%，社交媒體曝光量達 5000 萬+，復購率提升至 30%",
    },
    conversion: {
      theme: "「精準觸達・即時轉化」旅遊數位營銷計劃",
      audience: "有明確出行計劃的消費者、節假日出遊家庭、商務差旅人群",
      prAxis: "以「從種草到下單的最短路徑」為核心，打造高效的旅遊產品轉化鏈路",
      phases: [
        "第一階段（1-2 週）：基於搜索意圖的精準廣告投放 + 目的地內容SEO優化",
        "第二階段（3-4 週）：落地頁優化 + 即時客服系統，縮短決策到下單的時間",
        "第三階段（5-6 週）：再營銷 + 交叉銷售，提升客單價與復購頻次",
      ],
      expectedResults: "廣告點擊轉化率提升至 8%，平均客單價增長 35%，獲客成本降低 40%",
    },
  },
  ecommerce: {
    brand: {
      theme: "「品質電商・信賴之選」電商品牌建立計劃",
      audience: "20-40 歲線上購物活躍用戶、品質消費者、社交電商參與者",
      prAxis: "以「品質保障 + 極致體驗」為品牌核心價值，在電商紅海中建立差異化認知",
      phases: [
        "第一階段（1-3 週）：垂直領域 KOL 開箱評測矩陣，在小紅書/抖音建立產品口碑",
        "第二階段（4-6 週）：品牌故事內容營銷 + 創始人 IP 打造，建立情感連結",
        "第三階段（7-10 週）：會員體系搭建 + 社群運營，培養品牌忠實用戶群",
      ],
      expectedResults: "品牌搜索量增長 400%，店鋪粉絲增長 300%，復購率提升至 35%",
    },
    exposure: {
      theme: "「全網爆品・銷量狂飆」電商爆品打造計劃",
      audience: "18-35 歲社交媒體活躍用戶、價格敏感型消費者、種草型買家",
      prAxis: "以「爆品思維 + 社交裂變」為核心策略，快速打造現象級銷售單品",
      phases: [
        "第一階段（1-2 週）：500+ KOC 素人鋪量種草，在小紅書/抖音製造「人人都在用」的氛圍",
        "第二階段（3-4 週）：頭部 KOL 直播帶貨 + 限時秒殺活動，引爆銷量高峰",
        "第三階段（5-6 週）：用戶好評 UGC 二次傳播 + 信息流廣告放量，持續收割長尾流量",
      ],
      expectedResults: "單品月銷量突破 10 萬件，登上平台熱銷榜 TOP 10，ROI 達 1:6.5",
    },
    conversion: {
      theme: "「流量收割・極致轉化」電商精準營銷計劃",
      audience: "已有品牌認知的潛在買家、加購未付款用戶、競品用戶",
      prAxis: "以「數據驅動的精準轉化」為核心，最大化每一分流量的商業價值",
      phases: [
        "第一階段（1-2 週）：全渠道數據打通 + 人群分層，建立精準用戶畫像",
        "第二階段（3-5 週）：個性化推薦 + 動態創意廣告 + 購物車提醒，多觸點促轉化",
        "第三階段（6-8 週）：會員專屬優惠 + 積分體系 + 社群閃購，提升 LTV 與復購",
      ],
      expectedResults: "整體轉化率提升至 5.5%，客單價增長 40%，30 天復購率達 28%",
    },
  },
};

function getDefaultPlan(industry: string, objective: string) {
  const industryPlans = fallbackPlans[industry];
  if (industryPlans && industryPlans[objective]) {
    return industryPlans[objective];
  }
  // Generic fallback
  const indLabel = industries.find((i) => i.id === industry)?.label || "行業";
  const objLabel = objectives.find((o) => o.id === objective)?.label || "目標";
  return {
    theme: `「${indLabel}突破・${objLabel}先行」整合行銷計劃`,
    audience: "目標行業核心決策者、潛在消費群體、行業意見領袖",
    prAxis: `以「${objLabel}」為核心目標，結合${indLabel}行業特性制定精準傳播策略`,
    phases: [
      "第一階段（1-2 週）：市場調研與策略制定，確立傳播主軸與 KOL 矩陣",
      "第二階段（3-5 週）：全渠道內容投放，KOL/KOC 矩陣式傳播引爆話題",
      "第三階段（6-8 週）：數據優化與長尾運營，持續口碑沉澱與轉化收割",
    ],
    expectedResults: "品牌曝光量提升 300%+，目標受眾觸達率 85%+，營銷 ROI 達 1:4 以上",
  };
}

export default function AIGenerator() {
  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("");
  const [objective, setObjective] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1 });

  const handleGenerate = async () => {
    if (!brandName || !industry || !objective) return;
    setLoading(true);
    setResult(null);

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const plan = getDefaultPlan(industry, objective);
    setResult({
      ...plan,
      brandName,
      industry: industries.find((i) => i.id === industry)?.label,
      objective: objectives.find((o) => o.id === objective)?.label,
    });
    setLoading(false);
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `
【${result.theme}】
品牌：${result.brandName}
行業：${result.industry}
目標：${result.objective}

▎行銷主題
${result.theme}

▎目標受眾
${result.audience}

▎公關主軸
${result.prAxis}

▎三階段執行策略
${result.phases.join("\n")}

▎預期效益
${result.expectedResults}

— 由 Redin Creative 紅人創 AI 企劃產生器生成
    `.trim();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ai-generator" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663690217418/oMXvANcMiWzE8eKVtdkVSS/ai-tool-bg-cwvGzxjtG4DVZjtKtQZqBP.webp"
          alt=""
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-background/85" />
      </div>

      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">
            AI-Powered Campaign Generator
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Playfair_Display'] mb-4">
            <span className="text-gradient-gold">AI 行銷企劃</span>
            <span className="text-foreground">智能產生器</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            輸入品牌資訊，AI 為您量身定制專屬公關與行銷企劃方案
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Input Form */}
          <div className="glass-card p-6 sm:p-8 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Brand Name */}
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-foreground mb-2 block">
                  品牌名稱 <span className="text-gold">*</span>
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="輸入您的品牌名稱..."
                  className="w-full px-4 py-3 rounded-xl bg-accent/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
                />
              </div>

              {/* Industry */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  產業別 <span className="text-gold">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {industries.map((ind) => (
                    <button
                      key={ind.id}
                      onClick={() => setIndustry(ind.id)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        industry === ind.id
                          ? "bg-gold text-slate-950 shadow-lg shadow-gold/20"
                          : "bg-accent/50 text-muted-foreground hover:text-foreground hover:bg-accent border border-border/30"
                      }`}
                    >
                      {ind.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Objective */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  核心行銷目標 <span className="text-gold">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {objectives.map((obj) => (
                    <button
                      key={obj.id}
                      onClick={() => setObjective(obj.id)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        objective === obj.id
                          ? "bg-gold text-slate-950 shadow-lg shadow-gold/20"
                          : "bg-accent/50 text-muted-foreground hover:text-foreground hover:bg-accent border border-border/30"
                      }`}
                    >
                      {obj.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="mt-8 text-center">
              <Button
                onClick={handleGenerate}
                disabled={!brandName || !industry || !objective || loading}
                className="px-8 py-6 text-base font-semibold rounded-xl bg-gold text-slate-950 hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-gold/25 transition-all hover:scale-105 active:scale-95"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    AI 深度分析中...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2" size={18} />
                    生成專屬企劃方案
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Result */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="glass-card p-6 sm:p-8 border-gold/30"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gradient-gold font-['Playfair_Display']">
                    {result.theme}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="p-2 rounded-lg bg-accent/50 hover:bg-accent text-muted-foreground hover:text-foreground transition-all"
                      title="複製方案"
                    >
                      {copied ? <CheckCircle size={16} className="text-green-400" /> : <Copy size={16} />}
                    </button>
                    <button
                      onClick={handleGenerate}
                      className="p-2 rounded-lg bg-accent/50 hover:bg-accent text-muted-foreground hover:text-foreground transition-all"
                      title="重新生成"
                    >
                      <RefreshCw size={16} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-accent/30 text-center">
                    <p className="text-xs text-muted-foreground">品牌</p>
                    <p className="text-sm font-bold text-foreground">{result.brandName}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-accent/30 text-center">
                    <p className="text-xs text-muted-foreground">行業</p>
                    <p className="text-sm font-bold text-foreground">{result.industry}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-accent/30 text-center">
                    <p className="text-xs text-muted-foreground">目標</p>
                    <p className="text-sm font-bold text-foreground">{result.objective}</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <h4 className="text-sm font-bold text-gold mb-2">▎ 目標受眾</h4>
                    <p className="text-sm text-muted-foreground">{result.audience}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gold mb-2">▎ 公關主軸</h4>
                    <p className="text-sm text-muted-foreground">{result.prAxis}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gold mb-2">▎ 三階段執行策略</h4>
                    <div className="space-y-2">
                      {result.phases.map((phase: string, i: number) => (
                        <div key={i} className="flex gap-3 items-start">
                          <span className="w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <p className="text-sm text-muted-foreground">{phase}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gold mb-2">▎ 預期效益</h4>
                    <p className="text-sm text-foreground font-medium">{result.expectedResults}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/30 text-center">
                  <p className="text-xs text-muted-foreground">
                    此方案由 AI 智能引擎生成，如需深度定制請聯繫我們的策略團隊
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

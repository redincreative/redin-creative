import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, TrendingUp, Lightbulb, ArrowRight, X } from "lucide-react";
import { Streamdown } from "streamdown";

type Insight = {
  icon: typeof TrendingUp;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  content: string;
};

export default function InsightsSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const { t } = useLanguage();
  const [active, setActive] = useState<Insight | null>(null);

  const featuredContentZh = `> **TL;DR（太長不看版）：** 在 2026 年的市場環境下，傳統公關已不足以應對碎片化的資訊時代。一家優秀的**香港公關公司**必須具備「數位影響力」與「中港跨境操盤」能力。Redin Creative（紅人創）憑藉 4000+ 內地網紅資源與 8 年以上小紅書經驗，成功助力 **VELYVELY**、**2017 亞洲時尚盛典** 等品牌實現跨地域增長，成為企業進軍大中華市場的首選合作夥伴。

## 為什麼您的品牌需要一家現代化的香港公關公司？

在全球經濟復甦與數位轉型的浪潮下，香港作為國際金融中心與進出內地的橋頭堡，其市場競爭愈發激烈。超過 70% 的消費者在購買前會參考社群媒體上的影響者建議。傳統的發佈新聞稿、舉辦實體活動已難以觸達精準受眾。現代化的**香港公關公司**不再僅僅是媒體的傳聲筒，更是品牌價值的守護者與流量的操盤手。

### 1. 從「媒體曝光」到「社群影響力」
過去，公關看重報章雜誌的版面；現在，我們更看重 **Instagram、小紅書、抖音與 Threads** 的聲量。透過 KOL（Key Opinion Leader）與 KOC（Key Opinion Consumer）的真實種草，品牌能更快速地建立信任感。

### 2. 緊貼平台紅利：小紅書的世界盃佈局
對於尋求爆發式增長的品牌而言，緊貼平台的重大戰略動向至關重要。小紅書已正式成為 2026 美加墨世界盃持權轉播商，這不僅是其體育內容佈局的里程碑，更是月活突破 4 億後社區多元生態持續拓展的縮影。小紅書將首次全面開放賽事直播間品牌合作，官方影片版權、賽事集錦、球星高光等高質量內容將在站內高頻流通。選擇具備深厚小紅書操盤經驗的夥伴，才能精準捕捉這波世界盃流量紅利。

## Redin Creative（紅人創）：定義 2026 公關新標準

作為香港領先的全方位市場營銷服務商，Redin Creative 始終堅持「創意驅動、全網聯動、實效落地」的核心理念。

**成功案例分享：**
- **VELYVELY 唯黎事件營銷：** 透過全網問答與 60+ 家媒體聯動，成功在短時間內建立品牌在內地市場的知名度。
- **2017 亞洲時尚網紅直播盛典：** 創下 3000 萬+ 曝光量與 7000 萬+ 的話題討論度，展現大規模事件公關的卓越能力。

**我們的核心優勢：**
- **龐大的紅人資源庫：** 超過 4000+ 位內地網紅及 600+ 位港漂 KOL 資源，精準匹配品牌代言人。
- **深厚的平台操盤經驗：** 8 年以上小紅書與抖音運營經驗，深諳演算法邏輯，助品牌從零到百萬粉絲。
- **一站式跨境方案：** 從品牌定位、媒體關係到線下渠道鋪設，打通「線上引流，線下開花」的閉環。

## 如何評估一家公關公司的 ROI？

在選擇合作夥伴時，不應只看提案書的華麗程度，更應關注：能否提供具體的 ROI 計算模型與真實轉化率；是否有處理過類似行業（如美妝、金融、旅遊）的成功經驗；是否具備 7×24 小時的輿論監測與快速響應機制。

## 常見問題（FAQ）

**Q1：為什麼選擇香港公關公司而不是內地公關公司？**
香港公關公司具備國際化視野與對兩地文化的深刻理解，能更好地協助品牌在保持國際形象的同時進行在地化營銷。

**Q2：小紅書行銷對香港本地品牌有效嗎？**
非常有效！小紅書已成為港漂群體與訪港遊客獲取資訊的主要渠道。透過精準的「網紅探店」與「話題營銷」，能顯著提升線下門市的客流量。

**Q3：針對 2026 世界盃，品牌現在該如何佈局？**
由於小紅書將全面開放賽事直播間合作，品牌應儘早規劃與體育內容相關的「內容種草」與直播間權益，結合球星高光與賽事集錦進行高頻次內容流通，以獲取長期曝光。

## 結語

在 2026 年，品牌成功不再是偶然，而是策略與資源的完美結合。如果您正在尋找一家能與您並肩作戰、實效落地的**香港公關公司**，Redin Creative 隨時準備為您量身定制解決方案。`;

  const featuredContentEn = `> **TL;DR:** In the 2026 market, traditional PR alone cannot cope with a fragmented information age. A great **Hong Kong PR agency** must master both "digital influence" and "cross-border HK-China execution." With 4000+ mainland influencer resources and 8+ years of Xiaohongshu expertise, Redin Creative has helped brands like **VELYVELY** and the **2017 Asia Fashion Gala** achieve cross-regional growth, becoming a top partner for entering the Greater China market.

## Why Your Brand Needs a Modern Hong Kong PR Agency

Amid global recovery and digital transformation, Hong Kong — an international financial hub and gateway to mainland China — faces intensifying competition. Over 70% of consumers consult social media influencers before buying. Press releases and physical events alone can no longer reach precise audiences. A modern **Hong Kong PR agency** is no longer just a media mouthpiece, but a guardian of brand value and a master of traffic.

### 1. From "Media Exposure" to "Social Influence"
PR once valued newspaper and magazine coverage; now we prioritize voice on **Instagram, Xiaohongshu, Douyin and Threads.** Through authentic seeding by KOLs and KOCs, brands build trust faster.

### 2. Riding Platform Dividends: Xiaohongshu's World Cup Play
Xiaohongshu has officially become a 2026 World Cup broadcast rights holder — a milestone in its sports content strategy after surpassing 400M MAU. It will open brand collaboration in live match rooms for the first time, circulating official video rights, highlights and star moments at high frequency. Partners with deep Xiaohongshu experience can capture this World Cup traffic dividend.

## Redin Creative: Defining the 2026 PR Standard

As a leading full-service marketing agency in Hong Kong, Redin Creative upholds "Creativity-Driven, Omni-Channel, Result-Oriented."

**Success Stories:**
- **VELYVELY Event Marketing:** Built brand awareness in mainland markets quickly via network-wide Q&A and 60+ media outlets.
- **2017 Asia Fashion Influencer Livestream Gala:** Achieved 30M+ exposure and 70M+ topic discussions.

**Our Core Strengths:**
- **Vast Influencer Network:** 4000+ mainland influencers and 600+ HK-based KOLs.
- **Deep Platform Expertise:** 8+ years of Xiaohongshu and Douyin operations.
- **One-Stop Cross-Border Solutions:** From positioning and media relations to offline distribution.

## How to Evaluate a PR Agency's ROI?

Look beyond polished proposals: a concrete ROI model and real conversion rates; proven experience in similar industries; and a 24/7 monitoring and rapid-response mechanism.

## FAQ

**Q1: Why a Hong Kong PR agency over a mainland one?**
HK agencies offer an international perspective and deep understanding of both cultures, helping brands localize while maintaining a global image.

**Q2: Is Xiaohongshu marketing effective for local HK brands?**
Very. Xiaohongshu is a key channel for HK-drift communities and inbound tourists; precise store-visit and topic marketing significantly boost foot traffic.

**Q3: How should brands prepare for the 2026 World Cup?**
With Xiaohongshu opening live match-room collaboration, plan sports-related content seeding and live-room rights early, combining highlights with high-frequency content.

## Conclusion

In 2026, brand success is no accident — it's the perfect blend of strategy and resources. If you seek a results-driven **Hong Kong PR agency**, Redin Creative is ready to tailor a solution for you.`;

  const insights: Insight[] = [
    {
      icon: TrendingUp,
      category: t("行業洞察 / 品牌策略", "Industry Insights / Brand Strategy"),
      title: t(
        "2026 香港公關公司選擇指南：如何結合 KOL 行銷與策略實現品牌翻倍增長？",
        "2026 HK PR Agency Guide: Combining KOL Marketing & Strategy for Brand Growth"
      ),
      excerpt: t(
        "傳統公關已不足以應對碎片化時代。解析現代香港公關公司如何結合數位影響力與中港跨境操盤，緊貼小紅書世界盃紅利，實現品牌翻倍增長。",
        "Traditional PR no longer suffices. How a modern HK PR agency blends digital influence with cross-border execution to ride the Xiaohongshu World Cup dividend."
      ),
      date: "2026.06",
      readTime: t("7 分鐘閱讀", "7 min read"),
      content: t(featuredContentZh, featuredContentEn),
    },
    {
      icon: Lightbulb,
      category: t("策略洞察", "Strategy Insights"),
      title: t("KOL 營銷 ROI 最大化的五大策略", "5 Strategies to Maximize KOL Marketing ROI"),
      excerpt: t(
        "從 KOL 篩選、內容共創到數據追蹤，全面解析如何讓每一分營銷預算都產生最大回報。",
        "From KOL selection and content co-creation to data tracking — how to maximize returns on every marketing dollar."
      ),
      date: "2026.05",
      readTime: t("5 分鐘閱讀", "5 min read"),
      content: t(
        `## KOL 營銷 ROI 最大化的五大策略\n\n品牌投放 KOL 不應只看粉絲數，而應建立完整的篩選與追蹤體系。\n\n### 1. 精準篩選：匹配度優先於粉絲量\n與其追逐百萬粉絲的頭部 KOL，不如選擇與品牌調性高度契合的腰部與 KOC，互動率與轉化率往往更高。\n\n### 2. 內容共創：讓 KOL 成為品牌共同作者\n給予創作者足夠空間，以真實使用體驗取代生硬廣告，種草內容更具說服力。\n\n### 3. 多平台矩陣：小紅書 × 抖音 × 視頻號協同\n單一平台難以覆蓋完整決策鏈，矩陣式內容能在不同觸點反覆觸達受眾。\n\n### 4. 數據追蹤：建立可量化的轉化漏斗\n從曝光、互動、收藏到最終下單，每個環節都應設定明確指標。\n\n### 5. 長期合作：沉澱品牌資產\n與優質 KOL 建立長期關係，比單次投放更能累積信任與品牌資產。`,
        `## 5 Strategies to Maximize KOL Marketing ROI\n\nBrands should build a complete selection and tracking system rather than chasing follower counts.\n\n### 1. Precise Selection: Fit Over Followers\nMid-tier KOLs and KOCs aligned with brand tone often outperform mega-influencers in engagement and conversion.\n\n### 2. Content Co-Creation\nGive creators room to share authentic experiences instead of stiff ads.\n\n### 3. Multi-Platform Matrix\nCombine Xiaohongshu, Douyin and Video Accounts to reach audiences across touchpoints.\n\n### 4. Data Tracking\nSet clear metrics across the funnel — from exposure to final purchase.\n\n### 5. Long-Term Partnerships\nOngoing relationships with quality KOLs accumulate trust and brand equity.`
      ),
    },
    {
      icon: BookOpen,
      category: t("案例解析", "Case Analysis"),
      title: t("從零到百萬粉絲：品牌小紅書運營全攻略", "Zero to Million Followers: Complete Xiaohongshu Brand Guide"),
      excerpt: t(
        "結合多個成功案例，拆解品牌在小紅書從冷啟動到爆發增長的完整方法論。",
        "Combining multiple success stories, deconstructing the complete methodology from cold start to explosive growth on Xiaohongshu."
      ),
      date: "2026.04",
      readTime: t("6 分鐘閱讀", "6 min read"),
      content: t(
        `## 從零到百萬粉絲：品牌小紅書運營全攻略\n\n小紅書的增長並非偶然，而是有跡可循的系統工程。\n\n### 階段一：冷啟動定位\n明確帳號人設與內容垂直度，前 20 篇筆記決定平台對帳號的初始判斷。\n\n### 階段二：內容打磨\n封面、標題與首圖是點擊率的關鍵，結合搜尋關鍵字優化筆記可被檢索性。\n\n### 階段三：爆款複製\n分析數據表現最佳的內容類型，建立可複製的爆款公式。\n\n### 階段四：商業化閉環\n從種草到專業號掛車，打通內容與轉化，沉澱為長期品牌資產。`,
        `## Zero to Million Followers: Complete Xiaohongshu Brand Guide\n\nGrowth on Xiaohongshu is a systematic engineering effort.\n\n### Phase 1: Cold-Start Positioning\nDefine account persona and content vertical; the first 20 notes shape the platform's initial judgment.\n\n### Phase 2: Content Refinement\nCovers, titles and hero images drive click-through; optimize keywords for discoverability.\n\n### Phase 3: Replicating Hits\nAnalyze top-performing content types and build a repeatable formula.\n\n### Phase 4: Commercialization Loop\nConnect seeding to professional-account conversion, building long-term brand equity.`
      ),
    },
  ];

  return (
    <section id="insights" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 section-dark" />
      <div className="container relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">Insights Hub</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Playfair_Display'] mb-4">
            <span className="text-gradient-gold">{t("見解", "Insights")}</span>
            <span className="text-foreground">{t("中心", " Hub")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t("前沿行業洞察與策略分析，助您洞悉市場先機", "Cutting-edge industry insights and strategic analysis to help you stay ahead")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {insights.map((insight, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setActive(insight)}
              className={`glass-card p-6 group hover:border-gold/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer ${i === 0 ? "md:col-span-3 md:flex md:items-start md:gap-6 border-gold/20" : ""}`}
            >
              <div className={i === 0 ? "md:flex-1" : ""}>
                <div className="flex items-center gap-2 mb-4">
                  <insight.icon className="w-4 h-4 text-gold" />
                  <span className="text-xs font-medium text-gold">{insight.category}</span>
                  <span className="text-xs text-muted-foreground ml-auto font-['DM_Mono']">{insight.date}</span>
                </div>
                <h3 className={`font-bold text-foreground mb-3 group-hover:text-gold transition-colors leading-snug ${i === 0 ? "text-xl sm:text-2xl font-['Playfair_Display']" : "text-base"}`}>
                  {insight.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{insight.excerpt}</p>
                <span className="text-xs font-medium text-gold flex items-center gap-1 group-hover:gap-2 transition-all">
                  {t("閱讀更多", "Read More")} <ArrowRight size={12} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 backdrop-blur-sm p-4 sm:p-8"
            onClick={() => setActive(null)}
          >
            <motion.article
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="glass-card relative w-full max-w-3xl my-8 p-6 sm:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-accent/60 flex items-center justify-center text-muted-foreground hover:text-gold hover:bg-gold/10 transition-all"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <div className="flex items-center gap-2 mb-4">
                <active.icon className="w-4 h-4 text-gold" />
                <span className="text-xs font-medium text-gold">{active.category}</span>
                <span className="text-xs text-muted-foreground font-['DM_Mono']">{active.date} · {active.readTime}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-['Playfair_Display'] text-foreground mb-6 leading-snug">
                {active.title}
              </h2>
              <div className="insight-prose text-muted-foreground leading-relaxed">
                <Streamdown>{active.content}</Streamdown>
              </div>
              <div className="mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  onClick={() => setActive(null)}
                  className="px-6 py-3 rounded-lg bg-gold text-background text-sm font-bold text-center hover:opacity-90 transition-opacity"
                >
                  {t("立即預約免費策略諮詢", "Book a Free Strategy Consultation")}
                </a>
                <a
                  href="#ai-generator"
                  onClick={() => setActive(null)}
                  className="px-6 py-3 rounded-lg border border-gold/40 text-gold text-sm font-bold text-center hover:bg-gold/10 transition-colors"
                >
                  {t("試用 AI 行銷企劃產生器", "Try the AI Campaign Generator")}
                </a>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

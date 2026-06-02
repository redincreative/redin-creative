import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useLanguage } from "@/contexts/LanguageContext";
import { X, TrendingUp, Eye, Users, Award, Zap } from "lucide-react";

const categories = [
  { id: "all", label: "全部", labelEn: "All" },
  { id: "digital", label: "數位傳播", labelEn: "Digital" },
  { id: "crisis", label: "危機公關", labelEn: "Crisis PR" },
  { id: "rebrand", label: "品牌煥新", labelEn: "Rebrand" },
  { id: "kol", label: "KOL 營銷", labelEn: "KOL" },
];

const cases = [
  {
    id: 1, category: "digital",
    title: "HONOR 90 新品發佈會", titleEn: "HONOR 90 Launch Campaign",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663690217418/oMXvANcMiWzE8eKVtdkVSS/case-honor-ZCSV5YVkBos34nh3skBDcv.webp",
    kpis: { reach: "500萬+", engagement: "12.8%", conversion: "3.2%" },
    challenge: "在競爭激烈的智能手機市場中，為 HONOR 90 打造差異化的新品發佈策略，吸引年輕消費群體關注。",
    challengeEn: "Create a differentiated launch strategy for HONOR 90 in the competitive smartphone market to attract young consumers.",
    strategy: "整合線上線下資源，邀請 50+ KOL 進行開箱評測，搭配小紅書種草與抖音短視頻矩陣傳播。",
    strategyEn: "Integrated online-offline resources, invited 50+ KOLs for unboxing reviews, combined with Xiaohongshu seeding and Douyin video matrix.",
    result: "發佈會當日直播觀看人數突破 200 萬，社交媒體話題曝光量達 5000 萬+，首周銷量超出預期 180%。",
    resultEn: "Launch day livestream exceeded 2M viewers, social media impressions reached 50M+, first-week sales surpassed expectations by 180%.",
  },
  {
    id: 2, category: "kol",
    title: "Giordano 品牌年輕化計劃", titleEn: "Giordano Youth Campaign",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663690217418/oMXvANcMiWzE8eKVtdkVSS/case-fashion-FuZujnAYBvvJJzoRihf44x.webp",
    kpis: { reach: "800萬+", engagement: "9.5%", conversion: "4.1%" },
    challenge: "協助傳統服飾品牌 Giordano 重塑年輕形象，吸引 Z 世代消費者。",
    challengeEn: "Help traditional apparel brand Giordano reshape its youth image to attract Gen Z consumers.",
    strategy: "聯合 100+ 港漂 KOC 進行穿搭分享，在小紅書打造 #佐丹奴新穿法 話題，結合線下快閃店活動。",
    strategyEn: "United 100+ HK-based KOCs for styling shares, created #GiordanoNewStyle on Xiaohongshu, combined with offline pop-up events.",
    result: "品牌在 18-25 歲群體中的認知度提升 65%，線上銷售額增長 220%，成功實現品牌年輕化轉型。",
    resultEn: "Brand awareness among 18-25 age group increased 65%, online sales grew 220%, successfully achieving brand rejuvenation.",
  },
  {
    id: 3, category: "crisis",
    title: "餐飲集團輿情危機處理", titleEn: "F&B Crisis Management",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663690217418/oMXvANcMiWzE8eKVtdkVSS/case-food-jCiBjGZEYu55z8qQBkr4Ft.webp",
    kpis: { reach: "輿情控制", engagement: "24hr 響應", conversion: "聲譽修復" },
    challenge: "某知名餐飲集團遭遇食品安全負面報導，品牌聲譽面臨嚴重威脅。",
    challengeEn: "A well-known F&B group faced negative food safety reports, with brand reputation under serious threat.",
    strategy: "啟動 24 小時危機響應機制，協調媒體溝通、發佈官方聲明，並策劃透明化廚房直播活動。",
    strategyEn: "Activated 24-hour crisis response, coordinated media communication, issued official statements, and planned transparent kitchen livestreams.",
    result: "48 小時內成功控制負面輿情擴散，一週內品牌好感度回升至危機前水平，長期建立了完善的輿情監測體系。",
    resultEn: "Successfully contained negative sentiment within 48 hours, brand favorability recovered to pre-crisis levels within one week.",
  },
  {
    id: 4, category: "rebrand",
    title: "Tempo 品牌煥新活動", titleEn: "Tempo Brand Refresh",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663690217418/oMXvANcMiWzE8eKVtdkVSS/case-brand-WcWrntMcrGkT7HBFMwRkzL.webp",
    kpis: { reach: "1200萬+", engagement: "15.2%", conversion: "5.8%" },
    challenge: "為經典紙巾品牌 Tempo 注入新活力，在保持品牌傳統的同時吸引年輕消費者。",
    challengeEn: "Inject new vitality into classic tissue brand Tempo while maintaining tradition and attracting young consumers.",
    strategy: "策劃「生活美學」主題活動，邀請設計師聯名限定款，搭配 KOL 生活方式內容營銷。",
    strategyEn: "Planned 'Lifestyle Aesthetics' campaign, invited designer collaborations for limited editions, paired with KOL lifestyle content marketing.",
    result: "限定款上線 3 天售罄，品牌社交媒體粉絲增長 300%，成功塑造「品質生活」新品牌形象。",
    resultEn: "Limited editions sold out in 3 days, social media followers grew 300%, successfully establishing a 'Quality Living' brand image.",
  },
  {
    id: 5, category: "digital",
    title: "UNIMAT 保健品全渠道推廣", titleEn: "UNIMAT Omni-channel Campaign",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663690217418/oMXvANcMiWzE8eKVtdkVSS/case-health-Kh3xZYspkBr3CpNhvkfAy9.webp",
    kpis: { reach: "2000萬+", engagement: "8.7%", conversion: "6.3%" },
    challenge: "協助日本保健品品牌 UNIMAT 進入中國市場，建立品牌認知與銷售渠道。",
    challengeEn: "Help Japanese health supplement brand UNIMAT enter the Chinese market, building brand awareness and sales channels.",
    strategy: "制定「線上種草 + 線下體驗」O2O 策略，在小紅書、大眾點評進行口碑營銷，同步鋪設線下藥房渠道。",
    strategyEn: "Developed 'Online Seeding + Offline Experience' O2O strategy with Xiaohongshu and Dianping WOM marketing, plus offline pharmacy distribution.",
    result: "三個月內成功進入 500+ 線下零售點，線上月銷售額突破 HK$200 萬，品牌搜索量增長 450%。",
    resultEn: "Entered 500+ offline retail points within 3 months, online monthly sales exceeded HK$2M, brand search volume grew 450%.",
  },
  {
    id: 6, category: "kol",
    title: "美妝品牌小紅書種草計劃", titleEn: "Beauty Brand Xiaohongshu Seeding",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663690217418/oMXvANcMiWzE8eKVtdkVSS/case-beauty-YRAK2CGyvSn8ubhSrnhb9q.webp",
    kpis: { reach: "3500萬+", engagement: "18.3%", conversion: "7.2%" },
    challenge: "為新銳美妝品牌在小紅書平台從零建立品牌聲量，實現冷啟動。",
    challengeEn: "Build brand awareness from zero for a new beauty brand on Xiaohongshu, achieving cold start.",
    strategy: "分三階段執行：KOC 素人鋪量 → KOL 背書引爆 → 品牌自播沉澱，搭配精準信息流投放。",
    strategyEn: "Three-phase execution: KOC seeding → KOL endorsement explosion → brand self-broadcasting, paired with precision feed ads.",
    result: "90 天內品牌筆記曝光量突破 3500 萬，店鋪搜索量增長 800%，ROI 達到 1:5.8。",
    resultEn: "Brand note impressions exceeded 35M within 90 days, store search volume grew 800%, ROI reached 1:5.8.",
  },
];

export default function CasesSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedCase, setSelectedCase] = useState<(typeof cases)[0] | null>(null);
  const { ref, inView } = useInView({ threshold: 0.05 });
  const { lang, t } = useLanguage();

  const filteredCases =
    activeCategory === "all"
      ? cases
      : cases.filter((c) => c.category === activeCategory);

  return (
    <section id="cases" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663690217418/oMXvANcMiWzE8eKVtdkVSS/cases-bg-2mC92374ggo3a7eHj7yveg.webp"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-background/90" />
      </div>

      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">
            Case Studies
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Playfair_Display'] mb-4">
            <span className="text-gradient-gold">{t("精選", "Featured")}</span>
            <span className="text-foreground">{t("案例分析", " Case Studies")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t("每一個成功案例，都是策略與創意的完美結合", "Every success story is a perfect blend of strategy and creativity")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-gold text-slate-950 shadow-lg shadow-gold/20"
                  : "bg-accent/50 text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              {lang === "zh" ? cat.label : cat.labelEn}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCases.map((caseItem, i) => (
              <motion.div
                key={caseItem.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                onClick={() => setSelectedCase(caseItem)}
                className="glass-card overflow-hidden group cursor-pointer hover:border-gold/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/5"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={caseItem.image} alt={caseItem.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <span className="absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full bg-gold/20 text-gold backdrop-blur-sm border border-gold/20">
                    {lang === "zh" ? categories.find((c) => c.id === caseItem.category)?.label : categories.find((c) => c.id === caseItem.category)?.labelEn}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-gold transition-colors">
                    {lang === "zh" ? caseItem.title : caseItem.titleEn}
                  </h3>
                  <p className="text-xs text-muted-foreground font-['DM_Mono'] mb-3">{caseItem.titleEn}</p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Eye size={12} className="text-gold" />{caseItem.kpis.reach}</span>
                    <span className="flex items-center gap-1"><TrendingUp size={12} className="text-gold" />{caseItem.kpis.engagement}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Case Detail Modal */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedCase(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-2xl w-full max-h-[85vh] overflow-y-auto p-0"
            >
              <div className="relative h-56">
                <img src={selectedCase.image} alt={selectedCase.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <button onClick={() => setSelectedCase(null)} className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors">
                  <X size={18} />
                </button>
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {lang === "zh" ? selectedCase.title : selectedCase.titleEn}
                </h3>
                <p className="text-sm text-muted-foreground font-['DM_Mono'] mb-6">{selectedCase.titleEn}</p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 rounded-lg bg-accent/50">
                    <Eye size={16} className="text-gold mx-auto mb-1" />
                    <p className="text-sm font-bold text-foreground">{selectedCase.kpis.reach}</p>
                    <p className="text-xs text-muted-foreground">{t("觸及人數", "Reach")}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-accent/50">
                    <TrendingUp size={16} className="text-gold mx-auto mb-1" />
                    <p className="text-sm font-bold text-foreground">{selectedCase.kpis.engagement}</p>
                    <p className="text-xs text-muted-foreground">{t("互動率", "Engagement")}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-accent/50">
                    <Users size={16} className="text-gold mx-auto mb-1" />
                    <p className="text-sm font-bold text-foreground">{selectedCase.kpis.conversion}</p>
                    <p className="text-xs text-muted-foreground">{t("轉化率", "Conversion")}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-gold mb-2 flex items-center gap-2"><Award size={14} /> {t("挑戰", "Challenge")}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{lang === "zh" ? selectedCase.challenge : selectedCase.challengeEn}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gold mb-2 flex items-center gap-2"><Zap size={14} /> {t("策略", "Strategy")}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{lang === "zh" ? selectedCase.strategy : selectedCase.strategyEn}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gold mb-2 flex items-center gap-2"><TrendingUp size={14} /> {t("成果", "Results")}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{lang === "zh" ? selectedCase.result : selectedCase.resultEn}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

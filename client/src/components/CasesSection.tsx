import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useLanguage } from "@/contexts/LanguageContext";
import { X, TrendingUp, Eye, Users, Award, Zap } from "lucide-react";

const categories = [
  { id: "all", label: "全部", labelEn: "All" },
  { id: "livestream", label: "網紅直播", labelEn: "Livestream" },
  { id: "crisis", label: "事件營銷", labelEn: "Event Marketing" },
  { id: "探店", label: "網紅探店", labelEn: "Store Visit" },
  { id: "ip", label: "IP 運營", labelEn: "IP Operation" },
];

const cases = [
  {
    id: 1, category: "livestream",
    title: "2017 亞洲時尚網紅直播盛典", titleEn: "2017 Asia Fashion KOL Livestream Gala",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663690217418/oMXvANcMiWzE8eKVtdkVSS/rc-case-hk-livestream-hiLkds6Y2KZ4ZwTfP4mqA3.webp",
    kpis: { reach: "3000萬+", engagement: "7000萬+", conversion: "30 商戶" },
    challenge: "將內地網紅電商新經濟模式首次引入香港市場，需要整合多個上市美業及跨國品牌資源，打造香港首場大型網紅直播活動。",
    challengeEn: "Introduce the mainland influencer e-commerce model to Hong Kong for the first time, integrating multiple listed beauty and multinational brands into HK's first large-scale KOL livestream event.",
    strategy: "聯合香港 4 大上市美業及跨國品牌共 30 個商戶，集結眾多網紅達人，於頂級場地舉辦時尚網紅直播盛典，同步引爆微博話題傳播。",
    strategyEn: "United 30 merchants across 4 major listed beauty brands and multinationals, gathered numerous influencers for a fashion livestream gala at a premium venue, amplified via Weibo trending topics.",
    result: "直播間曝光量突破 3000 萬+，微博話題曝光量達 7000 萬+，活動取得空前成功，正式將網紅電商新經濟引入香港。",
    resultEn: "Livestream impressions exceeded 30M+, Weibo topic impressions reached 70M+, an unprecedented success that officially brought influencer e-commerce to Hong Kong.",
  },
  {
    id: 2, category: "livestream",
    title: "2018 中韓網紅直播盛典", titleEn: "2018 China-Korea KOL Livestream Gala",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663690217418/oMXvANcMiWzE8eKVtdkVSS/rc-case-korea-QYh4nfQbAfrUzykzUSsTT8.webp",
    kpis: { reach: "1.6億韓元", engagement: "14700盒", conversion: "4 小時" },
    challenge: "與韓國現代百貨免稅店合作，在跨境直播電商場景中，於有限時間內創造高銷售轉化，驗證網紅直播帶貨的爆發力。",
    challengeEn: "Partner with Korea's Hyundai Department Store Duty-Free to create high sales conversion within limited time in a cross-border live-commerce setting, proving the explosive power of KOL livestream selling.",
    strategy: "集結中韓網紅達人於韓國現代百貨免稅店進行商品直播銷售，以面膜等熱門美妝品類為核心，打造沉浸式跨境直播盛典。",
    strategyEn: "Gathered China-Korea influencers for product livestream sales at Hyundai Duty-Free, centered on hot beauty categories like face masks, creating an immersive cross-border livestream gala.",
    result: "8 月活動 4 小時賣出 1.6 億韓元，10 月盛典再創佳績——四小時賣出 14,700 盒面膜，刷新跨境網紅直播帶貨紀錄。",
    resultEn: "August event sold 160M KRW in 4 hours; October gala set new records—14,700 boxes of face masks sold in four hours, redefining cross-border livestream commerce.",
  },
  {
    id: 3, category: "crisis",
    title: "VELYVELY 唯黎事件營銷", titleEn: "VELYVELY Event Marketing",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663690217418/oMXvANcMiWzE8eKVtdkVSS/rc-case-velyvely-Ykv5Wdnt5htWBYYuG3CPG2.webp",
    kpis: { reach: "60家媒體", engagement: "全網問答", conversion: "聲譽重塑" },
    challenge: "韓國美妝品牌 VELYVELY 唯黎面對各大社交平台出現的負面評論，需要重建品牌聲譽並強化進入中國市場的品牌權威。",
    challengeEn: "Korean beauty brand VELYVELY faced negative comments across social platforms, needing to rebuild reputation and strengthen brand authority entering the Chinese market.",
    strategy: "啟動 60 家新聞媒體矩陣發佈，舉辦「VELYVELY 發佈會暨中韓網紅 CEO 論壇」邀請多位創業女性領袖，搭配廣州新品體驗派對與全網問答內容佈局。",
    strategyEn: "Launched a 60-outlet news media matrix, hosted the 'VELYVELY Launch & China-Korea KOL CEO Forum' with female entrepreneur leaders, paired with a Guangzhou product party and全網 Q&A content.",
    result: "成功透過 60 家媒體與新品派對重塑品牌正面形象，數十位百萬粉絲達人分享護膚秘笈，有效對沖負面輿情並強化品牌權威。",
    resultEn: "Successfully reshaped a positive brand image via 60 media outlets and product parties; dozens of million-follower influencers shared skincare tips, effectively offsetting negative sentiment.",
  },
  {
    id: 4, category: "探店",
    title: "2019 澳門首場網紅探店直播", titleEn: "2019 Macau First KOL Store-Visit Livestream",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663690217418/oMXvANcMiWzE8eKVtdkVSS/rc-case-macau-fJyV3xbHY8PTmmfvFKMGYw.webp",
    kpis: { reach: "100萬+", engagement: "5萬+", conversion: "多行業" },
    challenge: "將網紅電商新經濟模式引入澳門市場，需要整合飲食、美妝、零售等多行業商戶，舉辦澳門首場網紅直播探店活動。",
    challengeEn: "Introduce the influencer e-commerce model to Macau, integrating F&B, beauty, and retail merchants for Macau's first KOL store-visit livestream event.",
    strategy: "首創共享網紅聯合探店直播模式，覆蓋飲食、美妝、零售等多個行業商戶，以澳門在地特色場景進行沉浸式直播探店。",
    strategyEn: "Pioneered a shared KOL joint store-visit livestream model covering F&B, beauty, and retail merchants, with immersive store visits showcasing Macau's local scenes.",
    result: "直播間曝光量突破 100 萬+，文章點贊量達 5 萬+，獲得澳門商戶踴躍參與，成功將網紅探店模式引入澳門。",
    resultEn: "Livestream impressions exceeded 1M+, article likes reached 50K+, with enthusiastic merchant participation, successfully bringing KOL store-visits to Macau.",
  },
  {
    id: 5, category: "ip",
    title: "個人 IP 多平台運營", titleEn: "Personal IP Multi-Platform Operation",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663690217418/oMXvANcMiWzE8eKVtdkVSS/rc-case-personal-ip-KdxMEcs7rskcSjgU4e3dp9.webp",
    kpis: { reach: "84萬+", engagement: "4 平台", conversion: "IP 孵化" },
    challenge: "協助香港羅先生從零打造個人 IP，需要在小紅書、抖音、視頻號、Reels 等多個平台同步建立影響力與粉絲基礎。",
    challengeEn: "Help Hong Kong's Mr. Law build a personal IP from scratch, establishing influence and follower base across Xiaohongshu, Douyin, Channels, and Reels simultaneously.",
    strategy: "以一拍多剪內容生產模式，針對小紅書、抖音、視頻號、Reels 四大平台特性進行差異化內容運營，系統化孵化個人 IP。",
    strategyEn: "Used a 'shoot-once, edit-many' content model, tailoring differentiated content for Xiaohongshu, Douyin, Channels, and Reels to systematically incubate the personal IP.",
    result: "多平台累計 views 表現亮眼——小紅書 6,293、抖音 3.4 萬、視頻號 3 萬、Reels 高達 84 萬，成功建立跨平台個人影響力。",
    resultEn: "Strong multi-platform views—Xiaohongshu 6,293, Douyin 34K, Channels 30K, Reels up to 840K—successfully building cross-platform personal influence.",
  },
  {
    id: 6, category: "ip",
    title: "小紅書 × 抖音企業號運營", titleEn: "Xiaohongshu & Douyin Enterprise Account Operation",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663690217418/oMXvANcMiWzE8eKVtdkVSS/rc-case-xhs-matrix-TAtHT223YMs5Pqg72KoCR7.webp",
    kpis: { reach: "多行業", engagement: "矩陣運營", conversion: "專業號" },
    challenge: "為美妝、寵物、內衣、保健品、奢侈品、餐廳等多行業品牌建立小紅書專業號與抖音企業號的長效內容運營體系。",
    challengeEn: "Build a long-term content operation system on Xiaohongshu professional accounts and Douyin enterprise accounts for brands across beauty, pet, lingerie, supplements, luxury, and F&B.",
    strategy: "以矩陣式內容運營覆蓋多行業垂直賽道，結合專業號日常運營、爆款筆記策劃與企業號短視頻佈局，持續沉澱品牌資產。",
    strategyEn: "Matrix content operation across multiple vertical industries, combining daily professional account management, viral note planning, and enterprise short-video strategy to continuously build brand assets.",
    result: "成功為美妝、時尚、奢侈品、保健品等多行業品牌建立穩定的小紅書與抖音內容矩陣，實現品牌長期口碑沉澱與曝光增長。",
    resultEn: "Established stable Xiaohongshu and Douyin content matrices for brands across beauty, fashion, luxury, and supplements, achieving long-term word-of-mouth accumulation and exposure growth.",
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
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
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

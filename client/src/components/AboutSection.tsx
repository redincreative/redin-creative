import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe, Users, Briefcase, Star, MapPin } from "lucide-react";

export default function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const { t } = useLanguage();

  const highlights = [
    { icon: Users, value: "600+", label: t("香港及港漂 KOL/KOC", "HK-based KOL/KOC") },
    { icon: Globe, value: "4000+", label: t("內地網紅資源", "Mainland Influencers") },
    { icon: Briefcase, value: "800+", label: t("品牌合作經驗", "Brand Partnerships") },
    { icon: Star, value: "100+", label: t("大型線下活動", "Major Offline Events") },
  ];

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 section-dark" />
      <div className="container relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">About Us</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Playfair_Display'] mb-4">
            <span className="text-gradient-gold">{t("關於", "About")}</span>
            <span className="text-foreground">{t(" 紅人創", " Redin Creative")}</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            {t(
              "Redin Creative Limited（紅人創文化傳媒有限公司）位於香港、面向全國的領先全方位市場營銷服務商，以「創意驅動、全網聯動、實效落地」為核心理念",
              "Redin Creative Limited is a Hong Kong-based, nationwide leading full-service marketing agency with the core philosophy of 'Creativity-Driven, Omni-Channel, Result-Oriented'"
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
            <div className="glass-card overflow-hidden">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663690217418/oMXvANcMiWzE8eKVtdkVSS/about-team-SJEcgWJjkNTsiYNtNkwfpR.webp" alt="Redin Creative Team" className="w-full h-80 object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 glass-card px-4 py-3 border-gold/30">
              <p className="text-xs text-muted-foreground">{t("成立於", "Established")}</p>
              <p className="text-lg font-bold font-['DM_Mono'] text-gold">8+ {t("年", "Years")}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">
              {t("中港跨境優勢・全渠道閉環", "Cross-border Advantage · Omni-channel Loop")}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {t(
                "我們熟悉兩地市場文化、消費習慣及法規政策，協助香港品牌成功「內進」開拓內地龐大市場，同時助力內地企業「出海」走向國際。真正打通「線上曝光」與「線下渠道」，讓營銷預算轉化為實實在在的銷量與品牌資產。",
                "We are familiar with both markets' culture, consumer habits, and regulations. We help HK brands enter mainland China's vast market and assist mainland enterprises in going global. Truly connecting online exposure with offline channels, turning marketing budgets into real sales and brand equity."
              )}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t(
                "戰略合作夥伴「NSC 网红网」囊括小紅書、抖音本地生活、大眾點評、騰訊廣點通、天貓海外服務商。香港唯一精通中國新媒體內容整合營銷策劃公司，抖音海外指定服務商及騰訊廣點通指定代理。",
                "Strategic partner 'NSC Influencer Network' covers Xiaohongshu, Douyin Local Life, Dianping, Tencent Guangdiantong, and Tmall Global. The only HK company specializing in China new media integrated marketing, designated Douyin overseas service provider and Tencent Guangdiantong agent."
              )}
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-gold/10 text-gold border border-gold/20"><MapPin size={12} className="inline mr-1" />{t("香港", "Hong Kong")}</span>
              <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-gold/10 text-gold border border-gold/20"><MapPin size={12} className="inline mr-1" />{t("深圳", "Shenzhen")}</span>
              <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-gold/10 text-gold border border-gold/20"><MapPin size={12} className="inline mr-1" />{t("廣州", "Guangzhou")}</span>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {highlights.map((item, i) => (
            <div key={i} className="glass-card p-5 text-center group hover:border-gold/30 transition-all duration-300">
              <item.icon className="w-8 h-8 text-gold mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-2xl sm:text-3xl font-bold font-['DM_Mono'] text-gradient-gold mb-1">{item.value}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

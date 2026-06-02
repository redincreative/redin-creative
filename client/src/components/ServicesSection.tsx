import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Megaphone,
  Globe,
  Users,
  Shield,
  TrendingUp,
  Smartphone,
  Store,
  Zap,
} from "lucide-react";

export default function ServicesSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const { t } = useLanguage();

  const services = [
    {
      icon: Megaphone,
      title: t("品牌策略", "Brand Strategy"),
      titleEn: "Brand Strategy",
      description: t(
        "從品牌定位、視覺識別到傳播策略，為企業打造獨特品牌形象，建立長期品牌資產。",
        "From brand positioning and visual identity to communication strategy, we build unique brand images and long-term brand equity."
      ),
    },
    {
      icon: Globe,
      title: t("媒體關係", "Media Relations"),
      titleEn: "Media Relations",
      description: t(
        "整合主流媒體採訪發佈、新聞稿撰寫與媒體活動策劃，全方位提升品牌媒體曝光。",
        "Integrated media interviews, press releases, and media event planning to maximize brand media exposure."
      ),
    },
    {
      icon: Users,
      title: t("KOL/KOC 網紅營銷", "KOL/KOC Marketing"),
      titleEn: "Influencer Marketing",
      description: t(
        "擁有 4000+ 內地網紅及 600+ 港漂 KOL 資源，精準匹配品牌調性，實現高效種草轉化。",
        "With 4000+ mainland influencers and 600+ HK-based KOLs, we precisely match brand tone for effective conversion."
      ),
    },
    {
      icon: Shield,
      title: t("危機公關", "Crisis Management"),
      titleEn: "Crisis Management",
      description: t(
        "7×24 小時危機監測與快速響應機制，專業團隊協助品牌化解輿論風險，維護品牌聲譽。",
        "24/7 crisis monitoring and rapid response. Our professional team helps brands resolve PR risks and protect reputation."
      ),
    },
    {
      icon: TrendingUp,
      title: t("數位影響力行銷", "Digital Marketing"),
      titleEn: "Digital Marketing",
      description: t(
        "精通 Instagram、小紅書、抖音等平台運營，從內容創作到精準廣告投放的一站式服務。",
        "Expert in Instagram, Xiaohongshu, Douyin operations — one-stop service from content creation to precision ad placement."
      ),
    },
    {
      icon: Smartphone,
      title: t("社交媒體管理", "Social Media Management"),
      titleEn: "Social Media Management",
      description: t(
        "全平台社群運營策略，包含內容規劃、社群互動、數據分析與粉絲增長策略。",
        "Full-platform community strategy including content planning, engagement, analytics, and follower growth."
      ),
    },
    {
      icon: Store,
      title: t("線下渠道鋪設", "Offline Distribution"),
      titleEn: "Offline Distribution",
      description: t(
        "強大的線下資源整合能力，協助產品上架至各大超市、百貨、藥房等實體零售渠道。",
        "Powerful offline resource integration to help products reach supermarkets, department stores, and pharmacies."
      ),
    },
    {
      icon: Zap,
      title: t("中港跨境營銷", "Cross-border Marketing"),
      titleEn: "Cross-border Marketing",
      description: t(
        "熟悉兩地市場文化與法規，助力香港品牌「內進」開拓內地市場，內地企業「出海」走向國際。",
        "Familiar with both markets' culture and regulations, helping HK brands enter mainland China and mainland brands go global."
      ),
    },
  ];

  return (
    <section id="services" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663690217418/oMXvANcMiWzE8eKVtdkVSS/services-bg-GajycxwnRyyrgAT2WB4pnm.webp"
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-background/85" />
      </div>

      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">
            Our Services
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Playfair_Display'] mb-4">
            <span className="text-gradient-gold">{t("尊榮服務", "Premium Services")}</span>
            <span className="text-foreground">{t("體系", " Portfolio")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t(
              "全方位推廣策略，結合線上聲量與線下渠道，真正實現「線上引流，線下開花」",
              "Full-spectrum promotion strategy combining online presence with offline channels for real business results"
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card p-6 group hover:border-gold/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-gold/5"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-lg font-bold mb-1 text-foreground group-hover:text-gold transition-colors">
                {service.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-3 font-['DM_Mono']">
                {service.titleEn}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

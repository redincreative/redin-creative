import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { BookOpen, TrendingUp, Lightbulb, ArrowRight } from "lucide-react";

const insights = [
  {
    icon: TrendingUp,
    category: "行業趨勢",
    categoryEn: "Industry Trends",
    title: "2024 中港跨境電商營銷趨勢報告",
    excerpt: "深入分析小紅書、抖音等平台的最新算法變化與內容策略，助力品牌把握跨境營銷新機遇。",
    date: "2024.03",
  },
  {
    icon: Lightbulb,
    category: "策略洞察",
    categoryEn: "Strategy Insights",
    title: "KOL 營銷 ROI 最大化的五大策略",
    excerpt: "從 KOL 篩選、內容共創到數據追蹤，全面解析如何讓每一分營銷預算都產生最大回報。",
    date: "2024.02",
  },
  {
    icon: BookOpen,
    category: "案例解析",
    categoryEn: "Case Analysis",
    title: "從零到百萬粉絲：品牌小紅書運營全攻略",
    excerpt: "結合多個成功案例，拆解品牌在小紅書從冷啟動到爆發增長的完整方法論。",
    date: "2024.01",
  },
];

export default function InsightsSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 section-dark" />

      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">
            Insights Hub
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Playfair_Display'] mb-4">
            <span className="text-gradient-gold">見解</span>
            <span className="text-foreground">中心</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            前沿行業洞察與策略分析，助您洞悉市場先機
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {insights.map((insight, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 group hover:border-gold/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-4">
                <insight.icon className="w-4 h-4 text-gold" />
                <span className="text-xs font-medium text-gold">{insight.category}</span>
                <span className="text-xs text-muted-foreground ml-auto font-['DM_Mono']">
                  {insight.date}
                </span>
              </div>
              <h3 className="text-base font-bold text-foreground mb-3 group-hover:text-gold transition-colors leading-snug">
                {insight.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {insight.excerpt}
              </p>
              <span className="text-xs font-medium text-gold flex items-center gap-1 group-hover:gap-2 transition-all">
                閱讀更多 <ArrowRight size={12} />
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { BarChart3, TrendingUp, Users, Eye, Target } from "lucide-react";

const metrics = [
  {
    label: "品牌曝光量",
    labelEn: "Brand Impressions",
    before: "120 萬",
    after: "2,800 萬",
    growth: "+2,233%",
    icon: Eye,
  },
  {
    label: "社交媒體粉絲",
    labelEn: "Social Followers",
    before: "8,500",
    after: "125,000",
    growth: "+1,371%",
    icon: Users,
  },
  {
    label: "月度轉化率",
    labelEn: "Monthly Conversion",
    before: "1.2%",
    after: "6.8%",
    growth: "+467%",
    icon: Target,
  },
  {
    label: "營銷 ROI",
    labelEn: "Marketing ROI",
    before: "1:0.8",
    after: "1:5.2",
    growth: "+550%",
    icon: TrendingUp,
  },
];

export default function DashboardSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [showAfter, setShowAfter] = useState(true);

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
            Client Results Dashboard
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Playfair_Display'] mb-4">
            <span className="text-gradient-gold">客戶成果</span>
            <span className="text-foreground">儀表板</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
            真實數據見證品牌蛻變 — 合作前後 KPI 指標對比
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-accent/50 border border-border/30">
            <button
              onClick={() => setShowAfter(false)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                !showAfter
                  ? "bg-muted-foreground/20 text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              合作前
            </button>
            <button
              onClick={() => setShowAfter(true)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                showAfter
                  ? "bg-gold text-slate-950 shadow-lg shadow-gold/20"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              合作後
            </button>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 text-center group hover:border-gold/30 transition-all duration-300"
            >
              <metric.icon className="w-8 h-8 text-gold mx-auto mb-3" />
              <p className="text-xs text-muted-foreground mb-1 font-['DM_Mono']">
                {metric.labelEn}
              </p>
              <p className="text-sm font-medium text-foreground mb-3">{metric.label}</p>

              <motion.div
                key={showAfter ? "after" : "before"}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className={`text-2xl font-bold font-['DM_Mono'] ${showAfter ? "text-gradient-gold" : "text-muted-foreground"}`}>
                  {showAfter ? metric.after : metric.before}
                </p>
              </motion.div>

              {showAfter && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs font-bold text-green-400 mt-2 font-['DM_Mono']"
                >
                  {metric.growth}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

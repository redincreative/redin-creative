import { motion } from "framer-motion";
import { ArrowDown, Sparkles, TrendingUp, Users } from "lucide-react";

const stats = [
  { value: "600+", label: "KOL/KOC 資源", icon: Users },
  { value: "800+", label: "品牌合作經驗", icon: TrendingUp },
  { value: "8年", label: "小紅書操盤", icon: Sparkles },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663690217418/oMXvANcMiWzE8eKVtdkVSS/hero-bg-ZdWeTCm99tG3ChmB2X2jSW.webp"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="text-gold font-medium text-sm tracking-widest uppercase mb-6">
              Hong Kong's Premier PR & Marketing Agency
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold font-['Playfair_Display'] leading-tight mb-6"
          >
            <span className="text-gradient-gold">創意驅動</span>
            <br />
            <span className="text-foreground">全網聯動・實效落地</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Redin Creative 紅人創 — 香港領先全方位市場營銷服務商，
            致力於成為企業最值得信賴的戰略行銷夥伴。
            專精中港跨境公關、KOL 網紅營銷與品牌策略。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#ai-generator"
              className="px-8 py-4 text-base font-semibold rounded-xl bg-gold text-slate-950 hover:bg-gold-light transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl shadow-gold/25 flex items-center gap-2"
            >
              <Sparkles size={18} />
              AI 行銷企劃產生器
            </a>
            <a
              href="#services"
              className="px-8 py-4 text-base font-semibold rounded-xl border border-gold/30 text-gold hover:bg-gold/10 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              探索服務
            </a>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass-card p-6 text-center group hover:border-gold/30 transition-all duration-300 hover:-translate-y-1"
            >
              <stat.icon className="w-6 h-6 text-gold mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-3xl font-bold font-['DM_Mono'] text-gradient-gold mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5 text-gold/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

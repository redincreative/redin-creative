import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const platforms = [
  "小紅書", "抖音", "Instagram", "Facebook", "YouTube",
  "微信", "微博", "大眾點評", "高德地圖", "Threads",
  "淘寶", "京東", "快手", "B站", "騰訊廣點通",
];

export default function PartnersSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/20 to-background" />

      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-2">
            Platform Coverage
          </p>
          <h3 className="text-2xl font-bold font-['Playfair_Display'] text-foreground">
            全平台覆蓋
          </h3>
        </motion.div>

        {/* Scrolling platforms */}
        <div className="relative overflow-hidden">
          <div className="flex gap-4 animate-scroll">
            {[...platforms, ...platforms].map((platform, i) => (
              <div
                key={i}
                className="shrink-0 px-6 py-3 rounded-xl glass-card text-sm font-medium text-muted-foreground hover:text-gold hover:border-gold/30 transition-all whitespace-nowrap"
              >
                {platform}
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  );
}

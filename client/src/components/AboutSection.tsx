import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Award, Globe, Users, Briefcase, Star, MapPin } from "lucide-react";

const awards = [
  { year: "2019", title: "大灣區優質誠信企業白金獎" },
  { year: "2020", title: "中國科技創新百業十佳新銳品牌" },
  { year: "2022", title: "香港最佳新媒體營銷策劃金獎" },
  { year: "2023", title: "香港優質網商認證標誌" },
  { year: "2023", title: "大灣區百強企業品牌白金獎" },
];

const highlights = [
  { icon: Users, value: "600+", label: "香港及港漂 KOL/KOC" },
  { icon: Globe, value: "4000+", label: "內地網紅資源" },
  { icon: Briefcase, value: "800+", label: "品牌合作經驗" },
  { icon: Star, value: "100+", label: "大型線下活動" },
];

export default function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 section-dark" />

      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">
            About Us
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Playfair_Display'] mb-4">
            <span className="text-gradient-gold">關於</span>
            <span className="text-foreground"> 紅人創</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            Redin Creative Limited（紅人創文化傳媒有限公司）位於香港、面向全國的領先全方位市場營銷服務商，
            以「創意驅動、全網聯動、實效落地」為核心理念
          </p>
        </motion.div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-card overflow-hidden">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663690217418/oMXvANcMiWzE8eKVtdkVSS/about-team-SJEcgWJjkNTsiYNtNkwfpR.webp"
                alt="Redin Creative Team"
                className="w-full h-80 object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 glass-card px-4 py-3 border-gold/30">
              <p className="text-xs text-muted-foreground">成立於</p>
              <p className="text-lg font-bold font-['DM_Mono'] text-gold">8+ 年</p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground">
              中港跨境優勢・全渠道閉環
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              我們熟悉兩地市場文化、消費習慣及法規政策，協助香港品牌成功「內進」開拓內地龐大市場，
              同時助力內地企業「出海」走向國際。真正打通「線上曝光」與「線下渠道」，
              讓營銷預算轉化為實實在在的銷量與品牌資產。
            </p>
            <p className="text-muted-foreground leading-relaxed">
              戰略合作夥伴「NSC 网红网」囊括小紅書、抖音本地生活、大眾點評、騰訊廣點通、
              天貓海外服務商。香港唯一精通中國新媒體內容整合營銷策劃公司，
              抖音海外指定服務商及騰訊廣點通指定代理。
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-gold/10 text-gold border border-gold/20">
                <MapPin size={12} className="inline mr-1" />
                香港
              </span>
              <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-gold/10 text-gold border border-gold/20">
                <MapPin size={12} className="inline mr-1" />
                深圳
              </span>
              <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-gold/10 text-gold border border-gold/20">
                <MapPin size={12} className="inline mr-1" />
                廣州
              </span>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {highlights.map((item, i) => (
            <div
              key={i}
              className="glass-card p-5 text-center group hover:border-gold/30 transition-all duration-300"
            >
              <item.icon className="w-8 h-8 text-gold mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-2xl sm:text-3xl font-bold font-['DM_Mono'] text-gradient-gold mb-1">
                {item.value}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Awards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-foreground text-center mb-8 flex items-center justify-center gap-2">
            <Award className="text-gold" size={22} />
            過往榮譽
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {awards.map((award, i) => (
              <div
                key={i}
                className="glass-card p-4 text-center hover:border-gold/30 transition-all duration-300 group"
              >
                <p className="text-lg font-bold font-['DM_Mono'] text-gold mb-1">{award.year}</p>
                <p className="text-xs text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                  {award.title}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

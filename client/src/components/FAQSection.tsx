import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useLanguage } from "@/contexts/LanguageContext";
import { Plus } from "lucide-react";

export default function FAQSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    {
      q: t("Redin Creative 提供哪些核心服務？", "What core services does Redin Creative offer?"),
      a: t(
        "Redin Creative 提供品牌策略、媒體關係、KOL/KOC 網紅營銷、危機公關、數位影響力行銷、社交媒體管理、線下渠道鋪設及中港跨境營銷等一站式服務。",
        "Redin Creative provides one-stop services including brand strategy, media relations, KOL/KOC influencer marketing, crisis management, digital influence marketing, social media management, offline distribution, and HK-China cross-border marketing."
      ),
    },
    {
      q: t("Redin Creative 在網紅行銷方面有哪些優勢？", "What are Redin Creative's advantages in influencer marketing?"),
      a: t(
        "我們擁有 4000+ 內地網紅及 600+ 港漂 KOL 資源，能精準匹配品牌調性，並結合 8 年以上的小紅書操盤經驗，實現高效的種草轉化。",
        "We have 4000+ mainland influencers and 600+ HK-based KOL resources, precisely matching brand tone, combined with 8+ years of Xiaohongshu expertise for efficient seeding and conversion."
      ),
    },
    {
      q: t("如何聯繫 Redin Creative 進行免費諮詢？", "How can I contact Redin Creative for a free consultation?"),
      a: t(
        "您可以透過電子郵件 contact@redincreative.com 或 WhatsApp +852 6705 7987 與我們的策略團隊聯繫，我們將為您量身定制行銷方案。",
        "You can reach our strategy team via email at contact@redincreative.com or WhatsApp +852 6705 7987, and we will tailor a marketing plan for you."
      ),
    },
    {
      q: t("為什麼選擇香港公關公司而不是內地公關公司？", "Why choose a Hong Kong PR agency over a mainland one?"),
      a: t(
        "香港公關公司具備國際化視野與對兩地文化的深刻理解，能更好地協助品牌在保持國際形象的同時，進行在地化營銷，並打通中港兩地的法規與渠道差異。",
        "A Hong Kong PR agency offers an international perspective and deep understanding of both cultures, helping brands localize while maintaining a global image, and bridging regulatory and channel differences between the two markets."
      ),
    },
    {
      q: t("小紅書行銷對香港本地品牌有效嗎？", "Is Xiaohongshu marketing effective for local HK brands?"),
      a: t(
        "非常有效！小紅書已成為港漂群體與訪港遊客獲取資訊的主要渠道。透過精準的「網紅探店」與「話題營銷」，能顯著提升線下門市的客流量與品牌聲量。",
        "Very effective! Xiaohongshu has become a key channel for HK-drift communities and inbound tourists. Precise store-visit and topic marketing significantly boost foot traffic and brand voice."
      ),
    },
    {
      q: t("合作的計費模式與週期是如何安排的？", "How are pricing models and project timelines arranged?"),
      a: t(
        "我們提供專案制與月費制兩種彈性方案，可依品牌目標與預算量身規劃。一般單次活動週期為 4-8 週，長期運營則以季度為單位，並提供階段性數據報告與成效追蹤。",
        "We offer both project-based and monthly retainer plans, tailored to brand goals and budgets. A single campaign typically runs 4-8 weeks, while long-term operations are quarterly, with phased data reports and performance tracking."
      ),
    },
  ];

  return (
    <section id="faq" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 section-dark" />
      <div className="container relative z-10 max-w-3xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Playfair_Display'] mb-4">
            <span className="text-gradient-gold">{t("常見", "Frequently Asked")}</span>
            <span className="text-foreground">{t("問題", " Questions")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t("關於我們的服務、優勢與合作方式，您可能想了解的答案", "Answers to what you may want to know about our services, strengths, and collaboration")}
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="glass-card overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-medium text-foreground">{faq.q}</span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  >
                    <Plus size={18} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10"
        >
          <p className="text-muted-foreground mb-4">{t("還有其他疑問？", "Have more questions?")}</p>
          <a
            href="#contact"
            className="inline-block px-7 py-3 rounded-lg bg-gold text-background text-sm font-bold hover:opacity-90 transition-opacity"
          >
            {t("聯繫我們的策略團隊", "Contact Our Strategy Team")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

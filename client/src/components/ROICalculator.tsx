import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calculator, DollarSign, TrendingUp, BarChart3 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export default function ROICalculator() {
  const [budget, setBudget] = useState([50000]);
  const [impressions, setImpressions] = useState([500000]);
  const [conversionRate, setConversionRate] = useState([3]);
  const [avgOrderValue, setAvgOrderValue] = useState([500]);
  const { ref, inView } = useInView({ threshold: 0.1 });
  const { t } = useLanguage();

  const results = useMemo(() => {
    const b = budget[0];
    const imp = impressions[0];
    const cr = conversionRate[0] / 100;
    const aov = avgOrderValue[0];
    const conversions = Math.round(imp * cr);
    const revenue = conversions * aov;
    const profit = revenue - b;
    const roi = b > 0 ? ((revenue - b) / b) * 100 : 0;
    return { conversions, revenue, profit, roi };
  }, [budget, impressions, conversionRate, avgOrderValue]);

  return (
    <section id="roi-calculator" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 section-dark" />
      <div className="container relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">ROI Calculator</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Playfair_Display'] mb-4">
            <span className="text-gradient-gold">{t("行銷 ROI", "Marketing ROI")}</span>
            <span className="text-foreground">{t(" 即時計算器", " Calculator")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t("輸入您的預算參數，即時了解公關行銷方案的商業價值", "Input your budget parameters to instantly understand the business value of your marketing plan")}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Input Panel */}
          <div className="glass-card p-6 sm:p-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <Calculator className="text-gold" size={20} />
              {t("輸入參數", "Input Parameters")}
            </h3>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-foreground">{t("預計預算", "Estimated Budget")}</label>
                  <span className="text-sm font-bold font-['DM_Mono'] text-gold">HK$ {budget[0].toLocaleString()}</span>
                </div>
                <Slider value={budget} onValueChange={setBudget} min={10000} max={5000000} step={10000} className="[&_[role=slider]]:bg-gold [&_[role=slider]]:border-gold [&_.bg-primary]:bg-gold" />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground"><span>HK$10,000</span><span>HK$5,000,000</span></div>
              </div>
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-foreground">{t("預估曝光量", "Est. Impressions")}</label>
                  <span className="text-sm font-bold font-['DM_Mono'] text-gold">{impressions[0].toLocaleString()}</span>
                </div>
                <Slider value={impressions} onValueChange={setImpressions} min={50000} max={10000000} step={50000} className="[&_[role=slider]]:bg-gold [&_[role=slider]]:border-gold [&_.bg-primary]:bg-gold" />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground"><span>50,000</span><span>10,000,000</span></div>
              </div>
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-foreground">{t("預估轉化率", "Est. Conversion Rate")}</label>
                  <span className="text-sm font-bold font-['DM_Mono'] text-gold">{conversionRate[0]}%</span>
                </div>
                <Slider value={conversionRate} onValueChange={setConversionRate} min={0.5} max={15} step={0.5} className="[&_[role=slider]]:bg-gold [&_[role=slider]]:border-gold [&_.bg-primary]:bg-gold" />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground"><span>0.5%</span><span>15%</span></div>
              </div>
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-foreground">{t("客單價", "Avg. Order Value")}</label>
                  <span className="text-sm font-bold font-['DM_Mono'] text-gold">HK$ {avgOrderValue[0].toLocaleString()}</span>
                </div>
                <Slider value={avgOrderValue} onValueChange={setAvgOrderValue} min={50} max={50000} step={250} className="[&_[role=slider]]:bg-gold [&_[role=slider]]:border-gold [&_.bg-primary]:bg-gold" />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground"><span>HK$50</span><span>HK$50,000</span></div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="glass-card p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <BarChart3 className="text-gold" size={20} />
                {t("預期成效", "Expected Results")}
              </h3>
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-accent/50 border border-border/50">
                  <div className="flex items-center gap-3 mb-2"><DollarSign className="text-gold" size={18} /><span className="text-sm text-muted-foreground">{t("預期營收", "Expected Revenue")}</span></div>
                  <p className="text-3xl font-bold font-['DM_Mono'] text-gradient-gold">HK$ {results.revenue.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-xl bg-accent/50 border border-border/50">
                  <div className="flex items-center gap-3 mb-2"><TrendingUp className="text-gold" size={18} /><span className="text-sm text-muted-foreground">{t("淨利潤", "Net Profit")}</span></div>
                  <p className={`text-3xl font-bold font-['DM_Mono'] ${results.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>HK$ {results.profit.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-xl bg-gold/10 border border-gold/20">
                  <div className="flex items-center gap-3 mb-2"><BarChart3 className="text-gold" size={18} /><span className="text-sm text-muted-foreground">{t("ROI 投資報酬率", "ROI")}</span></div>
                  <p className="text-4xl font-bold font-['DM_Mono'] text-gradient-gold">{results.roi.toFixed(0)}%</p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 rounded-xl bg-accent/30 border border-border/30">
              <p className="text-sm text-muted-foreground">
                {t("預估轉化人數：", "Est. Conversions: ")}
                <span className="font-bold text-foreground font-['DM_Mono'] ml-1">{results.conversions.toLocaleString()} {t("人", "")}</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 }} className="text-center mt-12">
          <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-gold text-slate-950 hover:bg-gold-light transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl shadow-gold/25">
            {t("立即預約免費諮詢", "Book a Free Consultation")}
          </a>
          <p className="text-sm text-muted-foreground mt-3">
            {t("讓我們的策略團隊為您量身定制高 ROI 行銷方案", "Let our strategy team tailor a high-ROI marketing plan for you")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

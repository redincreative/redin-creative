import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Calculator, DollarSign, TrendingUp, BarChart3 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export default function ROICalculator() {
  const [budget, setBudget] = useState([50000]);
  const [impressions, setImpressions] = useState([500000]);
  const [conversionRate, setConversionRate] = useState([3]);
  const [avgOrderValue, setAvgOrderValue] = useState([500]);
  const { ref, inView } = useInView({ threshold: 0.1 });

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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">
            ROI Calculator
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Playfair_Display'] mb-4">
            <span className="text-gradient-gold">行銷 ROI</span>
            <span className="text-foreground"> 即時計算器</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            輸入您的預算參數，即時了解公關行銷方案的商業價值
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {/* Input Panel */}
          <div className="glass-card p-6 sm:p-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <Calculator className="text-gold" size={20} />
              輸入參數
            </h3>

            <div className="space-y-8">
              {/* Budget */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-foreground">預計預算</label>
                  <span className="text-sm font-bold font-['DM_Mono'] text-gold">
                    HK$ {budget[0].toLocaleString()}
                  </span>
                </div>
                <Slider
                  value={budget}
                  onValueChange={setBudget}
                  min={10000}
                  max={5000000}
                  step={10000}
                  className="[&_[role=slider]]:bg-gold [&_[role=slider]]:border-gold [&_.bg-primary]:bg-gold"
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>HK$10,000</span>
                  <span>HK$5,000,000</span>
                </div>
              </div>

              {/* Impressions */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-foreground">預估曝光量</label>
                  <span className="text-sm font-bold font-['DM_Mono'] text-gold">
                    {impressions[0].toLocaleString()}
                  </span>
                </div>
                <Slider
                  value={impressions}
                  onValueChange={setImpressions}
                  min={50000}
                  max={10000000}
                  step={50000}
                  className="[&_[role=slider]]:bg-gold [&_[role=slider]]:border-gold [&_.bg-primary]:bg-gold"
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>50,000</span>
                  <span>10,000,000</span>
                </div>
              </div>

              {/* Conversion Rate */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-foreground">預估轉化率</label>
                  <span className="text-sm font-bold font-['DM_Mono'] text-gold">
                    {conversionRate[0]}%
                  </span>
                </div>
                <Slider
                  value={conversionRate}
                  onValueChange={setConversionRate}
                  min={0.5}
                  max={15}
                  step={0.5}
                  className="[&_[role=slider]]:bg-gold [&_[role=slider]]:border-gold [&_.bg-primary]:bg-gold"
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>0.5%</span>
                  <span>15%</span>
                </div>
              </div>

              {/* Average Order Value */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-foreground">客單價</label>
                  <span className="text-sm font-bold font-['DM_Mono'] text-gold">
                    HK$ {avgOrderValue[0].toLocaleString()}
                  </span>
                </div>
                <Slider
                  value={avgOrderValue}
                  onValueChange={setAvgOrderValue}
                  min={50}
                  max={50000}
                  step={250}
                  className="[&_[role=slider]]:bg-gold [&_[role=slider]]:border-gold [&_.bg-primary]:bg-gold"
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>HK$50</span>
                  <span>HK$50,000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="glass-card p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <BarChart3 className="text-gold" size={20} />
                預期成效
              </h3>

              <div className="space-y-6">
                {/* Revenue */}
                <div className="p-4 rounded-xl bg-accent/50 border border-border/50">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="text-gold" size={18} />
                    <span className="text-sm text-muted-foreground">預期營收</span>
                  </div>
                  <p className="text-3xl font-bold font-['DM_Mono'] text-gradient-gold">
                    HK$ {results.revenue.toLocaleString()}
                  </p>
                </div>

                {/* Profit */}
                <div className="p-4 rounded-xl bg-accent/50 border border-border/50">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="text-gold" size={18} />
                    <span className="text-sm text-muted-foreground">淨利潤</span>
                  </div>
                  <p className={`text-3xl font-bold font-['DM_Mono'] ${results.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    HK$ {results.profit.toLocaleString()}
                  </p>
                </div>

                {/* ROI */}
                <div className="p-4 rounded-xl bg-gold/10 border border-gold/20">
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="text-gold" size={18} />
                    <span className="text-sm text-muted-foreground">ROI 投資報酬率</span>
                  </div>
                  <p className="text-4xl font-bold font-['DM_Mono'] text-gradient-gold">
                    {results.roi.toFixed(0)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Conversions info */}
            <div className="mt-6 p-4 rounded-xl bg-accent/30 border border-border/30">
              <p className="text-sm text-muted-foreground">
                預估轉化人數：
                <span className="font-bold text-foreground font-['DM_Mono'] ml-1">
                  {results.conversions.toLocaleString()} 人
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

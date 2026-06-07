import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useLanguage } from "@/contexts/LanguageContext";
import { Send, Globe, MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function ContactSection() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "", company: "", email: "", phone: "",
    services: [] as string[], description: "", budget: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1 });
  const { t } = useLanguage();
  const submitMutation = trpc.contact.submit.useMutation();

  const steps = [
    { id: 1, title: t("基本資訊", "Basic Info") },
    { id: 2, title: t("需求描述", "Requirements") },
    { id: 3, title: t("預算規模", "Budget") },
  ];

  const budgetRanges = [
    "HK$10,000 以下", "HK$10,000 - 50,000", "HK$50,000 - 200,000",
    "HK$200,000 - 500,000", "HK$500,000 以上",
  ];

  const serviceTypes = [
    t("品牌策略", "Brand Strategy"), t("KOL/KOC 營銷", "KOL/KOC Marketing"),
    t("社交媒體管理", "Social Media"), t("危機公關", "Crisis PR"),
    t("線下渠道鋪設", "Offline Distribution"), t("中港跨境營銷", "Cross-border"),
    t("活動策劃", "Event Planning"), t("SEO/SEM", "SEO/SEM"),
  ];

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service) ? prev.services.filter((s) => s !== service) : [...prev.services, service],
    }));
  };

  const handleSubmit = async () => {
    try {
      await submitMutation.mutateAsync({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        services: formData.services,
        description: formData.description,
        budget: formData.budget,
      });
    } catch (error) {
      // best-effort; still show confirmation to the user
    }
    setSubmitted(true);
    toast.success(t("感謝您的諮詢！我們的團隊將在 24 小時內與您聯繫。", "Thank you! Our team will contact you within 24 hours."));
  };

  const canProceed = () => {
    if (step === 1) return formData.name && formData.email;
    if (step === 2) return formData.services.length > 0;
    if (step === 3) return formData.budget;
    return false;
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 section-dark" />
      <div className="container relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Playfair_Display'] mb-4">
            <span className="text-gradient-gold">{t("免費", "Free")}</span>
            <span className="text-foreground">{t("策略諮詢", " Strategy Consultation")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t("填寫以下表單，我們的策略團隊將為您量身定制行銷方案", "Fill in the form below and our strategy team will tailor a marketing plan for you")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6 space-y-5">
              <h3 className="text-lg font-bold text-foreground mb-4">{t("聯繫方式", "Contact Info")}</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center"><Globe className="text-gold" size={18} /></div>
                <div><p className="text-xs text-muted-foreground">EMAIL</p><p className="text-sm font-medium text-foreground">contact@redincreative.com</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center"><MessageCircle className="text-gold" size={18} /></div>
                <div><p className="text-xs text-muted-foreground">WhatsApp</p><p className="text-sm font-medium text-foreground">+852 6705 7987</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center"><Globe className="text-gold" size={18} /></div>
                <div><p className="text-xs text-muted-foreground">Redin Creative 小紅書/抖音帳號買賣網</p><p className="text-sm font-medium text-foreground">www.redincreative.shop</p></div>
              </div>
            </div>
            <div className="glass-card p-6">
              <h3 className="text-sm font-bold text-foreground mb-3">{t("香港戰略合作夥伴", "HK Strategic Partners")}</h3>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p>NSC 网红网 — www.nsc-o2o.com</p>
                <p>紅品文化 — www.redipgroup.com</p>
                <p>NUFund Consultancy — www.nufund-hk.com</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="lg:col-span-3">
            <div className="glass-card p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">{t("提交成功！", "Submitted!")}</h3>
                  <p className="text-muted-foreground">{t("感謝您的諮詢，我們的策略團隊將在 24 小時內與您聯繫。", "Thank you! Our strategy team will contact you within 24 hours.")}</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-8">
                    {steps.map((s, i) => (
                      <div key={s.id} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= s.id ? "bg-gold text-slate-950" : "bg-accent text-muted-foreground"}`}>{s.id}</div>
                        <span className="ml-2 text-xs font-medium text-muted-foreground hidden sm:block">{s.title}</span>
                        {i < steps.length - 1 && <div className={`w-8 sm:w-16 h-0.5 mx-2 transition-all ${step > s.id ? "bg-gold" : "bg-border"}`} />}
                      </div>
                    ))}
                  </div>

                  {step === 1 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-1.5 block">{t("姓名", "Name")} <span className="text-gold">*</span></label>
                          <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder={t("您的姓名", "Your name")} className="w-full px-4 py-3 rounded-xl bg-accent/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-1.5 block">{t("公司名稱", "Company")}</label>
                          <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder={t("公司名稱", "Company name")} className="w-full px-4 py-3 rounded-xl bg-accent/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">{t("電郵", "Email")} <span className="text-gold">*</span></label>
                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" className="w-full px-4 py-3 rounded-xl bg-accent/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">{t("電話", "Phone")}</label>
                        <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+852 XXXX XXXX" className="w-full px-4 py-3 rounded-xl bg-accent/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all" />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-3 block">{t("需要哪些服務？（可多選）", "Which services do you need? (Multi-select)")}<span className="text-gold">*</span></label>
                        <div className="grid grid-cols-2 gap-2">
                          {serviceTypes.map((service) => (
                            <button key={service} onClick={() => toggleService(service)} className={`px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left ${formData.services.includes(service) ? "bg-gold text-slate-950 shadow-lg shadow-gold/20" : "bg-accent/50 text-muted-foreground hover:text-foreground hover:bg-accent border border-border/30"}`}>{service}</button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">{t("補充說明", "Additional Notes")}</label>
                        <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder={t("請簡述您的需求...", "Please briefly describe your needs...")} rows={4} className="w-full px-4 py-3 rounded-xl bg-accent/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all resize-none" />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <label className="text-sm font-medium text-foreground mb-3 block">{t("預算範圍", "Budget Range")} <span className="text-gold">*</span></label>
                      <div className="space-y-2">
                        {budgetRanges.map((range) => (
                          <button key={range} onClick={() => setFormData({ ...formData, budget: range })} className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${formData.budget === range ? "bg-gold text-slate-950 shadow-lg shadow-gold/20" : "bg-accent/50 text-muted-foreground hover:text-foreground hover:bg-accent border border-border/30"}`}>{range}</button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-8">
                    {step > 1 ? <Button variant="outline" onClick={() => setStep(step - 1)} className="border-border/50 text-muted-foreground hover:text-foreground">{t("上一步", "Previous")}</Button> : <div />}
                    {step < 3 ? (
                      <Button onClick={() => setStep(step + 1)} disabled={!canProceed()} className="bg-gold text-slate-950 hover:bg-gold-light disabled:opacity-50">{t("下一步", "Next")}</Button>
                    ) : (
                      <Button onClick={handleSubmit} disabled={!canProceed()} className="bg-gold text-slate-950 hover:bg-gold-light disabled:opacity-50 flex items-center gap-2"><Send size={16} />{t("提交諮詢", "Submit")}</Button>
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Moon, Sun, Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "服務", labelEn: "Services", href: "#services" },
  { label: "案例", labelEn: "Cases", href: "#cases" },
  { label: "AI 企劃", labelEn: "AI Planner", href: "#ai-generator" },
  { label: "ROI 計算", labelEn: "ROI", href: "#roi-calculator" },
  { label: "關於我們", labelEn: "About", href: "#about" },
  { label: "聯繫", labelEn: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 backdrop-blur-xl bg-background/80 border-b border-border/50 shadow-lg"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <img
            src="/manus-storage/redin-logo_cba1da9b.jpg"
            alt="Redin Creative Logo"
            className="h-10 w-10 rounded-lg object-contain"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold font-['Playfair_Display'] text-gradient-gold leading-tight">
              REDIN CREATIVE
            </span>
            <span className="text-xs text-muted-foreground font-medium hidden sm:block leading-tight">
              紅人創文化傳媒有限公司
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-gold transition-colors duration-200 rounded-lg hover:bg-accent/50"
            >
              {lang === "zh" ? item.label : item.labelEn}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
            className="p-2 rounded-lg bg-accent/50 hover:bg-accent text-foreground transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-1"
            aria-label="Toggle language"
          >
            <Globe size={16} />
            <span className="text-xs font-medium">{lang === "zh" ? "EN" : "中"}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-accent/50 hover:bg-accent text-foreground transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex px-5 py-2.5 text-sm font-semibold rounded-lg bg-gold text-slate-950 hover:bg-gold-light transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-gold/20"
          >
            {lang === "zh" ? "免費諮詢" : "Contact Us"}
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg bg-accent/50 hover:bg-accent text-foreground transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="lg:hidden overflow-hidden backdrop-blur-xl bg-background/95 border-b border-border/50"
          >
            <div className="container py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-foreground/80 hover:text-gold rounded-lg hover:bg-accent/50 transition-colors"
                >
                  {lang === "zh" ? item.label : item.labelEn}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-5 py-3 text-sm font-semibold rounded-lg bg-gold text-slate-950 text-center hover:bg-gold-light transition-all"
              >
                {lang === "zh" ? "免費諮詢" : "Contact Us"}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

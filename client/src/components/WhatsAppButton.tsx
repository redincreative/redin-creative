import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappUrl = "https://wa.me/85267057987?text=" + encodeURIComponent("你好，我想了解 Redin Creative 的行銷服務。");

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="absolute bottom-16 right-0 glass-card p-4 w-64 border-gold/20"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
            >
              <X size={14} />
            </button>
            <p className="text-sm font-bold text-foreground mb-1">
              需要行銷諮詢？
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              透過 WhatsApp 即時與我們的策略團隊聯繫
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-2 text-center text-sm font-semibold rounded-lg bg-[#25D366] text-white hover:bg-[#20BD5A] transition-all"
            >
              開始對話
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setShowTooltip(!showTooltip)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 flex items-center justify-center hover:bg-[#20BD5A] transition-colors"
        aria-label="WhatsApp 聯繫"
      >
        <MessageCircle size={26} fill="white" strokeWidth={0} />
      </motion.button>
    </div>
  );
}

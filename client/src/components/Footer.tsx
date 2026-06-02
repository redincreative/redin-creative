export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-border/30">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold font-['Playfair_Display'] text-gradient-gold mb-3">
              REDIN CREATIVE
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              紅人創文化傳媒有限公司
              <br />
              香港領先全方位市場營銷服務商
            </p>
            <p className="text-xs text-muted-foreground">
              創意驅動・全網聯動・實效落地
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-3">核心服務</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-gold transition-colors cursor-pointer">品牌策略</li>
              <li className="hover:text-gold transition-colors cursor-pointer">KOL/KOC 營銷</li>
              <li className="hover:text-gold transition-colors cursor-pointer">社交媒體管理</li>
              <li className="hover:text-gold transition-colors cursor-pointer">危機公關</li>
              <li className="hover:text-gold transition-colors cursor-pointer">線下渠道鋪設</li>
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-3">覆蓋平台</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>小紅書 / 抖音</li>
              <li>Instagram / Facebook</li>
              <li>YouTube / Threads</li>
              <li>微信 / 微博</li>
              <li>大眾點評 / 高德地圖</li>
            </ul>
          </div>

          {/* Group */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-3">香港戰略合作夥伴</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://www.redincreative.io/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  RC小紅書/抖音帳號二手買賣網
                </a>
              </li>
              <li>
                <a href="https://www.nsc-o2o.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  NSC 网红网
                </a>
              </li>
              <li>
                <a href="https://www.redipgroup.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  紅品文化
                </a>
              </li>
              <li>
                <a href="https://www.nufund-hk.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  NUFund Consultancy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="pt-8 border-t border-border/30 mb-6">
          <div className="flex justify-center gap-4 mb-6">
            <a href="https://www.instagram.com/redin.creative" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center text-muted-foreground hover:text-gold hover:bg-gold/10 transition-all duration-200 hover:scale-110" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://www.facebook.com/RedinCreative" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center text-muted-foreground hover:text-gold hover:bg-gold/10 transition-all duration-200 hover:scale-110" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://www.youtube.com/@redincreative" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center text-muted-foreground hover:text-gold hover:bg-gold/10 transition-all duration-200 hover:scale-110" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
            </a>
            <a href="https://www.xiaohongshu.com/user/redincreative" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center overflow-hidden hover:bg-gold/10 transition-all duration-200 hover:scale-110" aria-label="小紅書">
              <img src="/manus-storage/xiaohongshu-logo_22aa7f9d.jpeg" alt="小紅書" className="w-6 h-6 object-contain rounded" />
            </a>
            <a href="https://www.threads.net/@redincreative" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center text-muted-foreground hover:text-gold hover:bg-gold/10 transition-all duration-200 hover:scale-110" aria-label="Threads">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3 14.5c-1.5 1-3.5 1-5 0s-2-3-1.5-4.5 2-2.5 3.5-2.5 3 1 3.5 2.5.5 3.5-1.5 4.5z"/></svg>
            </a>
            <a href="https://wa.me/85267057987" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center text-muted-foreground hover:text-gold hover:bg-gold/10 transition-all duration-200 hover:scale-110" aria-label="WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Redin Creative Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>微信公眾號：nscredin</span>
            <span className="hidden sm:inline">|</span>
            <span>香港 · 深圳 · 廣州</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

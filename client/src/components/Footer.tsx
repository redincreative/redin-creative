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
            <h4 className="text-sm font-bold text-foreground mb-3">集團成員</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://www.redincreative.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  Redin Creative 紅人創
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

        {/* Bottom */}
        <div className="pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Redin Creative Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>微信公眾號：nscredin</span>
            <span className="hidden sm:inline">|</span>
            <span>香港 · 深圳 · 東莞</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

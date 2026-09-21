import { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Zap, Layers, ChevronRight, Clock } from 'lucide-react';
import { ThemeSettings } from '../types';

interface AnnouncementBarProps {
  themeSettings: ThemeSettings;
  onOpenShopifyModal: () => void;
  onUpdateThemeSettings: (settings: Partial<ThemeSettings>) => void;
}

export function AnnouncementBar({
  themeSettings,
  onOpenShopifyModal,
  onUpdateThemeSettings
}: AnnouncementBarProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 22, seconds: 50 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format2 = (n: number) => n.toString().padStart(2, '0');

  return (
    <div id="announcement-bar" className="bg-slate-100/95 border-b border-slate-200 text-xs text-slate-700 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Deals & Countdown */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 font-semibold border border-cyan-200">
            <Zap className="w-3.5 h-3.5 text-cyan-600 animate-pulse" />
            <span className="font-tech tracking-wider font-bold">AVEART FLASH DROP</span>
          </div>
          <p className="hidden sm:inline text-slate-700">
            Free Shipping on orders over $99 | Use code <span className="font-mono text-cyan-800 font-bold bg-white px-2 py-0.5 rounded border border-slate-200 shadow-xs">AVEART10</span> for 10% OFF
          </p>
          <div className="flex items-center gap-1 text-slate-600 font-mono text-[11px] bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-xs">
            <Clock className="w-3 h-3 text-cyan-600" />
            <span>{format2(timeLeft.hours)}:{format2(timeLeft.minutes)}:{format2(timeLeft.seconds)}</span>
          </div>
        </div>

        {/* Right: Shopify integration trigger & Currency & Security */}
        <div className="flex items-center gap-3 ml-auto">
          <button
            id="btn-shopify-integration"
            onClick={onOpenShopifyModal}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-all text-[11px] font-medium"
            title="Ver arquivos Liquid e integração Shopify OS 2.0"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tema Shopify OS 2.0</span>
            <ChevronRight className="w-3 h-3" />
          </button>

          {/* Currency selector */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5 shadow-xs">
            <button
              onClick={() => onUpdateThemeSettings({ currency: 'USD' })}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                themeSettings.currency === 'USD' ? 'bg-cyan-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => onUpdateThemeSettings({ currency: 'EUR' })}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                themeSettings.currency === 'EUR' ? 'bg-cyan-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EUR (€)
            </button>
            <button
              onClick={() => onUpdateThemeSettings({ currency: 'BRL' })}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                themeSettings.currency === 'BRL' ? 'bg-cyan-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              BRL (R$)
            </button>
          </div>

          <div className="hidden md:flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-bit Encrypted Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

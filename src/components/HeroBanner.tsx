import { Zap, ShieldCheck, Truck, ArrowRight, Flame, Cpu, Sparkles } from 'lucide-react';
import { ThemeSettings } from '../types';
import { formatCurrency } from '../utils/formatters';

interface HeroBannerProps {
  themeSettings: ThemeSettings;
  onFilterCategory: (cat: string) => void;
  onSelectFeatured: () => void;
}

export function HeroBanner({
  themeSettings,
  onFilterCategory,
  onSelectFeatured
}: HeroBannerProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-100/80 via-white to-slate-50 border-b border-slate-200">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>AVEART PRO TECH ECOSYSTEM // 2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-display">
              Alta Performance Para o Seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600">Setup Definitivo</span>.
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              Monitores OLED 240Hz, teclados magnéticos com Rapid Trigger, mouses ultraleves e GPUs de ponta. 
              Tudo com estoque imediato, checkout criptografado de alta segurança e entrega expressa global.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onSelectFeatured}
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-slate-900/15 transition-all hover:scale-105"
              >
                <span>Explorar Drop em Destaque</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </button>

              <button
                onClick={() => onFilterCategory('Teclados Mecânicos')}
                className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold text-sm transition-all shadow-xs"
              >
                Switches Hall Effect
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 max-w-xl text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center border border-cyan-200 shrink-0">
                  <Truck className="w-4 h-4 text-cyan-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 leading-tight">Envio Turbo</p>
                  <p className="text-[11px] text-slate-500">Despacho em até 24h</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-200 shrink-0">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 leading-tight">Garantia Pro</p>
                  <p className="text-[11px] text-slate-500">Até 3 anos oficial</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center border border-amber-200 shrink-0">
                  <Zap className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 leading-tight">AVEART10</p>
                  <p className="text-[11px] text-slate-500">10% OFF no checkout</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Showcase Card right side */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-white border border-slate-200 p-5 shadow-xl overflow-hidden group">
              <div className="absolute top-3 right-3 z-20">
                <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-mono font-bold flex items-center gap-1 shadow-xs">
                  <Flame className="w-3 h-3 text-amber-600" />
                  DESTAQUE DA SEMANA
                </span>
              </div>

              <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-100 mb-4 relative border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80"
                  alt="ROG OLED Gaming Monitor"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono text-cyan-300 border border-slate-700">
                  240Hz // 0.03ms OLED 1440p
                </div>
              </div>

              <div>
                <p className="text-xs text-cyan-700 font-mono font-bold uppercase">ASUS ROG Swift Esports</p>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                  Monitor OLED 27" 240Hz PG27AQDM
                </h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black font-mono text-slate-900">
                    {formatCurrency(899.99, themeSettings.currency)}
                  </span>
                  <span className="text-xs text-slate-400 line-through font-mono">
                    {formatCurrency(1099.99, themeSettings.currency)}
                  </span>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    -18% OFF
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  ou 4x sem juros com Klarna/Affirm no checkout
                </p>
              </div>

              <button
                onClick={onSelectFeatured}
                className="w-full mt-4 py-2.5 rounded-xl bg-slate-900 hover:bg-cyan-600 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Ver Especificações & Comprar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

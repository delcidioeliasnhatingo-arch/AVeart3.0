import { X, Sliders } from 'lucide-react';
import { ThemeSettings } from '../types';

interface ThemeCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ThemeSettings;
  onUpdateSettings: (newSettings: Partial<ThemeSettings>) => void;
}

export function ThemeCustomizerModal({
  isOpen,
  onClose,
  settings,
  onUpdateSettings
}: ThemeCustomizerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        id="theme-customizer-modal"
        className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-600" />
            <h3 className="font-display font-bold text-slate-900 text-base">
              AVEART Theme Customizer
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs text-slate-700">
          
          {/* Accent Color */}
          <div>
            <label className="font-mono uppercase font-bold text-slate-700 block mb-2">
              Primary Accent Color
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'cyan', label: 'Cyan Tech', color: 'bg-cyan-500' },
                { id: 'red', label: 'Flame Red', color: 'bg-rose-500' },
                { id: 'emerald', label: 'Emerald Mint', color: 'bg-emerald-500' },
                { id: 'purple', label: 'Violet Pro', color: 'bg-violet-500' }
              ].map(theme => (
                <button
                  key={theme.id}
                  onClick={() => onUpdateSettings({ primaryAccent: theme.id as any })}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                    settings.primaryAccent === theme.id
                      ? 'border-cyan-600 bg-cyan-50/60 shadow-xs ring-2 ring-cyan-500/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full ${theme.color} shadow-xs`} />
                  <span className="text-[11px] font-semibold text-slate-800">{theme.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Currency */}
          <div>
            <label className="font-mono uppercase font-bold text-slate-700 block mb-2">
              Store Currency
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['USD', 'EUR', 'BRL'] as const).map(curr => (
                <button
                  key={curr}
                  onClick={() => onUpdateSettings({ currency: curr })}
                  className={`p-2.5 rounded-xl border font-mono font-bold transition-all ${
                    settings.currency === curr
                      ? 'bg-cyan-50 text-cyan-900 border-cyan-500 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {curr === 'USD' ? 'USD ($)' : curr === 'EUR' ? 'EUR (€)' : 'BRL (R$)'}
                </button>
              ))}
            </div>
          </div>

          {/* Free Shipping Threshold */}
          <div>
            <label className="font-mono uppercase font-bold text-slate-700 block mb-1">
              Free Shipping Order Threshold
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-slate-400 font-bold">$</span>
              <input
                type="number"
                value={settings.freeShippingThreshold}
                onChange={(e) => onUpdateSettings({ freeShippingThreshold: Number(e.target.value) || 150 })}
                className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500 font-mono shadow-xs"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <p className="font-semibold text-slate-900">Card Interactive Glow Effects</p>
                <p className="text-[11px] text-slate-500">Enable clean elevated focus borders on hover</p>
              </div>
              <input
                type="checkbox"
                checked={settings.enableRgbGlow}
                onChange={(e) => onUpdateSettings({ enableRgbGlow: e.target.checked })}
                className="w-5 h-5 accent-cyan-600 rounded border-slate-300 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <p className="font-semibold text-slate-900">Show Performance Spec Badges</p>
                <p className="text-[11px] text-slate-500">Displays Hz, sensor DPI, and wireless specs on product cards</p>
              </div>
              <input
                type="checkbox"
                checked={settings.showFpsBenchmarks}
                onChange={(e) => onUpdateSettings({ showFpsBenchmarks: e.target.checked })}
                className="w-5 h-5 accent-cyan-600 rounded border-slate-300 cursor-pointer"
              />
            </label>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
          >
            Save & Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
}

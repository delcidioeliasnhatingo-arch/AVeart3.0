import { useState } from 'react';
import { 
  X, 
  Layers, 
  Code, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  FileJson, 
  ExternalLink,
  ShieldCheck,
  Zap,
  SlidersHorizontal
} from 'lucide-react';
import { SHOPIFY_SETTINGS_SCHEMA, LIQUID_TEMPLATES, SHOPIFY_INSTALL_STEPS } from '../data/shopifyThemeSchema';

interface ShopifyIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShopifyIntegrationModal({ isOpen, onClose }: ShopifyIntegrationModalProps) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'liquid' | 'settings' | 'install'>('liquid');
  const [selectedLiquidFile, setSelectedLiquidFile] = useState<keyof typeof LIQUID_TEMPLATES>('sections/collection-filters.liquid');
  const [copiedCode, setCopiedCode] = useState(false);
  const [downloadedZip, setDownloadedZip] = useState(false);

  const currentCode = activeTab === 'liquid'
    ? LIQUID_TEMPLATES[selectedLiquidFile]
    : JSON.stringify(SHOPIFY_SETTINGS_SCHEMA, null, 2);

  const handleCopy = () => {
    navigator.clipboard?.writeText(currentCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadThemePackage = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({
        themeName: "AVEART Electronics & Gaming Shopify OS 2.0",
        version: "2.5.0",
        author: "AVEART Studio",
        sections: LIQUID_TEMPLATES,
        schema: SHOPIFY_SETTINGS_SCHEMA
      }, null, 2)
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "aveart-electronics-shopify-theme-config.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setDownloadedZip(true);
    setTimeout(() => setDownloadedZip(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="shopify-integration-modal"
        className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shadow-xs">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-slate-900 text-base">
                  Shopify Online Store 2.0 Theme Integration
                </h3>
                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  READY TO IMPORT
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Liquid templates, JSON schemas, and activation guide for AVEART filters & checkout
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher & Download CTA */}
        <div className="bg-white px-6 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('liquid')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'liquid'
                  ? 'bg-cyan-50 text-cyan-900 border border-cyan-300 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Liquid Sections (.liquid)</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'settings'
                  ? 'bg-cyan-50 text-cyan-900 border border-cyan-300 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileJson className="w-3.5 h-3.5" />
              <span>settings_schema.json</span>
            </button>

            <button
              onClick={() => setActiveTab('install')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'install'
                  ? 'bg-cyan-50 text-cyan-900 border border-cyan-300 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Setup Guide</span>
            </button>
          </div>

          <button
            onClick={handleDownloadThemePackage}
            className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all hover:scale-105"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloadedZip ? 'Exported Successfully!' : 'Export Theme Package'}</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
          {activeTab === 'liquid' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {(Object.keys(LIQUID_TEMPLATES) as Array<keyof typeof LIQUID_TEMPLATES>).map(file => (
                    <button
                      key={file}
                      onClick={() => setSelectedLiquidFile(file)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                        selectedLiquidFile === file
                          ? 'bg-white text-cyan-800 border border-cyan-400 font-bold shadow-xs'
                          : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                      }`}
                    >
                      {file}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleCopy}
                  className="px-3 py-1 rounded-lg bg-white hover:bg-slate-100 text-xs text-slate-700 flex items-center gap-1.5 transition-colors border border-slate-200 shadow-xs"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <div className="relative rounded-xl bg-slate-900 p-4 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto max-h-96 shadow-xs">
                <pre>{LIQUID_TEMPLATES[selectedLiquidFile]}</pre>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-600">
                  Structure for Shopify <code>config/settings_schema.json</code> file, powering the visual theme editor.
                </p>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 rounded-lg bg-white hover:bg-slate-100 text-xs text-slate-700 flex items-center gap-1.5 transition-colors border border-slate-200 shadow-xs"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied!' : 'Copy JSON'}</span>
                </button>
              </div>

              <div className="relative rounded-xl bg-slate-900 p-4 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto max-h-96 shadow-xs">
                <pre>{JSON.stringify(SHOPIFY_SETTINGS_SCHEMA, null, 2)}</pre>
              </div>
            </div>
          )}

          {activeTab === 'install' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SHOPIFY_INSTALL_STEPS.map((step) => (
                  <div key={step.step} className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-cyan-50 text-cyan-800 font-mono font-bold text-xs flex items-center justify-center border border-cyan-200">
                        {step.step}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 uppercase font-mono">{step.title}</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Supported Gateways list */}
              <div className="p-4 rounded-xl bg-cyan-50/60 border border-cyan-200 space-y-2">
                <h4 className="text-xs font-mono uppercase font-bold text-cyan-900 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-cyan-700" />
                  Natively Supported Payment Gateways with AVEART Shopify Theme:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs text-slate-800">
                  <div className="p-2 rounded-lg bg-white border border-slate-200 font-medium text-center shadow-xs">
                    Shopify Payments & Shop Pay
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-slate-200 font-medium text-center shadow-xs">
                    Stripe & Apple Pay / Google Pay
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-slate-200 font-medium text-center shadow-xs">
                    PayPal & Venmo Express
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-slate-200 font-medium text-center shadow-xs">
                    Klarna & Affirm Buy Now Pay Later
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Compliant with Shopify Liquid 2024–2026 Engine</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

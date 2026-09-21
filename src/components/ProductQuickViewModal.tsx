import { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingCart, 
  Zap, 
  ShieldCheck, 
  Truck, 
  Check, 
  Sparkles, 
  Share2, 
  Cpu,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Product, ThemeSettings } from '../types';
import { formatCurrency, calculateInstallments } from '../utils/formatters';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, variants: Record<string, string>, extendedWarranty: boolean) => void;
  onInstantCheckout: (product: Product, quantity: number, variants: Record<string, string>, extendedWarranty: boolean) => void;
  themeSettings: ThemeSettings;
}

export function ProductQuickViewModal({
  product,
  onClose,
  onAddToCart,
  onInstantCheckout,
  themeSettings
}: ProductQuickViewModalProps) {
  if (!product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extendedWarranty, setExtendedWarranty] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.variants.forEach(v => {
      initial[v.name] = v.options[0];
    });
    return initial;
  });
  const [copiedLink, setCopiedLink] = useState(false);

  const pixPrice = product.price * 0.95;
  const warrantyPrice = 25.00;
  const totalPrice = (product.price * quantity) + (extendedWarranty ? warrantyPrice : 0);
  const installments = calculateInstallments(totalPrice, 4);

  const handleVariantSelect = (variantName: string, option: string) => {
    setSelectedVariants(prev => ({ ...prev, [variantName]: option }));
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="product-quickview-modal"
        className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-slate-400 hover:text-slate-700 border border-slate-200 transition-colors shadow-xs"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Left: Product Gallery (6 cols) */}
          <div className="md:col-span-6 p-6 bg-slate-50 border-r border-slate-200 flex flex-col justify-between">
            <div>
              {/* Active Image */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white border border-slate-200 shadow-xs">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-50 text-cyan-800 border border-cyan-200 shadow-xs">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-white ${
                        selectedImageIndex === idx ? 'border-cyan-600 shadow-xs' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick trust strip */}
            <div className="grid grid-cols-2 gap-2 mt-6 pt-4 border-t border-slate-200 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-cyan-600" />
                <span>Express Insured Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{product.warrantyYears}-Year Manufacturer Warranty</span>
              </div>
            </div>
          </div>

          {/* Right: Details & Purchase Options (6 cols) */}
          <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-between space-y-5 max-h-[85vh] overflow-y-auto bg-white">
            <div>
              {/* Header: Brand & SKU & Share */}
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="font-mono uppercase font-bold text-cyan-700">{product.brand}</span>
                  <span>•</span>
                  <span className="font-mono text-slate-400">SKU: {product.sku}</span>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 text-slate-500 hover:text-cyan-700 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Copied Link!' : 'Share'}</span>
                </button>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mt-2 leading-tight">
                {product.title}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-100'}`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-800">{product.rating}</span>
                <span className="text-xs text-slate-500">({product.reviewsCount} verified reviews)</span>
              </div>

              {/* Pricing Box */}
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black font-mono text-slate-900">
                    {formatCurrency(totalPrice, themeSettings.currency)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-sm text-slate-400 line-through font-mono">
                      {formatCurrency(product.compareAtPrice * quantity, themeSettings.currency)}
                    </span>
                  )}
                </div>

                {/* Digital Pay Highlight */}
                <div className="flex items-center justify-between text-xs bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-emerald-800">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Zap className="w-4 h-4 text-emerald-600" />
                    <span>{formatCurrency(pixPrice * quantity, themeSettings.currency)} with Digital Pay</span>
                  </div>
                  <span className="font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px]">
                    5% INSTANT OFF
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-mono">
                  or {installments.count} interest-free payments of <span className="text-slate-900 font-bold">{formatCurrency(installments.value, themeSettings.currency)}</span>
                </p>
              </div>

              {/* Variants Selector (e.g. Case, Switches) */}
              {product.variants.map((v) => (
                <div key={v.name} className="mt-4">
                  <label className="text-xs font-mono uppercase text-slate-700 font-bold flex items-center justify-between">
                    <span>{v.name}:</span>
                    <span className="text-cyan-700 font-semibold">{selectedVariants[v.name]}</span>
                  </label>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    {v.options.map((opt) => {
                      const isSelected = selectedVariants[v.name] === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => handleVariantSelect(v.name, opt)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                            isSelected
                              ? 'bg-cyan-600 text-white font-bold shadow-xs'
                              : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Extended Warranty Add-on */}
              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-cyan-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">AVEART Care+ Pro Warranty (+1 Year)</p>
                    <p className="text-[11px] text-slate-500">Expedited advance replacement & zero deductible for $25.00</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={extendedWarranty}
                  onChange={(e) => setExtendedWarranty(e.target.checked)}
                  className="w-5 h-5 accent-cyan-600 rounded border-slate-300 cursor-pointer"
                />
              </div>

              {/* Quantity & Actions */}
              <div className="mt-6 flex items-center gap-3">
                {/* Quantity modifier */}
                <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center font-bold text-base transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-mono font-bold text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                    className="w-8 h-8 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center font-bold text-base transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => {
                    onAddToCart(product, quantity, selectedVariants, extendedWarranty);
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-200 transition-colors shadow-xs"
                >
                  <ShoppingCart className="w-4 h-4 text-cyan-600" />
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* Instant Buy Now CTA */}
              <button
                onClick={() => {
                  onInstantCheckout(product, quantity, selectedVariants, extendedWarranty);
                  onClose();
                }}
                className="w-full mt-2 py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all hover:scale-[1.005]"
              >
                <Zap className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                <span>Buy Now • Instant Checkout</span>
              </button>

              {/* Specs Table Drawer */}
              <div className="mt-6 pt-4 border-t border-slate-200">
                <p className="text-xs font-mono uppercase font-bold text-slate-700 mb-2">
                  Technical Specifications
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {product.specs.map(spec => (
                    <div key={spec.label} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="text-[10px] text-slate-500 block uppercase font-mono font-semibold">{spec.label}</span>
                      <span className="font-medium text-slate-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

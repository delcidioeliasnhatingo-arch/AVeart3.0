import { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Tag, 
  Check, 
  Truck, 
  Zap, 
  Lock 
} from 'lucide-react';
import { CartItem, ThemeSettings } from '../types';
import { formatCurrency } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
  themeSettings: ThemeSettings;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  themeSettings
}: CartDrawerProps) {
  if (!isOpen) return null;

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(false);

  // Math
  const subtotal = items.reduce((acc, item) => {
    const itemTotal = item.product.price * item.quantity;
    const warrantyTotal = item.extendedWarranty ? 99 * item.quantity : 0;
    return acc + itemTotal + warrantyTotal;
  }, 0);

  const discountPercent = appliedCoupon === 'AVEART10' || appliedCoupon === 'GAMER10' ? 0.10 : appliedCoupon === 'WELCOME5' ? 0.05 : 0;
  const discountAmount = subtotal * discountPercent;
  const total = subtotal - discountAmount;

  const freeShippingThreshold = themeSettings.freeShippingThreshold || 150;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = onApplyCoupon(couponInput.trim());
    if (success) {
      setCouponSuccess(true);
      setCouponError('');
      setCouponInput('');
      setTimeout(() => setCouponSuccess(false), 3000);
    } else {
      setCouponError('Cupom inválido ou expirado. Tente AVEART10');
      setCouponSuccess(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          id="cart-drawer-panel"
          className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between"
        >
          {/* Cart Header */}
          <div className="p-5 border-b border-slate-100 bg-slate-50/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-cyan-600" />
                <h2 className="font-display font-bold text-lg text-slate-900">
                  Seu Carrinho AVEART
                </h2>
                <span className="text-xs font-mono bg-cyan-50 text-cyan-800 border border-cyan-200 px-2 py-0.5 rounded-full font-semibold">
                  {items.reduce((sum, item) => sum + item.quantity, 0)} itens
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Meter */}
            <div className="mt-4 p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-700 font-medium flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-cyan-600" />
                  {remainingForFreeShipping === 0 ? (
                    <span className="text-emerald-700 font-bold">Parabéns! Você ganhou Frete Grátis!</span>
                  ) : (
                    <span>
                      Faltam <strong className="text-cyan-700 font-mono font-bold">{formatCurrency(remainingForFreeShipping, themeSettings.currency)}</strong> para Frete Grátis
                    </span>
                  )}
                </span>
                <span className="text-[11px] font-mono text-slate-500 font-bold">
                  {Math.round(freeShippingProgress)}%
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                <div
                  className="bg-cyan-600 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-slate-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 shadow-xs">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-800 text-base">Seu carrinho está vazio</h3>
                <p className="text-xs text-slate-500 max-w-xs">
                  Adicione monitores, mouses esports, teclados magnéticos ou gadgets para começar.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs"
                >
                  Explorar Loja AVEART
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded-xl bg-slate-100 border border-slate-200 shrink-0"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1 leading-snug">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Remover item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Variants pills */}
                    {Object.entries(item.selectedVariants).length > 0 && (
                      <div className="flex flex-wrap gap-1 text-[10px] text-slate-500">
                        {Object.entries(item.selectedVariants).map(([key, val]) => (
                          <span key={key} className="bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200 font-mono">
                            {key}: {val}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Warranty Tag */}
                    {item.extendedWarranty && (
                      <div className="flex items-center gap-1 text-[10px] text-cyan-700 font-semibold">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Garantia Pro (+{formatCurrency(25, themeSettings.currency)})</span>
                      </div>
                    )}

                    {/* Price & Quantity Modifier */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-mono font-bold text-xs text-slate-900">
                        {formatCurrency(
                          (item.product.price + (item.extendedWarranty ? 25 : 0)) * item.quantity,
                          themeSettings.currency
                        )}
                      </span>

                      <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded text-slate-600 hover:text-slate-900 flex items-center justify-center font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded text-slate-600 hover:text-slate-900 flex items-center justify-center font-bold text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-4">
              
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-cyan-50 border border-cyan-200 text-xs text-cyan-900">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-cyan-700" />
                      <span>Cupom <strong>{appliedCoupon}</strong> ativo (-10%)</span>
                    </div>
                    <button
                      type="button"
                      onClick={onRemoveCoupon}
                      className="text-xs text-slate-500 hover:text-rose-600 font-bold"
                    >
                      Remover
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Cupom (ex: AVEART10)"
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 uppercase font-mono placeholder-slate-400 focus:outline-none focus:border-cyan-500 shadow-xs"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white transition-colors shadow-xs"
                    >
                      Aplicar
                    </button>
                  </div>
                )}
                {couponError && <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>}
                {couponSuccess && <p className="text-[11px] text-emerald-700 font-medium">Cupom de 10% aplicado com sucesso!</p>}
              </form>

              {/* Subtotal & Discounts */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-slate-800 font-semibold">{formatCurrency(subtotal, themeSettings.currency)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Desconto do Cupom</span>
                    <span className="font-mono font-bold">-{formatCurrency(discountAmount, themeSettings.currency)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Envio Estimado</span>
                  <span className="font-mono text-emerald-700 font-semibold">
                    {remainingForFreeShipping === 0 ? 'GRÁTIS' : 'Calculado no Checkout'}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total</span>
                  <span className="font-mono text-xl text-slate-900">
                    {formatCurrency(total, themeSettings.currency)}
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 text-right">
                  ou 4x sem juros de <strong className="text-slate-800 font-mono">{formatCurrency(total / 4, themeSettings.currency)}</strong> no Cartão ou Klarna
                </div>
              </div>

              {/* Finalize Purchase Button */}
              <button
                id="btn-checkout-from-cart"
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <Lock className="w-4 h-4 text-cyan-400" />
                <span>Finalizar Compra Segura</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              {/* Bottom security strip */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  SSL 256-Bit
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-cyan-600" />
                  Shopify Checkout
                </span>
                <span>•</span>
                <span>PCI-DSS Nível 1</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

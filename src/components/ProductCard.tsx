import { useState } from 'react';
import { 
  ShoppingCart, 
  Eye, 
  Star, 
  Zap, 
  Check, 
  Heart, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';
import { Product, ThemeSettings } from '../types';
import { formatCurrency, calculateInstallments } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
  themeSettings: ThemeSettings;
}

export function ProductCard({
  product,
  onQuickView,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist,
  themeSettings
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const pixPrice = product.price * 0.90; // 10% off no Pix
  const installments = calculateInstallments(product.price, 12);
  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const accentBorderClass = {
    cyan: 'hover:border-cyan-500 hover:shadow-cyan-500/10',
    red: 'hover:border-red-500 hover:shadow-red-500/10',
    emerald: 'hover:border-emerald-500 hover:shadow-emerald-500/10',
    purple: 'hover:border-purple-500 hover:shadow-purple-500/10'
  }[themeSettings.primaryAccent];

  return (
    <div
      id={`product-card-${product.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onQuickView(product)}
      className={`group relative flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer ${accentBorderClass}`}
    >
      {/* Badges & Wishlist Header */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-wrap gap-1.5 pointer-events-auto">
          {product.badge && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider bg-slate-900 text-white shadow-xs">
              {product.badge}
            </span>
          )}
          {discountPercent && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs">
              -{discountPercent}%
            </span>
          )}
        </div>

        {onToggleWishlist && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className="pointer-events-auto p-2 rounded-xl bg-white/90 hover:bg-white text-slate-400 hover:text-rose-500 border border-slate-200 backdrop-blur-md transition-colors shadow-xs"
            title="Adicionar aos favoritos"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        )}
      </div>

      {/* Image Showcase */}
      <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden border-b border-slate-100">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Quick View Button overlay on hover */}
        <div className={`absolute inset-0 bg-slate-900/30 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-900 text-xs font-bold shadow-lg flex items-center gap-1.5 transform hover:scale-105 transition-all border border-slate-200"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-600" />
            <span>Espiar Produto</span>
          </button>
        </div>

        {/* Gamer Specs Strip */}
        <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1 pointer-events-none">
          {product.refreshRate && (
            <span className="text-[10px] font-mono bg-white/90 backdrop-blur-md px-1.5 py-0.5 rounded text-cyan-800 border border-slate-200 shadow-xs font-semibold">
              {product.refreshRate}
            </span>
          )}
          {product.switches && (
            <span className="text-[10px] font-mono bg-white/90 backdrop-blur-md px-1.5 py-0.5 rounded text-purple-800 border border-slate-200 truncate max-w-[140px] shadow-xs font-semibold">
              {product.switches}
            </span>
          )}
          {product.rgb && (
            <span className="text-[10px] font-mono bg-white/90 backdrop-blur-md px-1.5 py-0.5 rounded text-emerald-800 border border-slate-200 flex items-center gap-1 shadow-xs font-semibold">
              <Sparkles className="w-2.5 h-2.5 text-emerald-600" /> RGB
            </span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Brand & Reviews */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-mono uppercase font-bold text-cyan-700 text-[11px] tracking-wider">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-amber-500">
              <Star className="w-3 h-3 fill-amber-400" />
              <span className="font-bold text-slate-700">{product.rating}</span>
              <span className="text-slate-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="mt-1 text-sm font-bold text-slate-900 group-hover:text-cyan-600 line-clamp-2 transition-colors leading-snug">
            {product.title}
          </h3>

          <p className="mt-1 text-[11px] text-slate-500 line-clamp-1">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing Matrix */}
        <div className="pt-2 border-t border-slate-100 space-y-1">
          {product.compareAtPrice && (
            <div className="text-xs text-slate-400 line-through font-mono">
              {formatCurrency(product.compareAtPrice, themeSettings.currency)}
            </div>
          )}

          {/* Regular Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg sm:text-xl font-extrabold font-mono text-slate-900">
              {formatCurrency(product.price, themeSettings.currency)}
            </span>
          </div>

          {/* Discount / Payment Highlight */}
          <div className="flex items-center gap-1 text-xs text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
            <Zap className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
            <span className="truncate">
              Cupom AVEART10 (-10% OFF): {formatCurrency(pixPrice, themeSettings.currency)}
            </span>
          </div>

          {/* Installments */}
          <p className="text-[11px] text-slate-500 font-mono">
            ou 4x sem juros de <span className="text-slate-800 font-semibold">{formatCurrency(product.price / 4, themeSettings.currency)}</span> com Klarna
          </p>

          {/* Stock Scarcity alert if <= 5 */}
          {product.stockQuantity <= 5 && (
            <p className="text-[10px] text-amber-600 font-mono font-semibold flex items-center gap-1 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
              Apenas {product.stockQuantity} unidades em estoque!
            </p>
          )}
        </div>

        {/* Add to Cart CTA */}
        <button
          onClick={handleAdd}
          className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
            justAdded
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Adicionado ao Carrinho!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
              <span>Comprar Agora</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

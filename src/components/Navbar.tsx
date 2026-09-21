import { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  SlidersHorizontal, 
  Menu, 
  X, 
  Cpu, 
  Gamepad2, 
  Headphones, 
  Monitor, 
  Palette,
  ShieldAlert
} from 'lucide-react';
import { ThemeSettings, Product } from '../types';
import { formatCurrency } from '../utils/formatters';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenThemeSettings: () => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  categories: string[];
  themeSettings: ThemeSettings;
  onUpdateThemeSettings: (settings: Partial<ThemeSettings>) => void;
  products: Product[];
  onSelectProduct: (p: Product) => void;
}

export function Navbar({
  searchQuery,
  onSearchChange,
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenThemeSettings,
  selectedCategory,
  onSelectCategory,
  categories,
  themeSettings,
  onUpdateThemeSettings,
  products,
  onSelectProduct
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const filteredQuickProducts = searchQuery.trim()
    ? products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const accentColorClass = {
    cyan: 'from-cyan-500 to-blue-500 text-cyan-400 border-cyan-500/30',
    red: 'from-red-500 to-rose-600 text-red-400 border-red-500/30',
    emerald: 'from-emerald-400 to-teal-500 text-emerald-400 border-emerald-500/30',
    purple: 'from-purple-500 to-indigo-500 text-purple-400 border-purple-500/30'
  }[themeSettings.primaryAccent];

  return (
    <header id="main-navbar" className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-9 z-30 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectCategory('Todos os Produtos')}
              className="group flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-2 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                <Gamepad2 className="w-6 h-6 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-slate-900 group-hover:text-cyan-600 transition-colors">
                    AVEART
                  </span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-800 font-bold border border-cyan-200">
                    Tech
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-tech hidden sm:block">
                  Gaming & Electronics Store
                </p>
              </div>
            </button>
          </div>

          {/* Search Bar with Autocomplete Dropdown */}
          <div className="flex-1 max-w-xl relative hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                placeholder="Buscar monitores 240Hz, teclados mecânicos, RTX 4090, headsets..."
                className="w-full bg-slate-100/90 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick search results dropdown */}
            {searchFocused && filteredQuickProducts.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 divide-y divide-slate-100">
                <div className="px-3 py-1.5 text-[11px] font-mono text-cyan-700 uppercase tracking-wider font-bold">
                  Resultados Rápidos ({filteredQuickProducts.length})
                </div>
                {filteredQuickProducts.map(p => (
                  <button
                    key={p.id}
                    onMouseDown={() => onSelectProduct(p)}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors text-left"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-10 h-10 object-cover rounded-lg bg-slate-100 border border-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-900 truncate">{p.title}</p>
                      <p className="text-[11px] text-cyan-700 font-bold font-mono">
                        {formatCurrency(p.price, themeSettings.currency)}
                      </p>
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                      {p.category}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Color Accent Picker Tool */}
            <div className="hidden lg:flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-600 flex items-center gap-1 px-1 font-medium">
                <Palette className="w-3.5 h-3.5 text-cyan-600" />
                <span className="font-tech text-xs">RGB:</span>
              </span>
              {(['cyan', 'red', 'emerald', 'purple'] as const).map(color => (
                <button
                  key={color}
                  onClick={() => onUpdateThemeSettings({ primaryAccent: color })}
                  title={`Tema ${color.toUpperCase()}`}
                  className={`w-5 h-5 rounded-full transition-transform ${
                    color === 'cyan' ? 'bg-cyan-500' :
                    color === 'red' ? 'bg-red-500' :
                    color === 'emerald' ? 'bg-emerald-500' : 'bg-purple-500'
                  } ${themeSettings.primaryAccent === color ? 'ring-2 ring-slate-900 scale-110 shadow-md' : 'opacity-60 hover:opacity-100'}`}
                />
              ))}
            </div>

            {/* Theme Settings Drawer Trigger */}
            <button
              id="btn-open-theme-settings"
              onClick={onOpenThemeSettings}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors relative"
              title="Personalizar Tema Shopify"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>

            {/* Cart Trigger */}
            <button
              id="btn-open-cart-drawer"
              onClick={onOpenCart}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-md border border-slate-900 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-cyan-400" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-cyan-500 text-slate-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left text-xs leading-tight">
                <span className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Carrinho</span>
                <span className="font-mono font-bold text-white">{formatCurrency(cartTotal, themeSettings.currency)}</span>
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar periféricos, GPUs, hardware..."
              className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="hidden md:flex items-center gap-1.5 overflow-x-auto py-2.5 border-t border-slate-100 text-xs no-scrollbar">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-cyan-50 text-cyan-800 border border-cyan-200 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-2 shadow-lg">
          <p className="text-[11px] font-mono uppercase text-slate-500 tracking-wider font-bold">Categorias</p>
          <div className="grid grid-cols-2 gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                  selectedCategory === cat ? 'bg-cyan-50 text-cyan-800 font-bold border border-cyan-200' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

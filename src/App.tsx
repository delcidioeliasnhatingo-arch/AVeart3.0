import { useState, useMemo } from 'react';
import { 
  MOCK_PRODUCTS, 
  CATEGORIES, 
  BRANDS, 
  REFRESH_RATES, 
  SWITCH_TYPES, 
  CONNECTIVITY_OPTIONS 
} from './data/mockProducts';
import { 
  Product, 
  FilterState, 
  CartItem, 
  ThemeSettings 
} from './types';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductCard } from './components/ProductCard';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ShopifyIntegrationModal } from './components/ShopifyIntegrationModal';
import { ThemeCustomizerModal } from './components/ThemeCustomizerModal';
import { Footer } from './components/Footer';
import { 
  SlidersHorizontal, 
  X, 
  Flame, 
  Sparkles, 
  ArrowUpDown, 
  PackageOpen,
  Check
} from 'lucide-react';
import { formatCurrency } from './utils/formatters';

export default function App() {
  // Theme Settings
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    primaryAccent: 'cyan',
    currency: 'USD',
    showFpsBenchmarks: true,
    enableRgbGlow: true,
    freeShippingThreshold: 150
  });

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'All Products',
    brands: [],
    minPrice: 0,
    maxPrice: 4000,
    refreshRates: [],
    connectivities: [],
    switches: [],
    rgbOnly: false,
    inStockOnly: false,
    sortBy: 'featured'
  });

  // Mobile Filter Drawer Toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'cart-item-1',
      product: MOCK_PRODUCTS[1], // Wooting 60HE+
      quantity: 1,
      selectedVariants: {
        'Case': 'Anodized Black Aluminum',
        'Switches': 'Lekker Linear L60 (60cN)'
      },
      extendedWarranty: true
    }
  ]);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('GAMER10');

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(['prod-1']);

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isShopifyModalOpen, setIsShopifyModalOpen] = useState(false);
  const [isThemeSettingsOpen, setIsThemeSettingsOpen] = useState(false);

  // Filter & Search Logic
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      // Search
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesTag = product.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesBrand && !matchesCategory && !matchesTag) return false;
      }

      // Category
      if (filters.category !== 'All Products' && product.category !== filters.category) {
        return false;
      }

      // Brands
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }

      // Price
      if (product.price < filters.minPrice) return false;
      if (filters.maxPrice < 4000 && product.price > filters.maxPrice) return false;

      // Refresh Rates
      if (filters.refreshRates.length > 0 && (!product.refreshRate || !filters.refreshRates.includes(product.refreshRate))) {
        return false;
      }

      // Switches
      if (filters.switches.length > 0 && (!product.switches || !filters.switches.includes(product.switches))) {
        return false;
      }

      // Connectivity
      if (filters.connectivities.length > 0 && (!product.connectivity || !filters.connectivities.includes(product.connectivity))) {
        return false;
      }

      // RGB
      if (filters.rgbOnly && !product.rgb) return false;

      // In stock
      if (filters.inStockOnly && (!product.inStock || product.stockQuantity <= 0)) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') return b.id.localeCompare(a.id);
      return 0; // 'featured'
    });
  }, [filters]);

  // Cart operations
  const cartSubtotal = cart.reduce((acc, item) => {
    const itemTotal = item.product.price * item.quantity;
    const warrantyTotal = item.extendedWarranty ? 25 * item.quantity : 0;
    return acc + itemTotal + warrantyTotal;
  }, 0);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (
    product: Product, 
    quantity: number = 1, 
    selectedVariants: Record<string, string> = {}, 
    extendedWarranty: boolean = false
  ) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.product.id === product.id && 
        JSON.stringify(item.selectedVariants) === JSON.stringify(selectedVariants) &&
        item.extendedWarranty === extendedWarranty
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }

      const defaultVariants: Record<string, string> = { ...selectedVariants };
      if (Object.keys(defaultVariants).length === 0 && product.variants.length > 0) {
        product.variants.forEach(v => {
          defaultVariants[v.name] = v.options[0];
        });
      }

      return [
        ...prev,
        {
          id: `cart-${product.id}-${Date.now()}`,
          product,
          quantity,
          selectedVariants: defaultVariants,
          extendedWarranty
        }
      ];
    });

    setIsCartOpen(true);
  };

  const handleInstantCheckout = (
    product: Product, 
    quantity: number = 1, 
    selectedVariants: Record<string, string> = {}, 
    extendedWarranty: boolean = false
  ) => {
    handleAddToCart(product, quantity, selectedVariants, extendedWarranty);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleApplyCoupon = (code: string): boolean => {
    const upper = code.trim().toUpperCase();
    if (upper === 'GAMER10' || upper === 'WELCOME5' || upper === 'AVEART15') {
      setAppliedCoupon(upper);
      return true;
    }
    return false;
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: 'All Products',
      brands: [],
      minPrice: 0,
      maxPrice: 4000,
      refreshRates: [],
      connectivities: [],
      switches: [],
      rgbOnly: false,
      inStockOnly: false,
      sortBy: 'featured'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* 1. Announcement Bar */}
      <AnnouncementBar
        themeSettings={themeSettings}
        onOpenShopifyModal={() => setIsShopifyModalOpen(true)}
        onUpdateThemeSettings={(s) => setThemeSettings(prev => ({ ...prev, ...s }))}
      />

      {/* 2. Primary Navigation Bar */}
      <Navbar
        searchQuery={filters.search}
        onSearchChange={(search) => setFilters(prev => ({ ...prev, search }))}
        cartCount={cartCount}
        cartTotal={cartSubtotal}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenThemeSettings={() => setIsThemeSettingsOpen(true)}
        selectedCategory={filters.category}
        onSelectCategory={(category) => setFilters(prev => ({ ...prev, category }))}
        categories={CATEGORIES}
        themeSettings={themeSettings}
        onUpdateThemeSettings={(s) => setThemeSettings(prev => ({ ...prev, ...s }))}
        products={MOCK_PRODUCTS}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* 3. Hero Showcase Banner */}
      <HeroBanner
        themeSettings={themeSettings}
        onFilterCategory={(category) => setFilters(prev => ({ ...prev, category }))}
        onSelectFeatured={() => setQuickViewProduct(MOCK_PRODUCTS[0])}
      />

      {/* 4. Main Catalog with Advanced Filters & Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Active Filter Chips & Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
              {filters.category}
            </h2>
            <span className="text-xs font-mono bg-cyan-50 text-cyan-800 px-2.5 py-1 rounded-full border border-cyan-200 font-semibold shadow-xs">
              {filteredProducts.length} items found
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold flex items-center gap-2 shadow-xs hover:bg-slate-50"
            >
              <SlidersHorizontal className="w-4 h-4 text-cyan-600" />
              <span>Filters ({filteredProducts.length})</span>
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 shadow-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-cyan-600" />
              <label htmlFor="sort-select" className="text-slate-500 text-[11px] font-mono uppercase hidden sm:inline">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="bg-transparent text-slate-900 font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-white text-slate-900">Featured Gear</option>
                <option value="price-asc" className="bg-white text-slate-900">Price: Low to High</option>
                <option value="price-desc" className="bg-white text-slate-900">Price: High to Low</option>
                <option value="rating" className="bg-white text-slate-900">Highest Rated</option>
                <option value="newest" className="bg-white text-slate-900">New Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Tags */}
        {(filters.brands.length > 0 || filters.refreshRates.length > 0 || filters.switches.length > 0 || filters.rgbOnly || filters.inStockOnly || filters.search) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs text-slate-500 font-mono">Active filters:</span>
            
            {filters.search && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-50 border border-cyan-200 text-xs text-cyan-900 font-medium shadow-xs">
                Search: "{filters.search}"
                <button onClick={() => setFilters(prev => ({ ...prev, search: '' }))} className="hover:text-cyan-700 cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            )}

            {filters.brands.map(b => (
              <span key={b} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 font-medium shadow-xs">
                {b}
                <button onClick={() => setFilters(prev => ({ ...prev, brands: prev.brands.filter(x => x !== b) }))} className="hover:text-slate-900 cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            ))}

            {filters.refreshRates.map(r => (
              <span key={r} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-50 border border-cyan-200 text-xs text-cyan-900 font-mono font-medium shadow-xs">
                {r}
                <button onClick={() => setFilters(prev => ({ ...prev, refreshRates: prev.refreshRates.filter(x => x !== r) }))} className="hover:text-cyan-700 cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            ))}

            {filters.switches.map(s => (
              <span key={s} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-violet-50 border border-violet-200 text-xs text-violet-900 font-mono font-medium shadow-xs">
                {s}
                <button onClick={() => setFilters(prev => ({ ...prev, switches: prev.switches.filter(x => x !== s) }))} className="hover:text-violet-700 cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            ))}

            {filters.rgbOnly && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-violet-50 border border-violet-200 text-xs text-violet-900 font-medium shadow-xs">
                RGB Chroma
                <button onClick={() => setFilters(prev => ({ ...prev, rgbOnly: false }))} className="hover:text-violet-700 cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            )}

            {filters.inStockOnly && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium shadow-xs">
                In Stock
                <button onClick={() => setFilters(prev => ({ ...prev, inStockOnly: false }))} className="hover:text-emerald-700 cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="text-xs text-slate-500 hover:text-cyan-600 underline ml-2 cursor-pointer font-medium"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Catalog Layout: Sidebar + Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onFilterChange={(newF) => setFilters(prev => ({ ...prev, ...newF }))}
              onResetFilters={handleResetFilters}
              categories={CATEGORIES}
              brands={BRANDS}
              refreshRates={REFRESH_RATES}
              switchesList={SWITCH_TYPES}
              connectivityList={CONNECTIVITY_OPTIONS}
              totalResults={filteredProducts.length}
              themeSettings={themeSettings}
            />
          </div>

          {/* Mobile Filter Drawer */}
          {mobileFilterOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs p-4 lg:hidden">
              <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-2xl p-5 shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <h3 className="font-bold text-slate-900 font-display">Catalog Filters</h3>
                  <button onClick={() => setMobileFilterOpen(false)} className="p-1 rounded text-slate-400 hover:text-slate-700 cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-4">
                  <FilterSidebar
                    filters={filters}
                    onFilterChange={(newF) => setFilters(prev => ({ ...prev, ...newF }))}
                    onResetFilters={handleResetFilters}
                    categories={CATEGORIES}
                    brands={BRANDS}
                    refreshRates={REFRESH_RATES}
                    switchesList={SWITCH_TYPES}
                    connectivityList={CONNECTIVITY_OPTIONS}
                    totalResults={filteredProducts.length}
                    themeSettings={themeSettings}
                  />
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="w-full mt-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-colors cursor-pointer"
                  >
                    View {filteredProducts.length} Products
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1 w-full">
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
                  <PackageOpen className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No products found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your filters, expanding the price range, or clearing your search term to see more items.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                    onAddToCart={(p) => handleAddToCart(p, 1)}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    themeSettings={themeSettings}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

      </main>

      {/* 5. Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onInstantCheckout={handleInstantCheckout}
        themeSettings={themeSettings}
      />

      {/* 6. Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={() => setAppliedCoupon(null)}
        themeSettings={themeSettings}
      />

      {/* 7. Complete Secure Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        appliedCoupon={appliedCoupon}
        onClearCart={() => setCart([])}
        themeSettings={themeSettings}
      />

      {/* 8. Shopify Theme Integration & Liquid Schema Modal */}
      <ShopifyIntegrationModal
        isOpen={isShopifyModalOpen}
        onClose={() => setIsShopifyModalOpen(false)}
      />

      {/* 9. Live Theme Customizer Settings */}
      <ThemeCustomizerModal
        isOpen={isThemeSettingsOpen}
        onClose={() => setIsThemeSettingsOpen(false)}
        settings={themeSettings}
        onUpdateSettings={(s) => setThemeSettings(prev => ({ ...prev, ...s }))}
      />

      {/* 10. Comprehensive Footer */}
      <Footer onOpenShopifyModal={() => setIsShopifyModalOpen(true)} />

    </div>
  );
}

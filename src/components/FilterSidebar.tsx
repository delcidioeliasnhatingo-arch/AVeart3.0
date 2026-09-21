import { 
  Filter, 
  RotateCcw, 
  Check, 
  Sparkles, 
  Zap, 
  DollarSign, 
  Sliders, 
  Layers, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { useState } from 'react';
import { FilterState, ThemeSettings } from '../types';
import { formatCurrency } from '../utils/formatters';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  categories: string[];
  brands: string[];
  refreshRates: string[];
  switchesList: string[];
  connectivityList: string[];
  totalResults: number;
  themeSettings: ThemeSettings;
}

export function FilterSidebar({
  filters,
  onFilterChange,
  onResetFilters,
  categories,
  brands,
  refreshRates,
  switchesList,
  connectivityList,
  totalResults,
  themeSettings
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    brands: true,
    gamingSpecs: true,
    switches: true,
    connectivity: true
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleBrand = (brand: string) => {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ brands: next });
  };

  const toggleRefreshRate = (rate: string) => {
    const next = filters.refreshRates.includes(rate)
      ? filters.refreshRates.filter(r => r !== rate)
      : [...filters.refreshRates, rate];
    onFilterChange({ refreshRates: next });
  };

  const toggleSwitch = (sw: string) => {
    const next = filters.switches.includes(sw)
      ? filters.switches.filter(s => s !== sw)
      : [...filters.switches, sw];
    onFilterChange({ switches: next });
  };

  const toggleConnectivity = (conn: string) => {
    const next = filters.connectivities.includes(conn)
      ? filters.connectivities.filter(c => c !== conn)
      : [...filters.connectivities, conn];
    onFilterChange({ connectivities: next });
  };

  const hasActiveFilters = 
    filters.category !== 'Todos os Produtos' ||
    filters.brands.length > 0 ||
    filters.minPrice > 0 ||
    filters.maxPrice < 2500 ||
    filters.refreshRates.length > 0 ||
    filters.switches.length > 0 ||
    filters.connectivities.length > 0 ||
    filters.rgbOnly ||
    filters.inStockOnly;

  return (
    <aside id="advanced-filters-sidebar" className="w-full lg:w-72 shrink-0 space-y-4">
      
      {/* Filter Header & Reset */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Sliders className="w-4 h-4 text-cyan-600" />
            <span className="font-display">Filtros Avançados</span>
            <span className="text-[11px] font-mono text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200 font-semibold">
              {totalResults} itens
            </span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-xs text-slate-500 hover:text-cyan-600 flex items-center gap-1 transition-colors font-medium"
              title="Limpar todos os filtros"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Limpar</span>
            </button>
          )}
        </div>

        {/* Quick Toggles: Stock & RGB */}
        <div className="pt-3 space-y-2">
          <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
            <span className="text-xs font-medium text-slate-800">Apenas em Estoque</span>
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => onFilterChange({ inStockOnly: e.target.checked })}
              className="w-4 h-4 accent-cyan-600 rounded bg-white border-slate-300"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
            <span className="text-xs font-medium text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              Iluminação RGB Chroma
            </span>
            <input
              type="checkbox"
              checked={filters.rgbOnly}
              onChange={(e) => onFilterChange({ rgbOnly: e.target.checked })}
              className="w-4 h-4 accent-purple-600 rounded bg-white border-slate-300"
            />
          </label>
        </div>
      </div>

      {/* Categories Accordion */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <button
          onClick={() => toggleSection('categories')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider font-tech text-slate-700 hover:text-slate-900"
        >
          <span>Categorias AVEART</span>
          {openSections.categories ? <ChevronUp className="w-4 h-4 text-cyan-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.categories && (
          <div className="mt-3 space-y-1">
            {categories.map(cat => {
              const active = filters.category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onFilterChange({ category: cat })}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between font-medium ${
                    active
                      ? 'bg-cyan-50 text-cyan-800 font-bold border border-cyan-200 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate">{cat}</span>
                  {active && <Check className="w-3.5 h-3.5 text-cyan-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Price Filter Accordion */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider font-tech text-slate-700 hover:text-slate-900"
        >
          <span>Faixa de Preço (USD)</span>
          {openSections.price ? <ChevronUp className="w-4 h-4 text-cyan-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.price && (
          <div className="mt-3 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-500 uppercase font-mono font-semibold">Mínimo</label>
                <div className="relative mt-1">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">$</span>
                  <input
                    type="number"
                    value={filters.minPrice || ''}
                    onChange={(e) => onFilterChange({ minPrice: Number(e.target.value) || 0 })}
                    placeholder="0"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-7 pr-2 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-500 uppercase font-mono font-semibold">Máximo</label>
                <div className="relative mt-1">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">$</span>
                  <input
                    type="number"
                    value={filters.maxPrice === 2500 ? '' : filters.maxPrice}
                    onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) || 2500 })}
                    placeholder="2500"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-7 pr-2 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* Quick Price Buttons */}
            <div className="grid grid-cols-3 gap-1 pt-1">
              <button
                onClick={() => onFilterChange({ minPrice: 0, maxPrice: 200 })}
                className="px-2 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[10px] text-slate-700 hover:bg-cyan-50 hover:text-cyan-800 hover:border-cyan-200 font-medium"
              >
                Até $200
              </button>
              <button
                onClick={() => onFilterChange({ minPrice: 200, maxPrice: 800 })}
                className="px-2 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[10px] text-slate-700 hover:bg-cyan-50 hover:text-cyan-800 hover:border-cyan-200 font-medium"
              >
                $200 - $800
              </button>
              <button
                onClick={() => onFilterChange({ minPrice: 800, maxPrice: 2500 })}
                className="px-2 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[10px] text-slate-700 hover:bg-cyan-50 hover:text-cyan-800 hover:border-cyan-200 font-medium"
              >
                $800+ Pro
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Brands Filter */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <button
          onClick={() => toggleSection('brands')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider font-tech text-slate-700 hover:text-slate-900"
        >
          <span>Marcas High-End ({filters.brands.length})</span>
          {openSections.brands ? <ChevronUp className="w-4 h-4 text-cyan-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.brands && (
          <div className="mt-3 space-y-1 max-h-48 overflow-y-auto pr-1">
            {brands.map(brand => {
              const checked = filters.brands.includes(brand);
              return (
                <label
                  key={brand}
                  className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer text-xs text-slate-700 hover:text-slate-900 font-medium"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleBrand(brand)}
                      className="w-3.5 h-3.5 accent-cyan-600 rounded bg-white border-slate-300"
                    />
                    <span>{brand}</span>
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Gamer Specs: Refresh Rate & Switches */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <button
          onClick={() => toggleSection('gamingSpecs')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider font-tech text-slate-700 hover:text-slate-900"
        >
          <span>Taxa de Atualização (Hz)</span>
          {openSections.gamingSpecs ? <ChevronUp className="w-4 h-4 text-cyan-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.gamingSpecs && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {refreshRates.map(rate => {
              const active = filters.refreshRates.includes(rate);
              return (
                <button
                  key={rate}
                  onClick={() => toggleRefreshRate(rate)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    active
                      ? 'bg-slate-900 text-white font-bold shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {rate}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Switches Mecânicos */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <button
          onClick={() => toggleSection('switches')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider font-tech text-slate-700 hover:text-slate-900"
        >
          <span>Tecnologia de Switches</span>
          {openSections.switches ? <ChevronUp className="w-4 h-4 text-cyan-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.switches && (
          <div className="mt-3 space-y-1">
            {switchesList.map(sw => {
              const active = filters.switches.includes(sw);
              return (
                <button
                  key={sw}
                  onClick={() => toggleSwitch(sw)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between font-medium ${
                    active
                      ? 'bg-cyan-50 text-cyan-800 font-bold border border-cyan-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate">{sw}</span>
                  {active && <Check className="w-3.5 h-3.5 text-cyan-600" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Conectividade */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <button
          onClick={() => toggleSection('connectivity')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider font-tech text-slate-700 hover:text-slate-900"
        >
          <span>Conectividade</span>
          {openSections.connectivity ? <ChevronUp className="w-4 h-4 text-cyan-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.connectivity && (
          <div className="mt-3 space-y-1">
            {connectivityList.map(conn => {
              const active = filters.connectivities.includes(conn);
              return (
                <button
                  key={conn}
                  onClick={() => toggleConnectivity(conn)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between font-medium ${
                    active
                      ? 'bg-cyan-50 text-cyan-800 font-bold border border-cyan-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate">{conn}</span>
                  {active && <Check className="w-3.5 h-3.5 text-cyan-600" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

    </aside>
  );
}

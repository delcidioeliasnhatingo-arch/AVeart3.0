export const SHOPIFY_SETTINGS_SCHEMA = [
  {
    name: 'AVEART Gamer & Tech Theme Settings',
    settings: [
      {
        type: 'header',
        content: 'AVEART Visual & Tech Identity'
      },
      {
        type: 'select',
        id: 'accent_color',
        label: 'Primary Accent Color',
        options: [
          { value: '#06b6d4', label: 'Electric Cyan' },
          { value: '#ef4444', label: 'ROG Crimson' },
          { value: '#10b981', label: 'Emerald Speed' },
          { value: '#8b5cf6', label: 'Ultraviolet Purple' }
        ],
        default: '#06b6d4'
      },
      {
        type: 'checkbox',
        id: 'enable_rgb_glow',
        label: 'Enable Subtle Accent Glow on Product Cards',
        default: true
      },
      {
        type: 'header',
        content: 'Advanced Faceted Filters (Storefront OS 2.0)'
      },
      {
        type: 'checkbox',
        id: 'enable_faceted_filters',
        label: 'Enable Filters by Hardware Specs (Switches, Refresh Rate, Connectivity)',
        default: true
      },
      {
        type: 'header',
        content: 'Secure Checkout & Payment Gateways'
      },
      {
        type: 'checkbox',
        id: 'enable_crypto_discount',
        label: 'Enable Instant Crypto / Direct Checkout Discount (e.g. 5% OFF)',
        default: true
      },
      {
        type: 'text',
        id: 'currency_code',
        label: 'Primary Store Currency',
        default: 'USD'
      },
      {
        type: 'select',
        id: 'klarna_installments',
        label: 'Klarna / Afterpay Installments',
        options: [
          { value: '4', label: '4 Interest-Free Payments' },
          { value: '6', label: 'Up to 6 Months' },
          { value: '12', label: 'Up to 12 Months Financing' }
        ],
        default: '4'
      },
      {
        type: 'checkbox',
        id: 'show_security_badges',
        label: 'Display Trust Badges (256-Bit SSL, PCI-DSS Level 1, McAfee Secure)',
        default: true
      }
    ]
  }
];

export const LIQUID_TEMPLATES = {
  'sections/collection-filters.liquid': `{% comment %}
  AVEART Tech & Gaming Theme - Advanced Shopify OS 2.0 Faceted Filters
{% endcomment %}
<div class="collection-filters-wrapper">
  <form id="CollectionFiltersForm" class="filter-form">
    {%- for filter in collection.filters -%}
      <details class="filter-group border-b border-slate-200 py-3" open>
        <summary class="filter-group-summary font-semibold text-xs uppercase tracking-wider text-slate-900 cursor-pointer flex justify-between items-center">
          <span>{{ filter.label | escape }}</span>
          <span class="count-bubble text-slate-500 font-mono text-[11px]">({{ filter.active_values.size }})</span>
        </summary>
        
        <div class="filter-group-display mt-3">
          {%- case filter.type -%}
            {%- when 'list' -%}
              <ul class="filter-list space-y-2">
                {%- for value in filter.values -%}
                  <li class="filter-item flex items-center justify-between">
                    <label class="cursor-pointer text-xs text-slate-700 hover:text-cyan-600 flex items-center gap-2">
                      <input type="checkbox"
                        name="{{ value.param_name }}"
                        value="{{ value.value }}"
                        {% if value.active %}checked{% endif %}
                        class="accent-cyan-600 rounded"
                      >
                      {{ value.label }}
                    </label>
                    <span class="text-[11px] font-mono text-slate-400">({{ value.count }})</span>
                  </li>
                {%- endfor -%}
              </ul>

            {%- when 'price_range' -%}
              <div class="filter-price-range grid grid-cols-2 gap-2 mt-2">
                <input name="{{ filter.min_value.param_name }}"
                  id="Filter-{{ filter.label | escape }}-GTE"
                  {%- if filter.min_value.value -%}
                    value="{{ filter.min_value.value | money_without_currency | replace: ',', '' }}"
                  {%- endif -%}
                  type="number"
                  placeholder="Min ($)"
                  class="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 shadow-xs"
                >
                <input name="{{ filter.max_value.param_name }}"
                  id="Filter-{{ filter.label | escape }}-LTE"
                  {%- if filter.max_value.value -%}
                    value="{{ filter.max_value.value | money_without_currency | replace: ',', '' }}"
                  {%- endif -%}
                  type="number"
                  placeholder="Max ($)"
                  class="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 shadow-xs"
                >
              </div>
          {%- endcase -%}
        </div>
      </details>
    {%- endfor -%}
  </form>
</div>`,

  'sections/secure-checkout.liquid': `{% comment %}
  AVEART Theme - Bank-Grade Encrypted Checkout & Payment Gateway Module
{% endcomment %}
<div class="secure-checkout-container bg-white border border-slate-200 rounded-2xl p-6 shadow-sm" data-section-id="{{ section.id }}">
  <div class="checkout-header flex items-center justify-between pb-4 border-b border-slate-200">
    <div class="security-seal flex items-center gap-2 text-emerald-700 text-xs font-bold">
      <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
      <span>256-BIT BANK-GRADE ENCRYPTED CHECKOUT</span>
    </div>
    <div class="pci-badge text-xs text-slate-500 font-medium">PCI-DSS Level 1 Certified</div>
  </div>

  <div class="payment-methods-grid pt-4">
    <!-- Active Payment Methods: Apple Pay, Google Pay, Credit/Debit Cards, PayPal, Klarna (4x) & Crypto -->
    <div class="payment-tabs flex flex-wrap gap-2 mb-4">
      <button class="payment-tab px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold" data-method="express">Express One-Click</button>
      <button class="payment-tab px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold" data-method="credit_card">Card (Visa/MC/Amex)</button>
      <button class="payment-tab px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold" data-method="paypal">PayPal</button>
      <button class="payment-tab px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold" data-method="klarna">Klarna (4x 0% APR)</button>
    </div>
  </div>
</div>`
};

export const SHOPIFY_INSTALL_STEPS = [
  {
    step: 1,
    title: 'Download or Export AVEART Theme Package',
    desc: 'Export the complete AVEART theme .zip containing layout/, sections/, snippets/, assets/, config/settings_schema.json, and templates/.'
  },
  {
    step: 2,
    title: 'Upload to Shopify Admin',
    desc: 'In your Shopify Admin dashboard, navigate to Online Store > Themes > Add Theme > Upload zip file.'
  },
  {
    step: 3,
    title: 'Configure Hardware Search Filters',
    desc: 'In the official Shopify "Search & Discovery" app, enable metafield filters: Switches, Connectivity, Refresh Rate, and RGB Chroma Lighting.'
  },
  {
    step: 4,
    title: 'Connect High-Conversion Payment Gateways',
    desc: 'Go to Settings > Payments in Shopify and enable Shopify Payments, Stripe, PayPal, and Klarna with native one-click accelerated checkout.'
  }
];

export interface ProductVariantOption {
  name: string;
  options: string[];
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  handle: string; // Shopify URL handle
  brand: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  badge?: string;
  inStock: boolean;
  stockQuantity: number;
  description: string;
  shortDescription: string;
  specs: ProductSpec[];
  variants: ProductVariantOption[];
  tags: string[];
  refreshRate?: string;
  connectivity?: string;
  switches?: string;
  rgb?: boolean;
  warrantyYears: number;
  sku: string;
  barcode: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedVariants: Record<string, string>;
  extendedWarranty: boolean;
}

export interface FilterState {
  search: string;
  category: string;
  brands: string[];
  minPrice: number;
  maxPrice: number;
  refreshRates: string[];
  connectivities: string[];
  switches: string[];
  rgbOnly: boolean;
  inStockOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export interface ShippingMethod {
  id: string;
  name: string;
  carrier: string;
  deliveryDays: string;
  price: number;
  description: string;
}

export type PaymentMethodId = 'pix' | 'credit_card' | 'boleto' | 'paypal';

export interface CustomerData {
  email: string;
  fullName: string;
  cpf: string;
  phone: string;
  cep: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface CreditCardData {
  cardNumber: string;
  holderName: string;
  expiry: string;
  cvv: string;
  installments: number;
}

export interface OrderResult {
  orderNumber: string;
  customer: CustomerData;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  warrantyTotal: number;
  total: number;
  paymentMethod: PaymentMethodId;
  paymentDetails: {
    pixCode?: string;
    pixQrUrl?: string;
    cardLast4?: string;
    cardBrand?: string;
    installmentsText?: string;
    boletoBarcode?: string;
  };
  createdAt: string;
  status: 'paid' | 'awaiting_payment';
}

export interface ThemeSettings {
  primaryAccent: 'cyan' | 'red' | 'emerald' | 'purple';
  currency: 'BRL' | 'USD' | 'EUR';
  showFpsBenchmarks: boolean;
  enableRgbGlow: boolean;
  freeShippingThreshold: number;
}

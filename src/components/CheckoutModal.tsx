import { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  QrCode, 
  CreditCard as CardIcon, 
  FileText, 
  Copy, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Truck, 
  AlertCircle, 
  Sparkles, 
  Clock, 
  Printer, 
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Wallet,
  Zap
} from 'lucide-react';
import { 
  CartItem, 
  CustomerData, 
  CreditCardData, 
  PaymentMethodId, 
  OrderResult, 
  ShippingMethod, 
  ThemeSettings 
} from '../types';
import { 
  formatCurrency, 
  maskCpf, 
  maskCep, 
  maskCardNumber, 
  maskCardExpiry, 
  maskPhone,
  calculateInstallments 
} from '../utils/formatters';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedCoupon: string | null;
  onClearCart: () => void;
  themeSettings: ThemeSettings;
}

const SHIPPING_OPTIONS: ShippingMethod[] = [
  {
    id: 'express',
    name: 'FedEx Priority Express',
    carrier: 'FedEx Air Express',
    deliveryDays: '1 to 2 business days',
    price: 14.99,
    description: 'Priority tracked delivery with full coverage insurance'
  },
  {
    id: 'standard',
    name: 'USPS / DHL Standard Shipping',
    carrier: 'Standard Ground & Air',
    deliveryDays: '3 to 5 business days',
    price: 6.99,
    description: 'End-to-end tracked parcel delivery'
  },
  {
    id: 'pickup',
    name: 'AVEART Flagship Hub Pickup',
    carrier: 'AVEART Tech Lounge',
    deliveryDays: 'Ready in 2 hours',
    price: 0,
    description: 'Direct collection at partner hub'
  }
];

export function CheckoutModal({
  isOpen,
  onClose,
  items,
  appliedCoupon,
  onClearCart,
  themeSettings
}: CheckoutModalProps) {
  if (!isOpen) return null;

  // Step control: 1 = Shipping & Info, 2 = Payment Selection, 3 = Confirmation
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null);

  // Form State
  const [customer, setCustomer] = useState<CustomerData>({
    email: 'alex.gamer@aveart.tech',
    fullName: 'Alex Vance',
    cpf: '984-21-0492',
    phone: '+1 (555) 349-8201',
    cep: '94105',
    address: '500 Howard Street',
    number: 'Suite 400',
    complement: 'Apt 4B',
    neighborhood: 'SoMa District',
    city: 'San Francisco',
    state: 'CA'
  });

  const [selectedShippingId, setSelectedShippingId] = useState<string>('express');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>('credit_card');
  const [creditCard, setCreditCard] = useState<CreditCardData>({
    cardNumber: '4532 8920 1823 9042',
    holderName: 'ALEX VANCE',
    expiry: '11/29',
    cvv: '829',
    installments: 1
  });

  const [copiedPix, setCopiedPix] = useState(false);
  const [pixTimeRemaining, setPixTimeRemaining] = useState(900); // 15 min

  // Math Calculations
  const subtotal = items.reduce((acc, item) => {
    const itemPrice = item.product.price * item.quantity;
    const warranty = item.extendedWarranty ? 25 * item.quantity : 0;
    return acc + itemPrice + warranty;
  }, 0);

  const couponDiscount = (appliedCoupon === 'AVEART10' || appliedCoupon === 'GAMER10') ? subtotal * 0.10 : appliedCoupon === 'WELCOME5' ? subtotal * 0.05 : 0;
  
  const selectedShipping = SHIPPING_OPTIONS.find(s => s.id === selectedShippingId) || SHIPPING_OPTIONS[0];
  const isFreeShipping = subtotal >= (themeSettings.freeShippingThreshold || 150);
  const finalShippingPrice = isFreeShipping ? 0 : selectedShipping.price;

  // 5% instant discount on digital transfer / crypto / pix
  const isPix = paymentMethod === 'pix';
  const pixDiscount = isPix ? (subtotal - couponDiscount) * 0.05 : 0;
  const total = (subtotal - couponDiscount) - pixDiscount + finalShippingPrice;

  // Pix timer
  useEffect(() => {
    if (step === 2 && paymentMethod === 'pix') {
      const timer = setInterval(() => {
        setPixTimeRemaining(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, paymentMethod]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCepChange = (value: string) => {
    setCustomer(prev => ({ ...prev, cep: value }));
  };

  const handleCopyPix = () => {
    const pixCode = `00020126580014us.aveart.pay0136aveart-checkout-${Date.now()}520400005303840540${total.toFixed(2)}5802US5912AVEART STORE6013SAN FRANCISCO62070503***6304`;
    navigator.clipboard?.writeText(pixCode);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handleCompleteOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const randomOrderNum = `#AV-${Math.floor(10000 + Math.random() * 90000)}`;
      const result: OrderResult = {
        orderNumber: randomOrderNum,
        customer,
        items,
        subtotal,
        discount: couponDiscount + pixDiscount,
        shipping: finalShippingPrice,
        warrantyTotal: items.reduce((acc, i) => acc + (i.extendedWarranty ? 25 * i.quantity : 0), 0),
        total,
        paymentMethod,
        paymentDetails: {
          pixCode: isPix ? `00020126580014us.aveart.pay0136aveart-checkout...` : undefined,
          pixQrUrl: isPix ? `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=AVEART-PAY-${total.toFixed(2)}` : undefined,
          cardLast4: paymentMethod === 'credit_card' ? creditCard.cardNumber.slice(-4) : undefined,
          cardBrand: 'Visa Signature',
          installmentsText: paymentMethod === 'credit_card' ? `${creditCard.installments}x ${formatCurrency(total / creditCard.installments, themeSettings.currency)}` : undefined,
          boletoBarcode: paymentMethod === 'boleto' ? '34191.79001 01043.510047 91020.150008 7 942100260000' : undefined
        },
        createdAt: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        status: 'paid'
      };

      setOrderResult(result);
      setStep(3);
      onClearCart();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="secure-checkout-modal"
        className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Security Banner */}
        <div className="bg-slate-50 px-6 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-cyan-700 text-xs font-bold font-mono">
            <Lock className="w-4 h-4 text-cyan-700" />
            <span>256-BIT ENCRYPTED CHECKOUT • SHOPIFY SECURE PROTOCOL</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              PCI-DSS Level 1
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Verified Merchant
            </span>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-200/60 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Checkout Step Progress */}
        <div className="bg-white px-6 py-3 border-b border-slate-100 flex items-center justify-center gap-2 sm:gap-6 text-xs font-mono">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-cyan-700 font-bold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 1 ? 'bg-cyan-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
              1
            </span>
            <span>Customer & Shipping</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-cyan-700 font-bold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 2 ? 'bg-cyan-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
              2
            </span>
            <span>Payment Method</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <div className={`flex items-center gap-1.5 ${step === 3 ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
              3
            </span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[80vh] overflow-y-auto">
          
          {/* Main Form Left Column (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 border-r border-slate-100">
            
            {/* STEP 1: Shipping & Customer Info */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                    <Truck className="w-5 h-5 text-cyan-600" />
                    <span>Shipping Address & Contact</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Order confirmation and delivery updates will be sent to your email.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-mono uppercase text-slate-600 font-semibold">Email Address</label>
                    <input
                      type="email"
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      placeholder="alex.gamer@aveart.tech"
                      className="mt-1 w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-600 font-semibold">Full Name</label>
                    <input
                      type="text"
                      value={customer.fullName}
                      onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                      placeholder="Full Name"
                      className="mt-1 w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-600 font-semibold">Tax ID / SSN</label>
                    <input
                      type="text"
                      value={customer.cpf}
                      onChange={(e) => setCustomer({ ...customer, cpf: e.target.value })}
                      placeholder="000-00-0000"
                      className="mt-1 w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500 shadow-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-600 font-semibold">Phone Number</label>
                    <input
                      type="text"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="mt-1 w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-600 font-semibold">Postal / ZIP Code</label>
                    <input
                      type="text"
                      value={customer.cep}
                      onChange={(e) => handleCepChange(e.target.value)}
                      placeholder="94105"
                      className="mt-1 w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500 shadow-xs font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2 grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="text-xs font-mono uppercase text-slate-600 font-semibold">Street Address</label>
                      <input
                        type="text"
                        value={customer.address}
                        onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                        placeholder="Street Address"
                        className="mt-1 w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500 shadow-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-600 font-semibold">Suite / No.</label>
                      <input
                        type="text"
                        value={customer.number}
                        onChange={(e) => setCustomer({ ...customer, number: e.target.value })}
                        placeholder="Apt / Suite"
                        className="mt-1 w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500 shadow-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-600 font-semibold">Neighborhood / District</label>
                    <input
                      type="text"
                      value={customer.neighborhood}
                      onChange={(e) => setCustomer({ ...customer, neighborhood: e.target.value })}
                      placeholder="District"
                      className="mt-1 w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500 shadow-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-600 font-semibold">City</label>
                      <input
                        type="text"
                        value={customer.city}
                        onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                        placeholder="City"
                        className="mt-1 w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500 shadow-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-600 font-semibold">State / Region</label>
                      <input
                        type="text"
                        value={customer.state}
                        onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                        placeholder="CA"
                        className="mt-1 w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500 shadow-xs uppercase"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Method Selector */}
                <div className="pt-2">
                  <label className="text-xs font-mono uppercase text-slate-700 font-bold block mb-2">
                    Select Shipping Carrier
                  </label>
                  <div className="space-y-2">
                    {SHIPPING_OPTIONS.map((opt) => {
                      const selected = selectedShippingId === opt.id;
                      const priceText = isFreeShipping ? 'FREE' : opt.price === 0 ? 'FREE' : formatCurrency(opt.price, themeSettings.currency);
                      return (
                        <div
                          key={opt.id}
                          onClick={() => setSelectedShippingId(opt.id)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                            selected
                              ? 'bg-cyan-50/70 border-cyan-500 shadow-xs'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shippingMethod"
                              checked={selected}
                              onChange={() => setSelectedShippingId(opt.id)}
                              className="accent-cyan-600 w-4 h-4"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-900">{opt.name}</span>
                                <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-medium">
                                  {opt.deliveryDays}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500">{opt.description}</p>
                            </div>
                          </div>
                          <span className="font-mono font-bold text-xs text-slate-900">
                            {priceText}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Next Step Button */}
                <button
                  id="btn-goto-payment"
                  onClick={() => setStep(2)}
                  className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all hover:scale-[1.005]"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: Payment Gateways Integration */}
            {step === 2 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                      <Lock className="w-5 h-5 text-cyan-600" />
                      <span>Integrated Payment Gateways</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      100% encrypted transaction with Shopify Payments & fraud shield.
                    </p>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs text-cyan-700 hover:text-cyan-800 font-semibold flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                </div>

                {/* Payment Gateway Tabs */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'credit_card'
                        ? 'bg-cyan-50 border-cyan-500 text-cyan-900 font-bold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <CardIcon className="w-5 h-5 text-cyan-600" />
                    <span className="text-xs">Credit Card</span>
                    <span className="text-[10px] bg-cyan-100 text-cyan-800 px-1.5 py-0.5 rounded font-mono font-semibold">
                      Instant Approval
                    </span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'pix'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs">Digital Pay (-5%)</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono font-semibold">
                      5% Instant OFF
                    </span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('boleto')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'boleto'
                        ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <FileText className="w-5 h-5 text-amber-600" />
                    <span className="text-xs">Invoice / Bank Slip</span>
                    <span className="text-[10px] text-slate-500 font-mono">1 business day</span>
                  </button>
                </div>

                {/* PIX GATEWAY VIEW */}
                {paymentMethod === 'pix' && (
                  <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-emerald-800 font-bold">
                        <Zap className="w-4 h-4 text-emerald-600" />
                        <span>Extra 5% discount applied automatically!</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                        <Clock className="w-3.5 h-3.5 text-cyan-600" />
                        <span>Expires in: <strong>{formatTimer(pixTimeRemaining)}</strong></span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 p-3 bg-white rounded-xl border border-emerald-200/80 shadow-xs">
                      {/* Dynamic QR Code */}
                      <div className="w-32 h-32 bg-white p-2 rounded-xl flex items-center justify-center shrink-0 border border-slate-200 shadow-xs">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=AVEART-PAY-${total.toFixed(2)}`}
                          alt="QR Code Payment"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="space-y-2 text-xs text-slate-700">
                        <p className="font-semibold text-slate-900">How to pay instantly:</p>
                        <ol className="list-decimal list-inside space-y-1 text-slate-600 text-[11px]">
                          <li>Open your banking or digital wallet app.</li>
                          <li>Select <strong>Scan QR Code / Digital Pay</strong>.</li>
                          <li>Scan the code or copy the string key below.</li>
                        </ol>
                        <p className="text-emerald-700 font-bold text-[11px]">
                          Payment is reconciled and approved in real time.
                        </p>
                      </div>
                    </div>

                    {/* Copia e Cola Code */}
                    <div className="space-y-1">
                      <label className="text-xs font-mono uppercase text-slate-600 font-semibold">Payment Payload Code</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          readOnly
                          value={`00020126580014us.aveart.pay0136aveart-checkout-${Date.now()}520400005303840540${total.toFixed(2)}`}
                          className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-700 focus:outline-none"
                        />
                        <button
                          onClick={handleCopyPix}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                        >
                          {copiedPix ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          <span>{copiedPix ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* CREDIT CARD GATEWAY VIEW */}
                {paymentMethod === 'credit_card' && (
                  <div className="space-y-4">
                    {/* Visual Card Mockup */}
                    <div className="relative w-full aspect-[1.8/1] max-w-sm mx-auto rounded-2xl bg-gradient-to-tr from-slate-950 via-slate-900 to-cyan-950 p-5 border border-slate-800 shadow-xl flex flex-col justify-between overflow-hidden">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-7 rounded bg-amber-400/80 border border-amber-300/40 flex items-center justify-center">
                          <div className="w-6 h-4 border border-amber-600/60 rounded-sm" />
                        </div>
                        <span className="font-mono text-cyan-400 text-xs tracking-widest font-extrabold">
                          AVEART SECURE
                        </span>
                      </div>

                      <div className="font-mono text-base sm:text-lg tracking-widest text-white font-bold">
                        {creditCard.cardNumber || '•••• •••• •••• ••••'}
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono text-slate-300 uppercase">
                        <div>
                          <p className="text-[9px] text-slate-500">CARDHOLDER</p>
                          <p className="font-bold truncate max-w-[140px]">{creditCard.holderName || 'CARDHOLDER NAME'}</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-slate-500">EXPIRES</p>
                          <p className="font-bold">{creditCard.expiry || 'MM/YY'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Card Form Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-mono uppercase text-slate-600 font-semibold">Card Number</label>
                        <div className="relative mt-1">
                          <input
                            type="text"
                            value={creditCard.cardNumber}
                            onChange={(e) => setCreditCard({ ...creditCard, cardNumber: maskCardNumber(e.target.value) })}
                            placeholder="0000 0000 0000 0000"
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500 font-mono shadow-xs"
                          />
                          <CardIcon className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-mono uppercase text-slate-600 font-semibold">Cardholder Name</label>
                        <input
                          type="text"
                          value={creditCard.holderName}
                          onChange={(e) => setCreditCard({ ...creditCard, holderName: e.target.value.toUpperCase() })}
                          placeholder="AS APPEARS ON CARD"
                          className="mt-1 w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500 uppercase shadow-xs"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs font-mono uppercase text-slate-600 font-semibold">Expiration</label>
                          <input
                            type="text"
                            value={creditCard.expiry}
                            onChange={(e) => setCreditCard({ ...creditCard, expiry: maskCardExpiry(e.target.value) })}
                            placeholder="MM/YY"
                            className="mt-1 w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500 font-mono shadow-xs"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-mono uppercase text-slate-600 font-semibold">CVV</label>
                          <input
                            type="password"
                            maxLength={4}
                            value={creditCard.cvv}
                            onChange={(e) => setCreditCard({ ...creditCard, cvv: e.target.value.replace(/\D/g, '') })}
                            placeholder="123"
                            className="mt-1 w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500 font-mono shadow-xs"
                          />
                        </div>
                      </div>

                      {/* Installments selector */}
                      <div className="sm:col-span-2">
                        <label className="text-xs font-mono uppercase text-slate-600 font-semibold">Installment Plan / Split Pay</label>
                        <select
                          value={creditCard.installments}
                          onChange={(e) => setCreditCard({ ...creditCard, installments: Number(e.target.value) })}
                          className="mt-1 w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500 shadow-xs"
                        >
                          {[1, 2, 3, 4].map(n => (
                            <option key={n} value={n}>
                              {n === 1 ? `Pay in full (${formatCurrency(total, themeSettings.currency)})` : `${n} interest-free payments of ${formatCurrency(total / n, themeSettings.currency)}`}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* BOLETO GATEWAY VIEW */}
                {paymentMethod === 'boleto' && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs text-slate-700">
                    <div className="flex items-center gap-2 text-amber-700 font-bold">
                      <FileText className="w-4 h-4 text-amber-600" />
                      <span>Standard Bank Wire / Commercial Invoice</span>
                    </div>
                    <p className="text-slate-600">
                      An official commercial invoice with routing numbers will be generated upon checkout. Reconciled within 1 business day.
                    </p>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-center text-slate-500 text-xs">
                      ||| | || |||| | | |||||| | ||| | ||| || |||
                    </div>
                  </div>
                )}

                {/* Final Submit Payment Button */}
                <button
                  id="btn-confirm-payment"
                  disabled={isProcessing}
                  onClick={handleCompleteOrder}
                  className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.005] active:scale-[0.99] disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Authenticating with Payment Gateway...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-cyan-400" />
                      <span>
                        Authorize & Pay {formatCurrency(total, themeSettings.currency)}
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* STEP 3: Order Confirmation & Receipt */}
            {step === 3 && orderResult && (
              <div className="space-y-6 animate-in zoom-in-95 duration-300">
                <div className="text-center space-y-2 py-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 font-display">
                    Order Confirmed Successfully!
                  </h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    We sent your purchase receipt and tracking details to <strong>{customer.email}</strong>.
                  </p>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-900 font-mono text-sm font-bold mt-2 shadow-xs">
                    Order Number: {orderResult.orderNumber}
                  </div>
                </div>

                {/* Timeline Tracking */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-600 uppercase font-semibold">Estimated Delivery</span>
                    <span className="font-bold text-slate-900">{selectedShipping.deliveryDays}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-center text-[10px] font-mono">
                    <div className="text-emerald-700 font-bold">
                      <div className="h-1.5 rounded-full bg-emerald-600 mb-1" />
                      Paid
                    </div>
                    <div className="text-cyan-700 font-bold">
                      <div className="h-1.5 rounded-full bg-cyan-600 mb-1" />
                      Processing
                    </div>
                    <div className="text-slate-400">
                      <div className="h-1.5 rounded-full bg-slate-200 mb-1" />
                      In Transit
                    </div>
                    <div className="text-slate-400">
                      <div className="h-1.5 rounded-full bg-slate-200 mb-1" />
                      Delivered
                    </div>
                  </div>
                </div>

                {/* Tracking Link Simulator */}
                <div className="p-3 bg-cyan-50/50 rounded-xl border border-cyan-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-cyan-950">
                    <Truck className="w-4 h-4 text-cyan-700" />
                    <span>Tracking Number: <strong>AV{Date.now().toString().slice(-8)}US</strong></span>
                  </div>
                  <span className="text-[10px] bg-cyan-100 px-2 py-0.5 rounded text-cyan-800 font-bold">
                    Active Express
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 border border-slate-200 transition-colors shadow-xs"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Receipt</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                  >
                    Return to Store
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Order Summary Right Column (5 cols) */}
          <div className="lg:col-span-5 p-6 bg-slate-50 flex flex-col justify-between space-y-5">
            <div>
              <h4 className="text-xs font-mono uppercase font-bold text-slate-700 tracking-wider mb-3">
                Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} items)
              </h4>

              {/* Items List */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1 divide-y divide-slate-200">
                {items.map(item => (
                  <div key={item.id} className="pt-3 first:pt-0 flex gap-2.5">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-12 h-12 object-cover rounded-lg bg-white border border-slate-200 shrink-0 shadow-xs"
                    />
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="font-bold text-slate-900 truncate">{item.product.title}</p>
                      <p className="text-[11px] text-slate-500">Qty: {item.quantity}x</p>
                      {item.extendedWarranty && (
                        <p className="text-[10px] text-cyan-700 font-semibold">+ Pro Warranty ({formatCurrency(25, themeSettings.currency)})</p>
                      )}
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-900">
                      {formatCurrency(
                        (item.product.price + (item.extendedWarranty ? 25 : 0)) * item.quantity,
                        themeSettings.currency
                      )}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="mt-5 pt-4 border-t border-slate-200 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Product Subtotal</span>
                  <span className="font-mono text-slate-800 font-semibold">{formatCurrency(subtotal, themeSettings.currency)}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon Discount ({appliedCoupon})</span>
                    <span className="font-mono">-{formatCurrency(couponDiscount, themeSettings.currency)}</span>
                  </div>
                )}

                {isPix && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Digital Transfer Discount (5% OFF)</span>
                    <span className="font-mono">-{formatCurrency(pixDiscount, themeSettings.currency)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping ({selectedShipping.name})</span>
                  <span className="font-mono text-slate-800 font-semibold">
                    {finalShippingPrice === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      formatCurrency(finalShippingPrice, themeSettings.currency)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-slate-900 pt-3 border-t border-slate-200">
                  <span>Total Due</span>
                  <span className="font-mono text-xl text-slate-900">
                    {formatCurrency(total, themeSettings.currency)}
                  </span>
                </div>
              </div>
            </div>

            {/* Shopify Ready Security Seals */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Protected Transaction</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Bank-level SSL encryption and automated fraud detection guarantee safe purchasing. Credit card details are never stored on our servers.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

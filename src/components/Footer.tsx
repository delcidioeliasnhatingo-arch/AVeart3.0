import { 
  Gamepad2, 
  ShieldCheck, 
  Truck, 
  Zap, 
  CreditCard, 
  Lock, 
  Heart, 
  Layers, 
  Mail, 
  Check 
} from 'lucide-react';
import { useState } from 'react';

interface FooterProps {
  onOpenShopifyModal: () => void;
}

export function Footer({ onOpenShopifyModal }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <footer id="main-footer" className="bg-slate-50 border-t border-slate-200 pt-12 pb-8 text-xs text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Value Proposition Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-200 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Express 24h Shipping</h4>
              <p className="text-slate-500 text-xs mt-0.5">Fast dispatch with real-time tracking and full transit insurance.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Instant 10% Discount</h4>
              <p className="text-slate-500 text-xs mt-0.5">Use code AVEART10 at checkout for immediate 10% savings.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Official Warranty</h4>
              <p className="text-slate-500 text-xs mt-0.5">100% authentic hardware with manufacturer warranty & direct tech support.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Secured Checkout</h4>
              <p className="text-slate-500 text-xs mt-0.5">256-bit SSL encryption, Stripe/Shopify Pay and PCI-DSS Level 1 certification.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Info (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white p-2 flex items-center justify-center shadow-xs">
                <Gamepad2 className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="font-display font-black text-xl tracking-tight text-slate-900">
                AVE<span className="text-cyan-600">ART</span>
              </span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
              The premier destination for high-end electronics, mechanical keyboards, flagship monitors, and pro gaming gear.
              Fully integrated Shopify Liquid Online Store 2.0 theme.
            </p>
            <div>
              <button
                onClick={onOpenShopifyModal}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors shadow-xs"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Export Theme to Shopify</span>
              </button>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="font-mono uppercase font-bold text-slate-900 text-xs">Categories</h5>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-cyan-600 cursor-pointer transition-colors">240Hz+ Monitors</span></li>
              <li><span className="hover:text-cyan-600 cursor-pointer transition-colors">Hall-Effect Keyboards</span></li>
              <li><span className="hover:text-cyan-600 cursor-pointer transition-colors">8K Ultra-light Mice</span></li>
              <li><span className="hover:text-cyan-600 cursor-pointer transition-colors">GeForce RTX 4090 GPUs</span></li>
              <li><span className="hover:text-cyan-600 cursor-pointer transition-colors">Studio & Audio Gear</span></li>
            </ul>
          </div>

          {/* Customer Service (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-mono uppercase font-bold text-slate-900 text-xs">Support & Safety</h5>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>24/7 Priority Tech Support</li>
              <li>Hassle-free 30-day Return Policy</li>
              <li>Terms of Service & Privacy Policy</li>
              <li>Track Your Package Order</li>
              <li className="text-cyan-700 font-mono font-medium">support@aveart.store</li>
            </ul>
          </div>

          {/* Newsletter (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-mono uppercase font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-600" />
              <span>Get Drops & VIP Deals</span>
            </h5>
            <p className="text-xs text-slate-500">
              Subscribe to get alerts on GPU restocks and a $15 discount on your first order.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 shadow-xs"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-xs"
                >
                  {subscribed ? <Check className="w-4 h-4 text-emerald-400" /> : 'Join'}
                </button>
              </div>
              {subscribed && <p className="text-[11px] text-emerald-600 font-medium">Coupon AVEART10 sent to your email!</p>}
            </form>
          </div>
        </div>

        {/* Payment Methods & Security Seals Strip */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Payment Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] text-slate-500 font-mono mr-2 font-medium">Secure Payments:</span>
            {['Shop Pay', 'Visa', 'Mastercard', 'American Express', 'PayPal', 'Apple Pay', 'Google Pay', 'Klarna'].map((pay) => (
              <span
                key={pay}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-mono text-slate-700 shadow-xs font-medium"
              >
                {pay}
              </span>
            ))}
          </div>

          {/* Security Badges */}
          <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <Lock className="w-3.5 h-3.5" /> SSL 256-BIT
            </span>
            <span>•</span>
            <span>PCI-DSS CERTIFIED</span>
            <span>•</span>
            <span>SHOPIFY PAY CHECKOUT</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-4 text-[11px] text-slate-400 border-t border-slate-200">
          © 2026 AVEART Electronics & Gaming Gear. Shopify Online Store 2.0 Theme. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

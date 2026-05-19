'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { ShoppingCart, Heart, Star, Search, Filter, X, Plus, Minus, CreditCard, QrCode } from 'lucide-react';
import { loadSharedCart, saveSharedCart } from '@/lib/shop-cart';

const categories = ['All', 'Supplements', 'Apparel', 'Equipment', 'Accessories'];

const brands = ['HI-TEC Nutrition'];

const products = [
  {
    id: 1, name: 'NANZAD Whey Protein', category: 'Supplements', brand: 'NANZAD',
    price: 220000, originalPrice: 280000,
    rating: 4.8, reviews: 342,
    image: 'https://images.pexels.com/photos/4162585/pexels-photo-4162585.jpeg?auto=compress&cs=tinysrgb&w=600',
    tag: 'Best Seller', badge: 'badge-intermediate',
    description: 'Ultra-pure whey isolate with 27g protein per serving. Zero fillers, maximum gains.',
    flavors: ['Chocolate', 'Vanilla', 'Strawberry'],
  },
  {
    id: 2, name: 'Performance Compression Tee', category: 'Apparel',
    price: 135000, originalPrice: null,
    rating: 4.7, reviews: 189,
    image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600',
    tag: 'New', badge: 'badge-beginner',
    description: 'Moisture-wicking, 4-way stretch compression technology for peak performance.',
    flavors: ['Black', 'White', 'Olive'],
  },
  {
    id: 3, name: 'NANZAD Pre-Workout X', category: 'Supplements', brand: 'NANZAD',
    price: 180000, originalPrice: 240000,
    rating: 4.9, reviews: 521,
    image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=600',
    tag: 'Top Rated', badge: 'badge-advanced',
    description: 'Clinical-dose pre-workout with 350mg caffeine, citrulline, and beta-alanine.',
    flavors: ['Watermelon', 'Blue Raspberry', 'Mango'],
  },
  {
    id: 4, name: 'Olympic Lifting Belt', category: 'Equipment',
    price: 35000, originalPrice: 45000,
    rating: 4.9, reviews: 267,
    image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&w=600',
    tag: 'Sale', badge: 'badge-advanced',
    description: 'Premium 10mm leather belt for squats and deadlifts. IPF approved.',
    flavors: ['Black', 'Brown'],
  },
  {
    id: 5, name: 'Creatine Monohydrate', category: 'Supplements', brand: 'NANZAD',
    price: 100000, originalPrice: null,
    rating: 5.0, reviews: 892,
    image: 'https://images.pexels.com/photos/3289711/pexels-photo-3289711.jpeg?auto=compress&cs=tinysrgb&w=600',
    tag: 'Essential', badge: 'badge-beginner',
  },
  {
    id: 6, name: 'HI-TEC Whey Protein', category: 'Supplements', brand: 'HI-TEC Nutrition',
    price: 300000, originalPrice: 380000,
    rating: 4.7, reviews: 456,
    image: '/api/trainer-images/hitec-whey-c6',
    tag: 'Popular', badge: 'badge-intermediate',
    description: 'Premium whey protein concentrate with 25g protein per serving. Fast-absorbing formula.',
  },
  {
    id: 7, name: 'HI-TEC Mass Gainer', category: 'Supplements', brand: 'HI-TEC Nutrition',
    price: 390000, originalPrice: 480000,
    rating: 4.6, reviews: 312,
    image: '/api/trainer-images/hitec-real-mass',
    tag: 'Mass Builder', badge: 'badge-advanced',
    description: 'High-calorie mass gainer with 50g protein and complex carbs for serious gains.',
  },
  {
    id: 8, name: 'Scitec 100% Whey Protein', category: 'Supplements', brand: 'Scitec Nutrition',
    price: 220000, originalPrice: 280000,
    rating: 4.9, reviews: 678,
    image: 'https://images.pexels.com/photos/4162585/pexels-photo-4162585.jpeg?auto=compress&cs=tinysrgb&w=600',
    tag: 'Top Rated', badge: 'badge-advanced',
    description: 'Premium whey protein blend with 27g protein. Enhanced with digestive enzymes.',
  },
  {
    id: 9, name: 'Scitec Jumbo Professional', category: 'Supplements', brand: 'Scitec Nutrition',
    price: 280000, originalPrice: 360000,
    rating: 4.8, reviews: 423,
    image: 'https://images.pexels.com/photos/3289711/pexels-photo-3289711.jpeg?auto=compress&cs=tinysrgb&w=600',
    tag: 'Best Seller', badge: 'badge-advanced',
    description: 'All-in-one mass gainer with 50g protein, creatine, amino acids, and vitamins.',
  },
  {
    id: 10, name: 'Scitec BCAA XPress', category: 'Supplements', brand: 'Scitec Nutrition',
    price: 140000, originalPrice: null,
    rating: 4.7, reviews: 298,
    image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=600',
    tag: 'Recovery', badge: 'badge-intermediate',
    description: 'BCAA 2:1:1 ratio with glutamine for optimal muscle recovery.',
  },
  {
    id: 11, name: 'HI-TEC BCAA + Glutamine', category: 'Supplements', brand: 'HI-TEC Nutrition',
    price: 135000, originalPrice: 175000,
    rating: 4.5, reviews: 187,
    image: '/api/trainer-images/hitec-bcaa-811',
    tag: 'Essential', badge: 'badge-beginner',
    description: 'BCAA blend with added glutamine for enhanced recovery and immune support.',
  },
  {
    id: 12, name: 'Scitec Mega Creatine', category: 'Supplements', brand: 'Scitec Nutrition',
    price: 160000, originalPrice: 200000,
    rating: 4.9, reviews: 534,
    image: 'https://images.pexels.com/photos/3289711/pexels-photo-3289711.jpeg?auto=compress&cs=tinysrgb&w=600',
    tag: 'Strength', badge: 'badge-advanced',
    description: 'Pure creatine monohydrate for maximum strength and power gains.',
  },
  {
    id: 13, name: 'HI-TEC Whey Mass', category: 'Supplements', brand: 'HI-TEC Nutrition',
    price: 360000, originalPrice: 450000,
    rating: 4.8, reviews: 156,
    image: '/api/trainer-images/hitec-whey-mass',
    tag: 'Mass Builder', badge: 'badge-advanced',
    description: 'High-calorie whey mass formula for muscle and weight gain support.',
  },
  {
    id: 14, name: 'HI-TEC Real Isolate 100', category: 'Supplements', brand: 'HI-TEC Nutrition',
    price: 255000, originalPrice: null,
    rating: 4.9, reviews: 203,
    image: '/api/trainer-images/hitec-real-isolate-100',
    tag: 'Popular', badge: 'badge-intermediate',
    description: 'Fast-absorbing isolate whey protein for clean lean-muscle recovery.',
  },
  {
    id: 15, name: 'HI-TEC Creatine Monohydrate', category: 'Supplements', brand: 'HI-TEC Nutrition',
    price: 160000, originalPrice: 100000,
    rating: 4.8, reviews: 178,
    image: '/api/trainer-images/hitec-creatine',
    tag: 'Strength', badge: 'badge-beginner',
    description: 'Micronized creatine monohydrate to improve power and gym performance.',
  },
  {
    id: 16, name: 'HI-TEC BCAA Powder', category: 'Supplements', brand: 'HI-TEC Nutrition',
    price: 150000, originalPrice: null,
    rating: 4.7, reviews: 145,
    image: '/api/trainer-images/hitec-bcaa',
    tag: 'Recovery', badge: 'badge-intermediate',
    description: 'BCAA 2:1:1 blend to support muscle recovery and reduce soreness.',
  },
  {
    id: 17, name: 'HI-TEC Glutamine', category: 'Supplements', brand: 'HI-TEC Nutrition',
    price: 145000, originalPrice: null,
    rating: 4.6, reviews: 132,
    image: '/api/trainer-images/hitec-glutamine',
    tag: 'Essential', badge: 'badge-beginner',
    description: 'L-glutamine formula to support post-workout recovery and immune health.',
  },
];

type CartItem = { product: typeof products[0]; qty: number; variant: string };

const supplementSectionProductIds = new Set([6, 7, 11, 14, 15, 16, 17]);

export default function Shop() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<{ product: typeof products[0]; qty: number; variant: string }[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [brand, setBrand] = useState('');
  const [previewImage, setPreviewImage] = useState<{ src: string; name: string } | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'qr' | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });
  const [formErrors, setFormErrors] = useState({ name: '', phone: '', address: '' });
  const [paymentFormErrors, setPaymentFormErrors] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [cardInfo, setCardInfo] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [qrConfirmed, setQrConfirmed] = useState(false);
  const skipInitialPersist = useRef(true);
  const visibleProducts = useMemo(
    () => products.filter((p) => supplementSectionProductIds.has(p.id)),
    []
  );

  useEffect(() => {
    const stored = loadSharedCart();
    if (stored.length === 0) return;
    const hydrated: CartItem[] = [];
    for (const s of stored) {
      const product = visibleProducts.find((p) => p.id === s.id);
      if (product) {
        hydrated.push({
          product,
          qty: s.qty,
          variant: s.variant || product.flavors?.[0] || 'Default',
        });
      }
    }
    if (hydrated.length > 0) setCart(hydrated);
  }, [visibleProducts]);

  useEffect(() => {
    if (skipInitialPersist.current) {
      skipInitialPersist.current = false;
      return;
    }
    saveSharedCart(
      cart.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        price: i.product.price,
        qty: i.qty,
        variant: i.variant,
      }))
    );
  }, [cart]);

  const filtered = visibleProducts.filter(
    (p) => {
      const categoryMatch = category === 'All' || p.category === category || (category === 'All Brands' && p.category === 'Supplements');
      const brandMatch = brand === '' || !p.brand || p.brand === brand || category !== 'All Brands';
      const searchMatch = p.name.toLowerCase().includes(search.toLowerCase());
      return categoryMatch && brandMatch && searchMatch;
    }
  );

  const cartTotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  function addToCart(product: typeof products[0]) {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1, variant: product.flavors?.[0] || 'Default' }];
    });
  }

  function toggleWishlist(id: number) {
    setWishlist((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  }

  return (
    <section id="shop" className="relative py-32 bg-[#0B0B0B]">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <div className="tag mb-4">Official Store</div>
            <h2 className="font-bebas text-[clamp(40px,6vw,80px)] leading-none text-white">
              PREMIUM
              <br />
              <span className="gradient-text">GEAR &amp; SUPPLEMENTS</span>
            </h2>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="relative btn-outline flex items-center gap-2 self-start lg:self-auto"
          >
            <ShoppingCart className="w-4 h-4" />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#D4FF00] text-black text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text" placeholder="Search products..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111111] border border-white/8 rounded-xl pl-11 pr-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#D4FF00]/40"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 flex-wrap">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => { setCategory(c); setBrand(''); }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${category === c ? 'bg-[#D4FF00] text-black' : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'}`}
                >
                  {c}
                </button>
              ))}
            </div>
            {category === 'All Brands' && (
              <div className="flex gap-2 flex-wrap">
                {brands.map((b) => (
                  <button
                    key={b}
                    onClick={() => setBrand(b)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${brand === b ? 'bg-[#D4FF00] text-black' : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id} product={product} index={i}
              wishlisted={wishlist.includes(product.id)}
              onWishlist={() => toggleWishlist(product.id)}
              onAddToCart={() => addToCart(product)}
              onPreview={() => setPreviewImage({ src: product.image, name: product.name })}
            />
          ))}
        </div>
      </div>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="flex-1 bg-black/80 backdrop-blur-xl" onClick={() => setCartOpen(false)} />
          <div className="w-full max-w-2xl bg-gradient-to-b from-[#111111] to-[#0A0A0A] flex flex-col h-full shadow-2xl">
            <div className="p-6 border-b border-[#D4FF00]/10 bg-gradient-to-r from-[#D4FF00]/5 to-transparent flex items-center justify-between">
              <div>
                <h3 className="font-bebas text-3xl text-white tracking-wide">YOUR CART</h3>
                <p className="text-[#D4FF00] text-sm font-semibold">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
              </div>
              <button onClick={() => setCartOpen(false)} className="w-10 h-10 rounded-full bg-[#D4FF00]/10 flex items-center justify-center hover:bg-[#D4FF00]/20 transition-all">
                <X className="w-5 h-5 text-[#D4FF00]" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-[#D4FF00]/10 flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-10 h-10 text-[#D4FF00]" />
                  </div>
                  <p className="text-white/50 text-lg font-medium mb-2">Your cart is empty</p>
                  <p className="text-white/30 text-sm">Add some products to get started</p>
                </div>
              ) : cart.map((item) => (
                <div key={item.product.id} className="flex gap-4 bg-gradient-to-br from-white/5 to-white/2 rounded-2xl p-4 border border-white/5 hover:border-[#D4FF00]/20 transition-all group">
                  <div className="relative">
                    <img src={item.product.image} alt="" className="w-20 h-20 object-cover rounded-xl group-hover:scale-105 transition-transform" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#D4FF00] rounded-full flex items-center justify-center">
                      <span className="text-black text-xs font-bold">{item.qty}</span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-white text-base font-semibold mb-1">{item.product.name}</p>
                      <p className="text-white/40 text-xs">{item.variant}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setCart((c) => c.map((i) => i.product.id === item.product.id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i).filter((i) => !(i.product.id === item.product.id && i.qty === 0)))}
                          className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#D4FF00]/20 hover:text-[#D4FF00] transition-all"
                        >
                          <Minus className="w-4 h-4 text-white" />
                        </button>
                        <span className="text-white text-sm w-6 text-center font-semibold">{item.qty}</span>
                        <button
                          onClick={() => setCart((c) => c.map((i) => i.product.id === item.product.id ? { ...i, qty: i.qty + 1 } : i))}
                          className="w-8 h-8 rounded-lg bg-[#D4FF00]/10 flex items-center justify-center hover:bg-[#D4FF00]/20 transition-all"
                        >
                          <Plus className="w-4 h-4 text-[#D4FF00]" />
                        </button>
                      </div>
                      <span className="text-[#D4FF00] font-bold text-lg">{(item.product.price * item.qty).toLocaleString()} ₮</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="p-6 border-t border-[#D4FF00]/10 bg-gradient-to-r from-[#D4FF00]/5 to-transparent">
                <div className="bg-black/30 rounded-xl p-4 mb-4 border border-white/5">
                  <div className="flex items-center justify-between text-sm text-white/60 mb-2">
                    <span>Subtotal</span>
                    <span>{cartTotal.toLocaleString()} ₮</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-white/60 mb-3">
                    <span>Shipping</span>
                    <span className="text-[#D4FF00]">Free</span>
                  </div>
                  <div className="h-px bg-white/10 mb-3" />
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold text-lg">Total</span>
                    <span className="font-bebas text-3xl text-[#D4FF00]">{cartTotal.toLocaleString()} ₮</span>
                  </div>
                </div>
                <button onClick={() => {
                  setCartOpen(false);
                  setShowCheckoutForm(true);
                }} className="btn-primary w-full py-4 text-base font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#D4FF00]/20 hover:shadow-[#D4FF00]/30 transition-all">
                  <CreditCard className="w-5 h-5" />
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {previewImage && (
        <div
          className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute -top-10 right-0 text-white/80 hover:text-white text-sm"
            >
              Close
            </button>
            <img
              src={previewImage.src}
              alt={previewImage.name}
              className="w-full max-h-[88vh] object-contain rounded-xl border border-white/10 bg-[#0B0B0B]"
            />
          </div>
        </div>
      )}

      {/* Checkout Form Modal */}
      {showCheckoutForm && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4" onClick={() => setShowCheckoutForm(false)}>
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
          <div
            className="relative z-10 w-full max-w-md bg-gradient-to-b from-[#111111] to-[#0A0A0A] rounded-2xl border border-[#D4FF00]/10 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bebas text-2xl text-white">CHECKOUT</h2>
              <button onClick={() => setShowCheckoutForm(false)} className="text-white/50 hover:text-white">
                ×
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-white/70 text-sm mb-2 block">Нэр *</label>
                <input
                  type="text"
                  placeholder="Таны нэр"
                  value={customerInfo.name}
                  onChange={(e) => {
                    setCustomerInfo({ ...customerInfo, name: e.target.value });
                    setFormErrors({ ...formErrors, name: '' });
                  }}
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none ${formErrors.name ? 'border-red-500' : 'border-white/10 focus:border-[#D4FF00]'}`}
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>
              <div>
                <label className="text-white/70 text-sm mb-2 block">Утас *</label>
                <input
                  type="tel"
                  placeholder="99999999"
                  value={customerInfo.phone}
                  onChange={(e) => {
                    setCustomerInfo({ ...customerInfo, phone: e.target.value });
                    setFormErrors({ ...formErrors, phone: '' });
                  }}
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none ${formErrors.phone ? 'border-red-500' : 'border-white/10 focus:border-[#D4FF00]'}`}
                />
                {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
              </div>
              <div>
                <label className="text-white/70 text-sm mb-2 block">Хаяг *</label>
                <textarea
                  placeholder="Хүргэлтийн хаяг"
                  value={customerInfo.address}
                  onChange={(e) => {
                    setCustomerInfo({ ...customerInfo, address: e.target.value });
                    setFormErrors({ ...formErrors, address: '' });
                  }}
                  rows={3}
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none resize-none ${formErrors.address ? 'border-red-500' : 'border-white/10 focus:border-[#D4FF00]'}`}
                />
                {formErrors.address && <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>}
              </div>
            </div>

            <div className="bg-black/30 rounded-xl p-4 mb-4 border border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">Total</span>
                <span className="font-bebas text-2xl text-[#D4FF00]">{cartTotal.toLocaleString()} ₮</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCheckoutForm(false)}
                className="flex-1 py-3 rounded-xl text-white/70 border border-white/15 hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const errors = {
                    name: !customerInfo.name ? 'Нэр оруулна уу' : '',
                    phone: !customerInfo.phone ? 'Утас оруулна уу' : '',
                    address: !customerInfo.address ? 'Хаяг оруулна уу' : ''
                  };
                  setFormErrors(errors);
                  if (errors.name || errors.phone || errors.address) {
                    return;
                  }
                  setShowCheckoutForm(false);
                  setShowPaymentModal(true);
                }}
                className="flex-1 py-3 rounded-xl bg-[#D4FF00] text-black font-semibold hover:bg-[#C1EA00] transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4" onClick={() => {
          setShowPaymentModal(false);
          setSelectedPaymentMethod(null);
        }}>
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
          <div
            className="relative z-10 w-full max-w-md bg-[#111111] rounded-2xl border border-white/8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bebas text-2xl text-white">PAYMENT</h2>
                <button onClick={() => {
                  setShowPaymentModal(false);
                  setSelectedPaymentMethod(null);
                }} className="text-white/50 hover:text-white">
                  ×
                </button>
              </div>

              {!selectedPaymentMethod ? (
                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedPaymentMethod('card')}
                    className="w-full p-4 bg-white/3 rounded-xl hover:bg-white/5 transition-all flex items-center gap-4"
                  >
                    <CreditCard className="w-6 h-6 text-[#D4FF00]" />
                    <div className="text-left">
                      <p className="text-white font-semibold">Card Payment</p>
                      <p className="text-white/50 text-sm">Pay with credit/debit card</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setSelectedPaymentMethod('qr')}
                    className="w-full p-4 bg-white/3 rounded-xl hover:bg-white/5 transition-all flex items-center gap-4"
                  >
                    <QrCode className="w-6 h-6 text-[#D4FF00]" />
                    <div className="text-left">
                      <p className="text-white font-semibold">QR Code</p>
                      <p className="text-white/50 text-sm">Scan QR code to pay</p>
                    </div>
                  </button>
                </div>
              ) : selectedPaymentMethod === 'card' ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardInfo.cardNumber}
                      onChange={(e) => {
                        setCardInfo({ ...cardInfo, cardNumber: e.target.value });
                        setPaymentFormErrors({ ...paymentFormErrors, cardNumber: '' });
                      }}
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none ${paymentFormErrors.cardNumber ? 'border-red-500' : 'border-white/10 focus:border-[#D4FF00]'}`}
                    />
                    {paymentFormErrors.cardNumber && <p className="text-red-500 text-xs mt-1">{paymentFormErrors.cardNumber}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/70 text-sm mb-2 block">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardInfo.expiry}
                        onChange={(e) => {
                          setCardInfo({ ...cardInfo, expiry: e.target.value });
                          setPaymentFormErrors({ ...paymentFormErrors, expiry: '' });
                        }}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none ${paymentFormErrors.expiry ? 'border-red-500' : 'border-white/10 focus:border-[#D4FF00]'}`}
                      />
                      {paymentFormErrors.expiry && <p className="text-red-500 text-xs mt-1">{paymentFormErrors.expiry}</p>}
                    </div>
                    <div>
                      <label className="text-white/70 text-sm mb-2 block">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cardInfo.cvv}
                        onChange={(e) => {
                          setCardInfo({ ...cardInfo, cvv: e.target.value });
                          setPaymentFormErrors({ ...paymentFormErrors, cvv: '' });
                        }}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none ${paymentFormErrors.cvv ? 'border-red-500' : 'border-white/10 focus:border-[#D4FF00]'}`}
                      />
                      {paymentFormErrors.cvv && <p className="text-red-500 text-xs mt-1">{paymentFormErrors.cvv}</p>}
                    </div>
                  </div>
                  <button
                    onClick={async () => {
                      const errors = {
                        cardNumber: !cardInfo.cardNumber ? 'Картын дугаар оруулна уу' : '',
                        expiry: !cardInfo.expiry ? 'Дуусах хугацаа оруулна уу' : '',
                        cvv: !cardInfo.cvv ? 'CVV оруулна уу' : ''
                      };
                      setPaymentFormErrors(errors);
                      if (errors.cardNumber || errors.expiry || errors.cvv) {
                        return;
                      }
                      setProcessingPayment(true);
                      // Simulate payment processing
                      await new Promise(resolve => setTimeout(resolve, 2000));
                      setCart([]);
                      setShowPaymentModal(false);
                      setSelectedPaymentMethod(null);
                      setCartOpen(false);
                      setProcessingPayment(false);
                    }}
                    disabled={processingPayment}
                    className="w-full btn-primary py-3 disabled:opacity-60"
                  >
                    {processingPayment ? 'Processing...' : `Pay ${cartTotal.toLocaleString()} ₮`}
                  </button>
                  <button
                    onClick={() => setSelectedPaymentMethod(null)}
                    className="w-full text-white/50 py-2 hover:text-white transition-colors"
                  >
                    Back
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="bg-white p-4 rounded-xl inline-block mb-4">
                    <Image
                      src="/payment-qr.png"
                      alt="Төлбөрийн QR код"
                      width={192}
                      height={192}
                      className="h-48 w-48 object-contain"
                      priority
                    />
                  </div>
                  <p className="text-white/70 text-sm mb-2">
                    Scan this QR code with Qpay or your banking app
                  </p>
                  <p className="text-[#D4FF00] font-bold text-lg mb-4">
                    Total: {cartTotal.toLocaleString()} ₮
                  </p>
                  <div className="bg-white/5 rounded-xl p-3 mb-4">
                    <p className="text-white/50 text-xs mb-1">Bank Account for Transfer:</p>
                    <p className="text-white font-mono text-sm">Khan Bank: 5012 3456 7890</p>
                    <p className="text-white font-mono text-sm">Account Name: Fitness App LLC</p>
                  </div>
                  <div className="flex items-start gap-2 mb-4">
                    <input
                      type="checkbox"
                      id="qrConfirm"
                      checked={qrConfirmed}
                      onChange={(e) => setQrConfirmed(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded bg-white/10 border-white/20 text-[#D4FF00] focus:ring-[#D4FF00] cursor-pointer"
                    />
                    <label htmlFor="qrConfirm" className="text-white/70 text-sm text-left cursor-pointer">
                      Би QR кодыг скан хийж төлбөрөө хийсэн гэдгийг баталж байна
                    </label>
                  </div>
                  <button
                    onClick={async () => {
                      if (!qrConfirmed) {
                        return;
                      }
                      setProcessingPayment(true);
                      // Simulate payment processing
                      await new Promise(resolve => setTimeout(resolve, 2000));
                      setCart([]);
                      setShowPaymentModal(false);
                      setSelectedPaymentMethod(null);
                      setCartOpen(false);
                      setProcessingPayment(false);
                      setQrConfirmed(false);
                    }}
                    disabled={processingPayment || !qrConfirmed}
                    className="w-full btn-primary py-3 mb-2 disabled:opacity-60"
                  >
                    {processingPayment ? 'Confirming...' : 'Confirm Payment'}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPaymentMethod(null);
                      setQrConfirmed(false);
                    }}
                    className="w-full text-white/50 py-2 hover:text-white transition-colors"
                  >
                    Back
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ProductCard({ product, wishlisted, onWishlist, onAddToCart, onPreview, index }: {
  product: typeof products[0];
  wishlisted: boolean;
  onWishlist: () => void;
  onAddToCart: () => void;
  onPreview: () => void;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group rounded-2xl overflow-hidden transition-all duration-400"
      style={{
        background: '#111111',
        border: hovered ? '1px solid rgba(212,255,0,0.15)' : '1px solid rgba(255,255,255,0.05)',
        transform: hovered ? 'translateY(-6px)' : 'none',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.4)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onPreview}
    >
      <div className="relative h-56 overflow-hidden bg-[#0B0B0B]">
        <img src={product.image} alt={product.name} className="w-full h-full object-contain p-2 group-hover:scale-[1.03] transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
        {product.tag && <div className="absolute top-3 left-3 tag">{product.tag}</div>}
        <button
          onClick={(e) => { e.stopPropagation(); onWishlist(); }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${wishlisted ? 'bg-red-500/20 border border-red-500/40' : 'bg-black/50 border border-white/10 hover:border-red-500/40'}`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-400 text-red-400' : 'text-white/50'}`} />
        </button>
      </div>

      <div className="p-5">
        <h3 className="font-barlow font-bold text-white text-lg mb-1">{product.name}</h3>
        <p className="text-white/35 text-xs mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-[#D4FF00] text-[#D4FF00]' : 'text-white/20'}`} />
            ))}
          </div>
          <span className="text-white/40 text-xs">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="font-bebas text-2xl text-[#D4FF00]">{product.price.toLocaleString()} ₮</span>
            {product.originalPrice && (
              <span className="text-white/30 text-sm line-through ml-2">{product.originalPrice?.toLocaleString()} ₮</span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-sm transition-all"
            style={{
              background: hovered ? '#D4FF00' : 'rgba(212,255,0,0.1)',
              color: hovered ? '#0B0B0B' : '#D4FF00',
              boxShadow: hovered ? '0 0 20px rgba(212,255,0,0.3)' : 'none',
            }}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

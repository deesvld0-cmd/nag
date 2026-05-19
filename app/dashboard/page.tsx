'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { User, Calendar, Trophy, Target, Dumbbell, Activity, ArrowRight, ArrowLeft, ShoppingCart, CreditCard, QrCode } from 'lucide-react';
import { loadSharedCart, saveSharedCart, type SharedCartItem } from '@/lib/shop-cart';
import { LanguageProvider } from '@/lib/i18n';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<SharedCartItem[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'qr' | null>(null);

  useEffect(() => {
    setCart(loadSharedCart());
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      fetchUserData();
    }
  }, [status, router]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/subscription');
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const subscription = userData?.subscription;
  const stats = {
    workoutsCompleted: 0,
    inProgress: 0,
    totalPrograms: 0,
    currentStreak: 0,
    caloriesBurned: 0,
    goalsAchieved: 0,
    ...userData?.stats,
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const removeCartLine = (index: number) => {
    const next = cart.filter((_, i) => i !== index);
    setCart(next);
    saveSharedCart(next);
  };

  const clearCart = () => {
    setCart([]);
    saveSharedCart([]);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B0B0B] via-[#1A1A1A] to-[#0B0B0B] border-b border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors mt-2">
                <ArrowLeft className="w-5 h-5 text-white" />
              </Link>
              <div>
                <h1 className="font-bebas text-4xl text-white mb-2">DASHBOARD</h1>
                <p className="text-white/50">Welcome back, {session.user?.name || session.user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#D4FF00]/10 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-[#D4FF00]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={Dumbbell}
            label="Workouts Completed"
            value={stats.workoutsCompleted}
            color="text-[#D4FF00]"
            bgColor="bg-[#D4FF00]/10"
          />
          <StatCard
            icon={Trophy}
            label="Current Streak"
            value={`${stats.currentStreak} days`}
            color="text-[#FF6B6B]"
            bgColor="bg-[#FF6B6B]/10"
          />
          <StatCard
            icon={Target}
            label="Goals Achieved"
            value={String(stats.goalsAchieved)}
            color="text-[#4ECDC4]"
            bgColor="bg-[#4ECDC4]/10"
          />
          <StatCard
            icon={Activity}
            label="Calories Burned"
            value={`${stats.caloriesBurned ?? 0}`}
            color="text-[#A855F7]"
            bgColor="bg-[#A855F7]/10"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Plan */}
            <div className="bg-[#111111] rounded-2xl border border-white/5 p-6">
              <h2 className="font-bebas text-2xl text-white mb-4">CURRENT PLAN</h2>
              {subscription ? (
                <div className="bg-gradient-to-r from-[#D4FF00]/10 to-transparent rounded-xl p-6 border border-[#D4FF00]/20">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {subscription.plan
                          ? `${subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan`
                          : 'Active Plan'}
                      </h3>
                      <p className="text-white/50 text-sm">
                        {subscription.trainer ? `Trainer: ${subscription.trainer.name}` : 'No trainer assigned'}
                      </p>
                    </div>
                    <span className="bg-[#D4FF00] text-black text-xs font-bold px-3 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                  <div className="text-white/70 text-sm mb-3">
                    Started: {new Date(subscription.startDate).toLocaleDateString()}
                    {subscription.endDate && ` • Ends: ${new Date(subscription.endDate).toLocaleDateString()}`}
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-[#D4FF00]/10 to-transparent rounded-xl p-6 border border-[#D4FF00]/20">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">Free Plan</h3>
                      <p className="text-white/50 text-sm">Basic access to programs</p>
                    </div>
                    <Link href="/#membership" className="btn-primary text-sm py-2 px-4 inline-block text-center">
                      Upgrade
                    </Link>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-[#D4FF00] h-2 rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-[#111111] rounded-2xl border border-white/5 p-6">
              <h2 className="font-bebas text-2xl text-white mb-4">RECENT ACTIVITY</h2>
              <div className="space-y-4">
                <ActivityItem
                  title="No recent activity"
                  description="Start your fitness journey today!"
                  time="Just now"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Cart */}
            <div className="bg-[#111111] rounded-2xl border border-white/5 p-6">
              <h2 className="font-bebas text-2xl text-white mb-4">SHOPPING CART</h2>
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 text-white/20 mx-auto mb-3" />
                  <p className="text-white/50 text-sm">Your cart is empty</p>
                  <Link href="/#shop" className="text-[#D4FF00] text-sm mt-2 inline-block hover:underline">
                    Browse Products
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex items-center justify-between p-3 bg-white/3 rounded-xl">
                      <div>
                        <p className="text-white font-medium text-sm">{item.name}</p>
                        <p className="text-white/50 text-xs">
                          {item.qty > 1 ? `${item.qty} × ` : ''}
                          {item.price.toLocaleString()} (unit)
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeCartLine(index)}
                        className="text-white/50 hover:text-red-500 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-white/10">
                    <div className="flex justify-between text-white font-semibold mb-3">
                      <span>Total:</span>
                      <span>{cartTotal.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => setShowPaymentModal(true)}
                      className="w-full btn-primary py-2.5 text-sm flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-[#111111] rounded-2xl border border-white/5 p-6">
              <h2 className="font-bebas text-2xl text-white mb-4">QUICK ACTIONS</h2>
              <div className="space-y-3">
                <QuickAction href="/#programs" label="Browse Programs" />
                <QuickAction href="/#trainers" label="Find a Trainer" />
                <QuickAction href="/#exercises" label="Exercise Library" />
                <QuickAction href="/#shop" label="Shop Supplements" />
              </div>
            </div>

            {/* Upcoming */}
            <div className="bg-[#111111] rounded-2xl border border-white/5 p-6">
              <h2 className="font-bebas text-2xl text-white mb-4">UPCOMING</h2>
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <p className="text-white/50 text-sm">No scheduled sessions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowPaymentModal(false)}>
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
          <div
            className="relative z-10 w-full max-w-md bg-[#111111] rounded-2xl border border-white/8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bebas text-2xl text-white">PAYMENT</h2>
                <button onClick={() => setShowPaymentModal(false)} className="text-white/50 hover:text-white">
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
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF00]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/70 text-sm mb-2 block">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF00]"
                      />
                    </div>
                    <div>
                      <label className="text-white/70 text-sm mb-2 block">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF00]"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      alert('Payment processed successfully!');
                      setShowPaymentModal(false);
                      clearCart();
                      setSelectedPaymentMethod(null);
                    }}
                    className="w-full btn-primary py-3"
                  >
                    Pay {cartTotal.toLocaleString()}
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
                  <div className="mb-4 flex justify-center">
                    <div className="bg-white p-4 rounded-xl inline-block">
                      <Image
                        src="/payment-qr.png"
                        alt="Төлбөрийн QR код"
                        width={192}
                        height={192}
                        className="h-48 w-48 object-contain"
                        priority
                      />
                    </div>
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
                  <button
                    onClick={() => {
                      alert('Payment confirmed! Thank you for your purchase.');
                      setShowPaymentModal(false);
                      clearCart();
                      setSelectedPaymentMethod(null);
                    }}
                    className="w-full btn-primary py-3 mb-2"
                  >
                    I Have Paid
                  </button>
                  <button
                    onClick={() => setSelectedPaymentMethod(null)}
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
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, bgColor }: any) {
  return (
    <div className="bg-[#111111] rounded-2xl border border-white/5 p-6 hover:border-white/10 transition-all">
      <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center mb-4`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <h3 className="font-bebas text-3xl text-white mb-1">{value}</h3>
      <p className="text-white/50 text-sm">{label}</p>
    </div>
  );
}

function ActivityItem({ title, description, time }: any) {
  return (
    <div className="flex items-start gap-4 p-4 bg-white/3 rounded-xl">
      <div className="w-10 h-10 bg-[#D4FF00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
        <Dumbbell className="w-5 h-5 text-[#D4FF00]" />
      </div>
      <div className="flex-1">
        <h4 className="text-white font-semibold mb-1">{title}</h4>
        <p className="text-white/50 text-sm">{description}</p>
      </div>
      <span className="text-white/30 text-xs">{time}</span>
    </div>
  );
}

function QuickAction({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between p-4 bg-white/3 rounded-xl hover:bg-white/5 transition-all group"
    >
      <span className="text-white font-medium">{label}</span>
      <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-[#D4FF00] transition-colors" />
    </Link>
  );
}

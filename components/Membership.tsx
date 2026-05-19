'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Check, Zap, Crown, Star, QrCode, CreditCard } from 'lucide-react';
import TrainerSelectionModal from './TrainerSelectionModal';
import { useSession } from 'next-auth/react';

type Billing = 'monthly' | 'yearly';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    icon: Zap,
    tagline: 'Эхлэлээ тавь',
    monthly: 49900,
    yearly: 39900,
    color: '#4A9EFF',
    popular: false,
    features: [
      '50+ дасгалын хөтөлбөрт хандах эрх',
      'Дасгалын сан (200+ дасгал)',
      'BMI & Калори тооцоолуур',
      'Community форум ашиглах эрх',
      'Гар утасны апп (iOS & Android)',
      'Ахиц дэвшил хянах',
    ],
    missing: ['Хувийн дасгалжуулагч', '1-на-1 дасгалжуулалт', 'Хувьчилсан хоолны төлөвлөгөө', 'Дээд зэрэглэлийн тусламж'],
  },
  {
    id: 'pro',
    name: 'Pro',
    icon: Star,
    tagline: 'Хамгийн их сонголт',
    monthly: 89900,
    yearly: 71900,
    color: '#D4FF00',
    popular: true,
    features: [
      'Basic-ийн бүх боломж',
      'Бүх 200+ хөтөлбөрт хандах эрх',
      'Дасгалжуулагчтай чатлах',
      'Хувийн хөтөлбөр үүсгэгч',
      'Нарийвчилсан analytics dashboard',
      'Хооллолт & meal planning',
      'Дээд зэрэглэлийн тусламж (24 цаг)',
      'Видео зөвлөгөө (сард 2 удаа)',
    ],
    missing: ['Хязгааргүй дасгалжуулалт', 'Тогтмол/өөрийн дасгалжуулагч'],
  },
  {
    id: 'elite',
    name: 'Elite',
    icon: Crown,
    tagline: 'Хамгийн дээд өөрчлөлт',
    monthly: 119000,
    yearly: 95200,
    color: '#FF9500',
    popular: false,
    features: [
      'Pro-ийн бүх боломж',
      'Тогтмол хувийн дасгалжуулагч',
      'Хязгааргүй 1-на-1 дасгалжуулалт',
      'AI хувьчилсан хоолны төлөвлөгөө',
      'Долоо хоног бүрийн check-in & үнэлгээ',
      'Заалны session credit (сард 4 удаа)',
      'DNA фитнес шинжилгээ',
      'VIP community ашиглах эрх',
      '24/7 дээд зэрэглэлийн тусламж',
    ],
    missing: [],
  },
];

export default function Membership() {
  const { data: session } = useSession();
  const [billing, setBilling] = useState<Billing>('monthly');
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [showTrainerModal, setShowTrainerModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedTrainer, setSelectedTrainer] = useState<any>(null);
  const [pendingTrainer, setPendingTrainer] = useState<any>(null);
  const [enrolling, setEnrolling] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'qr' | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [qrReference, setQrReference] = useState('');

  const normalizeDigits = (v: string) => v.replace(/\D/g, '');
  const isCardValid = () => {
    const digits = normalizeDigits(cardNumber);
    const exp = cardExpiry.trim();
    const cvv = normalizeDigits(cardCvv);
    return digits.length >= 12 && exp.length >= 4 && cvv.length >= 3;
  };

  const isQrValid = () => qrReference.trim().length >= 4;

  useEffect(() => {
    const syncSelectedProgram = () => {
      setSelectedProgram(window.sessionStorage.getItem('selectedProgram'));
    };

    syncSelectedProgram();
    window.addEventListener('storage', syncSelectedProgram);
    window.addEventListener('focus', syncSelectedProgram);
    window.addEventListener('selected-program-change', syncSelectedProgram);

    return () => {
      window.removeEventListener('storage', syncSelectedProgram);
      window.removeEventListener('focus', syncSelectedProgram);
      window.removeEventListener('selected-program-change', syncSelectedProgram);
    };
  }, []);

  const resetPaymentInputs = () => {
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    setQrReference('');
  };

  const completeEnrollment = async (
    trainer: any,
    payment?: { method: 'card' | 'qr'; cardLast4?: string; qrReference?: string }
  ) => {
    if (!session) {
      alert('Please sign in to enroll with a trainer');
      return;
    }

    setEnrolling(true);
    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trainerId: trainer.id,
          plan: selectedPlan,
          payment,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Successfully enrolled with trainer!');
        if (selectedPlan) {
          window.localStorage.setItem('membershipPlan', selectedPlan);
          window.dispatchEvent(new Event('membership-plan-change'));
        }
        setSelectedTrainer(trainer);
        setShowTrainerModal(false);
      } else {
        alert(data.error || 'Failed to enroll. Please try again.');
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      alert('Failed to enroll. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  const handleEnroll = async (trainer: any) => {
    if (selectedPlan === 'pro' || selectedPlan === 'elite') {
      setPendingTrainer(trainer);
      setShowPaymentModal(true);
      return;
    }
    await completeEnrollment(trainer);
  };

  const handlePlanClick = (planId: string) => {
    setSelectedPlan(planId);

    if (!session) {
      window.location.href = '/auth/signin';
      return;
    }

    if (planId === 'pro' || planId === 'elite') {
      window.localStorage.setItem('membershipPlan', planId);
      window.dispatchEvent(new Event('membership-plan-change'));
      setShowTrainerModal(true);
      return;
    }

    window.localStorage.setItem('membershipPlan', planId);
    window.dispatchEvent(new Event('membership-plan-change'));
    alert(`${selectedProgram || 'Basic program'} started with the Basic plan.`);
  };

  return (
    <section id="membership" className="relative py-32 bg-[#0D0D0D] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#D4FF00]/4 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#0099FF]/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="tag mb-4 mx-auto inline-flex">Membership Plans</div>
          <h2 className="font-bebas text-[clamp(40px,6vw,80px)] leading-none text-white mb-4">
            INVEST IN YOUR
            <br />
            <span className="gradient-text">TRANSFORMATION</span>
          </h2>
          <p className="text-white/40 max-w-md mx-auto mb-8">
            Choose the plan that matches your ambition. Cancel anytime.
          </p>
          {selectedProgram && (
            <div className="mx-auto mb-6 inline-flex items-center rounded-full border border-[#D4FF00]/25 bg-[#D4FF00]/10 px-4 py-2 text-sm font-semibold text-[#D4FF00]">
              Selected Program: {selectedProgram}
            </div>
          )}

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 bg-[#1A1A1A] rounded-full p-1.5">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                billing === 'monthly' ? 'bg-white text-black' : 'text-white/50 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                billing === 'yearly' ? 'bg-white text-black' : 'text-white/50 hover:text-white'
              }`}
            >
              Yearly
              <span className="text-[10px] bg-[#D4FF00] text-black px-1.5 py-0.5 rounded font-bold">-20%</span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => {
            const price = billing === 'yearly' ? plan.yearly : plan.monthly;
            const isHovered = hoveredPlan === plan.id;
            const isPop = plan.popular;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-8 transition-all duration-500 cursor-pointer ${isPop ? '-mt-4' : ''}`}
                style={{
                  background: isPop ? 'linear-gradient(160deg, #1A1A1A, #131313)' : '#111111',
                  border: isPop ? `1px solid ${plan.color}40` : isHovered ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.05)',
                  boxShadow: isPop ? `0 0 60px ${plan.color}15, 0 30px 80px rgba(0,0,0,0.4)` : isHovered ? '0 20px 60px rgba(0,0,0,0.3)' : 'none',
                  transform: isHovered ? 'translateY(-6px)' : 'none',
                }}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {isPop && (
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full text-[11px] font-bold text-black"
                    style={{ background: plan.color }}
                  >
                    MOST POPULAR
                  </div>
                )}

                {/* Header */}
                <div className="mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${plan.color}15`, border: `1px solid ${plan.color}25` }}
                  >
                    <plan.icon className="w-5 h-5" style={{ color: plan.color }} />
                  </div>
                  <h3 className="font-bebas text-2xl text-white mb-1">{plan.name}</h3>
                  <p className="text-white/40 text-sm">{plan.tagline}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-end gap-1">
                    <span className="font-bebas text-6xl leading-none" style={{ color: plan.color }}>{price.toLocaleString()} ₮</span>
                    <span className="text-white/40 mb-2">/mo</span>
                  </div>
                  {billing === 'yearly' && (
                    <p className="text-[#D4FF00] text-xs mt-1">Save {((plan.monthly - plan.yearly) * 12).toLocaleString()} ₮/year</p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-white/80">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${plan.color}20` }}>
                        <Check className="w-2.5 h-2.5" style={{ color: plan.color }} />
                      </div>
                      {f}
                    </li>
                  ))}
                  {plan.missing.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-white/20 line-through">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-white/5">
                        <Check className="w-2.5 h-2.5 text-white/15" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handlePlanClick(plan.id)}
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    isPop ? 'text-black' : 'text-white'
                  }`}
                  style={{
                    background: isPop ? plan.color : isHovered ? `${plan.color}20` : 'rgba(255,255,255,0.05)',
                    border: !isPop ? `1px solid ${plan.color}30` : 'none',
                    color: isPop ? '#0B0B0B' : plan.color,
                    boxShadow: isPop ? `0 0 30px ${plan.color}30` : 'none',
                  }}
                >
                  {plan.id === 'pro' || plan.id === 'elite' ? 'Choose Trainer' : `Get ${plan.name} Plan`}
                </button>
              </div>
            );
          })}
        </div>

        {/* Guarantee */}
        <div className="mt-12 text-center">
          <p className="text-white/30 text-sm">
            30-day money-back guarantee &bull; No contracts &bull; Cancel anytime
          </p>
        </div>
      </div>

      {/* Trainer Selection Modal */}
      <TrainerSelectionModal
        isOpen={showTrainerModal}
        onClose={() => setShowTrainerModal(false)}
        onSelectTrainer={handleEnroll}
      />

      {/* Pro Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={() => {
          setShowPaymentModal(false);
          setSelectedPaymentMethod(null);
          setPendingTrainer(null);
          resetPaymentInputs();
        }}>
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-md rounded-2xl border border-[#D4FF00]/25 bg-[#111111] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {!selectedPaymentMethod ? (
              <>
                <h3 className="font-bebas text-3xl text-white mb-2">PRO PAYMENT</h3>
                <p className="text-white/60 text-sm mb-5">
                  Төлбөрийн аргаа сонгоно уу
                </p>

                <div className="space-y-3 mb-6">
                  <button
                    onClick={() => setSelectedPaymentMethod('card')}
                    className="w-full p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#D4FF00]/30 transition-all flex items-center gap-4"
                  >
                    <CreditCard className="w-6 h-6 text-[#D4FF00]" />
                    <div className="text-left">
                      <p className="text-white font-semibold">Card Payment</p>
                      <p className="text-white/50 text-sm">Pay with credit/debit card</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setSelectedPaymentMethod('qr')}
                    className="w-full p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#D4FF00]/30 transition-all flex items-center gap-4"
                  >
                    <QrCode className="w-6 h-6 text-[#D4FF00]" />
                    <div className="text-left">
                      <p className="text-white font-semibold">QR Code</p>
                      <p className="text-white/50 text-sm">Scan with Qpay or banking app</p>
                    </div>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowPaymentModal(false);
                    setSelectedPaymentMethod(null);
                    setPendingTrainer(null);
                    resetPaymentInputs();
                  }}
                  className="w-full py-3 rounded-xl text-white/70 border border-white/15 hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : selectedPaymentMethod === 'card' ? (
              <>
                <h3 className="font-bebas text-3xl text-white mb-2">CARD PAYMENT</h3>
                <p className="text-white/60 text-sm mb-5">
                  Картын мэдээллээ оруулна уу
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF00]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/70 text-sm mb-2 block">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF00]"
                      />
                    </div>
                    <div>
                      <label className="text-white/70 text-sm mb-2 block">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF00]"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-sm text-white/70 mb-6">
                  <p>Plan: <span className="text-white font-semibold">Pro</span></p>
                  <p>
                    Trainer: <span className="text-white font-semibold">{pendingTrainer?.name || 'Selected trainer'}</span>
                  </p>
                  <p>
                    Price: <span className="text-[#D4FF00] font-semibold">{pendingTrainer?.pricing || '199,000 ₮/сар'}</span>
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod(null)}
                    className="flex-1 py-3 rounded-xl text-white/70 border border-white/15 hover:bg-white/5 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={enrolling}
                    onClick={async () => {
                      if (!pendingTrainer) return;
                      if (!isCardValid()) {
                        alert('Картын мэдээллээ бүрэн бөглөнө үү');
                        return;
                      }
                      const digits = normalizeDigits(cardNumber);
                      await completeEnrollment(pendingTrainer, { method: 'card', cardLast4: digits.slice(-4) });
                      setShowPaymentModal(false);
                      setPendingTrainer(null);
                      setSelectedPaymentMethod(null);
                      resetPaymentInputs();
                    }}
                    className="flex-1 py-3 rounded-xl bg-[#D4FF00] text-black font-semibold hover:bg-[#C1EA00] transition-colors disabled:opacity-60"
                  >
                    {enrolling ? 'Processing...' : 'Pay Now'}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-bebas text-3xl text-white mb-2">QR PAYMENT</h3>
                <p className="text-white/60 text-sm mb-5">
                  QR-аар төлбөрөө хийгээд, дараа нь баталгаажуулна уу
                </p>

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

                <p className="text-white/70 text-sm mb-2 text-center">
                  Scan this QR code with Qpay or your banking app
                </p>
                <p className="text-[#D4FF00] font-bold text-lg mb-4 text-center">
                  Total: 199,000 ₮
                </p>

                <div className="bg-white/5 rounded-xl p-3 mb-4">
                  <p className="text-white/50 text-xs mb-1">Bank Account for Transfer:</p>
                  <p className="text-white font-mono text-sm">Khan Bank: 5012 3456 7890</p>
                  <p className="text-white font-mono text-sm">Account Name: Fitness App LLC</p>
                </div>

                <div className="mb-6">
                  <label className="text-white/70 text-sm mb-2 block">Гүйлгээний утга / Reference</label>
                  <input
                    type="text"
                    placeholder="Ж: INV-1234"
                    value={qrReference}
                    onChange={(e) => setQrReference(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF00]"
                  />
                  <p className="text-white/40 text-xs mt-2">
                    Төлбөр баталгаажуулахад ашиглана.
                  </p>
                </div>

                <div className="text-sm text-white/70 mb-6">
                  <p>Plan: <span className="text-white font-semibold">Pro</span></p>
                  <p>
                    Trainer: <span className="text-white font-semibold">{pendingTrainer?.name || 'Selected trainer'}</span>
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod(null)}
                    className="flex-1 py-3 rounded-xl text-white/70 border border-white/15 hover:bg-white/5 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={enrolling}
                    onClick={async () => {
                      if (!pendingTrainer) return;
                      if (!isQrValid()) {
                        alert('Гүйлгээний утга / reference оруулна уу');
                        return;
                      }
                      await completeEnrollment(pendingTrainer, { method: 'qr', qrReference: qrReference.trim() });
                      setShowPaymentModal(false);
                      setPendingTrainer(null);
                      setSelectedPaymentMethod(null);
                      resetPaymentInputs();
                    }}
                    className="flex-1 py-3 rounded-xl bg-[#D4FF00] text-black font-semibold hover:bg-[#C1EA00] transition-colors disabled:opacity-60"
                  >
                    {enrolling ? 'Confirming...' : 'I Have Paid'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

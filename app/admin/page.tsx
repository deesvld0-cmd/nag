import Link from 'next/link'
import { Users, Dumbbell, UserCheck, ShoppingCart, ArrowUpRight, Activity, ShieldCheck } from 'lucide-react'
import { prisma } from '@/lib/prisma'

export const revalidate = 30

type DashboardData = {
  userCount: number
  programCount: number
  trainerCount: number
  subscriptionCount: number
  orderCount: number
  recentUsers: Array<{ id: string; email: string | null; name: string | null; createdAt: Date }>
  recentSubscriptions: Array<{ id: string; plan: string; status: string; startDate: Date; user: { email: string | null } }>
}

async function getDashboardData(): Promise<DashboardData | null> {
  try {
    const [userCount, programCount, trainerCount, subscriptionCount, orderCount, recentUsers, recentSubscriptions] = await Promise.all([
      prisma.user.count(),
      prisma.program.count(),
      prisma.trainer.count(),
      prisma.userSubscription.count(),
      prisma.order.count(),
      prisma.user.findMany({
        select: { id: true, email: true, name: true, createdAt: true },
        orderBy: { createdAt: 'desc' },
        take: 6,
      }),
      prisma.userSubscription.findMany({
        select: {
          id: true,
          plan: true,
          status: true,
          startDate: true,
          user: { select: { email: true } },
        },
        orderBy: { startDate: 'desc' },
        take: 6,
      }),
    ])

    return {
      userCount,
      programCount,
      trainerCount,
      subscriptionCount,
      orderCount,
      recentUsers,
      recentSubscriptions,
    }
  } catch (error) {
    console.error('Admin dashboard failed:', error)
    return null
  }
}

export default async function AdminDashboardPage() {
  const data = await getDashboardData()

  if (!data) {
    return (
      <div className="p-8 max-w-5xl">
        <h1 className="font-bebas text-4xl text-white mb-3">Admin Panel</h1>
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-200">
          Dashboard data loaded failed. Check database connection and refresh.
        </div>
      </div>
    )
  }

  const cards = [
    { label: 'Users', value: data.userCount, icon: Users, href: '/admin/users' },
    { label: 'Programs', value: data.programCount, icon: Dumbbell, href: '/#programs' },
    { label: 'Trainers', value: data.trainerCount, icon: UserCheck, href: '/#trainers' },
    { label: 'Subscriptions', value: data.subscriptionCount, icon: ShieldCheck, href: null },
    { label: 'Orders', value: data.orderCount, icon: ShoppingCart, href: null },
  ]

  return (
    <div className="p-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="font-bebas text-5xl text-white leading-none">Admin Panel</h1>
          <p className="text-white/50 text-sm mt-2">Operations overview and quick controls</p>
        </div>
        <Link
          href="/"
          className="rounded-xl border border-white/10 bg-[#111111] px-4 py-2 text-sm text-white/70 hover:text-white hover:border-[#D4FF00]/40 transition-colors"
        >
          Back To Site
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
        {cards.map((card) => {
          const block = (
            <div className="rounded-2xl border border-white/10 bg-[#111111] p-5 h-full">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/55 text-sm">{card.label}</span>
                <card.icon className="w-4 h-4 text-[#D4FF00]" />
              </div>
              <div className="font-bebas text-5xl leading-none text-white">{card.value.toLocaleString()}</div>
            </div>
          )

          if (!card.href) {
            return <div key={card.label}>{block}</div>
          }

          return (
            <Link key={card.label} href={card.href} className="group block hover:translate-y-[-2px] transition-transform">
              <div className="relative">
                {block}
                <ArrowUpRight className="w-4 h-4 text-white/20 absolute right-4 bottom-4 group-hover:text-[#D4FF00] transition-colors" />
              </div>
            </Link>
          )
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <section className="rounded-2xl border border-white/10 bg-[#111111] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-white font-semibold">Recent Users</h2>
            <Link href="/admin/users" className="text-xs text-[#D4FF00] hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {data.recentUsers.map((user) => (
              <div key={user.id} className="rounded-xl bg-white/[0.03] px-4 py-3">
                <p className="text-sm text-white">{user.email || 'No email'}</p>
                <p className="text-xs text-white/45 mt-1">
                  {user.name || 'Unnamed'} - {new Date(user.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
            {data.recentUsers.length === 0 && <p className="text-white/40 text-sm">No users yet.</p>}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#111111] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-white font-semibold">Recent Subscriptions</h2>
            <Activity className="w-4 h-4 text-[#D4FF00]" />
          </div>
          <div className="space-y-3">
            {data.recentSubscriptions.map((item) => (
              <div key={item.id} className="rounded-xl bg-white/[0.03] px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-white">{item.user.email || 'Unknown user'}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] ${
                      item.status.toLowerCase() === 'active' ? 'bg-[#D4FF00]/20 text-[#D4FF00]' : 'bg-white/10 text-white/55'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-white/45 mt-1">
                  {item.plan.toUpperCase()} - {new Date(item.startDate).toLocaleDateString()}
                </p>
              </div>
            ))}
            {data.recentSubscriptions.length === 0 && <p className="text-white/40 text-sm">No subscriptions yet.</p>}
          </div>
        </section>
      </div>
    </div>
  )
}

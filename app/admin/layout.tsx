import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { LayoutDashboard, Users, Home } from 'lucide-react'
import { authOptions } from '@/lib/auth'
import { isAdminSession } from '@/lib/admin'
import { LanguageProvider } from '@/lib/i18n'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/auth/signin?callbackUrl=/admin')
  }
  if (!isAdminSession(session)) {
    redirect('/')
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0B0B0B] text-white flex">
        <aside className="w-56 shrink-0 border-r border-white/10 bg-[#111111] flex flex-col">
          <div className="p-5 border-b border-white/10">
            <p className="font-bebas text-xl tracking-wide text-[#D4FF00]">ADMIN</p>
            <p className="text-white/50 text-xs truncate mt-1">{session.user?.email}</p>
          </div>
          <nav className="p-3 flex flex-col gap-1 flex-1">
            <Link
              href="/admin"
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-[#D4FF00]" />
              Хяналтын самбар
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors"
            >
              <Users className="w-4 h-4 text-[#D4FF00]" />
              Хэрэглэгчид
            </Link>
          </nav>
          <div className="p-3 border-t border-white/10">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Home className="w-4 h-4" />
              Сайт руу буцах
            </Link>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </LanguageProvider>
  )
}

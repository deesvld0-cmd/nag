import type { Session } from 'next-auth'

export function getAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS || ''
  return raw
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
}

export function isAdminSession(session: Session | null): boolean {
  if (!session?.user?.email) return false
  const email = session.user.email.toLowerCase()
  if (getAdminEmails().includes(email)) return true
  return session.user.role === 'admin'
}

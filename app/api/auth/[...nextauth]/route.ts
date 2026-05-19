import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

function deriveOrigin(req: Request): string | null {
  const protoHeader = req.headers.get('x-forwarded-proto') || 'http'
  const proto = protoHeader.split(',')[0]?.trim() || 'http'
  const hostHeader = req.headers.get('x-forwarded-host') || req.headers.get('host')
  const host = hostHeader?.split(',')[0]?.trim()
  if (!host) return null
  return `${proto}://${host}`.replace(/\/$/, '')
}

async function handler(req: Request) {
  // Fixes common NextAuth + Google OAuth issues where NEXTAUTH_URL doesn't match the actual origin,
  // leading to `redirect_uri_mismatch`.
  const derived = deriveOrigin(req)
  if (derived) {
    process.env.NEXTAUTH_URL = derived
  } else if (process.env.NEXTAUTH_URL) {
    process.env.NEXTAUTH_URL = process.env.NEXTAUTH_URL.trim().replace(/\/$/, '')
  }

  // Create the handler after normalizing env so NextAuth builds the correct callback URL.
  const nextAuthHandler = NextAuth(authOptions)
  return nextAuthHandler(req)
}

export { handler as GET, handler as POST }

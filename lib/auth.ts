import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '@/lib/prisma'
import { getAdminEmails } from '@/lib/admin'

const googleClientId = process.env.GOOGLE_CLIENT_ID?.trim()
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim()

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: 'Demo',
      credentials: {
        email: { label: 'Email', type: 'email' },
        name: { label: 'Name', type: 'text' },
      },
      async authorize(credentials) {
        const email = credentials?.email || 'demo@nanzad.local'
        return {
          id: email,
          email,
          name: credentials?.name || 'Demo User',
          role: 'user',
        } as any
      },
    }),
    ...(googleClientId && googleClientSecret
      ? [
          GoogleProvider({
            clientId: googleClientId,
            clientSecret: googleClientSecret,
            authorization: {
              params: {
                prompt: 'select_account',
              },
            },
          }),
        ]
      : []),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      const email = (user?.email ?? token.email) as string | undefined
      if (email) {
        token.email = email
        let dbUser: { role: string } | null = null
        try {
          dbUser = await prisma.user.findUnique({
            where: { email },
            select: { role: true },
          })
        } catch (error) {
          console.error('Failed to load user role, falling back to user role:', error)
        }
        const listed = getAdminEmails().includes(email.toLowerCase())
        const isAdmin = listed || dbUser?.role === 'admin'
        token.role = isAdmin ? 'admin' : ((dbUser?.role as 'user' | 'admin') || 'user')
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
        session.user.role = (token.role as 'user' | 'admin') || 'user'
      }
      return session
    },
    async signIn({ user, account, profile }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`
      if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
}

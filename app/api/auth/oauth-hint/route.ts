import { NextResponse } from 'next/server'

/** Dev-only: helps fix Google `redirect_uri_mismatch` (must match NEXTAUTH_URL + Google Console). */
export async function GET(req: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const raw = (process.env.NEXTAUTH_URL || '').trim().replace(/\/$/, '')
  const redirectUriForGoogle = raw ? `${raw}/api/auth/callback/google` : null

  return NextResponse.json({
    nextAuthUrl: raw || null,
    redirectUriForGoogle,
    originHeader: req.headers.get('origin') || null,
  })
}

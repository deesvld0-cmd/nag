'use client'

import { useEffect, useState } from 'react'

type Row = { id: string; email: string | null; name: string | null; createdAt: string }

export default function AdminUsersPage() {
  const [rows, setRows] = useState<Row[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/users')
        const data = await res.json()
        if (!res.ok) {
          if (!cancelled) setError(data.error || 'Алдаа гарлаа')
          return
        }
        if (!cancelled) setRows(data)
      } catch {
        if (!cancelled) setError('Сүлжээний алдаа')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="p-8 max-w-6xl">
      <h1 className="font-bebas text-4xl text-white mb-2">Хэрэглэгчид</h1>
      <p className="text-white/50 text-sm mb-6">Бүртгэлтэй хэрэглэгчдийн жагсаалт</p>

      {loading && <p className="text-white/50">Уншиж байна…</p>}
      {error && <p className="text-red-400">{error}</p>}

      {!loading && !error && (
        <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#111111]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-white/50">
                <th className="p-4 font-medium">И-мэйл</th>
                <th className="p-4 font-medium">Нэр</th>
                <th className="p-4 font-medium">Бүртгүүлсэн</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                  <td className="p-4 text-white">{r.email}</td>
                  <td className="p-4 text-white/80">{r.name || '—'}</td>
                  <td className="p-4 text-white/60">{new Date(r.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && <p className="p-8 text-center text-white/40">Хэрэглэгч алга</p>}
        </div>
      )}
    </div>
  )
}

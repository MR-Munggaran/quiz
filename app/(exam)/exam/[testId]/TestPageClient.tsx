'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ClipboardList, RotateCcw, Eye, ChevronDown, ChevronUp } from 'lucide-react'

type CompletedAttempt = {
  id: string
  status: string
  created_at: string
  completed_at: string | null
}

type Props = {
  testId: string
  testTitle: string
  testDescription?: string
  completedAttempts: CompletedAttempt[]
}

export default function TestPageClient({
  testId,
  testTitle,
  testDescription,
  completedAttempts,
}: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  const hasHistory = completedAttempts.length > 0
  const latestAttempt = completedAttempts[0] ?? null

  const handleStart = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/exam/start', {
        method: 'POST',
        body: JSON.stringify({ testId }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error ?? 'Gagal memulai ujian.')
      }

      const data = await res.json()
      router.push(`/exam/attempt/${data.attemptId}`)
    } catch (error: any) {
      alert(error.message)
      setLoading(false)
    }
  }

  const handleViewResult = (attemptId: string) => {
    router.push(`/exam/result/${attemptId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-4">

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClipboardList className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{testTitle}</h1>
            {testDescription && (
              <p className="text-gray-500 mt-2 text-sm">{testDescription}</p>
            )}
          </div>

          {/* Info box */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Sistem Penilaian</span>
              <span className="font-medium">Otomatis</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Percobaan Sebelumnya</span>
              <span className={`font-medium ${hasHistory ? 'text-emerald-600' : 'text-gray-400'}`}>
                {hasHistory ? `${completedAttempts.length}x selesai` : 'Belum pernah'}
              </span>
            </div>
          </div>

          {/* Returning user — show result & retake options */}
          {hasHistory ? (
            <div className="space-y-3">
              {/* View latest result — primary */}
              <button
                onClick={() => handleViewResult(latestAttempt.id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors flex justify-center items-center gap-2"
              >
                <Eye className="w-5 h-5" />
                Lihat Hasil Terakhir
              </button>

              {/* Retake — secondary */}
              <button
                onClick={handleStart}
                disabled={loading}
                className="w-full bg-white hover:bg-gray-50 disabled:opacity-50 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors border border-gray-200 flex justify-center items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                {loading ? 'Menyiapkan Soal...' : 'Ulangi Ujian'}
              </button>
            </div>
          ) : (
            /* First-time user */
            <div className="space-y-3">
              <p className="text-center text-sm text-gray-500">
                Pastikan koneksi internet Anda stabil. Waktu akan terus berjalan setelah ujian dimulai.
              </p>
              <button
                onClick={handleStart}
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold py-3 px-4 rounded-xl transition-colors flex justify-center items-center gap-2"
              >
                {loading ? 'Menyiapkan Soal...' : 'Mulai Ujian Sekarang'}
              </button>
            </div>
          )}

          <button
            onClick={() => router.back()}
            className="w-full mt-3 bg-white text-gray-500 hover:bg-gray-50 font-medium py-2.5 px-4 rounded-xl transition-colors text-sm"
          >
            Kembali
          </button>
        </div>

        {/* History accordion — only shown if has multiple attempts */}
        {completedAttempts.length > 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full flex items-center justify-between px-6 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span>Riwayat Ujian ({completedAttempts.length} percobaan)</span>
              {showHistory ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>

            {showHistory && (
              <div className="divide-y divide-gray-100">
                {completedAttempts.map((attempt, i) => (
                  <div
                    key={attempt.id}
                    className="flex items-center justify-between px-6 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Percobaan ke-{completedAttempts.length - i}
                      </p>
                      <p className="text-xs text-gray-400">
                        {attempt.completed_at
                          ? new Date(attempt.completed_at).toLocaleString('id-ID', {
                              dateStyle: 'medium',
                              timeStyle: 'short',
                            })
                          : '-'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleViewResult(attempt.id)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Lihat Hasil
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
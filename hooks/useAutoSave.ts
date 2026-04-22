import { useEffect, useRef } from 'react'
import { useExamStore } from '@/store/exam-store'

/**
 * useAutoSave - debounce 1.5 detik setelah jawaban berubah,
 * lalu kirim ke /api/exam/answer. Jika fetch gagal (offline),
 * dicoba ulang setiap 5 detik hingga berhasil.
 */
export function useAutoSave(subtestAttemptId: string) {
  const answers = useExamStore((s) => s.getAnswersForSubtest(subtestAttemptId))
  const retryRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const save = async (payload: Record<string, string>) => {
    try {
      const res = await fetch('/api/exam/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attemptId: subtestAttemptId, answers: payload }),
      })
      if (res.ok && retryRef.current) {
        clearInterval(retryRef.current)
        retryRef.current = null
      }
    } catch {
      // Offline: retry interval akan mengurus pengiriman ulang
    }
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      save(answers)

      // Setup retry jika belum ada
      if (!retryRef.current) {
        retryRef.current = setInterval(() => {
          save(answers)
        }, 5000)
      }
    }, 1500)

    return () => clearTimeout(debounce)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, subtestAttemptId])

  useEffect(() => {
    return () => {
      if (retryRef.current) clearInterval(retryRef.current)
    }
  }, [])
}

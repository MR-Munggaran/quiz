import { useEffect, useRef } from 'react'
import { useExamStore } from '@/store/exam-store'

const EMPTY: Record<string, string> = {}

export function useAutoSave(subtestAttemptId: string) {
  const answers = useExamStore(
    (s) => s.answers[subtestAttemptId] ?? EMPTY
  )

  const retryRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const latestAnswersRef = useRef<Record<string, string>>({})

  // 🔥 simpan latest answers (anti stale closure)
  useEffect(() => {
    latestAnswersRef.current = answers
  }, [answers])

  const save = async () => {
    try {
      const res = await fetch('/api/exam/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attemptId: subtestAttemptId,
          answers: latestAnswersRef.current,
        }),
      })

      if (res.ok && retryRef.current) {
        clearInterval(retryRef.current)
        retryRef.current = null
      }
    } catch {
      // offline → retry jalan
    }
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      save()

      // setup retry (hanya sekali)
      if (!retryRef.current) {
        retryRef.current = setInterval(() => {
          save()
        }, 5000)
      }
    }, 1500)

    return () => clearTimeout(debounce)
  }, [answers, subtestAttemptId])

  useEffect(() => {
    return () => {
      if (retryRef.current) clearInterval(retryRef.current)
    }
  }, [])
}
'use client'

import { useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useExamStore, SubtestInfo } from '@/store/exam-store'
import { useTimer } from '@/hooks/useTimer'
import { useAutoSave } from '@/hooks/useAutoSave'
import QuestionCard from '@/components/exam/QuestionCard'
import NavigationPanel from '@/components/exam/NavigationPanel'
import Timer from '@/components/exam/Timer'

type RawSubtestAttempt = {
  id: string
  expires_at: string
  subtest: {
    id: string
    title: string
    duration_minutes: number
    questions: Array<{
      id: string
      content: string
      question_options: Array<{ id: string; content: string }>
    }>
  }
}

type Props = {
  data: RawSubtestAttempt[]
  testAttemptId: string
}

export default function ExamClient({ data, testAttemptId }: Props) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const setSubtests = useExamStore((s) => s.setSubtests)
  const goToSubtest = useExamStore((s) => s.goToSubtest)
  const getCurrentSubtest = useExamStore((s) => s.getCurrentSubtest)
  const setOnTimeUp = useExamStore((s) => s.setOnTimeUp)
  const currentSubtestIndex = useExamStore((s) => s.currentSubtestIndex)
  const currentIndex = useExamStore((s) => s.currentQuestionIndex)
  const setCurrentQuestion = useExamStore((s) => s.setCurrentQuestion)
  const setTime = useExamStore((s) => s.setTime)

  // Inisialisasi subtests dari data server
  useEffect(() => {
    const subtests: SubtestInfo[] = data.map((sa) => ({
      subtestAttemptId: sa.id,
      subtestId: sa.subtest.id,
      title: sa.subtest.title,
      durationSeconds: Math.max(
        0,
        Math.floor((new Date(sa.expires_at).getTime() - Date.now()) / 1000)
      ),
      questions: sa.subtest.questions,
    }))

    setSubtests(subtests)

    // Set timer untuk subtest pertama
    if (subtests.length > 0) {
      setTime(subtests[0].durationSeconds)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Fungsi submit subtest saat ini
  const submitCurrentSubtest = useCallback(async () => {
    if (isSubmitting) return
    const current = getCurrentSubtest()
    if (!current) return

    setIsSubmitting(true)
    try {
      await fetch('/api/exam/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subtestAttemptId: current.subtestAttemptId }),
      })

      const nextIndex = currentSubtestIndex + 1
      if (nextIndex < data.length) {
        // Ada subtest berikutnya → pindah
        goToSubtest(nextIndex)
        setIsSubmitting(false)
      } else {
        // Semua subtest selesai → ke halaman hasil
        router.push(`/exam/result/${testAttemptId}`)
      }
    } catch {
      setIsSubmitting(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSubtestIndex, data.length, isSubmitting])

  // Daftarkan callback onTimeUp ke store
  useEffect(() => {
    setOnTimeUp(submitCurrentSubtest)
  }, [submitCurrentSubtest, setOnTimeUp])

  useTimer()

  const currentSubtest = getCurrentSubtest()
  const subtestAttemptId = currentSubtest?.subtestAttemptId ?? ''
  const questions = currentSubtest?.questions ?? []
  const currentQuestion = questions[currentIndex]

  useAutoSave(subtestAttemptId)

  if (!currentSubtest) {
    return <div className="p-6">Memuat soal...</div>
  }

  return (
    <div className="flex gap-6 p-6 min-h-screen bg-gray-50">
      {/* Sidebar subtest */}
      <aside className="w-40 shrink-0">
        <div className="font-semibold text-sm mb-2 text-gray-500">Subtest</div>
        {data.map((sa, i) => (
          <div
            key={sa.id}
            className={`p-2 text-sm rounded mb-1 text-center border ${
              i === currentSubtestIndex
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-200'
            }`}
          >
            {sa.subtest.title}
          </div>
        ))}
      </aside>

      {/* Area soal */}
      <main className="flex-1 max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-bold text-lg">{currentSubtest.title}</h1>
          <Timer />
        </div>

        {/* Soal */}
        {currentQuestion ? (
          <QuestionCard
            question={currentQuestion}
            subtestAttemptId={subtestAttemptId}
          />
        ) : (
          <p>Soal tidak ditemukan.</p>
        )}

        {/* Navigasi Prev/Next */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded border bg-white disabled:opacity-40"
          >
            ← Sebelumnya
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestion(currentIndex + 1)}
              className="px-4 py-2 rounded border bg-white"
            >
              Berikutnya →
            </button>
          ) : (
            <button
              onClick={submitCurrentSubtest}
              disabled={isSubmitting}
              className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-50"
            >
              {isSubmitting
                ? 'Menyimpan...'
                : currentSubtestIndex < data.length - 1
                ? 'Subtest Berikutnya →'
                : 'Selesai & Lihat Hasil'}
            </button>
          )}
        </div>
      </main>

      {/* Panel nomor soal */}
      <NavigationPanel
        questions={questions}
        subtestAttemptId={subtestAttemptId}
      />
    </div>
  )
}

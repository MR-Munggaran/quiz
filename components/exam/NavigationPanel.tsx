'use client'

import { useExamStore } from '@/store/exam-store'

type Question = { id: string }

const EMPTY: Record<string, string> = {}

export default function NavigationPanel({
  questions,
  subtestAttemptId,
}: {
  questions: Question[]
  subtestAttemptId: string
}) {
  const setCurrent = useExamStore((s) => s.setCurrentQuestion)
  const currentIndex = useExamStore((s) => s.currentQuestionIndex)

  // ✅ direct state access
  const answers = useExamStore(
    (s) => s.answers[subtestAttemptId] ?? EMPTY
  )

  return (
    <aside className="w-44 shrink-0">
      <div className="font-semibold text-sm mb-2 text-gray-500">
        Nomor Soal
      </div>

      <div className="grid grid-cols-5 gap-1">
        {questions.map((q, i) => {
          const answered = !!answers[q.id]
          const isCurrent = i === currentIndex

          return (
            <button
              key={q.id}
              onClick={() => setCurrent(i)}
              className={`h-8 w-8 text-xs rounded font-medium border transition-colors ${
                isCurrent
                  ? 'bg-blue-600 text-white border-blue-600'
                  : answered
                  ? 'bg-green-100 text-green-800 border-green-300'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {i + 1}
            </button>
          )
        })}
      </div>

      <div className="mt-4 text-xs text-gray-500 space-y-1">
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 rounded bg-green-100 border border-green-300" />
          Dijawab
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 rounded bg-white border border-gray-200" />
          Belum
        </div>
      </div>
    </aside>
  )
}
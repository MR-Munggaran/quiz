'use client'

import { useExamStore } from '@/store/exam-store'

type Option = { id: string; content: string }
type Question = { id: string; content: string; question_options: Option[] }

const EMPTY: Record<string, string> = {}

export default function QuestionCard({
  question,
  subtestAttemptId,
}: {
  question: Question
  subtestAttemptId: string
}) {
  const setAnswer = useExamStore((s) => s.setAnswer)

  // ✅ direct state access (NO FUNCTION)
  const answers = useExamStore(
    (s) => s.answers[subtestAttemptId] ?? EMPTY
  )

  const selectedOptionId = answers[question.id]

  return (
    <div className="bg-white rounded-xl border p-6 shadow-sm">
      <p className="text-base leading-relaxed">{question.content}</p>

      <div className="mt-4 space-y-2">
        {question.question_options.map((opt) => {
          const isSelected = selectedOptionId === opt.id

          return (
            <button
              key={opt.id}
              onClick={() => setAnswer(subtestAttemptId, question.id, opt.id)}
              className={`flex w-full text-left border rounded-lg p-3 transition-colors ${
                isSelected
                  ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              {opt.content}
            </button>
          )
        })}
      </div>
    </div>
  )
}
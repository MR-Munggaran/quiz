import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function ResultPage({ params }: { params: { attemptId: string } }) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Ambil test_attempt dan pastikan milik user ini
  const { data: testAttempt } = await supabase
    .from('test_attempts')
    .select('id, status, test_id, tests(title)')
    .eq('id', params.attemptId)
    .eq('user_id', user.id)
    .single()

  if (!testAttempt) redirect('/dashboard')

  // Jika masih ongoing, arahkan kembali ke halaman ujian
  if (testAttempt.status === 'ongoing') {
    redirect(`/exam/attempt/${params.attemptId}`)
  }

  // Ambil semua subtest_attempts dengan skor
  const { data: subtestAttempts } = await supabase
    .from('subtest_attempts')
    .select(`
      id,
      score,
      subtest:subtests ( id, title, order_index )
    `)
    .eq('test_attempt_id', params.attemptId)
    .order('subtest(order_index)')

  // Ambil semua jawaban user beserta info soal & pembahasan
  const subtestAttemptIds = subtestAttempts?.map((sa) => sa.id) ?? []

  const { data: userAnswers } = await supabase
    .from('user_answers')
    .select(`
      subtest_attempt_id,
      question_id,
      selected_option_id,
      question:questions (
        id,
        content,
        explanation,
        order_index,
        question_options ( id, content, is_correct )
      )
    `)
    .in('subtest_attempt_id', subtestAttemptIds)

  // Kelompokkan jawaban per subtest_attempt
  const answersBySubtest: Record<string, typeof userAnswers> = {}
  for (const id of subtestAttemptIds) {
    answersBySubtest[id] = userAnswers?.filter((a) => a.subtest_attempt_id === id) ?? []
  }

  // Hitung total skor rata-rata
  const scores = subtestAttempts?.map((sa) => sa.score ?? 0) ?? []
  const avgScore =
    scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">
          Hasil Ujian: {(testAttempt as any).tests?.title ?? 'Ujian'}
        </h1>
        <p className="text-gray-500 mt-1">Berikut rincian jawaban dan pembahasan</p>
      </div>

      {/* Ringkasan Skor */}
      <div className="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-3">
        <ScoreCard label="Skor Rata-rata" value={`${avgScore}`} accent="blue" />
        {subtestAttempts?.map((sa) => (
          <ScoreCard
            key={sa.id}
            label={(sa.subtest as any)?.title ?? 'Subtest'}
            value={`${sa.score ?? 0}`}
            accent="gray"
          />
        ))}
      </div>

      {/* Rincian per Subtest */}
      {subtestAttempts?.map((sa) => {
        const answers = answersBySubtest[sa.id] ?? []
        const correct = answers.filter((a) => {
          const correctOpt = (a.question as any)?.question_options?.find(
            (o: any) => o.is_correct
          )
          return correctOpt?.id === a.selected_option_id
        }).length

        return (
          <section key={sa.id} className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{(sa.subtest as any)?.title}</h2>
              <span className="text-sm text-gray-500">
                {correct}/{answers.length} benar · Skor {sa.score ?? 0}
              </span>
            </div>

            <div className="space-y-6">
              {answers
                .sort(
                  (a, b) =>
                    ((a.question as any)?.order_index ?? 0) -
                    ((b.question as any)?.order_index ?? 0)
                )
                .map((ans, idx) => {
                  const question = ans.question as any
                  const options = question?.question_options ?? []
                  const correctOpt = options.find((o: any) => o.is_correct)
                  const isCorrect = correctOpt?.id === ans.selected_option_id

                  return (
                    <div
                      key={ans.question_id}
                      className={`rounded-xl border p-5 ${
                        isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 shrink-0 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white ${
                            isCorrect ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        >
                          {isCorrect ? '✓' : '✗'}
                        </span>
                        <div className="flex-1">
                          <p className="font-medium text-sm mb-3">
                            {idx + 1}. {question?.content}
                          </p>

                          <div className="space-y-1">
                            {options.map((opt: any) => {
                              const isSelected = opt.id === ans.selected_option_id
                              const isCorrectOpt = opt.is_correct
                              return (
                                <div
                                  key={opt.id}
                                  className={`text-sm rounded px-3 py-1.5 ${
                                    isCorrectOpt
                                      ? 'bg-green-200 text-green-900 font-medium'
                                      : isSelected
                                      ? 'bg-red-200 text-red-900 line-through'
                                      : 'bg-white/60 text-gray-600'
                                  }`}
                                >
                                  {opt.content}
                                  {isCorrectOpt && (
                                    <span className="ml-1 text-xs">(jawaban benar)</span>
                                  )}
                                  {isSelected && !isCorrectOpt && (
                                    <span className="ml-1 text-xs">(pilihanmu)</span>
                                  )}
                                </div>
                              )
                            })}
                          </div>

                          {question?.explanation && (
                            <div className="mt-3 text-sm text-gray-700 bg-white/70 rounded p-3 border border-gray-200">
                              <span className="font-semibold">Pembahasan: </span>
                              {question.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </section>
        )
      })}

      <div className="text-center mt-10">
        <Link
          href="/dashboard"
          className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  )
}

function ScoreCard({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent: 'blue' | 'gray'
}) {
  return (
    <div
      className={`rounded-xl border p-4 text-center ${
        accent === 'blue'
          ? 'bg-blue-600 text-white border-blue-600'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="text-3xl font-bold">{value}</div>
      <div className={`text-sm mt-1 ${accent === 'blue' ? 'text-blue-100' : 'text-gray-500'}`}>
        {label}
      </div>
    </div>
  )
}

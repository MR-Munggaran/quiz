'use server'

import { createClient } from '@/lib/supabase/server'

/**
 * gradeSubtest - menghitung skor satu subtest_attempt dan menyimpannya.
 * Dipanggil oleh:
 *  - API route /api/exam/submit (manual submit / auto-submit dari timer)
 *  - Halaman hasil (via Server Action langsung)
 */
export async function gradeSubtest(subtestAttemptId: string) {
  const supabase = await createClient()

  // 1. Ambil semua jawaban user untuk subtest ini
  const { data: userAnswers, error: ansErr } = await supabase
    .from('user_answers')
    .select('question_id, selected_option_id')
    .eq('subtest_attempt_id', subtestAttemptId)

  if (ansErr) throw ansErr

  if (!userAnswers || userAnswers.length === 0) {
    // Tidak ada jawaban → langsung tandai selesai dengan skor 0
    await supabase
      .from('subtest_attempts')
      .update({ status: 'completed', score: 0, completed_at: new Date() })
      .eq('id', subtestAttemptId)
    return { score: 0, correct: 0, total: 0 }
  }

  const questionIds = userAnswers.map((a) => a.question_id)

  // 2. Ambil kunci jawaban (option yang is_correct = true) untuk soal-soal ini
  const { data: correctOptions, error: optErr } = await supabase
    .from('question_options')
    .select('question_id, id')
    .in('question_id', questionIds)
    .eq('is_correct', true)

  if (optErr) throw optErr

  // Buat map: questionId → correctOptionId
  const answerKey: Record<string, string> = {}
  correctOptions?.forEach((opt) => {
    answerKey[opt.question_id] = opt.id
  })

  // 3. Hitung skor
  let correct = 0
  for (const ans of userAnswers) {
    if (answerKey[ans.question_id] === ans.selected_option_id) {
      correct++
    }
  }

  const total = questionIds.length
  // Skor dalam skala 0–100
  const score = total > 0 ? Math.round((correct / total) * 100) : 0

  // 4. Simpan hasil ke subtest_attempts
  const { error: updateErr } = await supabase
    .from('subtest_attempts')
    .update({
      status: 'completed',
      score,
      completed_at: new Date(),
    })
    .eq('id', subtestAttemptId)

  if (updateErr) throw updateErr

  // 5. Cek apakah semua subtest dalam test_attempt sudah selesai
  const { data: attempt } = await supabase
    .from('subtest_attempts')
    .select('test_attempt_id, status')
    .eq('id', subtestAttemptId)
    .single()

  if (attempt) {
    const { data: allSubtests } = await supabase
      .from('subtest_attempts')
      .select('status')
      .eq('test_attempt_id', attempt.test_attempt_id)

    const allDone = allSubtests?.every((s) => s.status === 'completed')
    if (allDone) {
      await supabase
        .from('test_attempts')
        .update({ status: 'completed', completed_at: new Date() })
        .eq('id', attempt.test_attempt_id)
    }
  }

  return { score, correct, total }
}

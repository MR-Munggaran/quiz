'use server'

import { createClient } from '@/lib/supabase/server'

/**
 * gradeSubtest - menghitung skor satu subtest_attempt dan menyimpannya.
 * Dipanggil oleh:
 * - API route /api/exam/submit (manual submit / auto-submit dari timer)
 * - Halaman hasil (via Server Action langsung)
 */
export async function gradeSubtest(subtestAttemptId: string) {
  const supabase = await createClient()

  // 1. Ambil info subtest untuk tahu total soal yang seharusnya ada
  const { data: subtestAttempt, error: saErr } = await supabase
    .from('subtest_attempts')
    .select('subtest_id, test_attempt_id')
    .eq('id', subtestAttemptId)
    .single()

  if (saErr || !subtestAttempt) throw new Error('Subtest attempt not found')

  const { count: totalQuestions, error: qErr } = await supabase
    .from('questions')
    .select('*', { count: 'exact', head: true })
    .eq('subtest_id', subtestAttempt.subtest_id)

  if (qErr) throw qErr
  const total = totalQuestions ?? 0

  // 2. Ambil semua jawaban user untuk subtest ini
  const { data: userAnswers, error: ansErr } = await supabase
    .from('user_responses')
    .select('id, question_id, selected_option_id')
    .eq('subtest_attempt_id', subtestAttemptId)

  if (ansErr) throw ansErr

  if (!userAnswers || userAnswers.length === 0) {
    // Tidak ada jawaban → langsung tandai selesai dengan skor 0
    await supabase
      .from('subtest_attempts')
      .update({ status: 'completed', score: 0, completed_at: new Date().toISOString() })
      .eq('id', subtestAttemptId)
    return { score: 0, correct: 0, total }
  }

  const questionIds = userAnswers.map((a) => a.question_id)

  // 3. Ambil kunci jawaban (option yang is_correct = true) untuk soal-soal ini
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

  // 4. Hitung skor dan siapkan update untuk is_correct
  let correct = 0
  const updates = []

  for (const ans of userAnswers) {
    const isCorrect = answerKey[ans.question_id] === ans.selected_option_id
    if (isCorrect) {
      correct++
    }
    updates.push({
      id: ans.id,
      is_correct: isCorrect
    })
  }

  // Update status is_correct di user_responses secara batch
  if (updates.length > 0) {
    const { error: updateAnsErr } = await supabase
      .from('user_responses')
      .upsert(updates)
    if (updateAnsErr) console.error('Failed to update is_correct status:', updateAnsErr)
  }

  // Skor dalam skala 0–100 berdasarkan TOTAL soal di subtest, bukan yang dijawab saja
  const score = total > 0 ? Math.round((correct / total) * 100) : 0

  // 5. Simpan hasil ke subtest_attempts
  const { error: updateErr } = await supabase
    .from('subtest_attempts')
    .update({
      status: 'completed',
      score,
      completed_at: new Date().toISOString(),
    })
    .eq('id', subtestAttemptId)

  if (updateErr) throw updateErr

  // 6. Cek apakah semua subtest dalam test_attempt sudah selesai
  const { data: allSubtests } = await supabase
    .from('subtest_attempts')
    .select('status')
    .eq('test_attempt_id', subtestAttempt.test_attempt_id)

  const allDone = allSubtests?.every((s) => s.status === 'completed')
  if (allDone) {
    await supabase
      .from('test_attempts')
      .update({ status: 'completed', completed_at: new Date().toISOString() })
      .eq('id', subtestAttempt.test_attempt_id)
  }

  return { score, correct, total }
}

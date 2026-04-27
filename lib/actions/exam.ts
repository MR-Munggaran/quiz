'use server'

import { createClient } from '@/lib/supabase/server'

export async function startExam(testId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  // Cek attempt aktif (ongoing) — lanjutkan jika ada
  const { data: ongoingAttempt } = await supabase
    .from('test_attempts')
    .select('*')
    .eq('user_id', user.id)
    .eq('test_id', testId)
    .eq('status', 'ongoing')
    .maybeSingle()

  if (ongoingAttempt) {
    return { attemptId: ongoingAttempt.id, isNew: false }
  }

  // Buat test_attempt baru
  const { data: attempt, error: attemptError } = await supabase
    .from('test_attempts')
    .insert({
      user_id: user.id,
      test_id: testId,
      status: 'ongoing',
    })
    .select()
    .single()

  if (attemptError) throw attemptError

  // Ambil semua subtest
  const { data: subtests, error: subtestError } = await supabase
    .from('subtests')
    .select('*')
    .eq('test_id', testId)
    .order('order_index')

  if (subtestError) throw subtestError

  const now = new Date()
  const subtestAttempts = subtests.map((s) => ({
    test_attempt_id: attempt.id,
    subtest_id: s.id,
    status: 'ongoing',
    started_at: now,
    expires_at: new Date(now.getTime() + s.duration_minutes * 60000),
  }))

  const { error: insertError } = await supabase
    .from('subtest_attempts')
    .insert(subtestAttempts)

  if (insertError) throw insertError

  return { attemptId: attempt.id, isNew: true }
}

/**
 * Cek riwayat ujian user untuk test tertentu.
 * Mengembalikan attempt ongoing (jika ada) dan daftar attempt completed.
 */
export async function getExamHistory(testId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  const { data: attempts } = await supabase
    .from('test_attempts')
    .select('id, status, created_at, completed_at')
    .eq('user_id', user.id)
    .eq('test_id', testId)
    .order('created_at', { ascending: false })

  const ongoing = attempts?.find((a) => a.status === 'ongoing') ?? null
  const completed = attempts?.filter((a) => a.status === 'completed') ?? []

  return { ongoing, completed }
}
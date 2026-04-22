'use server'

import { createClient } from '@/lib/supabase/server'

export async function startExam(testId: string) {
  const supabase = await createClient()

  // 1. Ambil user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  // 2. Cek apakah sudah ada attempt aktif
  const { data: existing } = await supabase
    .from('test_attempts')
    .select('*')
    .eq('user_id', user.id)
    .eq('test_id', testId)
    .eq('status', 'ongoing')
    .maybeSingle()

  if (existing) {
    return { attemptId: existing.id }
  }

  // 3. Buat test_attempt
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

  // 4. Ambil semua subtest
  const { data: subtests, error: subtestError } = await supabase
    .from('subtests')
    .select('*')
    .eq('test_id', testId)
    .order('order_index')

  if (subtestError) throw subtestError

  // 5. Generate subtest_attempts
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

  return { attemptId: attempt.id }
}
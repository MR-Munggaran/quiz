import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const { attemptId, answers } = await req.json()
    // answers: Record<questionId, optionId>

    if (!attemptId || !answers) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verifikasi bahwa attemptId ini milik user
    const { data: subtestAttempt } = await supabase
      .from('subtest_attempts')
      .select('id, test_attempt_id, test_attempts!inner(user_id)')
      .eq('id', attemptId)
      .single()

    if (!subtestAttempt || (subtestAttempt as any).test_attempts?.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Upsert setiap jawaban ke tabel user_answers
    const upsertPayload = Object.entries(answers).map(([questionId, optionId]) => ({
      subtest_attempt_id: attemptId,
      question_id: questionId,
      selected_option_id: optionId as string,
    }))

    if (upsertPayload.length === 0) {
      return NextResponse.json({ saved: 0 })
    }

    const { error } = await supabase
      .from('user_answers')
      .upsert(upsertPayload, {
        onConflict: 'subtest_attempt_id,question_id',
      })

    if (error) throw error

    return NextResponse.json({ saved: upsertPayload.length })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

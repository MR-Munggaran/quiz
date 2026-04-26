import { NextResponse } from 'next/server'
import { gradeSubtest } from '@/lib/actions/grading'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const { subtestAttemptId } = await req.json()

    if (!subtestAttemptId) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await gradeSubtest(subtestAttemptId)

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

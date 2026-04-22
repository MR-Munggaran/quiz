import { NextResponse } from 'next/server'
import { gradeSubtest } from '@/lib/actions/grading'

export async function POST(req: Request) {
  try {
    const { subtestAttemptId } = await req.json()
    if (!subtestAttemptId) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    await gradeSubtest(subtestAttemptId)

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { startExam } from '@/lib/actions/exam'

export async function POST(req: Request) {
  try {
    const { testId } = await req.json()

    const result = await startExam(testId)

    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}
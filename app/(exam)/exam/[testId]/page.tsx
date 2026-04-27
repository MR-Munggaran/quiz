import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getExamHistory } from '@/lib/actions/exam'
import TestPageClient from './TestPageClient'

export default async function TestPage({
  params,
}: {
  params: Promise<{ testId: string }>
}) {
  const { testId } = await params

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Ambil info test
  const { data: test } = await supabase
    .from('tests')
    .select('id, title, description')
    .eq('id', testId)
    .single()

  if (!test) redirect('/dashboard')

  // Cek riwayat ujian user
  const { ongoing, completed } = await getExamHistory(testId)

  // Jika ada ujian ongoing → langsung redirect ke halaman ujian
  if (ongoing) {
    redirect(`/exam/attempt/${ongoing.id}`)
  }

  return (
    <TestPageClient
      testId={testId}
      testTitle={test.title}
      testDescription={test.description}
      completedAttempts={completed}
    />
  )
}
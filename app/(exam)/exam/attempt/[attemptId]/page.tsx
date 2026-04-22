import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ExamClient from './ExamClient'

export default async function Page({ params }: { params: { attemptId: string } }) {
  const supabase = await createClient()

  // Pastikan user sudah login
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Cek apakah ujian sudah selesai (redirect ke hasil)
  const { data: testAttempt } = await supabase
    .from('test_attempts')
    .select('id, status')
    .eq('id', params.attemptId)
    .single()

  if (testAttempt?.status === 'completed') {
    redirect(`/exam/result/${params.attemptId}`)
  }

  // Ambil semua subtest_attempts beserta soal-soalnya, urut by order_index
  const { data, error } = await supabase
    .from('subtest_attempts')
    .select(`
      id,
      expires_at,
      subtest:subtests (
        id,
        title,
        duration_minutes,
        order_index,
        questions (
          id,
          content,
          order_index,
          question_options (
            id,
            content
          )
        )
      )
    `)
    .eq('test_attempt_id', params.attemptId)
    .order('subtest(order_index)')

  if (error || !data) {
    return <div className="p-6">Gagal memuat data ujian.</div>
  }

  // Sort questions per subtest
  const sorted = data.map((sa: any) => ({
    ...sa,
    subtest: {
      ...sa.subtest,
      questions: [...(sa.subtest?.questions ?? [])].sort(
        (a: any, b: any) => (a.order_index ?? 0) - (b.order_index ?? 0)
      ),
    },
  }))

  return <ExamClient data={sorted} testAttemptId={params.attemptId} />
}

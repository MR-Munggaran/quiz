import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import SubtestQuestionsClient from './SubtestClient'

export default async function AdminSubtestPage({
  params,
}: {
  params: Promise<{ testId: string; subtestId: string }>
}) {
  const { testId, subtestId } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') redirect('/dashboard')

  const { data: subtest } = await supabase
    .from('subtests')
    .select('*')
    .eq('id', subtestId)
    .single()

  if (!subtest) redirect(`/admin/tests/${testId}`)

  const { data: test } = await supabase
    .from('tests')
    .select('title')
    .eq('id', testId)
    .single()

  const { data: questions } = await supabase
    .from('questions')
    .select(`*, question_options(*)`)
    .eq('subtest_id', subtestId)
    .order('order_index')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white px-6 py-4 flex items-center gap-3 shadow-md text-sm">
        <Link href="/admin" className="text-gray-400 hover:text-white">Admin</Link>
        <span className="text-gray-600">/</span>
        <Link href={`/admin/tests/${testId}`} className="text-gray-400 hover:text-white">{test?.title}</Link>
        <span className="text-gray-600">/</span>
        <span className="font-bold">{subtest.name}</span>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <SubtestQuestionsClient
          subtest={{ ...subtest, test_id: testId }}
          questions={questions || []}
          testId={testId}
        />
      </div>
    </div>
  )
}
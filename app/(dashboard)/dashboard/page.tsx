import { createClient } from '@/lib/supabase/server'
import { logout } from '@/lib/actions/auth'
import Link from 'next/link'

export default async function Dashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: tests } = await supabase
    .from('tests')
    .select('*')
    .eq('is_active', true)
    

  return (
    <div className="p-6">
      <pre>{JSON.stringify(tests, null, 2)}</pre>
      <h1>Hello {user?.email}</h1>

      <h2 className="mt-6 font-bold">Daftar Ujian</h2>

      <div className="mt-4 space-y-2">
        {tests?.map((test) => (
          <div key={test.id} className="border p-4">
            <h3>{test.title}</h3>

            <Link
              href={`/exam/${test.id}`}
              className="text-blue-500"
            >
              Lihat Ujian
            </Link>
          </div>
        ))}
      </div>

      <form action={logout}>
        <button className="mt-4 bg-black text-white px-4 py-2">
          Logout
        </button>
      </form>
    </div>
  )
}
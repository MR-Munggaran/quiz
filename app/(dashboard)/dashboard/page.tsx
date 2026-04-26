import { createClient } from '@/lib/supabase/server'
import { logout } from '@/lib/actions/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  // Jika admin, redirect ke panel admin
  if (profile?.role === 'admin') redirect('/admin')

  const { data: tests } = await supabase
    .from('tests')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  // Ambil riwayat attempt user
  const { data: attempts } = await supabase
    .from('test_attempts')
    .select('test_id, status, started_at, completed_at')
    .eq('user_id', user.id)
    .order('started_at', { ascending: false })

  const attemptMap = new Map(attempts?.map(a => [a.test_id, a]) ?? [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">U</div>
          <h1 className="text-xl font-bold text-gray-900">Portal Ujian</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            👤 {profile?.full_name || user.email}
          </span>
          <form action={logout}>
            <button className="text-sm bg-red-50 hover:bg-red-100 text-red-600 font-medium px-4 py-2 rounded-lg transition-colors">
              Logout
            </button>
          </form>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-5xl mx-auto p-6 mt-6 space-y-8">
        {/* Greeting */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Selamat datang, {profile?.full_name?.split(' ')[0] || 'Peserta'} 👋
          </h2>
          <p className="text-gray-500 mt-1">Pilih ujian di bawah ini untuk memulai.</p>
        </div>

        {/* Daftar Test */}
        {tests && tests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tests.map((test) => {
              const attempt = attemptMap.get(test.id)
              return (
                <div key={test.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900">{test.title}</h3>
                      {attempt && (
                        <span className={`shrink-0 ml-2 text-xs px-2 py-1 rounded-full font-semibold ${
                          attempt.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {attempt.status === 'completed' ? '✓ Selesai' : '⏳ Berlangsung'}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {test.description || 'Tidak ada deskripsi untuk ujian ini.'}
                    </p>
                    <div className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {test.global_duration_minutes ? `⏱ ${test.global_duration_minutes} menit` : '⏱ Waktu per sub-tes'}
                    </div>
                  </div>

                  <div className="mt-5 space-y-2">
                    <Link
                      href={`/exam/${test.id}`}
                      className="block w-full text-center bg-gray-900 hover:bg-gray-700 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
                    >
                      {attempt
                        ? attempt.status === 'completed' ? '📊 Lihat Hasil' : '▶ Lanjutkan Ujian'
                        : '🚀 Mulai Ujian'}
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <div className="text-4xl mb-4">📭</div>
            <h3 className="text-lg font-medium text-gray-900">Belum ada ujian aktif</h3>
            <p className="text-gray-500 mt-2 text-sm">Silakan tunggu Admin untuk mengaktifkan ujian.</p>
          </div>
        )}
      </main>
    </div>
  )
}
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createTest, deleteTest, toggleTestStatus } from '@/lib/actions/admin'
import { logout } from '@/lib/actions/auth'
import DeleteButton from '@/components/DeleteButton'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/dashboard')

  const { data: tests } = await supabase
    .from('tests')
    .select('*')
    .order('created_at', { ascending: false })

  const totalTests  = tests?.length ?? 0
  const activeTests = tests?.filter(t => t.is_active).length ?? 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-sm">A</div>
          <span className="text-lg font-bold">Admin Panel</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">👤 {profile?.full_name || user.email}</span>
          <form action={logout}>
            <button className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg transition-colors">
              Logout
            </button>
          </form>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 min-h-screen bg-white border-r border-gray-200 p-4">
          <nav className="space-y-1">
            <Link href="/admin" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium text-sm">
              📋 Manajemen Test
            </Link>
            <Link href="/admin/users" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 text-sm">
              👥 Manajemen User
            </Link>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Manajemen Ujian</h1>
            <p className="text-gray-500 text-sm mt-1">Kelola semua test, sub-test, dan soal ujian</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Test"    value={totalTests}               color="blue"   />
            <StatCard label="Test Aktif"    value={activeTests}              color="green"  />
            <StatCard label="Test Draft"    value={totalTests - activeTests} color="yellow" />
            <StatCard label="Total Peserta" value="—"                        color="purple" />
          </div>

          {/* Form Buat Test */}
          <section className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">➕ Buat Ujian Baru</h2>
            <form action={createTest} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul Ujian *</label>
                <input
                  name="title"
                  placeholder="Contoh: Tryout UTBK 2025 Paket A"
                  required
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea
                  name="description"
                  placeholder="Deskripsi singkat ujian..."
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Durasi Global (menit)</label>
                <input
                  name="global_duration_minutes"
                  type="number"
                  placeholder="Kosongkan jika per sub-tes"
                  min={1}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="flex items-end">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg text-sm transition-colors">
                  Buat Ujian
                </button>
              </div>
            </form>
          </section>

          {/* Tabel Tests */}
          <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Daftar Semua Ujian</h2>
              <span className="text-sm text-gray-500">{totalTests} ujian</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Judul Ujian</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Waktu</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {tests?.map((test) => (
                    <tr key={test.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">{test.title}</p>
                        <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{test.description || '—'}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {test.global_duration_minutes ? `${test.global_duration_minutes} menit` : 'Per sub-tes'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          test.is_active ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {test.is_active ? '✓ Aktif' : '○ Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/tests/${test.id}`}
                            className="text-blue-600 font-medium text-xs px-3 py-1.5 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            Kelola
                          </Link>
                          <form action={toggleTestStatus.bind(null, test.id, test.is_active)} className="inline">
                            <button
                              type="submit"
                              className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-colors ${
                                test.is_active
                                  ? 'text-yellow-700 border-yellow-200 hover:bg-yellow-50'
                                  : 'text-green-700 border-green-200 hover:bg-green-50'
                              }`}
                            >
                              {test.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                            </button>
                          </form>
                          <DeleteButton
                            action={deleteTest.bind(null, test.id)}
                            confirmMessage={`Hapus ujian "${test.title}"? Semua data sub-tes dan soal akan ikut terhapus.`}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                  {(!tests || tests.length === 0) && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                        Belum ada ujian. Buat ujian pertama di atas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: number | string; color: string }) {
  const colors: Record<string, string> = {
    blue:   'bg-blue-50 text-blue-700 border-blue-100',
    green:  'bg-green-50 text-green-700 border-green-100',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    purple: 'bg-purple-50 text-purple-700 border-purple-100',
  }
  return (
    <div className={`rounded-xl border p-4 ${colors[color]}`}>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs font-medium mt-1 opacity-80">{label}</p>
    </div>
  )
}
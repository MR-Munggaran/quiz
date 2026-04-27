import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  createSubtest, updateSubtest, deleteSubtest,
  updateTest, toggleTestStatus, updateSubtestDuration,
} from '@/lib/actions/admin'
import DeleteButton from '@/components/DeleteButton'

export default async function AdminTestDetail({
  params,
}: {
  params: Promise<{ testId: string }>
}) {
  const { testId } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') redirect('/dashboard')

  const { data: test } = await supabase.from('tests').select('*').eq('id', testId).single()
  if (!test) redirect('/admin')

  const { data: subtests } = await supabase
    .from('subtests')
    .select('*, questions(count)')
    .eq('test_id', testId)
    .order('order_index')

  
  console.log(subtests)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white px-6 py-4 flex items-center gap-4 shadow-md">
        <Link href="/admin" className="text-gray-400 hover:text-white transition-colors text-sm">← Admin</Link>
        <span className="text-gray-600">/</span>
        <h1 className="font-bold text-white truncate">{test.title}</h1>
        <span className={`ml-auto shrink-0 text-xs px-2.5 py-1 rounded-full font-semibold ${
          test.is_active ? 'bg-green-600' : 'bg-yellow-600'
        }`}>
          {test.is_active ? '● Aktif' : '○ Draft'}
        </span>
      </nav>

      <div className="max-w-5xl mx-auto p-6 space-y-6">

        {/* Edit Info Test */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-base font-bold text-gray-900 mb-4">✏️ Edit Info Ujian</h2>
          <form action={updateTest} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="hidden" name="id" value={test.id} />

            {/* Title Input */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Judul Ujian</label>
              <input
                name="title"
                defaultValue={test.title}
                required
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Duration Input */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Durasi Global (Opsional)</label>
              <input
                name="global_duration_minutes"
                type="number"
                defaultValue={test.global_duration_minutes ?? ''}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Description Input */}
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Deskripsi</label>
              <textarea
                name="description"
                defaultValue={test.description}
                rows={3}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex items-end gap-3 flex-wrap col-span-2">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </section>

        {/* Sub-Test */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">📚 Sub-Tes ({subtests?.length ?? 0})</h2>
          </div>

          {/* Form tambah subtest */}
          <form action={createSubtest} className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <input type="hidden" name="test_id" value={testId} />
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Nama Sub-Tes</label>
              <input
                name="name"
                placeholder="Contoh: Matematika"
                required
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Durasi (menit)</label>
              <input
                name="duration_minutes"
                type="number"
                defaultValue={30}
                min={1}
                required
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Urutan</label>
              <input
                name="order_index"
                type="number"
                defaultValue={subtests?.length ?? 0}
                min={0}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
              >
                + Tambah
              </button>
            </div>
          </form>

          {/* Daftar Subtest */}
          <div className="space-y-2">
            {subtests?.map((st, idx) =>  (
              <div key={st.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-100 text-blue-700 font-bold text-xs">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{st.title}</p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      ⏱ {st.duration_minutes} menit &nbsp;·&nbsp;
                      📝 {(st.questions as any)?.[0]?.count ?? 0} soal
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/tests/${testId}/subtests/${st.id}`}
                    className="text-xs px-3 py-1.5 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 font-medium"
                  >
                    Kelola Soal
                  </Link>
                  <DeleteButton
                    action={deleteSubtest.bind(null, st.id, testId)}
                    confirmMessage={`Hapus sub-tes "${st.name}" beserta semua soalnya?`}
                  />
                </div>
              </div>
            ))}
            {(!subtests || subtests.length === 0) && (
              <p className="text-center py-8 text-gray-400 text-sm">
                Belum ada sub-tes. Tambah di atas.
              </p>
            )}
          </div>
        </section>

        {/* Setting Waktu */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-base font-bold text-gray-900 mb-1">⏱ Setting Waktu Sub-Tes</h2>
          <p className="text-gray-500 text-xs mb-4">Ubah durasi per sub-tes secara individual.</p>
          <div className="space-y-3">
            {subtests?.map(st => (
              <form key={st.id} action={updateSubtestDuration} className="flex items-center gap-4">
                <input type="hidden" name="id"      value={st.id}     />
                <input type="hidden" name="test_id" value={testId}    />
                <span className="text-sm font-medium text-gray-800 w-40 truncate">{st.title}</span>
                <input
                  name="duration_minutes"
                  type="number"
                  defaultValue={st.duration_minutes}
                  min={1}
                  className="w-24 border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <span className="text-xs text-gray-500">menit</span>
                <button
                  type="submit"
                  className="text-xs bg-gray-900 text-white hover:bg-gray-700 px-3 py-1.5 rounded-lg font-medium transition-colors"
                >
                  Simpan
                </button>
              </form>
            ))}
            {(!subtests || subtests.length === 0) && (
              <p className="text-sm text-gray-400">Tambahkan sub-tes terlebih dahulu.</p>
            )}
          </div>
        </section>

      </div>
    </div>
  )
}
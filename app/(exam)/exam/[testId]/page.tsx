'use client'

import { useRouter } from 'next/navigation'
import { use, useState } from 'react'

export default function TestPage({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = use(params)

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleStart = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/exam/start', {
        method: 'POST',
        body: JSON.stringify({ testId }),
        headers: { 'Content-Type': 'application/json' }
      })

      if (!res.ok) throw new Error('Gagal memulai ujian. Pastikan soal sudah dikonfigurasi admin.')
      
      const data = await res.json()
      router.push(`/exam/attempt/${data.attemptId}`)
    } catch (error: any) {
      alert(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            📝
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Persiapan Ujian</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Pastikan koneksi internet Anda stabil sebelum memulai ujian. Waktu akan terus berjalan setelah tombol ditekan.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-8 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Sistem Penilaian</span>
            <span className="font-medium">Otomatis</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Status Upaya</span>
            <span className="font-medium text-blue-600">Percobaan Baru</span>
          </div>
        </div>

        <button
          onClick={handleStart}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-3 px-4 rounded-xl transition-colors flex justify-center items-center gap-2"
        >
          {loading ? 'Menyiapkan Soal...' : 'Mulai Ujian Sekarang'}
        </button>
        
        <button
          onClick={() => router.back()}
          className="w-full mt-3 bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 font-medium py-3 px-4 rounded-xl transition-colors"
        >
          Kembali
        </button>
      </div>
    </div>
  )
}
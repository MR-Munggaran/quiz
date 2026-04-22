'use client'

import { useRouter } from 'next/navigation'

export default function TestPage({ params }: { params: { testId: string } }) {
  const router = useRouter()

  const handleStart = async () => {
    const res = await fetch('/api/exam/start', {
      method: 'POST',
      body: JSON.stringify({ testId: params.testId }),
    })

    const data = await res.json()

    router.push(`/exam/attempt/${data.attemptId}`)
  }

  return (
    <div className="p-6">
      <h1>Detail Ujian</h1>

      <button
        onClick={handleStart}
        className="mt-4 bg-green-500 text-white px-4 py-2"
      >
        Mulai Ujian
      </button>
    </div>
  )
}
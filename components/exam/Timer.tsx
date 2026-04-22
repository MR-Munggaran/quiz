'use client'

import { useExamStore } from '@/store/exam-store'

export default function Timer() {
  const time = useExamStore((s) => s.timeLeft)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  return (
    <div className="text-xl font-bold">
      {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  )
}
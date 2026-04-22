import { useEffect, useRef } from 'react'
import { useExamStore } from '@/store/exam-store'

/**
 * useTimer - interval tunggal yang tidak restart setiap tick.
 * Dipanggil sekali di ExamClient; berjalan sepanjang sesi.
 */
export function useTimer() {
  const tick = useExamStore((s) => s.tick)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true

    const interval = setInterval(() => {
      tick()
    }, 1000)

    return () => {
      clearInterval(interval)
      started.current = false
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

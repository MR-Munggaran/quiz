'use client'

import { useTransition } from 'react'

interface DeleteButtonProps {
  action: () => Promise<void>
  confirmMessage?: string
  label?: string
  className?: string
}

export default function DeleteButton({
  action,
  confirmMessage = 'Yakin ingin menghapus?',
  label = 'Hapus',
  className = '',
}: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    if (!confirm(confirmMessage)) return
    startTransition(() => action())
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleClick}
      className={`text-xs px-3 py-1.5 rounded-lg font-medium border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50 transition-colors ${className}`}
    >
      {isPending ? 'Menghapus...' : label}
    </button>
  )
}
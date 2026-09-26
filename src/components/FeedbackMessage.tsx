import type { ReactNode } from 'react'

interface FeedbackMessageProps {
  variant: 'success' | 'error'
  children: ReactNode
}

export default function FeedbackMessage({ variant, children }: FeedbackMessageProps) {
  const isSuccess = variant === 'success'
  return (
    <div
      role={isSuccess ? 'status' : 'alert'}
      className={[
        'mt-5 flex items-center gap-2 rounded-xl px-4 py-3 text-lg font-bold',
        isSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700',
      ].join(' ')}
    >
      {children}
    </div>
  )
}

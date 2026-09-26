import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  onClick: () => void
  label?: string
}

export default function BackButton({ onClick, label = 'Voltar ao início' }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 font-bold text-sky-700 shadow transition hover:bg-sky-50 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
    >
      <ArrowLeft className="h-5 w-5" aria-hidden="true" />
      {label}
    </button>
  )
}

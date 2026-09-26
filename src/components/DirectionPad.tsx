import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, type LucideIcon } from 'lucide-react'
import type { Direction } from '../types'

interface DirectionPadProps {
  onMove: (direction: Direction) => void
  canMove: (direction: Direction) => boolean
}

const BUTTONS: { direction: Direction; icon: LucideIcon; label: string }[] = [
  { direction: 'up', icon: ArrowUp, label: 'Mover para cima' },
  { direction: 'down', icon: ArrowDown, label: 'Mover para baixo' },
  { direction: 'left', icon: ArrowLeft, label: 'Mover para a esquerda' },
  { direction: 'right', icon: ArrowRight, label: 'Mover para a direita' },
]

export default function DirectionPad({ onMove, canMove }: DirectionPadProps) {
  return (
    <div className="mt-5 flex flex-wrap justify-center gap-3" role="group" aria-label="Controles do robô">
      {BUTTONS.map(({ direction, icon: Icon, label }) => {
        const enabled = canMove(direction)
        return (
          <button
            key={direction}
            type="button"
            onClick={() => onMove(direction)}
            disabled={!enabled}
            aria-label={label}
            title={enabled ? label : `${label} (bloqueado na borda)`}
            className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-200 text-slate-800 shadow transition hover:bg-slate-300 active:scale-95 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none disabled:hover:bg-slate-100 disabled:active:scale-100"
          >
            <Icon className="h-7 w-7" aria-hidden="true" />
          </button>
        )
      })}
    </div>
  )
}

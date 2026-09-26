import { RotateCcw, Trophy } from 'lucide-react'
import { useEffect } from 'react'
import { useRobotGrid } from '../hooks/useRobotGrid'
import type { Direction } from '../types'
import DirectionPad from './DirectionPad'
import FeedbackMessage from './FeedbackMessage'
import MissionCard from './MissionCard'
import RobotGrid from './RobotGrid'

interface Mission3Props {
  onComplete: () => void
}

export default function Mission3RobotPath({ onComplete }: Mission3Props) {
  const { robotPos, goalPos, gridSize, move, reset, hasWon, canMove } = useRobotGrid(5)

  useEffect(() => {
    if (hasWon) onComplete()
  }, [hasWon, onComplete])

  // Suporte a teclado: setas direcionais movem o robô
  useEffect(() => {
    const keyToDirection: Record<string, Direction> = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right',
    }
    const handleKey = (event: KeyboardEvent) => {
      const direction = keyToDirection[event.key]
      if (!direction || !canMove(direction)) return;

      event.preventDefault()
      move(direction)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [move, canMove])

  return (
    <MissionCard title="Missão 3: Leve o robô até o destino">
      <p className="mb-4 text-lg text-slate-700">
        Use os botões ou as setas do teclado para levar o robô até a bandeira.
      </p>

      <RobotGrid gridSize={gridSize} robotPos={robotPos} goalPos={goalPos} />
      <DirectionPad onMove={move} canMove={canMove} />

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-200 px-5 py-2.5 font-bold text-slate-700 shadow transition hover:bg-slate-300 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
        >
          <RotateCcw className="h-5 w-5" aria-hidden="true" />
          Recomeçar
        </button>
      </div>

      {hasWon && (
        <FeedbackMessage variant="success">
          <Trophy className="h-6 w-6 shrink-0" aria-hidden="true" />
          Parabéns! Você completou todas as missões!
        </FeedbackMessage>
      )}
    </MissionCard>
  )
}

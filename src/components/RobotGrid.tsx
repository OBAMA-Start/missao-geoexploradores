import { Bot, Flag } from 'lucide-react'
import type { Position } from '../types'

interface RobotGridProps {
  gridSize: number
  robotPos: Position
  goalPos: Position
}

export default function RobotGrid({ gridSize, robotPos, goalPos }: RobotGridProps) {
  const cells = []
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const isRobot = robotPos.x === x && robotPos.y === y
      const isGoal = goalPos.x === x && goalPos.y === y
      cells.push(
        <div
          key={`${x}-${y}`}
          role="gridcell"
          aria-label={
            isRobot ? `Robô na linha ${y + 1}, coluna ${x + 1}` : isGoal ? 'Destino' : `Célula vazia ${y + 1},${x + 1}`
          }
          className={[
            'flex h-11 w-11 items-center justify-center rounded-md sm:h-12 sm:w-12',
            isRobot ? 'bg-red-500 text-white' : isGoal ? 'bg-green-600 text-white' : 'bg-slate-300',
          ].join(' ')}
        >
          {isRobot ? (
            <Bot className="h-6 w-6" aria-hidden="true" />
          ) : isGoal ? (
            <Flag className="h-6 w-6" aria-hidden="true" />
          ) : null}
        </div>,
      )
    }
  }

  return (
    <div
      role="grid"
      aria-label={`Grade ${gridSize} por ${gridSize}. Robô na linha ${robotPos.y + 1}, coluna ${robotPos.x + 1}.`}
      className="mx-auto grid w-fit gap-1.5"
      style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
    >
      {cells}
    </div>
  )
}

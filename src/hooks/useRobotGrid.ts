import { useCallback, useState } from 'react'
import type { Direction, Position } from '../types'

const START: Position = { x: 0, y: 0 }
const GOAL: Position = { x: 4, y: 4 }

// Single source of truth for what each direction means.
// `move` and `canMove` both derive from this table,
// so each direction is defined exactly once.
const DIRECTION_DELTAS: Record<Direction, Position> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}

function step(position: Position, direction: Direction): Position {
  const delta = DIRECTION_DELTAS[direction]
  return { x: position.x + delta.x, y: position.y + delta.y }
}

export function useRobotGrid(gridSize = 5) {
  const [robotPos, setRobotPos] = useState<Position>(START)

  const isInsideGrid = useCallback(
    (position: Position) =>
      position.x >= 0 && position.y >= 0 && position.x < gridSize && position.y < gridSize,
    [gridSize],
  )

  const move = useCallback(
    (direction: Direction) => {
      setRobotPos((prev) => {
        const next = step(prev, direction)
        return isInsideGrid(next) ? next : prev
      })
    },
    [isInsideGrid],
  )

  // Predicate, not a record: answering "can I go there?" per direction
  // avoids enumerating all four directions a second time.
  const canMove = useCallback(
    (direction: Direction) => isInsideGrid(step(robotPos, direction)),
    [isInsideGrid, robotPos],
  )

  const reset = useCallback(() => setRobotPos(START), [])

  const hasWon = robotPos.x === GOAL.x && robotPos.y === GOAL.y

  return { robotPos, goalPos: GOAL, gridSize, move, reset, hasWon, canMove }
}

import { useCallback, useEffect, useRef, useState } from 'react'
import Mission1RealWorldFigures from '../components/Mission1RealWorldFigures'
import Mission2CubeEdgesQuiz from '../components/Mission2CubeEdgesQuiz'
import Mission3RobotPath from '../components/Mission3RobotPath'
import MissionSection from '../components/MissionSection'
import { MISSIONS } from '../data/missions'
import { CONTENT_WRAPPER_CLASSES } from '../layout'
import type { MissionId } from '../types'


export function MainContentPage() {
  const [activeMission, setActiveMission] = useState<MissionId>(1)
  // Progression is strictly sequential, so a single number captures it:
  // 0 = nothing completed yet; otherwise the highest completed mission.
  // Mission N is done when N <= highestCompleted
  // and unlocked when N <= highestCompleted + 1.
  const [highestCompleted, setHighestCompleted] = useState(0)
  const selectorRefs = useRef(new Map<MissionId, HTMLButtonElement>())
  const isFirstRender = useRef(true)

  // Scroll the newly opened mission into view after its panel renders.
  // Skipped on first mount since Mission 1 is already visible.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    selectorRefs.current
      .get(activeMission)
      ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [activeMission])

  const markComplete = useCallback((id: MissionId) => {
    setHighestCompleted((prev) => Math.max(prev, id))
  }, [])

  const goToMission = useCallback(
    (id: MissionId) => {
      if (id > highestCompleted + 1) return
      setActiveMission(id)
    },
    [highestCompleted],
  )

  const missionContent = {
    1: <Mission1RealWorldFigures
      onNext={() => goToMission(2)}
      onComplete={() => markComplete(1)}
    />,

    2: <Mission2CubeEdgesQuiz
      onNext={() => goToMission(3)}
      onComplete={() => markComplete(2)}
    />,

    3: <Mission3RobotPath
      onComplete={() => markComplete(3)}
    />
  }

  return (
    <main className={CONTENT_WRAPPER_CLASSES}>
      <ul className="mt-6 flex flex-col gap-8">
        {MISSIONS.map((mission) => (
          <MissionSection
            key={mission.id}
            mission={mission}
            isDone={mission.id <= highestCompleted}
            isActive={activeMission === mission.id}
            isLocked={mission.id > highestCompleted + 1}
            onSelect={() => goToMission(mission.id)}
            ref={(el) => {
              if (el) selectorRefs.current.set(mission.id, el)
              else selectorRefs.current.delete(mission.id)
            }}
          >
            { missionContent[mission.id] }
          </MissionSection>
        ))}
      </ul>
    </main>
  )
}
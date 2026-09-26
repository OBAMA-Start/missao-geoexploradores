import { ArrowRight, CircleCheck, CircleX } from 'lucide-react'
import { useState } from 'react'
import FeedbackMessage from './FeedbackMessage'
import MissionCard from './MissionCard'

interface Mission2Props {
  onNext: () => void
  onComplete: () => void
}

const OPTIONS = [6, 12, 8] as const
const CORRECT_ANSWER = 12

export default function Mission2CubeEdgesQuiz({ onNext, onComplete }: Mission2Props) {
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false)
  const [attemptedWrong, setAttemptedWrong] = useState(false)

  const handleChoice = (value: number) => {
    if (value === CORRECT_ANSWER) {
      setAnsweredCorrectly(true)
      setAttemptedWrong(false)
      onComplete()
    } else {
      setAttemptedWrong(true)
    }
  }

  return (
    <MissionCard title="Missão 2: Quantas arestas tem um cubo?">
      <div className="flex flex-wrap gap-3" role="group" aria-label="Alternativas">
        {OPTIONS.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => handleChoice(value)}
            aria-pressed={answeredCorrectly && value === CORRECT_ANSWER}
            className={[
              'min-h-14 min-w-20 rounded-xl px-8 py-3 text-xl font-extrabold text-white shadow transition',
              'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-green-700',
              answeredCorrectly && value === CORRECT_ANSWER
                ? 'bg-green-700 ring-4 ring-green-300'
                : 'bg-green-600 hover:bg-green-700',
            ].join(' ')}
          >
            {value}
          </button>
        ))}
      </div>

      {answeredCorrectly && (
        <>
          <FeedbackMessage variant="success">
            <CircleCheck className="h-6 w-6 shrink-0" aria-hidden="true" />
            Correto! Um cubo tem 12 arestas.
          </FeedbackMessage>
          <button
            type="button"
            onClick={onNext}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-lg font-bold text-white shadow transition hover:bg-green-700 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-green-700"
          >
            Ir para Missão 3
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </>
      )}
      {!answeredCorrectly && attemptedWrong && (
        <FeedbackMessage variant="error">
          <CircleX className="h-6 w-6 shrink-0" aria-hidden="true" />
          Resposta incorreta.
        </FeedbackMessage>
      )}
    </MissionCard>
  )
}

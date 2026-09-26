import { ArrowRight, CircleCheck, CircleX } from 'lucide-react'
import { useState } from 'react'
import FeedbackMessage from './FeedbackMessage'
import MissionCard from './MissionCard'
import sodaCanImg from '../assets/refrigerante.jpeg';
import magicCube from '../assets/cubo-magico.jpg';

interface Mission1Props {
  onNext: () => void
  onComplete: () => void
}

type Status = 'idle' | 'success' | 'error'

const IMAGES = [
  {
    src: sodaCanImg,
    alt: 'Lata de refrigerante — um cilindro',
    isCorrect: true,
  },
  {
    src: magicCube,
    alt: 'Cubo mágico — um cubo',
    isCorrect: false,
  },
] as const

export default function Mission1RealWorldFigures({ onNext, onComplete }: Mission1Props) {
  const [status, setStatus] = useState<Status>('idle')

  const handleChoice = (isCorrect: boolean) => {
    if (isCorrect) {
      setStatus('success')
      onComplete()
    } else {
      setStatus('error')
    }
  }

  return (
    <MissionCard title="Missão 1: Qual objeto é um cilindro?">
      <p className="text-lg text-slate-700">Clique na imagem correta:</p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
        {IMAGES.map((img) => (
          <button
            key={img.src}
            type="button"
            onClick={() => handleChoice(img.isCorrect)}
            aria-label={img.alt}
            className="rounded-2xl border-4 border-transparent bg-slate-100 p-3 transition hover:border-sky-500 hover:bg-sky-50 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-56 w-56 object-contain"
            />
          </button>
        ))}
      </div>

      {status === 'success' && (
        <>
          <FeedbackMessage variant="success">
            <CircleCheck className="h-6 w-6 shrink-0" aria-hidden="true" />
            Correto! Uma lata é um cilindro.
          </FeedbackMessage>
          <button
            type="button"
            onClick={onNext}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-lg font-bold text-white shadow transition hover:bg-green-700 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-green-700"
          >
            Ir para Missão 2
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </>
      )}
      {status === 'error' && (
        <FeedbackMessage variant="error">
          <CircleX className="h-6 w-6 shrink-0" aria-hidden="true" />
          Tente novamente.
        </FeedbackMessage>
      )}
    </MissionCard>
  )
}

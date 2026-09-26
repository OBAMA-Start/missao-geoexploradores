import { Info, Play } from 'lucide-react'
import bgImage from '../assets/bg.jpeg'

interface StartPageProps {
  onStart: () => void
  onCredits: () => void
}

const MENU_BUTTON_BASE =
  'inline-flex w-64 items-center justify-center gap-2 rounded-xl px-8 font-bold shadow-lg transition active:scale-95 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white'

const PRIMARY_BUTTON_CLASSES = `${MENU_BUTTON_BASE} text-xl py-4 bg-sky-600 text-white hover:bg-sky-700`

const OUTLINE_BUTTON_CLASSES = `${MENU_BUTTON_BASE} text-base py-3 border-2 border-white/80 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20`

export function StartPage({ onStart, onCredits }: StartPageProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-slate-900/40" aria-hidden="true" />

      <div className="relative text-center">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg sm:text-6xl">
          Missão GeoExploradores
        </h1>
        <p className="mt-3 text-lg font-semibold text-white/90 drop-shadow sm:text-xl">
          Explore as formas e complete as missões!
        </p>

        <nav aria-label="Menu inicial" className="mt-8 flex flex-col items-center gap-4">
          <button type="button" onClick={onStart} className={PRIMARY_BUTTON_CLASSES}>
            <Play className="h-6 w-6" aria-hidden="true" />
            Iniciar
          </button>
          <button type="button" onClick={onCredits} className={OUTLINE_BUTTON_CLASSES}>
            <Info className="h-4 w-4" aria-hidden="true" />
            Créditos
          </button>
        </nav>
      </div>
    </div>
  )
}

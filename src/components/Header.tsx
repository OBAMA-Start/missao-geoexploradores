import BackButton from './BackButton'
import { CARD_CLASSES, CONTENT_WRAPPER_CLASSES } from '../layout'

interface HeaderProps {
  onBack?: () => void
}

export default function Header({ onBack }: HeaderProps) {
  return (
    <header className={`${CONTENT_WRAPPER_CLASSES} pt-6`}>
      {onBack && (
        <div className="mb-8">
          <BackButton onClick={onBack} />
        </div>
      )}
      <div className={`${CARD_CLASSES} text-center`}>
        <h1 className="text-3xl font-extrabold text-slate-800 sm:text-4xl">
          Missão GeoExploradores
        </h1>
        <p className="mt-2 text-base text-slate-600 sm:text-lg">
          Explore as formas geométricas e complete as 3 missões!
        </p>
      </div>
    </header>
  )
}

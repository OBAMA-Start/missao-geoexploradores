import { Check, Lock } from 'lucide-react'
import type { ReactNode, Ref } from 'react'
import type { MissionMeta } from '../data/missions'

interface MissionSectionProps {
  mission: MissionMeta
  isActive: boolean
  isDone: boolean
  isLocked: boolean
  onSelect: () => void
  ref?: Ref<HTMLButtonElement>
  children: ReactNode
}

type SelectorVariant = 'locked' | 'done-active' | 'done' | 'active' | 'idle'

function getVariant({ isLocked, isDone, isActive }: Pick<MissionSectionProps, 'isLocked' | 'isDone' | 'isActive'>): SelectorVariant {
  if (isLocked) return 'locked'
  if (isDone) return isActive ? 'done-active' : 'done'
  return isActive ? 'active' : 'idle'
}

const BASE_SELECTOR_CLASSES =
  'flex w-full items-center justify-between gap-4 rounded-xl px-5 py-4 text-left text-lg font-bold shadow transition focus-visible:outline-3 focus-visible:outline-offset-2'

const SELECTOR_STYLES: Record<SelectorVariant, string> = {
  locked: 'cursor-not-allowed bg-slate-300 text-slate-500 focus-visible:outline-slate-400',
  'done-active': 'bg-green-200 text-green-900 ring-4 ring-green-400 focus-visible:outline-green-600',
  done: 'bg-green-100 text-green-800 hover:bg-green-200 focus-visible:outline-green-600',
  active: 'bg-sky-700 text-white ring-4 ring-sky-300 focus-visible:outline-sky-600',
  idle: 'bg-sky-600 text-white hover:bg-sky-700 focus-visible:outline-sky-600',
}

export default function MissionSection({
                                         mission,
                                         isActive,
                                         isDone,
                                         isLocked,
                                         onSelect,
                                         ref,
                                         children,
                                       }: MissionSectionProps) {
  const Icon = mission.icon
  const buttonId = `selector-${mission.id}`
  const panelId = `${mission.id}-panel`
  const variant = getVariant({ isLocked, isDone, isActive })

  return (
    <li>
      <button
        type="button"
        ref={ref}
        id={buttonId}
        aria-pressed={isActive}
        aria-expanded={isActive}
        aria-controls={panelId}
        aria-disabled={isLocked}
        disabled={isLocked}
        onClick={onSelect}
        title={isLocked ? 'Complete a missão anterior para desbloquear' : mission.navLabel}
        className={BASE_SELECTOR_CLASSES + " " + SELECTOR_STYLES[variant]}
      >
        <span className="flex items-center gap-3">
          <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
          {mission.navLabel}
        </span>
        <span className="flex items-center gap-2">
          {isDone && (
            <span title="Concluída">
              <Check className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Missão concluída</span>
            </span>
          )}
          {isLocked && (
            <span title="Bloqueada">
              <Lock className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Missão bloqueada</span>
            </span>
          )}
        </span>
      </button>

      {isActive && (
        <div id={panelId} role="region" aria-labelledby={buttonId} className="mt-3">
          {children}
        </div>
      )}
    </li>
  )
}

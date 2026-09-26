import type { ReactNode } from 'react'
import { CARD_CLASSES } from '../layout'

interface MissionCardProps {
  title: string
  children: ReactNode
}

export default function MissionCard({ title, children }: MissionCardProps) {
  return (
    <section className={`w-full ${CARD_CLASSES}`}>
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

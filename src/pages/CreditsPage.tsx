import MissionCard from '../components/MissionCard'
import { CONTENT_WRAPPER_CLASSES } from '../layout'
import apoioImage from '../assets/creditos.png'

const TEAM = [
  { name: 'Maria Nelice Maia', role: 'Idealização e criação' },
  { name: 'Isaque Dantas', role: 'Desenvolvimento e adaptação' },
  { name: 'Dênis Silva', role: 'Revisão' },
]

const BNCC_CODES = ['EF01MA13', 'EF02MA12', 'EF02MA14', 'EF03MA12', 'EF03MA13', 'EF04MA16']

export function CreditsPage() {
  return (
    <main className={CONTENT_WRAPPER_CLASSES}>
      <div className="mt-6 flex flex-col gap-6">
        <MissionCard title="Equipe">
          <ul className="flex flex-col gap-3">
            {TEAM.map(({ name, role }) => (
              <li key={name} className="rounded-xl bg-slate-50 px-4 py-3">
                <p className="text-lg font-bold text-slate-800">{name}</p>
                <p className="text-slate-600">{role}</p>
              </li>
            ))}
          </ul>
        </MissionCard>

        <MissionCard title="Apoio">
          <img
            src={apoioImage}
            alt="Logotipos das instituições de apoio"
            loading="lazy"
            className="mx-auto max-w-full rounded-xl"
          />
        </MissionCard>

        <MissionCard title="Habilidades BNCC">
          <ul aria-label="Habilidades BNCC contempladas" className="flex flex-row flex-wrap gap-2">
            {BNCC_CODES.map((code) => (
              <li
                key={code}
                className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600"
              >
                {code}
              </li>
            ))}
          </ul>
        </MissionCard>
      </div>
    </main>
  )
}

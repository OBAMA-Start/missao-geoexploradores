import { Box, Compass, Cylinder, type LucideIcon } from 'lucide-react'
import type { MissionId } from '../types'

export interface MissionMeta {
  id: MissionId
  icon: LucideIcon
  navLabel: string
  title: string
}

export const MISSIONS: MissionMeta[] = [
  {
    id: 1,
    icon: Cylinder,
    navLabel: 'Missão 1: Figuras no Mundo Real',
    title: 'Qual objeto é um cilindro?',
  },
  {
    id: 2,
    icon: Box,
    navLabel: 'Missão 2: Características das Formas',
    title: 'Quantas arestas tem um cubo?',
  },
  {
    id: 3,
    icon: Compass,
    navLabel: 'Missão 3: Caminhos e Direções',
    title: 'Leve o robô até o destino',
  },
]

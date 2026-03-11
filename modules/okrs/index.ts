import useSWR from 'swr'

export interface KeyResult {
  id: string
  title: string
  currentValue: number
  targetValue: number
  estimatedTime: number
}

export interface OKR {
  id: string
  title: string
  completed: boolean
  startDate: string
  endDate: string
  keyResults: KeyResult[]
}

const mockOKRs: OKR[] = [
  {
    id: '1',
    title: 'Améliorer la productivité personnelle',
    completed: false,
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    keyResults: [
      { id: 'kr1', title: 'Compléter 80% des tâches quotidiennes', currentValue: 65, targetValue: 80, estimatedTime: 30 },
      { id: 'kr2', title: 'Maintenir 5 habitudes actives', currentValue: 4, targetValue: 5, estimatedTime: 15 },
    ]
  },
  {
    id: '2',
    title: 'Apprendre une nouvelle technologie',
    completed: false,
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    keyResults: [
      { id: 'kr3', title: 'Compléter 10 projets pratiques', currentValue: 3, targetValue: 10, estimatedTime: 60 },
      { id: 'kr4', title: 'Obtenir certification', currentValue: 0, targetValue: 1, estimatedTime: 120 },
    ]
  },
  {
    id: '3',
    title: 'Améliorer la santé',
    completed: false,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    keyResults: [
      { id: 'kr5', title: 'Exercice 4x par semaine', currentValue: 3, targetValue: 4, estimatedTime: 45 },
      { id: 'kr6', title: 'Méditer 20min/jour', currentValue: 15, targetValue: 20, estimatedTime: 20 },
    ]
  },
]

const fetcher = () => Promise.resolve(mockOKRs)

export function useOkrs() {
  const { data, error, isLoading, mutate } = useSWR('okrs', fetcher)
  return { data, error, isLoading, mutate }
}

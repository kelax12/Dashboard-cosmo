import useSWR from 'swr'

export interface Habit {
  id: string
  name: string
  estimatedTime: number
  completions: Record<string, boolean>
}

const today = new Date().toLocaleDateString('en-CA')

const mockHabits: Habit[] = [
  {
    id: '1',
    name: 'Méditation matinale',
    estimatedTime: 15,
    completions: { [today]: true, '2024-01-14': true, '2024-01-13': true }
  },
  {
    id: '2',
    name: 'Lecture',
    estimatedTime: 30,
    completions: { [today]: false, '2024-01-14': true }
  },
  {
    id: '3',
    name: 'Exercice physique',
    estimatedTime: 45,
    completions: { [today]: true, '2024-01-14': true, '2024-01-13': true, '2024-01-12': true }
  },
  {
    id: '4',
    name: 'Journaling',
    estimatedTime: 10,
    completions: { [today]: false }
  },
]

const fetcher = () => Promise.resolve(mockHabits)

export function useHabits() {
  const { data, error, isLoading, mutate } = useSWR('habits', fetcher)
  return { data, error, isLoading, mutate }
}

export function useToggleHabitCompletion() {
  const { mutate } = useSWR('habits', fetcher)
  return {
    mutate: ({ id, date }: { id: string; date: string }) => {
      mutate((habits = []) => 
        habits.map(h => h.id === id 
          ? { ...h, completions: { ...h.completions, [date]: !h.completions[date] } }
          : h
        ),
        false
      )
    }
  }
}

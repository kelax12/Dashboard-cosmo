import useSWR from 'swr'

export interface Category {
  id: string
  name: string
  color: string
}

const mockCategories: Category[] = [
  { id: 'work', name: 'Travail', color: '#3B82F6' },
  { id: 'dev', name: 'Développement', color: '#8B5CF6' },
  { id: 'personal', name: 'Personnel', color: '#10B981' },
  { id: 'health', name: 'Santé', color: '#F59E0B' },
  { id: 'learning', name: 'Apprentissage', color: '#EC4899' },
]

const fetcher = () => Promise.resolve(mockCategories)

export function useCategories() {
  const { data, error, isLoading, mutate } = useSWR('categories', fetcher)
  return { data, error, isLoading, mutate }
}

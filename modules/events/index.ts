import useSWR from 'swr'

export interface CalendarEvent {
  id: string
  title: string
  start: string
  end: string
  type: string
}

const today = new Date()

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Réunion équipe',
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0).toISOString(),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0).toISOString(),
    type: 'meeting'
  },
  {
    id: '2',
    title: 'Call client',
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0).toISOString(),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 0).toISOString(),
    type: 'call'
  },
  {
    id: '3',
    title: 'Review code',
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 16, 0).toISOString(),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17, 0).toISOString(),
    type: 'work'
  },
]

const fetcher = () => Promise.resolve(mockEvents)

export function useEvents() {
  const { data, error, isLoading, mutate } = useSWR('events', fetcher)
  return { data, error, isLoading, mutate }
}

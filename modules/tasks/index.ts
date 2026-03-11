import useSWR from 'swr'

export interface Task {
  id: string
  name: string
  completed: boolean
  completedAt?: string
  deadline: string
  priority: number
  estimatedTime: number
  category: string
  bookmarked: boolean
  isCollaborative: boolean
  collaborators?: string[]
  collaboratorValidations?: Record<string, boolean>
  pendingInvites?: string[]
  sharedBy?: string
  permissions?: string
}

const mockTasks: Task[] = [
  {
    id: '1',
    name: 'Finaliser la présentation client',
    completed: false,
    deadline: new Date().toISOString(),
    priority: 1,
    estimatedTime: 60,
    category: 'work',
    bookmarked: true,
    isCollaborative: true,
    collaborators: ['Marie Dupont', 'Jean Martin'],
    collaboratorValidations: { 'Marie Dupont': true, 'Jean Martin': false },
    sharedBy: 'Moi',
    permissions: 'edit'
  },
  {
    id: '2',
    name: 'Réviser le code du module auth',
    completed: false,
    deadline: new Date().toISOString(),
    priority: 2,
    estimatedTime: 45,
    category: 'dev',
    bookmarked: false,
    isCollaborative: false
  },
  {
    id: '3',
    name: 'Préparer la réunion équipe',
    completed: true,
    completedAt: new Date().toISOString(),
    deadline: new Date().toISOString(),
    priority: 3,
    estimatedTime: 30,
    category: 'work',
    bookmarked: false,
    isCollaborative: false
  },
  {
    id: '4',
    name: 'Faire le sport',
    completed: false,
    deadline: new Date().toISOString(),
    priority: 2,
    estimatedTime: 60,
    category: 'personal',
    bookmarked: true,
    isCollaborative: false
  },
]

const fetcher = () => Promise.resolve(mockTasks)

export function useTasks() {
  const { data, error, isLoading, mutate } = useSWR('tasks', fetcher)
  return { data, error, isLoading, mutate }
}

export function usePendingTasks() {
  const { data, error, isLoading } = useSWR('tasks', fetcher)
  const pendingTasks = data?.filter(task => !task.completed) || []
  return { data: pendingTasks, error, isLoading }
}

export function useToggleTaskComplete() {
  const { mutate } = useSWR('tasks', fetcher)
  return {
    mutate: (taskId: string) => {
      mutate((tasks = []) => 
        tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed, completedAt: new Date().toISOString() } : t),
        false
      )
    }
  }
}

export function useToggleTaskBookmark() {
  const { mutate } = useSWR('tasks', fetcher)
  return {
    mutate: (taskId: string) => {
      mutate((tasks = []) => 
        tasks.map(t => t.id === taskId ? { ...t, bookmarked: !t.bookmarked } : t),
        false
      )
    }
  }
}

export function useUpdateTask() {
  const { mutate } = useSWR('tasks', fetcher)
  return {
    mutate: ({ id, updates }: { id: string; updates: Partial<Task> }) => {
      mutate((tasks = []) => 
        tasks.map(t => t.id === id ? { ...t, ...updates } : t),
        false
      )
    }
  }
}

'use client'

import React, { createContext, useContext, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
}

interface Friend {
  id: string
  name: string
  email: string
  avatar?: string
}

interface TaskContextType {
  user: User | null
  friends: Friend[]
  isPremium: () => boolean
  priorityRange: [number, number]
  sendFriendRequest: (email: string) => void
}

const defaultContext: TaskContextType = {
  user: { id: 'demo', name: 'Utilisateur', email: 'demo@cosmo.app' },
  friends: [
    { id: '1', name: 'Marie Dupont', email: 'marie@example.com', avatar: undefined },
    { id: '2', name: 'Jean Martin', email: 'jean@example.com', avatar: undefined },
    { id: '3', name: 'Sophie Bernard', email: 'sophie@example.com', avatar: undefined },
  ],
  isPremium: () => true,
  priorityRange: [1, 5],
  sendFriendRequest: (email: string) => console.log('Friend request sent to:', email),
}

const TaskContext = createContext<TaskContextType>(defaultContext)

export function TaskProvider({ children }: { children: ReactNode }) {
  return (
    <TaskContext.Provider value={defaultContext}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  return useContext(TaskContext)
}

'use client'

import { TaskProvider } from '@/context/TaskContext'
import DashboardPage from '@/components/DashboardPage'

export default function Home() {
  return (
    <TaskProvider>
      <DashboardPage />
    </TaskProvider>
  )
}

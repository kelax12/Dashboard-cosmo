import { Task } from '@/modules/tasks'
import { Habit } from '@/modules/habits'
import { CalendarEvent } from '@/modules/events'
import { OKR } from '@/modules/okrs'

interface WorkTimeData {
  tasks: Task[]
  events: CalendarEvent[]
  habits: Habit[]
  okrs: OKR[]
}

export function calculateWorkTimeForPeriod(
  startDate: Date,
  endDate: Date,
  data: WorkTimeData
): { totalTime: number } {
  const dateKey = startDate.toLocaleDateString('en-CA')
  
  // Time from completed tasks
  const taskTime = data.tasks
    .filter(task => {
      if (!task.completedAt) return false
      const completedDate = new Date(task.completedAt)
      return completedDate >= startDate && completedDate <= endDate
    })
    .reduce((sum, task) => sum + task.estimatedTime, 0)
  
  // Time from completed habits
  const habitTime = data.habits.reduce((sum, habit) => {
    if (habit.completions[dateKey]) {
      return sum + habit.estimatedTime
    }
    return sum
  }, 0)
  
  // Time from events
  const eventTime = data.events
    .filter(event => {
      const eventDate = new Date(event.start)
      return eventDate >= startDate && eventDate <= endDate
    })
    .reduce((sum, event) => {
      const start = new Date(event.start)
      const end = new Date(event.end)
      return sum + Math.round((end.getTime() - start.getTime()) / 60000)
    }, 0)
  
  return {
    totalTime: taskTime + habitTime + eventTime
  }
}

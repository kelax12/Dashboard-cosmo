'use client'

import React from 'react'
import { Check } from 'lucide-react'
import { useHabits, useToggleHabitCompletion } from '@/modules/habits'

const TodayHabits: React.FC = () => {
  const { data: habits = [], isLoading } = useHabits()
  const toggleCompletionMutation = useToggleHabitCompletion()

  const today = new Date().toLocaleDateString('en-CA')

  const todayHabits = habits.map((habit) => ({
    ...habit,
    completedToday: habit.completions[today] || false
  }))

  const completedCount = todayHabits.filter((h) => h.completedToday).length
  const totalTime = todayHabits.reduce((sum, habit) =>
    habit.completedToday ? sum + habit.estimatedTime : sum, 0
  )

  const handleToggle = (habitId: string) => {
    toggleCompletionMutation.mutate({ id: habitId, date: today })
  }

  if (isLoading) {
    return (
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div>
            <h2 className="text-xl font-bold text-[rgb(var(--color-text-primary))]">Habitudes du jour</h2>
            <p className="text-[rgb(var(--color-text-secondary))] text-sm">Chargement...</p>
          </div>
        </div>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-[rgb(var(--color-border))] rounded-2xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-[rgb(var(--color-text-primary))]">Habitudes du jour</h2>
          <p className="text-[rgb(var(--color-text-secondary))] text-sm">
            {completedCount}/{todayHabits.length} complétées - {Math.floor(totalTime / 60)}h{totalTime % 60}min
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {todayHabits.map((habit) => (
          <div
            key={habit.id}
            className={`p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-lg ${
              habit.completedToday
                ? 'bg-blue-600 border-blue-400 shadow-md'
                : 'bg-[rgb(var(--color-surface))] border-[rgb(var(--color-border))] hover:border-blue-400 hover:bg-blue-50/50'
            }`}
            onClick={() => handleToggle(habit.id)}
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div
                  className={`h-7 w-7 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                    habit.completedToday
                      ? 'bg-white text-blue-600 border-white shadow-md'
                      : 'bg-[rgb(var(--color-hover))] border-[rgb(var(--color-border))] text-transparent hover:border-blue-500 hover:bg-blue-100'
                  }`}
                >
                  <Check className="h-4 w-4" strokeWidth={4} />
                </div>
              </div>

              <div className="flex-1">
                <h3 className={`font-bold ${habit.completedToday ? 'text-white line-through' : 'text-[rgb(var(--color-text-primary))]'}`}>
                  {habit.name}
                </h3>
                <div className="flex items-center gap-4 mt-1">
                  <div className={`flex items-center gap-1 text-sm ${habit.completedToday ? 'text-blue-100' : 'text-[rgb(var(--color-text-secondary))]'}`}>
                    <span>{habit.estimatedTime} min</span>
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${habit.completedToday ? 'text-white/90' : 'text-orange-600'}`}>
                    <span>{'🔥'}</span>
                    <span>{Object.values(habit.completions).filter(Boolean).length} jours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {todayHabits.length === 0 && (
          <div className="text-center py-8 text-[rgb(var(--color-text-muted))]">
            <p>Aucune habitude configurée</p>
            <p className="text-sm">Ajoutez des habitudes dans la section dédiée</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TodayHabits

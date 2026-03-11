'use client'

import React from 'react'
import { Users, Check } from 'lucide-react'
import { useTasks } from '@/modules/tasks'
import { useCategories } from '@/modules/categories'
import { useTasks as useTaskContext } from '@/context/TaskContext'

const CollaborativeTasks: React.FC = () => {
  const { data: tasks = [], isLoading } = useTasks()
  const { data: categories = [] } = useCategories()
  const { isPremium, friends } = useTaskContext()

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category?.color || '#6b7280'
  }

  const premium = isPremium()
  const collaborativeTasks = tasks.filter(task => task.isCollaborative)

  if (isLoading) {
    return (
      <div className="p-8 bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border))] rounded-2xl animate-pulse">
        <div className="h-8 w-48 bg-[rgb(var(--color-border))] rounded mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-[rgb(var(--color-border))] rounded-xl"></div>
          ))}
        </div>
      </div>
    )
  }

  if (!premium) {
    return (
      <div className="p-8 bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border))] rounded-2xl">
        <div className="text-center">
          <div className="p-4 bg-yellow-100 rounded-2xl inline-block mb-4">
            <Users size={32} className="text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-[rgb(var(--color-text-primary))] mb-2">Tâches collaboratives</h2>
          <p className="text-[rgb(var(--color-text-secondary))] mb-6">
            Débloquez Premium pour accéder aux tâches collaboratives et travailler en équipe
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border))] rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-xl border border-blue-100">
            <Users size={24} className="text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[rgb(var(--color-text-primary))]">Tâches collaboratives</h2>
            <p className="text-[rgb(var(--color-text-secondary))] text-sm">{collaborativeTasks.length} tâches partagées</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {collaborativeTasks.map(task => {
          const categoryColor = getCategoryColor(task.category)

          return (
            <div
              key={task.id}
              className="collaborative-task p-4 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:scale-[1.01] cursor-pointer group"
              style={{
                backgroundColor: `${categoryColor}25`,
                borderColor: `${categoryColor}60`
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-[rgb(var(--color-text-primary))]">{task.name}</h3>
                  <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-[rgb(var(--color-text-secondary))]">
                    <div className="flex items-center gap-1.5">
                      <Users size={14} />
                      <span>Partagé par {task.sharedBy || 'Moi'}</span>
                    </div>
                    <span className="capitalize">{task.permissions}</span>
                    <span>{task.collaborators?.length} collaborateurs</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {task.collaborators?.map((collaborator, index) => {
                    const hasValidated = task.collaboratorValidations?.[collaborator] ?? false
                    const friend = friends.find(f => f.name === collaborator || f.id === collaborator)
                    const initials = collaborator.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()

                    return (
                      <div
                        key={index}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold relative transition-all overflow-hidden ${
                          hasValidated
                            ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/30'
                            : 'bg-[rgb(var(--color-active))] text-[rgb(var(--color-text-secondary))]'
                        }`}
                        title={`${collaborator} - ${hasValidated ? 'Validé' : 'Non validé'}`}
                      >
                        {friend?.avatar ? (
                          friend.avatar.startsWith('http') ? (
                            <img src={friend.avatar} alt={collaborator} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xl">{friend.avatar}</span>
                          )
                        ) : (
                          <span>{initials}</span>
                        )}
                        {hasValidated && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[rgb(var(--color-surface))] rounded-full flex items-center justify-center shadow-md z-10">
                            <Check size={12} className="text-green-500" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}

        {collaborativeTasks.length === 0 && (
          <div className="text-center py-8 text-[rgb(var(--color-text-muted))]">
            <Users size={48} className="mx-auto mb-4 opacity-30" />
            <p>Aucune tâche collaborative</p>
            <p className="text-sm">Commencez à partager des tâches avec votre équipe</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CollaborativeTasks

'use client'

import React from 'react'
import { X, UserPlus, Clock } from 'lucide-react'

interface CollaboratorItemProps {
  id: string
  name: string
  email?: string
  avatar?: string
  isPending?: boolean
  onAction: () => void
  variant: 'add' | 'remove'
}

const CollaboratorItem: React.FC<CollaboratorItemProps> = ({
  name,
  email,
  avatar,
  isPending,
  onAction,
  variant
}) => {
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()

  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-[rgb(var(--color-hover))] hover:bg-[rgb(var(--color-active))] transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-gradient-to-br from-blue-400 to-purple-500 text-white">
          {avatar ? (
            avatar.startsWith('http') ? (
              <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <span>{avatar}</span>
            )
          ) : (
            <span>{initials}</span>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-[rgb(var(--color-text-primary))]">{name}</span>
            {isPending && (
              <span className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded-full">
                <Clock size={10} />
                En attente
              </span>
            )}
          </div>
          {email && (
            <span className="text-sm text-[rgb(var(--color-text-secondary))]">{email}</span>
          )}
        </div>
      </div>
      <button
        onClick={onAction}
        className={`p-2 rounded-lg transition-colors ${
          variant === 'remove'
            ? 'hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500'
            : 'hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-500'
        }`}
      >
        {variant === 'remove' ? <X size={18} /> : <UserPlus size={18} />}
      </button>
    </div>
  )
}

export default CollaboratorItem

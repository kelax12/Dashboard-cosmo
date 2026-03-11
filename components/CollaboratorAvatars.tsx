'use client'

import React from 'react'

interface Friend {
  id: string
  name: string
  email: string
  avatar?: string
}

interface CollaboratorAvatarsProps {
  collaborators: string[]
  friends: Friend[]
  size?: 'sm' | 'md' | 'lg'
}

const CollaboratorAvatars: React.FC<CollaboratorAvatarsProps> = ({
  collaborators,
  friends,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base'
  }

  const displayCollaborators = collaborators.slice(0, 3)
  const remaining = collaborators.length - 3

  return (
    <div className="flex -space-x-2">
      {displayCollaborators.map((collaborator, index) => {
        const friend = friends.find(f => f.name === collaborator || f.id === collaborator)
        const initials = collaborator.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        
        return (
          <div
            key={index}
            className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold bg-gradient-to-br from-blue-400 to-purple-500 text-white border-2 border-[rgb(var(--color-surface))]`}
            title={collaborator}
          >
            {friend?.avatar ? (
              friend.avatar.startsWith('http') ? (
                <img src={friend.avatar} alt={collaborator} className="w-full h-full rounded-full object-cover" />
              ) : (
                <span>{friend.avatar}</span>
              )
            ) : (
              <span>{initials}</span>
            )}
          </div>
        )
      })}
      {remaining > 0 && (
        <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold bg-[rgb(var(--color-border))] text-[rgb(var(--color-text-secondary))] border-2 border-[rgb(var(--color-surface))]`}>
          +{remaining}
        </div>
      )}
    </div>
  )
}

export default CollaboratorAvatars

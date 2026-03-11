'use client'

import React from 'react'
import { X } from 'lucide-react'
import { useCategories } from '@/modules/categories'

interface ColorSettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

const ColorSettingsModal: React.FC<ColorSettingsModalProps> = ({ isOpen, onClose }) => {
  const { data: categories = [] } = useCategories()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[rgb(var(--color-surface))] rounded-2xl shadow-2xl w-full max-w-md border border-[rgb(var(--color-border))]">
        <div className="flex items-center justify-between p-4 border-b border-[rgb(var(--color-border))]">
          <h2 className="text-lg font-bold text-[rgb(var(--color-text-primary))]">
            Paramètres des couleurs
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[rgb(var(--color-hover))] rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 space-y-4">
          {categories.map(category => (
            <div key={category.id} className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded-lg"
                style={{ backgroundColor: category.color }}
              />
              <span className="flex-1 text-[rgb(var(--color-text-primary))]">
                {category.name}
              </span>
              <span className="text-sm text-[rgb(var(--color-text-secondary))]">
                {category.color}
              </span>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-[rgb(var(--color-border))]">
          <button
            onClick={onClose}
            className="w-full py-2 bg-[rgb(var(--color-accent))] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}

export default ColorSettingsModal

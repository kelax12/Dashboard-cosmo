"# 📊 COSMO Dashboard - Zone UI

## Contexte de l'application

**COSMO** est une application de productivité personnelle avec :
- Gestion de tâches (Tasks)
- Suivi d'habitudes (Habits)  
- OKRs (Objectives & Key Results)
- Événements/Calendrier (Events)
- Collaboration entre utilisateurs

**Stack technique** : React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion + Supabase

---

## 📁 Fichiers de cette zone

| Fichier | Rôle | Lignes |
|---------|------|--------|
| `DashboardPage.tsx` | Page principale du dashboard | ~250 |
| `DashboardChart.tsx` | Graphique temps de travail (7 jours) | ~280 |
| `TodayTasks.tsx` | Liste des tâches prioritaires du jour | ~230 |
| `TodayHabits.tsx` | Habitudes à compléter aujourd'hui | ~125 |
| `ActiveOKRs.tsx` | OKRs en cours avec progression | ~80 |
| `TasksSummary.tsx` | Résumé par catégorie (optionnel) | ~120 |
| `CollaborativeTasks.tsx` | Tâches partagées (optionnel) | - |

---

## 🎨 Système de Design

### Variables CSS (thème dynamique)
```css
--color-background    /* Fond principal */
--color-surface       /* Cartes et surfaces */
--color-border        /* Bordures */
--color-text-primary  /* Texte principal */
--color-text-secondary/* Texte secondaire */
--color-text-muted    /* Texte désactivé */
--color-accent        /* Couleur d'accent (bleu) */
--color-success       /* Vert succès */
--color-error         /* Rouge erreur */
--color-warning       /* Orange avertissement */
--color-hover         /* Fond au survol */
```

### Utilisation dans les classes
```tsx
// Exemple de pattern utilisé
className=\"bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border))] text-[rgb(var(--color-text-primary))]\"
```

### Mode Monochrome
Le design supporte un mode `monochrome:` avec des classes conditionnelles :
```tsx
className=\"bg-gradient-to-r from-blue-600 to-purple-600 monochrome:from-white monochrome:to-zinc-200\"
```

---

## 📦 Dépendances clés

### Hooks de données (modules)
```tsx
import { useTasks } from '@/modules/tasks';
import { useHabits } from '@/modules/habits';
import { useOkrs } from '@/modules/okrs';
import { useEvents } from '@/modules/events';
import { useCategories } from '@/modules/categories';
```

### Animations (Framer Motion)
```tsx
import { motion, AnimatePresence } from 'framer-motion';
```

### Icônes (Lucide React)
```tsx
import { CheckSquare, Clock, Target, Repeat, ... } from 'lucide-react';
```

---

## 🔌 Types de données

### Task
```typescript
interface Task {
  id: string;
  name: string;
  completed: boolean;
  completedAt?: string;
  deadline: string;
  estimatedTime: number; // minutes
  priority: number; // 1-5 (1 = urgent)
  category: string; // ID catégorie
  bookmarked: boolean;
  isCollaborative?: boolean;
  collaborators?: string[];
}
```

### Habit
```typescript
interface Habit {
  id: string;
  name: string;
  estimatedTime: number;
  completions: Record<string, boolean>; // { \"2024-01-15\": true }
}
```

### OKR
```typescript
interface OKR {
  id: string;
  title: string;
  completed: boolean;
  endDate: string;
  keyResults: KeyResult[];
}

interface KeyResult {
  currentValue: number;
  targetValue: number;
  estimatedTime: number;
}
```

### Category
```typescript
interface Category {
  id: string;
  name: string;
  color: string; // hex color
}
```

---

## 🎯 Instructions pour l'IA

### Ce que tu peux modifier
- Styles Tailwind et CSS
- Structure JSX/HTML
- Animations Framer Motion
- Disposition et layout
- Couleurs et espacements

### Ce que tu dois conserver
- Imports des hooks (`useTasks`, `useHabits`, etc.)
- Structure des données (types)
- Logique métier (filtres, calculs)
- Noms des variables CSS (`--color-*`)

### Pattern de carte standard
```tsx
<div className=\"p-6 bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border))] rounded-2xl shadow-sm\">
  {/* Header avec icône */}
  <div className=\"flex items-center gap-3 mb-6\">
    <div className=\"p-2 bg-[rgb(var(--color-accent)/0.15)] rounded-xl\">
      <IconComponent size={24} className=\"text-[rgb(var(--color-accent))]\" />
    </div>
    <div>
      <h2 className=\"text-lg font-bold text-[rgb(var(--color-text-primary))]\">Titre</h2>
      <p className=\"text-[rgb(var(--color-text-secondary))] text-sm\">Sous-titre</p>
    </div>
  </div>
  {/* Contenu */}
</div>
```

---

## 📐 Structure de DashboardPage

```
┌─────────────────────────────────────────────────┐
│  Header (Salutation + TextType animation)       │
├─────────────────────────────────────────────────┤
│  Stats Cards (4 colonnes)                       │
│  [Tâches] [Agenda] [OKR] [Habitudes]           │
├──────────────────────────┬──────────────────────┤
│  DashboardChart          │  TodayHabits         │
│  (2 colonnes)            │  (1 colonne)         │
├──────────────────────────┼──────────────────────┤
│  ActiveOKRs              │  TodayTasks          │
│  (1 colonne)             │  (1 colonne)         │
├─────────────────────────────────────────────────┤
│  CollaborativeTasks (pleine largeur)            │
└─────────────────────────────────────────────────┘
```

---

## 💡 Exemple de prompt pour modifications

```
Modifie le composant TodayTasks.tsx :
- Ajoute un effet de survol plus prononcé sur les cartes
- Change le style du bouton de complétion
- Améliore l'affichage mobile

Conserve :
- La logique de filtrage des tâches
- Les hooks useTasks, useCategories
- Les handlers handleToggleComplete et handleToggleBookmark
```

---

## ⚠️ Points d'attention

1. **Responsive** : Utilise les breakpoints `sm:`, `lg:`, `xl:`
2. **Dark mode** : Classes `dark:` pour le mode sombre
3. **Monochrome** : Classes `monochrome:` pour ce mode spécial
4. **Animations** : Utilise `motion.div` de Framer Motion
5. **États de chargement** : Chaque composant a un état `isLoading`
"

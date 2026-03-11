'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { useTasks as useTasksContext } from '@/context/TaskContext'
import { useTasks } from '@/modules/tasks'
import { useHabits } from '@/modules/habits'
import { useOkrs } from '@/modules/okrs'
import { useEvents } from '@/modules/events'
import DashboardChart from './DashboardChart'
import TodayHabits from './TodayHabits'
import TodayTasks from './TodayTasks'
import CollaborativeTasks from './CollaborativeTasks'
import ActiveOKRs from './ActiveOKRs'
import TextType from './TextType'

const DashboardPage: React.FC = () => {
  const { data: tasks = [] } = useTasks()
  const { data: okrs = [] } = useOkrs()
  const { data: events = [] } = useEvents()
  const { user } = useTasksContext()
  const { data: habits = [] } = useHabits()

  const displayUser = user || { id: 'demo', name: 'Utilisateur', email: 'demo@cosmo.app' }

  const today = new Date().toISOString().split('T')[0]
  const todayHabits = habits.filter(habit => habit.completions[today])
  const todayTasks = tasks.filter(task =>
    !task.completed &&
    new Date(task.deadline).toDateString() === new Date().toDateString()
  )

  const totalHabitsTime = todayHabits.reduce((sum, habit) => sum + habit.estimatedTime, 0)
  const totalTasksTime = todayTasks.reduce((sum, task) => sum + task.estimatedTime, 0)
  void (totalHabitsTime + totalTasksTime)

  const completedTasksToday = tasks.filter(task =>
    task.completed &&
    task.completedAt &&
    new Date(task.completedAt).toDateString() === new Date().toDateString()
  ).length

  const activeOKRs = okrs.filter(okr => !okr.completed)

  const todayEvents = events.filter(event => {
    const eventDate = new Date(event.start).toDateString()
    return eventDate === new Date().toDateString()
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  const sparklines = [
    [3, 7, 5, 9, 6, 11, 8, 13, 10, 15, 12, 14],
    [5, 4, 8, 6, 10, 7, 9, 12, 8, 11, 13, 10],
    [2, 6, 4, 8, 5, 9, 7, 10, 8, 12, 9, 11],
    [4, 7, 5, 10, 6, 8, 11, 7, 13, 9, 12, 14],
  ]

  const Sparkline = ({ data }: { data: number[] }) => {
    const w = 100, h = 40
    const min = Math.min(...data), max = Math.max(...data)
    const range = max - min || 1
    const pts = data.map((v, i) => [
      (i / (data.length - 1)) * w,
      h - ((v - min) / range) * (h - 6) - 3
    ])
    const path = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ')
    const area = `${path} L${w},${h} L0,${h} Z`
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-10" preserveAspectRatio="none">
        <defs>
          <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(59,130,246)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="rgb(59,130,246)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#sg)" />
        <path d={path} fill="none" stroke="rgb(59,130,246)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  const statCards = [
    {
      label: 'Tâches complétées',
      value: completedTasksToday,
      subtitle: "Aujourd'hui",
    },
    {
      label: 'Agenda',
      value: todayEvents.length,
      subtitle: "Événements aujourd'hui",
    },
    {
      label: 'OKR actifs',
      value: activeOKRs.length,
      subtitle: 'En cours',
    },
    {
      label: 'Habitudes',
      value: todayHabits.length,
      subtitle: 'Réalisées',
    }
  ]

  return (
    <div className="min-h-screen bg-[rgb(var(--color-background))] p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <motion.div
        className="max-w-[1600px] mx-auto space-y-6 lg:space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(var(--color-text-primary))] mb-2 lg:mb-3">
              <span>Bonjour, </span>
              <TextType
                text={displayUser.name}
                typingSpeed={80}
                pauseDuration={5000}
                deletingSpeed={50}
                loop={false}
                showCursor={true}
                cursorCharacter="|"
                cursorClassName="text-blue-500"
                textClassName="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient"
              />
            </h1>
            <motion.p
              className="text-[rgb(var(--color-text-secondary))] text-base lg:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Voici votre tableau de bord pour aujourd&#39;hui
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6"
          variants={containerVariants}
        >
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden group cursor-pointer"
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <div className="p-5 lg:p-6 h-full bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border))] rounded-2xl transition-all duration-300 group-hover:shadow-xl group-hover:border-[rgb(var(--color-accent)/0.5)] group-hover:bg-[rgb(var(--color-accent)/0.02)] overflow-hidden">
                <div className="space-y-2 mb-3">
                  <p className="text-sm text-[rgb(var(--color-text-secondary))] font-bold group-hover:text-[rgb(var(--color-accent))] transition-colors">
                    {stat.label}
                  </p>
                  <motion.p
                    className="text-3xl lg:text-4xl font-black text-[rgb(var(--color-text-primary))]"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-xs text-[rgb(var(--color-text-muted))] flex items-center gap-1.5 font-medium group-hover:text-[rgb(var(--color-text-secondary))]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--color-accent))]" />
                    {stat.subtitle}
                  </p>
                </div>
                <div className="mx-[-20px] mb-[-24px]">
                  <Sparkline data={sparklines[index]} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
        >
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <DashboardChart />
          </motion.div>

          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <TodayHabits />
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <ActiveOKRs />
          </motion.div>

          <motion.div variants={itemVariants}>
            <TodayTasks />
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <CollaborativeTasks />
        </motion.div>

        <motion.button
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl shadow-blue-500/30 flex items-center justify-center text-white z-50 hover:shadow-blue-500/50 transition-shadow duration-300"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <Zap size={24} />
        </motion.button>
      </motion.div>
    </div>
  )
}

export default DashboardPage

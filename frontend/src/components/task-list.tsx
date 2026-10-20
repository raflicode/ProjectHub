import { Circle, CircleCheck, CircleDot } from 'lucide-react'

import type { Task } from '@/data/dashboard'
import { cn } from '@/lib/utils'

export function formatTaskDate(value?: string) {
  return value ? new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(`${value}T12:00:00`)) : undefined
}

const priorityStyle = { High: 'text-red-300 bg-red-500/10', Medium: 'text-amber-300 bg-amber-500/10', Low: 'text-sky-300 bg-sky-500/10' }
const statusStyle = { Todo: 'text-zinc-400', 'In Progress': 'text-orange-300', Done: 'text-emerald-300' }

export function TaskList({ tasks, projectNames, onTaskChange, onProjectOpen, compact = false }: { tasks: Task[]; projectNames: Record<string, string>; onTaskChange: (id: string, status: Task['status']) => void; onProjectOpen?: (id: string) => void; compact?: boolean }) {
  if (!tasks.length) return <p className="rounded-lg border border-dashed border-zinc-700 p-6 text-sm text-zinc-400">No tasks match the current view.</p>
  return <div className="divide-y divide-zinc-800 rounded-lg border border-zinc-800 bg-zinc-950/40">{tasks.map((task) => { const Icon = task.status === 'Done' ? CircleCheck : task.status === 'In Progress' ? CircleDot : Circle; return <div className="flex gap-3 p-4" key={task.id}><button aria-label={`Mark ${task.title} as ${task.status === 'Done' ? 'Todo' : 'Done'}`} className="mt-0.5 shrink-0 text-zinc-500 hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400" onClick={() => onTaskChange(task.id, task.status === 'Done' ? 'Todo' : 'Done')}><Icon aria-hidden="true" className="size-5" /></button><div className="min-w-0 flex-1"><p className={cn('text-sm font-medium', task.status === 'Done' ? 'text-zinc-500 line-through' : 'text-zinc-200')}>{task.title}</p><div className="mt-2 flex flex-wrap items-center gap-2 text-xs"><button className={cn('rounded px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400', statusStyle[task.status])} onClick={() => onTaskChange(task.id, task.status === 'Todo' ? 'In Progress' : task.status === 'In Progress' ? 'Done' : 'Todo')}>{task.status}</button><span className={cn('rounded px-2 py-1', priorityStyle[task.priority])}>{task.priority}</span>{!compact && onProjectOpen && <button className="text-zinc-500 hover:text-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400" onClick={() => onProjectOpen(task.projectId)}>{projectNames[task.projectId]}</button>}{task.dueDate && <span className="text-zinc-500">Due {formatTaskDate(task.dueDate)}</span>}</div></div></div> })}</div>
}
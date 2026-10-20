import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'

import { TaskList } from '@/components/task-list'
import type { Task, TaskStatus } from '@/data/dashboard'
import { cn } from '@/lib/utils'

export function TasksPage({ tasks, projectNames, onTaskChange, onProjectOpen }: { tasks: Task[]; projectNames: Record<string, string>; onTaskChange: (id: string, status: TaskStatus) => void; onProjectOpen: (id: string) => void }) {
  const [filter, setFilter] = useState<TaskStatus | 'All'>('All')
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => tasks.filter((task) => (filter === 'All' || task.status === filter) && `${task.title} ${projectNames[task.projectId]}`.toLowerCase().includes(query.toLowerCase())), [filter, projectNames, query, tasks])
  return <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8"><section><p className="text-sm text-zinc-400">Temporary task updates are only kept in this browser session.</p><h2 className="mt-1 text-2xl font-semibold text-zinc-100">Tasks</h2></section><section className="space-y-3 rounded-lg border border-zinc-800 bg-zinc-950/40 p-4"><label className="relative block"><Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" /><span className="sr-only">Search tasks and projects</span><input className="h-10 w-full rounded-md border border-zinc-700 bg-zinc-950 pl-9 pr-3 text-sm text-zinc-100 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400" onChange={(event) => setQuery(event.target.value)} placeholder="Search task title or project" value={query} /></label><div className="flex flex-wrap gap-2">{(['All', 'Todo', 'In Progress', 'Done'] as const).map((item) => <button aria-pressed={filter === item} className={cn('rounded-full px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400', filter === item ? 'bg-orange-500 text-zinc-950' : 'bg-zinc-800 text-zinc-300')} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div></section><p className="text-sm text-zinc-400">{filtered.length} of {tasks.length} tasks</p><TaskList onProjectOpen={onProjectOpen} onTaskChange={onTaskChange} projectNames={projectNames} tasks={filtered} /></div>
}
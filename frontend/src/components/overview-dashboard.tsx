import { Archive, ArrowRight, CheckCircle2, CircleAlert, FolderPlus, ListPlus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { projects, recentActivity, tasks, type Project } from '@/data/dashboard'
import { cn } from '@/lib/utils'

interface OverviewDashboardProps {
  query: string
  onAction: (action: string) => void
}

const statusStyles = {
  'On track': 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
  'At risk': 'bg-orange-500/10 text-orange-400 ring-orange-500/20',
  Planning: 'bg-sky-500/10 text-sky-400 ring-sky-500/20',
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-lg border border-zinc-800 bg-zinc-950/40 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-medium text-zinc-100">{project.name}</h3>
          <p className="mt-1 text-sm leading-5 text-zinc-400">{project.description}</p>
        </div>
        <span className={cn('shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset', statusStyles[project.status])}>{project.status}</span>
      </div>
      <div className="mt-5">
        <div className="mb-2 flex justify-between text-xs text-zinc-500"><span>Progress</span><span>{project.progress}%</span></div>
        <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800"><div className="h-full rounded-full bg-orange-500" style={{ width: `${project.progress}%` }} /></div>
      </div>
      <p className="mt-4 text-sm text-zinc-300"><span className="text-zinc-500">Next: </span>{project.nextTask}</p>
    </article>
  )
}

export function OverviewDashboard({ query, onAction }: OverviewDashboardProps) {
  const normalizedQuery = query.trim().toLowerCase()
  const visibleProjects = projects.filter((project) => project.lifecycle === 'Active' &&
    [project.name, project.description, project.nextTask].some((value) => value.toLowerCase().includes(normalizedQuery)),
  )
  const summary = [
    { label: 'Active Projects', value: '3', icon: CheckCircle2 },
    { label: 'Completed Projects', value: '12', icon: CheckCircle2 },
    { label: 'Open Tasks', value: String(tasks.filter((task) => task.status !== 'Done').length), icon: ListPlus },
    { label: 'Need Attention', value: '1', icon: CircleAlert },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8">
      <section><p className="text-sm text-zinc-400">A clear view of what needs your attention.</p><h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-100">Your work, at a glance</h2></section>
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map(({ label, value, icon: Icon }) => <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 p-4" key={label}><div className="flex items-center justify-between text-sm text-zinc-400">{label}<Icon aria-hidden="true" className="size-4 text-zinc-500" /></div><p className="mt-3 text-2xl font-semibold text-zinc-100">{value}</p></div>)}
      </section>
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.8fr)]">
        <div><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-semibold text-zinc-100">Active Projects</h2><span className="text-sm text-zinc-500">{visibleProjects.length} shown</span></div><div className="grid gap-3">{visibleProjects.map((project) => <ProjectCard key={project.id} project={project} />)}{visibleProjects.length === 0 && <p className="rounded-lg border border-dashed border-zinc-700 p-6 text-sm text-zinc-400">No projects or tasks match “{query}”.</p>}</div></div>
        <div className="space-y-6">
          <section className="rounded-lg border border-zinc-800 bg-zinc-950/40 p-5"><p className="text-sm font-medium text-orange-400">Continue working</p><h2 className="mt-2 text-lg font-semibold text-zinc-100">Personal site refresh</h2><p className="mt-2 text-sm leading-5 text-zinc-400">Pick up the next focused task and keep the project moving.</p><p className="mt-4 rounded-md bg-zinc-900 px-3 py-2 text-sm text-zinc-300">Write the project case study outline</p><Button className="mt-4 w-full bg-orange-500 text-zinc-950 hover:bg-orange-400" onClick={() => onAction('Continue Working is a prototype action.')}>Open project <ArrowRight aria-hidden="true" className="ml-2 size-4" /></Button></section>
          <section><h2 className="mb-3 text-lg font-semibold text-zinc-100">Recent Activity</h2><div className="space-y-3">{recentActivity.map((item) => <div className="border-l border-zinc-700 pl-3" key={item.text}><p className="text-sm text-zinc-300">{item.text}</p><p className="mt-1 text-xs text-zinc-500">{item.project} · {item.time}</p></div>)}</div></section>
        </div>
      </section>
      <section><h2 className="mb-4 text-lg font-semibold text-zinc-100">Quick Actions</h2><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{[{ label: 'New Project', icon: FolderPlus }, { label: 'Add Task', icon: ListPlus }, { label: 'Browse Ideas', icon: ArrowRight }, { label: 'View Archive', icon: Archive }].map(({ label, icon: Icon }) => <button className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950/40 p-4 text-left text-sm font-medium text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400" key={label} onClick={() => onAction(`${label} is not available in this prototype yet.`)}><Icon aria-hidden="true" className="size-4 text-orange-400" />{label}</button>)}</div></section>
    </div>
  )
}
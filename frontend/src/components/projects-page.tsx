import { Grid2X2, List, Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { projects, type Project, type ProjectLifecycle } from '@/data/dashboard'
import { cn } from '@/lib/utils'

type ViewMode = 'grid' | 'list'
type SortOption = 'updated' | 'created' | 'progress'

interface ProjectsPageProps {
  query: string
  onQueryChange: (query: string) => void
  onNewProject: () => void
  onProjectOpen: (project: Project) => void
}

const lifecycleFilters: Array<ProjectLifecycle | 'All'> = ['All', 'Idea', 'Planned', 'Active', 'On Hold', 'Completed', 'Archived']
const lifecycleStyles: Record<ProjectLifecycle, string> = {
  Idea: 'bg-violet-500/10 text-violet-300 ring-violet-400/20',
  Planned: 'bg-sky-500/10 text-sky-300 ring-sky-400/20',
  Active: 'bg-emerald-500/10 text-emerald-300 ring-emerald-400/20',
  'On Hold': 'bg-amber-500/10 text-amber-300 ring-amber-400/20',
  Completed: 'bg-zinc-700/60 text-zinc-300 ring-zinc-600',
  Archived: 'bg-zinc-800 text-zinc-500 ring-zinc-700',
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${value}T12:00:00`))
}

function ProjectItem({ project, view, onOpen }: { project: Project; view: ViewMode; onOpen: (project: Project) => void }) {
  const isList = view === 'list'
  return (
    <article className={cn('rounded-lg border border-zinc-800 bg-zinc-950/40 p-5 transition-colors hover:border-zinc-700', isList && 'md:flex md:items-start md:gap-6')}>
      <div className={cn('min-w-0', isList && 'md:flex-1')}>
        <div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-medium text-zinc-100">{project.name}</h3>{project.projectType && <p className="mt-1 text-xs text-zinc-500">{project.projectType}</p>}</div><span className={cn('rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset', lifecycleStyles[project.lifecycle])}>{project.lifecycle}</span></div>
        <p className="mt-3 text-sm leading-5 text-zinc-400">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">{project.technologies.map((technology) => <span className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-300" key={technology}>{technology}</span>)}</div>
      </div>
      <div className={cn('mt-5 space-y-4', isList && 'md:mt-0 md:w-56 md:shrink-0')}>
        <div><div className="mb-2 flex justify-between text-xs text-zinc-500"><span>Progress</span><span>{project.progress}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-zinc-800"><div className="h-full rounded-full bg-orange-500" style={{ width: `${project.progress}%` }} /></div></div>
        <div className="flex items-center justify-between gap-3"><p className="text-xs text-zinc-500">Updated {formatDate(project.updatedAt)}</p><button className="text-sm font-medium text-orange-400 hover:text-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400" onClick={() => onOpen(project)}>View project</button></div>
      </div>
    </article>
  )
}

export function ProjectsPage({ query, onQueryChange, onNewProject, onProjectOpen }: ProjectsPageProps) {
  const [filter, setFilter] = useState<ProjectLifecycle | 'All'>('All')
  const [view, setView] = useState<ViewMode>('grid')
  const [sort, setSort] = useState<SortOption>('updated')
  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return projects.filter((project) => (filter === 'All' || project.lifecycle === filter) && [project.name, project.description, ...project.technologies].some((value) => value.toLowerCase().includes(normalizedQuery))).sort((a, b) => sort === 'progress' ? b.progress - a.progress : new Date(`${b[sort === 'updated' ? 'updatedAt' : 'createdAt']}T12:00:00`).getTime() - new Date(`${a[sort === 'updated' ? 'updatedAt' : 'createdAt']}T12:00:00`).getTime())
  }, [filter, query, sort])
  const resetFilters = () => { setFilter('All'); onQueryChange('') }

  return <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8"><section className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm text-zinc-400">Organize work from the first idea to the archive.</p><h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-100">Projects</h2></div><Button className="gap-2 bg-orange-500 text-zinc-950 hover:bg-orange-400" onClick={onNewProject}>New Project</Button></section><section className="space-y-4 rounded-lg border border-zinc-800 bg-zinc-950/40 p-4"><div className="flex flex-col gap-3 lg:flex-row lg:items-center"><label className="relative flex-1"><Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" /><span className="sr-only">Search projects</span><input className="h-10 w-full rounded-md border border-zinc-700 bg-zinc-950 pl-9 pr-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400" onChange={(event) => onQueryChange(event.target.value)} placeholder="Search name, description, or technology" value={query} /></label><div className="flex items-center gap-2"><label className="sr-only" htmlFor="project-sort">Sort projects</label><select className="h-10 rounded-md border border-zinc-700 bg-zinc-950 px-3 text-sm text-zinc-200 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400" id="project-sort" onChange={(event) => setSort(event.target.value as SortOption)} value={sort}><option value="updated">Last updated</option><option value="created">Created date</option><option value="progress">Progress</option></select><div className="flex rounded-md border border-zinc-700 p-0.5"><button aria-label="Grid view" aria-pressed={view === 'grid'} className={cn('rounded p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400', view === 'grid' ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-500')} onClick={() => setView('grid')}><Grid2X2 aria-hidden="true" className="size-4" /></button><button aria-label="List view" aria-pressed={view === 'list'} className={cn('rounded p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400', view === 'list' ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-500')} onClick={() => setView('list')}><List aria-hidden="true" className="size-4" /></button></div></div></div><div className="flex flex-wrap items-center gap-2"><SlidersHorizontal aria-hidden="true" className="size-4 text-zinc-500" />{lifecycleFilters.map((item) => <button aria-pressed={filter === item} className={cn('rounded-full px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400', filter === item ? 'bg-orange-500 text-zinc-950' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700')} key={item} onClick={() => setFilter(item)}>{item}</button>)}{(filter !== 'All' || query) && <button className="ml-1 text-sm text-orange-400 underline hover:text-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400" onClick={resetFilters}>Clear filters</button>}</div></section><div className="flex items-center justify-between"><p className="text-sm text-zinc-400"><span className="font-medium text-zinc-200">{results.length}</span> of {projects.length} projects</p></div>{results.length > 0 ? <section className={cn('gap-4', view === 'grid' ? 'grid md:grid-cols-2 xl:grid-cols-3' : 'grid')} aria-label="Project results">{results.map((project) => <ProjectItem key={project.id} onOpen={onProjectOpen} project={project} view={view} />)}</section> : <section className="rounded-lg border border-dashed border-zinc-700 px-6 py-12 text-center"><h3 className="font-medium text-zinc-100">No matching projects</h3><p className="mt-2 text-sm text-zinc-400">Try a different search term or clear the current filters.</p><Button className="mt-5 border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800" onClick={resetFilters} variant="outline">Reset search and filters</Button></section>}</div>
}
import { Menu, Plus, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { Page } from '@/components/app-sidebar'

interface TopbarProps {
  page: Page
  query: string
  onQueryChange: (query: string) => void
  onMenuOpen: () => void
  onNewProject: () => void
}

export function Topbar({ page, query, onQueryChange, onMenuOpen, onNewProject }: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 flex min-h-16 items-center gap-3 border-b border-zinc-800 bg-zinc-900/95 px-4 backdrop-blur lg:px-8">
      <button
        aria-label="Open navigation menu"
        className="rounded-md p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 lg:hidden"
        onClick={onMenuOpen}
      >
        <Menu aria-hidden="true" className="size-5" />
      </button>
      <h1 className="mr-auto text-base font-semibold text-zinc-100 sm:text-lg">{page}</h1>
      <label className="relative hidden w-full max-w-sm md:block">
        <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
        <span className="sr-only">Search projects and tasks</span>
        <input
          className="h-9 w-full rounded-md border border-zinc-700 bg-zinc-950 pl-9 pr-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search projects and tasks"
          value={query}
        />
      </label>
      <Button className="h-9 gap-2 bg-orange-500 px-3 text-zinc-950 hover:bg-orange-400" onClick={onNewProject}>
        <Plus aria-hidden="true" className="size-4" />
        <span className="hidden sm:inline">New Project</span>
        <span className="sm:hidden">New</span>
      </Button>
    </header>
  )
}
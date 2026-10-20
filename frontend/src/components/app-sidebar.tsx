import type { LucideIcon } from 'lucide-react'
import { Archive, CheckSquare, FileText, FolderKanban, LayoutDashboard, Settings } from 'lucide-react'

import { cn } from '@/lib/utils'

export type Page = 'Overview' | 'Projects' | 'Tasks' | 'Documents' | 'Archive' | 'Settings'

interface AppSidebarProps {
  activePage: Page
  isOpen: boolean
  onNavigate: (page: Page) => void
  onClose: () => void
}

const navigation: { label: Page; icon: LucideIcon }[] = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Projects', icon: FolderKanban },
  { label: 'Tasks', icon: CheckSquare },
  { label: 'Documents', icon: FileText },
  { label: 'Archive', icon: Archive },
  { label: 'Settings', icon: Settings },
]

export function AppSidebar({ activePage, isOpen, onNavigate, onClose }: AppSidebarProps) {
  return (
    <>
      <button
        aria-label="Close navigation menu"
        className={cn('fixed inset-0 z-30 bg-black/60 lg:hidden', isOpen ? 'block' : 'hidden')}
        onClick={onClose}
      />
      <aside
        aria-label="Main navigation"
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 -translate-x-full flex-col border-r border-zinc-800 bg-zinc-950 px-3 py-5 transition-transform duration-200 lg:translate-x-0',
          isOpen && 'translate-x-0',
        )}
      >
        <div className="flex items-center gap-3 px-3 pb-7">
          <div className="grid size-8 place-items-center rounded-lg bg-orange-500 text-sm font-bold text-zinc-950">P</div>
          <span className="text-sm font-semibold tracking-wide text-zinc-100">Project Hub</span>
        </div>
        <nav className="space-y-1">
          {navigation.map(({ label, icon: Icon }) => (
            <button
              aria-current={activePage === label ? 'page' : undefined}
              className={cn(
                'flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400',
                activePage === label
                  ? 'bg-zinc-800 text-orange-400'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100',
              )}
              key={label}
              onClick={() => {
                onNavigate(label)
                onClose()
              }}
            >
              <Icon aria-hidden="true" className="size-4" />
              {label}
            </button>
          ))}
        </nav>
        <p className="mt-auto px-3 text-xs leading-5 text-zinc-600">A focused workspace for your personal projects.</p>
      </aside>
    </>
  )
}
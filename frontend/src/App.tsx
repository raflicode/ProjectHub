import { useState } from 'react'

import { AppSidebar, type Page } from '@/components/app-sidebar'
import { OverviewDashboard } from '@/components/overview-dashboard'
import { NewProjectWizard } from '@/components/new-project-wizard'
import { ProjectDetailPage } from '@/components/project-detail-page'
import { ProjectsPage } from '@/components/projects-page'
import { TasksPage } from '@/components/tasks-page'
import { Topbar } from '@/components/topbar'
import { projects, tasks, type Project, type TaskStatus } from '@/data/dashboard'

function App() {
  const [activePage, setActivePage] = useState<Page>('Overview')
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [feedback, setFeedback] = useState('')
  const [isNewProjectWizardOpen, setIsNewProjectWizardOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [taskState, setTaskState] = useState(tasks)

  function showFeedback(message: string) {
    setFeedback(message)
  }

  function updateTaskStatus(id: string, status: TaskStatus) {
    setTaskState((current) => current.map((task) => task.id === id ? { ...task, status } : task))
  }

  const projectNames = Object.fromEntries(projects.map((project) => [project.id, project.name]))
  function openProject(project: Project) { setSelectedProject(project); setActivePage('Projects') }

  return (
    <div className="min-h-screen bg-zinc-900">
      <AppSidebar activePage={activePage} isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} onNavigate={(page) => { setSelectedProject(null); setActivePage(page) }} />
      <div className="lg:pl-64">
        <Topbar onMenuOpen={() => setIsMobileNavOpen(true)} onNewProject={() => setIsNewProjectWizardOpen(true)} onQueryChange={setQuery} page={activePage} query={query} />
        <main>{isNewProjectWizardOpen ? <NewProjectWizard onExit={() => setIsNewProjectWizardOpen(false)} onFeedback={showFeedback} /> : selectedProject ? <ProjectDetailPage onBack={() => setSelectedProject(null)} onFeedback={showFeedback} onTaskChange={updateTaskStatus} project={selectedProject} tasks={taskState} /> : activePage === 'Overview' ? <OverviewDashboard onAction={showFeedback} query={query} /> : activePage === 'Projects' ? <ProjectsPage onNewProject={() => setIsNewProjectWizardOpen(true)} onProjectOpen={openProject} onQueryChange={setQuery} query={query} /> : activePage === 'Tasks' ? <TasksPage onProjectOpen={(id) => { const project = projects.find((item) => item.id === id); if (project) openProject(project) }} onTaskChange={updateTaskStatus} projectNames={projectNames} tasks={taskState} /> : <section className="mx-auto max-w-3xl p-8"><h2 className="text-xl font-semibold text-zinc-100">{activePage}</h2><p className="mt-2 text-sm text-zinc-400">This page is a placeholder for a later phase.</p></section>}</main>
      </div>
      {feedback && <div aria-live="polite" className="fixed bottom-4 right-4 z-50 max-w-sm rounded-md border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-200 shadow-xl">{feedback}<button className="ml-4 text-orange-400 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400" onClick={() => setFeedback('')}>Dismiss</button></div>}
    </div>
  )
}

export default App
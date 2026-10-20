export type ProjectStatus = 'On track' | 'At risk' | 'Planning'
export type ProjectLifecycle = 'Idea' | 'Planned' | 'Active' | 'On Hold' | 'Completed' | 'Archived'

export interface Project {
  id: string
  name: string
  description: string
  status: ProjectStatus
  progress: number
  nextTask: string
  taskCount: number
  lifecycle: ProjectLifecycle
  technologies: string[]
  updatedAt: string
  createdAt: string
  projectType?: string
}

export type TaskStatus = 'Todo' | 'In Progress' | 'Done'
export type TaskPriority = 'High' | 'Medium' | 'Low'
export interface Task {
  id: string
  projectId: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  dueDate?: string
}

export const projects: Project[] = [
  {
    id: 'personal-site',
    name: 'Personal site refresh',
    description: 'A focused portfolio update with selected writing and case studies.',
    status: 'On track',
    progress: 68,
    nextTask: 'Write the project case study outline',
    taskCount: 4,
    lifecycle: 'Active',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    updatedAt: '2026-10-19',
    createdAt: '2026-08-03',
    projectType: 'Portfolio',
  },
  {
    id: 'expense-tracker',
    name: 'Expense tracker',
    description: 'A local-first utility for reviewing monthly personal spending.',
    status: 'At risk',
    progress: 42,
    nextTask: 'Resolve category import edge cases',
    taskCount: 7,
    lifecycle: 'Active',
    technologies: ['React', 'SQLite', 'Drizzle'],
    updatedAt: '2026-10-18',
    createdAt: '2026-07-12',
    projectType: 'Personal tool',
  },
  {
    id: 'reading-notes',
    name: 'Reading notes system',
    description: 'A lightweight workflow for keeping useful technical notes connected.',
    status: 'Planning',
    progress: 15,
    nextTask: 'Choose the first note capture flow',
    taskCount: 3,
    lifecycle: 'Active',
    technologies: ['React', 'Markdown', 'Vite'],
    updatedAt: '2026-10-14',
    createdAt: '2026-09-28',
    projectType: 'Knowledge system',
  },
  {
    id: 'cli-snippet-library',
    name: 'CLI snippet library',
    description: 'A searchable collection of the shell commands I repeatedly reach for.',
    status: 'Planning',
    progress: 8,
    nextTask: 'Sketch the command metadata format',
    taskCount: 2,
    lifecycle: 'Planned',
    technologies: ['Node.js', 'TypeScript'],
    updatedAt: '2026-10-12',
    createdAt: '2026-10-10',
    projectType: 'Developer tool',
  },
  {
    id: 'home-inventory',
    name: 'Home inventory',
    description: 'An early idea for tracking household equipment, receipts, and warranties.',
    status: 'Planning',
    progress: 0,
    nextTask: 'Capture the first problem statement',
    taskCount: 0,
    lifecycle: 'Idea',
    technologies: ['SQLite', 'React'],
    updatedAt: '2026-10-08',
    createdAt: '2026-10-08',
    projectType: 'Personal tool',
  },
  {
    id: 'garden-log',
    name: 'Garden log',
    description: 'Seasonal notes for planting, maintenance, and observations at home.',
    status: 'At risk',
    progress: 36,
    nextTask: 'Decide whether to simplify the data model',
    taskCount: 5,
    lifecycle: 'On Hold',
    technologies: ['React', 'IndexedDB'],
    updatedAt: '2026-09-21',
    createdAt: '2026-05-18',
    projectType: 'Personal tool',
  },
  {
    id: 'dotfiles-cleanup',
    name: 'Dotfiles cleanup',
    description: 'A documented and portable setup for the tools used across development machines.',
    status: 'On track',
    progress: 100,
    nextTask: 'No open tasks',
    taskCount: 0,
    lifecycle: 'Completed',
    technologies: ['PowerShell', 'Git'],
    updatedAt: '2026-08-26',
    createdAt: '2026-07-01',
    projectType: 'Developer environment',
  },
  {
    id: 'weekly-review',
    name: 'Weekly review template',
    description: 'An archived experiment for a personal planning and retrospective routine.',
    status: 'Planning',
    progress: 100,
    nextTask: 'No open tasks',
    taskCount: 0,
    lifecycle: 'Archived',
    technologies: ['Markdown', 'Obsidian'],
    updatedAt: '2026-06-04',
    createdAt: '2026-04-12',
    projectType: 'Workflow experiment',
  },
]

export const recentActivity = [
  { text: 'Completed “Audit portfolio content”', project: 'Personal site refresh', time: 'Today, 10:24' },
  { text: 'Updated the import task details', project: 'Expense tracker', time: 'Yesterday' },
  { text: 'Added an idea to the project brief', project: 'Reading notes system', time: 'Monday' },
]

export const tasks: Task[] = [
  { id: 'site-case-study', projectId: 'personal-site', title: 'Write the project case study outline', status: 'In Progress', priority: 'High', dueDate: '2026-10-24' },
  { id: 'site-mobile', projectId: 'personal-site', title: 'Review mobile navigation spacing', status: 'Todo', priority: 'Medium', dueDate: '2026-10-26' },
  { id: 'site-audit', projectId: 'personal-site', title: 'Audit portfolio content', status: 'Done', priority: 'High' },
  { id: 'expense-import', projectId: 'expense-tracker', title: 'Resolve category import edge cases', status: 'Todo', priority: 'High', dueDate: '2026-10-22' },
  { id: 'expense-empty', projectId: 'expense-tracker', title: 'Add an empty monthly summary state', status: 'In Progress', priority: 'Medium' },
  { id: 'expense-export', projectId: 'expense-tracker', title: 'Check CSV export column order', status: 'Done', priority: 'Low' },
  { id: 'notes-capture', projectId: 'reading-notes', title: 'Choose the first note capture flow', status: 'Todo', priority: 'Medium', dueDate: '2026-10-29' },
  { id: 'notes-links', projectId: 'reading-notes', title: 'Define linked note conventions', status: 'Todo', priority: 'Low' },
  { id: 'cli-metadata', projectId: 'cli-snippet-library', title: 'Sketch the command metadata format', status: 'Todo', priority: 'Medium' },
  { id: 'garden-model', projectId: 'garden-log', title: 'Decide whether to simplify the data model', status: 'In Progress', priority: 'Low' },
]
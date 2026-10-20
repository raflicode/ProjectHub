import { Check, ChevronLeft, ChevronRight, Code2, FileText, FolderTree, Plus, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface NewProjectWizardProps {
  onExit: () => void
  onFeedback: (message: string) => void
}

type TemplateId = 'PRD.md' | 'AGENTS.md' | 'TASKS.md' | 'ARCHITECTURE.md' | 'README.md' | 'DATABASE.md' | 'DESIGN_SYSTEM.md' | 'FEATURES.md'

interface Template {
  id: TemplateId
  optional?: boolean
  content: string
}

const templates: Template[] = [
  { id: 'README.md', content: '# {{projectName}}\n\n## Overview\n{{description}}\n' },
  { id: 'PRD.md', content: '# Product requirements\n\n## Problem\nDescribe the problem this project solves.\n\n## Goals\n- Define the first useful outcome\n' },
  { id: 'TASKS.md', content: '# Tasks\n\n- [ ] Define the first deliverable\n- [ ] Set up the local development workflow\n' },
  { id: 'ARCHITECTURE.md', content: '# Architecture\n\nDocument the chosen structure, boundaries, and decisions.\n' },
  { id: 'AGENTS.md', content: '# Working agreement\n\nKeep implementation notes and project-specific guidance here.\n' },
  { id: 'DATABASE.md', optional: true, content: '# Data model\n\nDocument entities, relationships, and migration decisions.\n' },
  { id: 'DESIGN_SYSTEM.md', optional: true, content: '# Design system\n\nDocument interface tokens and component decisions.\n' },
  { id: 'FEATURES.md', optional: true, content: '# Features\n\nTrack planned features and their scope.\n' },
]

const steps = ['Details', 'Documents', 'Review', 'Create workspace']
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function FieldLabel({ children, htmlFor }: { children: ReactNode; htmlFor: string }) {
  return <label className="mb-1.5 block text-sm font-medium text-zinc-200" htmlFor={htmlFor}>{children}</label>
}

export function NewProjectWizard({ onExit, onFeedback }: NewProjectWizardProps) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [hasEditedSlug, setHasEditedSlug] = useState(false)
  const [description, setDescription] = useState('')
  const [projectType, setProjectType] = useState('Personal tool')
  const [workspaceRoot, setWorkspaceRoot] = useState('E:\\MyProjects')
  const [technologies, setTechnologies] = useState<string[]>([])
  const [technologyInput, setTechnologyInput] = useState('')
  const [selectedTemplates, setSelectedTemplates] = useState<TemplateId[]>(['README.md', 'PRD.md', 'TASKS.md', 'ARCHITECTURE.md', 'AGENTS.md'])
  const [activeTemplate, setActiveTemplate] = useState<TemplateId>('README.md')
  const [templateContent, setTemplateContent] = useState<Record<TemplateId, string>>(() => Object.fromEntries(templates.map((template) => [template.id, template.content])) as Record<TemplateId, string>)
  const [errors, setErrors] = useState<{ name?: string; slug?: string; description?: string }>({})
  const [creationState, setCreationState] = useState<'idle' | 'creating' | 'complete'>('idle')

  const proposedPath = `${workspaceRoot.replace(/[\\/]$/, '')}\\${slug || 'project-slug'}`
  const selectedTemplateItems = templates.filter((template) => selectedTemplates.includes(template.id))

  const detailIssues = useMemo(() => ({
    name: name.trim() ? undefined : 'Project name is required.',
    slug: slugPattern.test(slug) ? undefined : 'Use lowercase letters, numbers, and single hyphens only.',
    description: description.trim() ? undefined : 'Description is required.',
  }), [description, name, slug])

  function updateName(value: string) {
    setName(value)
    if (!hasEditedSlug) setSlug(slugify(value))
  }

  function addTechnology() {
    const technology = technologyInput.trim()
    if (technology && !technologies.some((item) => item.toLowerCase() === technology.toLowerCase())) setTechnologies([...technologies, technology])
    setTechnologyInput('')
  }

  function continueWizard() {
    if (step === 0) {
      setErrors(detailIssues)
      if (Object.values(detailIssues).some(Boolean)) return
    }
    setStep((current) => Math.min(current + 1, 3))
  }

  function simulateCreation() {
    if (creationState !== 'idle') return
    setCreationState('creating')
    window.setTimeout(() => setCreationState('complete'), 900)
  }

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 shadow-2xl shadow-black/10">
        <header className="border-b border-zinc-800 px-5 py-5 sm:px-7">
          <div className="flex items-start justify-between gap-4"><div><p className="text-sm text-orange-400">Prototype setup</p><h2 className="mt-1 text-xl font-semibold text-zinc-100">Create a new project</h2><p className="mt-1 text-sm text-zinc-400">No folders, files, or project records will be created.</p></div><button aria-label="Cancel new project setup" className="rounded-md p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400" onClick={onExit}><X aria-hidden="true" className="size-5" /></button></div>
          <ol className="mt-6 grid grid-cols-4 gap-2" aria-label="New project progress">{steps.map((label, index) => <li className="min-w-0" key={label}><div className={cn('h-1 rounded-full', index <= step ? 'bg-orange-500' : 'bg-zinc-800')} /><p className={cn('mt-2 text-xs sm:text-sm', index === step ? 'font-medium text-zinc-100' : 'text-zinc-500')}><span className="hidden sm:inline">{index + 1}. </span>{label}</p></li>)}</ol>
        </header>
        <div className="min-h-[430px] p-5 sm:p-7">
          {step === 0 && <section className="max-w-2xl space-y-5"><div><h3 className="text-lg font-semibold text-zinc-100">Project details</h3><p className="mt-1 text-sm text-zinc-400">Choose a local workspace proposal. This prototype does not inspect the filesystem.</p></div><div className="grid gap-5 sm:grid-cols-2"><div className="sm:col-span-2"><FieldLabel htmlFor="project-name">Project name</FieldLabel><input aria-describedby={errors.name ? 'project-name-error' : undefined} className="h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 text-sm text-zinc-100 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400" id="project-name" onChange={(event) => updateName(event.target.value)} value={name} />{errors.name && <p className="mt-1 text-sm text-red-300" id="project-name-error">{errors.name}</p>}</div><div><FieldLabel htmlFor="project-slug">Suggested slug</FieldLabel><input aria-describedby={errors.slug ? 'project-slug-error' : undefined} className="h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 font-mono text-sm text-zinc-100 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400" id="project-slug" onChange={(event) => { setHasEditedSlug(true); setSlug(event.target.value) }} value={slug} />{errors.slug && <p className="mt-1 text-sm text-red-300" id="project-slug-error">{errors.slug}</p>}</div><div><FieldLabel htmlFor="project-type">Project type</FieldLabel><select className="h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 text-sm text-zinc-100 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400" id="project-type" onChange={(event) => setProjectType(event.target.value)} value={projectType}><option>Personal tool</option><option>Portfolio</option><option>Learning project</option><option>Developer tool</option><option>Workflow experiment</option></select></div><div className="sm:col-span-2"><FieldLabel htmlFor="project-description">Description</FieldLabel><textarea aria-describedby={errors.description ? 'project-description-error' : undefined} className="min-h-24 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400" id="project-description" onChange={(event) => setDescription(event.target.value)} value={description} />{errors.description && <p className="mt-1 text-sm text-red-300" id="project-description-error">{errors.description}</p>}</div><div className="sm:col-span-2"><FieldLabel htmlFor="workspace-root">Workspace root path</FieldLabel><input className="h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 font-mono text-sm text-zinc-100 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400" id="workspace-root" onChange={(event) => setWorkspaceRoot(event.target.value)} value={workspaceRoot} /><p className="mt-1 text-xs text-zinc-500">Prototype setting only — no real filesystem access occurs.</p></div><div className="sm:col-span-2"><FieldLabel htmlFor="technology">Technology tags <span className="font-normal text-zinc-500">(optional)</span></FieldLabel><div className="flex gap-2"><input className="h-10 min-w-0 flex-1 rounded-md border border-zinc-700 bg-zinc-900 px-3 text-sm text-zinc-100 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400" id="technology" onChange={(event) => setTechnologyInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); addTechnology() } }} placeholder="e.g. React" value={technologyInput} /><Button className="bg-zinc-800 text-zinc-100 hover:bg-zinc-700" onClick={addTechnology} type="button"><Plus aria-hidden="true" className="size-4" /><span className="sr-only">Add technology</span></Button></div><div className="mt-2 flex flex-wrap gap-2">{technologies.map((technology) => <button className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400" key={technology} onClick={() => setTechnologies(technologies.filter((item) => item !== technology))} type="button">{technology} <span aria-label={`Remove ${technology}`}>×</span></button>)}</div></div></div></section>}
          {step === 1 && <section className="grid gap-6 md:grid-cols-[210px_minmax(0,1fr)]"><div><h3 className="text-lg font-semibold text-zinc-100">Documents</h3><p className="mt-1 text-sm text-zinc-400">Built-in templates only. User-provided files are not read by this prototype.</p><div className="mt-5 space-y-2">{templates.map((template) => <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300" key={template.id}><input checked={selectedTemplates.includes(template.id)} className="size-4 accent-orange-500" onChange={() => setSelectedTemplates((current) => current.includes(template.id) ? current.filter((item) => item !== template.id) : [...current, template.id])} type="checkbox" /><span>{template.id}</span>{template.optional && <span className="text-xs text-zinc-500">Optional</span>}</label>)}</div></div><div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4"><div className="flex items-center gap-2 text-sm text-zinc-400"><FileText aria-hidden="true" className="size-4 text-orange-400" />Built-in template preview</div>{selectedTemplateItems.length > 0 ? <><label className="mt-4 block text-sm font-medium text-zinc-200" htmlFor="template-preview">Editing {activeTemplate}</label><select className="mt-2 h-10 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 text-sm text-zinc-100 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400" id="template-preview" onChange={(event) => setActiveTemplate(event.target.value as TemplateId)} value={selectedTemplates.includes(activeTemplate) ? activeTemplate : selectedTemplateItems[0].id}>{selectedTemplateItems.map((template) => <option key={template.id}>{template.id}</option>)}</select><textarea className="mt-3 min-h-64 w-full rounded-md border border-zinc-700 bg-zinc-950 p-3 font-mono text-xs leading-5 text-zinc-300 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400" onChange={(event) => setTemplateContent({ ...templateContent, [activeTemplate]: event.target.value })} value={templateContent[selectedTemplates.includes(activeTemplate) ? activeTemplate : selectedTemplateItems[0].id]} /></> : <p className="mt-4 text-sm text-zinc-400">Select at least one built-in template to edit its placeholder content.</p>}</div></section>}
          {step === 2 && <section className="space-y-6"><div><h3 className="text-lg font-semibold text-zinc-100">Review your plan</h3><p className="mt-1 text-sm text-zinc-400">Confirm the proposal before running the simulated creation step.</p></div><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4"><p className="text-xs uppercase tracking-wide text-zinc-500">Project</p><p className="mt-2 font-medium text-zinc-100">{name}</p><p className="mt-1 text-sm text-zinc-400">{description}</p><p className="mt-3 text-sm text-zinc-300">{projectType}</p><div className="mt-3 flex flex-wrap gap-2">{technologies.length ? technologies.map((technology) => <span className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-300" key={technology}>{technology}</span>) : <span className="text-sm text-zinc-500">No technology tags selected</span>}</div></div><div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4"><p className="text-xs uppercase tracking-wide text-zinc-500">Proposed workspace</p><p className="mt-2 break-all font-mono text-sm text-orange-300">{proposedPath}</p><p className="mt-3 text-xs text-zinc-500">Prototype only — this location will not be created or checked.</p></div></div><div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4"><p className="text-sm font-medium text-zinc-200">Selected documents ({selectedTemplateItems.length})</p><div className="mt-3 flex flex-wrap gap-2">{selectedTemplateItems.map((template) => <span className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-300" key={template.id}>{template.id}</span>)}</div></div><div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4"><div className="flex items-center gap-2 text-sm font-medium text-zinc-200"><FolderTree aria-hidden="true" className="size-4 text-orange-400" />Planned structure</div><pre className="mt-3 overflow-x-auto font-mono text-xs leading-6 text-zinc-400">{`${slug || 'project-slug'}/\n├── ${selectedTemplateItems.map((item) => item.id).join('\n├── ')}\n└── (project source will be added later)`}</pre></div>{Object.values(detailIssues).some(Boolean) && <p className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">Some project details need attention. Return to Details before continuing.</p>}</section>}
          {step === 3 && <section className="mx-auto max-w-xl text-center"><Code2 aria-hidden="true" className="mx-auto size-10 text-orange-400" />{creationState === 'idle' && <><h3 className="mt-4 text-lg font-semibold text-zinc-100">Ready to simulate workspace creation</h3><p className="mt-2 text-sm leading-6 text-zinc-400">This frontend prototype will simulate the plan for <span className="font-mono text-zinc-200">{proposedPath}</span>. It will not create files, access the filesystem, or save a project.</p><Button className="mt-6 bg-orange-500 text-zinc-950 hover:bg-orange-400" onClick={simulateCreation}>Simulate creation</Button></>}{creationState === 'creating' && <><h3 className="mt-4 text-lg font-semibold text-zinc-100">Simulating setup…</h3><p className="mt-2 text-sm text-zinc-400">Preparing a prototype result. No system operations are running.</p><div className="mx-auto mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-zinc-800"><div className="h-full w-2/3 animate-pulse rounded-full bg-orange-500" /></div></>}{creationState === 'complete' && <><div className="mx-auto mt-4 grid size-12 place-items-center rounded-full bg-emerald-500/10 text-emerald-400"><Check aria-hidden="true" className="size-6" /></div><h3 className="mt-4 text-lg font-semibold text-zinc-100">Prototype creation complete</h3><p className="mt-2 text-sm leading-6 text-zinc-400">This is a simulated success state. No workspace or project record was created at <span className="font-mono text-zinc-200">{proposedPath}</span>.</p><Button className="mt-6 border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800" onClick={() => onFeedback('Open in VS Code is not implemented in this frontend prototype.')} variant="outline">Open in VS Code</Button></>}</section>}
        </div>
        <footer className="flex items-center justify-between border-t border-zinc-800 px-5 py-4 sm:px-7"><Button className="border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800" onClick={onExit} variant="outline">Cancel</Button><div className="flex gap-2">{step > 0 && creationState !== 'creating' && <Button className="border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800" onClick={() => setStep(step - 1)} variant="outline"><ChevronLeft aria-hidden="true" className="mr-1 size-4" />Back</Button>}{step < 3 && <Button className="bg-orange-500 text-zinc-950 hover:bg-orange-400" onClick={continueWizard}>Continue<ChevronRight aria-hidden="true" className="ml-1 size-4" /></Button>}{step === 3 && creationState === 'complete' && <Button className="bg-orange-500 text-zinc-950 hover:bg-orange-400" onClick={onExit}>Finish</Button>}</div></footer>
      </div>
    </div>
  )
}
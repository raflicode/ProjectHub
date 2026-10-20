import { Boxes } from 'lucide-react'

function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
      <section className="flex max-w-md flex-col items-center gap-4 text-center">
        <Boxes aria-hidden="true" className="size-10 text-primary" strokeWidth={1.5} />
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Project Hub</h1>
          <p className="text-sm text-muted-foreground">
            Fondasi frontend telah siap. Fitur produk belum diimplementasikan.
          </p>
        </div>
      </section>
    </main>
  )
}

export default App
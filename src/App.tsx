import { BoardColumn } from './components/BoardColumn'
import { workflowStages } from './tasks/workflow-stages'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <a
        href="#board"
        className="fixed left-4 top-4 z-50 -translate-y-20 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0"
      >
        Skip to board
      </a>

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-xl bg-violet-600 text-sm font-bold text-white shadow-sm"
            >
              DB
            </span>
            <span className="font-semibold tracking-tight">DevBoard</span>
          </div>
          <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-700">
            Foundation
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-violet-700">
            Personal development workspace
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            DevBoard
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Keep personal development work visible from the first idea to the
            final review.
          </p>
        </div>

        <section
          id="board"
          aria-labelledby="board-title"
          className="mt-10 scroll-mt-6"
        >
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2
                id="board-title"
                className="text-lg font-semibold text-slate-900"
              >
                Development workflow
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Four stages prepared for the task workflow.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {workflowStages.map((stage) => (
              <BoardColumn key={stage.id} {...stage} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

import { useEffect, useReducer, useState } from 'react'
import { BoardColumn } from './components/BoardColumn'
import { TaskForm } from './components/TaskForm'
import {
  createTask,
  createUpdatedTimestamp,
  type Task,
  type TaskInput,
  type TaskStatus,
} from './tasks/task'
import { taskReducer } from './tasks/task-reducer'
import { loadTasks, saveTasks } from './tasks/task-storage'
import { workflowStages } from './tasks/workflow-stages'

function App() {
  const [tasks, dispatch] = useReducer(taskReducer, [], () => loadTasks())
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const editingTask = tasks.find((task) => task.id === editingTaskId)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  function handleCreate(input: TaskInput) {
    const task = createTask(input)

    if (task) {
      dispatch({ type: 'CREATE_TASK', task })
    }
  }

  function handleUpdate(input: TaskInput) {
    if (!editingTask) return

    dispatch({
      type: 'UPDATE_TASK',
      id: editingTask.id,
      changes: input,
      updatedAt: createUpdatedTimestamp(editingTask.updatedAt),
    })
    setEditingTaskId(null)
  }

  function handleMove(id: string, status: TaskStatus) {
    const task = tasks.find((candidate) => candidate.id === id)
    if (!task) return

    dispatch({
      type: 'MOVE_TASK',
      id,
      status,
      updatedAt: createUpdatedTimestamp(task.updatedAt),
    })
  }

  function handleDelete(id: string) {
    dispatch({ type: 'DELETE_TASK', id })
    if (editingTaskId === id) setEditingTaskId(null)
  }

  function handleEdit(task: Task) {
    setEditingTaskId(task.id)
  }

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
          <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
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

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(18rem,24rem)_1fr]">
          <TaskForm
            key={editingTask?.id ?? 'create'}
            task={editingTask}
            onSubmit={editingTask ? handleUpdate : handleCreate}
            onCancel={editingTask ? () => setEditingTaskId(null) : undefined}
          />

          <section
            aria-labelledby="workspace-summary-title"
            className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">
              Local-first workflow
            </p>
            <h2
              id="workspace-summary-title"
              className="mt-2 text-2xl font-semibold"
            >
              Focus on one clear next step.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Add a task, set its priority, and move it through the four fixed
              stages. Your board is saved in this browser.
            </p>
          </section>
        </div>

        <section
          id="board"
          aria-labelledby="board-title"
          className="mt-10 scroll-mt-6"
        >
          <div className="mb-5">
            <h2
              id="board-title"
              className="text-xl font-semibold text-slate-900"
            >
              Development workflow
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Move each task as your work progresses.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {workflowStages.map((stage) => (
              <BoardColumn
                key={stage.id}
                {...stage}
                tasks={tasks.filter((task) => task.status === stage.id)}
                onEdit={handleEdit}
                onMove={handleMove}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

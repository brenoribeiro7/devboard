import { useId } from 'react'
import {
  PRIORITY_LABELS,
  type Task,
  type TaskStatus,
} from '../tasks/task'
import { workflowStages } from '../tasks/workflow-stages'

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onMove: (id: string, status: TaskStatus) => void
  onDelete: (id: string) => void
}

const priorityStyles = {
  low: 'border-sky-200 bg-sky-50 text-sky-800',
  medium: 'border-amber-200 bg-amber-50 text-amber-800',
  high: 'border-rose-200 bg-rose-50 text-rose-800',
} as const

export function TaskCard({ task, onEdit, onMove, onDelete }: TaskCardProps) {
  const titleId = useId()
  const statusId = useId()

  function handleDelete() {
    if (window.confirm(`Delete “${task.title}”?`)) {
      onDelete(task.id)
    }
  }

  return (
    <article
      aria-labelledby={titleId}
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <h4
          id={titleId}
          className="min-w-0 break-words text-sm font-semibold leading-5 text-slate-950"
        >
          {task.title}
        </h4>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-semibold ${priorityStyles[task.priority]}`}
        >
          {PRIORITY_LABELS[task.priority]}
        </span>
      </div>

      {task.description ? (
        <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">
          {task.description}
        </p>
      ) : null}

      <div className="mt-4">
        <label
          htmlFor={statusId}
          className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
        >
          Status
        </label>
        <select
          id={statusId}
          aria-label={`Status for ${task.title}`}
          value={task.status}
          onChange={(event) =>
            onMove(task.id, event.target.value as TaskStatus)
          }
          className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-sm text-slate-800 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
        >
          {workflowStages.map((stage) => (
            <option key={stage.id} value={stage.id}>
              {stage.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex gap-2 border-t border-slate-100 pt-3">
        <button
          type="button"
          aria-label={`Edit ${task.title}`}
          onClick={() => onEdit(task)}
          className="rounded-md px-2.5 py-1.5 text-sm font-semibold text-violet-700 hover:bg-violet-50"
        >
          Edit
        </button>
        <button
          type="button"
          aria-label={`Delete ${task.title}`}
          onClick={handleDelete}
          className="rounded-md px-2.5 py-1.5 text-sm font-semibold text-rose-700 hover:bg-rose-50"
        >
          Delete
        </button>
      </div>
    </article>
  )
}

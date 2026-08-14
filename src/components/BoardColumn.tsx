import { useId } from 'react'
import type { Task, TaskStatus } from '../tasks/task'
import { TaskCard } from './TaskCard'

interface BoardColumnProps {
  title: string
  description: string
  accentClass: string
  tasks: Task[]
  onEdit: (task: Task) => void
  onMove: (id: string, status: TaskStatus) => void
  onDelete: (id: string) => void
}

export function BoardColumn({
  title,
  description,
  accentClass,
  tasks,
  onEdit,
  onMove,
  onDelete,
}: BoardColumnProps) {
  const headingId = useId()
  const taskLabel = tasks.length === 1 ? 'task' : 'tasks'

  return (
    <section
      aria-labelledby={headingId}
      className="flex min-h-80 flex-col rounded-2xl border border-slate-200 bg-slate-100/70 p-3"
    >
      <header className="flex items-start gap-3 px-1 pb-3 pt-1">
        <span
          aria-hidden="true"
          className={`mt-1.5 size-2.5 shrink-0 rounded-full ${accentClass}`}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 id={headingId} className="font-semibold text-slate-900">
              {title}
            </h3>
            <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold tabular-nums text-slate-600 shadow-sm">
              {tasks.length} {taskLabel}
            </span>
          </div>
          <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
        </div>
      </header>

      {tasks.length === 0 ? (
        <div className="grid flex-1 place-items-center rounded-xl border border-dashed border-slate-300 bg-white/60 px-4 py-8 text-center">
          <p className="max-w-40 text-sm leading-6 text-slate-500">
            No tasks in this stage.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onMove={onMove}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}

import { useId, useState, type FormEvent } from 'react'
import {
  PRIORITY_LABELS,
  TASK_PRIORITIES,
  type Task,
  type TaskInput,
  type TaskPriority,
} from '../tasks/task'

interface TaskFormProps {
  task?: Task
  onSubmit: (input: TaskInput) => void
  onCancel?: () => void
}

export function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const formId = useId()
  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [priority, setPriority] = useState<TaskPriority>(
    task?.priority ?? 'medium',
  )
  const [titleError, setTitleError] = useState('')
  const isEditing = task !== undefined

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title.trim()) {
      setTitleError('Enter a title for the task.')
      return
    }

    onSubmit({ title, description, priority })
    setTitleError('')

    if (!isEditing) {
      setTitle('')
      setDescription('')
      setPriority('medium')
    }
  }

  return (
    <form
      aria-labelledby={`${formId}-heading`}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-700">
          {isEditing ? 'Update details' : 'Add work'}
        </p>
        <h2
          id={`${formId}-heading`}
          className="mt-1 text-xl font-semibold text-slate-950"
        >
          {isEditing ? 'Edit task' : 'Create a task'}
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor={`${formId}-title`}
            className="block text-sm font-medium text-slate-700"
          >
            Title <span className="text-rose-600">*</span>
          </label>
          <input
            id={`${formId}-title`}
            value={title}
            onChange={(event) => {
              setTitle(event.target.value)
              if (titleError) setTitleError('')
            }}
            aria-invalid={titleError ? 'true' : undefined}
            aria-describedby={titleError ? `${formId}-title-error` : undefined}
            className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 shadow-sm placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
            placeholder="e.g. Refactor API client"
            required
            autoFocus={isEditing}
          />
          {titleError ? (
            <p
              id={`${formId}-title-error`}
              role="alert"
              className="mt-1.5 text-sm text-rose-700"
            >
              {titleError}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={`${formId}-description`}
            className="block text-sm font-medium text-slate-700"
          >
            Description <span className="text-slate-400">(optional)</span>
          </label>
          <textarea
            id={`${formId}-description`}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="mt-1.5 min-h-24 w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 shadow-sm placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
            placeholder="Add useful context"
          />
        </div>

        <div>
          <label
            htmlFor={`${formId}-priority`}
            className="block text-sm font-medium text-slate-700"
          >
            Priority
          </label>
          <select
            id={`${formId}-priority`}
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value as TaskPriority)
            }
            className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
          >
            {TASK_PRIORITIES.map((value) => (
              <option key={value} value={value}>
                {PRIORITY_LABELS[value]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="submit"
          className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 focus-visible:outline-violet-700"
        >
          {isEditing ? 'Save changes' : 'Create task'}
        </button>
        {isEditing ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  )
}

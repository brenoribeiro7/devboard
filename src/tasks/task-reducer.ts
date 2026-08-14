import type { Task, TaskInput, TaskStatus } from './task'

export type TaskAction =
  | { type: 'CREATE_TASK'; task: Task }
  | {
      type: 'UPDATE_TASK'
      id: string
      changes: TaskInput
      updatedAt: string
    }
  | { type: 'MOVE_TASK'; id: string; status: TaskStatus; updatedAt: string }
  | { type: 'DELETE_TASK'; id: string }

export function taskReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'CREATE_TASK':
      return [...tasks, action.task]

    case 'UPDATE_TASK': {
      const title = action.changes.title.trim()

      if (!title) {
        return tasks
      }

      return tasks.map((task) =>
        task.id === action.id
          ? {
              ...task,
              title,
              description: action.changes.description.trim(),
              priority: action.changes.priority,
              updatedAt: action.updatedAt,
            }
          : task,
      )
    }

    case 'MOVE_TASK':
      return tasks.map((task) =>
        task.id === action.id
          ? { ...task, status: action.status, updatedAt: action.updatedAt }
          : task,
      )

    case 'DELETE_TASK':
      return tasks.filter((task) => task.id !== action.id)
  }
}

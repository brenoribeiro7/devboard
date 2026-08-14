import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  type Task,
  type TaskPriority,
  type TaskStatus,
} from './task'

export const TASKS_STORAGE_KEY = 'devboard.tasks.v1'

type StorageReader = Pick<Storage, 'getItem'>
type StorageWriter = Pick<Storage, 'setItem'>

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isTaskStatus(value: unknown): value is TaskStatus {
  return (
    typeof value === 'string' &&
    TASK_STATUSES.some((status) => status === value)
  )
}

function isTaskPriority(value: unknown): value is TaskPriority {
  return (
    typeof value === 'string' &&
    TASK_PRIORITIES.some((priority) => priority === value)
  )
}

function isTimestamp(value: unknown): value is string {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value))
}

function isTask(value: unknown): value is Task {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    value.id.length > 0 &&
    typeof value.title === 'string' &&
    value.title.trim().length > 0 &&
    typeof value.description === 'string' &&
    isTaskPriority(value.priority) &&
    isTaskStatus(value.status) &&
    isTimestamp(value.createdAt) &&
    isTimestamp(value.updatedAt)
  )
}

export function loadTasks(storage?: StorageReader): Task[] {
  try {
    const serialized = (storage ?? window.localStorage).getItem(
      TASKS_STORAGE_KEY,
    )

    if (serialized === null) {
      return []
    }

    const parsed: unknown = JSON.parse(serialized)

    return Array.isArray(parsed) && parsed.every(isTask) ? parsed : []
  } catch {
    return []
  }
}

export function saveTasks(tasks: Task[], storage?: StorageWriter): boolean {
  try {
    const target = storage ?? window.localStorage
    target.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
    return true
  } catch {
    return false
  }
}

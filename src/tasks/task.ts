export const TASK_STATUSES = [
  'backlog',
  'in_progress',
  'review',
  'done',
] as const

export type TaskStatus = (typeof TASK_STATUSES)[number]

export const TASK_PRIORITIES = ['low', 'medium', 'high'] as const

export type TaskPriority = (typeof TASK_PRIORITIES)[number]

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export interface Task {
  id: string
  title: string
  description: string
  priority: TaskPriority
  status: TaskStatus
  createdAt: string
  updatedAt: string
}

export interface TaskInput {
  title: string
  description: string
  priority: TaskPriority
}

interface TaskFactories {
  createId: () => string
  createTimestamp: () => string
}

const defaultFactories: TaskFactories = {
  createId: () => crypto.randomUUID(),
  createTimestamp: () => new Date().toISOString(),
}

export function createTask(
  input: TaskInput,
  factories: TaskFactories = defaultFactories,
): Task | null {
  const title = input.title.trim()

  if (!title) {
    return null
  }

  const timestamp = factories.createTimestamp()

  return {
    id: factories.createId(),
    title,
    description: input.description.trim(),
    priority: input.priority,
    status: 'backlog',
    createdAt: timestamp,
    updatedAt: timestamp,
  }
}

export function createUpdatedTimestamp(previousTimestamp: string): string {
  const timestamp = new Date().toISOString()

  return timestamp === previousTimestamp
    ? new Date(Date.parse(previousTimestamp) + 1).toISOString()
    : timestamp
}

import { describe, expect, it } from 'vitest'
import { createTask, type Task } from './task'
import { taskReducer } from './task-reducer'

const createdAt = '2026-08-14T12:00:00.000Z'
const updatedAt = '2026-08-14T13:00:00.000Z'

function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: 'task-1',
    title: 'Write tests',
    description: 'Cover the reducer',
    priority: 'medium',
    status: 'backlog',
    createdAt,
    updatedAt: createdAt,
    ...overrides,
  }
}

describe('task state', () => {
  it('creates a normalized task in Backlog with medium priority by default', () => {
    const task = createTask(
      {
        title: '  Write tests  ',
        description: '  Reducer rules  ',
        priority: 'medium',
      },
      { createId: () => 'task-1', createTimestamp: () => createdAt },
    )

    if (!task) throw new Error('Expected a valid task')

    expect(task).toEqual(makeTask({ description: 'Reducer rules' }))
    expect(taskReducer([], { type: 'CREATE_TASK', task })).toEqual([task])
  })

  it('rejects a task whose title only contains whitespace', () => {
    expect(
      createTask(
        { title: '   ', description: '', priority: 'low' },
        { createId: () => 'unused', createTimestamp: () => createdAt },
      ),
    ).toBeNull()
  })

  it('updates editable fields and timestamp while preserving createdAt', () => {
    const [task] = taskReducer([makeTask()], {
      type: 'UPDATE_TASK',
      id: 'task-1',
      changes: {
        title: '  Review tests  ',
        description: '  Check edge cases  ',
        priority: 'high',
      },
      updatedAt,
    })

    expect(task).toMatchObject({
      title: 'Review tests',
      description: 'Check edge cases',
      priority: 'high',
      createdAt,
      updatedAt,
    })
  })

  it('moves a task and updates its timestamp', () => {
    const [task] = taskReducer([makeTask()], {
      type: 'MOVE_TASK',
      id: 'task-1',
      status: 'review',
      updatedAt,
    })

    expect(task.status).toBe('review')
    expect(task.updatedAt).toBe(updatedAt)
  })

  it('deletes only the selected task', () => {
    const otherTask = makeTask({ id: 'task-2', title: 'Keep me' })

    expect(
      taskReducer([makeTask(), otherTask], {
        type: 'DELETE_TASK',
        id: 'task-1',
      }),
    ).toEqual([otherTask])
  })
})

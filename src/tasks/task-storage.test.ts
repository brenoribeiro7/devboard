import { describe, expect, it, vi } from 'vitest'
import type { Task } from './task'
import { loadTasks, saveTasks, TASKS_STORAGE_KEY } from './task-storage'

const task: Task = {
  id: 'task-1',
  title: 'Persist me',
  description: '',
  priority: 'medium',
  status: 'backlog',
  createdAt: '2026-08-14T12:00:00.000Z',
  updatedAt: '2026-08-14T12:00:00.000Z',
}

describe('task storage', () => {
  it('returns an empty board when storage is empty', () => {
    const storage = { getItem: vi.fn(() => null) }

    expect(loadTasks(storage)).toEqual([])
    expect(storage.getItem).toHaveBeenCalledWith(TASKS_STORAGE_KEY)
  })

  it('saves tasks under the versioned application key', () => {
    const storage = { setItem: vi.fn() }

    expect(saveTasks([task], storage)).toBe(true)
    expect(storage.setItem).toHaveBeenCalledWith(
      TASKS_STORAGE_KEY,
      JSON.stringify([task]),
    )
  })

  it('restores valid tasks', () => {
    const storage = { getItem: vi.fn(() => JSON.stringify([task])) }

    expect(loadTasks(storage)).toEqual([task])
  })

  it.each([
    ['corrupted JSON', '{not-json'],
    ['an incompatible root', JSON.stringify({ tasks: [task] })],
    ['an incompatible task', JSON.stringify([{ ...task, status: 'blocked' }])],
  ])('returns an empty board for %s', (_case, serialized) => {
    const storage = { getItem: vi.fn(() => serialized) }

    expect(loadTasks(storage)).toEqual([])
  })

  it('degrades safely when reading or writing storage throws', () => {
    const reader = {
      getItem: vi.fn(() => {
        throw new Error('Storage unavailable')
      }),
    }
    const writer = {
      setItem: vi.fn(() => {
        throw new Error('Storage unavailable')
      }),
    }

    expect(() => loadTasks(reader)).not.toThrow()
    expect(loadTasks(reader)).toEqual([])
    expect(() => saveTasks([task], writer)).not.toThrow()
    expect(saveTasks([task], writer)).toBe(false)
  })
})

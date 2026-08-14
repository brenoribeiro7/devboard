import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import type { Task } from './tasks/task'
import { TASKS_STORAGE_KEY } from './tasks/task-storage'

function renderApp() {
  return render(<App />)
}

function getColumn(name: string) {
  return screen.getByRole('region', { name })
}

function createTask(title: string, description = '') {
  fireEvent.change(screen.getByLabelText(/^Title/), {
    target: { value: title },
  })
  if (description) {
    fireEvent.change(screen.getByLabelText(/^Description/), {
      target: { value: description },
    })
  }
  fireEvent.click(screen.getByRole('button', { name: 'Create task' }))
}

beforeEach(() => {
  window.localStorage.clear()
})

afterEach(() => {
  cleanup()
  window.localStorage.clear()
  vi.restoreAllMocks()
})

describe('App task workflow', () => {
  it('renders an empty board with four fixed columns and counts', () => {
    renderApp()

    expect(
      screen.getByRole('heading', { level: 1, name: 'DevBoard' }),
    ).toBeInTheDocument()

    for (const stage of ['Backlog', 'In Progress', 'Review', 'Done']) {
      const column = getColumn(stage)
      expect(within(column).getByText('0 tasks')).toBeInTheDocument()
      expect(
        within(column).getByText('No tasks in this stage.'),
      ).toBeInTheDocument()
    }
  })

  it('rejects a title containing only whitespace', () => {
    renderApp()

    fireEvent.change(screen.getByLabelText(/^Title/), {
      target: { value: '   ' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Create task' }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Enter a title for the task.',
    )
    expect(within(getColumn('Backlog')).getByText('0 tasks')).toBeInTheDocument()
  })

  it('creates a medium-priority task in Backlog and persists it', async () => {
    renderApp()

    createTask('  Write tests  ')

    const backlog = getColumn('Backlog')
    expect(
      within(backlog).getByRole('heading', { name: 'Write tests' }),
    ).toBeInTheDocument()
    expect(within(backlog).getByText('Medium')).toBeInTheDocument()
    expect(within(backlog).getByText('1 task')).toBeInTheDocument()
    expect(screen.getByLabelText(/^Title/)).toHaveValue('')
    expect(screen.getByLabelText('Priority')).toHaveValue('medium')

    await waitFor(() => {
      const saved = JSON.parse(
        window.localStorage.getItem(TASKS_STORAGE_KEY) ?? '[]',
      ) as Task[]
      expect(saved).toHaveLength(1)
      expect(saved[0]).toMatchObject({
        title: 'Write tests',
        description: '',
        priority: 'medium',
        status: 'backlog',
      })
    })
  })

  it('cancels an edit, then saves title, description, and priority changes', () => {
    renderApp()
    createTask('Write tests', 'Initial context')

    fireEvent.click(
      screen.getByRole('button', { name: 'Edit Write tests' }),
    )
    fireEvent.change(screen.getByLabelText(/^Title/), {
      target: { value: 'Do not save' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(
      within(getColumn('Backlog')).getByRole('heading', {
        name: 'Write tests',
      }),
    ).toBeInTheDocument()
    expect(screen.queryByText('Do not save')).not.toBeInTheDocument()

    fireEvent.click(
      screen.getByRole('button', { name: 'Edit Write tests' }),
    )
    fireEvent.change(screen.getByLabelText(/^Title/), {
      target: { value: 'Review tests' },
    })
    fireEvent.change(screen.getByLabelText(/^Description/), {
      target: { value: 'Cover the complete flow' },
    })
    fireEvent.change(screen.getByLabelText('Priority'), {
      target: { value: 'high' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }))

    const backlog = getColumn('Backlog')
    expect(
      within(backlog).getByRole('heading', { name: 'Review tests' }),
    ).toBeInTheDocument()
    expect(
      within(backlog).getByText('Cover the complete flow'),
    ).toBeInTheDocument()
    expect(within(backlog).getByText('High')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Create a task' }),
    ).toBeInTheDocument()
  })

  it('moves a task between columns and updates both counts', () => {
    renderApp()
    createTask('Move me')

    fireEvent.change(screen.getByLabelText('Status for Move me'), {
      target: { value: 'done' },
    })

    expect(within(getColumn('Backlog')).getByText('0 tasks')).toBeInTheDocument()
    const done = getColumn('Done')
    expect(within(done).getByText('1 task')).toBeInTheDocument()
    expect(
      within(done).getByRole('heading', { name: 'Move me' }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Status for Move me')).toHaveValue('done')
  })

  it('deletes a task after confirmation', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    renderApp()
    createTask('Remove me')

    fireEvent.click(
      screen.getByRole('button', { name: 'Delete Remove me' }),
    )

    expect(window.confirm).toHaveBeenCalledWith('Delete “Remove me”?')
    expect(screen.queryByText('Remove me')).not.toBeInTheDocument()
    expect(within(getColumn('Backlog')).getByText('0 tasks')).toBeInTheDocument()
  })

  it('keeps a task when deletion is cancelled', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    renderApp()
    createTask('Keep me')

    fireEvent.click(screen.getByRole('button', { name: 'Delete Keep me' }))

    expect(
      within(getColumn('Backlog')).getByRole('heading', { name: 'Keep me' }),
    ).toBeInTheDocument()
    expect(within(getColumn('Backlog')).getByText('1 task')).toBeInTheDocument()
  })

  it('restores the initial board from persisted data', () => {
    const persistedTask: Task = {
      id: 'persisted-task',
      title: 'Restored task',
      description: 'Loaded from this browser',
      priority: 'low',
      status: 'review',
      createdAt: '2026-08-14T12:00:00.000Z',
      updatedAt: '2026-08-14T12:30:00.000Z',
    }
    window.localStorage.setItem(
      TASKS_STORAGE_KEY,
      JSON.stringify([persistedTask]),
    )

    renderApp()

    const review = getColumn('Review')
    expect(
      within(review).getByRole('heading', { name: 'Restored task' }),
    ).toBeInTheDocument()
    expect(
      within(review).getByText('Loaded from this browser'),
    ).toBeInTheDocument()
    expect(within(review).getByText('Low')).toBeInTheDocument()
    expect(within(review).getByText('1 task')).toBeInTheDocument()
  })
})

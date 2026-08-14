import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the DevBoard foundation shell', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'DevBoard' }),
    ).toBeInTheDocument()

    const board = screen.getByRole('region', {
      name: 'Development workflow',
    })

    for (const stage of ['Backlog', 'In Progress', 'Review', 'Done']) {
      expect(
        within(board).getByRole('heading', { level: 3, name: stage }),
      ).toBeInTheDocument()
    }
  })
})

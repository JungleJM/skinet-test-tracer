import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'
import boardFixtureJson from './fixtures/board.json?raw'

const boardFixture = JSON.parse(boardFixtureJson) as {
  project: { title: string }
  columns: Array<{
    title: string
    cards: Array<{
      title: string
      assignee?: string
      dueDate?: string
    }>
  }>
}

afterEach(() => {
  cleanup()
})

describe('baseline app', () => {
  it('renders the baseline ready state', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Baseline is ready' }),
    ).toBeInTheDocument()
    expect(screen.getByText('SkiNet practice app')).toBeInTheDocument()
  })

  it('renders project, columns, cards, and optional card metadata from fixture data', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: boardFixture.project.title }),
    ).toBeInTheDocument()

    for (const column of boardFixture.columns) {
      expect(
        screen.getByRole('heading', { name: column.title }),
      ).toBeInTheDocument()

      for (const card of column.cards) {
        expect(
          screen.getByRole('heading', { name: card.title }),
        ).toBeInTheDocument()
        if (card.assignee) {
          expect(screen.getByText(card.assignee)).toBeInTheDocument()
        }
        if (card.dueDate) {
          const dueDate = new Intl.DateTimeFormat('en', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            timeZone: 'UTC',
          }).format(new Date(`${card.dueDate}T00:00:00Z`))
          expect(screen.getByText(dueDate)).toBeInTheDocument()
        }
      }
    }
  })
})

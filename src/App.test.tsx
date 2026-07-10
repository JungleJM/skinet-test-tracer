import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('baseline app', () => {
  it('renders the baseline ready state', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Baseline is ready' }),
    ).toBeInTheDocument()
    expect(screen.getByText('SkiNet practice app')).toBeInTheDocument()
  })
})

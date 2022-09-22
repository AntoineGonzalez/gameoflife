import { render, screen } from '@testing-library/react'
import wrapWithReduxProvider from '../utils/reduxProviderWrapper'
import userEvent from '@testing-library/user-event'
import PatternList from '../../components/PatternList'

describe('components/Grid.tsx', () => {
  it('displays stored patterns', () => {
    render(wrapWithReduxProvider(<PatternList />))

    const expectedPatterns = ['Box', 'Frog', 'Space Ship', 'Canon']
    const patterns = screen.getAllByRole('option')

    patterns.forEach((pattern, patternIndex) => {
      expect(pattern).toHaveTextContent(expectedPatterns[patternIndex])
    })
  })

  it('selects/unselects pattern on click', async () => {
    render(wrapWithReduxProvider(<PatternList />))

    const patterns = screen.getAllByRole('option')
    const pattern = patterns[0]
    await userEvent.click(pattern)
    const selectedPatterns = screen.getAllByRole('option', { selected: true })

    expect(selectedPatterns).toHaveLength(1)
    expect(selectedPatterns[0]).toStrictEqual(pattern)

    await userEvent.click(pattern)

    expect(pattern.getAttribute('aria-selected')).toBe('false')
  })
})

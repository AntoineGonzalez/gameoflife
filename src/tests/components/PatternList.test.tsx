import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import wrapWithReduxProvider from '../utils/reduxProviderWrapper'
import PatternList from '../../components/PatternList'

describe('components/PatternList.tsx', () => {
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
    fireEvent.click(pattern)
    const selectedPatterns = await screen.findAllByRole('option', { selected: true })

    expect(selectedPatterns).toHaveLength(1)
    expect(selectedPatterns[0]).toStrictEqual(pattern)

    fireEvent.click(pattern)

    await waitFor(() => {
      expect(pattern.getAttribute('aria-selected')).toBe('false')
    })
  })
})

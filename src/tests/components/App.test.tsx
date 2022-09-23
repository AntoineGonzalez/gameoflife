import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'
import wrapWithReduxProvider from '../utils/reduxProviderWrapper'

describe('components/App.tsx', () => {
  it('starts the game on start game button click and stops the game on stop game button click', async () => {
    render(wrapWithReduxProvider(<App />))

    const startGameBtn = screen.getByRole('button', { name: 'Start' })
    await userEvent.click(startGameBtn)
    expect(startGameBtn).toHaveTextContent('Stop')
    await userEvent.click(startGameBtn)
    expect(startGameBtn).toHaveTextContent('Start')
  })

  it('clears the game on clear button click', async () => {
    render(wrapWithReduxProvider(<App />))

    const cells = screen.getAllByRole('gridcell')

    // Change grid content with stable pattern
    for (let x = 0; x < 2; x++) {
      for (let y = 0; y < 2; y++) {
        await userEvent.click(cells[x + y * 49])
      }
    }

    // Start game iteration
    const startGameBtn = screen.getByRole('button', { name: 'Start' })
    await userEvent.click(startGameBtn)

    // Await first iteration to be process
    await waitFor(() =>
      expect(
        screen.getByText('Nombre d\'itérations : 1')
      ).toBeInTheDocument()
    )

    // Reset game
    const clearGameBtn = screen.getByRole('button', { name: 'Reset' })
    await userEvent.click(clearGameBtn)

    // Expect iteration to be reset & game to be stop
    expect(screen.getByText('Nombre d\'itérations : 0')).toBeInTheDocument()
    expect(startGameBtn).toHaveTextContent('Start')
  })

  it('changes grid size with width and height inputs', async () => {
    render(wrapWithReduxProvider(<App />))

    const widthInput = screen.getByTestId('grid-width-input')
    const heightInput = screen.getByTestId('grid-height-input')

    await userEvent.clear(widthInput)

    await waitFor(async () => {
      expect(screen.getByTestId('grid-width-input')).toHaveValue(0)
    })

    await userEvent.type(widthInput, '10')

    await waitFor(async () => {
      expect(screen.getByTestId('grid-width-input')).toHaveValue(10)
    })

    await userEvent.clear(heightInput)

    await waitFor(async () => {
      expect(screen.getByTestId('grid-height-input')).toHaveValue(0)
    })

    await userEvent.type(heightInput, '10')

    await waitFor(async () => {
      expect(screen.getByTestId('grid-height-input')).toHaveValue(10)
      expect(screen.getAllByRole('row')).toHaveLength(10)
      expect(screen.getAllByRole('gridcell')).toHaveLength(100)
    })
  })
})

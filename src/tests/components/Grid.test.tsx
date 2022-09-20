import { render, screen } from '@testing-library/react'
import Grid from '../../components/Grid'
import wrapWithReduxProvider from '../utils/reduxProviderWrapper'
import userEvent from '@testing-library/user-event'
import App from '../../App'
// import App from '../../App'

describe('components/Grid.tsx', () => {
  it('displays a grid with desired dimensions', () => {
    render(wrapWithReduxProvider(<Grid width={20} height={10} />))

    expect(screen.getAllByRole('row')).toHaveLength(10)
    expect(screen.getAllByRole('gridcell')).toHaveLength(200)
  })

  it('displays an initialised grid with only dead cells', () => {
    render(wrapWithReduxProvider(<Grid width={20} height={10} />))

    screen.getAllByRole('gridcell').forEach((cell) => {
      expect(cell).toHaveStyle('background-color:grey')
    })
  })

  it('toggles isAlive cells porperty onclick', async () => {
    render(wrapWithReduxProvider(<Grid width={20} height={10} />))

    const cell = screen.getAllByRole('gridcell')[0]
    expect(cell).toHaveStyle('background-color:grey')
    await userEvent.click(cell)
    expect(cell).toHaveStyle('background-color:white')
    await userEvent.click(cell)
    expect(cell).toHaveStyle('background-color:grey')
  })

  it('starts the game on start game button click and its stop game on stop game button click', async () => {
    render(wrapWithReduxProvider(<App />))

    const startGameBtn = screen.getByRole('button', { name: 'Start' })
    await userEvent.click(startGameBtn)
    expect(startGameBtn).toHaveTextContent('Stop')
    await userEvent.click(startGameBtn)
    expect(startGameBtn).toHaveTextContent('Start')
  })
})

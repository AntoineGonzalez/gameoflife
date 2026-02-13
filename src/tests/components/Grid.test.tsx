import { render, screen } from '@testing-library/react'
import Grid from '../../components/Grid'
import wrapWithReduxProvider from '../utils/reduxProviderWrapper'
import userEvent from '@testing-library/user-event'
import App from '../../App'

describe('components/Grid.tsx', () => {
  it('displays a grid with desired dimensions', () => {
    render(wrapWithReduxProvider(<Grid width={20} height={10} />))

    expect(screen.getAllByRole('row')).toHaveLength(10)
    expect(screen.getAllByRole('gridcell')).toHaveLength(200)
  })

  it('displays an initialized grid with only dead cells', () => {
    render(wrapWithReduxProvider(<Grid width={20} height={10} />))

    screen.getAllByRole('gridcell').forEach((cell) => {
      expect(cell).toHaveStyle('background-color:grey')
    })
  })

  it('revives a cell when a user clicks on a dead one', async () => {
    render(wrapWithReduxProvider(<Grid width={20} height={10} />))

    const user = userEvent.setup()
    const cell = screen.getAllByRole('gridcell')[0]
    expect(cell).toHaveStyle('background-color:grey')
    await user.click(cell)
    expect(cell).toHaveStyle('background-color:white')
  })

  it('kills a cell when a user clicks on a living one', async () => {
    render(wrapWithReduxProvider(<Grid width={20} height={10} />))

    const user = userEvent.setup()
    const cell = screen.getAllByRole('gridcell')[0]
    await user.click(cell)
    await user.click(cell)
    expect(cell).toHaveStyle('background-color:grey')
  })

  it('starts the game on start game button click and stops the game on stop game button click', async () => {
    render(wrapWithReduxProvider(<App />))

    const user = userEvent.setup()
    const startGameBtn = screen.getByRole('button', { name: 'Start' })
    await user.click(startGameBtn)
    expect(startGameBtn).toHaveTextContent('Stop')
    await user.click(startGameBtn)
    expect(startGameBtn).toHaveTextContent('Start')
  })
})

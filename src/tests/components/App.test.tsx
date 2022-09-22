import { render, screen } from '@testing-library/react'
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
})

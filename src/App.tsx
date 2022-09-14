import './App.css'
import styled from 'styled-components'
import Grid from './components/Grid'
import { selectGameState, tick, toggleRunningStatus } from './store/slices/gameSlice'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const dispatch = useDispatch()
  const gameState = useSelector(selectGameState)
  const [timeInterval, setTimeInterval] = useState<unknown | null>(null)

  function toggleGameStatus() {
    if (!gameState.isRunning) {
      setTimeInterval(setInterval(() => dispatch(tick()), 1000))
    } else {
      clearInterval(timeInterval as number)
      setTimeInterval(null)
    }

    dispatch(toggleRunningStatus())
  }

  return (
    <div className="App">
      <Header>
        Jeu de la vie
      </Header>
      <Grid width={10} height={20} />

      <button onClick={toggleGameStatus}>
        {gameState.isRunning ? 'Stop' : 'Start'}
      </button>
    </div>
  );
}

const Header = styled.header`
  margin: 3em auto;
`

export default App

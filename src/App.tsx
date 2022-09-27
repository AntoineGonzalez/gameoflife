import './App.css'
import styled from 'styled-components'
import Grid from './components/Grid'
import gameSlice, { selectIsRunning, selectIterationCounter } from './store/slices/gameSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PatternList from './components/PatternList'

function App () {
  const dispatch = useDispatch()
  const gameIsRunning = useSelector(selectIsRunning)
  const iterationCounter = useSelector(selectIterationCounter)
  const [intervalId, setIntervalId] = useState<number | null>(null)

  useEffect(() => {
    if (gameIsRunning) {
      const id = setInterval(
        () => dispatch(gameSlice.actions.tick()),
        1000
      )

      setIntervalId(id as unknown as number)
    } else if (intervalId !== null) {
      clearInterval(intervalId)
      setIntervalId(null)
    }

    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId)
      }
    }
  }, [gameIsRunning])

  function handleStarGame () {
    dispatch(gameSlice.actions.startGame())
  }

  function handleStopGame () {
    dispatch(gameSlice.actions.stopGame())
  }

  return (
    <AppContainer>
      <Aside>
        <Header>
          Jeu de la vie
        </Header>
        <List>
          <li>Nombre d&apos;itérations : {iterationCounter}</li>
          <li>
            <Button onClick={gameIsRunning ? handleStopGame : handleStarGame} role="button">
              {gameIsRunning ? 'Stop' : 'Start'}
            </Button>
          </li>
        </List>
        <PatternList></PatternList>
      </Aside>
      <Container>
        <Grid width={10} height={10} />
      </Container>
    </AppContainer>
  )
}

const Container = styled.div`
  margin: 1.5em;
  min-height: 100vh;
`
const Header = styled.header`
  margin-bottom: 1.5em;
`
const AppContainer = styled.div`
  display: flex;
`
const Aside = styled.aside`
  width: 15%;
  padding: 1.5em 0.5em;
  text-align: center;
  border-right: solid 1px grey;
`
export const List = styled.ul`
  list-style-type: none;
  padding: 0;
`
const Button = styled.button`
  margin-top: 1em
`
export default App

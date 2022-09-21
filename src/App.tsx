import './App.css'
import styled from 'styled-components'
import Grid from './components/Grid'
import gameSlice, { selectIsRunning, selectIterationCounter } from './store/slices/gameSlice'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function App () {
  const dispatch = useDispatch()
  const gameIsRunning = useSelector(selectIsRunning)
  const iterationCounter = useSelector(selectIterationCounter)
  const [timeInterval, setTimeInterval] = useState<unknown | null>(null)

  function handleStarGame () {
    setTimeInterval(
      setInterval(
        () => dispatch(gameSlice.actions.tick()),
        1000
      )
    )

    dispatch(gameSlice.actions.startGame())
  }

  function handleStopGame () {
    clearInterval(timeInterval as number)
    setTimeInterval(null)
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
      </Aside>
      <Container>
        <Grid width={50} height={50} />
      </Container>
    </AppContainer>
  )
}

const Container = styled.div`
  margin: 1.5em;
`
const Header = styled.header`
  margin-bottom: 1.5em;
`
const AppContainer = styled.div`
  display: flex;
`
const Aside = styled.aside`
  width: 33%;
  margin: 1.5em 0;
`
const List = styled.ul`
  list-style-type: none;
  padding: 0;
`
const Button = styled.button`
  margin-top: 1em
`
export default App
